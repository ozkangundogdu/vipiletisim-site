"use client";

import { useEffect, useRef, useState } from "react";
import type { HakkimizdaContent } from "@/lib/page-content";

function ImageUpload({ value, onChange, label }: { value: string; onChange: (url: string) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  async function handleFile(file: File) {
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const data = await fetch("/api/admin/upload", { method: "POST", body: fd }).then(r => r.json()) as { url?: string };
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

export default function HakkimizdaEditor() {
  const [data, setData] = useState<HakkimizdaContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/admin/sayfalar/hakkimizda").then(r => r.json()).then(setData); }, []);

  function update<K extends keyof HakkimizdaContent>(key: K, val: HakkimizdaContent[K]) {
    setData(prev => prev ? { ...prev, [key]: val } : prev);
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true); setSaved(false);
    await fetch("/api/admin/sayfalar/hakkimizda", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  }

  if (!data) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Hakkımızda Sayfası</h1>
          <a href="/kurumsal/hakkimizda" target="_blank" className="text-xs font-bold text-zinc-400 hover:text-brand">↗ /kurumsal/hakkimizda</a>
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
        <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Tanıtım Bölümü</h2>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Küçük Etiket (Üst yazı)</label>
          <input value={data.intro.badge} onChange={e => update("intro", { ...data.intro, badge: e.target.value })} className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Ana Başlık</label>
          <input value={data.intro.heading} onChange={e => update("intro", { ...data.intro, heading: e.target.value })} className="input w-full" />
        </div>
        <ImageUpload label="Bölüm Görseli (Sağ taraf)" value={data.intro.image} onChange={url => update("intro", { ...data.intro, image: url })} />
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Paragraflar</label>
          {data.intro.paragraphs.map((p, i) => (
            <div key={i} className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-zinc-400">Paragraf {i + 1}</span>
                {data.intro.paragraphs.length > 1 && (
                  <button onClick={() => { const arr = data.intro.paragraphs.filter((_, idx) => idx !== i); update("intro", { ...data.intro, paragraphs: arr }); }} className="text-[10px] text-red-500 hover:underline">Sil</button>
                )}
              </div>
              <textarea value={p} onChange={e => { const arr = [...data.intro.paragraphs]; arr[i] = e.target.value; update("intro", { ...data.intro, paragraphs: arr }); }} rows={3} className="input w-full resize-none" />
            </div>
          ))}
          <button onClick={() => update("intro", { ...data.intro, paragraphs: [...data.intro.paragraphs, ""] })} className="text-xs font-black text-brand hover:underline">+ Paragraf Ekle</button>
        </div>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Madde Listesi</label>
          {data.intro.checkList.map((item, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <input value={item} onChange={e => { const arr = [...data.intro.checkList]; arr[i] = e.target.value; update("intro", { ...data.intro, checkList: arr }); }} className="input flex-1" />
              <button onClick={() => { const arr = data.intro.checkList.filter((_, idx) => idx !== i); update("intro", { ...data.intro, checkList: arr }); }} className="text-red-500 text-lg font-black leading-none hover:text-red-700">×</button>
            </div>
          ))}
          <button onClick={() => update("intro", { ...data.intro, checkList: [...data.intro.checkList, ""] })} className="text-xs font-black text-brand hover:underline mt-1">+ Madde Ekle</button>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">İstatistikler</h2>
        <div className="grid grid-cols-2 gap-3">
          {data.stats.map((stat, i) => (
            <div key={i} className="rounded-lg bg-zinc-50 p-3 border border-zinc-100 space-y-2">
              <div>
                <label className="block text-[10px] font-black text-zinc-400 mb-1">DEĞER (örn: 10+)</label>
                <input value={stat.value} onChange={e => { const arr = [...data.stats]; arr[i] = { ...arr[i], value: e.target.value }; update("stats", arr); }} className="input w-full text-center font-black" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-400 mb-1">ETİKET</label>
                <input value={stat.label} onChange={e => { const arr = [...data.stats]; arr[i] = { ...arr[i], label: e.target.value }; update("stats", arr); }} className="input w-full text-center" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neden Biz */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Neden Biz? Kartları</h2>
          <button onClick={() => update("whyUs", [...data.whyUs, { title: "", desc: "" }])} className="text-xs font-black text-brand hover:underline">+ Kart Ekle</button>
        </div>
        {data.whyUs.map((item, i) => (
          <div key={i} className="rounded-lg bg-zinc-50 p-4 space-y-2 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-zinc-400">Kart {i + 1}</span>
              <button onClick={() => update("whyUs", data.whyUs.filter((_, idx) => idx !== i))} className="text-xs text-red-500 hover:underline">Sil</button>
            </div>
            <input value={item.title} onChange={e => { const arr = [...data.whyUs]; arr[i] = { ...arr[i], title: e.target.value }; update("whyUs", arr); }} placeholder="Başlık" className="input w-full" />
            <textarea value={item.desc} onChange={e => { const arr = [...data.whyUs]; arr[i] = { ...arr[i], desc: e.target.value }; update("whyUs", arr); }} placeholder="Açıklama" rows={2} className="input w-full resize-none" />
          </div>
        ))}
      </section>

      {/* Markalar */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Desteklenen Markalar</h2>
          <button onClick={() => update("brands", [...data.brands, { name: "", note: "" }])} className="text-xs font-black text-brand hover:underline">+ Marka Ekle</button>
        </div>
        {data.brands.map((b, i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={b.name} onChange={e => { const arr = [...data.brands]; arr[i] = { ...arr[i], name: e.target.value }; update("brands", arr); }} placeholder="Marka adı" className="input flex-1" />
            <input value={b.note} onChange={e => { const arr = [...data.brands]; arr[i] = { ...arr[i], note: e.target.value }; update("brands", arr); }} placeholder="Not (örn: X — 17 Pro Max)" className="input flex-1" />
            <button onClick={() => update("brands", data.brands.filter((_, idx) => idx !== i))} className="text-red-500 text-lg font-black hover:text-red-700">×</button>
          </div>
        ))}
      </section>
    </div>
  );
}
