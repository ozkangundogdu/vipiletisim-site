"use client";

import { useEffect, useRef, useState } from "react";
import type { FiyatlarContent } from "@/lib/page-content";

function ImageUpload({ value, onChange, label }: { value: string; onChange: (url: string) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json() as { url?: string };
    if (data.url) onChange(data.url);
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">{label}</label>
      <div className="flex items-center gap-3">
        {value && (
          <img src={value} alt="" className="h-16 w-28 object-cover rounded-lg border border-zinc-200" />
        )}
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={uploading}
            className="px-3 py-1.5 rounded-lg text-xs font-black border border-zinc-300 text-zinc-600 hover:border-zinc-500 disabled:opacity-50"
          >
            {uploading ? "Yükleniyor..." : value ? "Görseli Değiştir" : "Görsel Ekle"}
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")} className="text-[11px] text-red-500 hover:underline text-left">
              Görseli Kaldır
            </button>
          )}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
    </div>
  );
}

export default function FiyatlarEditor() {
  const [data, setData] = useState<FiyatlarContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/sayfalar/fiyatlar").then(r => r.json()).then(setData);
  }, []);

  function update<K extends keyof FiyatlarContent>(key: K, val: FiyatlarContent[K]) {
    setData(prev => prev ? { ...prev, [key]: val } : prev);
  }

  function updateFaq(i: number, field: "q" | "a", val: string) {
    if (!data) return;
    const faq = [...data.faq];
    faq[i] = { ...faq[i], [field]: val };
    update("faq", faq);
  }

  function addFaq() {
    if (!data) return;
    update("faq", [...data.faq, { q: "", a: "" }]);
  }

  function removeFaq(i: number) {
    if (!data) return;
    update("faq", data.faq.filter((_, idx) => idx !== i));
  }

  function updateCard(i: number, field: "title" | "desc", val: string) {
    if (!data) return;
    const cards = [...data.infoCards];
    cards[i] = { ...cards[i], [field]: val };
    update("infoCards", cards);
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true); setSaved(false);
    await fetch("/api/admin/sayfalar/fiyatlar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!data) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Fiyatlar Sayfası</h1>
          <a href="/fiyatlar" target="_blank" className="text-xs font-bold text-zinc-400 hover:text-brand">↗ /fiyatlar</a>
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

      {/* Fiyatlandırma Açıklaması */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Fiyatlandırma Açıklaması</h2>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Başlık</label>
          <input value={data.pricingDesc.heading} onChange={e => update("pricingDesc", { ...data.pricingDesc, heading: e.target.value })} className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Açıklama Metni</label>
          <textarea value={data.pricingDesc.text} onChange={e => update("pricingDesc", { ...data.pricingDesc, text: e.target.value })} rows={5} className="input w-full resize-none" />
        </div>
      </section>

      {/* Bilgi Kartları */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Bilgi Kartları (3 Kart)</h2>
        {data.infoCards.map((card, i) => (
          <div key={i} className="rounded-lg bg-zinc-50 p-4 space-y-3 border border-zinc-100">
            <p className="text-xs font-black text-zinc-400">Kart {i + 1}</p>
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Başlık</label>
              <input value={card.title} onChange={e => updateCard(i, "title", e.target.value)} className="input w-full" />
            </div>
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Açıklama</label>
              <textarea value={card.desc} onChange={e => updateCard(i, "desc", e.target.value)} rows={2} className="input w-full resize-none" />
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Alt CTA Bölümü</h2>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Başlık</label>
          <input value={data.ctaTitle} onChange={e => update("ctaTitle", e.target.value)} className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Alt Metin</label>
          <textarea value={data.ctaSubtitle} onChange={e => update("ctaSubtitle", e.target.value)} rows={2} className="input w-full resize-none" />
        </div>
      </section>

      {/* SSS */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Sık Sorulan Sorular</h2>
          <button onClick={addFaq} className="text-xs font-black text-brand hover:underline">+ Soru Ekle</button>
        </div>
        {data.faq.map((item, i) => (
          <div key={i} className="rounded-lg bg-zinc-50 p-4 space-y-3 border border-zinc-100">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black text-zinc-400">Soru {i + 1}</p>
              <button onClick={() => removeFaq(i)} className="text-xs text-red-500 hover:underline">Sil</button>
            </div>
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Soru</label>
              <input value={item.q} onChange={e => updateFaq(i, "q", e.target.value)} className="input w-full" />
            </div>
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Cevap</label>
              <textarea value={item.a} onChange={e => updateFaq(i, "a", e.target.value)} rows={3} className="input w-full resize-none" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
