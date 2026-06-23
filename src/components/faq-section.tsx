import Image from "next/image";

const faqs = [
  {
    question: "iPhone ekran değişimi ne kadar sürer?",
    answer:
      "iPhone ekran değişimi ortalama 30–60 dakika sürer. Vip İletişim Trabzon olarak orijinal parça kullanarak aynı gün içinde ekranınızı değiştiriyor, cihazınızı teslim ediyoruz. Randevu alarak bekleme süresini de en aza indirebilirsiniz.",
  },
  {
    question: "Telefon tamiri sonrası verilerim kaybolur mu?",
    answer:
      "Ekran, batarya veya kasa değişimi gibi donanımsal tamirlerde verileriniz korunur. Ancak kart formatı veya yazılım yükleme işlemlerinde veri kaybı yaşanabilir. Bu nedenle cihazınızı getirmeden önce yedek almanızı öneririz.",
  },
  {
    question: "Orijinal parça ile muadil parça arasındaki fark nedir?",
    answer:
      "Orijinal parçalar üretici firma tarafından üretilir; renk doğruluğu, dokunmatik hassasiyeti ve dayanıklılık açısından üstündür. Muadil parçalar daha uygun fiyatlı olmakla birlikte kalite farklılığı gösterebilir. Vip İletişim olarak tercihimiz her zaman orijinal veya OEM kalitesinde parçadır.",
  },
  {
    question: "Suya düşen telefon tamir edilebilir mi?",
    answer:
      "Evet, suya düşen telefonlar çoğunlukla tamir edilebilir. Cihazı suya düşürdükten sonra şarj etmeden ve açmaya çalışmadan en kısa sürede teknik servise getirmeniz başarı şansını artırır. Profesyonel ultrasonik temizleme ve kurutma işlemleriyle pek çok cihaz kurtarılabilmektedir.",
  },
  {
    question: "Samsung telefon batarya ömrü ne zaman biter, ne zaman değiştirilmeli?",
    answer:
      "Samsung ve diğer Android telefonlarda batarya kapasitesi genellikle 500–800 şarj döngüsünün ardından belirgin biçimde düşer. Telefonunuz şarjı hızla bitiriyorsa, şişme belirtisi gösteriyorsa veya ani kapanmalar yaşıyorsa batarya değişimi zamanı gelmiş demektir.",
  },
  {
    question: "Telefon tamiri için yetkili servis mi, özel servis mi tercih edilmeli?",
    answer:
      "Garanti süresi içindeyseniz yetkili servis tercih edilmelidir. Garanti dışı cihazlarda ise uzman özel servisler hem daha hızlı hem de daha uygun fiyatlı hizmet sunar. Vip İletişim olarak anakart onarımlarında 180 gün işçilik garantisi, diğer işlemlerde uzman kadro güvencesi sunuyoruz.",
  },
  {
    question: "Trabzon'da iPhone tamiri nerede yaptırılır?",
    answer:
      "Trabzon'da iPhone tamiri için Vip İletişim Teknik Servis'i tercih edebilirsiniz. Ekran değişimi, batarya yenileme, şarj soketi tamiri ve kamera onarımı başta olmak üzere tüm iPhone modellerinde uzman kadromuzla hizmet veriyoruz. Aynı gün teslim, orijinal parça ve ücretsiz ön inceleme.",
  },
  {
    question: "Telefon tamir ücreti nasıl belirlenir, önceden öğrenebilir miyim?",
    answer:
      "Tamir ücreti cihazın markası, modeli ve arıza türüne göre değişir. Cihazınızı getirdiğinizde ücretsiz ön inceleme yapıyor, işleme başlamadan önce size net fiyat bildiriyoruz. Onaylamazsanız herhangi bir ücret talep etmiyoruz.",
  },
];

export function FaqSection() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="relative overflow-hidden py-[20px]" aria-labelledby="sss-baslik">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Arka plan görseli */}
      <Image
        src="/images/faq-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
      />
      {/* Overlay — okunabilirlik için */}
      <div className="absolute inset-0 bg-white/85" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1330px] px-6">
        <h2
          id="sss-baslik"
          className="mb-[15px] text-center text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl"
        >
          Sıkça Sorulan Sorular
        </h2>

        <div className="mx-auto max-w-3xl divide-y divide-zinc-200">
          {faqs.map((faq, i) => (
            <details key={i} className="group py-4" suppressHydrationWarning>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold text-zinc-800 hover:text-accent">
                <span>{faq.question}</span>
                <span className="shrink-0 text-zinc-400 transition group-open:rotate-180">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
