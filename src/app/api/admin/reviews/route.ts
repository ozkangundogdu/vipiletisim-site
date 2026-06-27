import { getReviews, saveReviews } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getReviews());
}

export async function POST(request: Request) {
  const body = await request.json();
  saveReviews(body);
  return Response.json({ ok: true });
}
