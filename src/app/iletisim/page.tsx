import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "İletişim — Trabzon Telefon Servisi Adresi",
  description:
    "Vip İletişim Teknik Servis iletişim bilgileri. Çarşı Mah. Uzun Sokak Kolotoğlu Pasajı Kat 1 Ortahisar/Trabzon. Tel: +90 (505) 275 45 40. WhatsApp ile de ulaşabilirsiniz.",
  keywords: [
    "trabzon telefon tamiri iletişim",
    "vip iletişim trabzon adres",
    "trabzon teknik servis konum",
    "ortahisar telefon tamiri adres",
    "trabzon cep telefonu servisi iletişim",
  ],
  alternates: {
    canonical: "https://vipiletisim.com.tr/iletisim",
  },
  openGraph: {
    title: "İletişim | Trabzon Vip İletişim",
    description:
      "Trabzon'da iPhone ve cep telefonu tamiri için bize ulaşın. Çarşı Mah. Uzun Sokak Kolotoğlu Pasajı Kat 1 Ortahisar/Trabzon.",
    url: "https://vipiletisim.com.tr/iletisim",
    images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630, alt: "Vip İletişim Trabzon İletişim" }],
  },
};

const faqItems = [
  {
    q: "Çevre illerden en hızlı nasıl cihaz gönderebilirim?",
    a: "Giresun, Rize, Artvin, Gümüşhane ve çevre illerden Trabzon'a gelen minibüs veya otobüslere elden cihazınızı teslim edebilirsiniz. Bize otobüs firması, plaka, gelecek gün ve saat bilgisini WhatsApp'tan iletmeniz yeterlidir; cihazınızı varışta biz teslim alırız.",
  },
  {
    q: "Kargo ile tamir gönderebilir miyim?",
    a: "Evet, kargo ile gönderebilirsiniz. Kargo adresimiz: Çarşı Mahallesi Uzun Sokak Kolotoğlu Pasajı Kat 1 Vip İletişim Ortahisar/Trabzon. Göndermeden önce WhatsApp üzerinden bilgi vermenizi öneririz; böylece cihazınızı takip edebiliriz.",
  },
  {
    q: "Trabzon dışından tamir yaptırabilir miyim?",
    a: "Evet. Giresun, Rize, Artvin, Gümüşhane ve Bayburt başta olmak üzere Doğu Karadeniz'in tüm illerinden müşterilerimiz otobüs veya kargo yoluyla cihaz göndermektedir. Uzak ilçelerden gelen cihazlar için hızlandırılmış işlem önceliği uyguluyoruz.",
  },
  {
    q: "Tamir süresi ne kadar?",
    a: "Ekran değişimi, batarya değişimi ve şarj soketi tamiri gibi standart işlemlerin büyük çoğunluğu aynı gün tamamlanır. Anakart onarımı gibi kapsamlı tamirler 1–3 iş günü sürebilir; süre hakkında sizi önceden bilgilendiririz.",
  },
  {
    q: "Garanti veriyor musunuz?",
    a: "Evet. Anakart tamiri ve benzeri kapsamlı onarımlarda 90 gün işçilik garantisi uyguluyoruz.",
  },
  {
    q: "Çalışma saatleriniz neler?",
    a: "Pazartesi – Cumartesi 09:00 – 19:00 arası hizmet veriyoruz. Pazar günleri kapalıyız.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://vipiletisim.com.tr" },
    { "@type": "ListItem", position: 2, name: "İletişim", item: "https://vipiletisim.com.tr/iletisim" },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "İletişim — Trabzon Vip İletişim",
  url: "https://vipiletisim.com.tr/iletisim",
  description: "Trabzon Vip İletişim Teknik Servis iletişim bilgileri, adres ve konum.",
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": "https://vipiletisim.com.tr/#localbusiness",
  },
};

