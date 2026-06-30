import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular — Trabzon Teknik Servis",
  description:
    "Trabzon Vip İletişim teknik servis hakkında sık sorulan sorular. Tamir süreci, fiyatlar, garanti koşulları ve kargo gönderimi hakkında tüm sorularınızın yanıtı burada.",
  keywords: [
    "trabzon telefon tamiri sık sorulan sorular",
    "iphone tamir süreci trabzon",
    "telefon tamiri garanti trabzon",
    "trabzon tamir kargo gönderimi",
    "vip iletişim trabzon sss",
  ],
  alternates: { canonical: "https://vipiletisim.com.tr/kurumsal/sikca-sorulan-sorular" },
  openGraph: {
    title: "Sıkça Sorulan Sorular | Trabzon Vip İletişim",
    description:
      "Telefon tamiri, kargo gönderimi, garanti ve ödeme hakkında merak ettiğiniz her şey Vip İletişim SSS sayfasında.",
    url: "https://vipiletisim.com.tr/kurumsal/sikca-sorulan-sorular",
    images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630, alt: "Trabzon Telefon Tamiri SSS" }],
  },
};

type FaqItem = { q: string; a: string };
type FaqCategory = { title: string; icon: React.ReactNode; items: FaqItem[] };

const faqCategories: FaqCategory[] = [
  {
    title: "Tamir Süreci",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
    items: [
      {
        q: "Tamir için önceden randevu almam gerekiyor mu?",
        a: "Hayır, randevu zorunlu değildir. Cihazınızı çalışma saatlerimiz (Pzt–Cmt 09:00–19:00) içinde doğrudan getirebilirsiniz. Yoğun dönemlerde beklememek için WhatsApp üzerinden önceden bilgi vermenizi öneririz.",
      },
      {
        q: "Tamir öncesinde fiyat öğrenebilir miyim?",
        a: "Evet. Cihazınızın marka, modeli ve arıza açıklamasını WhatsApp'tan fotoğrafla paylaşabilirsiniz. Ön kontrol ve fiyat teklifi tamamen ücretsizdir.",
      },
      {
        q: "Tamir süresi ne kadar?",
        a: "Ekran değişimi, batarya değişimi ve şarj soketi tamiri gibi standart işlemlerin büyük çoğunluğu 30–60 dakikada tamamlanır. Anakart onarımı gibi kapsamlı tamirler 1–3 iş günü sürebilir; tahmini süreyi cihazınızı teslim alırken size bildiririz.",
      },
      {
        q: "Hangi marka ve modellere bakıyorsunuz?",
        a: "iPhone (X'ten 17 Pro Max'e kadar tüm modeller), Samsung Galaxy (S Serisi, A Serisi), Xiaomi/Redmi, Huawei ve Oppo tamiri yapıyoruz. Listede görmediğiniz modeller için WhatsApp'tan sorabilirsiniz.",
      },
      {
        q: "Tamir sırasında telefonumun içindeki veriler silinir mi?",
        a: "Ekran, batarya veya şarj soketi değişimi gibi çoğu işlemde verileriniz etkilenmez. Anakart veya yazılım işlemlerinden önce sizi bilgilendiriyor, mümkünse yedek almanızı öneriyoruz.",
      },
    ],
  },
  {
    title: "Fiyatlar & Ödeme",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1H6.6c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
    items: [
      {
        q: "Tamir ücretleri ne kadar?",
        a: "Fiyatlar cihaz modeline ve yapılan işleme göre değiştiğinden sabit bir liste sunmak doğru olmaz. Fiyat bilgisi için WhatsApp'tan cihaz modelinizi ve arızanızı yazın; dakikalar içinde dönüş yapıyoruz.",
      },
      {
        q: "Tamir başlamadan önce ücret ödemem gerekiyor mu?",
        a: "Hayır. Ücret yalnızca tamir tamamlandıktan ve cihazınızı teslim aldıktan sonra ödenir. Fiyat onayınız olmadan tamir başlatılmaz.",
      },
      {
        q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        a: "Nakit ve EFT ile ödeme kabul ediyoruz.",
      },
      {
        q: "Tamir gerçekleşmezse ücret ödüyor muyum?",
        a: "Hayır. Cihazınız tamir edilemezse veya tamir ücretini onaylamazsanız herhangi bir ücret ödemezsiniz. Ön kontrol her zaman ücretsizdir.",
      },
    ],
  },
  {
    title: "Garanti & Güvence",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    ),
    items: [
      {
        q: "Tamir garantisi veriyor musunuz?",
        a: "Evet. Anakart tamiri ve benzeri kapsamlı onarımlarda 90 gün işçilik garantisi uyguluyoruz.",
      },
      {
        q: "Garanti kapsamında neler var?",
        a: "Garanti; anakart tamiri gibi kapsamlı onarımlarda yapılan işleme özgü arızanın tekrarlanmasını kapsar. Farklı bir arıza ya da kullanıcı kaynaklı hasar (düşme, su teması vb.) garanti kapsamı dışındadır.",
      },
      {
        q: "Tamir edilen cihaz tekrar bozulursa ne yapmalıyım?",
        a: "Garanti süresi içinde aynı arızanın tekrar etmesi durumunda cihazınızı tekrar getirmeniz ya da kargo ile göndermeniz yeterlidir. Garanti kapsamındaki işlemler ücretsiz yapılır.",
      },
      {
        q: "Orijinal parça kullanıyor musunuz?",
        a: "Evet. Tüm işlemlerde orijinal veya sertifikalı OEM yedek parça kullanıyoruz. Kullanılacak parça kalitesini cihaz tesliminde size önceden bildiririz.",
      },
    ],
  },
  {
    title: "Kargo & Uzaktan Gönderim",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5L21 12h-4V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.36-1-2.22-1-.86 0-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </svg>
    ),
    items: [
      {
        q: "Trabzon dışından tamir yaptırabilir miyim?",
        a: "Evet. Giresun, Rize, Artvin, Gümüşhane ve Bayburt başta olmak üzere Doğu Karadeniz'in her ilinden ve ilçesinden uzaktan tamir kabulü yapıyoruz.",
      },
      {
        q: "Çevre illerden en hızlı nasıl cihaz gönderebilirim?",
        a: "Trabzon'a gelen minibüs veya otobüslere elden cihazınızı teslim edebilirsiniz. Bize otobüs firması, plaka, gelecek gün ve saat bilgisini WhatsApp'tan bildirmeniz yeterli; cihazınızı varışta biz teslim alırız.",
      },
      {
        q: "Kargo ile gönderebilir miyim?",
        a: "Evet. Kargo adresimiz: Çarşı Mahallesi Uzun Sokak Kolotoğlu Pasajı Kat 1 Vip İletişim Ortahisar/Trabzon. Göndermeden önce WhatsApp üzerinden bilgi vermenizi tavsiye ederiz.",
      },
      {
        q: "Gönderdiğim cihaz zarar görür mü?",
        a: "Kargo ile gönderilen cihazları koruyucu ambalajla teslim almanızı öneririz. Elimize ulaştıktan itibaren cihazınız güvencemiz altındadır; tamir sonrası da aynı özenle geri gönderilir.",
      },
      {
        q: "Tamir sonrası cihazım nasıl geri gelir?",
        a: "Tamir tamamlandığında size WhatsApp ile haber veririz. Kargo ile gönderilmesini isterseniz kargo ücretini ödeyerek cihazınızı adresinize göndeririz; Trabzon'a gelen taşıtlara bırakmamızı isterseniz de o şekilde ayarlarız.",
      },
    ],
  },
  {
    title: "Cihaz & Veri Güvenliği",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
    ),
    items: [
      {
        q: "Tamirci cihazımın şifresini bilmek zorunda mı?",
        a: "Çoğu donanım tamirinde (ekran, batarya, şarj soketi vb.) şifre gerekmez. Yazılım güncellemesi veya işletim sistemi sorunlarında şifreye ihtiyaç duyulabilir; bu durumda sizi bilgilendirip onayınızı alırız.",
      },
      {
        q: "Verilerim güvende mi?",
        a: "Evet. Tamir sürecinde verilerinize müdahale edilmez. Anakart veya ana kart arızası gibi veri riski taşıyan işlemlerde önceden yedek almanızı öneririz.",
      },
      {
        q: "Cihazım kaybolur veya zarar görür mü?",
        a: "Teslim aldığımız her cihaz için kayıt tutuyoruz. Tamir süreci boyunca cihazınız güvencemiz altındadır. Zarar vermeme ve eksiksiz iade konusunda müşterilerimize karşı sorumluluğumuzu yerine getiriyoruz.",
      },
    ],
  },
];

