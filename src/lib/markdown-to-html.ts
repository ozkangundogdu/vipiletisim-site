const SAFE_URL = /^(https?:\/\/|\/|mailto:|tel:)/i;

function safeUrl(url: string): string {
  const trimmed = url.trim();
  return SAFE_URL.test(trimmed) ? trimmed : "#";
}

function slugId(text: string): string {
  return text
    .toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function markdownToHtml(md: string): string {
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lines = escaped.split("\n");
  const html: string[] = [];
  let inUl = false;
  let inOl = false;

  for (const rawLine of lines) {
    let line = rawLine
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => `<img src="${safeUrl(url)}" alt="${alt}" style="max-width:100%;border-radius:8px;margin:8px 0">`)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => `<a href="${safeUrl(url)}" style="color:#ff351b;text-decoration:underline">${text}</a>`);

    if (/^### /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      const h3text = line.slice(4);
      html.push(`<h3 id="${slugId(h3text)}" class="text-[15px] font-black text-zinc-800 mt-5 mb-1">${h3text}</h3>`);
    } else if (/^## /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      const h2text = line.slice(3);
      html.push(`<h2 id="${slugId(h2text)}" class="text-xl font-black text-zinc-900 mt-7 mb-3">${h2text}</h2>`);
    } else if (/^# /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<h1 class="text-2xl font-black text-zinc-900 mt-7 mb-3">${line.slice(2)}</h1>`);
    } else if (/^[-*] /.test(line)) {
      if (inOl) { html.push("</ol>"); inOl = false; }
      if (!inUl) { html.push('<ul class="list-none space-y-1.5 my-3">'); inUl = true; }
      html.push(`<li class="flex items-start gap-2 text-[15px] text-zinc-600"><span class="text-brand mt-0.5 shrink-0">✓</span><span>${line.slice(2)}</span></li>`);
    } else if (/^\d+\. /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (!inOl) { html.push('<ol class="space-y-1.5 my-3 pl-5 list-decimal">'); inOl = true; }
      html.push(`<li class="text-[15px] text-zinc-600">${line.replace(/^\d+\. /, "")}</li>`);
    } else if (/^&gt; /.test(line)) {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<blockquote class="border-l-4 pl-4 py-1 my-3 italic text-zinc-500" style="border-color:#ff351b">${line.slice(5)}</blockquote>`);
    } else if (line.trim() === "") {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
    } else {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<p class="text-[15px] leading-relaxed text-zinc-600 my-2">${line}</p>`);
    }
  }
  if (inUl) html.push("</ul>");
  if (inOl) html.push("</ol>");
  return html.join("\n");
}
