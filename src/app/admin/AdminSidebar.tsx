"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "⬛" },
  { href: "/admin/iletisim", label: "İletişim & Site", icon: "⚙️" },
  { href: "/admin/blog", label: "Blog Yazıları", icon: "📝" },
  { href: "/admin/tamirler", label: "Tamir Sayfaları", icon: "🔧" },
  { href: "/admin/zamanlama", label: "Zamanlama", icon: "🗓️" },
  { href: "/admin/yorumlar", label: "Yorumlar", icon: "⭐" },
  { href: "/admin/sss", label: "SSS", icon: "❓" },
  { href: "/admin/navigasyon", label: "Navigasyon", icon: "🔗" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/giris");
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ background: "#0a1a3a" }}>
      {/* Logo */}
      <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-sm" style={{ background: "#ff351b" }}>
            V
          </div>
          <div>
            <p className="text-white font-black text-sm leading-none">Vip İletişim</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Yönetim Paneli</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-black uppercase tracking-widest px-3 mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
          Menü
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors"
                style={{
                  color: isActive(item.href) ? "#ffffff" : "rgba(255,255,255,0.6)",
                  background: isActive(item.href) ? "rgba(255,255,255,0.12)" : "transparent",
                }}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
                {isActive(item.href) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#ff351b" }} />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Site Link + Logout */}
      <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <span>🌐</span> Siteyi Görüntüle
        </a>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors text-left"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <span>🚪</span> {loggingOut ? "Çıkılıyor..." : "Çıkış Yap"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3"
        style={{ background: "#0a1a3a" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-xs" style={{ background: "#ff351b" }}>
            V
          </div>
          <span className="text-white font-black text-sm">Admin Panel</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white p-1"
          aria-label="Menü"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-20"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 bottom-0 w-64 z-20 transform transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ paddingTop: "52px" }}
      >
        {sidebarContent}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 flex-col z-10">
        {sidebarContent}
      </div>
    </>
  );
}
