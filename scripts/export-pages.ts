import fs from 'fs';
import path from 'path';
import { services } from '../src/data/services';
import { getModelSpec } from '../src/data/model-specs';
import { getRepairContent } from '../src/lib/repair-content';
import { generateServiceFaqs } from '../src/lib/faq-generators';

const OUT_DIR = 'C:\\Users\\W11\\Desktop\\sayfalar seo';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

let count = 0;

for (const service of services) {
  const { slug, model, brand, repairKey, repairType, title, metaDescription, duration } = service;
  const spec = getModelSpec(model);

  let content: ReturnType<typeof getRepairContent>;
  try {
    content = getRepairContent(model, brand as 'iphone' | 'samsung' | 'xiaomi', repairKey, spec);
  } catch {
    content = getRepairContent(model, brand as 'iphone' | 'samsung' | 'xiaomi', repairKey);
  }

  const faqs = generateServiceFaqs(model, repairType);

  const lines: string[] = [];

  // ── Sayfa başlığı ve meta ──────────────────────────────────────────────
  lines.push(`SAYFA: ${title} — Trabzon Vip İletişim`);
  lines.push(`URL: /tamir-hizmetleri/${slug}`);
  lines.push(`META AÇIKLAMA: ${metaDescription}`);
  lines.push('');

  // ── Tamir özeti ────────────────────────────────────────────────────────
  lines.push('=== TAMİR ÖZETİ ===');
  lines.push(`Cihaz: ${model}`);
  lines.push(`İşlem: ${repairType}`);
  lines.push(`Tahmini Süre: ${duration}`);
  lines.push('Lokasyon: Trabzon Merkez');
  lines.push('');

  // ── Giriş ─────────────────────────────────────────────────────────────
  lines.push('=== GİRİŞ ===');
  lines.push(content.intro);
  lines.push('');

  // ── Belirtiler ────────────────────────────────────────────────────────
  lines.push(`=== ${content.symptomsHeading} ===`);
  for (const s of content.symptoms) {
    lines.push(`• ${s}`);
  }
  lines.push('');

  // ── Neden gerekli ─────────────────────────────────────────────────────
  lines.push(`=== ${content.whyHeading} ===`);
  lines.push(content.why);
  lines.push('');

  // ── Tamir süreci ──────────────────────────────────────────────────────
  lines.push(`=== ${content.processHeading} ===`);
  for (let i = 0; i < content.processSteps.length; i++) {
    const step = content.processSteps[i];
    lines.push(`${i + 1}. ${step.title}`);
    lines.push(`   ${step.desc}`);
  }
  lines.push('');

  // ── Veri güvenliği ────────────────────────────────────────────────────
  lines.push(`=== ${content.dataSafeHeading} ===`);
  lines.push(content.dataSafe);
  lines.push('');

  // ── Fiyat ─────────────────────────────────────────────────────────────
  lines.push(`=== ${content.priceHeading} ===`);
  lines.push(content.price);
  lines.push('');

  // ── Uzman notu ────────────────────────────────────────────────────────
  if (content.expertNote) {
    lines.push('=== UZMAN NOTU ===');
    lines.push(content.expertNote);
    lines.push('');
  }

  // ── Neden Vip İletişim ────────────────────────────────────────────────
  lines.push('=== NEDEN VİP İLETİŞİM? ===');
  lines.push('• Orijinal ve OEM Parça: Her tamir işleminde orijinal veya OEM kalitesinde yedek parça kullanılır.');
  lines.push('• Aynı Gün Teslim: Çoğu tamir 30–60 dakikada tamamlanır; aynı gün teslim edilir.');
  lines.push('• Ücretsiz Ön İnceleme: İşleme başlamadan önce ücretsiz tanı yapılır; onaylamazsanız ücret alınmaz.');
  lines.push('• 90 Gün İşçilik Garantisi: Anakart onarımlarında ve kapsamlı tamirimlerde 90 gün garanti sunulur.');
  lines.push('• 10+ Yıl Trabzon\'da: Trabzon\'un köklü teknik servisi olarak binlerce başarılı tamir geçmişimiz var.');
  lines.push('• Kargo ile Tamir: Giresun, Rize, Artvin, Gümüşhane ve Bayburt\'tan kargo ile tamir imkânı.');
  lines.push('');

  // ── SSS ───────────────────────────────────────────────────────────────
  if (faqs.length > 0) {
    lines.push(`=== ${model} ${repairType} — SIKÇA SORULAN SORULAR ===`);
    for (const faq of faqs) {
      lines.push(`S: ${faq.question}`);
      lines.push(`C: ${faq.answer}`);
      lines.push('');
    }
  }

  const text = lines.join('\n');
  const filePath = path.join(OUT_DIR, `${slug}.txt`);
  fs.writeFileSync(filePath, text, 'utf8');
  count++;
  if (count % 100 === 0) process.stdout.write(`\r${count} / ${services.length} tamamlandı...`);
}

console.log(`\nToplam ${count} sayfa dışa aktarıldı → ${OUT_DIR}`);
