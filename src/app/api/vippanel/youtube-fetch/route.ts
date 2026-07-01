export const dynamic = "force-dynamic";

const YT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

// ── Yardımcı fonksiyonlar ─────────────────────────────────────────

function extractYouTubeId(input: string): string {
  const patterns = [
    /(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const r of patterns) {
    const m = input.match(r);
    if (m) return m[1];
  }
  return input.trim();
}

function parseDurationSeconds(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

// HTML'den belirtilen JS değişkenini char-by-char JSON olarak çıkarır
function extractYtJson(html: string, marker: string, maxBytes = 3_000_000): unknown {
  const markerIdx = html.indexOf(marker);
  if (markerIdx === -1) return null;

  const jsonStart = html.indexOf("{", markerIdx);
  if (jsonStart === -1) return null;

  let depth = 0;
  let inStr = false;
  let esc = false;
  const limit = Math.min(html.length, jsonStart + maxBytes);

  for (let i = jsonStart; i < limit; i++) {
    const c = html[i];
    if (esc) { esc = false; continue; }
    if (c === "\\" && inStr) { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") {
      depth--;
      if (depth === 0) {
        try { return JSON.parse(html.slice(jsonStart, i + 1)); }
        catch { return null; }
      }
    }
  }
  return null;
}

function extractYtInitialData(html: string): unknown {
  return extractYtJson(html, "var ytInitialData = ", 3_000_000);
}

type PlayerResponse = { videoDetails?: { title?: string; shortDescription?: string; thumbnail?: { thumbnails?: { url: string }[] } } };

function extractYtPlayerResponse(html: string): PlayerResponse | null {
  return extractYtJson(html, "var ytInitialPlayerResponse = ", 2_000_000) as PlayerResponse | null;
}

type ChannelVideo = {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedTime: string;
  isShorts: boolean;
  url: string;
};

// ytInitialData içinde recursive gezinerek video item'larını toplar
function extractVideos(node: unknown, isShorts: boolean, seen: Set<string>, results: ChannelVideo[]) {
  if (!node || typeof node !== "object") return;

  if (Array.isArray(node)) {
    for (const item of node) extractVideos(item, isShorts, seen, results);
    return;
  }

  const obj = node as Record<string, unknown>;

  // Regular video
  if ("videoRenderer" in obj) {
    const vr = obj.videoRenderer as Record<string, unknown>;
    pushVideo(vr, isShorts, seen, results, "videoRenderer");
  }

  // Shorts (reelItemRenderer veya shortsLockupViewModel)
  if ("reelItemRenderer" in obj) {
    const rr = obj.reelItemRenderer as Record<string, unknown>;
    pushVideo(rr, true, seen, results, "reelItemRenderer");
  }

  if ("shortsLockupViewModel" in obj) {
    const slv = obj.shortsLockupViewModel as Record<string, unknown>;
    pushVideoFromShortLockup(slv, seen, results);
  }

  // Devam et
  for (const val of Object.values(obj)) {
    extractVideos(val, isShorts, seen, results);
  }
}

function getText(obj: unknown): string {
  if (typeof obj === "string") return obj;                      // düz string
  if (!obj || typeof obj !== "object") return "";
  const o = obj as Record<string, unknown>;
  if (typeof o.simpleText === "string") return o.simpleText;   // { simpleText: "..." }
  if (typeof o.content === "string") return o.content;         // { content: "..." }  ← Shorts yeni format
  if (Array.isArray(o.runs)) {                                 // { runs: [{text:"..."}] }
    return (o.runs as Record<string, unknown>[])
      .map(r => String((r as Record<string, unknown>).text ?? ""))
      .join("");
  }
  return "";
}

function getBestThumb(thumbnailObj: unknown): string {
  if (!thumbnailObj || typeof thumbnailObj !== "object") return "";
  const t = thumbnailObj as Record<string, unknown>;
  const thumbs = t.thumbnails as { url: string; width?: number }[];
  if (!Array.isArray(thumbs) || thumbs.length === 0) return "";
  // En yüksek kaliteliyi al
  const sorted = [...thumbs].sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  return sorted[0].url ?? "";
}

function pushVideo(
  vr: Record<string, unknown>,
  isShorts: boolean,
  seen: Set<string>,
  results: ChannelVideo[],
  _type: string,
) {
  const videoId = vr.videoId as string;
  if (!videoId || videoId.length !== 11 || seen.has(videoId)) return;
  seen.add(videoId);

  // accessibility.accessibilityData.label — bazı reelItemRenderer'larda başlık buradadır
  const accessData = (vr.accessibility as Record<string, unknown>)?.accessibilityData as Record<string, unknown> | undefined;
  const accessLabel = typeof accessData?.label === "string" ? (accessData.label as string).split(/[.,!?]/)[0].trim() : "";

  const title = getText(vr.title)
    || getText(vr.headline)
    || accessLabel
    || "";

  const thumbnail = getBestThumb(vr.thumbnail) || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const publishedTime = getText(vr.publishedTimeText) || "";
  const url = isShorts
    ? `https://www.youtube.com/shorts/${videoId}`
    : `https://www.youtube.com/watch?v=${videoId}`;

  results.push({ videoId, title, thumbnail, publishedTime, isShorts, url });
}

function pushVideoFromShortLockup(
  slv: Record<string, unknown>,
  seen: Set<string>,
  results: ChannelVideo[],
) {
  // videoId: onTap → reelWatchEndpoint → videoId
  const onTap = slv.onTap as Record<string, unknown> | undefined;
  const innerTubeCommand = onTap?.innertubeCommand as Record<string, unknown> | undefined;
  const videoId = (innerTubeCommand?.reelWatchEndpoint as Record<string, unknown>)?.videoId as string
    ?? (slv.entityId as string ?? "").replace(/^short-/, "");

  if (!videoId || videoId.length !== 11 || seen.has(videoId)) return;
  seen.add(videoId);

  // Başlık: overlayMetadata.primaryText → accessibilityText (ilk cümle)
  const overlayMeta = slv.overlayMetadata as Record<string, unknown> | undefined;
  const primaryText = overlayMeta?.primaryText;
  const accessText = typeof slv.accessibilityText === "string" ? slv.accessibilityText : "";
  const title = getText(primaryText)
    || getText(slv.headline)
    || accessText.split(/[.,!?]/)[0].trim()
    || "";

  const thumbnail = getBestThumb(slv.thumbnail) || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  results.push({
    videoId,
    title,
    thumbnail,
    publishedTime: "",
    isShorts: true,
    url: `https://www.youtube.com/shorts/${videoId}`,
  });
}

async function scrapeChannelTab(handle: string, tab: "videos" | "shorts"): Promise<ChannelVideo[]> {
  const url = `https://www.youtube.com/${handle}/${tab}`;
  try {
    const res = await fetch(url, { headers: YT_HEADERS });
    if (!res.ok) return [];
    const html = await res.text();
    const data = extractYtInitialData(html);
    if (!data) return [];

    const results: ChannelVideo[] = [];
    const seen = new Set<string>();
    extractVideos(data, tab === "shorts", seen, results);
    return results;
  } catch {
    return [];
  }
}

// ── Ana handler ───────────────────────────────────────────────────

export async function POST(request: Request) {
  const body = await request.json() as {
    mode: "url" | "search" | "channel";
    url?: string;
    query?: string;
    handle?: string;
    filter?: "all" | "videos" | "shorts";
  };

  // ── URL ile çek ───────────────────────────────────────────────────
  if (body.mode === "url" && body.url) {
    const url = body.url.trim();
    const isShorts = url.includes("/shorts/");
    const videoId = extractYouTubeId(url);

    try {
      // YouTube sayfasını scrape et → ytInitialPlayerResponse içinde tam açıklama var
      const pageUrl = isShorts
        ? `https://www.youtube.com/shorts/${videoId}`
        : `https://www.youtube.com/watch?v=${videoId}`;

      const res = await fetch(pageUrl, { headers: YT_HEADERS });
      if (!res.ok) return Response.json({ error: "Video bulunamadı veya gizli" }, { status: 404 });

      const html = await res.text();
      const player = extractYtPlayerResponse(html);
      const details = player?.videoDetails;

      const title = details?.title ?? "";
      const description = details?.shortDescription ?? "";
      const thumbs = details?.thumbnail?.thumbnails ?? [];
      const thumbnail = thumbs.length
        ? thumbs[thumbs.length - 1].url
        : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      // Scraping tutmazsa oEmbed'e dön (açıklama olmaz ama başlık gelir)
      if (!title) {
        const oe = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
          { headers: YT_HEADERS },
        );
        if (!oe.ok) return Response.json({ error: "Video bulunamadı" }, { status: 404 });
        const oeData = await oe.json() as { title: string; thumbnail_url: string; author_name: string };
        return Response.json({ videoId, title: oeData.title, description: "", thumbnail: oeData.thumbnail_url, channel: oeData.author_name, isShorts });
      }

      return Response.json({ videoId, title, description, thumbnail, isShorts });
    } catch {
      return Response.json({ error: "Video çekilemedi" }, { status: 500 });
    }
  }

  // ── Arama ─────────────────────────────────────────────────────────
  if (body.mode === "search" && body.query) {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) return Response.json({ error: "Serper API key eksik" }, { status: 500 });

    try {
      const res = await fetch("https://google.serper.dev/videos", {
        method: "POST",
        headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ q: body.query, num: 12, hl: "tr", gl: "tr" }),
      });

      if (!res.ok) return Response.json({ error: "Arama başarısız" }, { status: 500 });

      const data = await res.json() as {
        videos?: {
          title: string;
          link: string;
          snippet?: string;
          imageUrl?: string;
          channel?: string;
          duration?: string;
        }[];
      };

      const results = (data.videos ?? [])
        .filter(v => v.link && (v.link.includes("youtube.com") || v.link.includes("youtu.be")))
        .map(v => {
          const videoId = extractYouTubeId(v.link);
          const durationSec = v.duration ? parseDurationSeconds(v.duration) : 999;
          const isShorts = v.link.includes("/shorts/") || (durationSec > 0 && durationSec <= 60);
          return {
            videoId,
            title: v.title ?? "",
            description: v.snippet ?? "",
            thumbnail: v.imageUrl ?? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            channel: v.channel ?? "",
            duration: v.duration ?? "",
            isShorts,
            url: v.link,
          };
        });

      return Response.json({ results });
    } catch {
      return Response.json({ error: "Arama hatası" }, { status: 500 });
    }
  }

  // ── Kanal'dan çek ─────────────────────────────────────────────────
  if (body.mode === "channel" && body.handle) {
    const handle = body.handle.trim().startsWith("@")
      ? body.handle.trim()
      : `@${body.handle.trim()}`;
    const filter = body.filter ?? "all";

    try {
      let videos: ChannelVideo[] = [];
      const seen = new Set<string>();

      if (filter === "all" || filter === "videos") {
        const regular = await scrapeChannelTab(handle, "videos");
        for (const v of regular) {
          if (!seen.has(v.videoId)) { seen.add(v.videoId); videos.push(v); }
        }
      }

      if (filter === "all" || filter === "shorts") {
        const shorts = await scrapeChannelTab(handle, "shorts");
        for (const v of shorts) {
          if (!seen.has(v.videoId)) { seen.add(v.videoId); videos.push(v); }
        }
      }

      // Shorts önce, sonra normal sırayla
      videos = [
        ...videos.filter(v => v.isShorts),
        ...videos.filter(v => !v.isShorts),
      ];

      return Response.json({ results: videos, count: videos.length });
    } catch {
      return Response.json({ error: "Kanal çekilemedi" }, { status: 500 });
    }
  }

  return Response.json({ error: "Geçersiz istek" }, { status: 400 });
}
