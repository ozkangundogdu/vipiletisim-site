"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";

const LOGIN_PATH = "/vippanel/giris";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Giriş sayfası kendi tam ekran tasarımına sahip; oturum açılmadan
  // menü yapısının (hangi yönetim bölümleri var) görünür olmaması için
  // sidebar burada hiç render edilmez.
  if (pathname === LOGIN_PATH) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#f4f5f7" }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {children}
      </div>
    </div>
  );
}