const allFaqItems = faqCategories.flatMap((cat) => cat.items);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqItems.map(({ q, a }) => ({
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
    { "@type": "ListItem", position: 2, name: "Kurumsal", item: "https://vipiletisim.com.tr/kurumsal" },
    { "@type": "ListItem", position: 3, name: "Sıkça Sorulan Sorular", item: "https://vipiletisim.com.tr/kurumsal/sikca-sorulan-sorular" },
  ],
};

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

export default function SikcaSorulanSorularPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SiteHeader />

      <main>
        {/* Hero Banner */}
        <section className="bg-surface-hero py-6 lg:py-8" aria-label="Sayfa başlığı">
          <div className="mx-auto max-w-[1330px] px-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/50">
                <li><Link href="/" className="hover:text-white/80 transition-colors">Anasayfa</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/kurumsal" className="hover:text-white/80 transition-colors">Kurumsal</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white/80">Sıkça Sorulan Sorular</li>
              </ol>
            </nav>
            <h1 className="mt-3 text-3xl font-black text-white lg:text-4xl">
              Sıkça Sorulan Sorular
            </h1>
            <p className="mt-2 text-[15px] text-white/60">
              Tamir süreci, garanti, kargo gönderimi ve daha fazlası hakkında merak ettiğiniz her şey.
            </p>
          </div>
        </section>

        {/* Hızlı Kategori Linkleri */}
        <section className="border-b border-zinc-200 bg-white py-5" aria-label="Kategoriler">
          <div className="mx-auto max-w-[1330px] px-6">
            <ul className="flex flex-wrap gap-2" role="list">
              {faqCategories.map((cat) => (
                <li key={cat.title}>
                  <a
                    href={`#${cat.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-[13px] font-semibold text-zinc-700 transition hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <span className="text-brand [&:hover]:text-white">{cat.icon}</span>
                    {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SSS Kategorileri */}
        <section className="bg-surface-page py-14" aria-label="Sık sorulan sorular">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mx-auto max-w-[820px] space-y-12">
              {faqCategories.map((cat) => (
                <div
                  key={cat.title}
                  id={cat.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}
                >
                  {/* Kategori Başlığı */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-lg bg-brand/10 p-2.5 text-brand">
                      {cat.icon}
                    </div>
                    <h2 className="text-[19px] font-black text-zinc-800">{cat.title}</h2>
                  </div>

                  {/* Sorular */}
                  <dl className="flex flex-col gap-3">
                    {cat.items.map((item) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* Cevap Bulamadın mı CTA */}
        <section className="bg-surface-hero py-6">
          <div className="mx-auto max-w-[1330px] px-6">
            <div className="mx-auto max-w-[600px] text-center">
              <h2 className="text-2xl font-black text-white">
                Aradığınız Cevabı Bulamadınız mı?
              </h2>
              <p className="mt-3 text-[15px] text-white/60">
                WhatsApp&#39;tan yazın, birkaç dakika içinde yanıt verelim. Ön kontrol ve fiyat teklifi ücretsizdir.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/905052754540?text=${encodeURIComponent("Vipiletisim.com.tr hoşgeldiniz - Sıkça Sorulan Sorular hakkında bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-whatsapp px-7 py-3.5 text-[15px] font-black text-white transition hover:bg-whatsapp-hover"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp&#39;tan Yaz
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-white/10 px-7 py-3.5 text-[15px] font-black text-white transition hover:bg-white/20"
                >
                  İletişim Sayfası
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
