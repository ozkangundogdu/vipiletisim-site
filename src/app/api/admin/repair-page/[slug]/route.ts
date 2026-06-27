import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DIR = path.join(process.cwd(), "content/repair-pages");

function ensureDir() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  ensureDir();
  try {
    const data = JSON.parse(fs.readFileSync(path.join(DIR, `${slug}.json`), "utf-8"));
    return Response.json(data);
  } catch {
    return Response.json({ slug, customTitle: "", customDescription: "", customContent: "", coverImage: "" });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  ensureDir();
  const body = await request.json();
  fs.writeFileSync(path.join(DIR, `${slug}.json`), JSON.stringify({ slug, ...body }, null, 2), "utf-8");
  return Response.json({ ok: true });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(DIR, `${slug}.json`);
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
