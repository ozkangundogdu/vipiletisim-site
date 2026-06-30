import Link from "next/link";
import type { MarkaTamir } from "@/lib/marka-tamir";
import { getMarkaTamirlerByMarka } from "@/lib/marka-tamir";
import { markdownToHtml } from "@/lib/markdown-to-html";
import { ArticleFaq } from "@/components/article-faq";
import { AuthorCard, type AuthorInfo } from "@/components/author-card";
import { TableOfContents, extractToc } from "@/components/table-of-contents";
import { getSettings } from "@/lib/settings";
import { ModellerAccordion } from "@/components/modeller-accordion";

type Props = {
  data: MarkaTamir;
  author: AuthorInfo;
};

export function MarkaTamirPage({ data, author }: Props) {
  const settings = getSettings();
  const regions = settings.hizmetBolgeleri ?? [];
  const html = markdownToHtml(data.icerik);
  const tocItems = extractToc(data.icerik);
  const aktifModeller = data.desteklenenModeller.filter((m) => m.aktif);
  const displayModeller = aktifModeller.slice(0, 12);
  const kalanModeller = aktifModeller.slice(12);
  const displayFaqs = data.sss.map((s) => ({ q: s.soru, a: s.cevap }));
  const digerTamirler = getMarkaTamirlerByMarka(data.marka).filter((m) => m.slug !== data.slug);

  return (
    <>
      {/* Hero banner */}
      <div
        className="mb-8 -mx-6 flex items-end px-6 pb-8 pt-10"
        style={{ background: "#1A3A6B", minHeight: 140 }}
      >
        <div className="max-w-[1330px] w-full">
          <nav aria-label="Breadcrumb" className="mb-3 text-[13px] text-white/50">
            <Link href="/" className="hover:text-white/80">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/tamir-hizmetleri" className="hover:text-white/80">Tamir Hizmetleri</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{data.title}</span>
          </nav>
          <h1 className="text-3xl font-black text-white lg:text-4xl">
            {data.title} — Trabzon
          </h1>
          <p className="mt-2 text-white/70 text-[15px]">
            Vip İletişim Teknik Servis · Orijinal Parça · Aynı Gün Teslim
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">

          {tocItems.length >= 2 && <TableOfContents items={tocItems} />}

          {/* Ana içerik */}
          <div
            className="repair-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Desteklenen Modeller */}
          {displayModeller.length > 0 && (
            <section id="desteklenen-modeller" className="scroll-mt-20">
              <h2 className="mb-4 text-xl font-black text-zinc-900">
                Desteklenen {data.markaLabel} Modelleri
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {displayModeller.map((m) => (
                  <div
                    key={m.model}
                    className="flex items-center gap-2 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5"
                  >
                    <span className="shrink-0 text-green-500 font-black text-sm">✓</span>
                    <span className="text-[13px] font-bold text-zinc-800">{m.model}</span>
                  </div>
                ))}
              </div>
              <ModellerAccordion modeller={kalanModeller} />
              <p className="mt-3 text-[12px] text-zinc-400">
                Modeliniz listede yoksa{" "}
                <Link href="/iletisim" className="text-brand underline">bize ulaşın</Link>
                {" "}— desteklenip desteklenmediğini öğrenin.
              </p>
            </section>
          )}

          {/* Neden Vip İletişim */}
          <section>
            <h2 className="mb-4 scroll-mt-20 text-xl font-black text-zinc-900">
              Trabzon&apos;da {data.tamirLabel} İçin Neden Vip İletişim?
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { title: "Orijinal ve OEM Parça", desc: "Her tamir işleminde orijinal veya OEM kalitesinde yedek parça kullanılır." },
                { title: "Aynı Gün Teslim", desc: "Çoğu tamir 30–60 dakikada tamamlanır; aynı gün teslim edilir." },
                { title: "Ücretsiz Ön İnceleme", desc: "İşleme başlamadan önce ücretsiz tanı yapılır; onaylamazsanız ücret alınmaz." },
                { title: "90 Gün İşçilik Garantisi", desc: "Anakart onarımlarında ve kapsamlı tamirimlerde 90 gün garanti sunulur." },
                { title: "10+ Yıl Trabzon'da", desc: "Trabzon'un köklü teknik servisi olarak binlerce başarılı tamir geçmişimiz var." },
                { title: "Kargo ile Tamir", desc: `${regions.filter((r) => r.il !== "Trabzon").map((r) => r.il).join(", ")} ve çevre illerden kargo ile tamir imkânı.` },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                  <h3 className="mb-1 text-[14px] font-black text-zinc-800">{item.title}</h3>
                  <p className="text-[13px] text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <AuthorCard author={author} />

          {/* SSS */}
          {displayFaqs.length > 0 && (
            <div id="sikca-sorulan-sorular" className="scroll-mt-20">
              <ArticleFaq
                faqs={displayFaqs}
                title={`${data.title} Hakkında Sıkça Sorulan Sorular`}
              />
            </div>
          )}

          {/* Diğer tamir hizmetleri */}
          {digerTamirler.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-black text-zinc-900">
                {data.markaLabel} için Diğer Tamir Hizmetleri
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {digerTamirler.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tamir-hizmetleri/${t.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5 text-[13px] font-bold text-zinc-700 transition hover:border-accent hover:bg-yellow-50"
                  >
                    <span className="text-accent shrink-0">→</span>
                    Trabzon {data.markaLabel} {t.tamirLabel}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Kenar çubuğu */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <h3 className="mb-3 font-black text-zinc-900">Hemen İletişime Geç</h3>
            <a
              href={`tel:+${settings.telefonRaw}`}
              className="mb-2 flex items-center gap-2 rounded-lg bg-accent px-4 py-3 font-bold text-zinc-900 hover:bg-accent-hover"
            >
              📞 {settings.telefon}
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Vipiletisim.com.tr hoşgeldiniz - ${data.title} hakkında bilgi almak istiyorum.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-3 font-bold text-white hover:bg-whatsapp-hover"
            >
              💬 WhatsApp ile Yaz
            </a>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h3 className="mb-3 font-black text-zinc-900">Faydalı Linkler</h3>
            <ul className="space-y-2 text-[13px]">
              <li>
                <Link href="/fiyatlar" className="text-brand hover:underline font-bold">
                  {data.markaLabel} Tamir Fiyatları — Trabzon
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-brand hover:underline font-bold">
                  Kargo ile Tamir — Trabzon Teknik Servis
                </Link>
              </li>
              <li>
                <Link href="/" className="text-brand hover:underline font-bold">
                  Trabzon Telefon Teknik Servisi
                </Link>
              </li>
              <li>
                <Link href="/tamir-hizmetleri" className="text-brand hover:underline font-bold">
                  Tüm {data.markaLabel} Tamir Hizmetleri
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <h3 className="mb-3 font-black text-zinc-900">Tamir Özeti</h3>
            <dl className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Marka</dt>
                <dd className="font-bold text-zinc-800">{data.markaLabel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">İşlem</dt>
                <dd className="font-bold text-zinc-800">{data.tamirLabel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Süre</dt>
                <dd className="font-bold text-zinc-800">30–90 dk</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Lokasyon</dt>
                <dd className="font-bold text-zinc-800">Trabzon Merkez</dd>
              </div>
            </dl>
          </div>

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
        </aside>
      </div>
    </>
  );
}