const serviceAreas = [
  { label: "Trabzon", href: "/bolge/trabzon-iphone-tamiri" },
  { label: "Giresun", href: "/bolge/giresun-telefon-tamiri" },
  { label: "Rize", href: "/bolge/rize-iphone-tamiri" },
  { label: "Artvin", href: "/bolge/artvin-telefon-tamiri" },
  { label: "Gümüşhane", href: "/bolge/gumushane-telefon-tamiri" },
  { label: "Bayburt", href: "/bolge/bayburt-telefon-tamiri" },
];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-whatsapp" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-[12px] font-black uppercase tracking-widest text-zinc-400">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

export default function IletisimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <SiteHeader />

      <main>
        {/* Hero Banner */}
        <section className="bg-surface-hero py-6 lg:py-8" aria-label="Sayfa başlığı">
          <div className="mx-auto max-w-[1330px] px-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-[13px] text-white/50">
                <li>
                  <Link href="/" className="hover:text-white/80 transition-colors">Anasayfa</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/80">İletişim</li>
              </ol>
            </nav>
            <h1 className="mt-3 text-3xl font-black text-white lg:text-4xl">
              Trabzon Telefon Servisi — İletişim
            </h1>
            <p className="mt-2 text-[15px] text-white/60">
              Bize ulaşın — sorularınızı yanıtlamaktan memnuniyet duyarız.
            </p>
          </div>
        </section>

        {/* Info Cards */}
        <section aria-label="İletişim bilgileri" className="bg-surface-page py-10">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <InfoCard icon={<PhoneIcon />} title="Telefon">
                <a
                  href="tel:+905052754540"
                  className="text-[17px] font-black text-zinc-800 hover:text-brand transition-colors"
                >
                  +90 (505) 275 45 40
                </a>
                <p className="mt-0.5 text-[12px] text-zinc-400">Pzt – Cmt 09:00 – 19:00</p>
              </InfoCard>

              <InfoCard icon={<WhatsAppIcon />} title="WhatsApp">
                <a
                  href={`https://wa.me/905052754540?text=${encodeURIComponent("Vipiletisim.com.tr hoşgeldiniz - Hizmetleriniz hakkında bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[17px] font-black text-zinc-800 hover:text-whatsapp transition-colors"
                >
                  +90 (505) 275 45 40
                </a>
                <p className="mt-0.5 text-[12px] text-zinc-400">Hızlı yanıt için WhatsApp</p>
              </InfoCard>

              <InfoCard icon={<MapPinIcon />} title="Adres">
                <a
                  href="https://maps.app.goo.gl/DZ4cDzDNBNAGvxsR9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold leading-snug text-zinc-800 hover:text-brand transition-colors"
                >
                  Çarşı Mah. Uzun Sokak<br />
                  Kolotoğlu Pasajı Kat 1<br />
                  Ortahisar / Trabzon
                </a>
              </InfoCard>

              <InfoCard icon={<ClockIcon />} title="Çalışma Saatleri">
                <p className="text-[14px] font-semibold leading-snug text-zinc-800">
                  Pazartesi – Cumartesi<br />
                  <span className="text-[16px] font-black">09:00 – 19:00</span>
                </p>
                <p className="mt-0.5 text-[12px] text-zinc-400">Pazar kapalı</p>
              </InfoCard>

            </div>
          </div>
        </section>

        {/* Form + Harita */}
        <section aria-label="İletişim formu ve konum" className="bg-surface-page pb-14">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">

              {/* Form */}
              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 lg:p-8">
                <h2 className="mb-1 text-[20px] font-black text-zinc-800">Bize Mesaj Gönderin</h2>
                <p className="mb-6 text-[13px] text-zinc-500">
                  Formu doldurun, WhatsApp üzerinden anında iletişime geçelim.
                </p>
                <ContactForm />
              </div>

              {/* Harita + Detay Panel */}
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-zinc-100">
                  <iframe
                    title="Vip İletişim Trabzon Konum"
                    src="https://maps.google.com/maps?q=41.0056994,39.7254092&z=18&output=embed&hl=tr"
                    width="100%"
                    height="300"
                    loading="lazy"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
                  <p className="mb-3 text-[12px] font-black uppercase tracking-widest text-accent">
                    Hızlı Ulaşım
                  </p>
                  <address className="not-italic space-y-3 text-[13px] text-zinc-600">
                    <p>
                      <strong className="text-zinc-800">Adres:</strong>{" "}
                      Çarşı Mahallesi Uzun Sokak Kolotoğlu Pasajı Kat 1, Ortahisar/Trabzon
                    </p>
                    <p>
                      <strong className="text-zinc-800">Telefon:</strong>{" "}
                      <a href="tel:+905052754540" className="hover:text-brand transition-colors">
                        +90 (505) 275 45 40
                      </a>
                    </p>
                    <p>
                      <strong className="text-zinc-800">Çalışma:</strong>{" "}
                      Pzt – Cmt, 09:00 – 19:00
                    </p>
                  </address>
                  <a
                    href="https://maps.app.goo.gl/DZ4cDzDNBNAGvxsR9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[4px] border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[13px] font-bold text-zinc-700 transition hover:bg-zinc-100"
                  >
                    <MapPinIcon />
                    Google Maps&#39;te Aç
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Hizmet Bölgeleri */}
        <section aria-label="Hizmet bölgeleri" className="border-y border-zinc-200 bg-white py-8">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="shrink-0">
                <p className="text-[12px] font-black uppercase tracking-widest text-accent">
                  Hizmet Bölgeleri
                </p>
                <p className="mt-0.5 text-[13px] text-zinc-500">
                  Kargo veya otobüs ile tamir kabul ediyoruz
                </p>
              </div>
              <div className="h-px w-full bg-zinc-200 sm:hidden" aria-hidden="true" />
              <ul className="flex flex-wrap gap-2" role="list">
                {serviceAreas.map((area) => (
                  <li key={area.href}>
                    <Link
                      href={area.href}
                      className="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-[13px] font-semibold text-zinc-700 transition hover:border-brand hover:bg-brand hover:text-white"
                    >
                      {area.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SSS / FAQ */}
        <section aria-label="Sık sorulan sorular" className="bg-surface-page py-14">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mx-auto max-w-[780px]">
              <h2 className="mb-2 text-2xl font-black text-zinc-800 lg:text-3xl">
                Sık Sorulan Sorular
              </h2>
              <p className="mb-8 text-[14px] text-zinc-500">
                Çevre illerden tamir, kargo gönderimi ve süreçler hakkında merak edilenler.
              </p>

              <dl className="flex flex-col gap-3">
                {faqItems.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl bg-white shadow-sm ring-1 ring-zinc-100"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-zinc-800 hover:text-brand transition-colors">
                      <dt>{item.q}</dt>
                      <ChevronDownIcon />
                    </summary>
                    <dd className="border-t border-zinc-100 px-5 pb-5 pt-4 text-[14px] leading-relaxed text-zinc-600">
                      {item.a}
                    </dd>
                  </details>
                ))}
              </dl>

              {/* Yine de bulamadın mı? CTA */}
              <div className="mt-8 rounded-xl bg-surface-hero p-6 text-center">
                <p className="text-[15px] font-bold text-white">
                  Aradığınız cevabı bulamadınız mı?
                </p>
                <p className="mt-1 text-[13px] text-white/60">
                  Hemen WhatsApp'tan yazın, birkaç dakika içinde yanıt verelim.
                </p>
                <a
                  href={`https://wa.me/905052754540?text=${encodeURIComponent("Vipiletisim.com.tr hoşgeldiniz - Hizmetleriniz hakkında bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-[4px] bg-whatsapp px-6 py-3 text-[14px] font-black text-white transition hover:bg-whatsapp-hover"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp&#39;tan Yaz
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
