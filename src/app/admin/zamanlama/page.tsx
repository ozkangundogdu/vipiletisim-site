"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { buildSchedule, fmtDate, defaultStartDate, type ScheduleResult } from "@/lib/schedule-utils";

type PostItem = {
  slug: string;
  title: string;
  publishedAt: string;
  isDraft: boolean;
  category: string;
};

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export default function ZamanlanamaPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [appliedMsg, setAppliedMsg] = useState("");

  // Selection
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState<"drafts" | "all" | "manual">("drafts");

  // Schedule options
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(18);
  const [activeDays, setActiveDays] = useState([true, true, true, true, true, false, false]);
  const [schedMode, setSchedMode] = useState<"daily" | "interval">("daily");
  const [postsPerDay, setPostsPerDay] = useState(3);
  const [intervalHours, setIntervalHours] = useState(4);

  // Preview
  const [preview, setPreview] = useState<ScheduleResult[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetch("/api/admin/zamanlama")
      .then((r) => r.json())
      .then((data: PostItem[]) => {
        setPosts(data);
        const drafts = new Set(data.filter((p) => p.isDraft).map((p) => p.slug));
        setSelected(drafts);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectionMode === "drafts") setSelected(new Set(posts.filter((p) => p.isDraft).map((p) => p.slug)));
    else if (selectionMode === "all") setSelected(new Set(posts.map((p) => p.slug)));
    else { /* manual — don't reset */ }
  }, [selectionMode, posts]);

  function toggleDay(i: number) {
    setActiveDays((prev) => { const n = [...prev]; n[i] = !n[i]; return n; });
    setShowPreview(false);
  }

  function togglePost(slug: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(slug) ? n.delete(slug) : n.add(slug);
      return n;
    });
    setShowPreview(false);
    setSelectionMode("manual");
  }

  const selectedItems = useMemo(() => {
    return posts.filter((p) => selected.has(p.slug));
  }, [selected, posts]);

  function calcPreview() {
    if (!activeDays.some(Boolean)) return;
    const res = buildSchedule(selectedItems, {
      startDate, startHour, endHour, activeDays,
      mode: schedMode, postsPerDay, intervalHours,
    });
    setPreview(res);
    setShowPreview(true);
  }

  async function applySchedule() {
    if (!preview.length) return;
    setApplying(true);
    const res = await fetch("/api/admin/zamanlama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preview.map((r) => ({ slug: r.slug, publishedAt: r.newDate }))),
    });
    const json = await res.json();
    setApplying(false);
    setAppliedMsg(`✓ ${json.updated} yazının tarihi güncellendi`);
    setShowPreview(false);
    // Refresh list
    fetch("/api/admin/zamanlama").then((r) => r.json()).then((data: PostItem[]) => setPosts(data));
    setTimeout(() => setAppliedMsg(""), 4000);
  }

  const draftCount = posts.filter((p) => p.isDraft).length;
  const publishedCount = posts.length - draftCount;

  if (loading) return <div className="p-8 pt-16 md:pt-8 text-sm text-zinc-400">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">İçerik Zamanlama</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {posts.length} toplam · {publishedCount} yayında · {draftCount} taslak
          </p>
        </div>
        {appliedMsg && <span className="text-sm font-black text-green-600">{appliedMsg}</span>}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Left: Post list */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
            <h2 className="font-black text-zinc-900 text-sm">Yazılar</h2>
            <div className="flex gap-1 text-xs">
              {(["drafts", "all", "manual"] as const).map((m) => (
                <button key={m} onClick={() => setSelectionMode(m)}
                  className={`px-2.5 py-1 rounded-md font-bold transition-colors ${selectionMode === m ? "text-white" : "text-zinc-500 hover:bg-zinc-100"}`}
                  style={{ background: selectionMode === m ? "#ff351b" : undefined }}>
                  {m === "drafts" ? "Taslaklar" : m === "all" ? "Tümü" : "Manuel"}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto max-h-[520px]">
            {posts.length === 0 && (
              <p className="text-sm text-zinc-400 text-center py-10">Henüz blog yazısı yok.</p>
            )}
            {posts.map((post) => {
              const isSelected = selected.has(post.slug);
              return (
                <label key={post.slug}
                  className={`flex items-start gap-3 px-5 py-3 cursor-pointer border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${isSelected ? "bg-red-50/50" : ""}`}
                >
                  <span className={`mt-0.5 w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center ${isSelected ? "border-[#ff351b] bg-[#ff351b]" : "border-zinc-300"}`}>
                    {isSelected && <span className="text-white text-[9px] font-black">✓</span>}
                  </span>
                  <input type="checkbox" checked={isSelected} onChange={() => togglePost(post.slug)} className="sr-only" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 truncate">{post.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${post.isDraft ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                        {post.isDraft ? "TASLAK" : "YAYINDA"}
                      </span>
                      <span className="text-[11px] text-zinc-400">{fmtDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50 text-xs text-zinc-500 font-bold">
            {selected.size} yazı seçili
          </div>
        </div>

        {/* Right: Schedule builder */}
        <div className="xl:col-span-3 space-y-4">

          {/* Date & Time */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
            <h2 className="font-black text-zinc-900 text-sm mb-4">Başlangıç</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 sm:col-span-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">Tarih</label>
                <input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setShowPreview(false); }}
                  className="input" min={new Date().toISOString().slice(0, 10)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">Başlangıç saati</label>
                <select value={startHour} onChange={(e) => { setStartHour(+e.target.value); setShowPreview(false); }} className="input">
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{String(i).padStart(2, "0")}:00</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">Bitiş saati</label>
                <select value={endHour} onChange={(e) => { setEndHour(+e.target.value); setShowPreview(false); }} className="input">
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i} disabled={i <= startHour}>{String(i).padStart(2, "0")}:00</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Days */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
            <h2 className="font-black text-zinc-900 text-sm mb-3">Aktif Günler</h2>
            <div className="flex gap-2 flex-wrap">
              {DAYS.map((d, i) => (
                <button key={d} onClick={() => toggleDay(i)}
                  className={`w-12 h-10 rounded-lg text-sm font-black transition-colors border-2 ${activeDays[i] ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-400 bg-white"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Publish Rate */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
            <h2 className="font-black text-zinc-900 text-sm mb-4">Yayın Hızı</h2>
            <div className="flex gap-2 mb-4">
              {(["daily", "interval"] as const).map((m) => (
                <button key={m} onClick={() => { setSchedMode(m); setShowPreview(false); }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${schedMode === m ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-600"}`}>
                  {m === "daily" ? "Günde X yazı" : "Her X saatte 1 yazı"}
                </button>
              ))}
            </div>

            {schedMode === "daily" ? (
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-2">Günde kaç yazı yayınlansın?</label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 5, 7, 10].map((n) => (
                    <button key={n} onClick={() => { setPostsPerDay(n); setShowPreview(false); }}
                      className={`w-12 h-10 rounded-lg text-sm font-black transition-colors border-2 ${postsPerDay === n ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-600"}`}>
                      {n}
                    </button>
                  ))}
                  <input type="number" min={1} max={50} value={postsPerDay}
                    onChange={(e) => { setPostsPerDay(+e.target.value); setShowPreview(false); }}
                    className="input w-20 text-center font-black" />
                </div>
                {startHour < endHour && (
                  <p className="text-xs text-zinc-400 mt-2">
                    → Her yazı {Math.round(((endHour - startHour) * 60) / postsPerDay)} dakika arayla yayınlanır
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-2">Kaç saatte bir yayınlansın?</label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 6, 8, 12, 24].map((h) => (
                    <button key={h} onClick={() => { setIntervalHours(h); setShowPreview(false); }}
                      className={`px-3 h-10 rounded-lg text-sm font-black transition-colors border-2 ${intervalHours === h ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-600"}`}>
                      {h}s
                    </button>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  → {startHour}:00-{endHour}:00 arasında günde en fazla {Math.floor((endHour - startHour) / intervalHours)} yazı
                </p>
              </div>
            )}
          </div>

          {/* Summary & Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="text-sm text-zinc-500">
                <strong className="text-zinc-900">{selected.size}</strong> yazı seçili ·{" "}
                {activeDays.filter(Boolean).length} gün aktif ·{" "}
                {schedMode === "daily" ? `günde ${postsPerDay} yazı` : `her ${intervalHours} saatte 1 yazı`}
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={calcPreview}
                disabled={selected.size === 0 || !activeDays.some(Boolean)}
                className="px-5 py-2.5 rounded-lg text-sm font-black border-2 border-[#ff351b] text-[#ff351b] hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Önizle
              </button>
              {showPreview && (
                <button
                  onClick={applySchedule}
                  disabled={applying}
                  className="px-5 py-2.5 rounded-lg text-sm font-black text-white transition-opacity disabled:opacity-50"
                  style={{ background: "#ff351b" }}
                >
                  {applying ? "Uygulanıyor..." : `Uygula (${preview.length} yazı)`}
                </button>
              )}
            </div>
          </div>

          {/* Preview Table */}
          {showPreview && preview.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                <h2 className="font-black text-zinc-900 text-sm">Önizleme — {preview.length} yazı</h2>
                <span className="text-xs text-zinc-400">
                  Son yayın: {fmtDate(preview[preview.length - 1].newDate)}
                </span>
              </div>
              <div className="overflow-auto max-h-80">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50">
                      <th className="text-left px-4 py-2.5 font-black text-zinc-600">#</th>
                      <th className="text-left px-4 py-2.5 font-black text-zinc-600">Yazı</th>
                      <th className="text-left px-4 py-2.5 font-black text-zinc-600">Eski Tarih</th>
                      <th className="text-left px-4 py-2.5 font-black text-zinc-600">Yeni Tarih</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, i) => (
                      <tr key={row.slug} className="border-b border-zinc-50 hover:bg-zinc-50">
                        <td className="px-4 py-2.5 text-zinc-400 font-bold">{i + 1}</td>
                        <td className="px-4 py-2.5 font-bold text-zinc-800 max-w-[180px] truncate">{row.title}</td>
                        <td className="px-4 py-2.5 text-zinc-400">{fmtDate(row.oldDate)}</td>
                        <td className="px-4 py-2.5 font-bold text-green-700">{fmtDate(row.newDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 text-xs text-zinc-500">
                İlk yayın {fmtDate(preview[0].newDate)} · Son yayın {fmtDate(preview[preview.length - 1].newDate)}
              </div>
            </div>
          )}

          {showPreview && preview.length === 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 font-bold">
              Seçili yazı yok veya aktif gün belirlenmedi.
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-zinc-100 rounded-xl text-xs text-zinc-500 space-y-1">
        <p><strong>Nasıl çalışır?</strong> Gelecek tarih atanan yazılar site ziyaretçilerine görünmez, tarihi geçince otomatik yayınlanır.</p>
        <p>Tarihleri değiştirmek yazı içeriğini etkilemez. İstediğiniz zaman <Link href="/admin/blog" className="underline">Blog sayfasından</Link> manuel düzenleyebilirsiniz.</p>
      </div>
    </div>
  );
}
