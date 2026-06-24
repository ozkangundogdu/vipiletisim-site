"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type RepairType = { label: string; key: string; icon: string; desc: string };
type Model = { name: string; slug: string };
type Brand = { id: string; label: string; emoji: string; models: Model[] };

const repairTypes: RepairType[] = [
  { label: "Ekran Değişimi",       key: "ekran-degisimi",          icon: "📱", desc: "Kırık veya yanmış ekran" },
  { label: "Batarya Değişimi",     key: "batarya-degisimi",        icon: "🔋", desc: "Şarj tutmuyor, şişmiş pil" },
  { label: "Şarj Soketi",          key: "sarj-soketi-tamiri",      icon: "⚡", desc: "Şarj almıyor, kıvılcım" },
  { label: "Anakart Tamiri",       key: "anakart-tamiri",          icon: "🔬", desc: "Açılmıyor, ısınma, kısa devre" },
  { label: "Arka Kamera",          key: "arka-kamera-tamiri",      icon: "📷", desc: "Bulanık, siyah görüntü" },
  { label: "Ön Kamera",            key: "on-kamera-tamiri",        icon: "🤳", desc: "Selfie kamera arızası" },
  { label: "Kamera Camı",          key: "kamera-cami-tamiri",      icon: "🔭", desc: "Kırık kamera koruma camı" },
  { label: "Face ID",              key: "face-id-tamiri",          icon: "👤", desc: "Yüz tanıma çalışmıyor" },
  { label: "Hoparlör Tamiri",      key: "hoparlor-tamiri",         icon: "🔊", desc: "Ses az veya hiç yok" },
  { label: "Mikrofon Tamiri",      key: "mikrofon-tamiri",         icon: "🎙️", desc: "Karşı taraf duymuyor" },
  { label: "Ses Arızaları",        key: "ses-arizalari",           icon: "🎵", desc: "Ses entegresi sorunu" },
  { label: "Kasa Değişimi",        key: "kasa-degisimi",           icon: "🛡️", desc: "Ezik, eğilmiş kasa" },
  { label: "Arka Kapak",           key: "arka-kapak-tamiri",       icon: "🔲", desc: "Çatlak arka cam/kapak" },
  { label: "Ön Cam Değişimi",      key: "on-cam-degisimi",         icon: "🪟", desc: "Ön dokunmatik cam" },
  { label: "Sıvı Teması",          key: "sivi-temasi-tamiri",      icon: "💧", desc: "Suya düşen cihaz" },
  { label: "WiFi Tamiri",          key: "wifi-tamiri",             icon: "📶", desc: "WiFi bağlanamıyor" },
  { label: "Servis Yok",           key: "servis-yok-arizasi",      icon: "📡", desc: "Şebeke çekmiyor" },
  { label: "Şarj Olmuyor",         key: "sarj-olmuyor-tamiri",     icon: "🔌", desc: "Şarj girişi tepkisiz" },
  { label: "Şarj Entegresi",       key: "sarj-entegresi-tamiri",   icon: "⚙️", desc: "Anakart şarj devresi" },
  { label: "Açma/Kapama Tuşu",     key: "acma-kapama-tusu-tamiri", icon: "🔴", desc: "Güç tuşu çalışmıyor" },
];

