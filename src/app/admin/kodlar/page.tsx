"use client";

import { useEffect, useState } from "react";
import type { SiteScripts } from "@/lib/scripts";

export default function KodlarPage() {
  const [data, setData] = useState<SiteScripts | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/scripts").then((r) => r.json()).then(setData);
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/scripts", {
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
          <h1 className="text-2xl font-black text-zinc-900">Kod & Script Yönetimi</h1>
          <p className="text-sm text-zinc-400 mt-0.5">Google Analytics, GTM ve özel script enjeksiyonu.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-50"
          style={{ background: "#ff351b" }}
        >
          {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

      <div className="space-y-5">
        {/* Google Analytics */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5 space-y-4">
          <div>
            <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wide mb-0.5">📊 Google Analytics 4</h2>
            <p className="text-xs text-zinc-400 mb-3">Measurement ID girilirse GA4 scripti otomatik eklenir.</p>
            <label className="block text-xs font-bold text-zinc-600 mb-1.5">Measurement ID</label>
            <input
              value={data.gaId}
              onChange={(e) => setData({ ...data, gaId: e.target.value })}
              className="input w-full font-mono"
              placeholder="G-XXXXXXXXXX"
            />
            {data.gaId && (
              <div className="mt-3 rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[11px] font-bold text-zinc-500 mb-1">Eklenecek script (otomatik):</p>
                <pre className="text-[11px] text-zinc-600 whitespace-pre-wrap break-all font-mono">
                  {`<script async src="https://www.googletagmanager.com/gtag/js?id=${data.gaId}"></script>\n<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${data.gaId}');</script>`}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Google Tag Manager */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wide mb-0.5">🏷️ Google Tag Manager</h2>
          <p className="text-xs text-zinc-400 mb-3">GTM ID girilirse hem &lt;head&gt; hem &lt;body&gt; kodu otomatik eklenir.</p>
          <label className="block text-xs font-bold text-zinc-600 mb-1.5">Container ID</label>
          <input
            value={data.gtmId}
            onChange={(e) => setData({ ...data, gtmId: e.target.value })}
            className="input w-full font-mono"
            placeholder="GTM-XXXXXXX"
          />
        </div>

        {/* Head Extra */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wide mb-0.5">🔝 &lt;head&gt; Özel Kodlar</h2>
          <p className="text-xs text-zinc-400 mb-3">
            &lt;/head&gt; kapanmadan önce eklenir. Meta tag, link, schema veya script kodu yazabilirsiniz.
          </p>
          <textarea
            value={data.headExtra}
            onChange={(e) => setData({ ...data, headExtra: e.target.value })}
            rows={6}
            className="input w-full font-mono text-sm resize-y"
            placeholder={"<!-- Örnek: Hotjar, Clarity, özel meta tag -->\n<script>...</script>"}
          />
        </div>

        {/* Body Start */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wide mb-0.5">⬆️ &lt;body&gt; Başı Kodlar</h2>
          <p className="text-xs text-zinc-400 mb-3">
            &lt;body&gt; açıldıktan hemen sonra eklenir. GTM noscript fallback vb.
          </p>
          <textarea
            value={data.bodyStart}
            onChange={(e) => setData({ ...data, bodyStart: e.target.value })}
            rows={5}
            className="input w-full font-mono text-sm resize-y"
            placeholder={"<!-- Örnek: GTM noscript, Facebook Pixel -->\n<noscript>...</noscript>"}
          />
        </div>

        {/* Body End */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
          <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wide mb-0.5">⬇️ &lt;body&gt; Sonu Kodlar</h2>
          <p className="text-xs text-zinc-400 mb-3">
            &lt;/body&gt; kapanmadan önce eklenir. Yavaş yüklenen scriptler için idealdir.
          </p>
          <textarea
            value={data.bodyEnd}
            onChange={(e) => setData({ ...data, bodyEnd: e.target.value })}
            rows={5}
            className="input w-full font-mono text-sm resize-y"
            placeholder={"<!-- Örnek: canlı chat widget, özel analytics -->\n<script>...</script>"}
          />
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-bold text-amber-800">
            ⚠️ Güvenlik notu: Buraya yalnızca güvendiğiniz kaynaklardan kod ekleyin.
            Kötü niyetli script sitenizin ziyaretçilerine zarar verebilir.
          </p>
        </div>
      </div>
    </div>
  );
}
