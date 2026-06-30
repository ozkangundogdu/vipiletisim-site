import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPageContent } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Trabzon Telefon Tamiri Eğitimi",
  description:
    "Trabzon'da 3 seviyeli cep telefonu tamiri kursu. Hobi, teknik ve iPhone anakart uzmanlığı. Öğrenme garantili yüz yüze eğitim. WhatsApp: +90 (505) 275 45 40",
  alternates: { canonical: "https://vipiletisim.com.tr/tamir-egitimi" },
  keywords: [
    "cep telefonu tamiri kursu trabzon",
    "telefon tamir eğitimi",
    "iphone anakart tamiri kursu",
    "microsoldering eğitimi trabzon",
    "telefon tamiri yüz yüze eğitim",
    "android iphone tamir kursu",
    "telefon tamiri hobi kursu",
  ],
  openGraph: {
    title: "Cep Telefonu Tamiri Eğitimi | Trabzon Vip İletişim",
    description:
      "Trabzon'da 3 seviyeli cep telefonu tamiri kursu. Hobi eğitiminden iPhone anakart uzmanlığına. Öğrenme garantili, uygulamalı eğitim.",
    url: "https://vipiletisim.com.tr/tamir-egitimi",
    images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630, alt: "Trabzon Cep Telefonu Tamiri Eğitimi" }],
  },
};

// ——— Schema ———
const courseSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Seviye 1 — Hobi Eğitimi: Temel Telefon Tamiri",
    description:
      "iPhone ve Android cihazlarda ekran, batarya, arka kapak ve kasa değişimini kendi başınıza yapabilmek için 1 haftalık uygulamalı hobi kursu. Öğrenme garantili.",
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://vipiletisim.com.tr/#localbusiness",
      name: "Trabzon Vip İletişim",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      duration: "P5D",
      inLanguage: "tr",
      courseWorkload: "PT40H",
      location: {
        "@type": "Place",
        name: "Trabzon Vip İletişim",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Çarşı Mahallesi Uzun Sokak Kolotoğlu Pasajı Kat 1",
          addressLocality: "Ortahisar",
          addressRegion: "Trabzon",
          addressCountry: "TR",
        },
      },
    },
    educationalLevel: "Beginner",
    teaches: ["Ekran değişimi", "Batarya değişimi", "Kasa değişimi", "Arka kapak tamiri"],
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "TRY" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Seviye 2 — Teknik Eğitim: Orta Düzey Tamir",
    description:
      "iPhone ve Android cihazlarda şarj soketi, entegre söküm, lehimleme ve kamera tamiri konularını kapsayan 1 haftalık teknik eğitim.",
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://vipiletisim.com.tr/#localbusiness",
      name: "Trabzon Vip İletişim",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      duration: "P5D",
      inLanguage: "tr",
    },
    educationalLevel: "Intermediate",
    teaches: [
      "Şarj soketi değişimi", "IC entegre söküm/takma", "Lehimleme teknikleri",
      "Su hasarı müdahalesi", "Kamera ve hoparlör değişimi",
    ],
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "TRY" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Seviye 3 — İleri Düzey: iPhone Anakart Tamiri Uzmanlığı",
    description:
      "Profesyonel iPhone anakart tamiri, mikro lehimleme, şema okuma ve veri kurtarma konularını kapsayan 2–3 haftalık ileri düzey uzmanlık eğitimi.",
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://vipiletisim.com.tr/#localbusiness",
      name: "Trabzon Vip İletişim",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      duration: "P15D",
      inLanguage: "tr",
    },
    educationalLevel: "Advanced",
    teaches: [
      "Mikro lehimleme (microsoldering)", "Şema okuma", "iPhone anakart tanı ve tamir",
      "NAND/CPU/baseband sorunları", "Face ID devre analizi", "Veri kurtarma",
    ],
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "TRY" },
  },
];

