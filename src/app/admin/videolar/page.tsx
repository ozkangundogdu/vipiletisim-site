"use client";

import { useEffect, useRef, useState } from "react";
import type { Video, VideoCategory, VideoPlatform } from "@/lib/video-utils";

const CATEGORIES: { value: VideoCategory; label: string }[] = [
  { value: "tamir", label: "Tamir" },
  { value: "musteri", label: "Müşteri" },
  { value: "inceleme", label: "İnceleme" },
  { value: "diger", label: "Diğer" },
];

const DEFAULT_HANDLE = "@FatihcomertVip";

function extractYouTubeId(input: string): string {
  const regexps = [
    /(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const r of regexps) { const m = input.match(r); if (m) return m[1]; }
  return input.trim();
}

function extractInstagramShortcode(input: string): string {
  const m = input.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : input.trim();
}

function fmtSchedule(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" })
    + " " + d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

type AddForm = { platform: VideoPlatform; url: string; title: string; description: string; category: VideoCategory };
type YTResult = { videoId: string; title: string; description?: string; thumbnail: string; channel?: string; duration?: string; publishedTime?: string; isShorts: boolean; url: string };

type StagingVideo = {
  videoId: string; url: string; title: string; description: string;
  category: VideoCategory; thumbnail: string; isShorts: boolean;
  visibleFrom?: string; // hesaplanmış veya manuel
};

function emptyForm(): AddForm {
  return { platform: "youtube", url: "", title: "", description: "", category: "tamir" };
}

function tomorrowDate() {
  const d = new Date(); d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function VideolarPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addForm, setAddForm] = useState<AddForm | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Bot ortak
  const [botTab, setBotTab] = useState<"url" | "search" | "channel">("url");
  const [botLoading, setBotLoading] = useState(false);
  const [botError, setBotError] = useState<string | null>(null);

  // URL sekmesi
  const [botUrl, setBotUrl] = useState("");

  // Arama sekmesi
  const [botQuery, setBotQuery] = useState("");
  const [searchResults, setSearchResults] = useState<YTResult[]>([]);

  // Kanal sekmesi
  const [channelHandle, setChannelHandle] = useState(DEFAULT_HANDLE);
  const [channelFilter, setChannelFilter] = useState<"all" | "videos" | "shorts">("all");
  const [channelResults, setChannelResults] = useState<YTResult[]>([]);
  const [channelSelected, setChannelSelected] = useState<Set<string>>(new Set());
  const [bulkCategory, setBulkCategory] = useState<VideoCategory>("tamir");
  const [channelDescriptions, setChannelDescriptions] = useState<Record<string, string>>({});

  // ── Seçili video (URL çek veya arama sonucu) ─────────────────────
  type SelectedVideo = { videoId: string; url: string; title: string; description: string; thumbnail: string; isShorts: boolean; category: VideoCategory };
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideo | null>(null);

  // ── Staging (düzenleme + zamanlama) ──────────────────────────────
  const [stagingVideos, setStagingVideos] = useState<StagingVideo[] | null>(null);
  const [stagingExpanded, setStagingExpanded] = useState<string | null>(null);
  const [fetchingDesc, setFetchingDesc] = useState<string | null>(null);
  const [schedMode, setSchedMode] = useState<"now" | "interval">("now");
  const [schedStart, setSchedStart] = useState(tomorrowDate());
  const [schedTime, setSchedTime] = useState("09:00");
  const [schedInterval, setSchedInterval] = useState(3);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/videos").then(r => r.json()).then(data => { setVideos(data); setLoading(false); });
  }, []);

  // zamanlama değişince visibleFrom'ları yeniden hesapla
  useEffect(() => {
    if (!stagingVideos) return;
    setStagingVideos(prev => (prev ?? []).map((sv, i) => ({
      ...sv,
      visibleFrom: schedMode === "interval"
        ? computeVisibleFrom(i)
        : undefined,
    })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedMode, schedStart, schedTime, schedInterval]);

  function computeVisibleFrom(index: number): string {
    const base = new Date(`${schedStart}T${schedTime}`);
    const dt = new Date(base.getTime() + index * schedInterval * 3_600_000);
    return dt.toISOString().slice(0, 16);
  }

  function resetBot() { setBotError(null); setSearchResults([]); setChannelResults([]); setChannelSelected(new Set()); setChannelDescriptions({}); }

  function move(index: number, dir: -1 | 1) {
    const next = [...videos]; const t = index + dir;
    if (t < 0 || t >= next.length) return;
    [next[index], next[t]] = [next[t], next[index]];
    setVideos(next);
  }

  function remove(id: string) {
    if (!confirm("Bu videoyu silmek istiyor musunuz?")) return;
    setVideos(prev => prev.filter(v => v.id !== id));
  }

  // ── URL ile çek ────────────────────────────────────────────────────
  async function fetchByUrl() {
    if (!botUrl.trim()) return;
    setBotLoading(true); setBotError(null);
    try {
      const res = await fetch("/api/admin/youtube-fetch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: "url", url: botUrl.trim() }) });
      const data = await res.json() as { error?: string; title?: string; description?: string };
      if (data.error) { setBotError(data.error); return; }
      const vid = extractYouTubeId(botUrl.trim());
      setSelectedVideo({
        videoId: vid, url: botUrl.trim(),
        title: data.title ?? "", description: data.description ?? "",
        thumbnail: `https://img.youtube.com/vi/${vid}/mqdefault.jpg`,
        isShorts: false, category: "tamir",
      });
      setBotUrl("");
    } catch { setBotError("Bağlantı hatası"); }
    finally { setBotLoading(false); }
  }

  // ── Arama ─────────────────────────────────────────────────────────
  async function searchVideos() {
    if (!botQuery.trim()) return;
    setBotLoading(true); setBotError(null); setSearchResults([]);
    try {
      const res = await fetch("/api/admin/youtube-fetch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: "search", query: botQuery.trim() }) });
      const data = await res.json() as { error?: string; results?: YTResult[] };
      if (data.error) { setBotError(data.error); return; }
      setSearchResults(data.results ?? []);
    } catch { setBotError("Arama hatası"); }
    finally { setBotLoading(false); }
  }

  function selectSearchResult(r: YTResult) {
    setSelectedVideo({ videoId: r.videoId, url: r.url, title: r.title, description: r.description ?? "", thumbnail: r.thumbnail, isShorts: r.isShorts, category: "tamir" });
    setSearchResults([]); setBotQuery("");
  }

  // ── Kanal ─────────────────────────────────────────────────────────
  async function fetchChannel() {
    if (!channelHandle.trim()) return;
    setBotLoading(true); setBotError(null); setChannelResults([]); setChannelSelected(new Set());
    try {
      const res = await fetch("/api/admin/youtube-fetch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: "channel", handle: channelHandle.trim(), filter: channelFilter }) });
      const data = await res.json() as { error?: string; results?: YTResult[] };
      if (data.error) { setBotError(data.error); return; }

      // Zaten eklenmiş videoları çıkar
      const existingIds = new Set(videos.map(v => v.videoId));
      const all = data.results ?? [];
      const fresh = all.filter(r => !existingIds.has(r.videoId));
      const skipped = all.length - fresh.length;

      setChannelResults(fresh);
      setChannelSelected(new Set(fresh.map(r => r.videoId)));
      if (skipped > 0) setBotError(`ℹ️ ${skipped} video zaten ekli olduğu için listede gösterilmedi.`);

      // Açıklamaları arka planda paralel çek
      setChannelDescriptions({});
      for (const r of fresh) {
        fetch("/api/admin/youtube-fetch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: "url", url: r.url }) })
          .then(res => res.json())
          .then((d: { description?: string }) => { if (d.description) setChannelDescriptions(prev => ({ ...prev, [r.videoId]: d.description! })); })
          .catch(() => {});
      }
    } catch { setBotError("Kanal çekilemedi"); }
    finally { setBotLoading(false); }
  }

  function toggleChannelSelect(videoId: string) {
    setChannelSelected(prev => { const n = new Set(prev); n.has(videoId) ? n.delete(videoId) : n.add(videoId); return n; });
  }

  function toggleSelectAll() {
    setChannelSelected(channelSelected.size === channelResults.length ? new Set() : new Set(channelResults.map(r => r.videoId)));
  }

  // Staging'e geç
  function openStaging() {
    const toStage = channelResults.filter(r => channelSelected.has(r.videoId));
    const staged = toStage.map((r, i) => ({
      videoId: r.videoId, url: r.url, title: r.title,
      description: channelDescriptions[r.videoId] ?? r.description ?? "", category: bulkCategory,
      thumbnail: r.thumbnail, isShorts: r.isShorts,
      visibleFrom: schedMode === "interval" ? computeVisibleFrom(i) : undefined,
    }));
    setStagingVideos(staged);
    setStagingExpanded(null);
  }

  function updateStaging(videoId: string, patch: Partial<StagingVideo>) {
    setStagingVideos(prev => (prev ?? []).map(v => v.videoId === videoId ? { ...v, ...patch } : v));
  }

  function removeStaging(videoId: string) {
    setStagingVideos(prev => { const next = (prev ?? []).filter(v => v.videoId !== videoId); return next.length ? next : null; });
  }

  async function commitStaging(publishNow = false) {
    if (!stagingVideos?.length) return;
    const newVideos: Video[] = stagingVideos.map(sv => ({
      id: `v${Date.now()}-${sv.videoId}`,
      platform: "youtube" as const,
      videoId: sv.videoId,
      title: sv.title || sv.videoId,
      description: sv.description || undefined,
      category: sv.category,
      visibleFrom: publishNow ? undefined : (sv.visibleFrom || undefined),
    }));

    // Güncel tam listeyi hesapla (state async olduğu için doğrudan birleştir)
    const allVideos = [...newVideos, ...videos];
    setVideos(allVideos);
    setStagingVideos(null);
    setChannelResults([]); setChannelSelected(new Set());
    setAddForm(null); resetBot();

    // Otomatik kaydet — kullanıcı Kaydet'e basmak zorunda kalmasın
    setSaving(true);
    await fetch("/api/admin/videos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(allVideos) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    // Thumbnail'ları arka planda indir
    for (const v of newVideos) {
      fetch("/api/admin/videos/thumbnail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: v.id, platform: "youtube", videoId: v.videoId }) })
        .then(r => r.json()).then((d: { path: string | null }) => { if (d.path) setVideos(prev => prev.map(p => p.id === v.id ? { ...p, thumbnail: d.path ?? undefined } : p)); }).catch(() => {});
    }
  }

  async function fetchStagingDesc(sv: StagingVideo) {
    setFetchingDesc(sv.videoId);
    try {
      const res = await fetch("/api/admin/youtube-fetch", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "url", url: sv.url }),
      });
      const data = await res.json() as { title?: string; description?: string; error?: string };
      if (!data.error) {
        updateStaging(sv.videoId, {
          title: data.title ?? sv.title,
          description: data.description ?? sv.description,
        });
      }
    } catch { /* ignore */ }
    setFetchingDesc(null);
  }

  // ── Bot'tan seçilen YouTube videosu ekle ──────────────────────────
  async function addSelectedVideo() {
    if (!selectedVideo) return;
    const id = `v${Date.now()}`;
    const newVideo: Video = { id, platform: "youtube" as const, videoId: selectedVideo.videoId, title: selectedVideo.title, description: selectedVideo.description || undefined, category: selectedVideo.category };
    const allVideos = [newVideo, ...videos];
    setVideos(allVideos);
    setSelectedVideo(null); setAddForm(null); resetBot();
    setSaving(true);
    await fetch("/api/admin/videos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(allVideos) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    fetch("/api/admin/videos/thumbnail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, platform: "youtube", videoId: selectedVideo.videoId }) })
      .then(r => r.json()).then((d: { path: string | null }) => { if (d.path) setVideos(prev => prev.map(v => v.id === id ? { ...v, thumbnail: d.path ?? undefined } : v)); }).catch(() => {});
  }

  // ── Manuel tek video ekle (Instagram) ─────────────────────────────
  async function addVideo() {
    if (!addForm || !addForm.url.trim() || !addForm.title.trim()) return;
    const videoId = addForm.platform === "youtube" ? extractYouTubeId(addForm.url) : extractInstagramShortcode(addForm.url);
    const id = `v${Date.now()}`;
    setVideos(prev => [{ id, platform: addForm.platform, videoId, title: addForm.title, description: addForm.description || undefined, category: addForm.category }, ...prev]);
    setAddForm(null); resetBot();
    fetch("/api/admin/videos/thumbnail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, platform: addForm.platform, videoId }) })
      .then(r => r.json()).then((d: { path: string | null }) => { if (d.path) setVideos(prev => prev.map(v => v.id === id ? { ...v, thumbnail: d.path ?? undefined } : v)); }).catch(() => {});
  }

  function updateVideo(id: string, patch: Partial<Video>) {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...patch } : v));
  }

  async function handleSave() {
    setSaving(true); setSaved(false);
    await fetch("/api/admin/videos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(videos) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-4xl">

      {/* Başlık */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Video Yönetimi</h1>
          <p className="text-sm text-zinc-400 font-medium mt-0.5">YouTube veya Instagram Reels URL yapıştırın</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <a href="/cep-tamir-videolar" target="_blank" className="px-4 py-2 rounded-lg text-sm font-black border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors">Sayfayı Gör ↗</a>
          <a href="/admin/videolar/zamanlama" className="px-4 py-2 rounded-lg text-sm font-black border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors">📅 Zamanla</a>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-50" style={{ background: "#ff351b" }}>
            {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
          </button>
        </div>
      </div>

      {/* ── STAGING PANEL ─────────────────────────────────────────── */}
      {stagingVideos !== null ? (
        <div className="mb-6 space-y-4">

          {/* Zamanlama ayarları (kompakt) */}
          <div className="rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-zinc-800 text-sm">Zamanlama</h3>
              <div className="flex gap-1">
                {(["now", "interval"] as const).map(m => (
                  <button key={m} onClick={() => setSchedMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 transition-colors ${schedMode === m ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-500"}`}>
                    {m === "now" ? "⚡ Hemen Yayınla" : "📅 Zamanlamalı"}
                  </button>
                ))}
              </div>
            </div>

            {schedMode === "interval" && (
              <div className="flex gap-3 flex-wrap items-end">
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase">Başlangıç Tarihi</label>
                  <input type="date" value={schedStart} onChange={e => setSchedStart(e.target.value)}
                    className="input text-sm" min={new Date().toISOString().slice(0, 10)} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase">Saat</label>
                  <input type="time" value={schedTime} onChange={e => setSchedTime(e.target.value)} className="input text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase">Aralık</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 8, 12, 24].map(h => (
                      <button key={h} onClick={() => setSchedInterval(h)}
                        className={`px-2.5 py-2 rounded-lg text-xs font-black border-2 transition-colors ${schedInterval === h ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-600"}`}>
                        {h}s
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium self-end pb-0.5">
                  Son yayın:{" "}
                  {fmtSchedule(computeVisibleFrom(stagingVideos.length - 1))}
                </p>
              </div>
            )}

            {schedMode === "now" && (
              <p className="text-xs text-zinc-400 font-medium">Tüm videolar hemen yayında görünecek.</p>
            )}
          </div>

          {/* Video listesi (düzenlenebilir) */}
          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-zinc-50">
              <span className="font-black text-zinc-800 text-sm">{stagingVideos.length} video hazırlanıyor</span>
              <div className="flex gap-2">
                <button onClick={() => setStagingVideos(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-black border border-zinc-200 text-zinc-500 hover:border-zinc-400">
                  ← Geri
                </button>
                <button onClick={() => commitStaging(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-black border-2 border-green-500 text-green-700 hover:bg-green-50 transition-colors">
                  ⚡ Hemen
                </button>
                <button onClick={() => commitStaging(false)}
                  className="px-4 py-1.5 rounded-lg text-white text-xs font-black"
                  style={{ background: "#ff351b" }}>
                  📅 {stagingVideos.length} Videoyu Ekle
                </button>
              </div>
            </div>

            <div className="divide-y divide-zinc-100 max-h-[60vh] overflow-y-auto">
              {stagingVideos.map((sv, i) => {
                const isExp = stagingExpanded === sv.videoId;
                return (
                  <div key={sv.videoId}>
                    {/* Satır */}
                    <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50">
                      {/* Sıra no */}
                      <span className="text-[11px] text-zinc-400 font-black w-5 shrink-0 text-right">{i + 1}</span>

                      {/* Thumb */}
                      <div className="relative h-10 w-16 rounded overflow-hidden shrink-0 bg-zinc-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={sv.thumbnail} alt="" className="h-full w-full object-cover" />
                        {sv.isShorts && (
                          <span className="absolute bottom-0 right-0 text-[8px] font-black bg-black/80 text-white px-0.5">S</span>
                        )}
                      </div>

                      {/* Başlık + kategori */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-zinc-800 truncate">{sv.title || <span className="text-zinc-400 italic">Başlık yok</span>}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600">{sv.category}</span>
                          {sv.visibleFrom && (
                            <span className="text-[10px] text-amber-600 font-bold">{fmtSchedule(sv.visibleFrom)}</span>
                          )}
                          {!sv.visibleFrom && <span className="text-[10px] text-green-600 font-bold">Hemen</span>}
                        </div>
                      </div>

                      {/* Düzenle / Sil */}
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => {
                            if (isExp) { setStagingExpanded(null); }
                            else { setStagingExpanded(sv.videoId); if (!sv.description) fetchStagingDesc(sv); }
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-black border transition-colors ${isExp ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-500 hover:border-zinc-400"}`}>
                          {isExp ? "Kapat" : "Düzenle"}
                        </button>
                        <button onClick={() => removeStaging(sv.videoId)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 text-base font-black transition-colors">
                          ×
                        </button>
                      </div>
                    </div>

                    {/* Inline düzenleme */}
                    {isExp && (
                      <div className="bg-zinc-50 border-t border-zinc-100 px-4 py-4 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-wide">Başlık</label>
                            <input value={sv.title}
                              onChange={e => updateStaging(sv.videoId, { title: e.target.value })}
                              className="input w-full text-sm" />
                          </div>
                          <div className="sm:col-span-2">
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-wide">Açıklama</label>
                              {fetchingDesc === sv.videoId && <span className="text-[10px] text-zinc-400 font-bold">⏳ Çekiliyor...</span>}
                            </div>
                            <textarea value={sv.description}
                              onChange={e => updateStaging(sv.videoId, { description: e.target.value })}
                              rows={3} className="input w-full resize-none text-sm" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-wide">Kategori</label>
                            <select value={sv.category}
                              onChange={e => updateStaging(sv.videoId, { category: e.target.value as VideoCategory })}
                              className="input w-full text-sm">
                              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-wide">
                              Yayın Tarihi <span className="normal-case font-medium text-zinc-400">(manuel override)</span>
                            </label>
                            <input type="datetime-local"
                              value={sv.visibleFrom ?? ""}
                              onChange={e => updateStaging(sv.videoId, { visibleFrom: e.target.value || undefined })}
                              className="input w-full text-sm" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-4 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs text-zinc-400 font-medium">
                {schedMode === "interval" ? `Her ${schedInterval}s · ${schedStart} ${schedTime} başlangıç` : "Zamanlamasız — hemen görünür"}
              </span>
              <div className="flex gap-2">
                <button onClick={() => commitStaging(true)}
                  className="px-4 py-2 rounded-lg text-sm font-black border-2 border-green-500 text-green-700 hover:bg-green-50 transition-colors">
                  ⚡ Hemen Yayınla
                </button>
                <button onClick={() => commitStaging(false)}
                  className="px-5 py-2 rounded-lg text-white text-sm font-black"
                  style={{ background: "#ff351b" }}>
                  📅 {stagingVideos.length} Videoyu Ekle
                </button>
              </div>
            </div>
          </div>
        </div>

      /* ── NORMAL EKLE FORMU ─────────────────────────────────────── */
      ) : addForm ? (
        <div className="mb-6 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-5 space-y-4">
          <h3 className="font-black text-zinc-800">Yeni Video Ekle</h3>

          {/* Platform */}
          <div className="flex gap-2">
            {(["youtube", "instagram"] as VideoPlatform[]).map(p => (
              <button key={p}
                onClick={() => { setAddForm(f => f ? { ...f, platform: p } : f); resetBot(); setSelectedVideo(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-black transition-colors ${addForm.platform === p ? "text-white" : "bg-white border border-zinc-200 text-zinc-600"}`}
                style={addForm.platform === p ? { background: p === "youtube" ? "#dc2626" : "linear-gradient(135deg,#7c3aed,#ec4899)" } : undefined}>
                {p === "youtube" ? "🔴 YouTube" : "📷 Instagram Reels"}
              </button>
            ))}
          </div>

          {/* YouTube Bot */}
          {addForm.platform === "youtube" && (
            <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
              <div className="flex border-b border-zinc-100">
                {(["url", "search", "channel"] as const).map(tab => {
                  const labels = { url: "🔗 URL ile Çek", search: "🔍 Ara", channel: "📺 Kanal" };
                  return (
                    <button key={tab} onClick={() => { setBotTab(tab); setBotError(null); }}
                      className={`flex-1 py-2.5 text-xs font-black transition-colors ${botTab === tab ? "bg-red-50 text-red-600 border-b-2 border-red-500" : "text-zinc-400 hover:bg-zinc-50"}`}>
                      {labels[tab]}
                    </button>
                  );
                })}
              </div>

              <div className="p-3 space-y-3">
                {botError && (
                  <p className={`text-xs font-bold ${botError.startsWith("ℹ️") ? "text-blue-600" : "text-red-500"}`}>
                    {botError}
                  </p>
                )}

                {/* URL */}
                {botTab === "url" && (
                  <>
                    <p className="text-[11px] text-zinc-400 font-medium">Normal video, Short veya youtu.be linki yapıştırın</p>
                    <div className="flex gap-2">
                      <input value={botUrl} onChange={e => setBotUrl(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && fetchByUrl()}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="input flex-1 text-sm" />
                      <button onClick={fetchByUrl} disabled={botLoading || !botUrl.trim()}
                        className="px-4 py-2 rounded-lg text-white text-sm font-black disabled:opacity-40 shrink-0" style={{ background: "#dc2626" }}>
                        {botLoading ? "⏳" : "Çek"}
                      </button>
                    </div>
                    {addForm.title && <p className="text-xs text-green-600 font-bold">✓ Bilgiler dolduruldu</p>}
                  </>
                )}

                {/* Arama */}
                {botTab === "search" && (
                  <>
                    <div className="flex gap-2">
                      <input ref={searchRef} value={botQuery} onChange={e => setBotQuery(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && searchVideos()}
                        placeholder="Örn: iphone ekran değişimi trabzon"
                        className="input flex-1 text-sm" />
                      <button onClick={searchVideos} disabled={botLoading || !botQuery.trim()}
                        className="px-4 py-2 rounded-lg text-white text-sm font-black disabled:opacity-40 shrink-0" style={{ background: "#dc2626" }}>
                        {botLoading ? "⏳" : "Ara"}
                      </button>
                    </div>
                    {botLoading && <p className="text-xs text-zinc-400 font-bold text-center py-2">Aranıyor...</p>}
                    {searchResults.length > 0 && (
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {searchResults.map(r => (
                          <button key={r.videoId} onClick={() => selectSearchResult(r)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg border border-zinc-100 hover:border-red-300 hover:bg-red-50 transition-colors text-left group">
                            <div className="relative h-12 w-20 rounded-md overflow-hidden shrink-0 bg-zinc-100">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={r.thumbnail} alt="" className="h-full w-full object-cover" />
                              {r.isShorts && <span className="absolute bottom-0.5 right-0.5 text-[9px] font-black bg-black/80 text-white px-1 rounded">SHORT</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-bold text-zinc-800 line-clamp-2 group-hover:text-red-700">{r.title}</p>
                              <div className="flex gap-2 mt-0.5">
                                {r.channel && <span className="text-[10px] text-zinc-400 truncate">{r.channel}</span>}
                                {r.duration && <span className="text-[10px] text-zinc-400 font-black shrink-0">{r.duration}</span>}
                              </div>
                            </div>
                            <span className="text-[11px] font-black text-red-500 opacity-0 group-hover:opacity-100 shrink-0">Seç →</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Kanal */}
                {botTab === "channel" && (
                  <>
                    <div className="space-y-2">
                      <input key="channel-handle" value={channelHandle}
                        onChange={e => setChannelHandle(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && fetchChannel()}
                        placeholder="@KanalAdi" className="input w-full text-sm font-mono" />
                      <div className="flex gap-2">
                        <select value={channelFilter}
                          onChange={e => setChannelFilter(e.target.value as "all" | "videos" | "shorts")}
                          className="input text-sm flex-1">
                          <option value="all">Tümü (Video + Short)</option>
                          <option value="videos">Yalnızca Video</option>
                          <option value="shorts">Yalnızca Short</option>
                        </select>
                        <button onClick={fetchChannel} disabled={botLoading || !channelHandle.trim()}
                          className="px-5 py-2 rounded-lg text-white text-sm font-black disabled:opacity-40 shrink-0" style={{ background: "#dc2626" }}>
                          {botLoading ? "⏳ Çekiliyor..." : "Çek"}
                        </button>
                      </div>
                    </div>

                    {botLoading && <p className="text-xs text-zinc-400 font-bold text-center py-3">Kanal çekiliyor...</p>}

                    {channelResults.length > 0 && (
                      <>
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-zinc-100">
                          <div className="flex items-center gap-2">
                            <button onClick={toggleSelectAll}
                              className="text-[11px] font-black text-zinc-500 hover:text-zinc-800 underline">
                              {channelSelected.size === channelResults.length ? "Tümünü kaldır" : "Tümünü seç"}
                            </button>
                            <span className="text-[11px] text-zinc-400">{channelResults.length} video · {channelSelected.size} seçili</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <select value={bulkCategory}
                              onChange={e => setBulkCategory(e.target.value as VideoCategory)}
                              className="input text-xs py-1 h-auto">
                              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                            <button onClick={openStaging} disabled={channelSelected.size === 0}
                              className="px-3 py-1.5 rounded-lg text-white text-xs font-black disabled:opacity-40"
                              style={{ background: "#ff351b" }}>
                              Düzenle &amp; Zamanla →
                            </button>
                          </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto space-y-1">
                          {channelResults.map(r => {
                            const sel = channelSelected.has(r.videoId);
                            const desc = channelDescriptions[r.videoId];
                            const descLoading = desc === undefined;
                            return (
                              <div key={r.videoId}
                                className={`rounded-lg border transition-colors ${sel ? "border-red-300 bg-red-50" : "border-zinc-100 hover:border-zinc-200"}`}>
                                {/* Üst satır: checkbox + thumb + başlık + hemen ekle */}
                                <div className="flex items-center gap-3 p-2">
                                  <div className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors cursor-pointer ${sel ? "bg-red-500 border-red-500" : "border-zinc-300"}`}
                                    onClick={() => toggleChannelSelect(r.videoId)}>
                                    {sel && <span className="text-white text-[10px] font-black leading-none">✓</span>}
                                  </div>
                                  <div className="relative h-10 w-16 rounded overflow-hidden shrink-0 bg-zinc-100 cursor-pointer" onClick={() => toggleChannelSelect(r.videoId)}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={r.thumbnail} alt="" className="h-full w-full object-cover" />
                                    {r.isShorts && <span className="absolute bottom-0 right-0 text-[8px] font-black bg-black/80 text-white px-0.5">S</span>}
                                  </div>
                                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleChannelSelect(r.videoId)}>
                                    <p className="text-[12px] font-bold text-zinc-800 line-clamp-1">{r.title || r.videoId}</p>
                                    <div className="flex gap-2">
                                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${r.isShorts ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>{r.isShorts ? "SHORT" : "VIDEO"}</span>
                                      {r.publishedTime && <span className="text-[10px] text-zinc-400">{r.publishedTime}</span>}
                                    </div>
                                  </div>
                                  <button
                                    onClick={async e => {
                                      e.stopPropagation();
                                      const id = `v${Date.now()}`;
                                      const newVideo: Video = { id, platform: "youtube" as const, videoId: r.videoId, title: r.title, description: channelDescriptions[r.videoId] || undefined, category: bulkCategory };
                                      const allVideos = [newVideo, ...videos];
                                      setVideos(allVideos);
                                      setChannelResults(prev => prev.filter(v => v.videoId !== r.videoId));
                                      setChannelSelected(prev => { const n = new Set(prev); n.delete(r.videoId); return n; });
                                      await fetch("/api/admin/videos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(allVideos) });
                                      setSaved(true); setTimeout(() => setSaved(false), 2000);
                                      fetch("/api/admin/videos/thumbnail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, platform: "youtube", videoId: r.videoId }) })
                                        .then(res => res.json()).then((d: { path: string | null }) => { if (d.path) setVideos(prev => prev.map(v => v.id === id ? { ...v, thumbnail: d.path ?? undefined } : v)); }).catch(() => {});
                                    }}
                                    className="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-black border-2 border-green-400 text-green-700 hover:bg-green-50 transition-colors whitespace-nowrap">
                                    + Ekle
                                  </button>
                                </div>
                                {/* Açıklama satırı */}
                                <div className="px-9 pb-2">
                                  <textarea
                                    value={desc ?? ""}
                                    onChange={e => setChannelDescriptions(prev => ({ ...prev, [r.videoId]: e.target.value }))}
                                    onClick={e => e.stopPropagation()}
                                    placeholder={descLoading ? "⏳ Açıklama çekiliyor..." : "Açıklama yok"}
                                    rows={2}
                                    className="w-full text-[11px] text-zinc-600 bg-transparent border border-zinc-200 rounded-md px-2 py-1.5 resize-none focus:outline-none focus:border-red-300 placeholder:text-zinc-400"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* YouTube: seçili video önizleme kartı */}
          {addForm.platform === "youtube" && selectedVideo && (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="relative h-16 w-24 rounded-lg overflow-hidden shrink-0 bg-zinc-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedVideo.thumbnail} alt="" className="h-full w-full object-cover" />
                  {selectedVideo.isShorts && <span className="absolute bottom-0.5 right-0.5 text-[9px] font-black bg-black/80 text-white px-1 rounded">SHORT</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-zinc-800 text-sm line-clamp-2">{selectedVideo.title}</p>
                  {selectedVideo.description && <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{selectedVideo.description}</p>}
                </div>
                <button onClick={() => setSelectedVideo(null)} className="text-zinc-400 hover:text-red-500 text-xl font-black shrink-0 leading-none">×</button>
              </div>
              <div>
                <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Kategori</label>
                <select value={selectedVideo.category}
                  onChange={e => setSelectedVideo(v => v ? { ...v, category: e.target.value as VideoCategory } : v)}
                  className="input w-full">
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={addSelectedVideo}
                  className="px-5 py-2 rounded-lg text-white text-sm font-black" style={{ background: "#ff351b" }}>
                  Ekle
                </button>
                <button onClick={() => { setSelectedVideo(null); setAddForm(null); resetBot(); }}
                  className="px-5 py-2 rounded-lg text-sm font-black bg-zinc-200 text-zinc-700 hover:bg-zinc-300">
                  İptal
                </button>
              </div>
            </div>
          )}

          {/* YouTube: video seçilmediyse İptal butonu (kanal sekmesi hariç) */}
          {addForm.platform === "youtube" && !selectedVideo && botTab !== "channel" && (
            <div className="flex justify-end">
              <button onClick={() => { setAddForm(null); resetBot(); }}
                className="px-5 py-2 rounded-lg text-sm font-black bg-zinc-200 text-zinc-700 hover:bg-zinc-300">
                İptal
              </button>
            </div>
          )}

          {/* Instagram: manuel form */}
          {addForm.platform === "instagram" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Instagram Reels URL</label>
                <input key="ig-url" value={addForm.url}
                  onChange={e => setAddForm(f => f ? { ...f, url: e.target.value } : f)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="input w-full" />
              </div>
              <div>
                <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Video Başlığı</label>
                <input value={addForm.title} onChange={e => setAddForm(f => f ? { ...f, title: e.target.value } : f)}
                  placeholder="Örn: iPhone 15 Pro Ekran Değişimi" className="input w-full" />
              </div>
              <div>
                <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Kategori</label>
                <select value={addForm.category} onChange={e => setAddForm(f => f ? { ...f, category: e.target.value as VideoCategory } : f)}
                  className="input w-full">
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={addVideo} disabled={!addForm.url.trim() || !addForm.title.trim()}
                  className="px-5 py-2 rounded-lg text-white text-sm font-black disabled:opacity-40" style={{ background: "#ff351b" }}>
                  Ekle
                </button>
                <button onClick={() => { setAddForm(null); resetBot(); }}
                  className="px-5 py-2 rounded-lg text-sm font-black bg-zinc-200 text-zinc-700 hover:bg-zinc-300">
                  İptal
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => setAddForm(emptyForm())}
          className="mb-6 w-full py-3 rounded-xl border-2 border-dashed border-zinc-300 text-sm font-black text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 transition-colors">
          + Yeni Video Ekle
        </button>
      )}

      {/* ── LİSTE ─────────────────────────────────────────────────── */}
      {videos.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 py-16 text-center">
          <p className="text-zinc-400 font-bold">Henüz video eklenmemiş.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {videos.map((video, index) => {
            const thumb = video.thumbnail ?? (video.platform === "youtube" ? `https://img.youtube.com/vi/${video.videoId}/default.jpg` : null);
            const isEditing = editingId === video.id;
            const isScheduled = video.visibleFrom && new Date(video.visibleFrom) > new Date();

            return (
              <div key={video.id} className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 p-3">
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button onClick={() => move(index, -1)} disabled={index === 0}
                      className="w-6 h-5 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-20 text-xs">▲</button>
                    <button onClick={() => move(index, 1)} disabled={index === videos.length - 1}
                      className="w-6 h-5 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-20 text-xs">▼</button>
                  </div>

                  <div className="h-14 w-24 rounded-lg overflow-hidden shrink-0 bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {thumb ? <img src={thumb} alt="" className="h-full w-full object-cover" /> : <div className="h-full w-full bg-gradient-to-br from-purple-800 to-pink-600" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${video.platform === "youtube" ? "bg-red-100 text-red-700" : "bg-purple-100 text-purple-700"}`}>
                        {video.platform === "youtube" ? "YouTube" : "Instagram"}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                        {CATEGORIES.find(c => c.value === video.category)?.label}
                      </span>
                      {isScheduled && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                          📅 {fmtSchedule(video.visibleFrom!)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-zinc-800 truncate">{video.title}</p>
                    {video.description && <p className="text-xs text-zinc-400 truncate">{video.description}</p>}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setEditingId(isEditing ? null : video.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-black border transition-colors ${isEditing ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-500 hover:border-zinc-400"}`}>
                      {isEditing ? "Kapat" : "Düzenle"}
                    </button>
                    <button onClick={() => remove(video.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors text-lg font-black">
                      ×
                    </button>
                  </div>
                </div>

                {isEditing && (
                  <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-4 space-y-3">
                    <div>
                      <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Başlık</label>
                      <input value={video.title} onChange={e => updateVideo(video.id, { title: e.target.value })} className="input w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Açıklama</label>
                      <textarea value={video.description ?? ""} onChange={e => updateVideo(video.id, { description: e.target.value || undefined })} rows={3} className="input w-full resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Kategori</label>
                        <select value={video.category} onChange={e => updateVideo(video.id, { category: e.target.value as VideoCategory })} className="input w-full">
                          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Video ID</label>
                        <input value={video.videoId} onChange={e => updateVideo(video.id, { videoId: e.target.value })} className="input w-full font-mono text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">
                        Yayın Tarihi <span className="normal-case font-medium text-zinc-400">(boş = hemen yayında)</span>
                      </label>
                      <input type="datetime-local" value={video.visibleFrom ?? ""}
                        onChange={e => updateVideo(video.id, { visibleFrom: e.target.value || undefined })}
                        className="input w-full" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-6 text-xs text-zinc-400 font-medium">
        Sıralamayı veya içerikleri değiştirdikten sonra &quot;Kaydet&quot; butonuna basmayı unutmayın.
      </p>
    </div>
  );
}
