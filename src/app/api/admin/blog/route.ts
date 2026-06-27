import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-dynamic";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function GET() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      publishedAt: data.publishedAt as string,
      category: data.category as string,
      coverImage: data.coverImage as string,
      keywords: (data.keywords as string[]) ?? [],
    };
  });
  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return Response.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { slug, title, description, publishedAt, category, coverImage, keywords, content } = body;

  if (!slug || !title) {
    return Response.json({ error: "slug ve title zorunlu" }, { status: 400 });
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    return Response.json({ error: "Bu slug zaten mevcut" }, { status: 409 });
  }

  const frontmatter = { title, description, publishedAt, category, coverImage, keywords };
  const fileContent = matter.stringify(content ?? "", frontmatter);
  fs.writeFileSync(filePath, fileContent, "utf-8");

  return Response.json({ ok: true, slug });
}
