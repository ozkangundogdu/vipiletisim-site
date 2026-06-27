"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

type RepairPageData = {
  customTitle: string;
  customDescription: string;
  customContent: string;
  coverImage: string;
  publishedAt: string;
};

type DeviceRepair = { slug: string; title: string; repairTypeLabel: string };

type Props = {
  slug: string;
  serviceTitle: string;
  serviceModel: string;
  serviceRepairType: string;
  templateMarkdown: string;
  deviceRepairs: DeviceRepair[];
};

function simplePreview(md: string): string {
  const escaped = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = escaped.split("\n");
  const html: string[] = [];
  let inUl = false;
  let inOl = false;
  for (const raw of lines) {
    let line = raw
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code style='background:#f4f4f5;padding:1px 4px;border-radius:3px;font-size:.85em'>$1</code>")
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "<img src='$2' alt='$1' style='max-width:100%;border-radius:8px;margin:6px 0'>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' style='color:#ff351b;text-decoration:underline'>$1</a>");
    if (/^### /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; } if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<h3 style='font-size:1.05em;font-weight:900;margin:1.2em 0 .3em'>${line.slice(4)}</h3>`);
    } else if (/^## /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; } if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<h2 style='font-size:1.25em;font-weight:900;margin:1.5em 0 .5em'>${line.slice(3)}</h2>`);
    } else if (/^# /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; } if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<h1 style='font-size:1.5em;font-weight:900;margin:1.5em 0 .5em'>${line.slice(2)}</h1>`);
    } else if (/^[-*] /.test(line)) {
      if (inOl) { html.push("</ol>"); inOl = false; }
      if (!inUl) { html.push("<ul style='padding-left:1.5em;margin:.5em 0'>"); inUl = true; }
      html.push(`<li style='margin:.25em 0'>${line.slice(2)}</li>`);
    } else if (/^\d+\. /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (!inOl) { html.push("<ol style='padding-left:1.5em;margin:.5em 0'>"); inOl = true; }
      html.push(`<li style='margin:.25em 0'>${line.replace(/^\d+\. /, "")}</li>`);
    } else if (/^&gt; /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; } if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<blockquote style='border-left:3px solid #ff351b;padding:.5em 1em;margin:.5em 0;color:#666;font-style:italic'>${line.slice(5)}</blockquote>`);
    } else if (line.trim() === "") {
      if (inUl) { html.push("</ul>"); inUl = false; } if (inOl) { html.push("</ol>"); inOl = false; }
    } else {
      if (inUl) { html.push("</ul>"); inUl = false; } if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<p style='margin:.5em 0;line-height:1.7'>${line}</p>`);
    }
  }
  if (inUl) html.push("</ul>"); if (inOl) html.push("</ol>");
  return html.join("\n");
}

function ToolBtn({ onClick, title, children }: { onClick?: () => void; title?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} title={title}
      className="px-2 py-1 text-xs font-bold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors">
      {children}
    </button>
  );
}

