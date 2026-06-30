import { getAllServices } from "./service-registry";
import { buildGenericTopicTerms } from "./keyword-templates";
import { SERVICE_CATEGORY } from "./category-map";
import { findPhrase, normalizeTr, stableHashIndex, rotatePool } from "./text-match";
import type { BlogPost, Service, ServiceCategory } from "./types";

const CATEGORY_BOOST = 8;
const KEYWORD_BOOST = 3;
const BRAND_MATCH_BOOST = 2;

const BRAND_PATTERNS: Record<string, RegExp> = {
  iphone: /\biphone\b/gi,
  samsung: /\b(samsung|galaxy)\b/gi,
  xiaomi: /\b(xiaomi|redmi|poco)\b/gi,
};

/**
 * İçerikte hangi markadan en çok bahsedildiğini tespit eder. Hiç marka adı
 * geçmiyorsa sitenin ana odağı olan iPhone'a düşülür. Bu, markasız geçen
 * genel ifadelerin ("hoparlör değişimi" gibi) hangi marka sayfasına
 * bağlanacağına karar vermek için kullanılır.
 */
export function inferPrimaryBrand(content: string): "iphone" | "samsung" | "xiaomi" {
  let best: "iphone" | "samsung" | "xiaomi" = "iphone";
  let bestCount = 0;
  for (const [brand, pattern] of Object.entries(BRAND_PATTERNS)) {
    const count = content.match(pattern)?.length ?? 0;
    if (count > bestCount) {
      bestCount = count;
      best = brand as typeof best;
    }
  }
  return best;
}

/**
 * Yazının kategori alanı genel olduğu için (Tamir Rehberi, Arıza Rehberi vb.),
 * gerçek alaka düzeyi içerikte hangi konu kategorilerinin fiilen geçtiğine
 * bakılarak belirlenir. Marka adı (iPhone/Samsung/Xiaomi) burada zorunlu
 * tutulmaz — gerçek blog metinleri çoğunlukla markasız genel cümleler kurar
 * ("telefon bataryası şişti" gibi). Marka-özel eşleştirme yalnızca
 * içerik içine link eklenirken (findFirstUsableMatch) aranır.
 */
export function detectContentCategories(content: string): Map<ServiceCategory, number> {
  const hits = new Map<ServiceCategory, number>();
  const normalized = normalizeTr(content);

  for (const [tamirKey, category] of Object.entries(SERVICE_CATEGORY)) {
    const terms = buildGenericTopicTerms(tamirKey);
    const matchCount = terms.filter((term) => findPhrase(normalized, term) !== null).length;
    if (matchCount > 0) {
      hits.set(category, (hits.get(category) ?? 0) + matchCount);
    }
  }
  return hits;
}

/**
 * Tüm hizmetleri, bu yazıyla alaka düzeyine göre skorlayıp sıralar.
 * Her hizmetin keywordPool'u, yazı-hizmet çiftine özgü deterministik bir
 * indeksten başlayarak döndürülür — aynı hizmete her yazıda farklı anchor.
 */
export function scoreServicesForPost(post: Pick<BlogPost, "slug" | "content" | "keywords">): Service[] {
  const categoryHits = detectContentCategories(post.content);
  const topCategory = [...categoryHits.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  const primaryBrand = inferPrimaryBrand(post.content);
  const normalizedKeywords = (post.keywords ?? []).map(normalizeTr);

  return getAllServices()
    .map((service) => {
      let score = service.priority;
      if (topCategory && service.category === topCategory) score += CATEGORY_BOOST;
      if (service.marka === primaryBrand) score += BRAND_MATCH_BOOST;
      if (normalizedKeywords.some((k) => k.includes(normalizeTr(service.tamirLabel)))) {
        score += KEYWORD_BOOST;
      }

      const rotateSeed = stableHashIndex(`${post.slug}:${service.slug}`, service.keywordPool.length);
      let keywordPool = rotatePool(service.keywordPool, rotateSeed);

      // Marka adı geçmeyen genel ifadeler ("hoparlör değişimi") yalnızca
      // içerikte baskın olan markanın sayfasına yedek olarak eklenir —
      // marka-özel ifadeler her zaman önce denenir.
      if (service.marka === primaryBrand) {
        const generic = buildGenericTopicTerms(service.tamirKey).filter((t) => !keywordPool.includes(t));
        keywordPool = [...keywordPool, ...generic];
      }

      return { ...service, keywordPool, _score: score };
    })
    .sort((a, b) => b._score - a._score)
    .map(({ _score, ...service }) => service);
}

export function pickRelatedServices(
  scoredServices: Service[],
  excludeUrls: Set<string>,
  min = 2,
  max = 4
): Service[] {
  const candidates = scoredServices.filter((s) => !excludeUrls.has(s.url));
  return candidates.slice(0, Math.max(min, Math.min(max, candidates.length)));
}
