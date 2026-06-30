import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { repairTypeList } from "@/data/services";
import { getPageContent } from "@/lib/page-content";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Trabzon Telefon Tamir Fiyatları",
  description:
    "Trabzon iPhone, Samsung ve Xiaomi tamir fiyatları. İşçilik ve parça maliyetiyle belirlenen güncel ücret için WhatsApp: +90 (505) 275 45 40. Ücretsiz ön inceleme.",
  keywords: [
    "trabzon iphone ekran değişimi fiyatı",
    "trabzon samsung tamir ücreti",
    "telefon tamir işçilik ücreti trabzon",
    "trabzon anakart tamiri fiyatı",
    "trabzon cep telefonu tamir ücreti",
  ],
  alternates: { canonical: "https://vipiletisim.com.tr/fiyatlar" },
  openGraph: {
    title: "Trabzon Telefon Tamir Fiyatları | Vip İletişim",
    description:
      "iPhone, Samsung, Xiaomi ekran, batarya ve anakart tamir fiyatları. Parça + işçilik bazlı fiyatlandırma, güncel ücret için WhatsApp hattımızdan bilgi alın.",
    url: "https://vipiletisim.com.tr/fiyatlar",
    images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630, alt: "Trabzon Telefon Tamir Fiyatları" }],
  },
};

// Arıza türleri gruplandırması
const repairGroups = [
  {
    title: "Ekran & Cam Tamiri",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
      </svg>
    ),
    keys: ["ekran-degisimi", "on-cam-degisimi", "kamera-cami-tamiri"],
  },
  {
    title: "Batarya & Şarj",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
      </svg>
    ),
    keys: ["batarya-degisimi", "sarj-soketi-tamiri", "sarj-olmuyor-tamiri", "sarj-entegresi-tamiri"],
  },
  {
    title: "Kamera Tamiri",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" />
        <path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    ),
    keys: ["on-kamera-tamiri", "arka-kamera-tamiri", "kamera-cami-tamiri"],
  },
  {
    title: "Ses & Mikrofon",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
      </svg>
    ),
    keys: ["ses-arizalari", "mikrofon-tamiri", "hoparlor-tamiri"],
  },
  {
    title: "Tuş & Kimlik",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
    ),
    keys: ["face-id-tamiri", "acma-kapama-tusu-tamiri"],
  },
  {
    title: "Kasa & Arka Kapak",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z" />
      </svg>
    ),
    keys: ["kasa-degisimi", "arka-kapak-tamiri"],
  },
  {
    title: "Anakart & Yazılım",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14z" />
        <path d="M6 13h5v4H6zm6 0h2v4h-2zm-6-6h2v4H6zm3 0h5v4H9z" />
      </svg>
    ),
    keys: ["anakart-tamiri", "sivi-temasi-tamiri", "wifi-tamiri", "servis-yok-arizasi"],
  },
] as const;

// Anahtar listeden repairType verisini çek
const repairMap = Object.fromEntries(repairTypeList.map((r) => [r.key, r]));