const brands: Brand[] = [
  {
    id: "iphone", label: "iPhone", emoji: "/images/brands/iphone.png",
    models: [
      { name: "iPhone 17 Pro Max",   slug: "iphone-17-pro-max" },
      { name: "iPhone 17 Pro",       slug: "iphone-17-pro" },
      { name: "iPhone 17",           slug: "iphone-17" },
      { name: "iPhone 16 Pro Max",   slug: "iphone-16-pro-max" },
      { name: "iPhone 16 Pro",       slug: "iphone-16-pro" },
      { name: "iPhone 16 Plus",      slug: "iphone-16-plus" },
      { name: "iPhone 16",           slug: "iphone-16" },
      { name: "iPhone 15 Pro Max",   slug: "iphone-15-pro-max" },
      { name: "iPhone 15 Pro",       slug: "iphone-15-pro" },
      { name: "iPhone 15 Plus",      slug: "iphone-15-plus" },
      { name: "iPhone 15",           slug: "iphone-15" },
      { name: "iPhone 14 Pro Max",   slug: "iphone-14-pro-max" },
      { name: "iPhone 14 Pro",       slug: "iphone-14-pro" },
      { name: "iPhone 14 Plus",      slug: "iphone-14-plus" },
      { name: "iPhone 14",           slug: "iphone-14" },
      { name: "iPhone 13 Pro Max",   slug: "iphone-13-pro-max" },
      { name: "iPhone 13 Pro",       slug: "iphone-13-pro" },
      { name: "iPhone 13 mini",      slug: "iphone-13-mini" },
      { name: "iPhone 13",           slug: "iphone-13" },
      { name: "iPhone 12 Pro Max",   slug: "iphone-12-pro-max" },
      { name: "iPhone 12 Pro",       slug: "iphone-12-pro" },
      { name: "iPhone 12 mini",      slug: "iphone-12-mini" },
      { name: "iPhone 12",           slug: "iphone-12" },
      { name: "iPhone 11 Pro Max",   slug: "iphone-11-pro-max" },
      { name: "iPhone 11 Pro",       slug: "iphone-11-pro" },
      { name: "iPhone 11",           slug: "iphone-11" },
      { name: "iPhone XS Max",       slug: "iphone-xs-max" },
      { name: "iPhone XS",           slug: "iphone-xs" },
      { name: "iPhone XR",           slug: "iphone-xr" },
      { name: "iPhone X",            slug: "iphone-x" },
      { name: "iPhone SE (3. Nesil)", slug: "iphone-se-3-nesil" },
      { name: "iPhone SE (2. Nesil)", slug: "iphone-se-2-nesil" },
    ],
  },
  {
    id: "samsung", label: "Samsung", emoji: "/images/brands/samsung.png",
    models: [
      { name: "Galaxy S26 Ultra",  slug: "galaxy-s26-ultra" },
      { name: "Galaxy S26+",       slug: "galaxy-s26-plus" },
      { name: "Galaxy S26",        slug: "galaxy-s26" },
      { name: "Galaxy S25 Ultra",  slug: "galaxy-s25-ultra" },
      { name: "Galaxy S25 Slim",   slug: "galaxy-s25-slim" },
      { name: "Galaxy S25+",       slug: "galaxy-s25-plus" },
      { name: "Galaxy S25",        slug: "galaxy-s25" },
      { name: "Galaxy S24 Ultra",  slug: "galaxy-s24-ultra" },
      { name: "Galaxy S24+",       slug: "galaxy-s24-plus" },
      { name: "Galaxy S24 FE",     slug: "galaxy-s24-fe" },
      { name: "Galaxy S24",        slug: "galaxy-s24" },
      { name: "Galaxy S23 Ultra",  slug: "galaxy-s23-ultra" },
      { name: "Galaxy S23+",       slug: "galaxy-s23-plus" },
      { name: "Galaxy S23 FE",     slug: "galaxy-s23-fe" },
      { name: "Galaxy S23",        slug: "galaxy-s23" },
      { name: "Galaxy S22 Ultra",  slug: "galaxy-s22-ultra" },
      { name: "Galaxy S22+",       slug: "galaxy-s22-plus" },
      { name: "Galaxy S22",        slug: "galaxy-s22" },
      { name: "Galaxy A37",        slug: "galaxy-a37" },
      { name: "Galaxy A36",        slug: "galaxy-a36" },
      { name: "Galaxy A35",        slug: "galaxy-a35" },
      { name: "Galaxy A34",        slug: "galaxy-a34" },
      { name: "Galaxy A17",        slug: "galaxy-a17" },
      { name: "Galaxy A16",        slug: "galaxy-a16" },
      { name: "Galaxy A15",        slug: "galaxy-a15" },
      { name: "Galaxy A14",        slug: "galaxy-a14" },
      { name: "Galaxy A13",        slug: "galaxy-a13" },
    ],
  },
  {
    id: "xiaomi", label: "Xiaomi", emoji: "/images/brands/xiaomi.png",
    models: [
      { name: "Xiaomi 17T",            slug: "xiaomi-17t" },
      { name: "Xiaomi 17",             slug: "xiaomi-17" },
      { name: "Xiaomi 15 Ultra",       slug: "xiaomi-15-ultra" },
      { name: "Xiaomi 15T Pro",        slug: "xiaomi-15t-pro" },
      { name: "Xiaomi 15T",            slug: "xiaomi-15t" },
      { name: "Xiaomi 15",             slug: "xiaomi-15" },
      { name: "Xiaomi 14T Pro",        slug: "xiaomi-14t-pro" },
      { name: "Xiaomi 14T",            slug: "xiaomi-14t" },
      { name: "Xiaomi 14",             slug: "xiaomi-14" },
      { name: "Xiaomi 13T Pro",        slug: "xiaomi-13t-pro" },
      { name: "Xiaomi 13T",            slug: "xiaomi-13t" },
      { name: "Xiaomi 13",             slug: "xiaomi-13" },
      { name: "Redmi Note 15 Pro+",    slug: "redmi-note-15-pro-plus" },
      { name: "Redmi Note 15 Pro",     slug: "redmi-note-15-pro" },
      { name: "Redmi Note 14 Pro",     slug: "redmi-note-14-pro" },
      { name: "Redmi Note 13 Pro",     slug: "redmi-note-13-pro" },
      { name: "Redmi Note 12 Pro",     slug: "redmi-note-12-pro" },
      { name: "Redmi Note 11 Pro",     slug: "redmi-note-11-pro" },
      { name: "Redmi 15C",             slug: "redmi-15c" },
      { name: "Redmi 14C",             slug: "redmi-14c" },
      { name: "Redmi 13C",             slug: "redmi-13c" },
    ],
  },
];

