import Image from "next/image";
import Link from "next/link";

type NavChild = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  icon?: boolean;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { label: "Anasayfa", href: "/" },
  { label: "Tamir Merkezi", href: "/tamir-hizmetleri#wizard", hasDropdown: false, icon: true },
  { label: "Fiyatlar", href: "/fiyatlar" },
  { label: "Tamir Eğitimi", href: "/tamir-egitimi" },
  { label: "Blog", href: "/blog" },
  {
    label: "Kurumsal",
    href: "/kurumsal",
    hasDropdown: true,
    children: [
      { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
      { label: "Sıkça Sorulan Sorular", href: "/kurumsal/sikca-sorulan-sorular" },
    ],
  },
  { label: "İletişim", href: "/iletisim" },
];

function Logo() {
  return (
    <Link href="/" className="flex h-full items-center" aria-label="Vip İletişim ana sayfa">
      <Image
        src="/images/logo.png"
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
      strokeWidth="2"
    >
      <path d="M14.7 6.3a4.2 4.2 0 0 0-5.1 5.1L3 18v3h3l6.6-6.6a4.2 4.2 0 0 0 5.1-5.1l-2.5 2.5-2.3-2.3 2.5-2.5Z" />
    </svg>
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

function DesktopNav() {
  return (
    <nav className="hidden h-[53px] bg-surface-nav lg:block" aria-label="Ana menü">
      <div className="mx-auto flex h-full max-w-[1330px] justify-center px-6">
        <ul className="flex h-full items-stretch">
          {navItems.map((item) => (
            <li key={item.label} className="group relative h-full border-l border-zinc-300 last:border-r">
              <Link
                href={item.href}
                className="flex h-full items-center justify-center gap-2 whitespace-nowrap px-[22px] text-[15px] font-extrabold leading-none text-zinc-700 transition hover:bg-surface-nav-hover hover:text-zinc-950 [font-family:var(--font-nunito-sans)]"
              >
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
                      className="block border-b border-zinc-100 px-5 py-3 text-[14px] font-bold text-zinc-700 last:border-b-0 transition hover:bg-zinc-50 hover:text-brand [font-family:var(--font-nunito-sans)]"
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

function MobileNav() {
  return (
    <details className="bg-surface-nav lg:hidden" suppressHydrationWarning>
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[16px] font-black text-zinc-700">
        Menü
        <ChevronIcon />
      </summary>
      <nav className="grid border-t border-zinc-300" aria-label="Mobil menü">
        {navItems.map((item) =>
          item.children ? (
            <details key={item.label} className="group border-b border-zinc-300" suppressHydrationWarning>
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-sm font-extrabold text-zinc-700 [font-family:var(--font-nunito-sans)]">
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
              className="border-b border-zinc-300 px-5 py-3 text-sm font-extrabold text-zinc-700 hover:text-zinc-950 [font-family:var(--font-nunito-sans)]"
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
  return (
    <header>
      <div className="bg-surface-header">
        <div className="mx-auto flex h-[90px] max-w-[1330px] items-center justify-between gap-8 px-6">
          <Logo />

          <div className="hidden flex-1 items-center justify-end gap-[58px] lg:flex">
            <ContactBlock
              type="phone"
              title="Telefon Hattı"
              value="+90 (505) 275 45 40"
            />
            <ContactBlock
              type="clock"
              title="Çalışma Saatlerimiz"
              value="Pzts. - Cmts. : 09:00 | 19:00"
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
            href="tel:+905052754540"
            className="rounded-[4px] bg-brand px-4 py-3 text-sm font-black text-white lg:hidden"
          >
            Ara
          </a>
        </div>
      </div>

      <DesktopNav />
      <MobileNav />
    </header>
  );
}
