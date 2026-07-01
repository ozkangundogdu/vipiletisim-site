import type { MetadataRoute } from "next";
import fs from "fs";

export const revalidate = 3600; // her saat başı yeniden üret
import path from "path";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { getAllPosts } from "@/lib/blog";
import { getAllMarkaTamirler } from "@/lib/marka-tamir";
import { getVideos } from "@/lib/videos";
import { youtubeThumbnail, instagramEmbedUrl } from "@/lib/video-utils";

const BASE = "https://vipiletisim.com.tr";

// Dosya yoksa fallback tarih döndür
function fileMtime(filePath: string, fallback: string): string {
  try {
    return fs.statSync(filePath).mtime.toISOString();
  } catch {
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts[0]?.publishedAt ?? "2026-06-25";

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: latestPost, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/tamir-hizmetleri`, lastModified: "2026-06-25", changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/fiyatlar`, lastModified: "2026-06-25", changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/bolge`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tamir-egitimi`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/iletisim`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/kurumsal/hakkimizda`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/kurumsal/sikca-sorulan-sorular`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/kurumsal/ekibimiz`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/cep-tamir-videolar`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.6 },
  ];

  const repairPagesDir = path.join(process.cwd(), "content/repair-pages");
  const markaTamirDir = path.join(process.cwd(), "content/marka-tamirler");

  // Eski model bazlı sayfalar (şu an boş, ileride kullanılabilir)
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/tamir-hizmetleri/${s.slug}`,
    lastModified: fileMtime(path.join(repairPagesDir, `${s.slug}.json`), "2026-06-25"),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Yeni marka bazlı tamir sayfaları (58 sayfa)
  const markaTamirPages: MetadataRoute.Sitemap = getAllMarkaTamirler().map((m) => ({
    url: `${BASE}/tamir-hizmetleri/${m.slug}`,
    lastModified: fileMtime(path.join(markaTamirDir, `${m.slug}.json`), "2026-06-30"),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${BASE}/bolge/${c.slug}`,
    lastModified: "2026-06-25",
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPosts: MetadataRoute.Sitemap = posts.map((p) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.publishedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    };
    // Kapak görselini görsel sitemap'ine (<image:image>) ekle
    if (p.coverImage) {
      const imgUrl = p.coverImage.startsWith("http") ? p.coverImage : `${BASE}${p.coverImage}`;
      entry.images = [imgUrl];
    }
    return entry;
  });

  // Video detay sayfaları (cep-tamir-videolar/[id]) + video sitemap etiketleri.
  // getVideos() noStore() kullandığı için yeni video eklenince sitemap anında güncellenir.
  const videosMtime = fileMtime(path.join(process.cwd(), "content/videos.json"), "2026-06-25");
  const now = Date.now();
  const videoPages: MetadataRoute.Sitemap = getVideos()
    // Yayın tarihi ileri olan (henüz gizli) videoları hariç tut
    .filter((v) => !v.visibleFrom || new Date(v.visibleFrom).getTime() <= now)
    .map((v) => {
      // id "v" + epoch(ms) formatında; yayın tarihini buradan türet
      const ts = Number(String(v.id).replace(/^v/, ""));
      const publicationDate =
        Number.isFinite(ts) && ts > 1_000_000_000_000
          ? new Date(ts).toISOString()
          : v.visibleFrom ?? videosMtime;
      const description = v.description?.trim() || `Trabzon Vip İletişim — ${v.title}`;
      const thumbnail =
        v.thumbnail ?? (v.platform === "youtube" ? youtubeThumbnail(v.videoId) : undefined);
      // player_loc: sorgu parametresiz temiz embed URL (XML'de "&" kaçış sorununu önler)
      const playerLoc =
        v.platform === "youtube"
          ? `https://www.youtube.com/embed/${v.videoId}`
          : instagramEmbedUrl(v.videoId);

      const entry: MetadataRoute.Sitemap[number] = {
        url: `${BASE}/cep-tamir-videolar/${v.id}`,
        lastModified: videosMtime,
        changeFrequency: "monthly",
        priority: 0.6,
      };

      // Geçerli bir thumbnail varsa <video:video> etiketlerini ekle
      // (YouTube'da her zaman vardır; Instagram için ancak thumbnail tanımlıysa)
      if (thumbnail) {
        entry.videos = [
          {
            title: v.title,
            thumbnail_loc: thumbnail,
            description,
            player_loc: playerLoc,
            publication_date: publicationDate,
            family_friendly: "yes",
          },
        ];
      }
      return entry;
    });

  return [
    ...staticPages,
    ...markaTamirPages,
    ...servicePages,
    ...cityPages,
    ...blogPosts,
    ...videoPages,
  ];
}
