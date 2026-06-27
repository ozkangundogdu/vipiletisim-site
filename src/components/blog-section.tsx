import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

const AYLAR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getUTCDate()} ${AYLAR[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function BlogSection() {
  const posts = getAllPosts().slice(0, 6);

  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-[20px]" aria-labelledby="blog-baslik">
      <div className="mx-auto max-w-[1330px] px-6">

        <h2
          id="blog-baslik"
          className="text-center text-3xl font-black tracking-tight lg:text-4xl"
          style={{ color: '#1A3A6B' }}
        >
          Blog Yazıları
        </h2>
        <p className="mt-2 mb-[15px] text-center text-[15px] text-zinc-500">
          Telefon bakımı, tamir süreçleri ve teknik ipuçları hakkında Vip İletişim uzmanlarından güncel rehberler.
        </p>

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 shadow-sm transition hover:shadow-md"
                title={post.title}
              >
                <div className="relative h-36 w-full overflow-hidden lg:h-40">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-3">
                  <div className="flex items-center gap-2">
                    <time dateTime={post.publishedAt} className="text-[11px] font-medium text-zinc-400">
                      {formatDate(post.publishedAt)}
                    </time>
                    <span className="text-zinc-300">·</span>
                    <span className="text-[11px] text-zinc-400">{post.readingTime} dk</span>
                  </div>
                  <h3
                    className="text-[13px] font-black leading-snug transition-colors group-hover:[color:#0f2347] line-clamp-2"
                    style={{ color: '#1A3A6B' }}
                  >
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-[12px] leading-relaxed text-zinc-500">
                    {post.description}
                  </p>
                  <span
                    className="mt-auto pt-2 text-[12px] font-bold transition-colors group-hover:[color:#0f2347]"
                    style={{ color: '#1A3A6B' }}
                  >
                    Devamını Oku →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-lg border-2 border-[#1A3A6B] px-6 py-2.5 text-[14px] font-black text-[#1A3A6B] transition hover:bg-[#1A3A6B] hover:text-white"
          >
            Tüm Blog Yazıları →
          </Link>
        </div>

      </div>
    </section>
  );
}
