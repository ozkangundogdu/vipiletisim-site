import Link from "next/link";
import { cities } from "@/data/cities";
import { services } from "@/data/services";

const popularServices = [
  services.find(s => s.slug === "iphone-16-ekran-degisimi")!,
  services.find(s => s.slug === "iphone-15-pro-batarya-degisimi")!,
  services.find(s => s.slug === "iphone-14-sarj-soketi-tamiri")!,
  services.find(s => s.slug === "iphone-13-ekran-degisimi")!,
  services.find(s => s.slug === "iphone-x-batarya-degisimi")!,
  services.find(s => s.slug === "iphone-xr-ekran-degisimi")!,
  services.find(s => s.slug === "samsung-galaxy-s24-ekran-degisimi")!,
  services.find(s => s.slug === "samsung-a54-batarya-degisimi")!,
  services.find(s => s.slug === "xiaomi-ekran-degisimi")!,
  services.find(s => s.slug === "iphone-kamera-cami-degisimi")!,
];

const popularCities = cities.slice(0, 10);

export function PopularLinksSection() {
  return (
    <section className="bg-white py-[20px]" aria-label="Popüler bağlantılar">
      <div className="mx-auto max-w-[1330px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* Popüler Teknik Servisler */}
          <div>
            <h2 className="mb-4 text-xl font-black text-zinc-900">
              Popüler Teknik Servisler
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {popularServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/tamir-hizmetleri/${s.slug}`}
                    className="text-[14px] text-blue-600 hover:text-blue-800 hover:underline"
                    title={s.title}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/tamir-hizmetleri"
              className="mt-4 inline-block text-[13px] font-bold text-accent hover:underline"
            >
              Tüm Tamir Hizmetleri →
            </Link>
          </div>

          {/* Popüler Sayfalar — Yerel SEO */}
          <div>
            <h2 className="mb-4 text-xl font-black text-zinc-900">
              Popüler Sayfalar
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {popularCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/bolge/${c.slug}`}
                    className="text-[14px] text-blue-600 hover:text-blue-800 hover:underline"
                    title={c.title}
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/bolge"
              className="mt-4 inline-block text-[13px] font-bold text-accent hover:underline"
            >
              Tüm Bölgeler →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
