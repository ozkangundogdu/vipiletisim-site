import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const FILE = path.join(process.cwd(), "content/categories.json");

export async function GET() {
  try {
    return Response.json(JSON.parse(fs.readFileSync(FILE, "utf-8")));
  } catch {
    return Response.json(["Tamir Rehberi", "Arıza Rehberi", "iPhone Sorunları", "Acil Rehber", "Hizmet Rehberi"]);
  }
}

export async function POST(request: Request) {
  const body: string[] = await request.json();
  fs.writeFileSync(FILE, JSON.stringify(body, null, 2), "utf-8");
  return Response.json({ ok: true });
}
