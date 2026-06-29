import Link from "next/link";

const PAGES = [
  {
    slug: "fiyatlar",
    label: "Fiyatlar",
    url: "/fiyatlar",
    desc: "Hero başlığı, fiyatlandırma açıklaması, bilgi kartları, SSS",
    icon: "💰",
  },
  {
    slug: "tamir-egitimi",
    label: "Tamir Eğitimi",
    url: "/tamir-egitimi",
    desc: "Hero, kurs kartları (3 seviye), faydalar, SSS",
    icon: "🎓",
  },
  {
    slug: "hakkimizda",
    label: "Hakkımızda",
    url: "/kurumsal/hakkimizda",
    desc: "Tanıtım metni, istatistikler, neden biz, markalar",
    icon: "🏢",
  },
  {
    slug: "ekibimiz",
    label: "Uzman Kadromuz",
    url: "/kurumsal/ekibimiz",
    desc: "Teknisyen kartları, fotoğraflar, belgeler, uzmanlık alanları",
    icon: "👥",
  },
  {
    slug: "sosyal-medya",
    label: "Sosyal Medya",
    url: "/sosyal-medya",
    desc: "Platform linkleri, açıklamalar, kapak görselleri",
    icon: "📱",
  },
];

export default function SayfalarListPage() {
  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-zinc-900">Sayfa Yönetimi</h1>
        <p className="text-sm text-zinc-400 font-medium mt-0.5">
          Seçili sayfaların içeriklerini, başlıklarını ve görsellerini düzenleyin
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PAGES.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/sayfalar/${page.slug}`}
            className="group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-400 hover:shadow-md transition-all"
          >
            <div className="text-3xl shrink-0">{page.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-black text-zinc-800 text-[15px]">{page.label}</p>
                <span className="text-xs font-bold text-zinc-400 group-hover:text-brand transition-colors shrink-0">
                  Düzenle →
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">{page.desc}</p>
              <span className="inline-block mt-2 text-[11px] font-bold text-zinc-400">
                ↗ {page.url}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
