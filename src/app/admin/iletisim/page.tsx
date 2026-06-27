"use client";

import { useEffect, useState } from "react";

type Settings = {
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
  sosyal: {
    instagram: string;
    youtube: string;
    facebook: string;
    google: string;
  };
};

export default function IletisimPage() {
  const [data, setData] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError("Kayıt başarısız.");
    }
  }

  function update(field: keyof Settings, value: unknown) {
    setData((prev) => prev ? { ...prev, [field]: value } : prev);
  }

  function updateSosyal(field: keyof Settings["sosyal"], value: string) {
    setData((prev) => prev ? { ...prev, sosyal: { ...prev.sosyal, [field]: value } } : prev);
  }

  if (!data) {
    return (
      <div className="p-8 pt-16 md:pt-8 flex items-center justify-center min-h-64">
        <div className="text-zinc-400 text-sm">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-zinc-900">İletişim & Site Ayarları</h1>
        <p className="text-sm text-zinc-500 mt-1">Telefon, adres, çalışma saatleri ve sosyal medya bilgileri.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        {/* İletişim */}
        <Section title="İletişim Bilgileri">
          <Field label="Telefon (Görünen)">
            <input value={data.telefon} onChange={(e) => update("telefon", e.target.value)}
              className="input" placeholder="+90 (505) 275 45 40" />
          </Field>
          <Field label="Telefon (Ham, başında + olmadan)">
            <input value={data.telefonRaw} onChange={(e) => update("telefonRaw", e.target.value)}
              className="input" placeholder="905052754540" />
          </Field>
          <Field label="WhatsApp Numarası">
            <input value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)}
              className="input" placeholder="905052754540" />
          </Field>
          <Field label="Çalışma Saatleri">
            <input value={data.calisma} onChange={(e) => update("calisma", e.target.value)}
              className="input" placeholder="Pzts. - Cmts. : 09:00 | 19:00" />
          </Field>
        </Section>

        {/* Adres */}
        <Section title="Adres Bilgileri">
          <Field label="Sokak / Detay">
            <input value={data.adres} onChange={(e) => update("adres", e.target.value)} className="input" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Semt / İlçe">
              <input value={data.sehir} onChange={(e) => update("sehir", e.target.value)} className="input" />
            </Field>
            <Field label="Şehir">
              <input value={data.ilce} onChange={(e) => update("ilce", e.target.value)} className="input" />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Posta Kodu">
              <input value={data.posta} onChange={(e) => update("posta", e.target.value)} className="input" />
            </Field>
            <Field label="Enlem (lat)">
              <input type="number" step="any" value={data.lat}
                onChange={(e) => update("lat", parseFloat(e.target.value))} className="input" />
            </Field>
            <Field label="Boylam (lng)">
              <input type="number" step="any" value={data.lng}
                onChange={(e) => update("lng", parseFloat(e.target.value))} className="input" />
            </Field>
          </div>
        </Section>

        {/* Site */}
        <Section title="Site Bilgileri">
          <Field label="Site Adı">
            <input value={data.siteAdi} onChange={(e) => update("siteAdi", e.target.value)} className="input" />
          </Field>
          <Field label="Slogan">
            <input value={data.slogan} onChange={(e) => update("slogan", e.target.value)} className="input" />
          </Field>
        </Section>

        {/* Sosyal Medya */}
        <Section title="Sosyal Medya">
          {(["instagram", "youtube", "facebook", "google"] as const).map((platform) => (
            <Field key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
              <input value={data.sosyal[platform]} onChange={(e) => updateSosyal(platform, e.target.value)}
                className="input" placeholder={`https://...`} />
            </Field>
          ))}
        </Section>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg text-white text-sm font-black transition disabled:opacity-60"
            style={{ background: "#ff351b" }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
          {saved && <span className="text-sm font-bold text-green-600">✓ Kaydedildi</span>}
          {error && <span className="text-sm font-bold text-red-600">{error}</span>}
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
      <h2 className="text-sm font-black text-zinc-900 mb-4 uppercase tracking-wide">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-zinc-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
