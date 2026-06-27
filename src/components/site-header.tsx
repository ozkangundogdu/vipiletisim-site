import Image from "next/image";
import Link from "next/link";
import { getSettings, getNav } from "@/lib/settings";
import type { NavItem } from "@/lib/settings";

const navGradientClass = "bg-[linear-gradient(180deg,#FAFAFA_0%,#b8b8b8_100%)]";
const navSeparatorClass =
  "before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-zinc-600/35 before:content-[''] after:absolute after:left-px after:top-0 after:h-full after:w-px after:bg-white/70 after:content-[''] last:border-r last:border-zinc-600/35 last:shadow-[inset_-1px_0_0_rgba(255,255,255,0.65)]";
const headerTextureClass =
  "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.055)_0px,rgba(255,255,255,0.055)_1px,transparent_1px,transparent_9px)]";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Logo({ src }: { src: string }) {
  return (
    <Link href="/" className="flex h-full items-center" aria-label="Vip İletişim ana sayfa">
      <Image
        src={src}
        alt="Vip İletişim Logo"
        width={218}
        height={104}
        className="h-[104px] w-auto origin-left scale-[2] object-contain"
        priority
      />
    </Link>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.3"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7 text-accent"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[23px] w-[23px] shrink-0 text-zinc-700"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.1"
    >
      <path d="M16 4.7a4.8 4.8 0 0 0-6.4 6.1L4.1 16.3a2.2 2.2 0 0 0 0 3.1l.5.5a2.2 2.2 0 0 0 3.1 0l5.5-5.5a4.8 4.8 0 0 0 6.1-6.4l-3.5 3.5-3.3-3.3L16 4.7Z" />
      <path d="M6.2 17.8h.01" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[21px] w-[21px] shrink-0 text-zinc-700"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
    >
      <path d="M3 10.8 12 3l9 7.8" />
      <path d="M5.5 9.2V21h13V9.2" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/trabzonvipiletisim/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@FatihcomertVip",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/fatih.comert.1000",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Google İşletme",
    href: "https://share.google/0DFXLAirTOsTXCXZv",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
];

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="text-zinc-400 transition-colors hover:text-accent"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-[15px] w-[15px] shrink-0 translate-y-px text-zinc-500"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function ContactBlock({
  type,
  title,
  value,
}: {
  type: "phone" | "clock";
  title: string;
  value: string;
}) {
  return (
    <div className="hidden items-start gap-2.5 lg:flex">
      {type === "phone" ? <PhoneIcon /> : <ClockIcon />}
      <div className="pt-0.5">
        <div className="text-[14px] font-black uppercase leading-5 text-zinc-100">
          {title}
        </div>
        <div className="mt-1 text-[14px] font-medium leading-5 text-zinc-200">
          {value}
        </div>
      </div>
    </div>
  );
}

function DesktopNav({ navItems }: { navItems: NavItem[] }) {
  return (
    <nav className={cn(navGradientClass, "hidden h-[53px] lg:block")} aria-label="Ana menü">
      <div className="mx-auto flex h-full max-w-[1330px] justify-center px-6">
        <ul className="flex h-full items-stretch">
          {navItems.map((item) => (
            <li key={item.label} className={cn(navSeparatorClass, "group relative h-full")}>
              <Link
                href={item.href}
                className={cn(
                  navGradientClass,
                  "flex h-full items-center justify-center gap-2 whitespace-nowrap px-[22px] text-[15px] font-extrabold leading-none text-zinc-700 transition hover:bg-surface-nav-hover hover:text-zinc-950 [font-family:var(--font-nunito-sans)]"
                )}
              >
                {item.href === "/" ? <HomeIcon /> : null}
                {item.icon ? <WrenchIcon /> : null}
                <span>{item.label}</span>
                {item.hasDropdown ? <ChevronIcon /> : null}
              </Link>

              {item.children && (
                <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-1 rounded-b-lg bg-white opacity-0 shadow-lg ring-1 ring-zinc-200 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block border-b border-zinc-100 px-5 py-3 text-[14px] font-bold text-zinc-700 first:rounded-t-none last:rounded-b-lg last:border-b-0 transition hover:bg-zinc-50 hover:text-brand [font-family:var(--font-nunito-sans)]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function MobileNav({ navItems }: { navItems: NavItem[] }) {
  return (
    <details className={cn(navGradientClass, "lg:hidden")} suppressHydrationWarning>
      <summary
        className={cn(
          navGradientClass,
          "flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[16px] font-black text-zinc-700"
        )}
      >
        Menü
        <ChevronIcon />
      </summary>
      <nav className="grid border-t border-zinc-300" aria-label="Mobil menü">
        {navItems.map((item) =>
          item.children ? (
            <details key={item.label} className="group border-b border-zinc-300" suppressHydrationWarning>
              <summary
                className={cn(
                  navGradientClass,
                  "flex cursor-pointer list-none items-center justify-between px-5 py-3 text-sm font-extrabold text-zinc-700 [font-family:var(--font-nunito-sans)]"
                )}
              >
                {item.label}
                <ChevronIcon />
              </summary>
              <div className="grid border-t border-zinc-200 bg-zinc-50">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="border-b border-zinc-200 py-2.5 pl-9 pr-5 text-sm font-bold text-zinc-600 last:border-b-0 hover:text-zinc-950 [font-family:var(--font-nunito-sans)]"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                navGradientClass,
                "border-b border-zinc-300 px-5 py-3 text-sm font-extrabold text-zinc-700 hover:text-zinc-950 [font-family:var(--font-nunito-sans)]"
              )}
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </details>
  );
}

export function SiteHeader() {
  const settings = getSettings();
  const navItems = getNav();

  return (
    <header>
      <div className={cn("bg-surface-header", headerTextureClass)}>
        <div className="mx-auto flex h-[90px] max-w-[1330px] items-center justify-between gap-8 px-6">
          <Logo src={settings.logo ?? "/images/logo.png"} />

          <div className="hidden flex-1 items-center justify-end gap-[40px] lg:flex">
            <ContactBlock
              type="phone"
              title="Telefon Hattı"
              value={settings.telefon}
            />
            <ContactBlock
              type="clock"
              title="Çalışma Saatlerimiz"
              value={settings.calisma}
            />
            <form action="/arama" className="relative h-[50px] w-[300px]">
              <label htmlFor="site-search" className="sr-only">
                Marka veya model ara
              </label>
              <input
                id="site-search"
                name="q"
                type="search"
                placeholder="Marka veya Modelinizi Arayın"
                className="h-full w-full rounded-[4px] bg-white pl-[38px] pr-5 text-[15px] font-medium text-zinc-900 outline-none placeholder:text-zinc-500"
              />
              <span className="pointer-events-none absolute left-[7px] top-1/2 flex -translate-y-1/2 items-center justify-center">
                <SearchIcon />
              </span>
            </form>
          </div>

          <a
            href={`tel:+${settings.telefonRaw}`}
            className="rounded-[4px] bg-brand px-4 py-3 text-sm font-black text-white lg:hidden"
          >
            Ara
          </a>
        </div>
      </div>

      <DesktopNav navItems={navItems} />
      <MobileNav navItems={navItems} />
    </header>
  );
}
