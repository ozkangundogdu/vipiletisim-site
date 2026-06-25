import Link from "next/link";

const popularServices = [
  { href: "/tamir-hizmetleri/iphone-16-ekran-degisimi", label: "iPhone 16 Ekran Değişimi" },
  { href: "/tamir-hizmetleri/iphone-14-ekran-degisimi", label: "iPhone 14 Ekran Değişimi" },
  { href: "/tamir-hizmetleri/samsung-galaxy-s24-ekran-degisimi", label: "Samsung S24 Ekran" },
  { href: "/tamir-hizmetleri/iphone-sarj-soketi-tamiri", label: "iPhone Şarj Soketi Tamiri" },
  { href: "/tamir-hizmetleri/iphone-batarya-degisimi", label: "iPhone Batarya Değişimi" },
];

const popularCities = [
  { href: "/bolge/trabzon-iphone-tamiri", label: "Trabzon iPhone Tamiri" },
  { href: "/bolge/giresun-telefon-tamiri", label: "Giresun Telefon Tamiri" },
  { href: "/bolge/rize-iphone-tamiri", label: "Rize iPhone Tamiri" },
  { href: "/bolge/artvin-telefon-tamiri", label: "Artvin Telefon Tamiri" },
  { href: "/bolge/gumushane-telefon-tamiri", label: "Gümüşhane Telefon Tamiri" },
];

const kurumsal = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/tamir-hizmetleri", label: "Tüm Tamir Hizmetleri" },
  { href: "/bolge", label: "Hizmet Bölgeleri" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-surface-header text-zinc-400" aria-label="Site alt bilgisi">

      {/* Ana Footer İçeriği */}
      <div className="mx-auto max-w-[1330px] px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-12 lg:justify-items-center">

          {/* Kolon 1 — Firma Bilgisi */}
          <div>
            <p className="mb-1 text-[16px] font-black" style={{ color: '#F3C409' }}>Vip İletişim Trabzon Cep Telefonu Teknik Servisi</p>

            <p className="mb-5 text-[13px] leading-relaxed text-zinc-400">
              Trabzon'da iPhone, Samsung, Xiaomi, Huawei ve Oppo dahil tüm marka ve modellerde
              profesyonel cep telefonu tamiri. Orijinal parça, uzman kadro.
            </p>

            <address className="not-italic space-y-2.5">
              <div className="flex items-start gap-2 text-[13px]">
                <MapPinIcon />
                <span>Çarşı Mah. Uzun Sokak Kolotoğlu Pasajı Kat 1, Ortahisar/Trabzon</span>
              </div>
              <div className="flex items-start gap-2 text-[13px]">
                <PhoneIcon />
                <a href="tel:+905052754540" className="hover:text-white transition-colors">
                  +90 (505) 275 45 40
                </a>
              </div>
              <div className="flex items-start gap-2 text-[13px]">
                <ClockIcon />
                <span>Pzt – Cmt: 09:00 – 19:00</span>
              </div>
            </address>
          </div>

          {/* Kolon 2 — Popüler Tamir Hizmetleri */}
          <nav aria-label="Popüler tamir hizmetleri">
            <h2 className="mb-4 text-[13px] font-black uppercase tracking-widest text-accent">
              Popüler Tamir Hizmetleri
            </h2>
            <ul className="space-y-2">
              {popularServices.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-[13px] text-zinc-400 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/tamir-hizmetleri"
              className="mt-4 inline-block text-[12px] font-bold text-accent hover:underline"
            >
              Tüm Hizmetler →
            </Link>
          </nav>

          {/* Kolon 3 — Hizmet Bölgeleri */}
          <nav aria-label="Hizmet bölgeleri">
            <h2 className="mb-4 text-[13px] font-black uppercase tracking-widest text-accent">
              Hizmet Bölgeleri
            </h2>
            <ul className="space-y-2">
              {popularCities.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-[13px] text-zinc-400 transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/bolge"
              className="mt-4 inline-block text-[12px] font-bold text-accent hover:underline"
            >
              Tüm Bölgeler →
            </Link>
          </nav>

          {/* Kolon 4 — Kurumsal */}
          <nav aria-label="Kurumsal bağlantılar">
            <h2 className="mb-4 text-[13px] font-black uppercase tracking-widest text-accent">
              Kurumsal
            </h2>
            <ul className="space-y-2">
              {kurumsal.map((k) => (
                <li key={k.href}>
                  <Link
                    href={k.href}
                    className="text-[13px] text-zinc-400 transition-colors hover:text-white"
                  >
                    {k.label}
                  </Link>
                </li>
              ))}
            </ul>

          </nav>

        </div>
      </div>

      {/* Alt Çubuk */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-[1330px] flex-col items-center justify-between gap-3 px-6 py-5 text-[12px] text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} <strong className="text-zinc-400">Vip İletişim Teknik Servis</strong> — Trabzon.
            Tüm hakları saklıdır.
          </p>
          <p className="text-center">
            Trabzon iPhone Tamiri · Samsung Tamiri · Telefon Teknik Servis Trabzon
          </p>
        </div>
      </div>
    </footer>
  );
}
