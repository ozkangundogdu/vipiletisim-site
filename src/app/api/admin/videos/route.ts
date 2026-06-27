import { getVideos, saveVideos } from "@/lib/videos";
import type { Video } from "@/lib/videos";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getVideos());
}

export async function POST(request: Request) {
  const data: Video[] = await request.json();
  saveVideos(data);
  return Response.json({ ok: true });
}
