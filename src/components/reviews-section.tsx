import { getReviews } from "@/lib/settings";

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-accent" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function ReviewsSection() {
  const reviews = getReviews();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vip İletişim Trabzon",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: reviews.length.toString(),
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating.toString() },
      reviewBody: r.text,
    })),
  };

  return (
    <section className="bg-zinc-50 py-12 lg:py-14" aria-labelledby="yorumlar-baslik">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="mx-auto max-w-[1330px] px-6">
        <h2
          id="yorumlar-baslik"
          className="text-center text-3xl font-black tracking-tight lg:text-4xl"
          style={{ color: '#1A3A6B' }}
        >
          Memnuniyet Garantilerimiz
        </h2>
        <p className="mx-auto mt-4 mb-8 max-w-[920px] text-center text-[15px] leading-relaxed text-zinc-500">
          Trabzon'da yüzlerce müşterimizin güvenini kazanan teknik servis deneyimi — orijinal parça, uzman kadro, garanti.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-black text-zinc-900">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-zinc-900">{review.name}</p>
                    <p className="text-[12px] text-zinc-400">{review.hizmet}</p>
                  </div>
                </div>
                <GoogleIcon />
              </div>

              <div className="flex gap-0.5" aria-label={`${review.rating} yıldız`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              <p className="text-[14px] leading-relaxed text-zinc-600">{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
