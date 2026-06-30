"use client";
import Link from "next/link";

// face-id-tamiri yalnızca iPhone için geçerli
const TAMIR_MARKALAR: Record<string, { key: string; label: string }[]> = {
  default: [
    { key: "iphone", label: "iPhone" },
    { key: "samsung", label: "Samsung" },
    { key: "xiaomi", label: "Xiaomi" },
  ],
  "face-id-tamiri": [
    { key: "iphone", label: "iPhone" },
  ],
};

const services = [
  {
    name: "Ekran Değişimi",
    href: "/tamir-sihirbazi?ariza=ekran-degisimi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="3" />
      </svg>
    ),
  },
  {
    name: "Batarya Değişimi",
    href: "/tamir-sihirbazi?ariza=batarya-degisimi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="2" y="7" width="18" height="10" rx="2" />
        <path d="M22 11v2" strokeWidth="3" strokeLinecap="round" />
        <path d="M6 11h5m2 0h3" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Şarj Soketi",
    href: "/tamir-sihirbazi?ariza=sarj-soketi-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
        <path d="M8 3v3M16 3v3" />
        <path d="M8 18v3M16 18v3" />
      </svg>
    ),
  },
  {
    name: "Ses Arızaları",
    href: "/tamir-sihirbazi?ariza=ses-arizalari",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    name: "Mikrofon Tamiri",
    href: "/tamir-sihirbazi?ariza=mikrofon-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    name: "Hoparlör Tamiri",
    href: "/tamir-sihirbazi?ariza=hoparlor-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    ),
  },
  {
    name: "Ön Kamera",
    href: "/tamir-sihirbazi?ariza=on-kamera-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
        <circle cx="8" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    name: "Arka Kamera",
    href: "/tamir-sihirbazi?ariza=arka-kamera-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    name: "Face ID Tamiri",
    href: "/tamir-sihirbazi?ariza=face-id-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    name: "Kamera Camı",
    href: "/tamir-sihirbazi?ariza=kamera-cami-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    name: "Kasa Değişimi",
    href: "/tamir-sihirbazi?ariza=kasa-degisimi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="9" y1="2" x2="9" y2="6" />
        <line x1="15" y1="2" x2="15" y2="6" />
      </svg>
    ),
  },
  {
    name: "Arka Kapak",
    href: "/tamir-sihirbazi?ariza=arka-kapak-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M9 6h6" strokeLinecap="round" />
        <path d="M10 20h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Anakart Tamiri",
    href: "/tamir-sihirbazi?ariza=anakart-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
        <path d="M8 2v2M16 2v2M8 20v2M16 20v2M2 8h2M2 16h2M20 8h2M20 16h2" />
      </svg>
    ),
  },
  {
    name: "Sıvı Teması",
    href: "/tamir-sihirbazi?ariza=sivi-temasi-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 2c0 0-8 7-8 13a8 8 0 0 0 16 0c0-6-8-13-8-13z" />
        <path d="M12 12v4M10 14h4" />
      </svg>
    ),
  },
  {
    name: "WiFi Tamiri",
    href: "/tamir-sihirbazi?ariza=wifi-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Servis Yok Arızası",
    href: "/tamir-sihirbazi?ariza=servis-yok-arizasi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M12 6h.01M8 18h8" />
        <path d="M10 10l4 4M14 10l-4 4" />
      </svg>
    ),
  },
  {
    name: "Şarj Olmuyor",
    href: "/tamir-sihirbazi?ariza=sarj-olmuyor-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="2" y="7" width="18" height="10" rx="2" />
        <path d="M22 11v2" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 10l4 4M14 10l-4 4" />
      </svg>
    ),
  },
  {
    name: "Şarj Entegresi Tamiri",
    href: "/tamir-sihirbazi?ariza=sarj-entegresi-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: "Açma/Kapama Tuşu",
    href: "/tamir-sihirbazi?ariza=acma-kapama-tusu-tamiri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 2v10" />
        <path d="M7.2 7.2A7 7 0 1 0 16.8 7.2" />
      </svg>
    ),
  },
  {
    name: "Ön Cam Değişimi",
    href: "/tamir-sihirbazi?ariza=on-cam-degisimi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M9 2v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V2" />
        <path d="M9 22v-2" />
        <path d="M15 22v-2" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section className="bg-white py-[20px]" aria-labelledby="hizmetler-baslik">
      <div className="mx-auto max-w-[1330px] px-6">

        <h2
          id="hizmetler-baslik"
          className="text-center text-3xl font-black tracking-tight lg:text-4xl"
          style={{ color: '#1A3A6B' }}
        >
          Tamir Hizmetlerimiz
        </h2>
        <p className="mt-2 mb-[15px] text-center text-[15px] text-zinc-500">
          Ekran değişiminden anakart tamirine kadar Trabzon'da geniş kapsamlı telefon tamir hizmetleri. Orijinal parça, aynı gün teslim.
        </p>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const arizoKey = service.href.split("ariza=")[1];
            return (
              <li key={service.name} className="rounded-xl border border-zinc-100 bg-zinc-50 transition hover:border-accent hover:bg-white hover:shadow-md">
                <Link
                  href={service.href}
                  className="group flex items-center gap-4 px-5 pt-5 pb-3"
                  title={`${service.name} hizmeti`}
                >
                  <span className="shrink-0 text-zinc-900 transition group-hover:text-accent">
                    {service.icon}
                  </span>
                  <span className="text-[15px] font-bold leading-snug text-zinc-800 group-hover:text-zinc-900">
                    {service.name}
                  </span>
                </Link>
                {arizoKey && (
                  <div className="flex flex-wrap gap-1 px-5 pb-3">
                    {(TAMIR_MARKALAR[arizoKey] ?? TAMIR_MARKALAR.default).map((m) => (
                      <Link
                        key={m.key}
                        href={`/tamir-hizmetleri/${m.key}-${arizoKey}`}
                        className="rounded px-2 py-0.5 text-[10px] font-black text-zinc-500 hover:bg-accent hover:text-zinc-900 transition-colors"
                      >
                        {m.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
