import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPageContent } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Hakkımızda — Trabzon Teknik Servis",
  description:
    "Trabzon Vip İletişim Teknik Servis: iPhone, Samsung ve Xiaomi tamirinde uzman kadro, orijinal parça, 90 gün anakart garantisi. Trabzon'un güvenilir cep telefonu teknik servisi.",
  keywords: [
    "trabzon telefon tamiri teknik servis",
    "vip iletişim trabzon hakkında",
    "trabzon iphone samsung xiaomi tamiri",
    "trabzon en iyi telefon servisi",
    "vip iletişim teknik servis trabzon",
  ],
  alternates: { canonical: "https://vipiletisim.com.tr/kurumsal/hakkimizda" },
  openGraph: {
    title: "Hakkımızda | Trabzon Vip İletişim",
    description:
      "Trabzon'da profesyonel cep telefonu tamiri. Uzman kadro, orijinal parça, anakart tamirinde 90 gün garanti.",
    url: "https://vipiletisim.com.tr/kurumsal/hakkimizda",
    images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630, alt: "Vip İletişim Trabzon Teknik Servis" }],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Hakkımızda — Trabzon Vip İletişim",
  url: "https://vipiletisim.com.tr/kurumsal/hakkimizda",
  description:
    "Trabzon Vip İletişim Teknik Servis hakkında bilgi. Orijinal parça, uzman kadro ve garanti ile iPhone, Samsung, Xiaomi tamiri.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://vipiletisim.com.tr" },
    { "@type": "ListItem", position: 2, name: "Kurumsal", item: "https://vipiletisim.com.tr/kurumsal" },
    { "@type": "ListItem", position: 3, name: "Hakkımızda", item: "https://vipiletisim.com.tr/kurumsal/hakkimizda" },
  ],
};

const stats = [
  { value: "10+", label: "Yıllık Deneyim" },
  { value: "50.000+", label: "Başarılı Tamir" },
  { value: "6 İl", label: "Hizmet Bölgesi" },
  { value: "90 Gün", label: "Anakart Garantisi" },
];

const whyUs = [
  {
    title: "Orijinal Parça Garantisi",
    desc: "Tüm tamirlerimizde yalnızca orijinal veya sertifikalı yedek parça kullanıyoruz. Parça kalitesi, tamirin uzun ömürlü olmasının temelidir.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    title: "Uzman Teknisyen Kadrosu",
    desc: "Sektörde deneyimli, sürekli kendini güncelleyen teknisyenlerimiz her marka ve modelde güvenle tamir yapabilmektedir.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    title: "Aynı Gün Teslim",
    desc: "Ekran, batarya ve şarj soketi gibi standart tamirler çoğunlukla 30–60 dakikada tamamlanır. Cihazınızı bırakıp kısa sürede teslim alabilirsiniz.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L11 13.5V7h1.5v5.85l4.74 2.82-1.01 1.33z" />
      </svg>
    ),
  },
  {
    title: "90 Gün Anakart Garantisi",
    desc: "Anakart tamiri ve kapsamlı onarımlarda 90 günlük işçilik güvencesi sunuyoruz.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    ),
  },
  {
    title: "Ücretsiz Ön Kontrol",
    desc: "Cihazınızı getirmeden önce arızayı WhatsApp üzerinden fotoğrafla paylaşabilirsiniz. Ön kontrol ve fiyat teklifi tamamen ücretsizdir.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
      </svg>
    ),
  },
  {
    title: "Doğu Karadeniz'e Kargo Hizmeti",
    desc: "Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan kargo veya otobüsle cihaz kabul ediyoruz. Tamir sonrası güvenle aynı yollarla geri gönderiyoruz.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.99 5.7 18 8 17 12 17c0-4 1-7 5-9zm2.22-.22C19.08 7.63 18.64 7 18 7c-.73 0-1.28.56-1.5 1.21C14 10 13 13 13 17c3 0 6-2.67 6-7 0-.79-.28-1.53-.78-2.22z" />
      </svg>
    ),
  },
];