const faqItems = [
  {
    q: "Eğitime başlamak için önceden teknik bilgi gerekiyor mu?",
    a: "Seviye 1 Hobi Eğitimi için herhangi bir ön bilgi gerekmez; sıfırdan başlıyoruz. Seviye 2 için Seviye 1'i tamamlamış olmak ya da eşdeğer pratik deneyime sahip olmak yeterlidir. Seviye 3 ise Seviye 2'yi tamamlamış ya da temel lehimleme deneyimine sahip kişilere yöneliktir.",
  },
  {
    q: "Eğitim grupları kaç kişilik oluyor?",
    a: "Eğitimler küçük gruplarla yüz yüze yapılmaktadır. Böylece her katılımcı eğitmenle birebir pratik yapma fırsatı buluyor ve öğrenme süreci hızlanıyor.",
  },
  {
    q: "Öğrenme garantisi ne anlama geliyor?",
    a: "Eğitim sonunda belirlenen hedef becerileri kazanamayan katılımcılara ücretsiz tekrar eğitimi sunuyoruz. Hedefe ulaşana kadar yanınızdayız.",
  },
  {
    q: "Eğitim fiyatları ne kadar?",
    a: "Eğitim ücretleri grup takvimi, içerik ve seviyeye göre değişmektedir. Güncel ücret bilgisi için WhatsApp hattımıza +90 (505) 275 45 40 numarasından ulaşabilirsiniz.",
  },
  {
    q: "Kendi telefonumu getirip tamir etmeyi öğrenebilir miyim?",
    a: "Evet. Özellikle Seviye 1 Hobi Eğitimi kendi cihazını onarmak isteyenler için tasarlanmıştır. Cihazınızı eğitime getirerek gerçek uygulama deneyimi edinebilirsiniz.",
  },
  {
    q: "iPhone ve Android arasındaki fark eğitimde nasıl ele alınıyor?",
    a: "Seviye 1 ve Seviye 2 eğitimlerinde hem iPhone hem de Android (Samsung, Xiaomi vb.) cihazlar üzerinde uygulama yapılır. Seviye 3 ileri anakart eğitimi iPhone mimarisine odaklanmaktadır; zira iPhone anakartı endüstrinin en karmaşık ve ücretli tamir alanıdır.",
  },
  {
    q: "Eğitim hangi saatlerde yapılıyor?",
    a: "Eğitimler hafta içi 09:00–17:00 saatleri arasında Kolotoğlu Pasajı Kat 1 adresimizde yüz yüze yapılmaktadır. Özel grup talepleri için esnek saat seçenekleri değerlendirilebilir.",
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
    { "@type": "ListItem", position: 2, name: "Tamir Eğitimi", item: "https://vipiletisim.com.tr/tamir-egitimi" },
  ],
};

// ——— Veri ———
const levels = [
  {
    badge: "Seviye 1",
    title: "Hobi Eğitimi",
    subtitle: "Kendi Cihazını Kendin Tamir Et",
    devices: "iPhone + Android",
    duration: "1 Hafta (5 Gün)",
    target: "Teknik bilgisi olmayan, kendi ekran veya bataryasını değiştirmek isteyen herkes",
    guarantee: "Öğrenme Garantili",
    accent: "brand",
    topics: [
      { title: "Temel Elektronik & Güvenlik", items: ["Statik elektrik ve ESD koruması", "Kullanılan aletler ve fonksiyonları", "Cihaz açma/kapama teknikleri"] },
      { title: "Ekran Değişimi", items: ["iPhone ekran sökme ve takma", "Samsung / Xiaomi ekran değişimi", "Bağlantı konektörleri ve dikkat noktaları"] },
      { title: "Batarya Değişimi", items: ["iPhone batarya söküm prosedürü", "Android batarya değişimi", "Batarya kalibrasyonu ve güvenlik"] },
      { title: "Kasa & Arka Kapak", items: ["Arka kapak değişimi (cam / plastik)", "Kasa değişimi temelleri", "Su geçirmezlik bantı uygulaması"] },
    ],
  },
  {
    badge: "Seviye 2",
    title: "Teknik Eğitim",
    subtitle: "Orta Düzey Tamir Becerileri",
    devices: "iPhone + Android",
    duration: "1 Hafta (5 Gün)",
    target: "Seviye 1'i tamamlayanlar veya temel tamir deneyimi olanlar",
    guarantee: "Öğrenme Garantili",
    accent: "accent",
    prerequisite: "Seviye 1 veya eşdeğer deneyim",
    topics: [
      { title: "Lehimleme Temelleri", items: ["Havya ve ısı tabancası kullanımı", "SMD bileşen söküm/takma", "Lehim kalitesi ve yaygın hatalar"] },
      { title: "Şarj & Güç Devreleri", items: ["Şarj soketi değişimi (iPhone + Android)", "Şarj entegresi (IC) söküp takma", "Şarj olmuyor arızası analizi"] },
      { title: "Kamera, Ses & Tuş", items: ["Ön/arka kamera değişimi", "Hoparlör ve mikrofon tamiri", "Ses & açma/kapama tuşu onarımı"] },
      { title: "Su Hasarı Müdahalesi", items: ["Ultrasonik temizleme temelleri", "Korozyon analizi", "Kritik bileşen kurtarma adımları"] },
    ],
  },
  {
    badge: "Seviye 3",
    title: "Anakart Tamiri",
    subtitle: "iPhone Uzmanlık Eğitimi",
    devices: "iPhone Odaklı",
    duration: "2–3 Hafta",
    target: "Seviye 2'yi tamamlamış, profesyonel teknik servis açmak ya da anakart uzmanı olmak isteyenler",
    guarantee: "Öğrenme Garantili",
    accent: "surface-hero",
    prerequisite: "Seviye 2 zorunlu",
    topics: [
      { title: "Mikro Lehimleme (Microsoldering)", items: ["Trinoküler mikroskop kullanımı", "BGA bileşen söküm/reballing", "Vias ve pad onarımı"] },
      { title: "Şema Okuma & Tanı", items: ["iPhone şema diyagramları", "Multimetre ile devre analizi", "Voltaj noktaları ve referanslar"] },
      { title: "iPhone Anakart Onarımı", items: ["PMIC, U2, Tristar entegre tamiri", "Servis yok / anten arızaları", "Baseband & NAND sorunları"] },
      { title: "Face ID & Güvenlik Çipleri", items: ["Face ID devre analizi", "Touch ID / Secure Enclave", "iPhone Yazılımsal Sorunlar"] },
      { title: "Veri Kurtarma Temelleri", items: ["NAND flash okuma teknikleri", "Hasarlı anakarttan veri alma", "Profesyonel araçlar tanıtımı"] },
      { title: "Servis Yönetimi (Bonus)", items: ["Müşteri fiyatlandırma stratejisi", "Garanti politikası oluşturma", "Trabzon ve çevre ilde müşteri edinme"] },
    ],
  },
] as const;