const faqItems = [
  {
    q: "iPhone ekran değişimi ücreti ne kadar?",
    a: "iPhone ekran değişimi ücreti, cihazın modeline ve kullanılacak ekran kalitesine göre değişmektedir. iPhone X ile iPhone 17 Pro Max arasında maliyetler önemli ölçüde farklılaşır. Güncel fiyat bilgisi için WhatsApp hattımıza +90 (505) 275 45 40 numarasından ulaşabilirsiniz.",
  },
  {
    q: "Samsung ekran değişimi fiyatı nedir?",
    a: "Samsung Galaxy ekran değişimi fiyatı; S Serisi, A Serisi ve modele göre değişmektedir. Orijinal parça ile muadil parça arasındaki fark fiyatı doğrudan etkiler. Cihaz modelinizi belirterek WhatsApp üzerinden güncel fiyat alabilirsiniz.",
  },
  {
    q: "Tamir fiyatları nasıl hesaplanıyor?",
    a: "Tüm tamir fiyatlarımız iki unsurdan oluşur: yedek parça maliyeti ve işçilik ücreti. Parça maliyetleri küresel tedarik zinciri, döviz kuru ve ürün stoğuna bağlı olarak sürekli değiştiğinden sabit bir fiyat listesi yayınlamak yanıltıcı olur. Her talep için güncel parça fiyatı üzerinden fiyat hesaplanır.",
  },
  {
    q: "Neden sabit fiyat listesi paylaşmıyorsunuz?",
    a: "Cep telefonu yedek parça fiyatları; döviz kuru, tedarikçi fiyatları ve stok durumuna bağlı olarak sürekli değişmektedir. Sabit bir liste yayınlamak, daha sonra farklı bir ücret talep etmek zorunda kalmamıza yol açar ve müşteri memnuniyetsizliğine neden olur. Bu nedenle her talep için anlık fiyat belirliyoruz.",
  },
  {
    q: "Fiyat teklifi almak ücretsiz mi?",
    a: "Evet, fiyat teklifi tamamen ücretsizdir. Cihaz modelinizi ve arızayı WhatsApp'tan yazmanız yeterli; dakikalar içinde güncel fiyat bilgisini iletiyoruz.",
  },
  {
    q: "Tamir başlamadan önce fiyatı onaylamam gerekiyor mu?",
    a: "Evet, fiyat onayınız olmadan tamir başlatılmaz. Cihazı teslim aldıktan sonra ön inceleme yapıp size kesin fiyatı bildiriyoruz; onaylamanız durumunda tamir süreci başlıyor.",
  },
  {
    q: "Anakart tamiri ne kadar tutar?",
    a: "Anakart tamiri en değişken fiyatlı işlem türüdür; arızanın kapsamına, gerekli entegre veya bileşene göre fiyat önemli ölçüde değişir. Aynı zamanda 90 gün işçilik garantisi verdiğimiz işlem türüdür. Güncel fiyat için WhatsApp'tan cihaz modelini ve arızayı belirterek yazabilirsiniz.",
  },
  {
    q: "Batarya değişimi ne kadar sürer ve maliyeti nedir?",
    a: "Batarya değişimi ortalama 20–40 dakikada tamamlanır. Maliyet cihaz modeline ve batarya kalitesine göre değişir. Cihazınızın modelini belirterek WhatsApp üzerinden güncel fiyat öğrenebilirsiniz.",
  },
  {
    q: "Ödeme yöntemleri neler?",
    a: "Nakit ve EFT ile ödeme kabul ediyoruz. Ödeme, tamir tamamlandıktan ve cihazınızı teslim aldıktan sonra yapılır.",
  },
  {
    q: "Uzak illerden kargo ile gönderince fiyat değişiyor mu?",
    a: "Tamir ücreti aynıdır. Kargo ile gönderimde ek olarak gidiş-dönüş kargo ücreti müşteriye aittir. Tamir maliyeti cihaz teslim yönteminden bağımsız olarak hesaplanır.",
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
    { "@type": "ListItem", position: 2, name: "Fiyatlar", item: "https://vipiletisim.com.tr/fiyatlar" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://vipiletisim.com.tr/#localbusiness",
    name: "Trabzon Vip İletişim",
    telephone: "+905052754540",
  },
  serviceType: "Cep Telefonu Tamiri",
  areaServed: { "@type": "City", name: "Trabzon" },
  description:
    "iPhone, Samsung ve Xiaomi cep telefonları için ekran, batarya, şarj soketi, kamera ve anakart tamir hizmetleri. Fiyatlar parça maliyeti ve işçilik ücreti toplamıdır.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "TRY",
    offerCount: repairTypeList.length,
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "TRY",
      description: "Parça maliyeti + işçilik ücreti toplamıdır. Güncel fiyat için WhatsApp: +90 (505) 275 45 40",
    },
  },
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
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

