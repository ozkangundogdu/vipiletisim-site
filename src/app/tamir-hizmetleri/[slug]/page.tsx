import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { services, getServiceBySlug } from "@/data/services";
import { generateServiceFaqs } from "@/lib/faq-generators";
import { getRepairContent } from "@/lib/repair-content";
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
    title: { absolute: `${service.title} | Vip İletişim Trabzon` },
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

  const { model, repairType, brand, repairKey, title } = service;
  const content = getRepairContent(model, brand, repairKey);
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
      warranty: "Anakart onarımlarında 90 gün işçilik garantisi",
    },
  };

  const relatedServices = services.filter((s) => s.slug !== slug && s.model === model).slice(0, 4);
  const otherServices = services.filter((s) => s.slug !== slug && s.model !== model && s.brand === brand).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <SiteHeader />
      <main className="mx-auto max-w-[1330px] px-6 py-10">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/tamir-hizmetleri" className="hover:text-zinc-800">Tamir Hizmetleri</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800">{title}</span>
        </nav>

        {/* H1 */}
        <h1 className="mb-4 text-3xl font-black text-zinc-900 lg:text-4xl">
          {title} — Trabzon Vip İletişim
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">

            {/* Giriş */}
            <div className="text-[16px] leading-relaxed text-zinc-600 space-y-4">
              {content.intro.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Belirtiler — H2 */}
            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">
                {content.symptomsHeading}
              </h2>
              <ul className="space-y-2">
                {content.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[15px] text-zinc-600">
                    <span className="mt-1 shrink-0 text-brand">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Neden Gerekli — H2 */}
            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">
                {content.whyHeading}
              </h2>
              <p className="text-[15px] leading-relaxed text-zinc-600">{content.why}</p>
            </section>

            {/* Tamir Süreci — H2 + H3 */}
            <section>
              <h2 className="mb-4 text-xl font-black text-zinc-900">
                {content.processHeading}
              </h2>
              <div className="space-y-3">
                {content.processSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[12px] font-black text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[14px] font-black text-zinc-800">{step.title}</h3>
                      <p className="mt-0.5 text-[13px] text-zinc-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Veri Güvenliği — H2 */}
            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">
                {content.dataSafeHeading}
              </h2>
              <p className="text-[15px] leading-relaxed text-zinc-600">{content.dataSafe}</p>
            </section>

            {/* Fiyat — H2 */}
            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">
                {content.priceHeading}
              </h2>
              <p className="text-[15px] leading-relaxed text-zinc-600">{content.price}</p>
            </section>

            {/* Uzman Notu */}
            {content.expertNote && (
              <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
                <h4 className="mb-1 text-[13px] font-black uppercase tracking-widest text-brand">Uzman Notu</h4>
                <p className="text-[14px] leading-relaxed text-zinc-700">{content.expertNote}</p>
              </div>
            )}

            {/* Neden Vip İletişim — H2 + H3 */}
            <section>
              <h2 className="mb-4 text-xl font-black text-zinc-900">
                Trabzon&apos;da {repairType} İçin Neden Vip İletişim?
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { title: 'Orijinal ve OEM Parça', desc: 'Her tamir işleminde orijinal veya OEM kalitesinde yedek parça kullanılır.' },
                  { title: 'Aynı Gün Teslim', desc: 'Çoğu tamir 30–60 dakikada tamamlanır; aynı gün teslim edilir.' },
                  { title: 'Ücretsiz Ön İnceleme', desc: 'İşleme başlamadan önce ücretsiz tanı yapılır; onaylamazsanız ücret alınmaz.' },
                  { title: '90 Gün İşçilik Garantisi', desc: 'Anakart onarımlarında ve kapsamlı tamirimlerde 90 gün garanti sunulur.' },
                  { title: '10+ Yıl Trabzon\'da', desc: 'Trabzon\'un köklü teknik servisi olarak binlerce başarılı tamir geçmişimiz var.' },
                  { title: 'Kargo ile Tamir', desc: 'Giresun, Rize, Artvin, Gümüşhane ve Bayburt\'tan kargo ile tamir imkânı.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                    <h3 className="mb-1 text-[14px] font-black text-zinc-800">{item.title}</h3>
                    <p className="text-[13px] text-zinc-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SSS — H2 */}
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

            {/* İlgili hizmetler */}
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
              <h3 className="mb-3 font-black text-zinc-900">Tamir Özeti</h3>
              <dl className="space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Cihaz</dt>
                  <dd className="font-bold text-zinc-800">{model}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Tamir Türü</dt>
                  <dd className="font-bold text-zinc-800">{repairType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Süre</dt>
                  <dd className="font-bold text-zinc-800">{service.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Ön İnceleme</dt>
                  <dd className="font-bold text-brand">Ücretsiz</dd>
                </div>
              </dl>
            </div>

            {otherServices.length > 0 && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                <h3 className="mb-3 font-black text-zinc-900">Diğer {brand === 'iphone' ? 'iPhone' : brand === 'samsung' ? 'Samsung' : 'Xiaomi'} Hizmetleri</h3>
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
            )}
          </aside>
        </div>

      </main>
      <SiteFooter />
    </>
  );
}
