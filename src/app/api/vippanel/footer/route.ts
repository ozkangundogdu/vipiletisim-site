import { getFooter, saveFooter } from "@/lib/footer";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getFooter());
}

export async function POST(request: Request) {
  const body = await request.json();
  saveFooter(body);
  return Response.json({ ok: true });
}