const brands = [
  { name: "Apple iPhone", note: "X — 17 Pro Max" },
  { name: "Samsung Galaxy", note: "S Serisi, A Serisi" },
  { name: "Xiaomi / Redmi", note: "Tüm modeller" },
  { name: "Huawei", note: "Tüm modeller" },
  { name: "Oppo", note: "Tüm modeller" },
  { name: "Diğer Android", note: "Tüm markalar" },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-brand" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function HakkimizdaPage() {
  const pc = getPageContent("hakkimizda");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="bg-surface-hero py-6 lg:py-8" aria-label="Sayfa başlığı">
          <div className="mx-auto max-w-[1330px] px-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/50">
                <li><Link href="/" className="hover:text-white/80 transition-colors">Anasayfa</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/kurumsal" className="hover:text-white/80 transition-colors">Kurumsal</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white/80">Hakkımızda</li>
              </ol>
            </nav>
            <h1 className="mt-3 text-3xl font-black text-white lg:text-4xl">{pc.hero.title}</h1>
            <p className="mt-2 text-[15px] text-white/60">{pc.hero.subtitle}</p>
          </div>
        </section>

        {/* Tanıtım */}
        <section className="bg-surface-page py-14">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <p className="mb-3 text-[12px] font-black uppercase tracking-widest text-brand">{pc.intro.badge}</p>
                <h2 className="text-2xl font-black leading-snug text-zinc-800 lg:text-3xl">
                  {pc.intro.heading.split("\n").map((line, i) => (
                    <span key={i}>{line}{i < pc.intro.heading.split("\n").length - 1 && <br />}</span>
                  ))}
                </h2>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-zinc-600">
                  {pc.intro.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <ul className="mt-6 space-y-2.5">
                  {pc.intro.checkList.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-zinc-700">
                      <CheckIcon /><span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/tamir-hizmetleri" className="inline-flex items-center gap-2 rounded-[4px] bg-brand px-6 py-3 text-[14px] font-black text-white transition hover:bg-brand-hover">
                    Tamir Hizmetlerimiz
                  </Link>
                  <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-[4px] border border-zinc-300 bg-white px-6 py-3 text-[14px] font-bold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50">
                    İletişime Geç
                  </Link>
                </div>
              </div>

              {pc.intro.image ? (
                <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ minHeight: 280 }}>
                  <Image src={pc.intro.image} alt={pc.intro.heading} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {pc.stats.map((s) => (
                    <div key={s.label} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 text-center">
                      <p className="text-[34px] font-black leading-none text-brand">{s.value}</p>
                      <p className="mt-2 text-[13px] font-semibold text-zinc-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {pc.intro.image && (
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {pc.stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 text-center">
                    <p className="text-[34px] font-black leading-none text-brand">{s.value}</p>
                    <p className="mt-2 text-[13px] font-semibold text-zinc-500">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Neden Biz */}
        <section className="border-y border-zinc-200 bg-white py-14">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mb-10 text-center">
              <p className="mb-2 text-[12px] font-black uppercase tracking-widest text-brand">Fark Yaratan Unsurlar</p>
              <h2 className="text-2xl font-black text-zinc-800 lg:text-3xl">Neden Vip İletişim?</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pc.whyUs.map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl bg-zinc-50 p-5 ring-1 ring-zinc-100">
                  <div className="mt-0.5 shrink-0 rounded-lg bg-brand/10 p-2.5 text-brand">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-black text-zinc-800">{item.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Markalar */}
        <section className="bg-surface-page py-14">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mb-8 text-center">
              <p className="mb-2 text-[12px] font-black uppercase tracking-widest text-brand">Tüm Markalar</p>
              <h2 className="text-2xl font-black text-zinc-800 lg:text-3xl">Hangi Cihazlara Bakıyoruz?</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {pc.brands.map((b) => (
                <div key={b.name} className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-zinc-100">
                  <p className="text-[14px] font-black text-zinc-800">{b.name}</p>
                  <p className="mt-0.5 text-[12px] text-zinc-400">{b.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-hero py-6">
          <div className="mx-auto max-w-[1330px] px-6 text-center">
            <h2 className="text-2xl font-black text-white lg:text-3xl">Cihazınızı Bize Emanet Edin</h2>
            <p className="mx-auto mt-3 max-w-[500px] text-[15px] text-white/60">
              Ön kontrol ve fiyat teklifi ücretsizdir. Hemen iletişime geçin.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/905052754540" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[4px] bg-whatsapp px-7 py-3.5 text-[15px] font-black text-white transition hover:bg-whatsapp-hover">
                WhatsApp&#39;tan Yaz
              </a>
              <a href="tel:+905052754540" className="inline-flex items-center gap-2 rounded-[4px] bg-white/10 px-7 py-3.5 text-[15px] font-black text-white transition hover:bg-white/20">
                +90 (505) 275 45 40
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
