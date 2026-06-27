import { getAllPostsAdmin, updatePostPublishedAt } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = getAllPostsAdmin();
  return Response.json(posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    publishedAt: p.publishedAt,
    isDraft: p.isDraft,
    category: p.category,
  })));
}

export async function POST(request: Request) {
  const items: { slug: string; publishedAt: string }[] = await request.json();
  for (const { slug, publishedAt } of items) {
    try { updatePostPublishedAt(slug, publishedAt); } catch { /* skip missing */ }
  }
  return Response.json({ ok: true, updated: items.length });
}
