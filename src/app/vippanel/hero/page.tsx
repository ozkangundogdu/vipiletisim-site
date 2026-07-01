"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroData, HeroOzellik } from "@/lib/hero";

type IkonTip = HeroOzellik["ikon"];

const IKON_SECENEKLER: { value: IkonTip; label: string; path: string }[] = [
  { value: "check", label: "Onay", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
  { value: "speed", label: "Hız", path: "M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5v-5l-2.28 2.28C7.81 18 6 15.21 6 12c0-4.08 3.05-7.44 7-7.93V2.05z" },
  { value: "search", label: "Arama", path: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" },
  { value: "shield", label: "Kalkan", path: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" },
  { value: "wrench", label: "Tamir", path: "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" },
  { value: "star", label: "Yıldız", path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" },
];

export default function HeroAdminPage() {
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/vippanel/hero").then(r => r.json()).then(setData);
  }, []);

  function update(field: keyof HeroData, value: string) {
    setData(prev => prev ? { ...prev, [field]: value } : prev);
  }

  function updateOzellik(index: number, patch: Partial<HeroOzellik>) {
    setData(prev => {
      if (!prev) return prev;
      const ozellikler = prev.ozellikler.map((o, i) => i === index ? { ...o, ...patch } : o);
      return { ...prev, ozellikler };
    });
  }

  function addOzellik() {
    setData(prev => {
      if (!prev) return prev;
      return { ...prev, ozellikler: [...prev.ozellikler, { ikon: "check" as IkonTip, baslik: "", aciklama: "" }] };
    });
  }

  function removeOzellik(index: number) {
    setData(prev => {
      if (!prev) return prev;
      return { ...prev, ozellikler: prev.ozellikler.filter((_, i) => i !== index) };
    });
  }

  function moveOzellik(index: number, dir: -1 | 1) {
    setData(prev => {
      if (!prev) return prev;
      const arr = [...prev.ozellikler];
      const t = index + dir;
      if (t < 0 || t >= arr.length) return prev;
      [arr[index], arr[t]] = [arr[t], arr[index]];
      return { ...prev, ozellikler: arr };
    });
  }

  async function uploadImage() {
    const file = imgRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/vippanel/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json.url) update("arkaplan", json.url);
    setUploading(false);
    if (imgRef.current) imgRef.current.value = "";
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    await fetch("/api/vippanel/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!data) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Hero Bölümü</h1>
          <p className="text-sm text-zinc-400 mt-0.5">Ana sayfa üst alan — arka plan, başlık, özellikler.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="px-4 py-2 rounded-lg text-sm font-black border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors">
            Siteyi Gör ↗
          </a>
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-50"
            style={{ background: "#ff351b" }}>
            {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Arka plan */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="font-black text-zinc-900 text-sm uppercase tracking-wide mb-4">🖼️ Arka Plan Görseli</h2>
          <div className="flex gap-4 items-start flex-wrap">
            {data.arkaplan && (
              <div className="h-24 w-40 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100 shrink-0">
                <img src={data.arkaplan} alt="" className="h-full w-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-zinc-500 mb-1.5">Mevcut Yol</label>
              <input value={data.arkaplan} onChange={e => update("arkaplan", e.target.value)}
                className="input w-full font-mono text-sm" placeholder="/images/hero/..." />
              <div className="mt-3">
                <label className="block text-xs font-bold text-zinc-500 mb-1.5">Yeni Görsel Yükle</label>
                <div className="flex gap-2">
                  <input ref={imgRef} type="file" accept="image/*" onChange={uploadImage}
                    className="block text-sm text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-zinc-700 hover:file:bg-zinc-200" />
                  {uploading && <span className="text-xs font-bold text-zinc-400 self-center">Yükleniyor...</span>}
                </div>
                <p className="mt-1 text-xs text-zinc-400">Maks. 5MB · JPG, PNG, WebP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5 space-y-4">
          <h2 className="font-black text-zinc-900 text-sm uppercase tracking-wide">📝 Başlık</h2>
          <p className="text-xs text-zinc-400 -mt-2">
            Başlık 3 parçadan oluşur: <span className="text-zinc-700 font-bold">[Önce]</span>{" "}
            <span className="text-yellow-600 font-bold">[Vurgulu]</span>{" "}
            <span className="text-zinc-700 font-bold">[Sonra]</span>
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1.5">Önce</label>
              <input value={data.baslikOnce} onChange={e => update("baslikOnce", e.target.value)} className="input w-full" placeholder="Profesyonel" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1.5">Vurgulu (sarı)</label>
              <input value={data.baslikVurgu} onChange={e => update("baslikVurgu", e.target.value)} className="input w-full" placeholder="iPhone" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1.5">Sonra</label>
              <input value={data.baslikSonra} onChange={e => update("baslikSonra", e.target.value)} className="input w-full" placeholder="ve Cep Telefonu Tamiri" />
            </div>
          </div>

          {/* Önizleme */}
          <div className="rounded-lg bg-zinc-800 px-4 py-3 text-white text-lg font-black">
            {data.baslikOnce}{" "}
            <span className="text-yellow-400">{data.baslikVurgu}</span>{" "}
            {data.baslikSonra}
          </div>
        </div>

        {/* Açıklama */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="font-black text-zinc-900 text-sm uppercase tracking-wide mb-3">💬 Açıklama Metni</h2>
          <textarea value={data.aciklama} onChange={e => update("aciklama", e.target.value)}
            rows={3} className="input w-full resize-none"
            placeholder="Trabzon'da iPhone, Samsung, Xiaomi ve tüm marka telefonlar için aynı gün tamir..." />
        </div>

        {/* Özellikler */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-zinc-900 text-sm uppercase tracking-wide">✅ Sağ Panel Özellikleri</h2>
            <button onClick={addOzellik}
              className="text-xs font-black px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors">
              + Ekle
            </button>
          </div>

          {data.ozellikler.length === 0 ? (
            <p className="text-sm text-zinc-400 font-medium text-center py-6">Henüz özellik yok. "+ Ekle" ile başlayın.</p>
          ) : (
            <div className="space-y-3">
              {data.ozellikler.map((o, i) => (
                <div key={i} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {/* Sıra */}
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button onClick={() => moveOzellik(i, -1)} disabled={i === 0}
                        className="w-5 h-4 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-20 text-[10px]">▲</button>
                      <button onClick={() => moveOzellik(i, 1)} disabled={i === data.ozellikler.length - 1}
                        className="w-5 h-4 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-20 text-[10px]">▼</button>
                    </div>

                    {/* İkon seçimi */}
                    <div className="flex gap-1.5 flex-wrap flex-1">
                      {IKON_SECENEKLER.map(ikon => (
                        <button key={ikon.value} onClick={() => updateOzellik(i, { ikon: ikon.value })}
                          title={ikon.label}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${o.ikon === ikon.value ? "bg-[#1A3A6B] text-white" : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400"}`}>
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                            <path d={ikon.path} />
                          </svg>
                        </button>
                      ))}
                    </div>

                    {/* Sil */}
                    <button onClick={() => removeOzellik(i)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors text-lg font-black shrink-0">
                      ×
                    </button>
                  </div>

                  <div className="grid gap-2">
                    <input value={o.baslik} onChange={e => updateOzellik(i, { baslik: e.target.value })}
                      className="input w-full font-bold" placeholder="Başlık" />
                    <textarea value={o.aciklama} onChange={e => updateOzellik(i, { aciklama: e.target.value })}
                      rows={2} className="input w-full resize-none text-sm" placeholder="Açıklama metni..." />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
