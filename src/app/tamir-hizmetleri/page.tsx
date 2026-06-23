import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Tamir Hizmetleri | Vip İletişim Trabzon",
  description: "Trabzon'da iPhone, Samsung, Xiaomi, Huawei ve Oppo tamir hizmetleri. Ekran, batarya, şarj soketi ve daha fazlası için Vip İletişim.",
};

export default function ServicesListPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1330px] px-6 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800">Tamir Hizmetleri</span>
        </nav>

        <h1 className="mb-2 text-3xl font-black text-zinc-900 lg:text-4xl">
          Trabzon Telefon Tamir Hizmetleri
        </h1>
        <p className="mb-8 text-[15px] text-zinc-600">
          iPhone, Samsung, Xiaomi, Huawei ve Oppo dahil tüm marka ve modellerde profesyonel tamir hizmeti.
        </p>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/tamir-hizmetleri/${s.slug}`}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-[14px] font-bold text-zinc-800 hover:border-accent hover:bg-white"
              >
                {s.title}
                <span className="text-accent">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
