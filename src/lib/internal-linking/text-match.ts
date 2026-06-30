const TR_LETTER = /[a-zçğıiöşü]/i;

/** Türkçe büyük/küçük harf kurallarına uygun normalize (İ→i, I→ı). */
export function normalizeTr(text: string): string {
  return text.toLocaleLowerCase("tr-TR").normalize("NFC");
}

function isTrLetter(ch: string | undefined): boolean {
  return !!ch && TR_LETTER.test(ch);
}

export type TextMatch = {
  start: number;
  end: number;
  matchedText: string;
};

/**
 * `needle`'ı `haystack` içinde kelime sınırına duyarlı şekilde arar
 * (örn. "ekran" araması "ekranınız" içine kaçak girmesin).
 * Türkçe karakterler ve büyük/küçük harf farkları normalize edilerek karşılaştırılır.
 */
export function findPhrase(haystack: string, needle: string): TextMatch | null {
  const normHay = normalizeTr(haystack);
  const normNeedle = normalizeTr(needle);
  if (!normNeedle) return null;

  let fromIndex = 0;
  while (fromIndex <= normHay.length) {
    const idx = normHay.indexOf(normNeedle, fromIndex);
    if (idx === -1) return null;

    const before = normHay[idx - 1];
    const after = normHay[idx + normNeedle.length];
    if (!isTrLetter(before) && !isTrLetter(after)) {
      return {
        start: idx,
        end: idx + normNeedle.length,
        matchedText: haystack.slice(idx, idx + normNeedle.length),
      };
    }
    fromIndex = idx + 1;
  }
  return null;
}

/** "blogSlug:serviceSlug" çiftinden kararlı (deterministik) bir indeks üretir. */
export function stableHashIndex(seed: string, length: number): number {
  if (length <= 0) return 0;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % length;
}

/** Havuzu, hash ile seçilen indeksten başlayarak dairesel sıraya dizer. */
export function rotatePool<T>(pool: T[], startIndex: number): T[] {
  if (pool.length === 0) return pool;
  return pool.map((_, i) => pool[(startIndex + i) % pool.length]);
}
