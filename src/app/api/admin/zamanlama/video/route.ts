import { getVideos, saveVideos } from "@/lib/videos";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();
  const videos = getVideos();
  return Response.json(
    videos.map(v => ({
      id: v.id,
      title: v.title,
      category: v.category,
      thumbnail: v.thumbnail ?? null,
      videoId: v.videoId,
      platform: v.platform,
      visibleFrom: v.visibleFrom ?? "",
      isScheduled: !!v.visibleFrom && new Date(v.visibleFrom) > now,
      isVisible: !v.visibleFrom || new Date(v.visibleFrom) <= now,
    }))
  );
}

export async function POST(request: Request) {
  const updates: { id: string; visibleFrom: string }[] = await request.json();
  const videos = getVideos();
  const map = new Map(updates.map(u => [u.id, u.visibleFrom]));
  const updated = videos.map(v => {
    if (!map.has(v.id)) return v;
    const val = map.get(v.id);
    const { visibleFrom: _, ...rest } = v;
    void _;
    return val ? { ...rest, visibleFrom: val } : rest;
  });
  saveVideos(updated);
  return Response.json({ ok: true, updated: updates.length });
}
