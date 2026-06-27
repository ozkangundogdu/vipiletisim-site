import { getNav, saveNav } from "@/lib/settings";
import type { NavItem } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getNav());
}

export async function POST(request: Request) {
  const items: NavItem[] = await request.json();
  saveNav(items);
  return Response.json({ ok: true });
}
