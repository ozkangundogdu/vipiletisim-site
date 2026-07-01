import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogEditorWrapper } from "../BlogEditorWrapper";

export const dynamic = "force-dynamic";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const initialData = {
    slug,
    title: data.title as string,
    description: data.description as string,
    publishedAt: data.publishedAt as string,
    category: data.category as string,
    coverImage: data.coverImage as string,
    keywords: (data.keywords as string[]) ?? [],
    content,
  };

  return <BlogEditorWrapper initialData={initialData} />;
}
