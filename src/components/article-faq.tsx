export type ArticleFaqItem = { q: string; a: string };

export function ArticleFaq({
  faqs,
  title,
}: {
  faqs: ArticleFaqItem[];
  title?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section aria-label="Sıkça Sorulan Sorular">
      <h2 className="mb-5 text-xl font-black text-zinc-900">
        {title ?? "Sıkça Sorulan Sorular"}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            suppressHydrationWarning
            className="group rounded-xl border border-zinc-200 bg-zinc-50 open:bg-white"
          >
            <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-zinc-900 marker:hidden">
              <span>{faq.q}</span>
              <span className="shrink-0 text-accent text-lg transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="border-t border-zinc-200 px-5 py-4 text-[14px] leading-relaxed text-zinc-600">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
