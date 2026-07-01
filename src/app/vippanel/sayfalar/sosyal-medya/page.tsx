"use client";

import { useEffect, useRef, useState } from "react";
import type { SosyalMedyaContent, SosyalPlatform } from "@/lib/page-content";

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook",
  google: "Google İşletme",
};

function ImageUpload({ value, onChange, label }: { value: string; onChange: (url: string) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  async function handleFile(file: File) {
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const data = await fetch("/api/vippanel/upload", { method: "POST", body: fd }).then(r => r.json()) as { url?: string };
    if (data.url) onChange(data.url);
    setUploading(false);
  }
  return (
    <div>
      <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">{label}</label>
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="" className="h-16 w-28 object-cover rounded-lg border border-zinc-200" />}
        <div className="flex flex-col gap-1.5">
          <button type="button" onClick={() => ref.current?.click()} disabled={uploading} className="px-3 py-1.5 rounded-lg text-xs font-black border border-zinc-300 text-zinc-600 hover:border-zinc-500 disabled:opacity-50">
            {uploading ? "Yükleniyor..." : value ? "Değiştir" : "Görsel Ekle"}
          </button>
          {value && <button type="button" onClick={() => onChange("")} className="text-[11px] text-red-500 hover:underline text-left">Kaldır</button>}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
    </div>
  );
}

export default function SosyalMedyaEditor() {
  const [data, setData] = useState<SosyalMedyaContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/vippanel/sayfalar/sosyal-medya").then(r => r.json()).then(setData); }, []);

  function update<K extends keyof SosyalMedyaContent>(key: K, val: SosyalMedyaContent[K]) {
    setData(prev => prev ? { ...prev, [key]: val } : prev);
  }

  function updatePlatform(i: number, patch: Partial<SosyalPlatform>) {
    if (!data) return;
    const arr = [...data.platforms];
    arr[i] = { ...arr[i], ...patch };
    update("platforms", arr);
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true); setSaved(false);
    await fetch("/api/vippanel/sayfalar/sosyal-medya", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  }

  if (!data) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Sosyal Medya Sayfası</h1>
          <a href="/sosyal-medya" target="_blank" className="text-xs font-bold text-zinc-400 hover:text-brand">↗ /sosyal-medya</a>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-50" style={{ background: "#ff351b" }}>
          {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

      {/* Hero */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Hero Bölümü</h2>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Başlık</label>
          <input value={data.hero.title} onChange={e => update("hero", { ...data.hero, title: e.target.value })} className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Alt Başlık</label>
          <textarea value={data.hero.subtitle} onChange={e => update("hero", { ...data.hero, subtitle: e.target.value })} rows={2} className="input w-full resize-none" />
        </div>
        <ImageUpload label="Hero Görseli" value={data.hero.image} onChange={url => update("hero", { ...data.hero, image: url })} />
      </section>

      {/* Giriş Metni */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Giriş Metni</h2>
        <textarea value={data.intro} onChange={e => update("intro", e.target.value)} rows={4} className="input w-full resize-none" />
      </section>

      {/* Platformlar */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Platformlar</h2>
          <button
            onClick={() => update("platforms", [...data.platforms, { platform: "instagram", name: "", handle: "", url: "", description: "", image: "" }])}
            className="text-xs font-black text-brand hover:underline"
          >
            + Platform Ekle
          </button>
        </div>

        {data.platforms.map((p, i) => (
          <div key={i} className="rounded-lg border border-zinc-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50 border-b border-zinc-100">
              <span className="font-black text-sm text-zinc-700">{PLATFORM_LABELS[p.platform] ?? p.name}</span>
              <button onClick={() => update("platforms", data.platforms.filter((_, idx) => idx !== i))} className="text-red-500 text-xs font-black hover:underline">Sil</button>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Platform</label>
                  <select value={p.platform} onChange={e => updatePlatform(i, { platform: e.target.value as SosyalPlatform["platform"] })} className="input w-full">
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="google">Google İşletme</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Kullanıcı Adı / Handle</label>
                  <input value={p.handle} onChange={e => updatePlatform(i, { handle: e.target.value })} className="input w-full" placeholder="@hesap" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Platform URL</label>
                <input value={p.url} onChange={e => updatePlatform(i, { url: e.target.value })} className="input w-full font-mono text-sm" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Açıklama</label>
                <textarea value={p.description} onChange={e => updatePlatform(i, { description: e.target.value })} rows={3} className="input w-full resize-none" />
              </div>
              <ImageUpload label="Platform Kapak Görseli" value={p.image} onChange={url => updatePlatform(i, { image: url })} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
