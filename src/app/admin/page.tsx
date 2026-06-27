import fs from "fs";
import path from "path";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getReviews, getFaq } from "@/lib/settings";
import { services } from "@/data/services";
import { getCustomDevices, getCustomServices } from "@/lib/custom-services";

export const dynamic = "force-dynamic";

function getPopularCount(): number {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "content/popular-services.json"), "utf-8");
    return (JSON.parse(raw) as unknown[]).length;
  } catch { return 0; }
}

function getCustomizedPageCount(): number {
  try {
    const dir = path.join(process.cwd(), "content/repair-pages");
    if (!fs.existsSync(dir)) return 0;
    return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).length;
  } catch { return 0; }
}

export default function AdminDashboard() {
  const posts = getAllPosts();
  const reviews = getReviews();
  const faq = getFaq();
  const customDevices = getCustomDevices();
  const customServices = getCustomServices();
  const popularCount = getPopularCount();
  const customizedPageCount = getCustomizedPageCount();
  const totalRepairPages = services.length + customServices.length;

  const stats = [
    { label: "Blog Yazısı",       value: posts.length,           href: "/admin/blog",         color: "#3b82f6", icon: "📝" },
    { label: "Müşteri Yorumu",    value: reviews.length,         href: "/admin/yorumlar",     color: "#f59e0b", icon: "⭐" },
    { label: "SSS Sorusu",        value: faq.length,             href: "/admin/sss",          color: "#10b981", icon: "❓" },
    { label: "Tamir Sayfası",     value: totalRepairPages,       href: "/admin/tamirler",     color: "#ff351b", icon: "🔧" },
    { label: "Popüler Servis",    value: popularCount,           href: "/admin/tamirler",     color: "#8b5cf6", icon: "🔥" },
    { label: "Özel İçerik",       value: customizedPageCount,    href: "/admin/tamirler",     color: "#06b6d4", icon: "✏️" },
  ];

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Vip İletişim yönetim paneline hoş geldiniz.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: `${s.color}18` }}>
              {s.icon}
            </div>
            <p className="text-3xl font-black leading-none" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-zinc-500 font-medium mt-1.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions + Recent Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
          <h2 className="text-base font-black text-zinc-900 mb-4">Hızlı İşlemler</h2>
          <div className="space-y-2">
            {[
              { href: "/admin/blog/yeni",        label: "Yeni Blog Yazısı Ekle",        icon: "✏️" },
              { href: "/admin/tamirler/yeni-cihaz", label: "Yeni Cihaz / Model Ekle",   icon: "🔧" },
              { href: "/admin/iletisim",          label: "İletişim Bilgilerini Düzenle", icon: "⚙️" },
              { href: "/admin/yorumlar",          label: "Yorum Yönetimi",               icon: "⭐" },
              { href: "/admin/sss",               label: "SSS Yönetimi",                 icon: "❓" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-bold text-zinc-700"
              >
                <span>{item.icon}</span>
                {item.label}
                <span className="ml-auto text-zinc-300">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-zinc-900">Son Blog Yazıları</h2>
            <Link href="/admin/blog" className="text-xs font-bold" style={{ color: "#ff351b" }}>Tümü →</Link>
          </div>
          <ul className="space-y-2">
            {recentPosts.length === 0 ? (
              <li className="text-sm text-zinc-400">Henüz yazı yok.</li>
            ) : recentPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/admin/blog/${post.slug}`} className="flex items-start gap-2 p-2 rounded-lg hover:bg-zinc-50 transition-colors">
                  <span className="text-xs text-zinc-400 mt-0.5 shrink-0">{post.publishedAt.slice(0, 10)}</span>
                  <span className="text-sm font-medium text-zinc-700 line-clamp-1">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Repair Pages Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tamir Sayfaları Özeti */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-black text-zinc-900">Tamir Sayfaları</h2>
            <Link href="/admin/tamirler" className="text-xs font-bold" style={{ color: "#ff351b" }}>Yönet →</Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2.5 border-b border-zinc-50">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-zinc-400 shrink-0" />
                <span className="text-sm font-bold text-zinc-700">Hazır Tamir Sayfası</span>
              </div>
              <span className="text-sm font-black text-zinc-900">{services.length.toLocaleString("tr")}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-zinc-50">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#ff351b" }} />
                <span className="text-sm font-bold text-zinc-700">Özel Eklenen Sayfa</span>
              </div>
              <span className="text-sm font-black" style={{ color: "#ff351b" }}>{customServices.length}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-zinc-50">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <span className="text-sm font-bold text-zinc-700">Popüler Listede</span>
              </div>
              <span className="text-sm font-black text-purple-600">{popularCount}</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                <span className="text-sm font-bold text-zinc-700">Özel İçerik Yazılmış</span>
              </div>
              <span className="text-sm font-black text-cyan-600">{customizedPageCount}</span>
            </div>
          </div>
          <Link
            href="/admin/tamirler/yeni-cihaz"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-black text-white transition-opacity hover:opacity-90"
            style={{ background: "#ff351b" }}
          >
            + Yeni Cihaz Ekle
          </Link>
        </div>

        {/* Özel Cihazlar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-black text-zinc-900">Özel Cihazlar</h2>
            <Link href="/admin/tamirler" className="text-xs font-bold" style={{ color: "#ff351b" }}>Tümü →</Link>
          </div>
          {customDevices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-3xl mb-2">📱</p>
              <p className="text-sm text-zinc-500 font-bold">Henüz özel cihaz eklenmedi.</p>
              <Link
                href="/admin/tamirler/yeni-cihaz"
                className="mt-3 inline-block text-sm font-black hover:underline"
                style={{ color: "#ff351b" }}
              >
                İlk cihazı ekle →
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {customDevices.slice(0, 6).map((device) => (
                <li key={device.id} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-50 transition-colors">
                  <div>
                    <p className="text-sm font-black text-zinc-900">{device.model}</p>
                    <p className="text-xs text-zinc-400">{device.brandLabel} · {device.repairKeys.length} tamir türü</p>
                  </div>
                  <Link
                    href="/admin/tamirler"
                    className="text-xs font-bold px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
                  >
                    Düzenle
                  </Link>
                </li>
              ))}
              {customDevices.length > 6 && (
                <li className="text-xs text-zinc-400 text-center pt-1">
                  +{customDevices.length - 6} cihaz daha
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
