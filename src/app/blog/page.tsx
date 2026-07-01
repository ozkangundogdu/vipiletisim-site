import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 600;

const BASE = "https://vipiletisim.com.tr";

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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}): Promise<Metadata> {
  const { kategori } = await searchParams;

  if (kategori && CATEGORIES.includes(kategori) && kategori !== "Tümü") {
    return {
      title: `${kategori} Makaleleri — Trabzon Vip İletişim`,
      description: `Trabzon Vip İletişim teknik ekibinden ${kategori} kategorisindeki tüm makaleler. iPhone ve Android tamir rehberleri.`,
      keywords: ["trabzon telefon tamiri", kategori.toLowerCase(), "trabzon vip iletişim"],
      alternates: { canonical: `${BASE}/blog?kategori=${encodeURIComponent(kategori)}` },
      openGraph: {
        title: `${kategori} Makaleleri | Trabzon Vip İletişim`,
        description: `Trabzon Vip İletişim'den ${kategori} kategorisindeki uzman makaleler.`,
        url: `${BASE}/blog?kategori=${encodeURIComponent(kategori)}`,
      },
    };
  }

  return {
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
    alternates: { canonical: `${BASE}/blog` },
    openGraph: {
      title: "Telefon Tamir Rehberleri | Trabzon Vip İletişim",
      description:
        "iPhone ve Android telefon tamir rehberleri, arıza tanı ipuçları ve bakım önerileri. Trabzon Vip İletişim teknik ekibinden.",
      url: `${BASE}/blog`,
      images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630, alt: "Trabzon Telefon Tamir Rehberleri" }],
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const allPosts = getAllPosts();

  const activeCategory = kategori && CATEGORIES.includes(kategori) ? kategori : "Tümü";
  const posts = activeCategory === "Tümü"
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      ...(activeCategory !== "Tümü"
        ? [{ "@type": "ListItem", position: 3, name: activeCategory, item: `${BASE}/blog?kategori=${encodeURIComponent(activeCategory)}` }]
        : []),
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: activeCategory === "Tümü" ? "Vip İletişim Blog Yazıları" : `${activeCategory} Makaleleri`,
    url: activeCategory === "Tümü" ? `${BASE}/blog` : `${BASE}/blog?kategori=${encodeURIComponent(activeCategory)}`,
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/blog/${p.slug}`,
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
              {activeCategory !== "Tümü" ? (
                <>
                  <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                  <span className="mx-2">/</span>
                  <span className="text-white">{activeCategory}</span>
                </>
              ) : (
                <span className="text-white">Blog</span>
              )}
            </nav>
            <h1 className="text-3xl font-black text-white lg:text-4xl">
              {activeCategory === "Tümü" ? "Blog & Tamir Rehberleri" : `${activeCategory} Makaleleri`}
            </h1>
            <p className="mt-3 max-w-2xl text-[16px] text-white/70">
              {activeCategory === "Tümü"
                ? "iPhone ve Android telefon arızaları hakkında uzman rehberler. Kendi sorununuzu tanıyın, doğru kararı verin."
                : `Trabzon Vip İletişim teknik ekibinden ${activeCategory} kategorisindeki tüm makaleler.`}
            </p>
          </div>
        </section>

        {/* Kategori Filtresi */}
        <div className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-[1330px] overflow-x-auto px-6">
            <div className="flex gap-1 py-3">
              {CATEGORIES.map((cat) => {
                const href = cat === "Tümü" ? "/blog" : `/blog?kategori=${encodeURIComponent(cat)}`;
                const isActive = cat === activeCategory;
                return (
                  <Link
                    key={cat}
                    href={href}
                    className={`shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-bold transition-colors ${
                      isActive
                        ? "border-brand bg-brand text-white"
                        : "border-zinc-200 text-zinc-600 hover:border-brand hover:text-brand"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sonuç sayısı */}
        {activeCategory !== "Tümü" && (
          <div className="mx-auto max-w-[1330px] px-6 pt-6">
            <p className="text-[14px] text-zinc-500">
              <span className="font-bold text-zinc-900">{posts.length}</span> makale bulundu
            </p>
          </div>
        )}

        {/* Makale Grid */}
        <div className="mx-auto max-w-[1330px] px-6 py-8">
          {posts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-zinc-500">Bu kategoride henüz makale bulunmuyor.</p>
              <Link href="/blog" className="mt-4 inline-block text-[14px] font-bold text-brand hover:underline">
                Tüm makalelere dön →
              </Link>
            </div>
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
                        alt={post.coverImageAlt || post.title}
                        title={post.coverImageAlt || post.title}
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
                href={`https://wa.me/905052754540?text=${encodeURIComponent("Vipiletisim.com.tr hoşgeldiniz - Blog yazıları hakkında bilgi almak istiyorum.")}`}
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
