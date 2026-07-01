"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  tarih: string;
  hizmet: string;
};

const EMPTY: Omit<Review, "id"> = {
  name: "",
  rating: 5,
  text: "",
  tarih: new Date().toISOString().slice(0, 10),
  hizmet: "",
};

export default function YorumlarPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Review, "id">>(EMPTY);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/vippanel/reviews").then((r) => r.json()).then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  async function saveAll(updated: Review[]) {
    setSaving(true);
    await fetch("/api/vippanel/reviews", {
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
    setForm(EMPTY);
    setShowForm(true);
  }

  function openEdit(r: Review) {
    setEditId(r.id);
    setForm({ name: r.name, rating: r.rating, text: r.text, tarih: r.tarih, hizmet: r.hizmet });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let updated: Review[];
    if (editId) {
      updated = reviews.map((r) => r.id === editId ? { ...form, id: editId } : r);
    } else {
      const newReview: Review = { ...form, id: Date.now().toString() };
      updated = [...reviews, newReview];
    }
    setReviews(updated);
    await saveAll(updated);
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    await saveAll(updated);
  }

  if (loading) {
    return <div className="p-8 pt-16 md:pt-8 text-sm text-zinc-400">Yükleniyor...</div>;
  }

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Müşteri Yorumları</h1>
          <p className="text-sm text-zinc-500 mt-1">{reviews.length} yorum</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-bold text-green-600">✓ Kaydedildi</span>}
          <button
            onClick={openNew}
            className="px-4 py-2 rounded-lg text-white text-sm font-black"
            style={{ background: "#ff351b" }}
          >
            + Yeni Yorum
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-lg font-black text-zinc-900 mb-4">
              {editId ? "Yorumu Düzenle" : "Yeni Yorum Ekle"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1">Ad Soyad</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required className="input" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1">Puan</label>
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="input">
                    {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ⭐</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Hizmet</label>
                <input value={form.hizmet} onChange={(e) => setForm({ ...form, hizmet: e.target.value })}
                  className="input" placeholder="Ekran Değişimi" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Yorum Metni</label>
                <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
                  required rows={4} className="input" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Tarih</label>
                <input type="date" value={form.tarih} onChange={(e) => setForm({ ...form, tarih: e.target.value })}
                  className="input" />
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

      {/* Review List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-black text-zinc-900 text-sm">{r.name}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{r.tarih} · {r.hizmet}</p>
              </div>
              <span className="text-amber-400 text-sm">{"⭐".repeat(r.rating)}</span>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-3">{r.text}</p>
            <div className="flex gap-2">
              <button onClick={() => openEdit(r)}
                className="flex-1 py-1.5 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors">
                Düzenle
              </button>
              <button onClick={() => handleDelete(r.id)}
                className="flex-1 py-1.5 text-xs font-bold rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