const benefits = [
  {
    title: "10+ Yıllık Eğitmen Deneyimi",
    desc: "Trabzon'un önde gelen teknik servisi olarak binlerce tamir deneyimini birebir aktarıyoruz.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
      </svg>
    ),
  },
  {
    title: "Öğrenme Garantili",
    desc: "Hedef becerileri kazanamayan katılımcılara ücretsiz tekrar eğitimi sunuyoruz.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
      </svg>
    ),
  },
  {
    title: "Yüz Yüze Eğitim",
    desc: "Eğitimler doğrudan servisimizde, birebir eğitmen eşliğinde yürütülür. Uzaktan ya da online seçenek yoktur.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    title: "Gerçek Cihazlarla Uygulama",
    desc: "Teorinin yanında her konuda gerçek iPhone ve Android cihazlar üzerinde pratik yapılır.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
  },
  {
    title: "Eğitim Sonrası Destek",
    desc: "Eğitim bittikten sonra da WhatsApp üzerinden sorularınızı yanıtlıyor, uygulamada rehberlik ediyoruz.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
];

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" fill="currentColor" aria-hidden="true">
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
    </svg>
  );
}

const accentMap = {
  brand: { badge: "bg-brand text-white", border: "border-brand/20", dot: "bg-brand" },
  accent: { badge: "bg-accent text-zinc-900", border: "border-accent/30", dot: "bg-accent" },
  "surface-hero": { badge: "bg-surface-hero text-white", border: "border-surface-hero/20", dot: "bg-surface-hero" },
};

