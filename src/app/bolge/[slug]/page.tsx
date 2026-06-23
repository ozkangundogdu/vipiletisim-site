import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { cities, getCityBySlug } from "@/data/cities";
import { services } from "@/data/services";
import { generateCityFaqs } from "@/lib/faq-generators";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: `${city.title} | Vip İletişim Trabzon`,
    description: city.metaDescription,
    keywords: [
      `${city.name.toLowerCase()} iPhone tamiri`,
      `${city.name.toLowerCase()} telefon tamiri`,
      `${city.name.toLowerCase()} ekran değişimi`,
      `${city.name.toLowerCase()} teknik servis`,
      `${city.il.toLowerCase()} telefon tamiri`,
      `trabzon iPhone tamiri`,
    ],
    alternates: {
      canonical: `https://vipiletisim.com.tr/bolge/${slug}`,
    },
    openGraph: {
      title: `${city.title} | Vip İletişim Trabzon`,
      description: city.metaDescription,
      images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630 }],
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const { name, il, title } = city;
  const isKargo = il !== "Trabzon";
  const faqs = generateCityFaqs(name, il);

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
      { "@type": "ListItem", position: 2, name: "Hizmet Bölgeleri", item: "https://vipiletisim.com.tr/bolge" },
      { "@type": "ListItem", position: 3, name: title, item: `https://vipiletisim.com.tr/bolge/${slug}` },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vip İletişim Teknik Servis",
    description: `${name} ve çevresinde iPhone, Samsung, Xiaomi, Huawei telefon tamiri. Orijinal parça, uzman kadro.`,
    address: { "@type": "PostalAddress", addressLocality: "Trabzon", addressRegion: "Trabzon", addressCountry: "TR" },
    areaServed: [name, il, "Trabzon"],
    telephone: "+904621234567",
    openingHours: "Mo-Sa 09:00-19:00",
  };

  const popularServiceList = [
    services.find(s => s.slug === "iphone-16-ekran-degisimi"),
    services.find(s => s.slug === "iphone-14-batarya-degisimi"),
    services.find(s => s.slug === "iphone-x-ekran-degisimi"),
    services.find(s => s.slug === "samsung-galaxy-s24-ekran-degisimi"),
    services.find(s => s.slug === "samsung-batarya-degisimi"),
    services.find(s => s.slug === "iphone-sarj-soketi-tamiri"),
    services.find(s => s.slug === "xiaomi-ekran-degisimi"),
    services.find(s => s.slug === "iphone-kamera-cami-degisimi"),
  ].filter(Boolean) as typeof services;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <SiteHeader />
      <main className="mx-auto max-w-[1330px] px-6 py-10">

        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/bolge" className="hover:text-zinc-800">Hizmet Bölgeleri</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800">{title}</span>
        </nav>

        <h1 className="mb-4 text-3xl font-black text-zinc-900 lg:text-4xl">
          {name} iPhone ve Cep Telefonu Tamiri | Vip İletişim
        </h1>

        <p className="mb-8 text-[16px] leading-relaxed text-zinc-600">
          {isKargo
            ? `${name} (${il}) ilinden Trabzon'daki Vip İletişim Teknik Servis'e kargo ile telefon gönderip aynı gün tamir ettirip geri alabilirsiniz. iPhone, Samsung, Xiaomi, Huawei ve Oppo dahil tüm marka ve modellerde orijinal parça ve uzman kadroyla profesyonel tamir hizmeti sunuyoruz.`
            : `${name}'da telefon tamiri için Vip İletişim Teknik Servis'e gelin. iPhone, Samsung, Xiaomi, Huawei ve Oppo dahil tüm marka ve modellerde uzman kadromuz ve orijinal yedek parçalarımız ile hizmet veriyoruz. Aynı gün teslim, ücretsiz ön inceleme.`
          }
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">

            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">{name}'da Hangi Tamir Hizmetleri Sunulur?</h2>
              <ul className="grid grid-cols-2 gap-2">
                {["Ekran Değişimi", "Batarya Değişimi", "Şarj Soketi Tamiri", "Kamera Tamiri", "Hoparlör Tamiri", "Mikrofon Tamiri", "Home Tuş Değişimi", "Arka Kapak Değişimi"].map((h) => (
                  <li key={h} className="flex items-center gap-2 text-[14px] text-zinc-700">
                    <span className="text-accent">✓</span> {h}
                  </li>
                ))}
              </ul>
            </section>

            {isKargo && (
              <section>
                <h2 className="mb-3 text-xl font-black text-zinc-900">{name}'dan Kargo ile Nasıl Telefon Gönderilir?</h2>
                <ol className="list-decimal space-y-2 pl-5 text-[15px] text-zinc-600">
                  <li>WhatsApp veya telefon ile bize ulaşın, arıza bilgisini paylaşın.</li>
                  <li>Cihazınızı güvenli şekilde paketleyerek kargoya verin.</li>
                  <li>Servisimize ulaşan cihaz aynı gün tamir edilir.</li>
                  <li>Tamir sonrası cihazınız {name} adresinize kargo ile gönderilir.</li>
                </ol>
              </section>
            )}

            <section>
              <h2 className="mb-3 text-xl font-black text-zinc-900">Neden Vip İletişim Trabzon'u Tercih Etmelisiniz?</h2>
              <ul className="list-disc space-y-2 pl-5 text-[15px] text-zinc-600">
                <li>Trabzon'da 10+ yıllık teknik servis deneyimi</li>
                <li>Orijinal ve OEM kalitesinde yedek parça</li>
                <li><strong>Anakart onarımlarında 180 gün işçilik garantisi</strong></li>
                <li>Aynı gün tamir ve teslim</li>
                <li>Ücretsiz ön inceleme</li>
                {isKargo && <li>{name}'dan ücretsiz kargo imkânı (koşullar için arayın)</li>}
              </ul>
            </section>

            {/* Sıkça Sorulan Sorular — AI SEO / AEO / GEO */}
            <section aria-label="Sıkça Sorulan Sorular">
              <h2 className="mb-5 text-xl font-black text-zinc-900">
                {name} Telefon Tamiri Hakkında Sıkça Sorulan Sorular
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

          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="mb-3 font-black text-zinc-900">Hemen İletişime Geç</h3>
              <a
                href="tel:+904621234567"
                className="mb-2 flex items-center gap-2 rounded-lg bg-accent px-4 py-3 font-bold text-zinc-900 hover:bg-accent-hover"
              >
                📞 +90 (462) 123 45 67
              </a>
              <a
                href="https://wa.me/904621234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-3 font-bold text-white hover:bg-whatsapp-hover"
              >
                💬 WhatsApp ile Yaz
              </a>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="mb-3 font-black text-zinc-900">Popüler Tamir Hizmetleri</h3>
              <ul className="space-y-2">
                {popularServiceList.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/tamir-hizmetleri/${s.slug}`} className="text-[13px] text-blue-600 hover:underline">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="mb-3 font-black text-zinc-900">Diğer Bölgeler</h3>
              <ul className="space-y-2">
                {cities.filter(c => c.slug !== slug && c.il === il).slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/bolge/${c.slug}`} className="text-[13px] text-blue-600 hover:underline">
                      {c.name} Telefon Tamiri
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/bolge" className="mt-3 inline-block text-[13px] font-bold text-accent hover:underline">
                Tüm Bölgeler →
              </Link>
            </div>
          </aside>
        </div>

      </main>
      <SiteFooter />
    </>
  );
}
