/**
 * Her blog yazısı için içeriğinden özgün SSS üretir ve frontmatter'a kaydeder.
 * --force bayrağıyla mevcut SSS'leri de yeniden oluşturur.
 * Kullanım: npx tsx scripts/generate-blog-faqs.ts [--force]
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const FORCE = process.argv.includes("--force");

type FaqEntry = { q: string; a: string };

// H2 başlığını soruya dönüştür
function headingToQuestion(heading: string): string {
  const h = heading.trim().replace(/^\d+\.\s*/, ""); // "1. " önekini kaldır

  // Zaten soru ise doğrudan kullan
  if (h.endsWith("?")) return h;

  const hl = h.toLowerCase();

  if (hl.startsWith("ne zaman") || hl.startsWith("nasıl") ||
      hl.startsWith("neden") || hl.startsWith("ne kadar") ||
      hl.startsWith("hangi") || hl.startsWith("nerede") ||
      hl.startsWith("ne ") || hl.startsWith("kim")) return h + "?";

  if (hl.includes("belirti") || hl.includes("işaret") || hl.includes("semptom")) return `${h} nasıl anlaşılır?`;
  if (hl.includes("fiyat") || hl.includes("ücret") || hl.includes("maliyet")) return `${h} ne kadar?`;
  if (hl.includes("süre") || hl.includes("dakika") || hl.includes("saat")) return `${h} ne kadar sürer?`;
  if (hl.includes("risk") || hl.includes("tehlike")) return `${h} tehlikeli midir?`;
  if (hl.includes("önlem") || hl.includes("dikkat")) return `${h} konusunda nelere dikkat edilmeli?`;
  if (hl.includes("veri") || hl.includes("data")) return `${h} sırasında verilerim güvende mi?`;
  if (hl.includes("orijinal") || hl.includes("parça")) return `${h} için orijinal parça kullanılıyor mu?`;
  if (hl.includes("trabzon")) return `Trabzon'da ${h.replace(/trabzon'?\s*/gi, "")} nasıl yapılır?`;
  if (hl.includes("şarj döngüs")) return `${h} — kaç döngü idealdir?`;
  if (hl.includes("siler mi") || hl.includes("kaybolur mu")) return h + "?";

  return `${h} hakkında ne bilmem gerekiyor?`;
}

// Bir bölümün altındaki metin bloğunu çıkar
function extractSectionText(allLines: string[], startIndex: number): string {
  const parts: string[] = [];

  for (let i = startIndex; i < allLines.length; i++) {
    const l = allLines[i].trim();

    // Sonraki H2/H1 gelince dur (H3 devam edebilir)
    if (l.startsWith("## ") || l.startsWith("# ")) break;

    // Boş satırları atla (kırılma yapma)
    if (!l) continue;

    // H3 başlık → metin olarak ekle
    if (l.startsWith("### ")) {
      parts.push(l.slice(4).replace(/\*\*/g, "").trim());
      continue;
    }

    // --- ayracı
    if (l.startsWith("---")) break;

    // Liste maddesi
    const listMatch = l.match(/^[-*]\s+(.+)/) ?? l.match(/^\d+\.\s+(.+)/);
    if (listMatch) {
      const item = listMatch[1]
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/`(.+?)`/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .trim();
      parts.push(item);
      continue;
    }

    // Alıntı
    if (l.startsWith(">")) {
      parts.push(l.replace(/^>\s*/, "").replace(/\*\*/g, "").trim());
      continue;
    }

    // Normal metin
    const clean = l
      .replace(/\*\*\*(.+?)\*\*\*/g, "$1")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();
    if (clean) parts.push(clean);
  }

  const text = parts.join(" ").trim();

  // 320 karakterde kes, cümle sınırına uydur
  if (text.length > 320) {
    const cut = text.slice(0, 320);
    const last = Math.max(
      cut.lastIndexOf(". "),
      cut.lastIndexOf("! "),
      cut.lastIndexOf("? ")
    );
    return last > 80 ? cut.slice(0, last + 1) : cut + "...";
  }
  return text;
}

