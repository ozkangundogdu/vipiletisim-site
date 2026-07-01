import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { id, platform, videoId } = await request.json() as {
    id: string;
    platform: "youtube" | "instagram";
    videoId: string;
  };

  const dir = path.join(process.cwd(), "public/thumbnails");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${id}.jpg`);
  const publicPath = `/thumbnails/${id}.jpg`;

  try {
    let imageUrl: string | null = null;

    if (platform === "youtube") {
      // hqdefault önce, yoksa default
      for (const quality of ["hqdefault", "mqdefault", "default"]) {
        const url = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
        const probe = await fetch(url, { method: "HEAD" });
        if (probe.ok) { imageUrl = url; break; }
      }
    } else {
      // Instagram oEmbed (token gerektirmeyen public endpoint)
      const oembedRes = await fetch(
        `https://www.instagram.com/oembed/?url=https://www.instagram.com/reel/${videoId}/`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          },
        }
      );
      if (oembedRes.ok) {
        const oembed = await oembedRes.json() as { thumbnail_url?: string };
        imageUrl = oembed.thumbnail_url ?? null;
      }
    }

    if (!imageUrl) return Response.json({ path: null });

    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return Response.json({ path: null });

    const buffer = await imgRes.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    return Response.json({ path: publicPath });
  } catch {
    return Response.json({ path: null });
  }
}