export default function FiyatlarPage() {
  const pc = getPageContent("fiyatlar");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <SiteHeader />

      <main>
        {/* Hero Banner */}
        <section className="bg-surface-hero py-6 lg:py-8" aria-label="Sayfa başlığı">
          <div className="mx-auto max-w-[1330px] px-6">
            {pc.hero.image && (
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Image src={pc.hero.image} alt="" aria-hidden={true} fill className="object-cover" sizes="100vw" />
              </div>
            )}
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/50">
                <li><Link href="/" className="hover:text-white/80 transition-colors">Anasayfa</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white/80">Fiyatlar</li>
              </ol>
            </nav>
            <h1 className="mt-3 text-3xl font-black text-white lg:text-4xl">
              {pc.hero.title}
            </h1>
            <p className="mt-2 max-w-[600px] text-[15px] text-white/60">
              {pc.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Fiyatlandırma Modeli Açıklaması */}
        <section className="bg-white py-10 border-b border-zinc-200" aria-label="Fiyatlandırma hakkında">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">

              <div>
                <p className="mb-2 text-[12px] font-black uppercase tracking-widest text-brand">
                  Fiyatlandırma Nasıl Çalışır?
                </p>
                <h2 className="mb-3 text-[19px] font-black text-zinc-800">
                  {pc.pricingDesc.heading}
                </h2>
                <p className="max-w-[700px] text-[14px] leading-relaxed text-zinc-600">
                  {pc.pricingDesc.text}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start justify-center gap-3 lg:items-end">
                <a
                  href="https://wa.me/905052754540?text=Merhaba, tamir fiyatı öğrenmek istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-whatsapp px-5 py-3 text-[14px] font-black text-white transition hover:bg-whatsapp-hover"
                >
                  <WhatsAppIcon />
                  Fiyat Sor — WhatsApp
                </a>
                <p className="text-[12px] text-zinc-400">Yanıt süresi: dakikalar içinde</p>
              </div>

            </div>

            {/* 3 bilgi kartı */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {pc.infoCards.map((c, idx) => {
                const colors = [
                  { color: "text-brand", bg: "bg-brand/5" },
                  { color: "text-accent", bg: "bg-accent/10" },
                  { color: "text-whatsapp", bg: "bg-whatsapp/10" },
                ];
                const { color, bg } = colors[idx % colors.length];
                return (
                  <div key={c.title} className={`rounded-xl ${bg} p-5 ring-1 ring-zinc-100`}>
                    <p className={`text-[14px] font-black ${color}`}>{c.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{c.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Arıza Türüne Göre Fiyat Rehberi */}
        <section className="bg-surface-page py-14" aria-label="Arıza türlerine göre tamir fiyatları">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mb-8">
              <p className="mb-2 text-[12px] font-black uppercase tracking-widest text-brand">
                Arıza Türüne Göre
              </p>
              <h2 className="text-2xl font-black text-zinc-800 lg:text-3xl">
                Tamir Türleri ve İşçilik Süreleri
              </h2>
              <p className="mt-2 text-[14px] text-zinc-500">
                Güncel işçilik ücreti için her tamir türünde WhatsApp butonu ile doğrudan bilgi alın.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {repairGroups.map((group) => {
                const items = group.keys
                  .map((k) => repairMap[k])
                  .filter(Boolean);
                if (!items.length) return null;

                return (
                  <div
                    key={group.title}
                    className="rounded-xl bg-white shadow-sm ring-1 ring-zinc-100 overflow-hidden"
                  >
                    {/* Grup başlığı */}
                    <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50 px-5 py-4">
                      <div className="text-brand">{group.icon}</div>
                      <h3 className="text-[15px] font-black text-zinc-800">{group.title}</h3>
                    </div>

                    {/* Tamir türleri listesi */}
                    <ul className="divide-y divide-zinc-100">
                      {items.map((item) => (
                        <li
                          key={item.key}
                          className="flex items-center justify-between gap-3 px-5 py-3"
                        >
                          <div>
                            <p className="text-[14px] font-semibold text-zinc-800">{item.label}</p>
                            <p className="text-[12px] text-zinc-400">{item.duration}</p>
                          </div>
                          <a
                            href={`https://wa.me/905052754540?text=${encodeURIComponent(`Merhaba, ${item.label} için fiyat bilgisi almak istiyorum.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1.5 rounded-[4px] bg-whatsapp/10 px-3 py-1.5 text-[12px] font-bold text-whatsapp transition hover:bg-whatsapp hover:text-white"
                            aria-label={`${item.label} fiyatını WhatsApp'tan öğren`}
                          >
                            <WhatsAppIcon />
                            Fiyat Al
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Desteklenen Markalar Bant */}
        <section className="border-y border-zinc-200 bg-white py-6" aria-label="Desteklenen markalar">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-[13px] font-bold text-zinc-500">
                Tamir ettiğimiz markalar:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Apple iPhone", "Samsung Galaxy", "Xiaomi / Redmi", "Huawei", "Oppo"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-[13px] font-semibold text-zinc-700"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <Link
                href="/tamir-hizmetleri"
                className="shrink-0 text-[13px] font-bold text-brand hover:underline"
              >
                Tüm Hizmetler →
              </Link>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="bg-surface-page py-14" aria-label="Sık sorulan fiyat soruları">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mx-auto max-w-[820px]">
              <p className="mb-2 text-[12px] font-black uppercase tracking-widest text-brand">
                Merak Edilenler
              </p>
              <h2 className="mb-2 text-2xl font-black text-zinc-800 lg:text-3xl">
                Fiyatlar Hakkında Sık Sorulan Sorular
              </h2>
              <p className="mb-8 text-[14px] text-zinc-500">
                Tamir ücreti, ödeme ve fiyatlandırma modeli hakkında merak ettiğiniz her şey.
              </p>

              <dl className="flex flex-col gap-3">
                {pc.faq.map((item) => (
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
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-hero py-6">
          <div className="mx-auto max-w-[1330px] px-6 text-center">
            <h2 className="text-2xl font-black text-white lg:text-3xl">
              {pc.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-[500px] text-[15px] text-white/60">
              {pc.ctaSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/905052754540?text=Merhaba, tamir fiyatı öğrenmek istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[4px] bg-whatsapp px-8 py-3.5 text-[15px] font-black text-white transition hover:bg-whatsapp-hover"
              >
                <WhatsAppIcon />
                WhatsApp&#39;tan Fiyat Sor
              </a>
              <a
                href="tel:+905052754540"
                className="inline-flex items-center gap-2 rounded-[4px] bg-white/10 px-8 py-3.5 text-[15px] font-black text-white transition hover:bg-white/20"
              >
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
