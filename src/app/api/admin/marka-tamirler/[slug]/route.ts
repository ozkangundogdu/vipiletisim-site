import { getMarkaTamir, saveMarkaTamir } from "@/lib/marka-tamir";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DIR = path.join(process.cwd(), "content/marka-tamirler");

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getMarkaTamir(slug);
  if (!data) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json(data);
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json();
  const existing = getMarkaTamir(slug);
  if (!existing) return Response.json({ error: "not found" }, { status: 404 });
  saveMarkaTamir({ ...existing, ...body, slug });
  revalidatePath("/tamir-hizmetleri");
  revalidatePath(`/tamir-hizmetleri/${slug}`);
  return Response.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = path.join(DIR, `${slug}.json`);
  try {
    if (fs.existsSync(file)) fs.unlinkSync(file);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
