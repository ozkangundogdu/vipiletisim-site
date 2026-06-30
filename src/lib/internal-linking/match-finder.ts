import { findPhrase } from "./text-match";
import type { Service } from "./types";

export type UsableMatch = {
  service: Service;
  anchorText: string;
  start: number;
  end: number;
};

/**
 * Verilen metinde, henüz kullanılmamış bir hizmetin henüz kullanılmamış bir
 * anchor ifadesini arar. Hizmetler skora göre sıralı geldiği için ilk uygun
 * eşleşme aynı zamanda en alakalı olandır.
 */
export function findFirstUsableMatch(
  text: string,
  scoredServices: Service[],
  usedUrls: Set<string>,
  usedAnchors: Set<string>
): UsableMatch | null {
  for (const service of scoredServices) {
    if (usedUrls.has(service.url)) continue;

    for (const phrase of service.keywordPool) {
      const m = findPhrase(text, phrase);
      if (!m) continue;

      const anchorKey = m.matchedText.toLocaleLowerCase("tr-TR");
      if (usedAnchors.has(anchorKey)) continue;

      return { service, anchorText: m.matchedText, start: m.start, end: m.end };
    }
  }
  return null;
}
