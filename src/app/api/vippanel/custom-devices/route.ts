import { getCustomDevices, saveCustomDevices, type CustomDevice } from "@/lib/custom-services";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getCustomDevices());
}

export async function POST(request: Request) {
  const body: CustomDevice[] = await request.json();
  saveCustomDevices(body);
  return Response.json({ ok: true });
}
