"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { MarkaTamir, DesteklenenModel } from "@/lib/marka-tamir";

export default function MarkaTamirDetayPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [data, setData] = useState<MarkaTamir | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [yeniModel, setYeniModel] = useState("");
  const [modeller, setModeller] = useState<DesteklenenModel[]>([]);

  useEffect(() => {
    fetch(`/api/admin/marka-tamirler/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setModeller(d.desteklenenModeller ?? []);
        setLoading(false);
      });
  }, [slug]);

  function flash(m: string) {
    setMsg(m);
    setTimeout(() => setMsg(""), 2500);
  }

  async function kaydet(guncelModeller: DesteklenenModel[]) {
    setSaving(true);
    await fetch(`/api/admin/marka-tamirler/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ desteklenenModeller: guncelModeller }),
    });
    setSaving(false);
    flash("✓ Kaydedildi");
  }

  function modelEkle() {
    const isim = yeniModel.trim();
    if (!isim) return;
    if (modeller.some((m) => m.model.toLowerCase() === isim.toLowerCase())) {
      flash("Bu model zaten listede");
      return;
    }
    const guncellendi = [...modeller, { model: isim, aktif: true }];
    setModeller(guncellendi);
    setYeniModel("");
    kaydet(guncellendi);
  }

  function modelToggle(idx: number) {
    const guncellendi = modeller.map((m, i) =>
      i === idx ? { ...m, aktif: !m.aktif } : m
    );
    setModeller(guncellendi);
    kaydet(guncellendi);
  }

  function modelSil(idx: number) {
    const guncellendi = modeller.filter((_, i) => i !== idx);
    setModeller(guncellendi);
    kaydet(guncellendi);
  }

  if (loading) return <div className="p-8 pt-16 md:pt-8 text-sm text-zinc-400">Yükleniyor...</div>;
  if (!data) return <div className="p-8 pt-16 md:pt-8 text-sm text-red-500">Sayfa bulunamadı.</div>;

  const aktifSayi = modeller.filter((m) => m.aktif).length;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-2xl">
      {/* Başlık */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/marka-tamirler" className="text-zinc-400 hover:text-zinc-700 transition-colors">
          ← Geri
        </Link>
        <div>
          <h1 className="text-xl font-black text-zinc-900">{data.title}</h1>
          <p className="text-xs text-zinc-400">/tamir-hizmetleri/{slug}</p>
        </div>
        {msg && <span className="ml-auto text-sm font-black text-green-600">{msg}</span>}
        {saving && <span className="ml-auto text-sm text-zinc-400">Kaydediliyor...</span>}
      </div>

      {/* Özet */}
      <div className="flex gap-4 mb-6 text-sm">
        <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3 text-center">
          <p className="text-2xl font-black text-zinc-900">{modeller.length}</p>
          <p className="text-xs text-zinc-500">Toplam Model</p>
        </div>
        <div className="rounded-lg bg-green-50 border border-green-100 px-4 py-3 text-center">
          <p className="text-2xl font-black text-green-700">{aktifSayi}</p>
          <p className="text-xs text-zinc-500">Aktif</p>
        </div>
        <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3 text-center">
          <p className="text-2xl font-black text-zinc-400">{modeller.length - aktifSayi}</p>
          <p className="text-xs text-zinc-500">Pasif</p>
        </div>
      </div>

      {/* Yeni model ekle */}
      <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3">Yeni Model Ekle</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={yeniModel}
            onChange={(e) => setYeniModel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && modelEkle()}
            placeholder={`örn. ${data.markaLabel === "iPhone" ? "iPhone 16 Pro Max" : data.markaLabel === "Samsung" ? "Galaxy S25 Ultra" : "Xiaomi 15 Pro"}`}
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#ff351b]"
          />
          <button
            onClick={modelEkle}
            disabled={!yeniModel.trim()}
            className="px-4 py-2 rounded-lg text-sm font-black text-white disabled:opacity-40"
            style={{ background: "#ff351b" }}
          >
            Ekle
          </button>
        </div>
      </div>

      {/* Model listesi */}
      <div className="space-y-2">
        {modeller.length === 0 ? (
          <p className="text-sm text-zinc-400 py-4 text-center">Henüz model eklenmedi.</p>
        ) : (
          modeller.map((m, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                m.aktif ? "border-zinc-100 bg-white" : "border-zinc-100 bg-zinc-50 opacity-60"
              }`}
            >
              <button
                onClick={() => modelToggle(i)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  m.aktif ? "border-green-500 bg-green-500" : "border-zinc-300 bg-white"
                }`}
              >
                {m.aktif && <span className="text-white text-[10px] font-black">✓</span>}
              </button>
              <span className="flex-1 text-sm font-bold text-zinc-800">{m.model}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                m.aktif ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"
              }`}>
                {m.aktif ? "Aktif" : "Pasif"}
              </span>
              <button
                onClick={() => modelSil(i)}
                className="w-7 h-7 flex items-center justify-center rounded text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors font-black text-lg"
                title="Sil"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100 flex gap-3">
        <a
          href={`/tamir-hizmetleri/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-bold bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
        >
          Sayfayı Görüntüle
        </a>
      </div>
    </div>
  );
}
