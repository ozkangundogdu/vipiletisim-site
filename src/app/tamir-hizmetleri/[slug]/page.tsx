import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { services, getServiceBySlug } from "@/data/services";
import { getCustomServiceBySlug, getCustomServices } from "@/lib/custom-services";
import { generateServiceFaqs } from "@/lib/faq-generators";
import { getRepairContent } from "@/lib/repair-content";
import { getModelSpec } from "@/data/model-specs";
import { markdownToHtml } from "@/lib/markdown-to-html";
import { getSettings } from "@/lib/settings";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ArticleFaq } from "@/components/article-faq";
import { AuthorCard, type AuthorInfo } from "@/components/author-card";
import { TableOfContents, extractToc, slugifyHeading } from "@/components/table-of-contents";

type RepairPageOverride = {
  customTitle?: string;
  customDescription?: string;
  customContent?: string;
  coverImage?: string;
  publishedAt?: string;
  faqs?: { q: string; a: string }[];
};

function getRepairPageOverride(slug: string): RepairPageOverride {
  try {
    const file = path.join(process.cwd(), "content/repair-pages", `${slug}.json`);
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch { return {}; }
}

function getAuthor(): AuthorInfo {
  try {
    const file = path.join(process.cwd(), "content/pages/ekibimiz.json");
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    const member = data.members?.[0];
    if (member) return { name: member.name, title: member.title, experience: member.experience, bio: member.bio, image: member.image };
  } catch { /* fallback */ }
  return { name: "Fatih Cömert", title: "Baş Teknisyen & Eğitmen", experience: "15 Yıllık Deneyim", bio: "Vip İletişim baş teknisyeni.", image: "/images/team/fatih-comert.jpg" };
}

export async function generateStaticParams() {
  return [
    ...services.map((s) => ({ slug: s.slug })),
    ...getCustomServices().map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug) ?? getCustomServiceBySlug(slug);
  if (!service) return {};
  const override = getRepairPageOverride(slug);
  const title = override.customTitle || service.title;
  const description = override.customDescription || service.metaDescription;
  return {
    title: { absolute: `${title} | Vip İletişim Trabzon` },
    description,
    keywords: [
      `${service.model} ${service.repairType.toLowerCase()}`,
      `trabzon ${service.model.toLowerCase()} ${service.repairType.toLowerCase()}`,
      "trabzon telefon tamiri",
      "trabzon teknik servis",
      `${service.model.toLowerCase()} tamir fiyatı`,
      `${service.model.toLowerCase()} orijinal parça`,
    ],
    alternates: { canonical: `https://vipiletisim.com.tr/tamir-hizmetleri/${slug}` },
    openGraph: {
      title: `${title} | Vip İletişim Trabzon`,
      description,
      images: [{ url: override.coverImage || "/images/hero/phone-repair-hero.webp", width: 1200, height: 630 }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug) ?? getCustomServiceBySlug(slug);
  if (!service) notFound();

  const override = getRepairPageOverride(slug);
  const settings = getSettings();
  const author = getAuthor();
  const regions = settings.hizmetBolgeleri ?? [];

  const { model, repairType, repairKey, brand } = service;
  const title = override.customTitle || service.title;
  const modelSpec = getModelSpec(model);

  let templateContent = null;
  let useTemplate = true;
  try {
    templateContent = getRepairContent(model, brand as "iphone" | "samsung" | "xiaomi", repairKey, modelSpec);
  } catch {
    useTemplate = false;
  }

  const autoFaqs = generateServiceFaqs(model, repairType);
  const rawFaqs = (override.faqs && override.faqs.length > 0) ? override.faqs : autoFaqs;

  // Normalize: {question,answer} → {q,a}
  const faqs = rawFaqs.map((f) => {
    if ("q" in f) return f as { q: string; a: string };
    const fi = f as { question: string; answer: string };
    return { q: fi.question, a: fi.answer };
  });

  const customContentLive =
    override.customContent &&
    (!override.publishedAt || new Date(override.publishedAt) <= new Date());
  const customHtml = customContentLive ? markdownToHtml(override.customContent!) : null;

  // TOC: custom içerikten parse et, template içeriği için section başlıklarını kullan
  let tocItems = extractToc(override.customContent ?? "");
  if (tocItems.length < 2 && useTemplate && templateContent) {
    tocItems = [
      { id: slugifyHeading(templateContent.symptomsHeading), text: templateContent.symptomsHeading, level: 2 },
      { id: slugifyHeading(templateContent.whyHeading), text: templateContent.whyHeading, level: 2 },
      { id: slugifyHeading(templateContent.processHeading), text: templateContent.processHeading, level: 2 },
      { id: slugifyHeading(templateContent.dataSafeHeading), text: templateContent.dataSafeHeading, level: 2 },
      { id: slugifyHeading(templateContent.priceHeading), text: templateContent.priceHeading, level: 2 },
      { id: "neden-vip-iletisim", text: `Trabzon'da ${repairType} İçin Neden Vip İletişim?`, level: 2 },
      ...(faqs.length > 0 ? [{ id: "sikca-sorulan-sorular", text: "Sıkça Sorulan Sorular", level: 2 as const }] : []),
    ];
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
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
    areaServed: regions.length > 0 ? regions.map((r) => r.il) : ["Trabzon", "Giresun", "Rize", "Artvin", "Gümüşhane", "Bayburt"],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      warranty: "Anakart onarımlarında 90 gün işçilik garantisi",
    },
  };

  const relatedServices = services.filter((s) => s.slug !== slug && s.model === model).slice(0, 4);
  const otherServices = services.filter((s) => s.slug !== slug && s.model !== model && s.brand === brand).slice(0, 4);

  const displayFaqs = faqs.filter((f) => f.q && f.a);

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

        {/* Cover image (if custom) */}
        {override.coverImage && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img src={override.coverImage} alt={title} className="w-full h-56 object-cover" />
          </div>
        )}

        {/* H1 */}
        <h1 className="mb-4 text-3xl font-black text-zinc-900 lg:text-4xl">
          {title} — Trabzon Vip İletişim
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">

            {/* TOC */}
            <TableOfContents items={tocItems} />

            {/* Main content: custom markdown OR template */}
            {customHtml ? (
              <div
                className="repair-content"
                dangerouslySetInnerHTML={{ __html: customHtml }}
              />
            ) : useTemplate && templateContent ? (
              <>
                {/* Giriş */}
                <div className="text-[16px] leading-relaxed text-zinc-600 space-y-4">
                  {templateContent.intro.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                </div>

                {/* Belirtiler */}
                <section>
                  <h2 id={slugifyHeading(templateContent.symptomsHeading)} className="mb-3 scroll-mt-20 text-xl font-black text-zinc-900">
                    {templateContent.symptomsHeading}
                  </h2>
                  <ul className="space-y-2">
                    {templateContent.symptoms.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-[15px] text-zinc-600">
                        <span className="mt-1 shrink-0 text-brand">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Neden Gerekli */}
                <section>
                  <h2 id={slugifyHeading(templateContent.whyHeading)} className="mb-3 scroll-mt-20 text-xl font-black text-zinc-900">
                    {templateContent.whyHeading}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-zinc-600">{templateContent.why}</p>
                </section>

                {/* Tamir Süreci */}
                <section>
                  <h2 id={slugifyHeading(templateContent.processHeading)} className="mb-4 scroll-mt-20 text-xl font-black text-zinc-900">
                    {templateContent.processHeading}
                  </h2>
                  <div className="space-y-3">
                    {templateContent.processSteps.map((step, i) => (
                      <div key={i} className="flex gap-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[12px] font-black text-white">{i + 1}</span>
                        <div>
                          <h3 className="text-[14px] font-black text-zinc-800">{step.title}</h3>
                          <p className="mt-0.5 text-[13px] text-zinc-500">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Veri Güvenliği */}
                <section>
                  <h2 id={slugifyHeading(templateContent.dataSafeHeading)} className="mb-3 scroll-mt-20 text-xl font-black text-zinc-900">
                    {templateContent.dataSafeHeading}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-zinc-600">{templateContent.dataSafe}</p>
                </section>

                {/* Fiyat */}
                <section>
                  <h2 id={slugifyHeading(templateContent.priceHeading)} className="mb-3 scroll-mt-20 text-xl font-black text-zinc-900">
                    {templateContent.priceHeading}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-zinc-600">{templateContent.price}</p>
                </section>

                {/* Uzman Notu */}
                {templateContent.expertNote && (
                  <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
                    <h4 className="mb-1 text-[13px] font-black uppercase tracking-widest text-brand">Uzman Notu</h4>
                    <p className="text-[14px] leading-relaxed text-zinc-700">{templateContent.expertNote}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-[16px] leading-relaxed text-zinc-600">
                <p>Trabzon&apos;da {model} {repairType} hizmeti için Vip İletişim Teknik Servis&apos;e başvurabilirsiniz. Uzman teknisyen kadromuz ve orijinal yedek parça stoğumuzla hizmetinizdeyiz.</p>
              </div>
            )}

            {/* Neden Vip İletişim */}
            <section>
              <h2 id="neden-vip-iletisim" className="mb-4 scroll-mt-20 text-xl font-black text-zinc-900">
                Trabzon&apos;da {repairType} İçin Neden Vip İletişim?
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { title: "Orijinal ve OEM Parça", desc: "Her tamir işleminde orijinal veya OEM kalitesinde yedek parça kullanılır." },
                  { title: "Aynı Gün Teslim", desc: "Çoğu tamir 30–60 dakikada tamamlanır; aynı gün teslim edilir." },
                  { title: "Ücretsiz Ön İnceleme", desc: "İşleme başlamadan önce ücretsiz tanı yapılır; onaylamazsanız ücret alınmaz." },
                  { title: "90 Gün İşçilik Garantisi", desc: "Anakart onarımlarında ve kapsamlı tamirimlerde 90 gün garanti sunulur." },
                  { title: "10+ Yıl Trabzon'da", desc: "Trabzon'un köklü teknik servisi olarak binlerce başarılı tamir geçmişimiz var." },
                  { title: "Kargo ile Tamir", desc: `${regions.filter(r => r.il !== "Trabzon").map(r => r.il).join(", ")} ve çevre illerden kargo ile tamir imkânı.` },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                    <h3 className="mb-1 text-[14px] font-black text-zinc-800">{item.title}</h3>
                    <p className="text-[13px] text-zinc-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Yazar Kartı */}
            <AuthorCard author={author} />

            {/* SSS */}
            {displayFaqs.length > 0 && (
              <div id="sikca-sorulan-sorular" className="scroll-mt-20">
                <ArticleFaq
                  faqs={displayFaqs}
                  title={`${model} ${repairType} Hakkında Sıkça Sorulan Sorular`}
                />
              </div>
            )}

            {/* İlgili Hizmetler */}
            {relatedServices.length > 0 && (
              <section>
                <h2 className="mb-3 text-xl font-black text-zinc-900">{model} için Diğer Tamir Hizmetleri</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/tamir-hizmetleri/${s.slug}`} className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-[13px] font-bold text-zinc-800 hover:border-accent hover:bg-white">
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
              <a href={`tel:+${settings.telefonRaw}`} className="mb-2 flex items-center gap-2 rounded-lg bg-accent px-4 py-3 font-bold text-zinc-900 hover:bg-accent-hover">
                📞 {settings.telefon}
              </a>
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-3 font-bold text-white hover:bg-whatsapp-hover">
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
                  <dt className="text-zinc-500">İşlem</dt>
                  <dd className="font-bold text-zinc-800">{repairType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Süre</dt>
                  <dd className="font-bold text-zinc-800">{service.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Lokasyon</dt>
                  <dd className="font-bold text-zinc-800">Trabzon Merkez</dd>
                </div>
              </dl>
            </div>

            {/* Hizmet Bölgeleri */}
            {regions.length > 0 && (
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <p className="mb-3 text-[13px] font-black uppercase tracking-wide text-zinc-400">
                  Hizmet Bölgelerimiz
                </p>
                <ul className="space-y-2">
                  {regions.map((r) => (
                    <li key={r.il} className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-zinc-800 flex items-center gap-1.5">
                        <span className="text-brand">📍</span> {r.il}
                      </span>
                      <span className="text-[12px] text-zinc-400">{r.detay}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {modelSpec && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                <h3 className="mb-3 font-black text-zinc-900">Model Özellikleri</h3>
                <dl className="space-y-2 text-[13px]">
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-500 shrink-0">İşlemci</dt>
                    <dd className="font-bold text-zinc-800 text-right">{modelSpec.chip}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-500 shrink-0">Yıl</dt>
                    <dd className="font-bold text-zinc-800">{modelSpec.year}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-500 shrink-0">Ekran</dt>
                    <dd className="font-bold text-zinc-800 text-right">{modelSpec.screen}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-500 shrink-0">Batarya</dt>
                    <dd className="font-bold text-zinc-800">{modelSpec.battery} mAh</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-500 shrink-0">Konektör</dt>
                    <dd className="font-bold text-zinc-800">{modelSpec.port}</dd>
                  </div>
                  {modelSpec.ip && (
                    <div className="flex justify-between gap-2">
                      <dt className="text-zinc-500 shrink-0">Su Dayanımı</dt>
                      <dd className="font-bold text-zinc-800">{modelSpec.ip}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {otherServices.length > 0 && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                <h3 className="mb-3 font-black text-zinc-900">Diğer Hizmetler</h3>
                <ul className="space-y-1.5">
                  {otherServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/tamir-hizmetleri/${s.slug}`} className="text-[13px] text-blue-600 hover:underline">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