export function RepairEditor({ slug, serviceTitle, serviceModel, serviceRepairType, templateMarkdown, deviceRepairs }: Props) {
  const router = useRouter();
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState<"yaz" | "onizle" | "seo">("yaz");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  // Aktif slug state — değiştirilebilir
  const [activeSlug, setActiveSlug] = useState(slug);
  const [activeTitle, setActiveTitle] = useState(serviceTitle);
  const [activeRepairType, setActiveRepairType] = useState(serviceRepairType);
  const [activeTemplate, setActiveTemplate] = useState(templateMarkdown);

  const [data, setData] = useState<RepairPageData>({
    customTitle: "",
    customDescription: "",
    customContent: "",
    coverImage: "",
    publishedAt: "",
  });

  useEffect(() => {
    fetch(`/api/admin/repair-page/${slug}`)
      .then((r) => r.json())
      .then((d) => setData({
        customTitle: d.customTitle ?? "",
        customDescription: d.customDescription ?? "",
        customContent: d.customContent ?? "",
        coverImage: d.coverImage ?? "",
        publishedAt: d.publishedAt ?? "",
      }));
  }, [slug]);

  const insert = useCallback((before: string, after = "", placeholder = "") => {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const e = ta.selectionEnd;
    const sel = ta.value.slice(s, e) || placeholder;
    const next = ta.value.slice(0, s) + before + sel + after + ta.value.slice(e);
    setData((p) => ({ ...p, customContent: next }));
    setTimeout(() => { ta.focus(); const c = s + before.length + sel.length; ta.setSelectionRange(c, c); }, 0);
  }, []);

  const insertLine = useCallback((prefix: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const ls = ta.value.lastIndexOf("\n", s - 1) + 1;
    const next = ta.value.slice(0, ls) + prefix + ta.value.slice(ls);
    setData((p) => ({ ...p, customContent: next }));
    setTimeout(() => { ta.focus(); const c = ls + prefix.length; ta.setSelectionRange(c, c); }, 0);
  }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploadingImg(false);
    if (json.url) insert(`![${file.name}](`, ")", file.name);
    e.target.value = "";
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploadingImg(false);
    if (json.url) setData((p) => ({ ...p, coverImage: json.url }));
  }

  async function saveCurrentData(currentData: RepairPageData, currentSlug: string) {
    await fetch(`/api/admin/repair-page/${currentSlug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentData),
    });
  }

  async function handleSave() {
    setSaving(true);
    await saveCurrentData(data, activeSlug);
    setSaving(false);
    // Taslak ise zamanlama sekmesine yönlendir
    const stillDraft = data.publishedAt && new Date(data.publishedAt) > new Date();
    if (stillDraft) {
      router.push("/admin/tamirler?tab=zamanlama");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  async function switchToRepair(repair: DeviceRepair) {
    if (repair.slug === activeSlug || switching) return;
    setSwitching(true);

    // Mevcut içeriği otomatik kaydet
    await saveCurrentData(data, activeSlug);

    // Yeni sayfanın verisini ve template'ini paralel çek
    const [pageRes, tmplRes] = await Promise.all([
      fetch(`/api/admin/repair-page/${repair.slug}`).then((r) => r.json()),
      fetch(`/api/admin/repair-template/${repair.slug}`).then((r) => r.json()),
    ]);

    setActiveSlug(repair.slug);
    setActiveTitle(repair.title);
    setActiveRepairType(repair.repairTypeLabel);
    setActiveTemplate(tmplRes.templateMarkdown ?? "");
    setData({
      customTitle: pageRes.customTitle ?? "",
      customDescription: pageRes.customDescription ?? "",
      customContent: pageRes.customContent ?? "",
      coverImage: pageRes.coverImage ?? "",
      publishedAt: pageRes.publishedAt ?? "",
    });
    setSaved(false);
    setActiveTab("yaz");
    setSwitching(false);
  }

  // Yayın durumu
  const now = new Date();
  const isImmediate = !data.publishedAt;
  const isDraft = !!data.publishedAt && new Date(data.publishedAt) > now;

  const titleDisplay = data.customTitle || activeTitle;
  const descDisplay = data.customDescription || `Trabzon'da ${serviceModel} ${activeRepairType} hizmeti. Uzman teknisyen, orijinal parça.`;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button onClick={() => router.push("/admin/tamirler")}
          className="text-zinc-400 hover:text-zinc-700 transition-colors text-sm font-bold">
          ← Tamir Sayfaları
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-black text-zinc-900 truncate">{activeTitle}</h1>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">/tamir-hizmetleri/{activeSlug}</p>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          {switching && <span className="text-sm text-zinc-400">Geçiliyor...</span>}
          {saved && !switching && <span className="text-sm font-bold text-green-600">✓ Kaydedildi</span>}
          <a href={`/tamir-hizmetleri/${activeSlug}`} target="_blank" rel="noopener"
            className="text-sm font-bold text-zinc-500 hover:text-zinc-700 transition-colors">
            Önizle ↗
          </a>
          <button onClick={handleSave} disabled={saving || switching}
            className="px-5 py-2.5 rounded-lg text-white text-sm font-black transition disabled:opacity-50"
            style={{ background: "#ff351b" }}>
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor column */}
        <div className="lg:col-span-2 space-y-4">

          {/* Cover image */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <label className="block text-xs font-black text-zinc-600 uppercase tracking-wide mb-2">
              Kapak Görseli (isteğe bağlı)
            </label>
            <div className="flex gap-3 items-center">
              <input value={data.coverImage}
                onChange={(e) => setData((p) => ({ ...p, coverImage: e.target.value }))}
                placeholder="https://... veya /uploads/..."
                className="input flex-1" />
              <label className="cursor-pointer px-3 py-2 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors whitespace-nowrap">
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                {uploadingImg ? "Yükleniyor..." : "Dosya Seç"}
              </label>
            </div>
            {data.coverImage && (
              <img src={data.coverImage} alt="Kapak" className="mt-3 h-28 w-full object-cover rounded-lg" />
            )}
          </div>

          {/* Markdown editor */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
            <div className="flex items-center border-b border-zinc-100 px-4">
              {(["yaz", "onizle", "seo"] as const).map((t) => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className="px-4 py-3 text-xs font-black uppercase tracking-wide border-b-2 -mb-px transition-colors"
                  style={{ borderColor: activeTab === t ? "#ff351b" : "transparent", color: activeTab === t ? "#ff351b" : "#71717a" }}>
                  {t === "yaz" ? "İçerik Yaz" : t === "onizle" ? "Önizle" : "SEO"}
                </button>
              ))}
              {activeTab === "yaz" && (
                <div className="ml-auto flex items-center gap-1">
                  <label className="cursor-pointer" title="İçeriğe resim ekle">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <ToolBtn title="Resim ekle">🖼 Resim</ToolBtn>
                  </label>
                  <button type="button"
                    onClick={() => setData((p) => ({ ...p, customContent: activeTemplate }))}
                    className="px-3 py-1 text-xs font-bold text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded transition-colors">
                    Şablondan Başla
                  </button>
                </div>
              )}
            </div>

            {activeTab === "yaz" && (
              <div className="flex flex-wrap gap-0.5 px-3 py-2 border-b border-zinc-50 bg-zinc-50">
                <ToolBtn onClick={() => insert("**", "**", "kalın")} title="Kalın"><strong>B</strong></ToolBtn>
                <ToolBtn onClick={() => insert("*", "*", "italik")} title="İtalik"><em>I</em></ToolBtn>
                <span className="w-px h-5 bg-zinc-200 mx-1 self-center" />
                <ToolBtn onClick={() => insertLine("## ")} title="Başlık H2">H2</ToolBtn>
                <ToolBtn onClick={() => insertLine("### ")} title="Başlık H3">H3</ToolBtn>
                <span className="w-px h-5 bg-zinc-200 mx-1 self-center" />
                <ToolBtn onClick={() => insertLine("- ")} title="Liste">• Liste</ToolBtn>
                <ToolBtn onClick={() => insertLine("1. ")} title="Numaralı Liste">1. Liste</ToolBtn>
                <span className="w-px h-5 bg-zinc-200 mx-1 self-center" />
                <ToolBtn onClick={() => insertLine("> ")} title="Alıntı">❝</ToolBtn>
                <ToolBtn onClick={() => insert("`", "`", "kod")} title="Kod">{"`"}Kod`</ToolBtn>
                <span className="w-px h-5 bg-zinc-200 mx-1 self-center" />
                <ToolBtn onClick={() => insert("[", "](https://)", "link metni")} title="Link">🔗</ToolBtn>
              </div>
            )}

            {activeTab === "yaz" && (
              <div className="relative">
                <textarea ref={taRef} value={data.customContent}
                  onChange={(e) => setData((p) => ({ ...p, customContent: e.target.value }))}
                  placeholder={`${activeTitle} hakkında içerik yazın...\n\nBoş bırakırsanız otomatik oluşturulan içerik kullanılır.\n"Şablondan Başla" butonuyla mevcut şablonu buraya aktarabilirsiniz.`}
                  className="w-full h-[500px] resize-y p-5 text-sm font-mono text-zinc-700 border-none outline-none leading-relaxed"
                  spellCheck={false} />
                <div className="absolute bottom-3 right-4 text-xs text-zinc-300 select-none">
                  {data.customContent.length} karakter
                </div>
              </div>
            )}

            {activeTab === "onizle" && (
              <div className="p-6 min-h-[400px] prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: data.customContent
                    ? simplePreview(data.customContent)
                    : `<p style="color:#aaa;font-style:italic">İçerik boş — otomatik şablon içeriği görünecek.</p><hr style="margin:1em 0">${simplePreview(activeTemplate)}`
                }} />
            )}

            {activeTab === "seo" && (
              <div className="p-6 space-y-5">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-black text-zinc-600 uppercase tracking-wide">Özel Sayfa Başlığı</label>
                    <span className={`text-xs font-bold ${data.customTitle.length > 60 ? "text-red-500" : data.customTitle.length > 40 ? "text-green-600" : "text-zinc-400"}`}>
                      {data.customTitle.length}/60
                    </span>
                  </div>
                  <input value={data.customTitle}
                    onChange={(e) => setData((p) => ({ ...p, customTitle: e.target.value }))}
                    placeholder={activeTitle} className="input" />
                  <p className="text-xs text-zinc-400 mt-1">Boş bırakırsanız: <em>{activeTitle} | Vip İletişim Trabzon</em></p>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-black text-zinc-600 uppercase tracking-wide">Meta Açıklama</label>
                    <span className={`text-xs font-bold ${data.customDescription.length > 160 ? "text-red-500" : data.customDescription.length > 110 ? "text-green-600" : "text-zinc-400"}`}>
                      {data.customDescription.length}/160
                    </span>
                  </div>
                  <textarea value={data.customDescription}
                    onChange={(e) => setData((p) => ({ ...p, customDescription: e.target.value }))}
                    rows={3}
                    placeholder={`Trabzon'da ${serviceModel} ${activeRepairType} için profesyonel tamir hizmeti...`}
                    className="input" />
                </div>
                <div className="border border-zinc-200 rounded-xl p-5 bg-zinc-50">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-3 font-bold">Google Arama Önizlemesi</p>
                  <p className="text-xs text-green-700 mb-0.5">vipiletisim.com.tr/tamir-hizmetleri/{activeSlug}</p>
                  <p className="text-[17px] text-blue-700 font-medium mb-0.5 line-clamp-1">{titleDisplay} | Vip İletişim Trabzon</p>
                  <p className="text-sm text-zinc-500 line-clamp-2">{descDisplay}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">

          {/* Sayfa bilgisi */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <h3 className="font-black text-zinc-900 text-sm mb-3">Sayfa Bilgisi</h3>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Model</dt>
                <dd className="font-bold text-zinc-800">{serviceModel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Tamir Türü</dt>
                <dd className="font-bold text-zinc-800">{activeRepairType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">İçerik</dt>
                <dd className={`font-bold ${data.customContent ? "text-green-600" : "text-zinc-400"}`}>
                  {data.customContent ? "Özel içerik" : "Otomatik şablon"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Yayın durumu */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100 space-y-3">
            <h3 className="font-black text-zinc-900 text-sm">Yayın Durumu</h3>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${isImmediate ? "bg-green-100 text-green-700" : isDraft ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                {isImmediate ? "Hemen yayınlanacak" : isDraft ? "Taslak" : "Yayında"}
              </span>
            </div>
            {isDraft && (
              <button
                type="button"
                onClick={() => setData((p) => ({ ...p, publishedAt: "" }))}
                className="w-full py-2 rounded-lg text-xs font-black border-2 transition-colors"
                style={{ borderColor: "#ff351b", color: "#ff351b", background: "#fff5f5" }}>
                Hemen Yayınla
              </button>
            )}
            {isImmediate && (
              <p className="text-[10px] text-zinc-400">Kaydettiğinizde hemen yayına girer</p>
            )}
            {isDraft && (
              <p className="text-[10px] text-zinc-400">Kaydet → Zamanlama sayfasına gider</p>
            )}
          </div>

          {/* Aynı cihazdaki diğer tamir türleri */}
          {deviceRepairs.length > 1 && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
              <h3 className="font-black text-zinc-900 text-sm mb-3">
                Diğer Tamir Türleri
                <span className="ml-2 text-[10px] font-bold text-zinc-400">({deviceRepairs.length})</span>
              </h3>
              <div className="space-y-0.5 max-h-64 overflow-y-auto -mx-1">
                {deviceRepairs.map((r) => {
                  const isActive = r.slug === activeSlug;
                  return (
                    <button key={r.slug} type="button"
                      onClick={() => switchToRepair(r)}
                      disabled={isActive || switching}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors disabled:cursor-default"
                      style={{
                        background: isActive ? "#fff5f5" : undefined,
                        color: isActive ? "#ff351b" : "#52525b",
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#f4f4f5"; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = ""; }}
                    >
                      {isActive && <span className="mr-1">›</span>}
                      {r.repairTypeLabel}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-zinc-400 mt-2">Tıkla → otomatik kaydeder ve geçer</p>
            </div>
          )}

          {/* Hızlı ekle */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <h3 className="font-black text-zinc-900 text-sm mb-3">Hızlı Ekle</h3>
            <div className="space-y-1.5">
              {[
                ["Fiyat Bölümü", "## Trabzon'da Fiyat\n\nFiyat bilgisi için bize ulaşın."],
                ["Önemli Not", "> **Önemli:** Buraya not ekleyin."],
                ["Uzman Notu", "> **Uzman Notu:** Teknik tavsiye buraya."],
              ].map(([label, snippet]) => (
                <button key={label} type="button"
                  onClick={() => setData((p) => ({ ...p, customContent: p.customContent + (p.customContent ? "\n\n" : "") + snippet }))}
                  className="w-full text-left text-xs font-bold text-zinc-600 hover:text-zinc-900 py-1.5 px-2 rounded hover:bg-zinc-50 transition-colors">
                  + {label}
                </button>
              ))}
            </div>
          </div>

          {/* İçerik hakkında */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <h3 className="font-black text-zinc-900 text-sm mb-3">İçerik Hakkında</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              İçerik boş bırakılırsa sayfada otomatik şablon kullanılır.
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed mt-2">
              <strong>"Şablondan Başla"</strong> butonu şablonu editöre aktarır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
