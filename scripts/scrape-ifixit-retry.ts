/**
 * iFixit Retry Script — Sadece hatalı / eksik modelleri yeniden çeker
 * İçinde bilgi.txt olmayan veya "⚠ Bu model için iFixit" yazan modelleri atlar.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const OUT_DIR = 'C:\\Users\\W11\\Desktop\\ifitit';
const API     = 'https://www.ifixit.com/api/2.0';
const DELAY   = 400;

// Ana run'da başarısız olan modeller (6 adet)
const RETRY_MODELS: Record<string, { ifixitSlug: string; brand: string; folderSlug: string }> = {
  'iPhone X':             { ifixitSlug: 'iPhone_X',            brand: 'iphone',  folderSlug: 'iphone-x' },
  'iPhone SE (2. Nesil)': { ifixitSlug: 'iPhone_SE_2020',      brand: 'iphone',  folderSlug: 'iphone-se-2020' },
  'iPhone 12 Pro Max':    { ifixitSlug: 'iPhone_12_Pro_Max',   brand: 'iphone',  folderSlug: 'iphone-12-pro-max' },
  'iPhone 13 Pro':        { ifixitSlug: 'iPhone_13_Pro',       brand: 'iphone',  folderSlug: 'iphone-13-pro' },
  'Galaxy S20+':          { ifixitSlug: 'Samsung_Galaxy_S20_Plus', brand: 'samsung', folderSlug: 'galaxy-s20-plus' },
  'Galaxy A12':           { ifixitSlug: 'Samsung_Galaxy_A12',  brand: 'samsung', folderSlug: 'galaxy-a12' },
};

const KEY_GUIDE_KEYWORDS = [
  'Battery Replacement', 'Battery Removal',
  'Screen Replacement', 'Screen Removal', 'Display Replacement',
  'Charging Port Replacement', 'USB-C Port',
  'Front Camera', 'Rear Camera', 'Back Camera',
  'Back Glass Replacement', 'Back Cover Replacement',
  'Loudspeaker Replacement', 'Speaker Replacement',
  'Earpiece Speaker', 'Microphone Replacement',
  'Logic Board Replacement', 'Motherboard Replacement',
  'Taptic Engine', 'LiDAR Sensor', 'Teardown', 'Disassembly',
];

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchJSON(url: string): Promise<any> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      const file = fs.createWriteStream(destPath);
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode !== 200) { file.close(); resolve(); return; }
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
        file.on('error', () => { file.close(); resolve(); });
      }).on('error', () => { file.close(); resolve(); });
    } catch { resolve(); }
  });
}

function isKeyGuide(title: string): boolean {
  const t = title.toLowerCase();
  return KEY_GUIDE_KEYWORDS.some(kw => t.includes(kw.toLowerCase()));
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9\-_]/gi, '_').slice(0, 60);
}

function guideToText(guide: any, title: string): string {
  const lines: string[] = [];
  lines.push(`=== ${title} ===`);
  lines.push(`Kaynak: https://www.ifixit.com/Guide/${guide.guideid}`);
  lines.push(`Zorluk: ${guide.difficulty ?? 'Belirtilmemiş'}`);
  lines.push(`Tahmini Süre: ${guide.time_required ?? 'Belirtilmemiş'}`);
  lines.push('');
  if (guide.introduction_rendered) {
    lines.push('--- GİRİŞ ---');
    lines.push(guide.introduction_rendered.replace(/<[^>]+>/g, '').trim());
    lines.push('');
  }
  if (guide.tools?.length) {
    lines.push('--- GEREKLI ALETLER ---');
    for (const t of guide.tools) lines.push(`• ${t.text || t.name || ''}`);
    lines.push('');
  }
  if (guide.steps?.length) {
    lines.push('--- ADIM ADIM TAMİR REHBERİ ---');
    for (const step of guide.steps) {
      lines.push(`\nAdım ${step.stepid}: ${step.title || ''}`);
      const mediaItems: any[] = Array.isArray(step.media?.data) ? step.media.data
        : Array.isArray(step.images) ? step.images : [];
      for (const img of mediaItems) {
        if (!img || typeof img !== 'object') continue;
        const imgUrl = img.standard || img.large || img.medium || '';
        if (imgUrl) lines.push(`  [GÖRSEL]: ${imgUrl}`);
      }
      if (step.lines?.length) {
        for (const line of step.lines) {
          const text = (line.text_rendered || line.text || '').replace(/<[^>]+>/g, '').trim();
          if (text) lines.push(`  → ${text}`);
        }
      }
    }
    lines.push('');
  }
  return lines.join('\n');
}

function extractImageUrls(guide: any): string[] {
  const urls: string[] = [];
  if (!guide.steps) return urls;
  for (const step of guide.steps) {
    const mediaItems: any[] = Array.isArray(step.media?.data) ? step.media.data
      : Array.isArray(step.images) ? step.images : [];
    for (const img of mediaItems) {
      if (!img || typeof img !== 'object') continue;
      const url = img.standard || img.large || img.medium || '';
      if (url && url.startsWith('http')) urls.push(url);
    }
  }
  return urls;
}

async function processModel(modelName: string): Promise<void> {
  const meta = RETRY_MODELS[modelName];
  if (!meta) return;

  const modelDir  = path.join(OUT_DIR, meta.brand, meta.folderSlug);
  const imagesDir = path.join(modelDir, 'images');
  fs.mkdirSync(imagesDir, { recursive: true });

  const textLines: string[] = [];
  textLines.push(`MODEL: ${modelName}`);
  textLines.push(`iFixit Cihaz Sayfası: https://www.ifixit.com/Device/${meta.ifixitSlug}`);
  textLines.push('='.repeat(70));
  textLines.push('');

  await sleep(DELAY);
  const wiki = await fetchJSON(`${API}/wikis/CATEGORY/${meta.ifixitSlug}`);

  if (!wiki) {
    textLines.push('⚠ Bu model için iFixit cihaz sayfası bulunamadı.');
    fs.writeFileSync(path.join(modelDir, 'bilgi.txt'), textLines.join('\n'), 'utf8');
    return;
  }

  if (wiki.contents_rendered || wiki.description) {
    textLines.push('=== CİHAZ HAKKINDA ===');
    const desc = (wiki.contents_rendered || wiki.description || '')
      .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    textLines.push(desc);
    textLines.push('');
  }

  const allGuides: { guideid: number; title: string }[] = wiki.guides || [];
  if (allGuides.length) {
    textLines.push(`=== MEVCUT TAMİR REHBERLERİ (${allGuides.length} adet) ===`);
    for (const g of allGuides) textLines.push(`  [${g.guideid}] ${g.title}`);
    textLines.push('');
  }

  const keyGuides = allGuides.filter(g => isKeyGuide(g.title));
  let imageCounter = 0;

  for (const g of keyGuides) {
    await sleep(DELAY);
    const guide = await fetchJSON(`${API}/guides/${g.guideid}`);
    if (!guide) continue;
    textLines.push(guideToText(guide, g.title));
    textLines.push('-'.repeat(70));
    textLines.push('');
    const imageUrls = extractImageUrls(guide);
    for (const imgUrl of imageUrls) {
      imageCounter++;
      const slug = sanitizeFilename(g.title);
      const dest = path.join(imagesDir, `${slug}-${imageCounter}.jpg`);
      await sleep(150);
      await downloadImage(imgUrl, dest);
    }
  }

  fs.writeFileSync(path.join(modelDir, 'bilgi.txt'), textLines.join('\n'), 'utf8');
}

async function main() {
  // Önce kalan .standard dosyalarını .jpg yap
  console.log('Kalan .standard dosyaları .jpg yapılıyor...');
  const { execSync } = await import('child_process');
  try {
    execSync(
      `powershell -Command "Get-ChildItem '${OUT_DIR}' -Recurse -Filter '*.standard' | ForEach-Object { Rename-Item $_.FullName ([IO.Path]::ChangeExtension($_.FullName, '.jpg')) }"`,
      { stdio: 'inherit' }
    );
  } catch { console.log('(Yeniden adlandırma adımı atlandı)'); }

  const models = Object.keys(RETRY_MODELS);
  console.log(`\n${models.length} model yeniden çekilecek...\n`);

  let done = 0;
  for (const modelName of models) {
    const meta = RETRY_MODELS[modelName];
    process.stdout.write(`[${++done}/${models.length}] ${modelName} → ${meta.brand}/${meta.folderSlug} ... `);
    try {
      await processModel(modelName);
      console.log('✓');
    } catch (err) {
      console.log(`✗ HATA: ${err}`);
    }
  }

  console.log(`\n✅ Retry tamamlandı → ${OUT_DIR}`);
}

main().catch(console.error);
