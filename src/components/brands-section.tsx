import Image from "next/image";

const brands = [
  { name: "Apple",   logo: "/images/brands/apple.webp",   width: 80,  height: 80  },
  { name: "Samsung", logo: "/images/brands/samsung.webp", width: 160, height: 53  },
  { name: "Xiaomi",  logo: "/images/brands/xiaomi.png",   width: 80,  height: 80  },
  { name: "Huawei",  logo: "/images/brands/huawei.webp",  width: 100, height: 100 },
  { name: "Oppo",    logo: "/images/brands/oppo.webp",    width: 150, height: 50  },
];

export function BrandsSection() {
  return (
    <section className="bg-white py-[20px]" aria-labelledby="markalar-baslik">

      {/* Başlık */}
      <div className="text-center">
        <h2
          id="markalar-baslik"
          className="text-3xl font-black tracking-tight lg:text-4xl"
          style={{ color: '#1A3A6B' }}
        >
          Hizmet Verdiğimiz Markalar
        </h2>
        <p className="mt-2 mb-[15px] text-[15px] text-zinc-500">
          Trabzon'da Apple, Samsung ve Xiaomi başta olmak üzere tüm akıllı telefon markalarında uzman teknik servis.
        </p>
      </div>

      {/* Logolar — gri arka planda */}
      <div className="bg-brands-bg">
        <div className="mx-auto flex max-w-[1330px] items-center justify-center divide-x divide-brands-divider px-6">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-1 items-center justify-center py-8">
              <div className="flex h-16 items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.width}
                  height={brand.height}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
