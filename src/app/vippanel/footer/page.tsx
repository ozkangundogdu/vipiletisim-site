"use client";

import { useEffect, useState } from "react";
import type { FooterContent, FooterLink } from "@/lib/footer";

function emptyLink(): FooterLink {
  return { label: "", href: "" };
}

function LinkList({
  title,
  links,
  onChange,
}: {
  title: string;
  links: FooterLink[];
  onChange: (links: FooterLink[]) => void;
}) {
  function update(i: number, patch: Partial<FooterLink>) {
    const next = links.map((l, idx) => (idx === i ? { ...l, ...patch } : l));
    onChange(next);
  }
  function move(i: number, dir: -1 | 1) {
    const next = [...links];
    const t = i + dir;
    if (t < 0 || t >= next.length) return;
    [next[i], next[t]] = [next[t], next[i]];
    onChange(next);
  }
  function remove(i: number) {
    onChange(links.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...links, emptyLink()]);
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wide">{title}</h2>
        <button
          onClick={add}
          className="text-xs font-black px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors"
        >
          + Ekle
        </button>
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center py-4">Henüz link yok.</p>
      ) : (
        <div className="space-y-2">
          {links.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* Sıra */}
              <div className="flex flex-col gap-0.5 shrink-0">
                <button onClick={() => move(i, -1)} disabled={i === 0}
                  className="w-5 h-4 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-20 text-[10px]">▲</button>
                <button onClick={() => move(i, 1)} disabled={i === links.length - 1}
                  className="w-5 h-4 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-20 text-[10px]">▼</button>
              </div>
              <input
                value={link.label}
                onChange={(e) => update(i, { label: e.target.value })}
                placeholder="Link metni"
                className="input flex-1 min-w-0"
              />
              <input
                value={link.href}
                onChange={(e) => update(i, { href: e.target.value })}
                placeholder="/tamir-hizmetleri/..."
                className="input flex-1 min-w-0 font-mono text-sm"
              />
              <button
                onClick={() => remove(i)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors text-lg font-black shrink-0"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FooterAdminPage() {
  const [data, setData] = useState<FooterContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/vippanel/footer").then((r) => r.json()).then(setData);
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);
    await fetch("/api/vippanel/footer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!data) {
    return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;
  }

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Footer Yönetimi</h1>
          <p className="text-sm text-zinc-400 mt-0.5">
            Popüler linkler ve alt metin. Telefon, adres ve sosyal medya için
            <a href="/vippanel/iletisim" className="text-[#ff351b] font-bold ml-1">İletişim & Site →</a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank"
            className="px-4 py-2 rounded-lg text-sm font-black border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors">
            Siteyi Gör ↗
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-50"
            style={{ background: "#ff351b" }}
          >
            {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Firma Başlığı */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wide mb-3">🏷️ Footer Firma Başlığı</h2>
          <input
            value={data.firmaBaslik}
            onChange={(e) => setData({ ...data, firmaBaslik: e.target.value })}
            className="input w-full"
            placeholder="Vip İletişim Trabzon Cep Telefonu Teknik Servisi"
          />
        </div>

        {/* Popüler Hizmetler */}
        <LinkList
          title="🔧 Popüler Tamir Hizmetleri"
          links={data.popularHizmetler}
          onChange={(links) => setData({ ...data, popularHizmetler: links })}
        />

        {/* Popüler Bölgeler */}
        <LinkList
          title="📍 Hizmet Bölgeleri"
          links={data.popularBolgeler}
          onChange={(links) => setData({ ...data, popularBolgeler: links })}
        />

        {/* Alt Metin */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wide mb-3">📝 Alt Çubuk SEO Metni</h2>
          <input
            value={data.altMetin}
            onChange={(e) => setData({ ...data, altMetin: e.target.value })}
            className="input w-full"
            placeholder="Trabzon iPhone Tamiri · Samsung Tamiri · ..."
          />
          <p className="mt-2 text-xs text-zinc-400">Footer'ın en altında görünür, SEO için anahtar kelime içerebilir.</p>
        </div>
      </div>
    </div>
  );
}
