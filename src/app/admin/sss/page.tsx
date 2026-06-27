"use client";

import { useEffect, useState } from "react";

type FaqItem = {
  id: string;
  soru: string;
  cevap: string;
};

export default function SSSPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ soru: "", cevap: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/admin/faq").then((r) => r.json()).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  async function saveAll(updated: FaqItem[]) {
    setSaving(true);
    await fetch("/api/admin/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function openNew() {
    setEditId(null);
    setForm({ soru: "", cevap: "" });
    setShowForm(true);
  }

  function openEdit(item: FaqItem) {
    setEditId(item.id);
    setForm({ soru: item.soru, cevap: item.cevap });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let updated: FaqItem[];
    if (editId) {
      updated = items.map((i) => i.id === editId ? { ...form, id: editId } : i);
    } else {
      updated = [...items, { ...form, id: Date.now().toString() }];
    }
    setItems(updated);
    await saveAll(updated);
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu SSS maddesini silmek istediğinize emin misiniz?")) return;
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    await saveAll(updated);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const updated = [...items];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setItems(updated);
    saveAll(updated);
  }

  function moveDown(index: number) {
    if (index === items.length - 1) return;
    const updated = [...items];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setItems(updated);
    saveAll(updated);
  }

  if (loading) {
    return <div className="p-8 pt-16 md:pt-8 text-sm text-zinc-400">Yükleniyor...</div>;
  }

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Sık Sorulan Sorular</h1>
          <p className="text-sm text-zinc-500 mt-1">{items.length} soru</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-bold text-green-600">✓ Kaydedildi</span>}
          <button
            onClick={openNew}
            className="px-4 py-2 rounded-lg text-white text-sm font-black"
            style={{ background: "#ff351b" }}
          >
            + Yeni Soru
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-lg font-black text-zinc-900 mb-4">
              {editId ? "Soruyu Düzenle" : "Yeni Soru Ekle"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Soru</label>
                <input value={form.soru} onChange={(e) => setForm({ ...form, soru: e.target.value })}
                  required className="input" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Cevap</label>
                <textarea value={form.cevap} onChange={(e) => setForm({ ...form, cevap: e.target.value })}
                  required rows={5} className="input" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-60"
                  style={{ background: "#ff351b" }}>
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-black bg-zinc-100 text-zinc-700">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-3 max-w-3xl">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <div className="flex items-start gap-3">
              <div className="flex flex-col gap-1 pt-0.5">
                <button onClick={() => moveUp(index)} disabled={index === 0}
                  className="text-zinc-300 hover:text-zinc-600 disabled:opacity-30 transition-colors text-xs leading-none">
                  ▲
                </button>
                <button onClick={() => moveDown(index)} disabled={index === items.length - 1}
                  className="text-zinc-300 hover:text-zinc-600 disabled:opacity-30 transition-colors text-xs leading-none">
                  ▼
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-zinc-900 text-sm">{item.soru}</p>
                <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed">{item.cevap}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors">
                  Düzenle
                </button>
                <button onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
