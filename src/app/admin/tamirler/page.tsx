"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { services, repairTypeList } from "@/data/services";
import type { CustomDevice } from "@/lib/custom-services";
import { buildSchedule, fmtDate, defaultStartDate, type ScheduleResult } from "@/lib/schedule-utils";

type PopularService = {
  slug: string;
  customTitle: string;
  customDescription: string;
  customIntro: string;
};

type RepairItem = {
  slug: string;
  title: string;
  publishedAt: string;
  hasContent: boolean;
  isDraft: boolean;
};

const BRANDS = [
  { value: "", label: "Tüm Markalar" },
  { value: "iphone", label: "iPhone" },
  { value: "samsung", label: "Samsung" },
  { value: "xiaomi", label: "Xiaomi" },
];

const REPAIRS = repairTypeList.map((r) => ({ value: r.key, label: r.label }));

function slugify(text: string): string {
  return text
    .replace(/\+/g, " Plus").toLowerCase()
    .replace(/ı/g, "i").replace(/İ/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/\./g, "").replace(/[^a-z0-9\s-]/g, "").trim()
    .replace(/\s+/g, "-").replace(/-+/g, "-");
}

function makeCustomSlug(model: string, repairKey: string) {
  return `${slugify(model)}-${repairKey}`;
}

function deviceTimestamp(device: CustomDevice): number {
  return parseInt(device.id.replace("custom-", "")) || 0;
}

