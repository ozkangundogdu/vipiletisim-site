"use client";

import { useEffect, useState, useMemo } from "react";
import { buildSchedule, fmtDate, defaultStartDate, type ScheduleResult } from "@/lib/schedule-utils";

type PostItem = {
  slug: string;
  title: string;
  publishedAt: string;
  isDraft: boolean;
  category: string;
};

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export default function TopluYayinPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Arama & filtre
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<"drafts" | "all">("drafts");

  // Seçim
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Aktif sekme: manuel | otomatik
  const [tab, setTab] = useState<"manuel" | "otomatik">("manuel");

  // Manuel mod
  const [manuelDate, setManuelDate] = useState("");
  const [stagger, setStagger] = useState(true); // 1'er dakika aralıkla mı?

  // Otomatik mod
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(18);
  const [activeDays, setActiveDays] = useState([true, true, true, true, true, false, false]);
  const [schedMode, setSchedMode] = useState<"daily" | "interval">("daily");
  const [postsPerDay, setPostsPerDay] = useState(3);
  const [intervalHours, setIntervalHours] = useState(4);
  const [preview, setPreview] = useState<ScheduleResult[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  function loadPosts() {
    setLoading(true);
    fetch("/api/vippanel/zamanlama")
      .then((r) => r.json())
      .then((data: PostItem[]) => {
        setPosts(data);
        // Varsayılan: tüm taslakları seç
        const drafts = new Set(data.filter((p) => p.isDraft).map((p) => p.slug));
        setSelected(drafts);
        setLoading(false);
      });
  }

  const filteredPosts = useMemo(() => {
    let list = filterMode === "drafts" ? posts.filter((p) => p.isDraft) : posts;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.slug.includes(q));
    }
    return list;
  }, [posts, filterMode, search]);

  const selectedItems = useMemo(
    () => filteredPosts.filter((p) => selected.has(p.slug)),
    [filteredPosts, selected]
  );

  const draftCount = posts.filter((p) => p.isDraft).length;

  function togglePost(slug: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(slug) ? n.delete(slug) : n.add(slug);
      return n;
    });
    setShowPreview(false);
  }

  function selectAll() {
    setSelected((prev) => {
      const n = new Set(prev);
      filteredPosts.forEach((p) => n.add(p.slug));
      return n;
    });
  }

  function deselectAll() {
    setSelected((prev) => {
      const n = new Set(prev);
      filteredPosts.forEach((p) => n.delete(p.slug));
      return n;
    });
  }

  function toggleDay(i: number) {
    setActiveDays((prev) => { const n = [...prev]; n[i] = !n[i]; return n; });
    setShowPreview(false);
  }

  // Manuel uygula
  async function applyManuel() {
    if (!manuelDate || selectedItems.length === 0) return;
    setApplying(true);
    const base = new Date(manuelDate);
    const payload = selectedItems.map((p, i) => ({
      slug: p.slug,
      publishedAt: stagger
        ? new Date(base.getTime() + i * 60000).toISOString().slice(0, 16)
        : manuelDate,
    }));
    const res = await fetch("/api/vippanel/zamanlama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setApplying(false);
    showMsg(`${json.updated} yazıya tarih atandı`, true);
    loadPosts();
  }

  // Otomatik önizle
  function calcPreview() {
    if (!activeDays.some(Boolean)) return;
    const res = buildSchedule(selectedItems, {
      startDate, startHour, endHour, activeDays,
      mode: schedMode, postsPerDay, intervalHours,
    });
    setPreview(res);
    setShowPreview(true);
  }

  // Otomatik uygula
  async function applySchedule() {
    if (!preview.length) return;
    setApplying(true);
    const res = await fetch("/api/vippanel/zamanlama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preview.map((r) => ({ slug: r.slug, publishedAt: r.newDate }))),
    });
    const json = await res.json();
    setApplying(false);
    setShowPreview(false);
    showMsg(`${json.updated} yazının tarihi güncellendi`, true);
    loadPosts();
  }

  function showMsg(text: string, ok: boolean) {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 4000);
  }

  if (loading) return <div className="p-8 pt-16 md:pt-8 text-sm text-zinc-400">Yükleniyor...</div>;

  const allFilteredSelected = filteredPosts.length > 0 && filteredPosts.every((p) => selected.has(p.slug));

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Toplu Yayın Yönetimi</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {posts.length} toplam · {posts.length - draftCount} yayında ·{" "}
            <span className="font-black text-amber-600">{draftCount} taslak</span>
          </p>
        </div>
        {msg && (
          <span className={`text-sm font-black ${msg.ok ? "text-green-600" : "text-red-600"}`}>
            {msg.ok ? "✓" : "✗"} {msg.text}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Sol: Makale Listesi */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden flex flex-col">
          {/* Arama & filtre */}
          <div className="p-4 border-b border-zinc-100 space-y-2">
            <input
              type="search"
              placeholder="Makale ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full text-sm"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {(["drafts", "all"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setFilterMode(m)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${
                      filterMode === m ? "text-white" : "text-zinc-500 hover:bg-zinc-100"
                    }`}
                    style={{ background: filterMode === m ? "#ff351b" : undefined }}
                  >
                    {m === "drafts" ? `Taslaklar (${draftCount})` : `Tümü (${posts.length})`}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                <button onClick={selectAll} className="text-xs text-zinc-400 hover:text-zinc-700 px-2 py-1">
                  Tümünü Seç
                </button>
                <button onClick={deselectAll} className="text-xs text-zinc-400 hover:text-zinc-700 px-2 py-1">
                  Temizle
                </button>
              </div>
            </div>
          </div>

          {/* Liste */}
          <div className="overflow-y-auto flex-1" style={{ maxHeight: "520px" }}>
            {filteredPosts.length === 0 && (
              <p className="text-sm text-zinc-400 text-center py-10">Makale bulunamadı.</p>
            )}
            {filteredPosts.map((post) => {
              const isSel = selected.has(post.slug);
              return (
                <label
                  key={post.slug}
                  className={`flex items-start gap-3 px-4 py-2.5 cursor-pointer border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${isSel ? "bg-red-50/40" : ""}`}
                >
                  <span
                    className={`mt-0.5 w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center ${
                      isSel ? "border-[#ff351b] bg-[#ff351b]" : "border-zinc-300"
                    }`}
                  >
                    {isSel && <span className="text-white text-[9px] font-black">✓</span>}
                  </span>
                  <input type="checkbox" checked={isSel} onChange={() => togglePost(post.slug)} className="sr-only" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 line-clamp-1">{post.title || post.slug}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                          post.isDraft ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {post.isDraft ? "TASLAK" : "YAYINDA"}
                      </span>
                      <span className="text-[11px] text-zinc-400 truncate">{post.category}</span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t border-zinc-100 bg-zinc-50 text-xs text-zinc-500 font-bold">
            {selected.size} makale seçili · {filteredPosts.length} gösteriliyor
          </div>
        </div>

        {/* Sağ: Zamanlama paneli */}
        <div className="xl:col-span-3 space-y-4">

          {/* Sekme seçici */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-1 flex gap-1">
            {(["manuel", "otomatik"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setShowPreview(false); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-black transition-colors ${
                  tab === t ? "text-white" : "text-zinc-500 hover:bg-zinc-50"
                }`}
                style={{ background: tab === t ? "#ff351b" : undefined }}
              >
                {t === "manuel" ? "Manuel Tarih Ata" : "Otomatik Zamanlama"}
              </button>
            ))}
          </div>

          {/* ─── MANUEL TAB ─── */}
          {tab === "manuel" && (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5 space-y-4">
                <h2 className="font-black text-zinc-900 text-sm">Yayın Tarihi Seç</h2>
                <p className="text-xs text-zinc-500">
                  Seçili {selected.size} makale bu tarihe ayarlanır. Makaleler henüz yayınlanmaz; tarihi geçince otomatik görünür hale gelir.
                </p>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1">Tarih ve Saat</label>
                  <input
                    type="datetime-local"
                    value={manuelDate}
                    onChange={(e) => setManuelDate(e.target.value)}
                    className="input"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <span
                    className={`w-9 h-5 rounded-full relative transition-colors ${stagger ? "bg-[#ff351b]" : "bg-zinc-200"}`}
                    onClick={() => setStagger((v) => !v)}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${stagger ? "translate-x-4" : "translate-x-0.5"}`}
                    />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-zinc-800">Dakika aralıkla dağıt</p>
                    <p className="text-xs text-zinc-400">
                      {stagger
                        ? "Her makale bir dakika arayla yayınlanır (sıralama korunur)"
                        : "Tüm makaleler aynı anda yayınlanır"}
                    </p>
                  </div>
                </label>

                {manuelDate && selected.size > 0 && stagger && (
                  <div className="text-xs text-zinc-500 bg-zinc-50 rounded-lg p-3">
                    İlk yayın: <strong>{fmtDate(manuelDate)}</strong> ·{" "}
                    Son yayın:{" "}
                    <strong>
                      {fmtDate(
                        new Date(
                          new Date(manuelDate).getTime() + (selected.size - 1) * 60000
                        ).toISOString().slice(0, 16)
                      )}
                    </strong>
                  </div>
                )}

                <button
                  onClick={applyManuel}
                  disabled={!manuelDate || selected.size === 0 || applying}
                  className="w-full py-3 rounded-lg text-sm font-black text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#ff351b" }}
                >
                  {applying ? "Uygulanıyor..." : `Tarihi Ata (${selected.size} makale)`}
                </button>
              </div>

              {/* Seçili makaleler özeti */}
              {selected.size > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
                  <div className="px-5 py-3 border-b border-zinc-100">
                    <h2 className="font-black text-zinc-900 text-sm">Seçili Makaleler ({selected.size})</h2>
                  </div>
                  <div className="overflow-auto max-h-64">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50">
                          <th className="text-left px-4 py-2 font-black text-zinc-600">#</th>
                          <th className="text-left px-4 py-2 font-black text-zinc-600">Başlık</th>
                          <th className="text-left px-4 py-2 font-black text-zinc-600">Kategori</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItems.map((p, i) => (
                          <tr key={p.slug} className="border-b border-zinc-50 hover:bg-zinc-50">
                            <td className="px-4 py-2 text-zinc-400 font-bold">{i + 1}</td>
                            <td className="px-4 py-2 font-bold text-zinc-800 max-w-[220px] truncate">
                              {p.title || p.slug}
                            </td>
                            <td className="px-4 py-2 text-zinc-400">{p.category}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ─── OTOMATİK TAB ─── */}
          {tab === "otomatik" && (
            <>
              {/* Başlangıç tarihi */}
              <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                <h2 className="font-black text-zinc-900 text-sm mb-4">Başlangıç</h2>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-xs font-bold text-zinc-500 mb-1">Tarih</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => { setStartDate(e.target.value); setShowPreview(false); }}
                      className="input"
                      min={new Date().toISOString().slice(0, 10)}
                    />
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

              {/* Aktif günler */}
              <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                <h2 className="font-black text-zinc-900 text-sm mb-3">Aktif Günler</h2>
                <div className="flex gap-2 flex-wrap">
                  {DAYS.map((d, i) => (
                    <button
                      key={d}
                      onClick={() => toggleDay(i)}
                      className={`w-12 h-10 rounded-lg text-sm font-black transition-colors border-2 ${
                        activeDays[i]
                          ? "border-[#ff351b] text-[#ff351b] bg-red-50"
                          : "border-zinc-200 text-zinc-400 bg-white"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Yayın hızı */}
              <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                <h2 className="font-black text-zinc-900 text-sm mb-4">Yayın Hızı</h2>
                <div className="flex gap-2 mb-4">
                  {(["daily", "interval"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setSchedMode(m); setShowPreview(false); }}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${
                        schedMode === m
                          ? "border-[#ff351b] text-[#ff351b] bg-red-50"
                          : "border-zinc-200 text-zinc-600"
                      }`}
                    >
                      {m === "daily" ? "Günde X yazı" : "Her X saatte 1 yazı"}
                    </button>
                  ))}
                </div>

                {schedMode === "daily" ? (
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2">Günde kaç yazı?</label>
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 5, 7, 10].map((n) => (
                        <button
                          key={n}
                          onClick={() => { setPostsPerDay(n); setShowPreview(false); }}
                          className={`w-12 h-10 rounded-lg text-sm font-black border-2 transition-colors ${
                            postsPerDay === n
                              ? "border-[#ff351b] text-[#ff351b] bg-red-50"
                              : "border-zinc-200 text-zinc-600"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                      <input
                        type="number" min={1} max={50} value={postsPerDay}
                        onChange={(e) => { setPostsPerDay(+e.target.value); setShowPreview(false); }}
                        className="input w-20 text-center font-black"
                      />
                    </div>
                    {startHour < endHour && (
                      <p className="text-xs text-zinc-400 mt-2">
                        → Her yazı {Math.round(((endHour - startHour) * 60) / postsPerDay)} dakika arayla yayınlanır
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2">Kaç saatte bir?</label>
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4, 6, 8, 12, 24].map((h) => (
                        <button
                          key={h}
                          onClick={() => { setIntervalHours(h); setShowPreview(false); }}
                          className={`px-3 h-10 rounded-lg text-sm font-black border-2 transition-colors ${
                            intervalHours === h
                              ? "border-[#ff351b] text-[#ff351b] bg-red-50"
                              : "border-zinc-200 text-zinc-600"
                          }`}
                        >
                          {h}s
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-400 mt-2">
                      → {startHour}:00–{endHour}:00 arasında günde en fazla {Math.floor((endHour - startHour) / intervalHours)} yazı
                    </p>
                  </div>
                )}
              </div>

              {/* Özet & Butonlar */}
              <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                <p className="text-sm text-zinc-500 mb-3">
                  <strong className="text-zinc-900">{selected.size}</strong> yazı ·{" "}
                  {activeDays.filter(Boolean).length} aktif gün ·{" "}
                  {schedMode === "daily" ? `günde ${postsPerDay} yazı` : `her ${intervalHours} saatte 1 yazı`}
                </p>
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

              {/* Önizleme tablosu */}
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
                          <th className="text-left px-4 py-2.5 font-black text-zinc-600">Başlık</th>
                          <th className="text-left px-4 py-2.5 font-black text-zinc-600">Yeni Tarih</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preview.map((row, i) => (
                          <tr key={row.slug} className="border-b border-zinc-50 hover:bg-zinc-50">
                            <td className="px-4 py-2.5 text-zinc-400 font-bold">{i + 1}</td>
                            <td className="px-4 py-2.5 font-bold text-zinc-800 max-w-[200px] truncate">{row.title}</td>
                            <td className="px-4 py-2.5 font-bold text-green-700">{fmtDate(row.newDate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 text-xs text-zinc-500">
                    İlk: {fmtDate(preview[0].newDate)} · Son: {fmtDate(preview[preview.length - 1].newDate)}
                  </div>
                </div>
              )}

              {showPreview && preview.length === 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 font-bold">
                  Seçili yazı yok veya aktif gün belirlenmedi.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-zinc-100 rounded-xl text-xs text-zinc-500">
        <strong>Not:</strong> Gelecek tarih atanan yazılar site ziyaretçilerine görünmez; tarihi geçince otomatik yayınlanır.
        Bireysel düzenleme için{" "}
        <a href="/vippanel/blog" className="underline font-bold">Blog Yazıları</a> sayfasını kullanabilirsiniz.
      </div>
    </div>
  );
}
