"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  category: string;
  coverImage: string;
  readingTime: number;
  isDraft: boolean;
};

const PER_PAGE = 30;

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [publishing, setPublishing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vippanel/blog")
      .then((r) => r.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let list = posts;
    if (filter === "draft") list = list.filter((p) => p.isDraft);
    if (filter === "published") list = list.filter((p) => !p.isDraft);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title?.toLowerCase().includes(q) || p.slug.includes(q));
    }
    return list;
  }, [posts, filter, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const published = posts.filter((p) => !p.isDraft).length;
  const drafts = posts.filter((p) => p.isDraft).length;

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  function handleFilter(v: "all" | "draft" | "published") {
    setFilter(v);
    setPage(1);
  }

  async function handleDelete(slug: string) {
    if (!confirm(`"${slug}" silinsin mi?`)) return;
    setDeleting(slug);
    await fetch(`/api/vippanel/blog/${slug}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
    setDeleting(null);
  }

  async function handlePublishNow(slug: string) {
    setPublishing(slug);
    const now = new Date().toISOString().slice(0, 16);
    await fetch(`/api/vippanel/blog/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publishedAt: now }),
    });
    setPosts((prev) => prev.map((p) => p.slug === slug ? { ...p, publishedAt: now, isDraft: false } : p));
    setPublishing(null);
  }

  if (loading) return <div className="p-8 pt-16 md:pt-8 text-sm text-zinc-400">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Blog Yazıları</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {published} yayında · <span className="text-amber-600 font-black">{drafts} taslak</span> · {posts.length} toplam
          </p>
        </div>
        <Link
          href="/vippanel/blog/yeni"
          className="px-4 py-2 rounded-lg text-white text-sm font-black"
          style={{ background: "#ff351b" }}
        >
          + Yeni Yazı
        </Link>
      </div>

      {/* Arama & Filtre */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="search"
          placeholder="Başlık veya slug ara..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="input flex-1 min-w-[200px] text-sm"
        />
        <div className="flex gap-1">
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-black transition-colors border-2 ${
                filter === f ? "text-white border-transparent" : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
              }`}
              style={filter === f ? { background: "#ff351b" } : undefined}
            >
              {f === "all" ? `Tümü (${posts.length})` : f === "published" ? `Yayında (${published})` : `Taslak (${drafts})`}
            </button>
          ))}
        </div>
      </div>

      {/* Sonuç sayısı */}
      <p className="text-xs text-zinc-400 mb-3">
        {filtered.length} sonuç · sayfa {page}/{totalPages || 1}
      </p>

      {/* Liste */}
      {paginated.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <p className="text-4xl mb-4">📝</p>
          <p className="font-bold">Sonuç bulunamadı.</p>
        </div>
      ) : (
        <div className="space-y-2 max-w-4xl">
          {paginated.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-xl border border-zinc-100 shadow-sm flex items-center gap-3 px-4 py-3 hover:shadow-md transition-shadow"
            >
              {/* Kapak görseli */}
              <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-zinc-100 bg-zinc-50 flex items-center justify-center">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      post.isDraft ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {post.isDraft ? "Taslak" : "Yayında"}
                  </span>
                  {!post.coverImage && (
                    <span className="text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-400">
                      Resim yok
                    </span>
                  )}
                  <span className="text-[11px] text-zinc-400">{post.category}</span>
                </div>
                <p className="font-black text-zinc-900 text-sm line-clamp-1">{post.title || post.slug}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5 font-mono truncate">{post.slug}</p>
              </div>

              <div className="flex gap-2 shrink-0">
                {post.isDraft && (
                  <button
                    onClick={() => handlePublishNow(post.slug)}
                    disabled={publishing === post.slug}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                    style={{ background: "#16a34a" }}
                  >
                    {publishing === post.slug ? "..." : "Yayınla"}
                  </button>
                )}
                <Link
                  href={`/vippanel/blog/${post.slug}`}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg text-white"
                  style={{ background: "#ff351b" }}
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  disabled={deleting === post.slug}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
                >
                  {deleting === post.slug ? "..." : "Sil"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-sm font-bold border-2 border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
          >
            ← Önceki
          </button>
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
            const pg = page <= 5 ? i + 1 : page + i - 4;
            if (pg < 1 || pg > totalPages) return null;
            return (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`w-9 h-9 rounded-lg text-sm font-black transition-colors ${
                  page === pg ? "text-white" : "border-2 border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                }`}
                style={page === pg ? { background: "#ff351b" } : undefined}
              >
                {pg}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm font-bold border-2 border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
          >
            Sonraki →
          </button>
          <span className="text-xs text-zinc-400 ml-2">{page}/{totalPages}</span>
        </div>
      )}
    </div>
  );
}
