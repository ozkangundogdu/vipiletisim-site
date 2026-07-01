"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { buildSchedule, fmtDate, defaultStartDate } from "@/lib/schedule-utils";
import type { ScheduleResult } from "@/lib/schedule-utils";

type VideoItem = {
  id: string;
  title: string;
  category: string;
  thumbnail: string | null;
  videoId: string;
  platform: string;
  visibleFrom: string;
  isScheduled: boolean;
  isVisible: boolean;
};

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const CAT_COLORS: Record<string, string> = {
  tamir: "bg-blue-100 text-blue-700",
  musteri: "bg-green-100 text-green-700",
  inceleme: "bg-purple-100 text-purple-700",
  diger: "bg-zinc-100 text-zinc-600",
};

export default function VideoZamanlanamaPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [appliedMsg, setAppliedMsg] = useState("");

  // Seçim
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState<"scheduled" | "all" | "manual">("scheduled");

  // Zamanlama ayarları
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(22);
  const [activeDays, setActiveDays] = useState([true, true, true, true, true, true, true]);
  const [schedMode, setSchedMode] = useState<"daily" | "interval">("interval");
  const [postsPerDay, setPostsPerDay] = useState(3);
  const [intervalHours, setIntervalHours] = useState(3);

  // Manuel tarih atama (tek video)
  const [manualTarget, setManualTarget] = useState<string | null>(null);
  const [manualDate, setManualDate] = useState("");
  const [manualTime, setManualTime] = useState("09:00");

  // Önizleme
  const [preview, setPreview] = useState<ScheduleResult[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/vippanel/zamanlama/video")
      .then(r => r.json())
      .then((data: VideoItem[]) => {
        setVideos(data);
        const sched = new Set(data.filter(v => v.isScheduled).map(v => v.id));
        setSelected(sched);
        setLoading(false);
      });
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (selectionMode === "scheduled") setSelected(new Set(videos.filter(v => v.isScheduled).map(v => v.id)));
    else if (selectionMode === "all") setSelected(new Set(videos.map(v => v.id)));
  }, [selectionMode, videos]);

  function toggleDay(i: number) {
    setActiveDays(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
    setShowPreview(false);
  }

  function toggleVideo(id: string) {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
    setShowPreview(false);
    setSelectionMode("manual");
  }

  const selectedItems = useMemo(() =>
    videos
      .filter(v => selected.has(v.id))
      .map(v => ({ slug: v.id, title: v.title, publishedAt: v.visibleFrom })),
    [selected, videos]
  );

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
    await fetch("/api/vippanel/zamanlama/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preview.map(r => ({ id: r.slug, visibleFrom: r.newDate }))),
    });
    setApplying(false);
    setAppliedMsg(`✓ ${preview.length} video zamanlandı`);
    setShowPreview(false);
    load();
    setTimeout(() => setAppliedMsg(""), 4000);
  }

  async function applyManual() {
    if (!manualTarget || !manualDate) return;
    const visibleFrom = `${manualDate}T${manualTime}`;
    setApplying(true);
    await fetch("/api/vippanel/zamanlama/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ id: manualTarget, visibleFrom }]),
    });
    setApplying(false);
    setManualTarget(null);
    load();
  }

  async function clearSchedule(id: string) {
    await fetch("/api/vippanel/zamanlama/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ id, visibleFrom: "" }]),
    });
    load();
  }

  const scheduledCount = videos.filter(v => v.isScheduled).length;
  const visibleCount = videos.filter(v => v.isVisible).length;

  if (loading) return <div className="p-8 pt-16 md:pt-8 text-sm text-zinc-400">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Video Zamanlama</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {videos.length} video · {visibleCount} yayında · {scheduledCount} zamanlanmış
          </p>
        </div>
        <div className="flex items-center gap-3">
          {appliedMsg && <span className="text-sm font-black text-green-600">{appliedMsg}</span>}
          <Link href="/vippanel/videolar"
            className="px-4 py-2 rounded-lg text-sm font-black border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors">
            ← Video Yönetimi
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Sol: Video listesi */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
            <h2 className="font-black text-zinc-900 text-sm">Videolar</h2>
            <div className="flex gap-1 text-xs">
              {(["scheduled", "all", "manual"] as const).map(m => (
                <button key={m} onClick={() => setSelectionMode(m)}
                  className={`px-2.5 py-1 rounded-md font-bold transition-colors ${selectionMode === m ? "text-white" : "text-zinc-500 hover:bg-zinc-100"}`}
                  style={{ background: selectionMode === m ? "#ff351b" : undefined }}>
                  {m === "scheduled" ? "Zamanlanmış" : m === "all" ? "Tümü" : "Manuel"}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto max-h-[600px]">
            {videos.map(v => {
              const isSelected = selected.has(v.id);
              const thumb = v.thumbnail ?? `https://img.youtube.com/vi/${v.videoId}/default.jpg`;
              return (
                <div key={v.id}
                  className={`flex items-center gap-3 px-3 py-2.5 border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${isSelected ? "bg-red-50/40" : ""}`}>

                  {/* Checkbox */}
                  <button onClick={() => toggleVideo(v.id)}
                    className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? "border-[#ff351b] bg-[#ff351b]" : "border-zinc-300"}`}>
                    {isSelected && <span className="text-white text-[9px] font-black leading-none">✓</span>}
                  </button>

                  {/* Thumb */}
                  <div className="relative h-10 w-16 rounded overflow-hidden shrink-0 bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb} alt="" className="h-full w-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-zinc-800 truncate">{v.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${CAT_COLORS[v.category] ?? "bg-zinc-100 text-zinc-500"}`}>
                        {v.category}
                      </span>
                      {v.isScheduled && (
                        <span className="text-[9px] font-black text-amber-600">
                          {fmtDate(v.visibleFrom)}
                        </span>
                      )}
                      {v.isVisible && !v.isScheduled && (
                        <span className="text-[9px] font-black text-green-600">Yayında</span>
                      )}
                    </div>
                  </div>

                  {/* Aksiyonlar */}
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => { setManualTarget(v.id); setManualDate(new Date().toISOString().slice(0, 10)); setManualTime("09:00"); }}
                      className="text-[10px] font-black text-zinc-400 hover:text-zinc-700 px-1.5 py-1 rounded hover:bg-zinc-100"
                      title="Manuel tarih ata">
                      📅
                    </button>
                    {v.visibleFrom && (
                      <button onClick={() => clearSchedule(v.id)}
                        className="text-[10px] font-black text-zinc-400 hover:text-red-500 px-1.5 py-1 rounded hover:bg-red-50"
                        title="Zamanlamayı kaldır">
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t border-zinc-100 bg-zinc-50 text-xs text-zinc-500 font-bold">
            {selected.size} video seçili
          </div>
        </div>

        {/* Sağ: Zamanlama paneli */}
        <div className="xl:col-span-3 space-y-4">

          {/* Manuel tekli atama modal */}
          {manualTarget && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-zinc-900 text-sm">
                  Manuel Tarih Ata —{" "}
                  <span className="text-amber-700 font-bold">
                    {videos.find(v => v.id === manualTarget)?.title?.slice(0, 40) ?? manualTarget}
                  </span>
                </h2>
                <button onClick={() => setManualTarget(null)} className="text-zinc-400 hover:text-zinc-700 font-black text-lg">×</button>
              </div>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-zinc-500 mb-1">Tarih</label>
                  <input type="date" value={manualDate} onChange={e => setManualDate(e.target.value)}
                    className="input w-full" min={new Date().toISOString().slice(0, 10)} />
                </div>
                <div className="w-28">
                  <label className="block text-xs font-bold text-zinc-500 mb-1">Saat</label>
                  <input type="time" value={manualTime} onChange={e => setManualTime(e.target.value)}
                    className="input w-full" />
                </div>
                <button onClick={applyManual} disabled={applying || !manualDate}
                  className="px-4 py-2 rounded-lg text-white text-sm font-black disabled:opacity-40 shrink-0"
                  style={{ background: "#ff351b" }}>
                  {applying ? "..." : "Uygula"}
                </button>
              </div>
            </div>
          )}

          {/* Başlangıç */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
            <h2 className="font-black text-zinc-900 text-sm mb-4">Başlangıç</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 sm:col-span-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">Tarih</label>
                <input type="date" value={startDate}
                  onChange={e => { setStartDate(e.target.value); setShowPreview(false); }}
                  className="input" min={new Date().toISOString().slice(0, 10)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">Başlangıç saati</label>
                <select value={startHour}
                  onChange={e => { setStartHour(+e.target.value); setShowPreview(false); }}
                  className="input">
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{String(i).padStart(2, "0")}:00</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">Bitiş saati</label>
                <select value={endHour}
                  onChange={e => { setEndHour(+e.target.value); setShowPreview(false); }}
                  className="input">
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i} disabled={i <= startHour}>
                      {String(i).padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Aktif Günler */}
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

          {/* Yayın hızı */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
            <h2 className="font-black text-zinc-900 text-sm mb-4">Yayın Hızı</h2>
            <div className="flex gap-2 mb-4">
              {(["interval", "daily"] as const).map(m => (
                <button key={m} onClick={() => { setSchedMode(m); setShowPreview(false); }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${schedMode === m ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-600"}`}>
                  {m === "interval" ? "Her X saatte 1" : "Günde X video"}
                </button>
              ))}
            </div>

            {schedMode === "interval" ? (
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-2">Kaç saatte bir?</label>
                <div className="flex gap-2 flex-wrap items-center">
                  {[1, 2, 3, 4, 5, 6, 8, 12, 24].map(h => (
                    <button key={h} onClick={() => { setIntervalHours(h); setShowPreview(false); }}
                      className={`px-3 h-10 rounded-lg text-sm font-black transition-colors border-2 ${intervalHours === h ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-600"}`}>
                      {h}s
                    </button>
                  ))}
                  <input type="number" min={1} max={168} value={intervalHours}
                    onChange={e => { setIntervalHours(+e.target.value); setShowPreview(false); }}
                    className="input w-20 text-center font-black" />
                </div>
                {startHour < endHour && (
                  <p className="text-xs text-zinc-400 mt-2">
                    → {startHour}:00–{endHour}:00 arasında günde en fazla{" "}
                    <strong>{Math.floor((endHour - startHour) / intervalHours)}</strong> video
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-2">Günde kaç video?</label>
                <div className="flex gap-2 flex-wrap items-center">
                  {[1, 2, 3, 5, 7, 10].map(n => (
                    <button key={n} onClick={() => { setPostsPerDay(n); setShowPreview(false); }}
                      className={`w-12 h-10 rounded-lg text-sm font-black transition-colors border-2 ${postsPerDay === n ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-600"}`}>
                      {n}
                    </button>
                  ))}
                  <input type="number" min={1} max={50} value={postsPerDay}
                    onChange={e => { setPostsPerDay(+e.target.value); setShowPreview(false); }}
                    className="input w-20 text-center font-black" />
                </div>
                {startHour < endHour && (
                  <p className="text-xs text-zinc-400 mt-2">
                    → Her video {Math.round(((endHour - startHour) * 60) / postsPerDay)} dakika arayla yayınlanır
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Özet & Aksiyonlar */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
            <div className="text-sm text-zinc-500 mb-3">
              <strong className="text-zinc-900">{selected.size}</strong> video seçili ·{" "}
              {activeDays.filter(Boolean).length} gün aktif ·{" "}
              {schedMode === "interval" ? `her ${intervalHours} saatte 1` : `günde ${postsPerDay} video`}
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={calcPreview}
                disabled={selected.size === 0 || !activeDays.some(Boolean)}
                className="px-5 py-2.5 rounded-lg text-sm font-black border-2 border-[#ff351b] text-[#ff351b] hover:bg-red-50 transition-colors disabled:opacity-40">
                Önizle
              </button>
              {showPreview && (
                <button onClick={applySchedule} disabled={applying}
                  className="px-5 py-2.5 rounded-lg text-sm font-black text-white disabled:opacity-50 transition-opacity"
                  style={{ background: "#ff351b" }}>
                  {applying ? "Uygulanıyor..." : `Uygula (${preview.length} video)`}
                </button>
              )}
            </div>
          </div>

          {/* Önizleme tablosu */}
          {showPreview && preview.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                <h2 className="font-black text-zinc-900 text-sm">Önizleme — {preview.length} video</h2>
                <span className="text-xs text-zinc-400">
                  Son: {fmtDate(preview[preview.length - 1].newDate)}
                </span>
              </div>
              <div className="overflow-auto max-h-96">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50">
                      <th className="text-left px-4 py-2.5 font-black text-zinc-600">#</th>
                      <th className="text-left px-4 py-2.5 font-black text-zinc-600">Video</th>
                      <th className="text-left px-4 py-2.5 font-black text-zinc-600">Yayın Tarihi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, i) => {
                      const vid = videos.find(v => v.id === row.slug);
                      const thumb = vid?.thumbnail ?? `https://img.youtube.com/vi/${vid?.videoId ?? ""}/default.jpg`;
                      return (
                        <tr key={row.slug} className="border-b border-zinc-50 hover:bg-zinc-50">
                          <td className="px-4 py-2 text-zinc-400 font-bold">{i + 1}</td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={thumb} alt="" className="w-10 h-7 object-cover rounded shrink-0" />
                              <span className="font-bold text-zinc-800 truncate max-w-[160px]">{row.title}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2 font-bold text-green-700 whitespace-nowrap">{fmtDate(row.newDate)}</td>
                        </tr>
                      );
                    })}
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
              Seçili video yok veya aktif gün belirlenmedi.
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-zinc-100 rounded-xl text-xs text-zinc-500 space-y-1">
        <p><strong>Nasıl çalışır?</strong> <em>visibleFrom</em> tarihi geçmemiş videolar public sayfada görünmez — tarih gelince otomatik görünür.</p>
        <p>📅 ikonu ile tek tek manuel tarih atanabilir. ✕ ikonu ile zamanlamayı kaldırarak videoyu hemen yayına alabilirsiniz.</p>
      </div>
    </div>
  );
}
