import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { services, getServiceBySlug } from "@/data/services";
import { generateServiceFaqs } from "@/lib/faq-generators";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Vip İletişim Trabzon`,
    description: service.metaDescription,
    keywords: [
      `${service.model} ${service.repairType.toLowerCase()}`,
      `trabzon ${service.model.toLowerCase()} ${service.repairType.toLowerCase()}`,
      `trabzon telefon tamiri`,
      `trabzon teknik servis`,
      `${service.model.toLowerCase()} tamir fiyatı`,
      `${service.model.toLowerCase()} orijinal parça`,
    ],
    alternates: {
      canonical: `https://vipiletisim.com.tr/tamir-hizmetleri/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Vip İletişim Trabzon`,
      description: service.metaDescription,
      images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630 }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { model, repairType, title } = service;
  const faqs = generateServiceFaqs(model, repairType);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://vipiletisim.com.tr/" },
      { "@type": "ListItem", position: 2, name: "Tamir Hizmetleri", item: "https://vipiletisim.com.tr/tamir-hizmetleri" },
      { "@type": "ListItem", position: 3, name: title, item: `https://vipiletisim.com.tr/tamir-hizmetleri/${slug}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: service.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Vip İletişim Teknik Servis",
      address: { "@type": "PostalAddress", addressLocality: "Trabzon", addressCountry: "TR" },
    },
    areaServed: ["Trabzon", "Giresun", "Rize", "Artvin", "Gümüşhane", "Bayburt"],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      warranty: "Anakart onarımlarında 180 gün işçilik garantisi",
    },
  };

  const relatedServices = services.filter((s) => s.slug !== slug && s.model === model).slice(0, 4);
  const otherServices = services.filter((s) => s.slug !== slug && s.model !== model).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <SiteHeader />
      <main className="mx-auto max-w-[1330px] px-6 py-10">

        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/tamir-hizmetleri" className="hover:text-zinc-800">Tamir Hizmetleri</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800">{title}</span>
        </nav>

        <h1 className="mb-4 text-3xl font-black text-zinc-900 lg:text-4xl">
          {title} — Trabzon Vip İletişim
        </h1>

        <p className="mb-8 text-[16px] leading-relaxed text-zinc-600">
          Trabzon'da <strong>{title}</strong> hizmeti için Vip İletişim Teknik Servis'i tercih edin.
          Uzman kadromuz ve orijinal yedek parçalarımız ile {model} cihazınızın {repairType.toLowerCase()} işlemini
          ortalama 45–60 dakikada tamamlıyor, orijinal parça ve uzman kadro güvencesiyle teslim ediyoruz.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">

            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">{model} {repairType} Neden Gerekir?</h2>
              <p className="text-[15px] leading-relaxed text-zinc-600">
                {model} cihazlarda {repairType.toLowerCase()} ihtiyacı genellikle fiziksel darbe, uzun süreli kullanım
                veya üretim hatalarından kaynaklanır. Zamanında müdahale edilmeyen arızalar cihazınızın diğer
                bileşenlerine zarar verebilir. Vip İletişim olarak Trabzon'da profesyonel {repairType.toLowerCase()}
                hizmeti sunarak cihazınızı fabrika kalitesine döndürüyoruz.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">Arızanın Belirtileri</h2>
              <ul className="list-disc space-y-2 pl-5 text-[15px] text-zinc-600">
                <li>Cihazda gözle görülür hasar veya işlev bozukluğu</li>
                <li>Ani kapanmalar veya tepkisizlik</li>
                <li>Dokunmatik, ekran veya bağlantı sorunları</li>
                <li>Şişme, ısınma veya beklenmedik davranışlar</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">Tamir Sırasında Verilerim Silinir mi?</h2>
              <p className="text-[15px] leading-relaxed text-zinc-600">
                {repairType} işlemi sırasında cihazınızdaki veriler <strong>silinmez</strong>. İşlem yalnızca
                donanımsal değişim içerir; yazılıma müdahale edilmez. Bununla birlikte işlem öncesinde
                verilerinizi yedeklemenizi öneririz.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">Tamir Süreci ve Fiyatı</h2>
              <p className="text-[15px] leading-relaxed text-zinc-600">
                {model} {repairType.toLowerCase()} işlemi servisimize ulaştıktan sonra ortalama <strong>45–60 dakika</strong> sürer.
                Ücret cihazın durumuna göre belirlenir; işleme başlamadan önce size net fiyat bildiriyoruz.
                Onaylamazsanız herhangi bir ücret talep etmiyoruz. Fiyat bilgisi için bizi arayın veya WhatsApp'tan yazın.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">Neden Vip İletişim Trabzon?</h2>
              <ul className="list-disc space-y-2 pl-5 text-[15px] text-zinc-600">
                <li>Trabzon'da 10+ yıllık teknik servis deneyimi</li>
                <li>Orijinal ve OEM kalitesinde yedek parça kullanımı</li>
                <li>Anakart onarımlarında 180 gün işçilik garantisi</li>
                <li>Aynı gün teslim</li>
                <li>Ücretsiz ön inceleme ve fiyat bildirimi</li>
                <li>Giresun, Rize, Artvin, Gümüşhane, Bayburt'tan kargo ile tamir imkânı</li>
              </ul>
            </section>

            {/* Sıkça Sorulan Sorular — FAQ JSON-LD + AI SEO */}
            <section aria-label="Sıkça Sorulan Sorular">
              <h2 className="mb-5 text-xl font-black text-zinc-900">
                {model} {repairType} Hakkında Sıkça Sorulan Sorular
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    suppressHydrationWarning
                    className="group rounded-xl border border-zinc-200 bg-zinc-50 open:bg-white"
                  >
                    <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-zinc-900 marker:hidden list-none">
                      <span>{faq.question}</span>
                      <span className="shrink-0 text-accent text-lg transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-zinc-200 px-5 py-4 text-[14px] leading-relaxed text-zinc-600">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {relatedServices.length > 0 && (
              <section>
                <h2 className="mb-3 text-xl font-black text-zinc-900">{model} için Diğer Tamir Hizmetleri</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/tamir-hizmetleri/${s.slug}`}
                        className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-[13px] font-bold text-zinc-800 hover:border-accent hover:bg-white"
                      >
                        <span className="text-accent">→</span> {s.repairType}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>

          {/* Kenar çubuğu */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="mb-3 font-black text-zinc-900">Hemen İletişime Geç</h3>
              <a
                href="tel:+905052754540"
                className="mb-2 flex items-center gap-2 rounded-lg bg-accent px-4 py-3 font-bold text-zinc-900 hover:bg-accent-hover"
              >
                📞 +90 (505) 275 45 40
              </a>
              <a
                href="https://wa.me/905052754540"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-3 font-bold text-white hover:bg-whatsapp-hover"
              >
                💬 WhatsApp ile Yaz
              </a>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="mb-3 font-black text-zinc-900">Diğer Hizmetler</h3>
              <ul className="space-y-2">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/tamir-hizmetleri/${s.slug}`} className="text-[13px] text-blue-600 hover:underline">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/tamir-hizmetleri" className="mt-3 inline-block text-[13px] font-bold text-accent hover:underline">
                Tüm Hizmetler →
              </Link>
            </div>
          </aside>
        </div>

      </main>
      <SiteFooter />
    </>
  );
}
