"use client";

import { useEffect, useState } from "react";

type NavChild = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  icon?: boolean;
  hasDropdown?: boolean;
  children?: NavChild[];
};

function emptyItem(): NavItem {
  return { label: "", href: "" };
}

export default function NavigasyonPage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/vippanel/nav")
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); });
  }, []);

  function move(index: number, dir: -1 | 1) {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  }

  function updateItem(index: number, patch: Partial<NavItem>) {
    setItems((prev) => prev.map((item, i) => i === index ? { ...item, ...patch } : item));
  }

  function removeItem(index: number) {
    if (!confirm("Bu menü öğesini silmek istiyor musunuz?")) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem()]);
    setExpandedIndex(items.length);
  }

  function updateChild(itemIndex: number, childIndex: number, patch: Partial<NavChild>) {
    setItems((prev) => prev.map((item, i) => {
      if (i !== itemIndex) return item;
      const children = (item.children ?? []).map((c, ci) =>
        ci === childIndex ? { ...c, ...patch } : c
      );
      return { ...item, children };
    }));
  }

  function addChild(itemIndex: number) {
    setItems((prev) => prev.map((item, i) => {
      if (i !== itemIndex) return item;
      return { ...item, hasDropdown: true, children: [...(item.children ?? []), { label: "", href: "" }] };
    }));
  }

  function removeChild(itemIndex: number, childIndex: number) {
    setItems((prev) => prev.map((item, i) => {
      if (i !== itemIndex) return item;
      const children = (item.children ?? []).filter((_, ci) => ci !== childIndex);
      return { ...item, children, hasDropdown: children.length > 0 };
    }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/vippanel/nav", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return <div className="p-8 pt-16 md:pt-8 text-zinc-400 font-bold">Yükleniyor...</div>;

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-zinc-900">Navigasyon Menüsü</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-black disabled:opacity-50 transition-opacity"
          style={{ background: "#ff351b" }}
        >
          {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div key={index} className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              {/* Row */}
              <div className="flex items-center gap-2 p-3">
                {/* Sıra butonları */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 disabled:opacity-20 transition-colors text-xs"
                    title="Yukarı"
                  >▲</button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 disabled:opacity-20 transition-colors text-xs"
                    title="Aşağı"
                  >▼</button>
                </div>

                {/* Label */}
                <input
                  value={item.label}
                  onChange={(e) => updateItem(index, { label: e.target.value })}
                  placeholder="Menü Adı"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-zinc-200 text-sm font-bold text-zinc-800 outline-none focus:border-zinc-400 bg-zinc-50"
                />

                {/* Href */}
                <input
                  value={item.href}
                  onChange={(e) => updateItem(index, { href: e.target.value })}
                  placeholder="/sayfa-url"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-zinc-200 text-sm font-mono text-zinc-600 outline-none focus:border-zinc-400 bg-zinc-50"
                />

                {/* Genişlet butonu */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="px-2.5 py-2 rounded-lg text-xs font-black border border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-800 transition-colors shrink-0"
                  title="Detaylar"
                >
                  {isExpanded ? "▲" : "▼"} Detay
                </button>

                {/* Sil */}
                <button
                  onClick={() => removeItem(index)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 text-lg font-black"
                  title="Sil"
                >×</button>
              </div>

              {/* Detay paneli */}
              {isExpanded && (
                <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-4 space-y-4">
                  {/* Icon toggle */}
                  <label className="flex items-center gap-2.5 cursor-pointer w-fit">
                    <span
                      onClick={() => updateItem(index, { icon: !item.icon })}
                      className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 cursor-pointer ${item.icon ? "bg-[#ff351b]" : "bg-zinc-300"}`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${item.icon ? "translate-x-4" : ""}`} />
                    </span>
                    <span className="text-sm font-bold text-zinc-700">Tamir İkonu Göster (🔧)</span>
                  </label>

                  {/* Alt menü (dropdown children) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Alt Menü Öğeleri</p>
                      <button
                        onClick={() => addChild(index)}
                        className="text-xs font-black text-[#ff351b] hover:underline"
                      >+ Alt Öğe Ekle</button>
                    </div>
                    {(!item.children || item.children.length === 0) ? (
                      <p className="text-xs text-zinc-400 font-medium">Alt menü yok — eklemek için "Alt Öğe Ekle"ye tıklayın.</p>
                    ) : (
                      <div className="space-y-2">
                        {item.children.map((child, ci) => (
                          <div key={ci} className="flex items-center gap-2">
                            <input
                              value={child.label}
                              onChange={(e) => updateChild(index, ci, { label: e.target.value })}
                              placeholder="Alt Menü Adı"
                              className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 text-sm font-bold text-zinc-800 outline-none focus:border-zinc-400 bg-white"
                            />
                            <input
                              value={child.href}
                              onChange={(e) => updateChild(index, ci, { href: e.target.value })}
                              placeholder="/alt-sayfa-url"
                              className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 text-sm font-mono text-zinc-600 outline-none focus:border-zinc-400 bg-white"
                            />
                            <button
                              onClick={() => removeChild(index, ci)}
                              className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors text-lg font-black shrink-0"
                            >×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Yeni öğe ekle */}
      <button
        onClick={addItem}
        className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-zinc-300 text-sm font-black text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 transition-colors"
      >
        + Yeni Menü Öğesi Ekle
      </button>

      <p className="mt-4 text-xs text-zinc-400 font-medium">
        Değişiklikleri kaydetmek için sağ üstteki "Kaydet" butonuna basın. Sitenin header'ı otomatik güncellenir.
      </p>
    </div>
  );
}
