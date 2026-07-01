import { getHero, saveHero } from "@/lib/hero";
import type { HeroData } from "@/lib/hero";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getHero());
}

export async function POST(request: Request) {
  const data: HeroData = await request.json();
  saveHero(data);
  revalidatePath("/");
  return Response.json({ ok: true });
}
