import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-dynamic";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

const AYLAR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getUTCDate()} ${AYLAR[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
}

function getPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const wordCount = content.split(/\s+/).length;
      const isDraft = new Date(data.publishedAt as string) > new Date();
      return {
        slug,
        title: data.title as string,
        publishedAt: data.publishedAt as string,
        category: data.category as string,
        coverImage: data.coverImage as string,
        readingTime: Math.max(1, Math.ceil(wordCount / 200)),
        isDraft,
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export default function BlogListPage() {
  const posts = getPosts();
  const published = posts.filter((p) => !p.isDraft);
  const drafts = posts.filter((p) => p.isDraft);

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Blog Yazıları</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {published.length} yayında · {drafts.length} taslak
          </p>
        </div>
        <Link
          href="/admin/blog/yeni"
          className="px-4 py-2 rounded-lg text-white text-sm font-black"
          style={{ background: "#ff351b" }}
        >
          + Yeni Yazı
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <p className="text-4xl mb-4">📝</p>
          <p className="font-bold">Henüz yazı yok.</p>
          <Link href="/admin/blog/yeni" className="inline-block mt-3 text-sm font-black" style={{ color: "#ff351b" }}>
            İlk yazını ekle →
          </Link>
        </div>
      ) : (
        <div className="space-y-2 max-w-4xl">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-xl border border-zinc-100 shadow-sm flex items-center gap-4 px-5 py-4 hover:shadow-md transition-shadow"
            >
              {post.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.coverImage} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0 hidden sm:block" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${post.isDraft ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                    {post.isDraft ? "Taslak" : "Yayında"}
                  </span>
                  <span className="text-[11px] text-zinc-400">{post.category}</span>
                </div>
                <p className="font-black text-zinc-900 text-sm line-clamp-1">{post.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {formatDate(post.publishedAt)} · {post.readingTime} dk okuma
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
                >
                  Görüntüle
                </Link>
                <Link
                  href={`/admin/blog/${post.slug}`}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg text-white"
                  style={{ background: "#ff351b" }}
                >
                  Düzenle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
