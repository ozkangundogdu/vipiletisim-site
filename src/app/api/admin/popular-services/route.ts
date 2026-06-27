import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const FILE = path.join(process.cwd(), "content/popular-services.json");

export type PopularService = {
  slug: string;
  customTitle: string;
  customDescription: string;
  customIntro: string;
};

export async function GET() {
  const raw = fs.readFileSync(FILE, "utf-8");
  return Response.json(JSON.parse(raw));
}

export async function POST(request: Request) {
  const body = await request.json();
  fs.writeFileSync(FILE, JSON.stringify(body, null, 2), "utf-8");
  return Response.json({ ok: true });
}