const stepLabels = ["Arıza Türü", "Marka", "Model"];

export function RepairWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [repair, setRepair] = useState<RepairType | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);

  function handleRepairSelect(r: RepairType) {
    setRepair(r);
    setStep(2);
  }

  function handleBrandSelect(b: Brand) {
    setBrand(b);
    setStep(3);
  }

  function handleModelSelect(model: Model) {
    router.push(`/tamir-hizmetleri/${model.slug}-${repair!.key}`);
  }

  function goBack() {
    if (step === 2) { setStep(1); setBrand(null); }
    if (step === 3) { setStep(2); setBrand(null); }
  }

  return (
    <div>
      {/* Adım göstergesi */}
      <div className="mb-6 flex items-center gap-2">
        {stepLabels.map((label, i) => {
          const num = i + 1;
          const active = step === num;
          const done = step > num;
          return (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-black
                ${done ? "bg-brand text-white" : active ? "bg-[#1A3A6B] text-white" : "bg-zinc-200 text-zinc-400"}`}>
                {done ? "✓" : num}
              </div>
              <span className={`text-[13px] font-bold ${active ? "text-zinc-900" : done ? "text-brand" : "text-zinc-400"}`}>
                {label}
              </span>
              {i < stepLabels.length - 1 && (
                <span className="mx-1 text-zinc-300">›</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Seçim özeti */}
      {(repair || brand) && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {repair && (
            <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-[12px] font-bold text-zinc-700">
              {repair.icon} {repair.label}
            </span>
          )}
          {brand && (
            <span className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-[12px] font-bold text-zinc-700">
              <Image src={brand.emoji} alt={brand.label} width={16} height={16} className="object-contain" />
              {brand.label}
            </span>
          )}
          <button
            onClick={goBack}
            className="ml-auto text-[12px] font-bold text-brand hover:underline"
          >
            ← Geri
          </button>
        </div>
      )}

      {/* Adım 1: Arıza Türü — <a> ile render edilir, crawler görür; JS varsa preventDefault ile inline akış */}
      {step === 1 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {repairTypes.map((r) => (
            <a
              key={r.key}
              href={`/tamir-sihirbazi?ariza=${r.key}`}
              onClick={(e) => { e.preventDefault(); handleRepairSelect(r); }}
              className="group flex flex-col gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-left transition hover:border-brand hover:bg-white hover:shadow-sm"
            >
              <span className="text-2xl">{r.icon}</span>
              <span className="text-[13px] font-black text-zinc-800 group-hover:text-brand transition-colors">{r.label}</span>
              <span className="text-[11px] text-zinc-400">{r.desc}</span>
            </a>
          ))}
        </div>
      )}

      {/* Adım 2: Marka */}
      {step === 2 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => handleBrandSelect(b)}
              className="group flex items-center gap-4 rounded-xl border-2 border-zinc-200 bg-white p-6 text-left transition hover:border-brand hover:shadow-md"
            >
              <div className="relative h-12 w-12 shrink-0">
                <Image src={b.emoji} alt={b.label} fill className="object-contain" sizes="48px" />
              </div>
              <div>
                <p className="text-[18px] font-black text-zinc-900 group-hover:text-brand transition-colors">{b.label}</p>
                <p className="text-[12px] text-zinc-400">{b.models.length} model</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Adım 3: Model */}
      {step === 3 && brand && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {brand.models.map((model) => (
            <button
              key={model.slug}
              onClick={() => handleModelSelect(model)}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-left text-[13px] font-bold text-zinc-800 transition hover:border-brand hover:bg-white hover:text-brand hover:shadow-sm"
            >
              {model.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
