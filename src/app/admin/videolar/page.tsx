"use client";

import { useEffect, useState } from "react";
import type { Video, VideoCategory, VideoPlatform } from "@/lib/video-utils";

const CATEGORIES: { value: VideoCategory; label: string }[] = [
  { value: "tamir", label: "Tamir" },
  { value: "musteri", label: "Müşteri" },
  { value: "inceleme", label: "İnceleme" },
  { value: "diger", label: "Diğer" },
];

function extractYouTubeId(input: string): string {
  const regexps = [
    /(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const r of regexps) {
    const m = input.match(r);
    if (m) return m[1];
  }
  return input.trim();
}

function extractInstagramShortcode(input: string): string {
  const m = input.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : input.trim();
}

type AddForm = {
  platform: VideoPlatform;
  url: string;
  title: string;
  description: string;
  category: VideoCategory;
};

function emptyForm(): AddForm {
  return { platform: "youtube", url: "", title: "", description: "", category: "tamir" };
}

export default function VideolarPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addForm, setAddForm] = useState<AddForm | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/videos").then(r => r.json()).then(data => { setVideos(data); setLoading(false); });
  }, []);

  function move(index: number, dir: -1 | 1) {
    const next = [...videos];
    const t = index + dir;
    if (t < 0 || t >= next.length) return;
    [next[index], next[t]] = [next[t], next[index]];
    setVideos(next);
  }

  function remove(id: string) {
    if (!confirm("Bu videoyu silmek istiyor musunuz?")) return;
    setVideos(prev => prev.filter(v => v.id !== id));
  }

  async function addVideo() {
    if (!addForm || !addForm.url.trim() || !addForm.title.trim()) return;
    const videoId = addForm.platform === "youtube"
      ? extractYouTubeId(addForm.url)
      : extractInstagramShortcode(addForm.url);

    const id = `v${Date.now()}`;
    const video: Video = {
      id,
      platform: addForm.platform,
      videoId,
      title: addForm.title,
      description: addForm.description || undefined,
      category: addForm.category,
    };

    // Yeni video listenin başına
    setVideos(prev => [video, ...prev]);
    setAddForm(null);

    // Thumbnail arka planda çek ve kaydet
    fetch("/api/admin/videos/thumbnail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, platform: addForm.platform, videoId }),
    })
      .then(r => r.json())
      .then((data: { path: string | null }) => {
        if (data.path) {
          setVideos(prev => prev.map(v => v.id === id ? { ...v, thumbnail: data.path ?? undefined } : v));
        }
      })
      .catch(() => {});
  }

  function updateVideo(id: string, patch: Partial<Video>) {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...patch } : v));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videos),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Video Yönetimi</h1>
          <p className="text-sm text-zinc-400 font-medium mt-0.5">YouTube veya Instagram Reels URL yapıştırın</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/cep-tamir-videolar" target="_blank"
            className="px-4 py-2 rounded-lg text-sm font-black border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors">
            Sayfayı Gör ↗
          </a>
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-50"
            style={{ background: "#ff351b" }}>
            {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
          </button>
        </div>
      </div>

      {/* Ekle formu */}
      {addForm ? (
        <div className="mb-6 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-5 space-y-4">
          <h3 className="font-black text-zinc-800">Yeni Video Ekle</h3>

          <div className="flex gap-2">
            {(["youtube", "instagram"] as VideoPlatform[]).map(p => (
              <button key={p}
                onClick={() => setAddForm(f => f ? { ...f, platform: p } : f)}
                className={`px-4 py-2 rounded-lg text-sm font-black transition-colors ${addForm.platform === p ? "text-white" : "bg-white border border-zinc-200 text-zinc-600"}`}
                style={addForm.platform === p ? { background: p === "youtube" ? "#dc2626" : "linear-gradient(135deg,#7c3aed,#ec4899)" } : undefined}>
                {p === "youtube" ? "🔴 YouTube" : "📷 Instagram Reels"}
              </button>
            ))}
          </div>

          <div className="grid gap-3">
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">
                {addForm.platform === "youtube" ? "YouTube URL veya Video ID" : "Instagram Reels URL"}
              </label>
              <input value={addForm.url}
                onChange={e => setAddForm(f => f ? { ...f, url: e.target.value } : f)}
                placeholder={addForm.platform === "youtube" ? "https://www.youtube.com/watch?v=..." : "https://www.instagram.com/reel/..."}
                className="input w-full" />
            </div>

            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Video Başlığı</label>
              <input value={addForm.title}
                onChange={e => setAddForm(f => f ? { ...f, title: e.target.value } : f)}
                placeholder="Örn: iPhone 15 Pro Ekran Değişimi"
                className="input w-full" />
            </div>

            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Açıklama <span className="normal-case font-medium text-zinc-400">(isteğe bağlı)</span></label>
              <textarea value={addForm.description}
                onChange={e => setAddForm(f => f ? { ...f, description: e.target.value } : f)}
                placeholder="Tamirin detayları, kullanılan parça, süre gibi bilgiler..."
                rows={3}
                className="input w-full resize-none" />
            </div>

            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Kategori</label>
              <select value={addForm.category}
                onChange={e => setAddForm(f => f ? { ...f, category: e.target.value as VideoCategory } : f)}
                className="input w-full">
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={addVideo}
              className="px-5 py-2 rounded-lg text-white text-sm font-black" style={{ background: "#ff351b" }}>
              Ekle
            </button>
            <button onClick={() => setAddForm(null)}
              className="px-5 py-2 rounded-lg text-sm font-black bg-zinc-200 text-zinc-700 hover:bg-zinc-300">
              İptal
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAddForm(emptyForm())}
          className="mb-6 w-full py-3 rounded-xl border-2 border-dashed border-zinc-300 text-sm font-black text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 transition-colors">
          + Yeni Video Ekle
        </button>
      )}

      {/* Liste */}
      {videos.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 py-16 text-center">
          <p className="text-zinc-400 font-bold">Henüz video eklenmemiş.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {videos.map((video, index) => {
            const thumb = video.thumbnail
              ?? (video.platform === "youtube" ? `https://img.youtube.com/vi/${video.videoId}/default.jpg` : null);
            const isEditing = editingId === video.id;

            return (
              <div key={video.id} className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 p-3">
                  {/* Sıra */}
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button onClick={() => move(index, -1)} disabled={index === 0}
                      className="w-6 h-5 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-20 text-xs">▲</button>
                    <button onClick={() => move(index, 1)} disabled={index === videos.length - 1}
                      className="w-6 h-5 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-20 text-xs">▼</button>
                  </div>

                  {/* Thumbnail */}
                  <div className="h-14 w-24 rounded-lg overflow-hidden shrink-0 bg-zinc-100">
                    {thumb
                      ? <img src={thumb} alt="" className="h-full w-full object-cover" />
                      : <div className="h-full w-full bg-gradient-to-br from-purple-800 to-pink-600" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${video.platform === "youtube" ? "bg-red-100 text-red-700" : "bg-purple-100 text-purple-700"}`}>
                        {video.platform === "youtube" ? "YouTube" : "Instagram"}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                        {CATEGORIES.find(c => c.value === video.category)?.label}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-zinc-800 truncate">{video.title}</p>
                    {video.description && (
                      <p className="text-xs text-zinc-400 truncate">{video.description}</p>
                    )}
                  </div>

                  {/* Actions */}
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

                {/* Inline edit */}
                {isEditing && (
                  <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-4 space-y-3">
                    <div>
                      <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Başlık</label>
                      <input value={video.title}
                        onChange={e => updateVideo(video.id, { title: e.target.value })}
                        className="input w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Açıklama</label>
                      <textarea value={video.description ?? ""}
                        onChange={e => updateVideo(video.id, { description: e.target.value || undefined })}
                        rows={3}
                        className="input w-full resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Kategori</label>
                        <select value={video.category}
                          onChange={e => updateVideo(video.id, { category: e.target.value as VideoCategory })}
                          className="input w-full">
                          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Video ID</label>
                        <input value={video.videoId}
                          onChange={e => updateVideo(video.id, { videoId: e.target.value })}
                          className="input w-full font-mono text-xs" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-6 text-xs text-zinc-400 font-medium">
        Sıralamayı veya içerikleri değiştirdikten sonra "Kaydet" butonuna basmayı unutmayın.
      </p>
    </div>
  );
}
