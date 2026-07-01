"use client";

import { useEffect, useRef, useState } from "react";
import type { EkibimizContent, TeamMember } from "@/lib/page-content";

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
      <label className="block text-[10px] font-black text-zinc-400 mb-1 uppercase tracking-wide">{label}</label>
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="" className="h-16 w-16 object-cover rounded-lg border border-zinc-200" />}
        <div className="flex flex-col gap-1.5">
          <button type="button" onClick={() => ref.current?.click()} disabled={uploading}
            className="px-3 py-1.5 rounded-lg text-xs font-black border border-zinc-300 text-zinc-600 hover:border-zinc-500 disabled:opacity-50">
            {uploading ? "Yükleniyor..." : value ? "Değiştir" : "Fotoğraf Ekle"}
          </button>
          {value && <button type="button" onClick={() => onChange("")} className="text-[11px] text-red-500 hover:underline text-left">Kaldır</button>}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
    </div>
  );
}

const EMPTY_MEMBER: TeamMember = {
  name: "", title: "", education: "", experience: "",
  bio: "", certificates: [], specialties: [], image: "", imagePosition: "center top",
};

export default function EkibimizEditor() {
  const [data, setData] = useState<EkibimizContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/vippanel/sayfalar/ekibimiz").then(r => r.json()).then(setData);
  }, []);

  function updateMember(i: number, patch: Partial<TeamMember>) {
    setData(prev => {
      if (!prev) return prev;
      const arr = [...prev.members];
      arr[i] = { ...arr[i], ...patch };
      return { ...prev, members: arr };
    });
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true); setSaved(false);
    await fetch("/api/vippanel/sayfalar/ekibimiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  }

  if (!data) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Uzman Kadromuz</h1>
          <a href="/kurumsal/ekibimiz" target="_blank" className="text-xs font-bold text-zinc-400 hover:text-brand">
            ↗ /kurumsal/ekibimiz
          </a>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-50"
          style={{ background: "#ff351b" }}>
          {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

      {/* Hero */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Sayfa Başlığı</h2>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Başlık</label>
          <input value={data.hero.title}
            onChange={e => setData(d => d ? { ...d, hero: { ...d.hero, title: e.target.value } } : d)}
            className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Alt Başlık</label>
          <textarea value={data.hero.subtitle}
            onChange={e => setData(d => d ? { ...d, hero: { ...d.hero, subtitle: e.target.value } } : d)}
            rows={2} className="input w-full resize-none" />
        </div>
      </section>

      {/* Üyeler */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Teknisyen Kartları</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">{data.members.length} üye</p>
          </div>
          <button onClick={() => setData(d => d ? { ...d, members: [...d.members, { ...EMPTY_MEMBER }] } : d)}
            className="text-xs font-black text-brand hover:underline">
            + Üye Ekle
          </button>
        </div>

        {data.members.map((member, i) => (
          <div key={i} className="rounded-xl bg-zinc-50 border border-zinc-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-zinc-700">{member.name || `Üye ${i + 1}`}</span>
              <button onClick={() => setData(d => d ? { ...d, members: d.members.filter((_, idx) => idx !== i) } : d)}
                className="text-xs text-red-500 hover:underline">
                Sil
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black text-zinc-400 mb-1">AD SOYAD</label>
                <input value={member.name} onChange={e => updateMember(i, { name: e.target.value })}
                  className="input w-full" placeholder="Fatih Cömert" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-400 mb-1">ÜNVAN</label>
                <input value={member.title} onChange={e => updateMember(i, { title: e.target.value })}
                  className="input w-full" placeholder="Baş Teknisyen" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-400 mb-1">EĞİTİM</label>
                <input value={member.education} onChange={e => updateMember(i, { education: e.target.value })}
                  className="input w-full" placeholder="Üniversite Mezunu" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-400 mb-1">DENEYİM</label>
                <input value={member.experience} onChange={e => updateMember(i, { experience: e.target.value })}
                  className="input w-full" placeholder="15 Yıllık Deneyim" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-zinc-400 mb-1">KISA BİYOGRAFİ</label>
              <textarea value={member.bio} onChange={e => updateMember(i, { bio: e.target.value })}
                rows={4} className="input w-full resize-none" />
            </div>

            <div>
              <label className="block text-[10px] font-black text-zinc-400 mb-1">BELGELER (her satıra bir belge)</label>
              <textarea
                value={member.certificates.join("\n")}
                onChange={e => updateMember(i, { certificates: e.target.value.split("\n").filter(Boolean) })}
                rows={3} className="input w-full resize-none font-mono text-xs"
                placeholder={"Mesleki Yeterlilik Belgesi\nUstalık Belgesi"} />
            </div>

            <div>
              <label className="block text-[10px] font-black text-zinc-400 mb-1">UZMANLIK ALANLARI (her satıra bir alan)</label>
              <textarea
                value={member.specialties.join("\n")}
                onChange={e => updateMember(i, { specialties: e.target.value.split("\n").filter(Boolean) })}
                rows={3} className="input w-full resize-none font-mono text-xs"
                placeholder={"iPhone CPU Seviyesi Tamir\nAnakart Lehimleme"} />
            </div>

            <div className="grid grid-cols-2 gap-3 items-end">
              <ImageUpload label="FOTOĞRAF" value={member.image}
                onChange={url => updateMember(i, { image: url })} />
              <div>
                <label className="block text-[10px] font-black text-zinc-400 mb-1">FOTOĞRAF POZİSYONU</label>
                <select value={member.imagePosition ?? "center top"}
                  onChange={e => updateMember(i, { imagePosition: e.target.value })}
                  className="input w-full">
                  <option value="center top">Üst Orta (varsayılan)</option>
                  <option value="center center">Tam Orta</option>
                  <option value="center 20%">Üstten %20</option>
                  <option value="center 30%">Üstten %30</option>
                  <option value="left top">Sol Üst</option>
                  <option value="right top">Sağ Üst</option>
                </select>
              </div>
            </div>

            {member.image && (
              <div className="rounded-lg overflow-hidden h-32 w-full">
                <img src={member.image} alt="" className="h-full w-full object-cover"
                  style={{ objectPosition: member.imagePosition ?? "center top" }} />
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
