"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PREDEFINED_BRANDS = [
  { key: "iphone", label: "iPhone" },
  { key: "samsung", label: "Samsung" },
  { key: "xiaomi", label: "Xiaomi" },
];

const ALL_REPAIRS = [
  { key: "ekran-degisimi",         label: "Ekran Değişimi" },
  { key: "batarya-degisimi",       label: "Batarya Değişimi" },
  { key: "sarj-soketi-tamiri",     label: "Şarj Soketi Tamiri" },
  { key: "ses-arizalari",          label: "Ses Arızaları" },
  { key: "mikrofon-tamiri",        label: "Mikrofon Tamiri" },
  { key: "hoparlor-tamiri",        label: "Hoparlör Tamiri" },
  { key: "on-kamera-tamiri",       label: "Ön Kamera Tamiri" },
  { key: "arka-kamera-tamiri",     label: "Arka Kamera Tamiri" },
  { key: "face-id-tamiri",         label: "Face ID Tamiri" },
  { key: "kamera-cami-tamiri",     label: "Kamera Camı Tamiri" },
  { key: "kasa-degisimi",          label: "Kasa Değişimi" },
  { key: "arka-kapak-tamiri",      label: "Arka Kapak Tamiri" },
  { key: "anakart-tamiri",         label: "Anakart Tamiri" },
  { key: "sivi-temasi-tamiri",     label: "Sıvı Teması Tamiri" },
  { key: "wifi-tamiri",            label: "WiFi Tamiri" },
  { key: "servis-yok-arizasi",     label: "Servis Yok Arızası" },
  { key: "sarj-olmuyor-tamiri",    label: "Şarj Olmuyor Tamiri" },
  { key: "sarj-entegresi-tamiri",  label: "Şarj Entegresi Tamiri" },
  { key: "acma-kapama-tusu-tamiri",label: "Açma/Kapama Tuşu Tamiri" },
  { key: "on-cam-degisimi",        label: "Ön Cam Değişimi" },
];

const COMMON_REPAIRS = ["ekran-degisimi", "batarya-degisimi", "sarj-soketi-tamiri", "kamera-cami-tamiri"];

