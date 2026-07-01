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

// publishedAt'e göre filtreleme/sıralama her çağrıda taze `Date.now()` ile
// yapılmalı (zamanlanmış yayın bu mantığa bağlı) — bu yüzden yalnızca
// pahalı olan disk okuma + parse adımı önbelleğe alınıyor, tarih filtresi
// değil. Önbellek 60 saniye sonra otomatik yenilenir; admin panelinden bir
// yazı eklenip/düzenlendiğinde de en geç bu sürede yansır.
type RawPost = { slug: string; data: Record<string, unknown>; content: string };

let rawCache: RawPost[] | null = null;
let cacheLoadedAt = 0;
const CACHE_TTL_MS = 60_000;

function readAllRaw(): RawPost[] {
  const now = Date.now();
  if (rawCache && now - cacheLoadedAt < CACHE_TTL_MS) return rawCache;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  rawCache = files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    return { slug, data, content };
  });
  cacheLoadedAt = now;
  return rawCache;
}

function toBlogPost(raw: RawPost): BlogPost {
  const { slug, data, content } = raw;
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
    faqs: data.faqs as { q: string; a: string }[] | undefined,
  };
}

export function getAllPosts(): BlogPost[] {
  const now = new Date();
  return readAllRaw()
    .map(toBlogPost)
    .filter((p) => new Date(p.publishedAt) <= now)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const raw = readAllRaw().find((p) => p.slug === slug);
  if (!raw) return null;

  const post = toBlogPost(raw);
  if (new Date(post.publishedAt) > new Date()) return null;
  return post;
}

export function getAllPostsAdmin(): (BlogPost & { isDraft: boolean })[] {
  const now = new Date();
  return readAllRaw()
    .map(toBlogPost)
    .map((post) => ({ ...post, isDraft: new Date(post.publishedAt) > now }))
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
}

export function updatePostPublishedAt(slug: string, publishedAt: string): void {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  data.publishedAt = publishedAt;
  fs.writeFileSync(filePath, matter.stringify(content, data), "utf-8");
  rawCache = null; // değişiklik anında yansısın
}

export function getAllSlugs(): string[] {
  return readAllRaw().map((p) => p.slug);
}
