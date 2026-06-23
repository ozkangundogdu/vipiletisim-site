import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/data/cities";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Hizmet Bölgeleri | Vip İletişim Trabzon",
  description: "Trabzon, Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan telefon tamiri için Vip İletişim. Kargo ile tamir imkânı.",
};

const iller = ["Trabzon", "Giresun", "Rize", "Artvin", "Gümüşhane", "Bayburt"];

export default function CitiesListPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1330px] px-6 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800">Hizmet Bölgeleri</span>
        </nav>

        <h1 className="mb-2 text-3xl font-black text-zinc-900 lg:text-4xl">
          Hizmet Bölgeleri
        </h1>
        <p className="mb-10 text-[15px] text-zinc-600">
          Trabzon ve çevre illerdeki müşterilerimize teknik servis hizmeti sunuyoruz.
          Kargo ile cihazınızı gönderin, tamir sonrası kapınıza gönderelim.
        </p>

        <div className="space-y-8">
          {iller.map((il) => {
            const ilCities = cities.filter((c) => c.il === il);
            return (
              <div key={il}>
                <h2 className="mb-3 text-lg font-black text-zinc-900 border-b border-zinc-200 pb-2">{il}</h2>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {ilCities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/bolge/${c.slug}`}
                        className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-[13px] font-bold text-zinc-800 hover:border-accent hover:bg-white"
                      >
                        {c.name}
                        <span className="text-accent">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
