import Image from "next/image";
import { getFaq } from "@/lib/settings";

export function FaqSection() {
  const faqs = getFaq();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.soru,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.cevap,
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/85" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1330px] px-6">
        <h2
          id="sss-baslik"
          className="text-center text-3xl font-black tracking-tight lg:text-4xl"
          style={{ color: '#1A3A6B' }}
        >
          Sıkça Sorulan Sorular
        </h2>
        <p className="mt-2 mb-[15px] text-center text-[15px] text-zinc-500">
          Trabzon cep telefonu tamiri hakkında merak ettikleriniz — ücretler, tamir süresi ve süreç hakkında net yanıtlar.
        </p>

        <div className="mx-auto max-w-3xl divide-y divide-zinc-200">
          {faqs.map((faq) => (
            <details key={faq.id} className="group py-4" suppressHydrationWarning>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold text-zinc-800 hover:text-accent">
                <span>{faq.soru}</span>
                <span className="shrink-0 text-zinc-400 transition group-open:rotate-180">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
                {faq.cevap}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
