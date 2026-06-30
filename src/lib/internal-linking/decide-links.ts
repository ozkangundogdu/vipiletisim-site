import { scoreServicesForPost } from "./select-links";
import { findFirstUsableMatch } from "./match-finder";
import type { BlogPost, SelectedLink } from "./types";

const MAX_LINKS = 3;

/**
 * MDX kaynağını kabaca düz nesir bloklarına ayırır (başlık, liste, alıntı,
 * tablo ve kod bloklarını hariç tutar) ki linkler yalnızca doğal akan
 * paragraf metnine eklensin.
 */
function extractProseBlocks(content: string): string[] {
  const withoutCodeFences = content.replace(/```[\s\S]*?```/g, "");
  return withoutCodeFences
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0 && !/^(#{1,6}\s|[-*+]\s|\d+\.\s|>|\|)/.test(b));
}

/**
 * Bir blog yazısı için hangi hizmetlere hangi anchor text ile link
 * verileceğine senkron olarak karar verir. Bu sonuç hem MDX içeriğine
 * link enjekte etmek hem de "İlgili Hizmetler" widget'ında tekrarı
 * önlemek için kullanılır — render sırası bağımlılığı olmadan.
 */
export function decideInternalLinks(
  post: Pick<BlogPost, "slug" | "content" | "keywords">
): SelectedLink[] {
  const scoredServices = scoreServicesForPost(post);
  const blocks = extractProseBlocks(post.content);

  const usedUrls = new Set<string>();
  const usedAnchors = new Set<string>();
  const links: SelectedLink[] = [];

  for (const block of blocks) {
    if (links.length >= MAX_LINKS) break;

    const match = findFirstUsableMatch(block, scoredServices, usedUrls, usedAnchors);
    if (!match) continue;

    usedUrls.add(match.service.url);
    usedAnchors.add(match.anchorText.toLocaleLowerCase("tr-TR"));
    links.push({ service: match.service, anchorText: match.anchorText });
  }

  return links;
}
