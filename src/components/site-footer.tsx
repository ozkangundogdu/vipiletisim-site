import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { getFooter } from "@/lib/footer";

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

export function SiteFooter() {
  const settings = getSettings();
  const footer = getFooter();

  const socialLinks = [
    settings.sosyal.instagram && {
      label: "Instagram",
      href: settings.sosyal.instagram,
      icon: (
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="url(#ig-grad)" aria-hidden="true">
          <defs>
            <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    settings.sosyal.youtube && {
      label: "YouTube",
      href: settings.sosyal.youtube,
      icon: (
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="#FF0000" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    settings.sosyal.facebook && {
      label: "Facebook",
      href: settings.sosyal.facebook,
      icon: (
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="#1877F2" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    settings.sosyal.google && {
      label: "Google",
      href: settings.sosyal.google,
      icon: (
        <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      ),
    },
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode }[];

  const adresGoster = [settings.adres, settings.sehir, settings.ilce].filter(Boolean).join(", ");

  return (
    <footer className="bg-surface-header text-zinc-400" aria-label="Site alt bilgisi">

      {/* Ana Footer İçeriği */}
      <div className="mx-auto max-w-[1330px] px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-12 lg:justify-items-center">

          {/* Kolon 1 — Firma Bilgisi */}
          <div>
            <p className="mb-4 text-[16px] font-black" style={{ color: '#F3C409' }}>{footer.firmaBaslik}</p>
            <address className="not-italic space-y-2.5">
              {adresGoster && (
                <div className="flex items-start gap-2 text-[13px]">
                  <MapPinIcon />
                  <span>{adresGoster}{settings.posta ? `, ${settings.posta}` : ""}</span>
                </div>
              )}
              {settings.telefon && (
                <div className="flex items-start gap-2 text-[13px]">
                  <PhoneIcon />
                  <a href={`tel:+${settings.telefonRaw}`} className="hover:text-white transition-colors">
                    {settings.telefon}
                  </a>
                </div>
              )}
            </address>
          </div>

          {/* Kolon 2 — Popüler Tamir Hizmetleri */}
          <nav aria-label="Popüler tamir hizmetleri">
            <h2 className="mb-4 text-[13px] font-black uppercase tracking-widest text-accent">
              Popüler Tamir Hizmetleri
            </h2>
            <ul className="space-y-2">
              {footer.popularHizmetler.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-[13px] text-zinc-400 transition-colors hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/tamir-hizmetleri" className="mt-4 inline-block text-[12px] font-bold text-accent hover:underline">
              Tüm Hizmetler →
            </Link>
          </nav>

          {/* Kolon 3 — Hizmet Bölgeleri */}
          <nav aria-label="Hizmet bölgeleri">
            <h2 className="mb-4 text-[13px] font-black uppercase tracking-widest text-accent">
              Hizmet Bölgeleri
            </h2>
            <ul className="space-y-2">
              {footer.popularBolgeler.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-[13px] text-zinc-400 transition-colors hover:text-white">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/bolge" className="mt-4 inline-block text-[12px] font-bold text-accent hover:underline">
              Tüm Bölgeler →
            </Link>
          </nav>

          {/* Kolon 4 — Sosyal Medya */}
          <div>
            <h2 className="mb-5 text-[13px] font-black uppercase tracking-widest text-accent">
              Sosyal Medya
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex flex-col items-center gap-2 rounded-xl p-3 transition hover:bg-zinc-800"
                >
                  {s.icon}
                  <span className="text-[11px] font-semibold text-zinc-400">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Alt Çubuk */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-[1330px] flex-col items-center justify-between gap-3 px-6 py-5 text-[12px] text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} <strong className="text-zinc-400">{settings.siteAdi || "Vip İletişim Teknik Servis"}</strong> — {settings.ilce || "Trabzon"}.
            Tüm hakları saklıdır.
          </p>
          {footer.altMetin && (
            <p className="text-center">{footer.altMetin}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
