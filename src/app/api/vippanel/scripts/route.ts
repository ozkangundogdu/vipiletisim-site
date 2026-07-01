import { getScripts, saveScripts } from "@/lib/scripts";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getScripts());
}

export async function POST(request: Request) {
  const body = await request.json();
  saveScripts(body);
  return Response.json({ ok: true });
}
