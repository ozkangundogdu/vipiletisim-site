import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    slug: "iphone-ekran-degisimi-rehberi",
    title: "iPhone Ekran Değişimi Hakkında Bilmeniz Gerekenler",
    excerpt: "iPhone ekranınız kırıldığında paniklememeniz için bilmeniz gereken her şey bu rehberde.",
    image: "/images/hero/phone-repair-hero.webp",
    date: "2026-06-01",
    dateLabel: "1 Haziran 2026",
  },
  {
    slug: "samsung-batarya-omru-uzatma",
    title: "Samsung Telefon Batarya Ömrünü Uzatmanın 7 Yolu",
    excerpt: "Bataryanızı daha uzun süre sağlıklı tutmak için günlük hayatta uygulayabileceğiniz pratik ipuçları.",
    image: "/images/hero/phone-repair-hero.webp",
    date: "2026-06-03",
    dateLabel: "3 Haziran 2026",
  },
  {
    slug: "telefon-suya-dustugunde-ne-yapilir",
    title: "Telefonunuz Suya Düştüğünde İlk Yapmanız Gerekenler",
    excerpt: "Suya düşen telefonu kurtarmanın altın kuralları ve kesinlikle yapmamanız gereken hatalar.",
    image: "/images/hero/phone-repair-hero.webp",
    date: "2026-06-05",
    dateLabel: "5 Haziran 2026",
  },
  {
    slug: "orjinal-parca-mi-muadil-mi",
    title: "Orijinal Parça mı, Muadil mi? Farkı Ne?",
    excerpt: "Telefon tamirinde orijinal ve muadil parça arasındaki fark nedir, hangisi daha iyi tercih?",
    image: "/images/hero/phone-repair-hero.webp",
    date: "2026-06-07",
    dateLabel: "7 Haziran 2026",
  },
  {
    slug: "xiaomi-sarj-almama-sorunu",
    title: "Xiaomi Telefonlarda Şarj Almama Sorunu ve Çözümü",
    excerpt: "Xiaomi cihazlarda sık karşılaşılan şarj sorunlarının nedenleri ve teknik servis öncesi deneyebileceğiniz çözümler.",
    image: "/images/hero/phone-repair-hero.webp",
    date: "2026-06-09",
    dateLabel: "9 Haziran 2026",
  },
  {
    slug: "huawei-kamera-kalitesi-dustu",
    title: "Huawei Kameranız Neden Bulanık Çekiyor?",
    excerpt: "Kamera camı çizilmesi, sensör arızası veya yazılım sorunları — kamera kalitesi düşüşünün gerçek sebebi.",
    image: "/images/hero/phone-repair-hero.webp",
    date: "2026-06-11",
    dateLabel: "11 Haziran 2026",
  },
];

export function BlogSection() {
  return (
    <section className="bg-white py-[20px]" aria-labelledby="blog-baslik">
      <div className="mx-auto max-w-[1330px] px-6">

        <h2
          id="blog-baslik"
          className="mb-[15px] text-center text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl"
        >
          Blog Yazıları
        </h2>

        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 shadow-sm transition hover:shadow-md"
                title={post.title}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <time
                    dateTime={post.date}
                    className="text-[12px] font-medium text-zinc-400"
                  >
                    {post.dateLabel}
                  </time>
                  <h3 className="text-[15px] font-black leading-snug text-zinc-900 group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-3 text-[13px] leading-relaxed text-zinc-500">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-3 text-[13px] font-bold text-accent">
                    Devamını Oku →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
