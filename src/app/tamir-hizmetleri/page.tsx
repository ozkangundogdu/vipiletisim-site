import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RepairWizard } from "@/components/repair-wizard";

export const metadata: Metadata = {
  title: "Trabzon Telefon Tamir Hizmetleri",
  description:
    "Trabzon'da iPhone, Samsung ve Xiaomi ekran, batarya, anakart tamiri. Uzman kadro, orijinal parça, aynı gün teslim. Vip İletişim Teknik Servis.",
  keywords: [
    "trabzon telefon tamiri",
    "trabzon iphone ekran değişimi",
    "trabzon samsung tamir",
    "trabzon xiaomi tamir",
    "trabzon anakart tamiri",
    "trabzon cep telefonu teknik servis",
  ],
  alternates: { canonical: "https://vipiletisim.com.tr/tamir-hizmetleri" },
  openGraph: {
    title: "Trabzon Telefon Tamir Hizmetleri | Vip İletişim",
    description:
      "Trabzon'da iPhone, Samsung ve Xiaomi için profesyonel tamir. Ekran, batarya, anakart ve daha fazlası. Aynı gün teslim.",
    url: "https://vipiletisim.com.tr/tamir-hizmetleri",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://vipiletisim.com.tr" },
    { "@type": "ListItem", position: 2, name: "Tamir Hizmetleri", item: "https://vipiletisim.com.tr/tamir-hizmetleri" },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Trabzon Telefon Tamir Hizmetleri",
  url: "https://vipiletisim.com.tr/tamir-hizmetleri",
  description: "Trabzon Vip İletişim Teknik Servis tüm telefon tamir hizmetleri.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://vipiletisim.com.tr/#localbusiness",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Trabzon'da iPhone ekran değişimi ne kadar sürer?",
      acceptedAnswer: { "@type": "Answer", text: "iPhone ekran değişimi ortalama 30–60 dakikada tamamlanır. Cihazınızı aynı gün teslim alırsınız." },
    },
    {
      "@type": "Question",
      name: "Samsung batarya değişimi için randevu gerekiyor mu?",
      acceptedAnswer: { "@type": "Answer", text: "Randevu gerekmez, kapıdan gelebilirsiniz. Batarya değişimi 20–40 dakika sürer." },
    },
    {
      "@type": "Question",
      name: "Tamir öncesi fiyat öğrenebilir miyim?",
      acceptedAnswer: { "@type": "Answer", text: "Evet. Ücretsiz ön inceleme yapıyor, işleme başlamadan önce size net fiyat bildiriyoruz. Onaylamazsanız ücret almıyoruz." },
    },
    {
      "@type": "Question",
      name: "Anakart tamirinde garanti var mı?",
      acceptedAnswer: { "@type": "Answer", text: "Anakart tamiri ve kapsamlı onarımlarda 90 gün işçilik garantisi uyguluyoruz." },
    },
  ],
};


const faqs = [
  { q: "Trabzon'da iPhone ekran değişimi ne kadar sürer?", a: "iPhone ekran değişimi ortalama 30–60 dakikada tamamlanır. Cihazınızı aynı gün teslim alırsınız." },
  { q: "Samsung batarya değişimi için randevu gerekiyor mu?", a: "Randevu gerekmez, kapıdan gelebilirsiniz. Batarya değişimi 20–40 dakika sürer." },
  { q: "Tamir öncesi fiyat öğrenebilir miyim?", a: "Evet. Ücretsiz ön inceleme yapıyor, işleme başlamadan önce size net fiyat bildiriyoruz. Onaylamazsanız ücret almıyoruz." },
  { q: "Anakart tamirinde garanti var mı?", a: "Anakart tamiri ve kapsamlı onarımlarda 90 gün işçilik garantisi uyguluyoruz." },
];

export default function ServicesListPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SiteHeader />

      <main>
        {/* ── Hero ── */}
        <section className="bg-surface-hero py-6 lg:py-8">
          <div className="mx-auto max-w-[1330px] px-6">
            <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-zinc-400">
              <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Tamir Hizmetleri</span>
            </nav>
            <h1 className="text-3xl font-black text-white lg:text-4xl">
              Trabzon Telefon Tamir Hizmetleri
            </h1>
            <p className="mt-3 max-w-2xl text-[16px] text-white/70">
              iPhone, Samsung ve Xiaomi dahil tüm marka ve modellerde profesyonel tamir.
              Ücretsiz ön inceleme, orijinal parça, aynı gün teslim.
            </p>
          </div>
        </section>

        {/* ── Arıza Türleri — 3 Adımlı Seçici ── */}
        <section id="wizard" className="border-b border-zinc-100 bg-white py-12">
          <div className="mx-auto max-w-[1330px] px-6">
            <h2 className="mb-2 text-xl font-black text-zinc-900">Arıza Türüne Göre Tamir</h2>
            <p className="mb-6 text-[14px] text-zinc-500">Arızanızı seçin → Markanızı seçin → Modelinizi seçin → İlgili sayfaya gidin.</p>
            <RepairWizard />
          </div>
        </section>


        {/* ── Neden Biz ── */}
        <section className="bg-white py-10">
          <div className="mx-auto max-w-[1330px] px-6">
            <h2 className="mb-6 text-center text-xl font-black text-zinc-900">Neden Vip İletişim?</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { icon: "🛠️", title: "10+ Yıl Deneyim", desc: "Trabzon'un köklü teknik servisi" },
                { icon: "📦", title: "Orijinal Parça", desc: "OEM kalitesinde yedek parça" },
                { icon: "⚡", title: "Aynı Gün Teslim", desc: "Çoğu tamir 30–60 dk" },
                { icon: "✅", title: "90 Gün Garanti", desc: "Anakart tamirinde işçilik garantisi" },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-zinc-100 bg-zinc-50 p-5 text-center">
                  <div className="mb-2 text-3xl">{f.icon}</div>
                  <p className="text-[14px] font-black text-zinc-900">{f.title}</p>
                  <p className="mt-1 text-[12px] text-zinc-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SSS ── */}
        <section className="border-t border-zinc-100 bg-zinc-50 py-12">
          <div className="mx-auto max-w-[900px] px-6">
            <h2 className="mb-6 text-center text-xl font-black text-zinc-900">Sıkça Sorulan Sorular</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  suppressHydrationWarning
                  className="group rounded-xl border border-zinc-200 bg-white open:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-zinc-900 marker:hidden">
                    <span>{faq.q}</span>
                    <span className="shrink-0 text-accent text-lg transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="border-t border-zinc-100 px-5 py-4 text-[14px] leading-relaxed text-zinc-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-surface-hero py-6">
          <div className="mx-auto max-w-[1330px] px-6 text-center">
            <h2 className="text-2xl font-black text-white">Cihazınızın Sorunu Ne?</h2>
            <p className="mt-2 text-white/70">Ücretsiz ön inceleme için bizi arayın veya WhatsApp'tan yazın.</p>
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