export default function YeniCihazPage() {
  const router = useRouter();
  const [brandType, setBrandType] = useState<"predefined" | "custom">("predefined");
  const [brandKey, setBrandKey] = useState("iphone");
  const [brandLabel, setBrandLabel] = useState("iPhone");
  const [customBrandKey, setCustomBrandKey] = useState("");
  const [customBrandLabel, setCustomBrandLabel] = useState("");
  const [model, setModel] = useState("");
  const [selectedRepairs, setSelectedRepairs] = useState<string[]>(COMMON_REPAIRS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function toggleRepair(key: string) {
    setSelectedRepairs((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function selectAll() { setSelectedRepairs(ALL_REPAIRS.map((r) => r.key)); }
  function selectNone() { setSelectedRepairs([]); }
  function selectCommon() { setSelectedRepairs(COMMON_REPAIRS); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!model.trim()) { setError("Model adı gerekli."); return; }
    if (selectedRepairs.length === 0) { setError("En az bir tamir türü seçin."); return; }

    const finalBrandKey = brandType === "custom"
      ? customBrandKey.toLowerCase().replace(/\s+/g, "-")
      : brandKey;
    const finalBrandLabel = brandType === "custom" ? customBrandLabel : brandLabel;

    if (!finalBrandKey || !finalBrandLabel) { setError("Marka bilgisi eksik."); return; }

    setSaving(true);
    setError("");

    const getRes = await fetch("/api/admin/custom-devices");
    const existing = await getRes.json();

    const newDevice = {
      id: `custom-${Date.now()}`,
      brandKey: finalBrandKey,
      brandLabel: finalBrandLabel,
      model: model.trim(),
      repairKeys: selectedRepairs,
    };

    const updated = [...existing, newDevice];
    const saveRes = await fetch("/api/admin/custom-devices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    setSaving(false);
    if (saveRes.ok) {
      router.push("/admin/tamirler");
      router.refresh();
    } else {
      setError("Kayıt sırasında hata oluştu.");
    }
  }

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push("/admin/tamirler")} className="text-zinc-400 hover:text-zinc-700 text-sm font-bold">
            ← Tamir Sayfaları
          </button>
          <h1 className="text-2xl font-black text-zinc-900">Yeni Cihaz Ekle</h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          {/* Brand */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100 space-y-4">
            <h2 className="font-black text-zinc-900">Marka</h2>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setBrandType("predefined")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${brandType === "predefined" ? "text-white" : "bg-zinc-100 text-zinc-700"}`}
                style={{ background: brandType === "predefined" ? "#ff351b" : undefined }}
              >
                Hazır Marka
              </button>
              <button
                type="button"
                onClick={() => setBrandType("custom")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${brandType === "custom" ? "text-white" : "bg-zinc-100 text-zinc-700"}`}
                style={{ background: brandType === "custom" ? "#ff351b" : undefined }}
              >
                Özel Marka
              </button>
            </div>

            {brandType === "predefined" ? (
              <div className="flex gap-2 flex-wrap">
                {PREDEFINED_BRANDS.map((b) => (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => { setBrandKey(b.key); setBrandLabel(b.label); }}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold border-2 transition-colors ${brandKey === b.key ? "border-[#ff351b] text-[#ff351b] bg-red-50" : "border-zinc-200 text-zinc-700 bg-white hover:border-zinc-300"}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1">Marka Adı (görünür)</label>
                  <input
                    value={customBrandLabel}
                    onChange={(e) => setCustomBrandLabel(e.target.value)}
                    placeholder="Oppo, Huawei, OnePlus..."
                    className="input"
                    required={brandType === "custom"}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1">Marka Anahtarı (URL için)</label>
                  <input
                    value={customBrandKey}
                    onChange={(e) => setCustomBrandKey(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    placeholder="oppo, huawei, oneplus..."
                    className="input font-mono"
                    required={brandType === "custom"}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Model */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
            <h2 className="font-black text-zinc-900 mb-3">Model Adı</h2>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Örn: iPhone 19, Galaxy S25 Edge, Reno 13 Pro..."
              className="input"
              required
            />
            {model && (
              <p className="text-xs text-zinc-400 font-mono mt-2">
                URL örneği: /tamir-hizmetleri/{model.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-ekran-degisimi
              </p>
            )}
          </div>

          {/* Repair types */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-zinc-900">Tamir Seçenekleri</h2>
              <div className="flex gap-2">
                <button type="button" onClick={selectAll} className="text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors">Tümü</button>
                <span className="text-zinc-300">|</span>
                <button type="button" onClick={selectCommon} className="text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors">Yaygın</button>
                <span className="text-zinc-300">|</span>
                <button type="button" onClick={selectNone} className="text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors">Sıfırla</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {ALL_REPAIRS.map((r) => {
                const checked = selectedRepairs.includes(r.key);
                return (
                  <label
                    key={r.key}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${checked ? "bg-red-50 border-[#ff351b]" : "bg-zinc-50 border-zinc-100 hover:border-zinc-300"}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleRepair(r.key)}
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-[#ff351b] border-[#ff351b]" : "border-zinc-300"}`}>
                      {checked && <span className="text-white text-[10px] font-black">✓</span>}
                    </span>
                    <span className={`text-sm font-bold ${checked ? "text-[#ff351b]" : "text-zinc-700"}`}>{r.label}</span>
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-zinc-400 mt-3">{selectedRepairs.length} tamir türü seçili · Her biri için ayrı sayfa oluşturulur</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600 font-bold">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-lg text-white text-sm font-black disabled:opacity-50 transition-opacity"
              style={{ background: "#ff351b" }}
            >
              {saving ? "Ekleniyor..." : `Cihaz Ekle (${selectedRepairs.length} Sayfa Oluştur)`}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/tamirler")}
              className="px-6 py-3 rounded-lg text-sm font-black bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
            >
              İptal
            </button>
          </div>
        </form>
    </div>
  );
}
