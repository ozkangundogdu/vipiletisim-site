import Image from "next/image";
import Link from "next/link";

const brands = [
  { name: "Apple",   logo: "/images/brands/apple.webp",   href: "/tamir-hizmetleri/iphone-16-ekran-degisimi",   width: 80,  height: 80  },
  { name: "Samsung", logo: "/images/brands/samsung.webp", href: "/tamir-hizmetleri/samsung-galaxy-s24-ekran-degisimi", width: 160, height: 53  },
  { name: "Xiaomi",  logo: "/images/brands/xiaomi.png",   href: "/tamir-hizmetleri/xiaomi-ekran-degisimi",  width: 80,  height: 80  },
  { name: "Huawei",  logo: "/images/brands/huawei.webp",  href: "/tamir-hizmetleri/huawei-ekran-degisimi",  width: 100, height: 100 },
  { name: "Oppo",    logo: "/images/brands/oppo.webp",    href: "/tamir-hizmetleri/oppo-ekran-degisimi",    width: 150, height: 50  },
];

export function BrandsSection() {
  return (
    <section className="bg-white py-[20px]" aria-labelledby="markalar-baslik">

      {/* Başlık */}
      <div className="text-center">
        <h2
          id="markalar-baslik"
          className="mb-[15px] text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl"
        >
          Hizmet Verdiğimiz Markalar
        </h2>
      </div>

      {/* Logolar — gri arka planda */}
      <div className="bg-brands-bg">
        <div className="mx-auto flex max-w-[1330px] items-center justify-center divide-x divide-brands-divider px-6">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="group flex flex-1 items-center justify-center py-8 transition hover:bg-black/5"
              aria-label={`${brand.name} tamiri`}
            >
              <div className="flex h-16 items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.width}
                  height={brand.height}
                  className="max-h-16 w-auto object-contain transition group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}
