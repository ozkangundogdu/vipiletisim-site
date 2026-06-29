export type TocItem = { id: string; text: string; level: 2 | 3 };

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    if (h2) {
      const text = h2[1].trim().replace(/\*\*/g, "").replace(/\*/g, "");
      items.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (h3) {
      const text = h3[1].trim().replace(/\*\*/g, "").replace(/\*/g, "");
      items.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }
  return items;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;
  return (
    <nav
      aria-label="İçindekiler"
      className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5"
    >
      <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-zinc-400">
        İçindekiler
      </p>
      <ol className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className="text-[14px] font-semibold text-zinc-700 hover:text-brand transition-colors"
            >
              {item.level === 2 ? (
                <span className="mr-1.5 text-zinc-400">›</span>
              ) : (
                <span className="mr-1.5 text-zinc-300">–</span>
              )}
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
