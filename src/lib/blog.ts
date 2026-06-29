import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  coverImage: string;
  keywords: string[];
  readingTime: number;
  content: string;
  faqs?: { q: string; a: string }[];
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        publishedAt: data.publishedAt as string,
        category: data.category as string,
        coverImage: data.coverImage as string,
        keywords: (data.keywords as string[]) ?? [],
        readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        content,
        faqs: (data.faqs as { q: string; a: string }[] | undefined),
      };
    })
    .filter((p) => new Date(p.publishedAt) <= new Date())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (new Date(data.publishedAt as string) > new Date()) return null;

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    publishedAt: data.publishedAt as string,
    category: data.category as string,
    coverImage: data.coverImage as string,
    keywords: (data.keywords as string[]) ?? [],
    readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
    content,
    faqs: (data.faqs as { q: string; a: string }[] | undefined),
  };
}

export function getAllPostsAdmin(): (BlogPost & { isDraft: boolean })[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      const publishedAt = data.publishedAt as string;
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        publishedAt,
        category: data.category as string,
        coverImage: data.coverImage as string,
        keywords: (data.keywords as string[]) ?? [],
        readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        content,
        faqs: (data.faqs as { q: string; a: string }[] | undefined),
        isDraft: new Date(publishedAt) > new Date(),
      };
    })
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
}

export function updatePostPublishedAt(slug: string, publishedAt: string): void {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  data.publishedAt = publishedAt;
  fs.writeFileSync(filePath, matter.stringify(content, data), "utf-8");
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
