import type { Metadata } from "next";
import Link from "next/link";
import { services, repairTypeList } from "@/data/services";
import { cities } from "@/data/cities";
import { getAllPosts } from "@/lib/blog";

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" için arama sonuçları` : "Arama",
    description: "Vip İletişim Trabzon — telefon tamiri hizmetleri, modeller ve blog yazılarında arama yapın.",
    robots: { index: false, follow: true },
  };
}

function normalize(str: string) {
  return str
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c");
}

function matches(text: string, q: string) {
  return normalize(text).includes(normalize(q));
}

const brandLabels: Record<string, string> = {
  iphone: "iPhone",
  samsung: "Samsung",
  xiaomi: "Xiaomi",
};

export default async function AramaPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  // 1. Marka eşleşmesi — "samsung", "iphone", "xiaomi"
  const brandMatches = Object.entries(brandLabels).filter(
    ([key, label]) => matches(key, query) || matches(label, query)
  );

  // 2. Model eşleşmesi — benzersiz modeller
  const modelMatches = services
    .filter((s) => matches(s.model, query))
    .reduce<{ model: string; brand: string; slug: string }[]>((acc, s) => {
      if (!acc.some((r) => r.model === s.model)) {
        acc.push({ model: s.model, brand: s.brand, slug: s.slug });
      }
      return acc;
    }, [])
    .slice(0, 8);

  // 3. Arıza türü eşleşmesi — benzersiz arıza tipleri
  const repairMatches = repairTypeList
    .filter((r) => matches(r.label, query) || matches(r.key, query))
    .slice(0, 8);

  // 4. Bölge eşleşmesi
  const cityMatches = cities
    .filter((c) => matches(c.name, query) || matches(c.il, query) || matches(c.title, query))
    .slice(0, 6);

  // 5. Blog eşleşmesi
  const blogMatches = getAllPosts()
    .filter(
      (p) =>
        matches(p.title, query) ||
        matches(p.description, query) ||
        p.keywords.some((k) => matches(k, query))
    )
    .slice(0, 5);

  const total =
    brandMatches.length +
    modelMatches.length +
    repairMatches.length +
    cityMatches.length +
    blogMatches.length;

  return (
    <main className="mx-auto max-w-[1330px] px-6 py-10">
      <h1 className="text-2xl font-black text-zinc-900">
        {query ? (
          <>
            <span className="text-accent">"{query}"</span> için arama sonuçları
          </>
        ) : (
          "Arama"
        )}
      </h1>

      {query && (
        <p className="mt-1 text-sm text-zinc-500">
          {total > 0 ? `${total} sonuç bulundu.` : "Sonuç bulunamadı."}
        </p>
      )}

      {!query && (
        <p className="mt-4 text-zinc-500">Aramak istediğiniz marka, model veya hizmeti yazın.</p>
      )}

      {query && total === 0 && (
        <div className="mt-8 rounded-xl border border-zinc-100 bg-zinc-50 p-8 text-center">
          <p className="text-zinc-600">
            <strong>"{query}"</strong> ile eşleşen sonuç bulunamadı.
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Farklı bir kelime deneyin veya{" "}
            <Link href="/iletisim" className="text-accent underline">
              bize ulaşın
            </Link>
            .
          </p>
        </div>
      )}

      {/* Marka sonuçları */}
      {brandMatches.length > 0 && (
        <section className="mt-8" aria-labelledby="marka-sonuclari">
          <h2 id="marka-sonuclari" className="mb-3 text-lg font-black text-zinc-800">
            Marka
          </h2>
          <ul className="flex flex-wrap gap-3">
            {brandMatches.map(([key, label]) => (
              <li key={key}>
                <Link
                  href={`/tamir-sihirbazi?marka=${key}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-3 text-sm font-bold text-zinc-800 shadow-sm transition hover:border-accent hover:text-accent"
                >
                  {label} Tamiri →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Model sonuçları */}
      {modelMatches.length > 0 && (
        <section className="mt-8" aria-labelledby="model-sonuclari">
          <h2 id="model-sonuclari" className="mb-3 text-lg font-black text-zinc-800">
            Modeller
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {modelMatches.map((m) => (
              <li key={m.model}>
                <Link
                  href={`/tamir-sihirbazi?marka=${m.brand}&model=${encodeURIComponent(m.model)}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-100 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-accent hover:text-accent"
                >
                  <span>{m.model}</span>
                  <span className="text-xs font-medium capitalize text-zinc-400">
                    {brandLabels[m.brand]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Arıza türü sonuçları */}
      {repairMatches.length > 0 && (
        <section className="mt-8" aria-labelledby="ariza-sonuclari">
          <h2 id="ariza-sonuclari" className="mb-3 text-lg font-black text-zinc-800">
            Tamir Türleri
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {repairMatches.map((r) => (
              <li key={r.key}>
                <Link
                  href={`/tamir-sihirbazi?ariza=${r.key}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-100 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-accent hover:text-accent"
                >
                  <span>{r.label}</span>
                  <span className="text-xs font-medium text-zinc-400">{r.duration}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bölge sonuçları */}
      {cityMatches.length > 0 && (
        <section className="mt-8" aria-labelledby="bolge-sonuclari">
          <h2 id="bolge-sonuclari" className="mb-3 text-lg font-black text-zinc-800">
            Bölgeler
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {cityMatches.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/bolge/${c.slug}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-100 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-accent hover:text-accent"
                >
                  <span>{c.title}</span>
                  <span className="text-xs font-medium text-zinc-400">{c.il}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Blog sonuçları */}
      {blogMatches.length > 0 && (
        <section className="mt-8" aria-labelledby="blog-sonuclari">
          <h2 id="blog-sonuclari" className="mb-3 text-lg font-black text-zinc-800">
            Blog Yazıları
          </h2>
          <ul className="grid gap-2">
            {blogMatches.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block rounded-lg border border-zinc-100 bg-white px-4 py-3 shadow-sm transition hover:border-accent"
                >
                  <p className="text-sm font-bold text-zinc-800 hover:text-accent">{p.title}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-zinc-500">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