export default function TamirEgitimiPage() {
  const pc = getPageContent("tamir-egitimi");

  return (
    <>
      {courseSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SiteHeader />

      <main>
        {/* ── Hero Banner ── */}
        <section className="bg-surface-hero py-6 lg:py-8" aria-label="Sayfa başlığı">
          <div className="mx-auto max-w-[1330px] px-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/50">
                <li><Link href="/" className="hover:text-white/80 transition-colors">Anasayfa</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white/80">Tamir Eğitimi</li>
              </ol>
            </nav>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="mb-3 inline-block rounded-full bg-brand px-3 py-1 text-[12px] font-black uppercase tracking-widest text-white">
                  Trabzon — 3 Seviyeli Kurs
                </span>
                <h1 className="text-3xl font-black text-white lg:text-4xl xl:text-[42px]">
                  {pc.hero.title}
                </h1>
                <p className="mt-3 max-w-[600px] text-[15px] leading-relaxed text-white/60">
                  {pc.hero.subtitle}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 lg:items-end">
                <a
                  href="https://wa.me/905052754540?text=Merhaba, tamir eğitimi hakkında bilgi almak istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-whatsapp px-6 py-3 text-[14px] font-black text-white transition hover:bg-whatsapp-hover"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                  Kayıt & Bilgi — WhatsApp
                </a>
                <p className="text-[12px] text-white/40">Eğitim tarihleri ve ücret için yazın</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Neden Bu Eğitim ── */}
        <section className="bg-white border-b border-zinc-200 py-10">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mb-7 text-center">
              <p className="mb-1 text-[12px] font-black uppercase tracking-widest text-brand">Neden Biz?</p>
              <h2 className="text-xl font-black text-zinc-800 lg:text-2xl">
                Trabzon&#39;da 10+ Yıllık Saha Deneyimini Sınıfa Taşıyoruz
              </h2>
              <p className="mx-auto mt-2 max-w-[580px] text-[13px] leading-relaxed text-zinc-500">
                iPhone ve Android alanında binlerce başarılı tamir gerçekleştiren ekibimiz, bu birikimi
                katılımcılarla paylaşmak için yapılandırılmış bir eğitim programı oluşturdu.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-4 rounded-xl bg-zinc-50 p-5 ring-1 ring-zinc-100">
                  <div className="mt-0.5 shrink-0 rounded-lg bg-brand/10 p-2.5 text-brand">{b.icon}</div>
                  <div>
                    <p className="text-[14px] font-black text-zinc-800">{b.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3 Seviye ── */}
        <section className="bg-surface-page py-14" aria-label="Eğitim seviyeleri">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mb-10 text-center">
              <p className="mb-2 text-[12px] font-black uppercase tracking-widest text-brand">Program</p>
              <h2 className="text-2xl font-black text-zinc-800 lg:text-3xl">Eğitim Seviyeleri</h2>
              <p className="mx-auto mt-2 max-w-[560px] text-[14px] text-zinc-500">
                Seviyeleri sırayla tamamlayabilir ya da bilgi düzeyinize göre doğrudan uygun seviyeden başlayabilirsiniz.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {levels.map((level, idx) => {
                const colors = accentMap[level.accent];
                return (
                  <article
                    key={level.badge}
                    className={`rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100 overflow-hidden`}
                    aria-label={`${level.badge}: ${level.title}`}
                  >
                    {/* Başlık Bandı */}
                    <div className="flex flex-col gap-3 border-b border-zinc-100 p-6 sm:flex-row sm:items-start sm:justify-between lg:p-7">
                      <div className="flex items-center gap-4">
                        <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-black uppercase tracking-widest ${colors.badge}`}>
                          {level.badge}
                        </span>
                        <div>
                          <h3 className="text-xl font-black text-zinc-800 lg:text-2xl">{level.title}</h3>
                          <p className="text-[14px] font-semibold text-zinc-500">{level.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[12px] font-bold text-zinc-600">
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-brand" fill="currentColor" aria-hidden="true"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm.5 4a.5.5 0 0 0-1 0v4.5l3 1.5a.5.5 0 0 0 .45-.9L8.5 7.9V4z" /></svg>
                          {level.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[12px] font-bold text-zinc-600">
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-brand" fill="currentColor" aria-hidden="true"><path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v2.343a.5.5 0 0 1-.146.354l-.5.5a.5.5 0 0 1-.707 0L13 6.05l-.647.647a.5.5 0 0 1-.707 0L11 6.05l-.647.647a.5.5 0 0 1-.707 0L9 6.05l-.647.647a.5.5 0 0 1-.707 0L7 6.05l-.647.647a.5.5 0 0 1-.707 0L5 6.05l-.647.647a.5.5 0 0 1-.707 0L3 6.05l-.646.647a.5.5 0 0 1-.707 0l-.5-.5A.5.5 0 0 1 1 5.843V3.5z" /></svg>
                          {level.devices}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-black ring-1 ${idx === 2 ? "bg-surface-hero/10 text-zinc-700 ring-zinc-200" : "bg-brand/10 text-brand ring-brand/20"}`}>
                          {level.guarantee}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 lg:p-7">
                      {/* Hedef kitle + önkoşul */}
                      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                        <div className="flex-1 rounded-lg bg-zinc-50 px-4 py-3 ring-1 ring-zinc-100">
                          <p className="mb-0.5 text-[11px] font-black uppercase tracking-widest text-zinc-400">Kimler İçin?</p>
                          <p className="text-[13px] text-zinc-700">{level.target}</p>
                        </div>
                        {"prerequisite" in level && (
                          <div className="sm:w-[200px] rounded-lg bg-brand/5 px-4 py-3 ring-1 ring-brand/15">
                            <p className="mb-0.5 text-[11px] font-black uppercase tracking-widest text-brand">Önkoşul</p>
                            <p className="text-[13px] font-semibold text-zinc-700">{level.prerequisite}</p>
                          </div>
                        )}
                      </div>

                      {/* Konu grid */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {level.topics.map((topic) => (
                          <div key={topic.title} className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4">
                            <p className="mb-2.5 text-[13px] font-black text-zinc-800">{topic.title}</p>
                            <ul className="space-y-1.5">
                              {topic.items.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-[13px] text-zinc-600">
                                  <CheckIcon />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Seviye CTA */}
                      <div className="mt-6 flex items-center justify-between gap-4">
                        <p className="text-[13px] text-zinc-400">
                          Ücret ve tarih bilgisi için WhatsApp&#39;tan yazın.
                        </p>
                        <a
                          href={`https://wa.me/905052754540?text=${encodeURIComponent(`Merhaba, ${level.badge} — ${level.title} eğitimi hakkında bilgi almak istiyorum.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-2 rounded-[4px] bg-surface-header px-5 py-2.5 text-[13px] font-black text-white transition hover:opacity-90"
                        >
                          Bu Seviye İçin Yaz
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Seviye Yol Haritası ── */}
        <section className="bg-white border-y border-zinc-200 py-10">
          <div className="mx-auto max-w-[1330px] px-6">
            <h2 className="mb-7 text-center text-xl font-black text-zinc-800 lg:text-2xl">
              Eğitim Yol Haritası
            </h2>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {[
                { step: "1", title: "Hobi Eğitimi", sub: "1 Hafta", note: "Başlangıç noktası" },
                { step: "→", title: "", sub: "", note: "", divider: true },
                { step: "2", title: "Teknik Eğitim", sub: "1 Hafta", note: "Lehimleme + gelişmiş tamir" },
                { step: "→", title: "", sub: "", note: "", divider: true },
                { step: "3", title: "Anakart Tamiri", sub: "2–3 Hafta", note: "iPhone uzmanı" },
              ].map((item, i) =>
                item.divider ? (
                  <span key={i} className="hidden text-2xl font-black text-zinc-300 sm:block" aria-hidden="true">→</span>
                ) : (
                  <div key={i} className="flex flex-1 flex-col items-center rounded-xl bg-zinc-50 p-5 text-center ring-1 ring-zinc-100 sm:max-w-[220px]">
                    <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-black text-white">
                      {item.step}
                    </span>
                    <p className="text-[15px] font-black text-zinc-800">{item.title}</p>
                    <p className="mt-0.5 text-[13px] font-semibold text-brand">{item.sub}</p>
                    <p className="mt-1 text-[12px] text-zinc-400">{item.note}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* ── SSS ── */}
        <section className="bg-surface-page py-14" aria-label="Sık sorulan sorular">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mx-auto max-w-[800px]">
              <p className="mb-2 text-[12px] font-black uppercase tracking-widest text-brand">Merak Edilenler</p>
              <h2 className="mb-2 text-2xl font-black text-zinc-800 lg:text-3xl">Eğitim Hakkında Sık Sorulan Sorular</h2>
              <p className="mb-8 text-[14px] text-zinc-500">Kayıt, içerik ve eğitim süreci hakkında merak ettiğiniz her şey.</p>
              <dl className="flex flex-col gap-3">
                {faqItems.map((item) => (
                  <details key={item.q} className="group rounded-xl bg-white shadow-sm ring-1 ring-zinc-100">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-zinc-800 hover:text-brand transition-colors">
                      <dt>{item.q}</dt>
                      <ChevronDownIcon />
                    </summary>
                    <dd className="border-t border-zinc-100 px-5 pb-5 pt-4 text-[14px] leading-relaxed text-zinc-600">{item.a}</dd>
                  </details>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-surface-hero py-6">
          <div className="mx-auto max-w-[1330px] px-6 text-center">
            <h2 className="text-2xl font-black text-white lg:text-3xl">Eğitime Başlamaya Hazır mısınız?</h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[15px] text-white/60">
              Hangi seviyeye katılmak istediğinizi WhatsApp&#39;tan yazın; size en yakın eğitim tarihini ve
              ücret bilgisini hemen ileteyiz.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/905052754540?text=Merhaba, tamir eğitimi hakkında bilgi almak istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[4px] bg-whatsapp px-8 py-3.5 text-[15px] font-black text-white transition hover:bg-whatsapp-hover"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                WhatsApp&#39;tan Kayıt Ol
              </a>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-[4px] bg-white/10 px-8 py-3.5 text-[15px] font-black text-white transition hover:bg-white/20"
              >
                İletişim Sayfası
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
