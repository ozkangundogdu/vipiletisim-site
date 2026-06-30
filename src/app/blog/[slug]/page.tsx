import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts, getPostBySlug, getAllSlugs } from "@/lib/blog";
import { getSettings } from "@/lib/settings";
import { TableOfContents, extractToc, slugifyHeading } from "@/components/table-of-contents";
import { AuthorCard, type AuthorInfo } from "@/components/author-card";

export const revalidate = 600;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://vipiletisim.com.tr/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Trabzon Vip İletişim`,
      description: post.description,
      url: `https://vipiletisim.com.tr/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
  };
}

const AYLAR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getUTCDate()} ${AYLAR[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function getChildText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getChildText).join("");
  if (children && typeof children === "object" && "props" in (children as object)) {
    return getChildText((children as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

function makeMdxComponents() {
  return {
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = getChildText(children);
      const id = slugifyHeading(text);
      return (
        <h2 id={id} className="mb-3 mt-8 scroll-mt-20 text-xl font-black text-zinc-900 first:mt-0" {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = getChildText(children);
      const id = slugifyHeading(text);
      return (
        <h3 id={id} className="mb-2 mt-6 scroll-mt-20 text-[17px] font-black text-zinc-800" {...props}>
          {children}
        </h3>
      );
    },
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="mb-4 text-[15px] leading-relaxed text-zinc-600" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="mb-4 list-disc space-y-1.5 pl-5 text-[15px] text-zinc-600" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-[15px] text-zinc-600" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
      <li className="leading-relaxed" {...props} />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
      <strong className="font-black text-zinc-800" {...props} />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a className="font-bold text-brand underline hover:text-brand/80" {...props} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
      <blockquote className="my-4 border-l-4 border-brand bg-zinc-50 py-3 pl-4 pr-3 text-[14px] text-zinc-600 not-italic" {...props} />
    ),
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full border-collapse text-[14px]" {...props} />
      </div>
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
      <th className="border border-zinc-200 bg-zinc-100 px-4 py-2 text-left font-black text-zinc-800" {...props} />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
      <td className="border border-zinc-200 px-4 py-2 text-zinc-600" {...props} />
    ),
    hr: () => <hr className="my-8 border-zinc-200" />,
  };
}

function getAuthor(): AuthorInfo {
  try {
    const file = path.join(process.cwd(), "content/pages/ekibimiz.json");
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    const member = data.members?.[0];
    if (member) return { name: member.name, title: member.title, experience: member.experience, bio: member.bio, image: member.image };
  } catch { /* fallback */ }
  return { name: "Fatih Cömert", title: "Baş Teknisyen & Eğitmen", experience: "15 Yıllık Deneyim", bio: "Vip İletişim baş teknisyeni.", image: "/images/team/fatih-comert.jpg" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const settings = getSettings();
  const author = getAuthor();
  const tocItems = extractToc(post.content);
  const regions = settings.hizmetBolgeleri ?? [];

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);
  const otherPosts = allPosts
    .filter((p) => p.slug !== slug && p.category !== post.category)
    .slice(0, related.length < 3 ? 3 - related.length : 0);
  const sidebar = [...related, ...otherPosts].slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `https://vipiletisim.com.tr${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      url: "https://vipiletisim.com.tr/kurumsal/ekibimiz",
      image: author.image ? `https://vipiletisim.com.tr${author.image}` : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Trabzon Vip İletişim",
      url: "https://vipiletisim.com.tr",
      logo: { "@type": "ImageObject", url: "https://vipiletisim.com.tr/images/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vipiletisim.com.tr/blog/${slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://vipiletisim.com.tr" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://vipiletisim.com.tr/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://vipiletisim.com.tr/blog/${slug}` },
    ],
  };

  const mdxComponents = makeMdxComponents();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteHeader />

      <main className="mx-auto max-w-[1330px] px-6 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">Anasayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-zinc-800">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800 line-clamp-1">{post.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Ana İçerik */}
          <article>
            {/* Başlık */}
            <div className="mb-6">
              <span className="mb-3 inline-block rounded-full bg-zinc-100 px-3 py-0.5 text-[12px] font-bold text-zinc-600">
                {post.category}
              </span>
              <h1 className="mb-4 text-2xl font-black leading-tight text-zinc-900 lg:text-3xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-[13px] text-zinc-500 flex-wrap">
                <Link href="/kurumsal/ekibimiz" className="flex items-center gap-1.5 hover:text-brand transition-colors">
                  {author.image && (
                    <Image src={author.image} alt={author.name} width={22} height={22} className="rounded-full object-cover" style={{ objectPosition: "center top" }} />
                  )}
                  <span>{author.name}</span>
                </Link>
                <span>·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>·</span>
                <span>{post.readingTime} dk okuma</span>
              </div>
            </div>

            {/* Kapak Görseli */}
            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl bg-zinc-100 lg:h-80">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
              />
            </div>

            {/* TOC */}
            <TableOfContents items={tocItems} />

            {/* MDX İçerik */}
            <div className="prose-custom">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Yazar Kartı */}
            <div className="mt-10">
              <AuthorCard author={author} />
            </div>

            {/* Alt CTA */}
            <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
              <h3 className="mb-1 text-[17px] font-black text-zinc-900">
                Telefonunuzda Bu Sorun mu Var?
              </h3>
              <p className="mb-4 text-[14px] text-zinc-500">
                Trabzon Vip İletişim Teknik Servis'te ücretsiz ön inceleme yaptırın.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:+${settings.telefonRaw}`}
                  className="rounded-lg bg-accent px-5 py-2.5 text-[14px] font-black text-zinc-900 hover:bg-accent-hover transition-colors"
                >
                  {settings.telefon}
                </a>
                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-whatsapp px-5 py-2.5 text-[14px] font-black text-white hover:bg-whatsapp-hover transition-colors"
                >
                  WhatsApp ile Yaz
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* İletişim Kartı */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="mb-1 text-[13px] font-black uppercase tracking-wide text-zinc-400">
                Hızlı İletişim
              </p>
              <p className="mb-4 text-[15px] font-black text-zinc-900">
                Ücretsiz ön inceleme için bizi arayın
              </p>
              <a
                href={`tel:+${settings.telefonRaw}`}
                className="mb-2 flex items-center justify-center gap-2 rounded-lg bg-accent py-3 text-[14px] font-black text-zinc-900 hover:bg-accent-hover transition-colors"
              >
                {settings.telefon}
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 text-[14px] font-black text-white hover:bg-whatsapp-hover transition-colors"
              >
                WhatsApp
              </a>
            </div>

            {/* Hizmet Bölgeleri */}
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
                <p className="mt-3 text-[11px] text-zinc-400">
                  Kargo ile tamir için bize yazın.
                </p>
              </div>
            )}

            {/* İlgili Makaleler */}
            {sidebar.length > 0 && (
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <p className="mb-4 text-[13px] font-black uppercase tracking-wide text-zinc-400">
                  İlgili Makaleler
                </p>
                <div className="space-y-4">
                  {sidebar.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group flex gap-3"
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                        <Image
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          className="object-cover transition group-hover:scale-105"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold leading-snug text-zinc-800 group-hover:text-brand transition-colors line-clamp-2">
                          {p.title}
                        </p>
                        <p className="mt-1 text-[12px] text-zinc-400">{p.readingTime} dk okuma</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Blog'a Dön */}
            <Link
              href="/blog"
              className="flex items-center gap-2 text-[14px] font-bold text-brand hover:underline"
            >
              ← Tüm Makaleler
            </Link>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
