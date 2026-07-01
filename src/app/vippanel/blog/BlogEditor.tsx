"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

type FaqEntry = { q: string; a: string };

type BlogData = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  coverImage: string;
  keywords: string[];
  content: string;
  faqs: FaqEntry[];
};

const DEFAULT_CATEGORIES = [
  "Tamir Rehberi",
  "Arıza Rehberi",
  "iPhone Sorunları",
  "Acil Rehber",
  "Hizmet Rehberi",
];

async function compressImage(file: File, maxSizeBytes = 5 * 1024 * 1024): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      const MAX_DIM = 1920;
      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        if (width > height) { height = Math.round((height * MAX_DIM) / width); width = MAX_DIM; }
        else { width = Math.round((width * MAX_DIM) / height); height = MAX_DIM; }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);

      let quality = 0.85;
      const tryCompress = () => {
        canvas.toBlob((blob) => {
          if (!blob) { resolve(file); return; }
          if (blob.size <= maxSizeBytes || quality <= 0.3) {
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" }));
          } else {
            quality -= 0.1;
            tryCompress();
          }
        }, "image/jpeg", quality);
      };
      tryCompress();
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseKeywords(s: string): string[] {
  return s.split(",").map((k) => k.trim()).filter(Boolean);
}

function simpleMarkdownPreview(md: string): string {
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lines = escaped.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const rawLine of lines) {
    let line = rawLine
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code style='background:#f4f4f5;padding:1px 4px;border-radius:3px;font-family:monospace;font-size:0.85em'>$1</code>")
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "<img src='$2' alt='$1' style='max-width:100%;border-radius:8px;margin:4px 0'>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' style='color:#ff351b;text-decoration:underline'>$1</a>");

    if (/^### /.test(line)) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h3 style='font-size:1.1em;font-weight:900;margin:1.2em 0 0.4em'>${line.slice(4)}</h3>`);
    } else if (/^## /.test(line)) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h2 style='font-size:1.3em;font-weight:900;margin:1.5em 0 0.5em'>${line.slice(3)}</h2>`);
    } else if (/^# /.test(line)) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h1 style='font-size:1.6em;font-weight:900;margin:1.5em 0 0.5em'>${line.slice(2)}</h1>`);
    } else if (/^[-*] /.test(line)) {
      if (!inList) { html.push("<ul style='padding-left:1.5em;margin:0.5em 0'>"); inList = true; }
      html.push(`<li style='margin:0.25em 0'>${line.slice(2)}</li>`);
    } else if (/^\d+\. /.test(line)) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<li style='margin:0.25em 0'>${line.replace(/^\d+\. /, "")}</li>`);
    } else if (/^&gt; /.test(line)) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<blockquote style='border-left:3px solid #ff351b;padding:0.5em 1em;margin:0.5em 0;color:#666;font-style:italic'>${line.slice(5)}</blockquote>`);
    } else if (line.trim() === "") {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push("<br>");
    } else {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<p style='margin:0.5em 0;line-height:1.7'>${line}</p>`);
    }
  }
  if (inList) html.push("</ul>");
  return html.join("\n");
}

type Props = {
  mode: "new" | "edit";
  initialData?: Partial<BlogData>;
};

export function BlogEditor({ mode, initialData }: Props) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState<"yaz" | "onizle" | "seo">("yaz");
  const [slugManual, setSlugManual] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState("");
  const [imageSearchQuery, setImageSearchQuery] = useState("");
  const [imageSearchResults, setImageSearchResults] = useState<{ url: string; thumb: string; title: string; source: string }[]>([]);
  const [imageSearching, setImageSearching] = useState(false);
  const [imageSearchError, setImageSearchError] = useState("");
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [newCat, setNewCat] = useState("");
  const [addingCat, setAddingCat] = useState(false);

  useEffect(() => {
    if (initialData?.title) {
      setImageSearchQuery(initialData.title);
      fetch(`/api/vippanel/image-search?q=${encodeURIComponent(initialData.title)}`)
        .then((r) => r.json())
        .then((json) => {
          if (json.images) setImageSearchResults(json.images);
        });
    }
  }, [initialData?.title]);

  useEffect(() => {
    fetch("/api/vippanel/categories")
      .then((r) => r.json())
      .then((list: string[]) => {
        const merged = [...list];
        if (initialData?.category && !merged.includes(initialData.category)) {
          merged.push(initialData.category);
        }
        setCategories(merged);
      });
  }, [initialData?.category]);

  async function saveCategories(list: string[]) {
    await fetch("/api/vippanel/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    });
  }

  const [data, setData] = useState<BlogData>({
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    publishedAt: initialData?.publishedAt ?? new Date().toISOString().slice(0, 10),
    category: initialData?.category ?? DEFAULT_CATEGORIES[0],
    coverImage: initialData?.coverImage ?? "",
    keywords: initialData?.keywords ?? [],
    content: initialData?.content ?? "",
    faqs: (initialData as { faqs?: FaqEntry[] })?.faqs ?? [],
  });

  const keywordsStr = data.keywords.join(", ");

  function updateTitle(title: string) {
    setData((prev) => ({
      ...prev,
      title,
      slug: slugManual ? prev.slug : slugify(title),
    }));
  }

  const insertMarkdown = useCallback((before: string, after = "", placeholder = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.slice(start, end) || placeholder;
    const newVal = ta.value.slice(0, start) + before + selected + after + ta.value.slice(end);
    setData((prev) => ({ ...prev, content: newVal }));
    setTimeout(() => {
      ta.focus();
      const cur = start + before.length + selected.length;
      ta.setSelectionRange(cur, cur);
    }, 0);
  }, []);

  function insertLine(prefix: string) {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = ta.value.lastIndexOf("\n", start - 1) + 1;
    const newVal = ta.value.slice(0, lineStart) + prefix + ta.value.slice(lineStart);
    setData((prev) => ({ ...prev, content: newVal }));
    setTimeout(() => {
      ta.focus();
      const cur = lineStart + prefix.length;
      ta.setSelectionRange(cur, cur);
    }, 0);
  }

  async function handleImageSearch() {
    if (!imageSearchQuery.trim()) return;
    setImageSearching(true);
    setImageSearchError("");
    setImageSearchResults([]);
    const res = await fetch(`/api/vippanel/image-search?q=${encodeURIComponent(imageSearchQuery)}`);
    const json = await res.json();
    setImageSearching(false);
    if (json.images) {
      setImageSearchResults(json.images);
    } else {
      setImageSearchError(json.error ?? "Arama başarısız");
    }
  }

  async function handleSelectSearchImage(imageUrl: string) {
    setUploadingImage(true);
    setCoverUploadError("");
    try {
      const proxyRes = await fetch(`/api/vippanel/image-proxy?url=${encodeURIComponent(imageUrl)}`);
      if (!proxyRes.ok) throw new Error("İndirme başarısız");
      const blob = await proxyRes.blob();
      const file = new File([blob], "gorsel.jpg", { type: blob.type || "image/jpeg" });
      const compressed = await compressImage(file);
      const fd = new FormData();
      fd.append("file", compressed);
      if (data.slug) fd.append("filename", `${data.slug}-kapak`);
      const uploadRes = await fetch("/api/vippanel/upload", { method: "POST", body: fd });
      const uploadJson = await uploadRes.json();
      if (uploadJson.url) {
        setData((prev) => ({ ...prev, coverImage: uploadJson.url }));
        setImageSearchResults([]);
        setImageSearchQuery("");
      } else {
        setCoverUploadError(uploadJson.error ?? "Yükleme başarısız");
      }
    } catch {
      setCoverUploadError("Görsel indirilemedi");
    }
    setUploadingImage(false);
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setCoverUploadError("");
    const compressed = await compressImage(file);
    const fd = new FormData();
    fd.append("file", compressed);
    if (data.slug) fd.append("filename", `${data.slug}-kapak`);
    const res = await fetch("/api/vippanel/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploadingImage(false);
    if (json.url) {
      setData((prev) => ({ ...prev, coverImage: json.url }));
    } else {
      setCoverUploadError(json.error ?? "Yükleme başarısız");
    }
    e.target.value = "";
  }

  async function handleContentImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    const fd = new FormData();
    fd.append("file", compressed);
    const baseName = file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const seoName = data.slug ? `${data.slug}-${baseName}` : baseName;
    fd.append("filename", seoName);
    const res = await fetch("/api/vippanel/upload", { method: "POST", body: fd });
    const json = await res.json();
    const altText = data.title || file.name;
    if (json.url) insertMarkdown(`![${altText}](`, ")", altText);
    e.target.value = "";
  }

  async function handleSave() {
    setSaving(true);
    setError("");

    const payload = { ...data, keywords: parseKeywords(keywordsStr) };

    const url = mode === "edit" ? `/api/vippanel/blog/${data.slug}` : "/api/vippanel/blog";
    const method = mode === "edit" ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      router.push("/vippanel/blog");
      router.refresh();
    } else {
      const json = await res.json();
      setError(json.error ?? "Kayıt başarısız");
    }
  }

  const titleLen = data.title.length;
  const descLen = data.description.length;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.push("/vippanel/blog")} className="text-zinc-400 hover:text-zinc-600 transition-colors">
          ← Geri
        </button>
        <h1 className="text-2xl font-black text-zinc-900">
          {mode === "new" ? "Yeni Blog Yazısı" : "Blog Yazısını Düzenle"}
        </h1>
        <div className="ml-auto flex items-center gap-3">
          {error && <span className="text-sm text-red-600 font-bold">{error}</span>}
          <button
            onClick={handleSave}
            disabled={saving || !data.title || !data.slug}
            className="px-5 py-2.5 rounded-lg text-white text-sm font-black transition disabled:opacity-50"
            style={{ background: "#ff351b" }}
          >
            {saving ? "Kaydediliyor..." : mode === "new" ? "Yayımla" : "Güncelle"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main editor column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <input
              value={data.title}
              onChange={(e) => updateTitle(e.target.value)}
              placeholder="Yazı başlığı..."
              className="w-full text-xl font-black text-zinc-900 border-none outline-none placeholder:text-zinc-300"
            />
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-100">
              <span className="text-xs text-zinc-400 font-medium">Slug:</span>
              <input
                value={data.slug}
                onChange={(e) => { setSlugManual(true); setData((prev) => ({ ...prev, slug: e.target.value })); }}
                placeholder="url-kisa-adi"
                className="flex-1 text-xs font-mono text-zinc-600 border-none outline-none bg-zinc-50 px-2 py-1 rounded"
              />
            </div>
          </div>

          {/* Editor tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
            {/* Tab header */}
            <div className="flex items-center border-b border-zinc-100 px-4">
              {(["yaz", "onizle", "seo"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-3 text-xs font-black uppercase tracking-wide border-b-2 transition-colors"
                  style={{
                    borderColor: activeTab === tab ? "#ff351b" : "transparent",
                    color: activeTab === tab ? "#ff351b" : "#71717a",
                  }}
                >
                  {tab === "yaz" ? "Yaz" : tab === "onizle" ? "Önizle" : "SEO"}
                </button>
              ))}

              {activeTab === "yaz" && (
                <div className="ml-auto flex items-center gap-0.5">
                  <label className="cursor-pointer" title="Resim ekle">
                    <input type="file" accept="image/*" className="hidden" onChange={handleContentImageUpload} />
                    <ToolBtn title="🖼">Resim</ToolBtn>
                  </label>
                </div>
              )}
            </div>

            {/* Toolbar (yaz tab only) */}
            {activeTab === "yaz" && (
              <div className="flex flex-wrap gap-0.5 px-3 py-2 border-b border-zinc-50 bg-zinc-50">
                <ToolBtn onClick={() => insertMarkdown("**", "**", "kalın metin")} title="Kalın">B</ToolBtn>
                <ToolBtn onClick={() => insertMarkdown("*", "*", "italik metin")} title="İtalik"><em>I</em></ToolBtn>
                <Sep />
                <ToolBtn onClick={() => insertLine("## ")} title="H2">H2</ToolBtn>
                <ToolBtn onClick={() => insertLine("### ")} title="H3">H3</ToolBtn>
                <Sep />
                <ToolBtn onClick={() => insertLine("- ")} title="Liste">• •</ToolBtn>
                <ToolBtn onClick={() => insertLine("1. ")} title="Sıralı Liste">1.</ToolBtn>
                <ToolBtn onClick={() => insertLine("> ")} title="Alıntı">"</ToolBtn>
                <Sep />
                <ToolBtn onClick={() => insertMarkdown("[", "](url)", "bağlantı metni")} title="Link">🔗</ToolBtn>
                <ToolBtn onClick={() => insertMarkdown("`", "`", "kod")} title="Kod">{"`"}</ToolBtn>
                <ToolBtn onClick={() => insertMarkdown("\n```\n", "\n```\n", "kod bloğu")} title="Kod Bloğu">{"<>"}</ToolBtn>
              </div>
            )}

            {/* Content area */}
            {activeTab === "yaz" && (
              <textarea
                ref={textareaRef}
                value={data.content}
                onChange={(e) => setData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Yazı içeriğini Markdown formatında girin..."
                style={{ minHeight: "420px", resize: "vertical", fontFamily: "monospace", fontSize: "0.875rem", outline: "none", padding: "16px" }}
                className="w-full border-none text-zinc-800 leading-relaxed"
              />
            )}

            {activeTab === "onizle" && (
              <div
                className="p-6 text-zinc-800 leading-relaxed"
                style={{ minHeight: "420px", fontSize: "0.9rem" }}
                dangerouslySetInnerHTML={{ __html: data.content ? simpleMarkdownPreview(data.content) : '<p style="color:#a1a1aa">Önizlenecek içerik yok.</p>' }}
              />
            )}

            {activeTab === "seo" && (
              <div className="p-6 space-y-5">
                {/* Google Preview */}
                <div>
                  <p className="text-xs font-black text-zinc-600 uppercase tracking-wide mb-3">Google Önizlemesi</p>
                  <div className="border border-zinc-200 rounded-lg p-4 bg-white">
                    <p className="text-xs text-green-700 mb-0.5">vipiletisim.com.tr/blog/{data.slug || "slug"}</p>
                    <p className="text-[17px] font-medium text-blue-700 hover:underline cursor-pointer line-clamp-1">
                      {data.title || "Sayfa Başlığı"} | Trabzon Vip İletişim
                    </p>
                    <p className="text-sm text-zinc-600 mt-0.5 line-clamp-2">
                      {data.description || "Meta açıklama buraya gelecek..."}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-zinc-600">Meta Başlık</label>
                    <span className={`text-xs font-bold ${titleLen > 60 ? "text-red-500" : titleLen > 50 ? "text-amber-500" : "text-green-600"}`}>
                      {titleLen}/60
                    </span>
                  </div>
                  <input value={data.title} onChange={(e) => updateTitle(e.target.value)} className="input" placeholder="Başlık (50-60 karakter ideal)" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-zinc-600">Meta Açıklama</label>
                    <span className={`text-xs font-bold ${descLen > 160 ? "text-red-500" : descLen > 140 ? "text-amber-500" : descLen > 100 ? "text-green-600" : "text-zinc-400"}`}>
                      {descLen}/160
                    </span>
                  </div>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="input"
                    placeholder="Açıklama (120-160 karakter ideal)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1">Anahtar Kelimeler <span className="font-normal text-zinc-400">(virgülle ayrılmış)</span></label>
                  <input
                    value={keywordsStr}
                    onChange={(e) => setData((prev) => ({ ...prev, keywords: parseKeywords(e.target.value) }))}
                    className="input"
                    placeholder="trabzon iphone tamir, ekran değişimi trabzon..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish settings */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <h3 className="text-xs font-black text-zinc-700 uppercase tracking-wide mb-4">Yayın Ayarları</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Yayın Tarihi</label>
                <input type="date" value={data.publishedAt}
                  onChange={(e) => setData((prev) => ({ ...prev, publishedAt: e.target.value }))}
                  className="input" />
                <p className="text-xs text-zinc-400 mt-1">Bugünden sonraki tarih = taslak</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Kategori</label>
                {addingCat ? (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      value={newCat}
                      onChange={(e) => setNewCat(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const cat = newCat.trim();
                          if (cat) {
                            const updated = categories.includes(cat) ? categories : [...categories, cat];
                            setCategories(updated);
                            saveCategories(updated);
                            setData((prev) => ({ ...prev, category: cat }));
                          }
                          setNewCat(""); setAddingCat(false);
                        }
                        if (e.key === "Escape") { setNewCat(""); setAddingCat(false); }
                      }}
                      placeholder="Kategori adı yaz, Enter ile ekle"
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const cat = newCat.trim();
                        if (cat) {
                          const updated = categories.includes(cat) ? categories : [...categories, cat];
                          setCategories(updated);
                          saveCategories(updated);
                          setData((prev) => ({ ...prev, category: cat }));
                        }
                        setNewCat(""); setAddingCat(false);
                      }}
                      className="px-3 py-2 text-xs font-black text-white rounded-lg"
                      style={{ background: "#ff351b" }}
                    >Ekle</button>
                    <button
                      type="button"
                      onClick={() => { setNewCat(""); setAddingCat(false); }}
                      className="px-3 py-2 text-xs font-bold bg-zinc-100 text-zinc-600 rounded-lg"
                    >İptal</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <select value={data.category}
                      onChange={(e) => setData((prev) => ({ ...prev, category: e.target.value }))}
                      className="input flex-1">
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => setAddingCat(true)}
                      className="px-3 py-2 text-xs font-bold bg-zinc-100 text-zinc-600 rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap"
                    >+ Yeni</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <h3 className="text-xs font-black text-zinc-700 uppercase tracking-wide mb-4">Kapak Görseli</h3>
            {data.coverImage && (
              <div className="mb-3 rounded-lg overflow-hidden border border-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.coverImage} alt="Kapak" className="w-full h-40 object-cover" />
              </div>
            )}
            <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-zinc-200 rounded-lg text-sm text-zinc-500 font-medium cursor-pointer hover:border-zinc-400 transition-colors">
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              {uploadingImage ? "Yükleniyor..." : "Görsel Yükle"}
            </label>
            {coverUploadError && (
              <p className="text-xs text-red-600 font-bold mt-1">{coverUploadError}</p>
            )}
            <div className="mt-3">
              <label className="block text-xs font-bold text-zinc-600 mb-1">veya URL gir</label>
              <input value={data.coverImage}
                onChange={(e) => setData((prev) => ({ ...prev, coverImage: e.target.value }))}
                className="input" placeholder="/images/blog/kapak.webp" />
            </div>

            {/* Görsel Arama */}
            <div className="mt-3 pt-3 border-t border-zinc-100">
              <label className="block text-xs font-bold text-zinc-600 mb-1">veya Google'da ara</label>
              <div className="flex gap-2">
                <input
                  value={imageSearchQuery}
                  onChange={(e) => setImageSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleImageSearch()}
                  placeholder="samsung ekran değişimi..."
                  className="input flex-1"
                />
                <button
                  type="button"
                  onClick={handleImageSearch}
                  disabled={imageSearching || !imageSearchQuery.trim()}
                  className="px-3 py-2 text-xs font-black text-white rounded-lg disabled:opacity-50 whitespace-nowrap"
                  style={{ background: "#ff351b" }}
                >
                  {imageSearching ? "..." : "Ara"}
                </button>
              </div>
              {imageSearchError && (
                <p className="text-xs text-red-600 font-bold mt-1">{imageSearchError}</p>
              )}
              {imageSearchResults.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto">
                  {imageSearchResults.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectSearchImage(img.url)}
                      disabled={uploadingImage}
                      className="relative rounded-lg overflow-hidden border-2 border-transparent hover:border-[#ff351b] transition-all group"
                      title={img.title as string}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.thumb} alt={img.title as string} className="w-full h-20 object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <h3 className="text-xs font-black text-zinc-700 uppercase tracking-wide mb-4">Özet / Meta Açıklama</h3>
            <textarea
              value={data.description}
              onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="input"
              placeholder="Kısa açıklama (120-160 karakter)"
            />
            <p className="text-xs text-zinc-400 mt-1 text-right">{data.description.length}/160</p>
          </div>

          {/* SSS Editörü */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-zinc-700 uppercase tracking-wide">Sıkça Sorulan Sorular</h3>
              <button
                type="button"
                onClick={() => setData((prev) => ({ ...prev, faqs: [...prev.faqs, { q: "", a: "" }] }))}
                className="text-xs font-black text-brand hover:underline"
              >
                + Soru Ekle
              </button>
            </div>
            {data.faqs.length === 0 && (
              <p className="text-xs text-zinc-400">SSS ekleyerek Google&apos;da featured snippet fırsatı yaratın.</p>
            )}
            <div className="space-y-3">
              {data.faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-zinc-400">SORU {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => setData((prev) => ({ ...prev, faqs: prev.faqs.filter((_, idx) => idx !== i) }))}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      Sil
                    </button>
                  </div>
                  <input
                    value={faq.q}
                    onChange={(e) => {
                      const arr = [...data.faqs]; arr[i] = { ...arr[i], q: e.target.value };
                      setData((prev) => ({ ...prev, faqs: arr }));
                    }}
                    placeholder="Soru metni..."
                    className="input w-full text-[13px]"
                  />
                  <textarea
                    value={faq.a}
                    onChange={(e) => {
                      const arr = [...data.faqs]; arr[i] = { ...arr[i], a: e.target.value };
                      setData((prev) => ({ ...prev, faqs: arr }));
                    }}
                    placeholder="Cevap metni..."
                    rows={3}
                    className="input w-full resize-none text-[13px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolBtn({ onClick, title, children }: { onClick?: () => void; title?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="px-2.5 py-1 text-xs font-bold text-zinc-600 hover:bg-zinc-100 rounded transition-colors"
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="w-px h-5 bg-zinc-200 mx-0.5 self-center" />;
}