// H2 bölümlerini çıkar
function extractSections(content: string): { heading: string; text: string }[] {
  const lines = content.split("\n");
  const sections: { heading: string; text: string }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const h2 = lines[i].match(/^## (.+)/);
    if (!h2) continue;

    const heading = h2[1].trim().replace(/\*\*/g, "").replace(/\*/g, "");
    const text = extractSectionText(lines, i + 1);

    if (text.length > 25) {
      sections.push({ heading, text });
    }
  }

  return sections;
}

// Trabzon/kargo SSS
function trabzonFaqs(title: string): FaqEntry[] {
  const kw = title.toLowerCase();
  const isIphone = kw.includes("iphone") || kw.includes("apple");
  const isSamsung = kw.includes("samsung") || kw.includes("galaxy");
  const isBatarya = kw.includes("batarya") || kw.includes("pil");
  const isEkran = kw.includes("ekran") || kw.includes("cam");
  const marka = isIphone ? "iPhone" : isSamsung ? "Samsung" : "telefon";

  const result: FaqEntry[] = [];

  if (isBatarya) {
    result.push({
      q: `Trabzon'da ${marka} batarya değişimi için nereye gidebilirim?`,
      a: `Trabzon Merkez'deki Vip İletişim Teknik Servis'e randevusuz gelebilirsiniz. Orijinal ve OEM kalitesinde batarya ile 30–45 dakikada aynı gün teslim yapılır. Ücretsiz ön inceleme yapılır; onaylamazsanız ücret alınmaz.`,
    });
  } else if (isEkran) {
    result.push({
      q: `Trabzon'da ${marka} ekran tamiri için ne yapmalıyım?`,
      a: `Trabzon Vip İletişim'e randevusuz gelebilirsiniz. Ekran değişimi 45–60 dakikada tamamlanır; stokta orijinal parça varsa aynı gün teslim edilir. Ücretsiz ön inceleme sonrası net fiyat bildirilir.`,
    });
  } else {
    result.push({
      q: `Trabzon'da ${marka} tamiri için ücretsiz ön inceleme var mı?`,
      a: `Evet. Trabzon Vip İletişim'de tüm cihazlara ücretsiz ön inceleme yapılır. Arızayı tespit edip net fiyatı bildiriyoruz; onaylamazsanız herhangi bir ücret alınmaz.`,
    });
  }

  result.push({
    q: `Trabzon dışından ${marka} tamiri için kargo ile gönderilebilir mi?`,
    a: `Evet. Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan kargo ile Trabzon Vip İletişim'e cihaz gönderebilirsiniz. WhatsApp'tan bilgi alın, kargoya verin; tamir sonrası adresinize gönderelim.`,
  });

  return result;
}

// Bir yazı için SSS üret
function generateFaqs(title: string, content: string): FaqEntry[] {
  const sections = extractSections(content);
  const faqs: FaqEntry[] = [];

  // İçerikten max 4 soru
  for (const sec of sections.slice(0, 7)) {
    if (faqs.length >= 4) break;
    const q = headingToQuestion(sec.heading);
    const a = sec.text;
    if (q && a.length > 25) {
      faqs.push({ q, a });
    }
  }

  // Trabzon SSS ekle (toplamı max 6)
  for (const e of trabzonFaqs(title)) {
    if (faqs.length >= 6) break;
    faqs.push(e);
  }

  return faqs;
}

// Ana döngü
async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  let updated = 0;
  let skipped = 0;
  let noSection = 0;

  console.log(`📝 ${files.length} blog yazısı işlenecek... ${FORCE ? "(FORCE modu)" : ""}\n`);

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    // --force olmadan zaten SSS olanı atla
    if (!FORCE && data.faqs && Array.isArray(data.faqs) && data.faqs.length > 0) {
      skipped++;
      continue;
    }

    const title = (data.title as string) ?? filename;
    const faqs = generateFaqs(title, content);

    if (faqs.length === 0) {
      noSection++;
      continue;
    }

    const newData = { ...data, faqs };
    const newFileContent = matter.stringify(content, newData);
    fs.writeFileSync(filePath, newFileContent, "utf-8");
    updated++;

    if (updated % 50 === 0) {
      process.stdout.write(`  ✓ ${updated} güncellendi...\n`);
    }
  }

  console.log(`\n✅ Bitti!`);
  console.log(`   Güncellenen  : ${updated}`);
  console.log(`   Atlandı      : ${skipped}`);
  console.log(`   Bölüm yok    : ${noSection}`);
}

main().catch(console.error);
