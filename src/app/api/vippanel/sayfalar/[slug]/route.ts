import { getPageContent, savePageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

const ALLOWED = ["fiyatlar", "hakkimizda", "ekibimiz", "tamir-egitimi", "sosyal-medya"] as const;
type Slug = typeof ALLOWED[number];

function isAllowed(slug: string): slug is Slug {
  return ALLOWED.includes(slug as Slug);
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isAllowed(slug)) return Response.json({ error: "Sayfa bulunamadı" }, { status: 404 });
  return Response.json(getPageContent(slug));
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isAllowed(slug)) return Response.json({ error: "Sayfa bulunamadı" }, { status: 404 });
  const data = await req.json();
  savePageContent(slug, data);
  return Response.json({ ok: true });
}
