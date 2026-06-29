import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-dynamic";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return Response.json({ error: "Bulunamadı" }, { status: 404 });
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return Response.json({ slug, ...data, content });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return Response.json({ error: "Bulunamadı" }, { status: 404 });
  }

  const body = await request.json();
  const { title, description, publishedAt, category, coverImage, keywords, content, faqs } = body;
  const frontmatter: Record<string, unknown> = { title, description, publishedAt, category, coverImage, keywords };
  if (faqs && faqs.length > 0) frontmatter.faqs = faqs;
  const fileContent = matter.stringify(content ?? "", frontmatter);
  fs.writeFileSync(filePath, fileContent, "utf-8");

  return Response.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return Response.json({ error: "Bulunamadı" }, { status: 404 });
  }
  fs.unlinkSync(filePath);
  return Response.json({ ok: true });
}
