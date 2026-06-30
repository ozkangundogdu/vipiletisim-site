import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPageContent } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Uzman Kadromuz — Trabzon Vip İletişim",
  description:
    "Trabzon Vip İletişim teknik servis ekibi: Mesleki Yeterlilik, Ustalık ve Usta Öğreticilik belgeli, CPU seviyesinde tamir yapan uzman teknisyenler.",
  keywords: [
    "trabzon telefon tamiri uzman teknisyen",
    "vip iletişim ekip trabzon",
    "iphone anakart tamiri uzmanı trabzon",
    "cpu seviyesi iphone tamiri trabzon",
    "sertifikalı telefon teknisyeni trabzon",
  ],
  alternates: { canonical: "https://vipiletisim.com.tr/kurumsal/ekibimiz" },
  openGraph: {
    title: "Uzman Kadromuz | Trabzon Vip İletişim",
    description:
      "Trabzon Vip İletişim teknik servis ekibi. CPU seviyesi tamir, anakart onarımı ve ekran değişiminde uzman sertifikalı teknisyenler.",
    url: "https://vipiletisim.com.tr/kurumsal/ekibimiz",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://vipiletisim.com.tr" },
    { "@type": "ListItem", position: 2, name: "Kurumsal", item: "https://vipiletisim.com.tr/kurumsal" },
    { "@type": "ListItem", position: 3, name: "Uzman Kadromuz", item: "https://vipiletisim.com.tr/kurumsal/ekibimiz" },
  ],
};

export default function EkibimizPage() {
  const pc = getPageContent("ekibimiz");

  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Vip İletişim Teknik Kadrosu",
    itemListElement: pc.members.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: m.name,
        jobTitle: m.title,
        description: m.bio,
        worksFor: { "@type": "Organization", name: "Trabzon Vip İletişim" },
        ...(m.image ? { image: `https://vipiletisim.com.tr${m.image}` } : {}),
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }} />

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
                <li className="text-white/80">Uzman Kadromuz</li>
              </ol>
            </nav>
            <h1 className="mt-3 text-3xl font-black text-white lg:text-4xl">{pc.hero.title}</h1>
            <p className="mt-2 text-[15px] text-white/60">{pc.hero.subtitle}</p>
          </div>
        </section>

        {/* Ekip Kartları */}
        <section className="bg-surface-page py-16">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {pc.members.map((member) => (
                <article
                  key={member.name}
                  className="flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100 overflow-hidden"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  {/* Fotoğraf */}
                  <div className="relative h-72 w-full bg-zinc-100 overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={`${member.name} — ${member.title}, Vip İletişim Trabzon`}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: member.imagePosition ?? "center top" }}
                        itemProp="image"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-300">
                        <svg viewBox="0 0 24 24" className="h-24 w-24" fill="currentColor" aria-hidden="true">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span className="text-sm font-black text-zinc-400">{member.name}</span>
                        <span className="text-xs text-zinc-300">Fotoğraf yakında eklenecek</span>
                      </div>
                    )}
                  </div>

                  {/* İçerik */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* İsim & Ünvan */}
                    <div className="mb-5">
                      <h2 className="text-xl font-black text-zinc-800" itemProp="name">{member.name}</h2>
                      <p className="text-[13px] font-bold text-brand mt-1" itemProp="jobTitle">{member.title}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-600">
                          🎓 {member.education}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold text-brand">
                          ⭐ {member.experience}
                        </span>
                      </div>
                    </div>

                    {/* Biyografi */}
                    <p className="text-[13px] leading-relaxed text-zinc-500 mb-5" itemProp="description">
                      {member.bio}
                    </p>

                    {/* Belgeler */}
                    <div className="mb-5">
                      <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-2.5">Sahip Olduğu Belgeler</p>
                      <ul className="space-y-1.5">
                        {member.certificates.map((cert) => (
                          <li key={cert} className="flex items-start gap-2 text-[12px] text-zinc-600">
                            <svg viewBox="0 0 20 20" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                            </svg>
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Uzmanlık */}
                    <div className="mt-auto pt-4 border-t border-zinc-100">
                      <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-2.5">Uzmanlık Alanları</p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.specialties.map((s) => (
                          <span key={s} className="rounded-md bg-zinc-50 border border-zinc-200 px-2.5 py-1 text-[11px] font-bold text-zinc-600">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-hero py-10">
          <div className="mx-auto max-w-[1330px] px-6 text-center">
            <h2 className="text-2xl font-black text-white lg:text-3xl">Uzman Ekibimizle Tanışın</h2>
            <p className="mx-auto mt-3 max-w-[500px] text-[15px] text-white/60">
              Cihazınızı en deneyimli ellere teslim etmek için hemen iletişime geçin.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/905052754540" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[4px] bg-whatsapp px-7 py-3.5 text-[15px] font-black text-white transition hover:bg-whatsapp-hover">
                WhatsApp&#39;tan Yaz
              </a>
              <a href="tel:+905052754540"
                className="inline-flex items-center gap-2 rounded-[4px] bg-white/10 px-7 py-3.5 text-[15px] font-black text-white transition hover:bg-white/20">
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
