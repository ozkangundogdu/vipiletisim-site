import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Telefon Tamir Rehberleri — Trabzon",
  description:
    "Trabzon Vip İletişim teknik ekibinden iPhone ve Android tamir rehberleri. Arıza tanı ipuçları, bakım önerileri ve pratik çözümler her hafta yayınlanıyor.",
  keywords: [
    "trabzon iphone tamir rehberi",
    "telefon arıza çözümü trabzon",
    "trabzon telefon tamiri blog",
    "iphone batarya sorunları",
    "android tamir ipuçları",
    "trabzon cep telefonu bakım",
  ],
  alternates: { canonical: "https://vipiletisim.com.tr/blog" },
  openGraph: {
    title: "Telefon Tamir Rehberleri | Vip İletişim Trabzon",
    description:
      "iPhone ve Android telefon tamir rehberleri, arıza tanı ipuçları ve bakım önerileri. Trabzon Vip İletişim teknik ekibinden.",
    url: "https://vipiletisim.com.tr/blog",
    images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630, alt: "Trabzon Telefon Tamir Rehberleri" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://vipiletisim.com.tr" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://vipiletisim.com.tr/blog" },
  ],
};

const CATEGORIES = ["Tümü", "Tamir Rehberi", "Arıza Rehberi", "iPhone Sorunları", "Acil Rehber", "Hizmet Rehberi"];

const AYLAR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getUTCDate()} ${AYLAR[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    "Tamir Rehberi": "bg-blue-100 text-blue-700",
    "Arıza Rehberi": "bg-orange-100 text-orange-700",
    "iPhone Sorunları": "bg-zinc-100 text-zinc-700",
    "Acil Rehber": "bg-red-100 text-red-700",
    "Hizmet Rehberi": "bg-green-100 text-green-700",
  };
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-[12px] font-bold ${colors[category] ?? "bg-zinc-100 text-zinc-600"}`}>
      {category}
    </span>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Vip İletişim Blog Yazıları",
    url: "https://vipiletisim.com.tr/blog",
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://vipiletisim.com.tr/blog/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="bg-surface-hero py-6 lg:py-8">
          <div className="mx-auto max-w-[1330px] px-6">
            <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-zinc-400">
              <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Blog</span>
            </nav>
            <h1 className="text-3xl font-black text-white lg:text-4xl">
              Blog & Tamir Rehberleri
            </h1>
            <p className="mt-3 max-w-2xl text-[16px] text-white/70">
              iPhone ve Android telefon arızaları hakkında uzman rehberler. Kendi sorununuzu tanıyın, doğru kararı verin.
            </p>
          </div>
        </section>

        {/* Kategori Filtresi */}
        <div className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-[1330px] overflow-x-auto px-6">
            <div className="flex gap-1 py-3">
              {CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="shrink-0 rounded-full border border-zinc-200 px-4 py-1.5 text-[13px] font-bold text-zinc-600 hover:border-brand hover:text-brand cursor-pointer transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Makale Grid */}
        <div className="mx-auto max-w-[1330px] px-6 py-12">
          {posts.length === 0 ? (
            <p className="text-center text-zinc-500">Henüz yayınlanmış makale bulunmuyor.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <CategoryBadge category={post.category} />
                      <span className="text-[12px] text-zinc-400">{post.readingTime} dk okuma</span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="mb-2 text-[16px] font-black leading-snug text-zinc-900 group-hover:text-brand transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="mb-4 flex-1 text-[14px] leading-relaxed text-zinc-500 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                      <time className="text-[12px] text-zinc-400" dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[13px] font-bold text-brand hover:underline"
                      >
                        Devamını Oku →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* CTA Alt Bant */}
        <section className="bg-surface-hero py-6">
          <div className="mx-auto max-w-[1330px] px-6 text-center">
            <h2 className="text-2xl font-black text-white">Telefonunuzla İlgili Sorunuz mu Var?</h2>
            <p className="mt-2 text-white/70">Ücretsiz ön inceleme için bizi arayın veya WhatsApp'tan yazın.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="tel:+905052754540"
                className="rounded-lg bg-accent px-6 py-3 font-black text-zinc-900 hover:bg-accent-hover transition-colors"
              >
                +90 (505) 275 45 40
              </a>
              <a
                href="https://wa.me/905052754540"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-whatsapp px-6 py-3 font-black text-white hover:bg-whatsapp-hover transition-colors"
              >
                WhatsApp ile Yaz
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
