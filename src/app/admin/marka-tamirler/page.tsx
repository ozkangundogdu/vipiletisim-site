"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { MarkaTamir } from "@/lib/marka-tamir";

const MARKA_ORDER = ["iphone", "samsung", "xiaomi"];
const MARKA_LABELS: Record<string, string> = { iphone: "iPhone", samsung: "Samsung", xiaomi: "Xiaomi" };

export default function MarkaTamirlerPage() {
  const [liste, setListe] = useState<MarkaTamir[]>([]);
  const [loading, setLoading] = useState(true);
  const [aktifMarka, setAktifMarka] = useState("iphone");

  useEffect(() => {
    fetch("/api/admin/marka-tamirler")
      .then((r) => r.json())
      .then((data) => { setListe(data); setLoading(false); });
  }, []);

  const filtered = liste.filter((m) => m.marka === aktifMarka);

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Marka Tamir Sayfaları</h1>
          <p className="text-sm text-zinc-500 mt-1">{liste.length} sayfa · 3 marka</p>
        </div>
      </div>

      {/* Marka sekmeleri */}
      <div className="flex gap-1 mb-6 border-b border-zinc-200">
        {MARKA_ORDER.map((marka) => {
          const count = liste.filter((m) => m.marka === marka).length;
          return (
            <button
              key={marka}
              onClick={() => setAktifMarka(marka)}
              className="px-5 py-2.5 text-sm font-black border-b-2 transition-colors -mb-px"
              style={{
                borderColor: aktifMarka === marka ? "#ff351b" : "transparent",
                color: aktifMarka === marka ? "#ff351b" : "#71717a",
              }}
            >
              {MARKA_LABELS[marka]} ({count})
            </button>
          );
        })}
      </div>

      {loading ? (
        <p className="text-sm text-zinc-400 py-8">Yükleniyor...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-bold">Henüz {MARKA_LABELS[aktifMarka]} tamir sayfası yok.</p>
          <p className="text-sm mt-1">İçerik oluşturma scripti çalıştırıldığında burada görünür.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((m) => {
            const aktifSayi = m.desteklenenModeller.filter((d) => d.aktif).length;
            return (
              <div
                key={m.slug}
                className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-white px-5 py-4 shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-black text-zinc-900">{m.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    /tamir-hizmetleri/{m.slug} · {aktifSayi} model destekleniyor
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`/tamir-hizmetleri/${m.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
                  >
                    Görüntüle
                  </a>
                  <Link
                    href={`/admin/marka-tamirler/${m.slug}`}
                    className="px-3 py-1.5 text-xs font-black rounded-lg text-white transition-colors"
                    style={{ background: "#ff351b" }}
                  >
                    Modelleri Yönet
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
