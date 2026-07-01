"use client";

import { useEffect, useRef, useState } from "react";
import type { TamirEgitimiContent, Course } from "@/lib/page-content";

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

function CourseEditor({ course, index, onChange, onRemove }: { course: Course; index: number; onChange: (c: Course) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(index === 0);

  function set<K extends keyof Course>(key: K, val: Course[K]) {
    onChange({ ...course, [key]: val });
  }

  return (
    <div className="rounded-lg border border-zinc-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 border-b border-zinc-200">
        <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 text-sm font-black text-zinc-700 hover:text-zinc-900 flex-1 text-left">
          <span className="px-2 py-0.5 rounded-full bg-brand/10 text-brand text-[11px] font-black">{course.badge}</span>
          {course.title} — {course.subtitle}
          <span className="ml-auto text-xs text-zinc-400">{open ? "▲" : "▼"}</span>
        </button>
        <button onClick={onRemove} className="ml-3 text-red-500 text-sm hover:text-red-700 font-black">Sil</button>
      </div>

      {open && (
        <div className="p-4 space-y-4 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Rozet (Seviye X)</label>
              <input value={course.badge} onChange={e => set("badge", e.target.value)} className="input w-full" />
            </div>
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Süre</label>
              <input value={course.duration} onChange={e => set("duration", e.target.value)} className="input w-full" />
            </div>
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Başlık</label>
              <input value={course.title} onChange={e => set("title", e.target.value)} className="input w-full" />
            </div>
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Alt Başlık</label>
              <input value={course.subtitle} onChange={e => set("subtitle", e.target.value)} className="input w-full" />
            </div>
            <div>
              <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Cihazlar</label>
              <input value={course.devices} onChange={e => set("devices", e.target.value)} className="input w-full" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-zinc-500 mb-1 uppercase tracking-wide">Hedef Kitle</label>
            <textarea value={course.target} onChange={e => set("target", e.target.value)} rows={2} className="input w-full resize-none" />
          </div>
          <ImageUpload label="Kurs Görseli" value={course.image} onChange={url => set("image", url)} />

          {/* Konular */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-zinc-500 uppercase tracking-wide">Konu Blokları</label>
              <button onClick={() => set("topics", [...course.topics, { title: "", items: [""] }])} className="text-xs font-black text-brand hover:underline">+ Blok Ekle</button>
            </div>
            {course.topics.map((topic, ti) => (
              <div key={ti} className="mb-3 rounded-lg bg-zinc-50 border border-zinc-100 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input value={topic.title} onChange={e => { const arr = [...course.topics]; arr[ti] = { ...arr[ti], title: e.target.value }; set("topics", arr); }} placeholder="Blok başlığı" className="input flex-1 text-sm" />
                  <button onClick={() => set("topics", course.topics.filter((_, idx) => idx !== ti))} className="text-red-500 font-black text-lg">×</button>
                </div>
                {topic.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-1.5 pl-2">
                    <input value={item} onChange={e => { const arr = [...course.topics]; const items = [...arr[ti].items]; items[ii] = e.target.value; arr[ti] = { ...arr[ti], items }; set("topics", arr); }} className="input flex-1 text-sm" placeholder="Madde" />
                    <button onClick={() => { const arr = [...course.topics]; arr[ti] = { ...arr[ti], items: arr[ti].items.filter((_, idx) => idx !== ii) }; set("topics", arr); }} className="text-red-400 font-black text-base">×</button>
                  </div>
                ))}
                <button onClick={() => { const arr = [...course.topics]; arr[ti] = { ...arr[ti], items: [...arr[ti].items, ""] }; set("topics", arr); }} className="text-[11px] font-black text-zinc-400 hover:text-brand pl-2">+ Madde</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TamirEgitimiEditor() {
  const [data, setData] = useState<TamirEgitimiContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/vippanel/sayfalar/tamir-egitimi").then(r => r.json()).then(setData); }, []);

  function update<K extends keyof TamirEgitimiContent>(key: K, val: TamirEgitimiContent[K]) {
    setData(prev => prev ? { ...prev, [key]: val } : prev);
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true); setSaved(false);
    await fetch("/api/vippanel/sayfalar/tamir-egitimi", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  }

  if (!data) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Tamir Eğitimi Sayfası</h1>
          <a href="/tamir-egitimi" target="_blank" className="text-xs font-bold text-zinc-400 hover:text-brand">↗ /tamir-egitimi</a>
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

      {/* Kurslar */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Kurslar (Seviyeler)</h2>
          <button onClick={() => update("courses", [...data.courses, { badge: "Seviye " + (data.courses.length + 1), title: "", subtitle: "", devices: "", duration: "", target: "", image: "", topics: [] }])} className="text-xs font-black text-brand hover:underline">+ Kurs Ekle</button>
        </div>
        {data.courses.map((course, i) => (
          <CourseEditor
            key={i}
            course={course}
            index={i}
            onChange={updated => { const arr = [...data.courses]; arr[i] = updated; update("courses", arr); }}
            onRemove={() => update("courses", data.courses.filter((_, idx) => idx !== i))}
          />
        ))}
      </section>

      {/* Faydalar */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Avantajlar / Faydalar</h2>
          <button onClick={() => update("benefits", [...data.benefits, { title: "", desc: "" }])} className="text-xs font-black text-brand hover:underline">+ Ekle</button>
        </div>
        {data.benefits.map((b, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 space-y-1.5">
              <input value={b.title} onChange={e => { const arr = [...data.benefits]; arr[i] = { ...arr[i], title: e.target.value }; update("benefits", arr); }} placeholder="Başlık" className="input w-full" />
              <textarea value={b.desc} onChange={e => { const arr = [...data.benefits]; arr[i] = { ...arr[i], desc: e.target.value }; update("benefits", arr); }} placeholder="Açıklama" rows={2} className="input w-full resize-none" />
            </div>
            <button onClick={() => update("benefits", data.benefits.filter((_, idx) => idx !== i))} className="text-red-500 text-lg font-black mt-1">×</button>
          </div>
        ))}
      </section>

      {/* SSS */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-zinc-800 text-sm uppercase tracking-wide">Sık Sorulan Sorular</h2>
          <button onClick={() => update("faq", [...data.faq, { q: "", a: "" }])} className="text-xs font-black text-brand hover:underline">+ Soru Ekle</button>
        </div>
        {data.faq.map((item, i) => (
          <div key={i} className="rounded-lg bg-zinc-50 p-4 space-y-2 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-zinc-400">Soru {i + 1}</span>
              <button onClick={() => update("faq", data.faq.filter((_, idx) => idx !== i))} className="text-xs text-red-500 hover:underline">Sil</button>
            </div>
            <input value={item.q} onChange={e => { const arr = [...data.faq]; arr[i] = { ...arr[i], q: e.target.value }; update("faq", arr); }} placeholder="Soru" className="input w-full" />
            <textarea value={item.a} onChange={e => { const arr = [...data.faq]; arr[i] = { ...arr[i], a: e.target.value }; update("faq", arr); }} placeholder="Cevap" rows={3} className="input w-full resize-none" />
          </div>
        ))}
      </section>
    </div>
  );
}
