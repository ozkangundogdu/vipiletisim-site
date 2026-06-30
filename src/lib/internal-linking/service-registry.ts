import { getAllMarkaTamirler } from "@/lib/marka-tamir";
import { buildKeywordPool } from "./keyword-templates";
import { SERVICE_CATEGORY, TAMIR_PRIORITY, MARKA_WEIGHT } from "./category-map";
import type { Service, ServiceCategory } from "./types";

let cache: Service[] | null = null;

/**
 * content/marka-tamirler/*.json'daki 58 hizmet sayfasını okuyup
 * her biri için anchor havuzu, kategori ve öncelik skoru hesaplar.
 */
export function getAllServices(): Service[] {
  if (cache) return cache;

  cache = getAllMarkaTamirler()
    .map((m): Service | null => {
      const category = SERVICE_CATEGORY[m.tamirKey];
      if (!category) return null;

      const basePriority = TAMIR_PRIORITY[m.tamirKey] ?? 5;
      const markaWeight = MARKA_WEIGHT[m.marka] ?? 1;

      return {
        slug: m.slug,
        url: `/tamir-hizmetleri/${m.slug}`,
        title: m.title,
        marka: m.marka,
        markaLabel: m.markaLabel,
        tamirKey: m.tamirKey,
        tamirLabel: m.tamirLabel,
        category,
        priority: basePriority + markaWeight,
        keywordPool: buildKeywordPool(m.tamirKey, m.markaLabel),
      };
    })
    .filter((s): s is Service => s !== null && s.keywordPool.length > 0);

  return cache;
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return getAllServices().filter((s) => s.category === category);
}
