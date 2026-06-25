import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/data/cities";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Trabzon ve Çevre İllerde Telefon Tamiri",
  description:
    "Trabzon, Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan kargo ile telefon tamirine gönderin. Uzman kadro, ücretsiz ön inceleme, aynı gün teslim.",
  keywords: [
    "trabzon çevre illeri telefon tamiri",
    "giresun iphone tamiri kargo",
    "rize telefon tamiri",
    "artvin iphone tamiri",
    "gümüşhane telefon tamiri",
    "doğu karadeniz telefon teknik servis",
  ],
  alternates: { canonical: "https://vipiletisim.com.tr/bolge" },
  openGraph: {
    title: "Trabzon ve Çevre İllerde Telefon Tamiri | Vip İletişim",
    description:
      "Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan kargo ile telefon gönder, tamir et, kapına gelsin.",
    url: "https://vipiletisim.com.tr/bolge",
    images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630, alt: "Trabzon Doğu Karadeniz Telefon Tamiri" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://vipiletisim.com.tr" },
    { "@type": "ListItem", position: 2, name: "Hizmet Bölgeleri", item: "https://vipiletisim.com.tr/bolge" },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Trabzon ve Çevre İllerde Telefon Tamiri Hizmet Bölgeleri",
  url: "https://vipiletisim.com.tr/bolge",
  description: "Vip İletişim Teknik Servis'in Doğu Karadeniz'deki hizmet bölgeleri.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://vipiletisim.com.tr/#localbusiness",
  },
};

const iller = ["Trabzon", "Giresun", "Rize", "Artvin", "Gümüşhane", "Bayburt"];

export default function CitiesListPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <SiteHeader />

      <main>
        {/* ── Hero ── */}
        <section className="bg-surface-hero py-6 lg:py-8">
          <div className="mx-auto max-w-[1330px] px-6">
            <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-zinc-400">
              <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Hizmet Bölgeleri</span>
            </nav>
            <h1 className="text-3xl font-black text-white lg:text-4xl">
              Trabzon ve Çevre İllerde Telefon Tamiri
            </h1>
            <p className="mt-3 max-w-2xl text-[16px] text-white/70">
              Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan kargo veya otobüs ile
              cihazınızı gönderin — tamir sonrası kapınıza iade edelim.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {iller.map((il) => (
                <a
                  key={il}
                  href={`#il-${il.toLowerCase().replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")}`}
                  className="rounded-lg bg-white/10 px-4 py-1.5 text-[13px] font-black text-white hover:bg-white/20 transition-colors"
                >
                  {il}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Şehir Listeleri ── */}
        <section className="py-12">
          <div className="mx-auto max-w-[1330px] px-6 space-y-10">
            {iller.map((il) => {
              const ilCities = cities.filter((c) => c.il === il);
              const ilSlug = il.toLowerCase()
                .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
                .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c");
              return (
                <div key={il} id={`il-${ilSlug}`}>
                  <h2 className="mb-4 border-b border-zinc-200 pb-2 text-lg font-black text-zinc-900">
                    {il} İli — {ilCities.length} İlçe
                  </h2>
                  <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {ilCities.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/bolge/${c.slug}`}
                          className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-[13px] font-bold text-zinc-800 transition hover:border-brand hover:bg-white hover:text-brand"
                        >
                          {c.name}
                          <span className="text-brand">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Kargo Bilgisi ── */}
        <section className="border-t border-zinc-100 bg-zinc-50 py-10">
          <div className="mx-auto max-w-[1330px] px-6">
            <h2 className="mb-6 text-xl font-black text-zinc-900">Kargo ile Tamir Nasıl İşler?</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "1", title: "WhatsApp'tan Bilgi Verin", desc: "Cihazınızı göndermeden önce +90 (505) 275 45 40 numarasına yazın, ön bilgi alın." },
                { step: "2", title: "Güvenli Paketleyin", desc: "Telefonu baloncuklu naylon ile sarın, sert kutuya koyun. İçine isim ve arıza notu ekleyin." },
                { step: "3", title: "Kargoya Verin", desc: "Takip numarasını bize bildirin. Cihaz ulaşınca ücretsiz tanı yapıp fiyat bildiriyoruz." },
                { step: "4", title: "Tamir + İade", desc: "Onayınız ardından tamir başlar. Tamamlanınca adresinize kargoluyoruz." },
              ].map((s) => (
                <div key={s.step} className="rounded-xl border border-zinc-200 bg-white p-5">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[13px] font-black text-white">
                    {s.step}
                  </div>
                  <p className="mb-1 text-[14px] font-black text-zinc-900">{s.title}</p>
                  <p className="text-[12px] leading-relaxed text-zinc-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-surface-hero py-6">
          <div className="mx-auto max-w-[1330px] px-6 text-center">
            <h2 className="text-2xl font-black text-white">Şehriniz Listede Yok mu?</h2>
            <p className="mt-2 text-white/70">Türkiye'nin her yerinden kargo ile cihaz kabul ediyoruz. Bize yazın.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="tel:+905052754540" className="rounded-lg bg-accent px-6 py-3 font-black text-zinc-900 hover:bg-accent-hover transition-colors">
                +90 (505) 275 45 40
              </a>
              <a href="https://wa.me/905052754540" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-whatsapp px-6 py-3 font-black text-white hover:bg-whatsapp-hover transition-colors">
                WhatsApp ile Yaz
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
