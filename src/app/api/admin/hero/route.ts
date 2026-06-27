import { getHero, saveHero } from "@/lib/hero";
import type { HeroData } from "@/lib/hero";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getHero());
}

export async function POST(request: Request) {
  const data: HeroData = await request.json();
  saveHero(data);
  return Response.json({ ok: true });
}
