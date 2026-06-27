import type { Metadata } from "next";
import { AdminSidebar } from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — Vip İletişim",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "#f4f5f7" }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {children}
      </div>
    </div>
  );
}
