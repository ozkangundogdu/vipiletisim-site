import { getSettings, saveSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = getSettings();
  return Response.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  saveSettings(body);
  return Response.json({ ok: true });
}
