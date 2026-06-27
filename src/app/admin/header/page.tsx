"use client";

import { useEffect, useRef, useState } from "react";

type Settings = {
  logo?: string;
  telefon: string;
  telefonRaw: string;
  whatsapp: string;
  calisma: string;
  adres: string;
  sehir: string;
  ilce: string;
  posta: string;
  lat: number;
  lng: number;
  siteAdi: string;
  slogan: string;
  sosyal: { instagram: string; youtube: string; facebook: string; google: string };
};

export default function HeaderAdminPage() {
  const [data, setData] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/settings").then(r => r.json()).then(setData);
  }, []);

  function update<K extends keyof Settings>(field: K, value: Settings[K]) {
    setData(prev => prev ? { ...prev, [field]: value } : prev);
  }

  async function uploadLogo() {
    const file = logoRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json.url) update("logo", json.url);
    setUploading(false);
    if (logoRef.current) logoRef.current.value = "";
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!data) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  const logoSrc = data.logo || "/images/logo.png";

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Header Yönetimi</h1>
          <p className="text-sm text-zinc-400 mt-0.5">Logo, telefon numarası ve çalışma saatleri.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-50"
          style={{ background: "#ff351b" }}>
          {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

      {/* Önizleme */}
      <div className="mb-6 rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
        <p className="px-4 py-2 text-[11px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-50 border-b border-zinc-200">Önizleme</p>
        <div className="flex items-center justify-between gap-6 px-6 py-4 flex-wrap"
          style={{ background: "linear-gradient(to bottom,#1a1a2e,#0a1a3a)", backgroundImage: "repeating-linear-gradient(135deg,rgba(255,255,255,0.04) 0,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 9px)" }}>
          {/* Logo */}
          <img src={logoSrc} alt="Logo" className="h-12 w-auto object-contain" />

          {/* Telefon */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
            </svg>
            <div>
              <p className="text-[10px] font-black uppercase text-white/60 leading-none mb-0.5">TELEFON HATTI</p>
              <p className="text-sm font-black text-white">{data.telefon}</p>
            </div>
          </div>

          {/* Çalışma */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l4 2" />
            </svg>
            <div>
              <p className="text-[10px] font-black uppercase text-white/60 leading-none mb-0.5">ÇALIŞMA SAATLERİMİZ</p>
              <p className="text-sm font-black text-white">{data.calisma}</p>
            </div>
          </div>

          <div className="h-9 w-40 rounded bg-white/10 flex items-center px-3 gap-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-yellow-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" />
            </svg>
            <span className="text-xs text-white/40 truncate">Marka veya Modelinizi Arayın</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Logo */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="font-black text-zinc-900 text-sm uppercase tracking-wide mb-4">🖼️ Logo</h2>
          <div className="flex gap-4 items-start flex-wrap">
            <div className="h-20 w-32 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-900 shrink-0 flex items-center justify-center p-2">
              <img src={logoSrc} alt="Logo" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex-1 min-w-[200px] space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1.5">Yeni Logo Yükle</label>
                <input ref={logoRef} type="file" accept="image/*" onChange={uploadLogo}
                  className="block text-sm text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-zinc-700 hover:file:bg-zinc-200" />
                {uploading && <p className="text-xs font-bold text-zinc-400 mt-1">Yükleniyor...</p>}
                <p className="text-xs text-zinc-400 mt-1">Maks. 5MB · PNG, WebP (şeffaf arka plan önerilir)</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1.5">Logo URL'si</label>
                <input value={logoSrc} onChange={e => update("logo", e.target.value)}
                  className="input w-full font-mono text-sm" placeholder="/images/logo.png" />
              </div>
            </div>
          </div>
        </div>

        {/* Telefon */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5 space-y-4">
          <h2 className="font-black text-zinc-900 text-sm uppercase tracking-wide">📞 Telefon</h2>
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-1.5">Görünen Numara <span className="text-zinc-400 font-normal">(headerda gösterilen)</span></label>
            <input value={data.telefon} onChange={e => update("telefon", e.target.value)}
              className="input w-full" placeholder="+90 (505) 275 45 40" />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-1.5">Ham Numara <span className="text-zinc-400 font-normal">(tel: ve WhatsApp linki için, sadece rakam)</span></label>
            <input value={data.telefonRaw} onChange={e => update("telefonRaw", e.target.value)}
              className="input w-full font-mono" placeholder="905052754540" />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-1.5">WhatsApp Numarası <span className="text-zinc-400 font-normal">(sadece rakam)</span></label>
            <input value={data.whatsapp} onChange={e => update("whatsapp", e.target.value)}
              className="input w-full font-mono" placeholder="905052754540" />
          </div>
        </div>

        {/* Çalışma saatleri */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="font-black text-zinc-900 text-sm uppercase tracking-wide mb-4">🕐 Çalışma Saatleri</h2>
          <label className="block text-xs font-bold text-zinc-500 mb-1.5">Görünen Metin</label>
          <input value={data.calisma} onChange={e => update("calisma", e.target.value)}
            className="input w-full" placeholder="Pzts. - Cmts. : 09:00 | 19:00" />
          <p className="mt-2 text-xs text-zinc-400">Örnek: Pzts. - Cmts. : 09:00 | 19:00</p>
        </div>
      </div>
    </div>
  );
}