export default function TamirlerPage() {
  const searchParams = useSearchParams();
  const [popularList, setPopularList] = useState<PopularService[]>([]);
  const [customDevices, setCustomDevices] = useState<CustomDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [repairFilter, setRepairFilter] = useState("");
  const initialTab = searchParams.get("tab") === "zamanlama" ? "zamanlama" : "populer";
  const [activeTab, setActiveTab] = useState<"populer" | "tumü" | "zamanlama">(initialTab);

  // Inline device editing
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [editRepairKeys, setEditRepairKeys] = useState<string[]>([]);

  // Zamanlama state
  const [repairItems, setRepairItems] = useState<RepairItem[]>([]);
  const [schedLoading, setSchedLoading] = useState(false);
  const [schedSelected, setSchedSelected] = useState<Set<string>>(new Set());
  const [schedSelMode, setSchedSelMode] = useState<"drafts" | "all" | "manual">("drafts");
  const [schedStartDate, setSchedStartDate] = useState(defaultStartDate);
  const [schedStartHour, setSchedStartHour] = useState(9);
  const [schedEndHour, setSchedEndHour] = useState(18);
  const [schedDays, setSchedDays] = useState([true, true, true, true, true, false, false]);
  const [schedMode, setSchedMode] = useState<"daily" | "interval">("daily");
  const [schedPerDay, setSchedPerDay] = useState(3);
  const [schedInterval, setSchedInterval] = useState(4);
  const [schedPreview, setSchedPreview] = useState<ScheduleResult[]>([]);
  const [schedShowPreview, setSchedShowPreview] = useState(false);
  const [schedApplying, setSchedApplying] = useState(false);
  const [schedMsg, setSchedMsg] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/popular-services").then((r) => r.json()),
      fetch("/api/admin/custom-devices").then((r) => r.json()),
    ]).then(([popular, custom]) => {
      setPopularList(popular);
      setCustomDevices(custom);
      setLoading(false);
    });
  }, []);

  function flash(msg: string) {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(""), 2500);
  }

  async function deleteRepairPage(slug: string) {
    if (!confirm("Bu taslak içerik sayfası silinsin mi?")) return;
    await fetch(`/api/admin/repair-page/${slug}`, { method: "DELETE" });
    setRepairItems((prev) => prev.filter((i) => i.slug !== slug));
    setSchedSelected((prev) => { const n = new Set(prev); n.delete(slug); return n; });
    setSchedShowPreview(false);
  }

  async function deleteSelected() {
    if (schedSelected.size === 0) return;
    if (!confirm(`Seçili ${schedSelected.size} sayfa silinsin mi?`)) return;
    const slugs = [...schedSelected];
    await Promise.all(slugs.map((s) => fetch(`/api/admin/repair-page/${s}`, { method: "DELETE" })));
    setRepairItems((prev) => prev.filter((i) => !schedSelected.has(i.slug)));
    setSchedSelected(new Set());
    setSchedShowPreview(false);
  }

  async function savePopular(list: PopularService[]) {
    setSaving(true);
    await fetch("/api/admin/popular-services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(list) });
    setSaving(false);
    flash("✓ Kaydedildi");
  }

  async function saveCustomDevices(devices: CustomDevice[]) {
    setSaving(true);
    await fetch("/api/admin/custom-devices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(devices) });
    setSaving(false);
  }

  async function deleteCustomDevice(id: string) {
    if (!confirm("Bu cihazı ve tüm tamir sayfalarını silmek istediğinizden emin misiniz?")) return;
    const updated = customDevices.filter((d) => d.id !== id);
    setCustomDevices(updated);
    await saveCustomDevices(updated);
    flash("✓ Cihaz silindi");
  }

  function startEditDevice(device: CustomDevice) {
    setEditingDeviceId(device.id);
    setEditRepairKeys([...device.repairKeys]);
  }

  async function saveDeviceRepairs(deviceId: string) {
    const updated = customDevices.map((d) =>
      d.id === deviceId ? { ...d, repairKeys: editRepairKeys } : d
    );
    setCustomDevices(updated);
    await saveCustomDevices(updated);
    setEditingDeviceId(null);
    flash("✓ Tamir türleri güncellendi");
  }

  function togglePopular(slug: string) {
    const updated = popularSlugs.has(slug)
      ? popularList.filter((p) => p.slug !== slug)
      : [...popularList, { slug, customTitle: "", customDescription: "", customIntro: "" }];
    setPopularList(updated);
    savePopular(updated);
  }

  const popularSlugs = useMemo(() => new Set(popularList.map((p) => p.slug)), [popularList]);

  // Custom devices sorted newest first
  const sortedCustomDevices = useMemo(
    () => [...customDevices].sort((a, b) => deviceTimestamp(b) - deviceTimestamp(a)),
    [customDevices]
  );

  // Custom services flat list (newest device first)
  const customServices = useMemo(() =>
    sortedCustomDevices.flatMap((device) =>
      device.repairKeys.map((repairKey) => {
        const rt = repairTypeList.find((r) => r.key === repairKey);
        return {
          slug: makeCustomSlug(device.model, repairKey),
          title: `${device.model} ${rt?.label ?? repairKey.replace(/-/g, " ")}`,
          brand: device.brandKey as "iphone" | "samsung" | "xiaomi",
          repairKey,
          model: device.model,
          deviceId: device.id,
          isCustom: true,
        };
      })
    ),
    [sortedCustomDevices]
  );

  const filteredServices = useMemo(() => {
    const all = [
      ...customServices,
      ...services.map((s) => ({ ...s, isCustom: false, deviceId: "" })),
    ];
    return all.filter((s) => {
      if (brandFilter && s.brand !== brandFilter) return false;
      if (repairFilter && s.repairKey !== repairFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!s.title.toLowerCase().includes(q) && !s.slug.includes(q)) return false;
      }
      return true;
    });
  }, [search, brandFilter, repairFilter, customServices]);

  // Zamanlama: load when tab opens
  useEffect(() => {
    if (activeTab !== "zamanlama" || repairItems.length > 0) return;
    setSchedLoading(true);
    fetch("/api/admin/zamanlama/tamir")
      .then((r) => r.json())
      .then((data: RepairItem[]) => {
        setRepairItems(data);
        setSchedSelected(new Set(data.filter((i) => i.isDraft || !i.publishedAt).map((i) => i.slug)));
        setSchedLoading(false);
      });
  }, [activeTab, repairItems.length]);

  useEffect(() => {
    if (repairItems.length === 0) return;
    if (schedSelMode === "drafts") setSchedSelected(new Set(repairItems.filter((i) => i.isDraft || !i.publishedAt).map((i) => i.slug)));
    else if (schedSelMode === "all") setSchedSelected(new Set(repairItems.map((i) => i.slug)));
  }, [schedSelMode, repairItems]);

  // Group repairItems by device (custom first, newest first; then hardcoded by model)
  const groupedRepairItems = useMemo(() => {
    const groups: { model: string; isCustom: boolean; items: RepairItem[] }[] = [];

    // Custom devices in order (newest first)
    for (const device of sortedCustomDevices) {
      const deviceItems: RepairItem[] = [];
      for (const rk of device.repairKeys) {
        const slug = makeCustomSlug(device.model, rk);
        const item = repairItems.find((i) => i.slug === slug);
        if (item) deviceItems.push(item);
      }
      if (deviceItems.length > 0) {
        groups.push({ model: device.model, isCustom: true, items: deviceItems });
      }
    }

    // Hardcoded services grouped by model
    const customSlugs = new Set(customServices.map((s) => s.slug));
    const hardcoded = repairItems.filter((i) => !customSlugs.has(i.slug));
    const hardcodedByModel = new Map<string, RepairItem[]>();
    for (const item of hardcoded) {
      const svc = services.find((s) => s.slug === item.slug);
      const model = svc?.model ?? "Diğer";
      if (!hardcodedByModel.has(model)) hardcodedByModel.set(model, []);
      hardcodedByModel.get(model)!.push(item);
    }
    for (const [model, items] of hardcodedByModel) {
      groups.push({ model, isCustom: false, items });
    }

    return groups;
  }, [repairItems, sortedCustomDevices, customServices]);

  // Flat ordered list for buildSchedule (device-grouped order)
  const schedSelectedItems = useMemo(() => {
    const ordered: RepairItem[] = [];
    for (const group of groupedRepairItems) {
      for (const item of group.items) {
        if (schedSelected.has(item.slug)) ordered.push(item);
      }
    }
    return ordered;
  }, [groupedRepairItems, schedSelected]);

  function calcSchedPreview() {
    const res = buildSchedule(schedSelectedItems, {
      startDate: schedStartDate, startHour: schedStartHour, endHour: schedEndHour,
      activeDays: schedDays, mode: schedMode, postsPerDay: schedPerDay, intervalHours: schedInterval,
    });
    setSchedPreview(res);
    setSchedShowPreview(true);
  }

  async function applyRepairSchedule() {
    setSchedApplying(true);
    const res = await fetch("/api/admin/zamanlama/tamir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(schedPreview.map((r) => ({ slug: r.slug, publishedAt: r.newDate }))),
    });
    const json = await res.json();
    setSchedApplying(false);
    setSchedShowPreview(false);
    setSchedMsg(`✓ ${json.updated} sayfanın tarihi güncellendi`);
    setTimeout(() => setSchedMsg(""), 4000);
    setRepairItems([]);
  }

  if (loading) return <div className="p-8 pt-16 md:pt-8 text-sm text-zinc-400">Yükleniyor...</div>;

  const totalCustomServices = customDevices.reduce((a, d) => a + d.repairKeys.length, 0);

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Tamir Sayfaları</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {services.length} hazır · {totalCustomServices} özel · {popularList.length} popüler
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && <span className="text-sm font-bold text-green-600">{savedMsg}</span>}
          {saving && <span className="text-sm text-zinc-400">Kaydediliyor...</span>}
          <Link href="/admin/tamirler/yeni-cihaz" className="px-4 py-2.5 rounded-lg text-white text-sm font-black flex items-center gap-2" style={{ background: "#ff351b" }}>
            + Yeni Cihaz Ekle
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 border-b border-zinc-200 flex-wrap">
        {([
          ["populer", `Popüler Liste (${popularList.length})`],
          ["tumü", `Tüm Sayfalar (${services.length + totalCustomServices})`],
          ["zamanlama", "Zamanlama"],
        ] as const).map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className="px-5 py-2.5 text-sm font-black border-b-2 transition-colors -mb-px"
            style={{ borderColor: activeTab === key ? "#ff351b" : "transparent", color: activeTab === key ? "#ff351b" : "#71717a" }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Popüler Listesi ── */}
      {activeTab === "populer" && (
        <div className="max-w-3xl">
          {popularList.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <p className="text-3xl mb-3">📋</p>
              <p className="font-bold">Popüler liste boş.</p>
              <p className="text-sm mt-1">"Tüm Sayfalar" sekmesinden ekleyebilirsiniz.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {popularList.map((item, i) => {
                const svc = services.find((s) => s.slug === item.slug);
                return (
                  <div key={item.slug} className="bg-white rounded-xl border border-zinc-100 shadow-sm flex items-center gap-3 px-4 py-3">
                    <span className="text-xs font-black text-zinc-400 w-5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-zinc-900 truncate">{item.customTitle || svc?.title || item.slug}</p>
                      {!svc && <p className="text-xs text-red-400 mt-0.5">⚠ Slug bulunamadı</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link href={`/admin/tamirler/${item.slug}/duzenle`} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors">İçerik Düzenle</Link>
                      <a href={`/tamir-hizmetleri/${item.slug}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors">Görüntüle</a>
                      <button onClick={() => togglePopular(item.slug)} className="px-3 py-1.5 text-xs font-bold rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors">Çıkar</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="text-xs text-zinc-400 mt-4">Bu liste anasayfanın "Popüler Teknik Servisler" bölümünde görünür.</p>
        </div>
      )}

      {/* ── Tüm Sayfalar ── */}
      {activeTab === "tumü" && (
        <div>
          {/* Özel Cihazlar bölümü */}
          {sortedCustomDevices.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-black text-zinc-700 uppercase tracking-wider">Özel Cihazlar</h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{sortedCustomDevices.length} cihaz</span>
              </div>
              <div className="space-y-3">
                {sortedCustomDevices.map((device) => {
                  const isEditing = editingDeviceId === device.id;
                  return (
                    <div key={device.id} className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                      {/* Device header */}
                      <div className="flex items-center gap-3 px-5 py-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-zinc-900">{device.model}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{device.brandLabel} · {device.repairKeys.length} tamir türü</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => isEditing ? setEditingDeviceId(null) : startEditDevice(device)}
                            className="px-3 py-1.5 text-xs font-bold rounded-lg transition-colors border"
                            style={{ borderColor: isEditing ? "#ff351b" : "#e4e4e7", color: isEditing ? "#ff351b" : "#52525b", background: isEditing ? "#fff5f5" : "#fff" }}
                          >
                            {isEditing ? "İptal" : "Tamir Türlerini Düzenle"}
                          </button>
                          <button onClick={() => deleteCustomDevice(device.id)} className="px-3 py-1.5 text-xs font-bold rounded-lg text-red-500 hover:bg-red-50 transition-colors">Sil</button>
                        </div>
                      </div>

                      {/* Inline repair type editor */}
                      {isEditing && (
                        <div className="border-t border-zinc-100 px-5 py-4 bg-zinc-50">
                          <p className="text-xs font-black text-zinc-500 mb-3 uppercase tracking-wider">Tamir türlerini seç</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                            {repairTypeList.map((rt) => {
                              const checked = editRepairKeys.includes(rt.key);
                              return (
                                <label key={rt.key} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border-2 transition-colors text-xs font-bold ${checked ? "border-[#ff351b] bg-red-50 text-[#ff351b]" : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"}`}>
                                  <input type="checkbox" className="sr-only" checked={checked}
                                    onChange={() => setEditRepairKeys((prev) => checked ? prev.filter((k) => k !== rt.key) : [...prev, rt.key])} />
                                  <span className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center shrink-0 ${checked ? "border-[#ff351b] bg-[#ff351b]" : "border-zinc-300"}`}>
                                    {checked && <span className="text-white text-[8px] font-black">✓</span>}
                                  </span>
                                  {rt.label}
                                </label>
                              );
                            })}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveDeviceRepairs(device.id)}
                              disabled={editRepairKeys.length === 0}
                              className="px-4 py-2 rounded-lg text-xs font-black text-white disabled:opacity-40"
                              style={{ background: "#ff351b" }}
                            >
                              Kaydet ({editRepairKeys.length} tür)
                            </button>
                            <button onClick={() => setEditingDeviceId(null)} className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 bg-zinc-200 hover:bg-zinc-300 transition-colors">İptal</button>
                          </div>
                        </div>
                      )}

                      {/* Repair type rows */}
                      {!isEditing && (
                        <div className="border-t border-zinc-100 divide-y divide-zinc-50">
                          {device.repairKeys.map((rk) => {
                            const rt = repairTypeList.find((r) => r.key === rk);
                            const slug = makeCustomSlug(device.model, rk);
                            const isPopular = popularSlugs.has(slug);
                            return (
                              <div key={rk} className={`flex items-center gap-3 px-5 py-2.5 ${isPopular ? "bg-orange-50" : ""}`}>
                                <span className="flex-1 text-sm font-bold text-zinc-700">{rt?.label ?? rk.replace(/-/g, " ")}</span>
                                <div className="flex items-center gap-2 shrink-0">
                                  <Link href={`/admin/tamirler/${slug}/duzenle`} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors">İçerik Düzenle</Link>
                                  <button onClick={() => togglePopular(slug)} className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${isPopular ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`}>
                                    {isPopular ? "✓ Popüler" : "+ Popüler"}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-zinc-200 mt-6 mb-5" />
            </div>
          )}

          {/* Hardcoded services list */}
          <div>
            <div className="flex flex-wrap gap-3 mb-4">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Model veya tamir adı ara..." className="input max-w-xs" />
              <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="input w-40">
                {BRANDS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
              <select value={repairFilter} onChange={(e) => setRepairFilter(e.target.value)} className="input w-52">
                <option value="">Tüm Tamir Türleri</option>
                {REPAIRS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <p className="text-xs text-zinc-400 mb-3">{filteredServices.length} sonuç</p>
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredServices.slice(0, 200).map((svc) => {
                const isPopular = popularSlugs.has(svc.slug);
                return (
                  <div key={svc.slug} className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${isPopular ? "bg-orange-50 border-orange-200" : "bg-white border-zinc-100"}`}>
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-900">{svc.title}</span>
                      {svc.isCustom && <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 shrink-0">Özel</span>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/admin/tamirler/${svc.slug}/duzenle`} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors">İçerik Düzenle</Link>
                      <button onClick={() => togglePopular(svc.slug)} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${isPopular ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`}>
                        {isPopular ? "✓ Popüler" : "+ Popüler"}
                      </button>
                    </div>
                  </div>
                );
              })}
              {filteredServices.length > 200 && <p className="text-xs text-zinc-400 text-center py-3">İlk 200 sonuç. Aramayı daraltın.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ── Zamanlama ── */}
      {activeTab === "zamanlama" && (
        <div>
          {schedMsg && <p className="mb-4 text-sm font-black text-green-600">{schedMsg}</p>}
          {schedLoading ? (
            <p className="text-sm text-zinc-400 py-8">Yükleniyor...</p>
          ) : repairItems.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <p className="text-3xl mb-3">🗓️</p>
              <p className="font-bold">Henüz özel içerik yazılmış tamir sayfası yok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

              {/* Sol: cihaz gruplu liste */}
              <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                  <h2 className="font-black text-zinc-900 text-sm">İçerik Sayfaları</h2>
                  <div className="flex gap-1 text-xs">
                    {(["drafts", "all", "manual"] as const).map((m) => (
                      <button key={m} onClick={() => { setSchedSelMode(m); setSchedShowPreview(false); }}
                        className="px-2.5 py-1 rounded-md font-bold transition-colors"
                        style={{ background: schedSelMode === m ? "#ff351b" : undefined, color: schedSelMode === m ? "#fff" : "#71717a" }}>
                        {m === "drafts" ? "Taslaklar" : m === "all" ? "Tümü" : "Manuel"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[540px]">
                  {groupedRepairItems.map((group) => {
                    const groupSlugs = group.items.map((i) => i.slug);
                    const allSelected = groupSlugs.every((s) => schedSelected.has(s));
                    const someSelected = groupSlugs.some((s) => schedSelected.has(s));

                    return (
                      <div key={group.model}>
                        {/* Grup başlığı */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border-b border-zinc-100 sticky top-0">
                          <button
                            onClick={() => {
                              setSchedSelected((prev) => {
                                const n = new Set(prev);
                                if (allSelected) groupSlugs.forEach((s) => n.delete(s));
                                else groupSlugs.forEach((s) => n.add(s));
                                return n;
                              });
                              setSchedSelMode("manual"); setSchedShowPreview(false);
                            }}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${allSelected ? "border-[#ff351b] bg-[#ff351b]" : someSelected ? "border-[#ff351b] bg-white" : "border-zinc-300 bg-white"}`}
                          >
                            {allSelected && <span className="text-white text-[8px] font-black">✓</span>}
                            {someSelected && !allSelected && <span className="text-[#ff351b] text-[8px] font-black">−</span>}
                          </button>
                          <span className="text-xs font-black text-zinc-700">{group.model}</span>
                          {group.isCustom && <span className="text-[9px] font-black px-1 py-0.5 rounded bg-blue-100 text-blue-600">Özel</span>}
                          <span className="ml-auto text-[10px] text-zinc-400">{groupSlugs.filter((s) => schedSelected.has(s)).length}/{group.items.length}</span>
                        </div>

                        {/* Grup öğeleri */}
                        {group.items.map((item) => {
                          const isSel = schedSelected.has(item.slug);
                          return (
                            <div key={item.slug} className={`flex items-center border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${isSel ? "bg-red-50/40" : ""}`}>
                              <label className="flex items-start gap-3 pl-8 pr-2 py-2.5 cursor-pointer flex-1 min-w-0">
                                <span className={`mt-0.5 w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${isSel ? "border-[#ff351b] bg-[#ff351b]" : "border-zinc-300"}`}>
                                  {isSel && <span className="text-white text-[9px] font-black">✓</span>}
                                </span>
                                <input type="checkbox" className="sr-only" checked={isSel}
                                  onChange={() => {
                                    setSchedSelected((prev) => { const n = new Set(prev); n.has(item.slug) ? n.delete(item.slug) : n.add(item.slug); return n; });
                                    setSchedSelMode("manual"); setSchedShowPreview(false);
                                  }} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-zinc-800 truncate">{item.title}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`text-[9px] font-black px-1 py-0.5 rounded ${item.isDraft ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                                      {item.isDraft ? "TASLAK" : "YAYINDA"}
                                    </span>
                                    {item.publishedAt && <span className="text-[10px] text-zinc-400">{fmtDate(item.publishedAt)}</span>}
                                  </div>
                                </div>
                              </label>
                              <button
                                onClick={() => deleteRepairPage(item.slug)}
                                className="shrink-0 mr-3 w-6 h-6 flex items-center justify-center rounded text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors text-sm font-black"
                                title="Sil"
                              >×</button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-bold">{schedSelected.size} sayfa seçili · Cihaz bazlı sıralanacak</span>
                  {schedSelected.size > 0 && (
                    <button onClick={deleteSelected}
                      className="text-xs font-black text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors">
                      Seçilileri Sil
                    </button>
                  )}
                </div>
              </div>

              {/* Sağ: kural oluşturucu */}
              <div className="xl:col-span-3 space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                  <h2 className="font-black text-zinc-900 text-sm mb-4">Başlangıç</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-3 sm:col-span-1">
                      <label className="block text-xs font-bold text-zinc-500 mb-1">Tarih</label>
                      <input type="date" value={schedStartDate} onChange={(e) => { setSchedStartDate(e.target.value); setSchedShowPreview(false); }} min={new Date().toISOString().slice(0, 10)} className="input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 mb-1">Başlangıç saati</label>
                      <select value={schedStartHour} onChange={(e) => { setSchedStartHour(+e.target.value); setSchedShowPreview(false); }} className="input">
                        {Array.from({ length: 24 }, (_, i) => <option key={i} value={i}>{String(i).padStart(2, "0")}:00</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 mb-1">Bitiş saati</label>
                      <select value={schedEndHour} onChange={(e) => { setSchedEndHour(+e.target.value); setSchedShowPreview(false); }} className="input">
                        {Array.from({ length: 24 }, (_, i) => <option key={i} value={i} disabled={i <= schedStartHour}>{String(i).padStart(2, "0")}:00</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                  <h2 className="font-black text-zinc-900 text-sm mb-3">Aktif Günler</h2>
                  <div className="flex gap-2 flex-wrap">
                    {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d, i) => (
                      <button key={d} onClick={() => { setSchedDays((p) => { const n = [...p]; n[i] = !n[i]; return n; }); setSchedShowPreview(false); }}
                        className="w-12 h-10 rounded-lg text-sm font-black transition-colors border-2"
                        style={{ borderColor: schedDays[i] ? "#ff351b" : "#e4e4e7", color: schedDays[i] ? "#ff351b" : "#a1a1aa", background: schedDays[i] ? "#fff5f5" : "#fff" }}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                  <h2 className="font-black text-zinc-900 text-sm mb-4">Yayın Hızı</h2>
                  <div className="flex gap-2 mb-4">
                    {(["daily", "interval"] as const).map((m) => (
                      <button key={m} onClick={() => { setSchedMode(m); setSchedShowPreview(false); }}
                        className="px-4 py-2 rounded-lg text-sm font-bold border-2 transition-colors"
                        style={{ borderColor: schedMode === m ? "#ff351b" : "#e4e4e7", color: schedMode === m ? "#ff351b" : "#52525b", background: schedMode === m ? "#fff5f5" : "#fff" }}>
                        {m === "daily" ? "Günde X sayfa" : "Her X saatte 1"}
                      </button>
                    ))}
                  </div>
                  {schedMode === "daily" ? (
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 mb-2">Günde kaç sayfa?</label>
                      <div className="flex gap-2 flex-wrap">
                        {[1, 2, 3, 5, 7, 10].map((n) => (
                          <button key={n} onClick={() => { setSchedPerDay(n); setSchedShowPreview(false); }}
                            className="w-12 h-10 rounded-lg text-sm font-black border-2 transition-colors"
                            style={{ borderColor: schedPerDay === n ? "#ff351b" : "#e4e4e7", color: schedPerDay === n ? "#ff351b" : "#52525b", background: schedPerDay === n ? "#fff5f5" : "#fff" }}>
                            {n}
                          </button>
                        ))}
                        <input type="number" min={1} max={50} value={schedPerDay} onChange={(e) => { setSchedPerDay(+e.target.value); setSchedShowPreview(false); }} className="input w-20 text-center font-black" />
                      </div>
                      {schedStartHour < schedEndHour && (
                        <p className="text-xs text-zinc-400 mt-2">→ Her {Math.round(((schedEndHour - schedStartHour) * 60) / schedPerDay)} dakikada bir yayın</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 mb-2">Kaç saatte bir?</label>
                      <div className="flex gap-2 flex-wrap">
                        {[1, 2, 3, 4, 6, 8, 12, 24].map((h) => (
                          <button key={h} onClick={() => { setSchedInterval(h); setSchedShowPreview(false); }}
                            className="px-3 h-10 rounded-lg text-sm font-black border-2 transition-colors"
                            style={{ borderColor: schedInterval === h ? "#ff351b" : "#e4e4e7", color: schedInterval === h ? "#ff351b" : "#52525b", background: schedInterval === h ? "#fff5f5" : "#fff" }}>
                            {h}s
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5 flex gap-3 flex-wrap items-center">
                  <span className="text-sm text-zinc-500">
                    <strong className="text-zinc-900">{schedSelected.size}</strong> sayfa · {schedDays.filter(Boolean).length} aktif gün
                  </span>
                  <button onClick={calcSchedPreview} disabled={schedSelected.size === 0 || !schedDays.some(Boolean)}
                    className="px-5 py-2.5 rounded-lg text-sm font-black border-2 border-[#ff351b] text-[#ff351b] hover:bg-red-50 transition-colors disabled:opacity-40">
                    Önizle
                  </button>
                  {schedShowPreview && (
                    <button onClick={applyRepairSchedule} disabled={schedApplying}
                      className="px-5 py-2.5 rounded-lg text-sm font-black text-white disabled:opacity-50" style={{ background: "#ff351b" }}>
                      {schedApplying ? "Uygulanıyor..." : `Uygula (${schedPreview.length})`}
                    </button>
                  )}
                </div>

                {schedShowPreview && schedPreview.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                      <h2 className="font-black text-zinc-900 text-sm">Önizleme — {schedPreview.length} sayfa (cihaz sırasıyla)</h2>
                      <span className="text-xs text-zinc-400">Son: {fmtDate(schedPreview[schedPreview.length - 1].newDate)}</span>
                    </div>
                    <div className="overflow-auto max-h-72">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-zinc-100 bg-zinc-50">
                            <th className="text-left px-4 py-2.5 font-black text-zinc-600">#</th>
                            <th className="text-left px-4 py-2.5 font-black text-zinc-600">Sayfa</th>
                            <th className="text-left px-4 py-2.5 font-black text-zinc-600">Eski</th>
                            <th className="text-left px-4 py-2.5 font-black text-zinc-600">Yeni</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedPreview.map((row, i) => (
                            <tr key={row.slug} className="border-b border-zinc-50 hover:bg-zinc-50">
                              <td className="px-4 py-2 text-zinc-400 font-bold">{i + 1}</td>
                              <td className="px-4 py-2 font-bold text-zinc-800 max-w-[160px] truncate">{row.title}</td>
                              <td className="px-4 py-2 text-zinc-400">{row.oldDate ? fmtDate(row.oldDate) : "—"}</td>
                              <td className="px-4 py-2 font-bold text-green-700">{fmtDate(row.newDate)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-5 py-3 bg-zinc-50 border-t text-xs text-zinc-500">
                      İlk yayın {fmtDate(schedPreview[0].newDate)} · Son yayın {fmtDate(schedPreview[schedPreview.length - 1].newDate)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
