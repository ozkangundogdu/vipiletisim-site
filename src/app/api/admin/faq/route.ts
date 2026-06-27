import { getFaq, saveFaq } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getFaq());
}

export async function POST(request: Request) {
  const body = await request.json();
  saveFaq(body);
  return Response.json({ ok: true });
}
