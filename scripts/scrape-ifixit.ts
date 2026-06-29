/**
 * iFixit Scraper — Tüm modellerimiz için cihaz bilgisi + tamir rehberleri + görseller
 * Çıktı: C:\Users\W11\Desktop\ifitit\{marka}\{model-slug}\bilgi.txt + images\
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const OUT_DIR = 'C:\\Users\\W11\\Desktop\\ifitit';
const API     = 'https://www.ifixit.com/api/2.0';
const DELAY   = 400; // ms arası bekleme (rate limit)

// ── Model → iFixit device slug eşlemesi ─────────────────────────────────────

const MODEL_MAP: Record<string, { ifixitSlug: string; brand: string; folderSlug: string }> = {
  // ── iPhone ──────────────────────────────────────────────────────────────
  'iPhone X':             { ifixitSlug: 'iPhone_X',           brand: 'iphone', folderSlug: 'iphone-x' },
  'iPhone XS':            { ifixitSlug: 'iPhone_XS',          brand: 'iphone', folderSlug: 'iphone-xs' },
  'iPhone XS Max':        { ifixitSlug: 'iPhone_XS_Max',      brand: 'iphone', folderSlug: 'iphone-xs-max' },
  'iPhone XR':            { ifixitSlug: 'iPhone_XR',          brand: 'iphone', folderSlug: 'iphone-xr' },
  'iPhone 11':            { ifixitSlug: 'iPhone_11',          brand: 'iphone', folderSlug: 'iphone-11' },
  'iPhone 11 Pro':        { ifixitSlug: 'iPhone_11_Pro',      brand: 'iphone', folderSlug: 'iphone-11-pro' },
  'iPhone 11 Pro Max':    { ifixitSlug: 'iPhone_11_Pro_Max',  brand: 'iphone', folderSlug: 'iphone-11-pro-max' },
  'iPhone SE (2. Nesil)': { ifixitSlug: 'iPhone_SE_2020',     brand: 'iphone', folderSlug: 'iphone-se-2020' },
  'iPhone 12 mini':       { ifixitSlug: 'iPhone_12_mini',     brand: 'iphone', folderSlug: 'iphone-12-mini' },
  'iPhone 12':            { ifixitSlug: 'iPhone_12',          brand: 'iphone', folderSlug: 'iphone-12' },
  'iPhone 12 Pro':        { ifixitSlug: 'iPhone_12_Pro',      brand: 'iphone', folderSlug: 'iphone-12-pro' },
  'iPhone 12 Pro Max':    { ifixitSlug: 'iPhone_12_Pro_Max',  brand: 'iphone', folderSlug: 'iphone-12-pro-max' },
  'iPhone 13 mini':       { ifixitSlug: 'iPhone_13_mini',     brand: 'iphone', folderSlug: 'iphone-13-mini' },
  'iPhone 13':            { ifixitSlug: 'iPhone_13',          brand: 'iphone', folderSlug: 'iphone-13' },
  'iPhone 13 Pro':        { ifixitSlug: 'iPhone_13_Pro',      brand: 'iphone', folderSlug: 'iphone-13-pro' },
  'iPhone 13 Pro Max':    { ifixitSlug: 'iPhone_13_Pro_Max',  brand: 'iphone', folderSlug: 'iphone-13-pro-max' },
  'iPhone SE (3. Nesil)': { ifixitSlug: 'iPhone_SE_2022',     brand: 'iphone', folderSlug: 'iphone-se-2022' },
  'iPhone 14':            { ifixitSlug: 'iPhone_14',          brand: 'iphone', folderSlug: 'iphone-14' },
  'iPhone 14 Plus':       { ifixitSlug: 'iPhone_14_Plus',     brand: 'iphone', folderSlug: 'iphone-14-plus' },
  'iPhone 14 Pro':        { ifixitSlug: 'iPhone_14_Pro',      brand: 'iphone', folderSlug: 'iphone-14-pro' },
  'iPhone 14 Pro Max':    { ifixitSlug: 'iPhone_14_Pro_Max',  brand: 'iphone', folderSlug: 'iphone-14-pro-max' },
  'iPhone 15':            { ifixitSlug: 'iPhone_15',          brand: 'iphone', folderSlug: 'iphone-15' },
  'iPhone 15 Plus':       { ifixitSlug: 'iPhone_15_Plus',     brand: 'iphone', folderSlug: 'iphone-15-plus' },
  'iPhone 15 Pro':        { ifixitSlug: 'iPhone_15_Pro',      brand: 'iphone', folderSlug: 'iphone-15-pro' },
  'iPhone 15 Pro Max':    { ifixitSlug: 'iPhone_15_Pro_Max',  brand: 'iphone', folderSlug: 'iphone-15-pro-max' },
  'iPhone 16':            { ifixitSlug: 'iPhone_16',          brand: 'iphone', folderSlug: 'iphone-16' },
  'iPhone 16 Plus':       { ifixitSlug: 'iPhone_16_Plus',     brand: 'iphone', folderSlug: 'iphone-16-plus' },
  'iPhone 16 Pro':        { ifixitSlug: 'iPhone_16_Pro',      brand: 'iphone', folderSlug: 'iphone-16-pro' },
  'iPhone 16 Pro Max':    { ifixitSlug: 'iPhone_16_Pro_Max',  brand: 'iphone', folderSlug: 'iphone-16-pro-max' },
  'iPhone 17':            { ifixitSlug: 'iPhone_17',          brand: 'iphone', folderSlug: 'iphone-17' },
  'iPhone 17 Slim':       { ifixitSlug: 'iPhone_Air',         brand: 'iphone', folderSlug: 'iphone-17-air' },
  'iPhone 17 Pro':        { ifixitSlug: 'iPhone_17_Pro',      brand: 'iphone', folderSlug: 'iphone-17-pro' },
  'iPhone 17 Pro Max':    { ifixitSlug: 'iPhone_17_Pro_Max',  brand: 'iphone', folderSlug: 'iphone-17-pro-max' },
  'iPhone 18':            { ifixitSlug: 'iPhone_18',          brand: 'iphone', folderSlug: 'iphone-18' },
  'iPhone 18 Air':        { ifixitSlug: 'iPhone_18_Air',      brand: 'iphone', folderSlug: 'iphone-18-air' },
  'iPhone 18 Pro':        { ifixitSlug: 'iPhone_18_Pro',      brand: 'iphone', folderSlug: 'iphone-18-pro' },
  'iPhone 18 Pro Max':    { ifixitSlug: 'iPhone_18_Pro_Max',  brand: 'iphone', folderSlug: 'iphone-18-pro-max' },
  // ── Samsung ─────────────────────────────────────────────────────────────
  'Galaxy S20':           { ifixitSlug: 'Samsung_Galaxy_S20',        brand: 'samsung', folderSlug: 'galaxy-s20' },
  'Galaxy S20+':          { ifixitSlug: 'Samsung_Galaxy_S20_Plus',   brand: 'samsung', folderSlug: 'galaxy-s20-plus' },
  'Galaxy S20 Ultra':     { ifixitSlug: 'Samsung_Galaxy_S20_Ultra',  brand: 'samsung', folderSlug: 'galaxy-s20-ultra' },
  'Galaxy S20 FE':        { ifixitSlug: 'Samsung_Galaxy_S20_FE',     brand: 'samsung', folderSlug: 'galaxy-s20-fe' },
  'Galaxy S21':           { ifixitSlug: 'Samsung_Galaxy_S21',        brand: 'samsung', folderSlug: 'galaxy-s21' },
  'Galaxy S21+':          { ifixitSlug: 'Samsung_Galaxy_S21_Plus',   brand: 'samsung', folderSlug: 'galaxy-s21-plus' },
  'Galaxy S21 Ultra':     { ifixitSlug: 'Samsung_Galaxy_S21_Ultra',  brand: 'samsung', folderSlug: 'galaxy-s21-ultra' },
  'Galaxy S21 FE':        { ifixitSlug: 'Samsung_Galaxy_S21_FE',     brand: 'samsung', folderSlug: 'galaxy-s21-fe' },
  'Galaxy S22':           { ifixitSlug: 'Samsung_Galaxy_S22',        brand: 'samsung', folderSlug: 'galaxy-s22' },
  'Galaxy S22+':          { ifixitSlug: 'Samsung_Galaxy_S22_Plus',   brand: 'samsung', folderSlug: 'galaxy-s22-plus' },
  'Galaxy S22 Ultra':     { ifixitSlug: 'Samsung_Galaxy_S22_Ultra',  brand: 'samsung', folderSlug: 'galaxy-s22-ultra' },
  'Galaxy S23':           { ifixitSlug: 'Samsung_Galaxy_S23',        brand: 'samsung', folderSlug: 'galaxy-s23' },
  'Galaxy S23+':          { ifixitSlug: 'Samsung_Galaxy_S23_Plus',   brand: 'samsung', folderSlug: 'galaxy-s23-plus' },
  'Galaxy S23 Ultra':     { ifixitSlug: 'Samsung_Galaxy_S23_Ultra',  brand: 'samsung', folderSlug: 'galaxy-s23-ultra' },
  'Galaxy S23 FE':        { ifixitSlug: 'Samsung_Galaxy_S23_FE',     brand: 'samsung', folderSlug: 'galaxy-s23-fe' },
  'Galaxy S24':           { ifixitSlug: 'Samsung_Galaxy_S24',        brand: 'samsung', folderSlug: 'galaxy-s24' },
  'Galaxy S24+':          { ifixitSlug: 'Samsung_Galaxy_S24_Plus',   brand: 'samsung', folderSlug: 'galaxy-s24-plus' },
  'Galaxy S24 Ultra':     { ifixitSlug: 'Samsung_Galaxy_S24_Ultra',  brand: 'samsung', folderSlug: 'galaxy-s24-ultra' },
  'Galaxy S24 FE':        { ifixitSlug: 'Samsung_Galaxy_S24_FE',     brand: 'samsung', folderSlug: 'galaxy-s24-fe' },
  'Galaxy S25':           { ifixitSlug: 'Samsung_Galaxy_S25',        brand: 'samsung', folderSlug: 'galaxy-s25' },
  'Galaxy S25+':          { ifixitSlug: 'Samsung_Galaxy_S25_Plus',   brand: 'samsung', folderSlug: 'galaxy-s25-plus' },
  'Galaxy S25 Ultra':     { ifixitSlug: 'Samsung_Galaxy_S25_Ultra',  brand: 'samsung', folderSlug: 'galaxy-s25-ultra' },
  'Galaxy S25 Slim':      { ifixitSlug: 'Samsung_Galaxy_S25_Edge',   brand: 'samsung', folderSlug: 'galaxy-s25-edge' },
  'Galaxy S26':           { ifixitSlug: 'Samsung_Galaxy_S26',        brand: 'samsung', folderSlug: 'galaxy-s26' },
  'Galaxy S26+':          { ifixitSlug: 'Samsung_Galaxy_S26_Plus',   brand: 'samsung', folderSlug: 'galaxy-s26-plus' },
  'Galaxy S26 Ultra':     { ifixitSlug: 'Samsung_Galaxy_S26_Ultra',  brand: 'samsung', folderSlug: 'galaxy-s26-ultra' },
  'Galaxy A12':           { ifixitSlug: 'Samsung_Galaxy_A12',        brand: 'samsung', folderSlug: 'galaxy-a12' },
  'Galaxy A13':           { ifixitSlug: 'Samsung_Galaxy_A13',        brand: 'samsung', folderSlug: 'galaxy-a13' },
  'Galaxy A14':           { ifixitSlug: 'Samsung_Galaxy_A14',        brand: 'samsung', folderSlug: 'galaxy-a14' },
  'Galaxy A15':           { ifixitSlug: 'Samsung_Galaxy_A15',        brand: 'samsung', folderSlug: 'galaxy-a15' },
  'Galaxy A16':           { ifixitSlug: 'Samsung_Galaxy_A16',        brand: 'samsung', folderSlug: 'galaxy-a16' },
  'Galaxy A17':           { ifixitSlug: 'Samsung_Galaxy_A17',        brand: 'samsung', folderSlug: 'galaxy-a17' },
  'Galaxy A32':           { ifixitSlug: 'Samsung_Galaxy_A32',        brand: 'samsung', folderSlug: 'galaxy-a32' },
  'Galaxy A33':           { ifixitSlug: 'Samsung_Galaxy_A33',        brand: 'samsung', folderSlug: 'galaxy-a33' },
  'Galaxy A34':           { ifixitSlug: 'Samsung_Galaxy_A34',        brand: 'samsung', folderSlug: 'galaxy-a34' },
  'Galaxy A35':           { ifixitSlug: 'Samsung_Galaxy_A35',        brand: 'samsung', folderSlug: 'galaxy-a35' },
  'Galaxy A36':           { ifixitSlug: 'Samsung_Galaxy_A36',        brand: 'samsung', folderSlug: 'galaxy-a36' },
  'Galaxy A37':           { ifixitSlug: 'Samsung_Galaxy_A37',        brand: 'samsung', folderSlug: 'galaxy-a37' },
  // ── Xiaomi ──────────────────────────────────────────────────────────────
  'Redmi Note 11 Pro':    { ifixitSlug: 'Xiaomi_Redmi_Note_11_Pro',  brand: 'xiaomi', folderSlug: 'redmi-note-11-pro' },
  'Redmi Note 12 Pro':    { ifixitSlug: 'Xiaomi_Redmi_Note_12_Pro',  brand: 'xiaomi', folderSlug: 'redmi-note-12-pro' },
  'Redmi Note 13 Pro':    { ifixitSlug: 'Xiaomi_Redmi_Note_13_Pro',  brand: 'xiaomi', folderSlug: 'redmi-note-13-pro' },
  'Redmi Note 14 Pro':    { ifixitSlug: 'Xiaomi_Redmi_Note_14_Pro',  brand: 'xiaomi', folderSlug: 'redmi-note-14-pro' },
  'Redmi Note 15 Pro':    { ifixitSlug: 'Xiaomi_Redmi_Note_15_Pro',  brand: 'xiaomi', folderSlug: 'redmi-note-15-pro' },
  'Redmi Note 15 Pro+':   { ifixitSlug: 'Xiaomi_Redmi_Note_15_Pro_Plus', brand: 'xiaomi', folderSlug: 'redmi-note-15-pro-plus' },
  'Redmi 13C':            { ifixitSlug: 'Xiaomi_Redmi_13C',          brand: 'xiaomi', folderSlug: 'redmi-13c' },
  'Redmi 14C':            { ifixitSlug: 'Xiaomi_Redmi_14C',          brand: 'xiaomi', folderSlug: 'redmi-14c' },
  'Redmi 15C':            { ifixitSlug: 'Xiaomi_Redmi_15C',          brand: 'xiaomi', folderSlug: 'redmi-15c' },
  'Mi 11 Lite':           { ifixitSlug: 'Xiaomi_Mi_11_Lite',         brand: 'xiaomi', folderSlug: 'mi-11-lite' },
  'Xiaomi 12 Lite':       { ifixitSlug: 'Xiaomi_12_Lite',            brand: 'xiaomi', folderSlug: 'xiaomi-12-lite' },
  'Xiaomi 13':            { ifixitSlug: 'Xiaomi_13',                 brand: 'xiaomi', folderSlug: 'xiaomi-13' },
  'Xiaomi 13T':           { ifixitSlug: 'Xiaomi_13T',                brand: 'xiaomi', folderSlug: 'xiaomi-13t' },
  'Xiaomi 13T Pro':       { ifixitSlug: 'Xiaomi_13T_Pro',            brand: 'xiaomi', folderSlug: 'xiaomi-13t-pro' },
  'Xiaomi 14':            { ifixitSlug: 'Xiaomi_14',                 brand: 'xiaomi', folderSlug: 'xiaomi-14' },
  'Xiaomi 14T':           { ifixitSlug: 'Xiaomi_14T',                brand: 'xiaomi', folderSlug: 'xiaomi-14t' },
  'Xiaomi 14T Pro':       { ifixitSlug: 'Xiaomi_14T_Pro',            brand: 'xiaomi', folderSlug: 'xiaomi-14t-pro' },
  'Xiaomi 15':            { ifixitSlug: 'Xiaomi_15',                 brand: 'xiaomi', folderSlug: 'xiaomi-15' },
  'Xiaomi 15T':           { ifixitSlug: 'Xiaomi_15T',                brand: 'xiaomi', folderSlug: 'xiaomi-15t' },
  'Xiaomi 15T Pro':       { ifixitSlug: 'Xiaomi_15T_Pro',            brand: 'xiaomi', folderSlug: 'xiaomi-15t-pro' },
  'Xiaomi 15 Ultra':      { ifixitSlug: 'Xiaomi_15_Ultra',           brand: 'xiaomi', folderSlug: 'xiaomi-15-ultra' },
  'Xiaomi 17':            { ifixitSlug: 'Xiaomi_17',                 brand: 'xiaomi', folderSlug: 'xiaomi-17' },
  'Xiaomi 17T':           { ifixitSlug: 'Xiaomi_17T',                brand: 'xiaomi', folderSlug: 'xiaomi-17t' },
};

// Önemli tamir türü anahtar kelimeleri
const KEY_GUIDE_KEYWORDS = [
  'Battery Replacement', 'Battery Removal', 'Battery Installation',
  'Screen Replacement', 'Screen Removal', 'Display Replacement',
  'Charging Port Replacement', 'Charging Port Removal', 'USB-C Port',
  'Front Camera', 'Rear Camera', 'Back Camera',
  'Back Glass Replacement', 'Back Cover Replacement', 'Rear Cover',
  'Loudspeaker Replacement', 'Speaker Replacement',
  'Earpiece Speaker', 'Ear Speaker',
  'Microphone Replacement',
  'Logic Board Replacement', 'Motherboard Replacement',
  'Taptic Engine', 'Vibration Motor',
  'LiDAR Sensor',
  'Teardown',
  'Pentalobe Screws Removal', 'Disassembly',
];

// ── Yardımcı fonksiyonlar ────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchJSON(url: string): Promise<any> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; iFixit-Research/1.0)',
        'Accept': 'application/json',
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
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
    } catch {
      resolve();
    }
  });
}

function isKeyGuide(title: string): boolean {
  const t = title.toLowerCase();
  return KEY_GUIDE_KEYWORDS.some(kw => t.includes(kw.toLowerCase()));
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9\-_]/gi, '_').slice(0, 60);
}

// ── Guide metnini düz metin formatına çevir ──────────────────────────────────

function guideToText(guide: any, title: string): string {
  const lines: string[] = [];
  lines.push(`=== ${title} ===`);
  lines.push(`Kaynak: https://www.ifixit.com/Guide/${guide.guideid}`);
  lines.push(`Zorluk: ${guide.difficulty ?? 'Belirtilmemiş'}`);
  lines.push(`Tahmini Süre: ${guide.time_required ?? 'Belirtilmemiş'}`);
  lines.push('');

  // Giriş
  if (guide.introduction_rendered) {
    lines.push('--- GİRİŞ ---');
    lines.push(guide.introduction_rendered.replace(/<[^>]+>/g, '').trim());
    lines.push('');
  }

  // Gerekli aletler
  if (guide.tools?.length) {
    lines.push('--- GEREKLI ALETLER ---');
    for (const tool of guide.tools) {
      lines.push(`• ${tool.text || tool.name || JSON.stringify(tool)}`);
    }
    lines.push('');
  }

  // Gerekli parçalar
  if (guide.parts?.length) {
    lines.push('--- GEREKLI PARÇALAR ---');
    for (const part of guide.parts) {
      lines.push(`• ${part.text || part.name || JSON.stringify(part)}`);
    }
    lines.push('');
  }

  // Adımlar
  if (guide.steps?.length) {
    lines.push('--- ADIM ADIM TAMİR REHBERİ ---');
    for (const step of guide.steps) {
      lines.push(`\nAdım ${step.stepid}: ${step.title || ''}`);
      // Görseller
      const mediaItems: any[] = Array.isArray(step.media?.data) ? step.media.data
        : Array.isArray(step.images) ? step.images : [];
      for (const img of mediaItems) {
        if (!img || typeof img !== 'object') continue;
        const imgUrl = img.standard || img.large || img.medium || '';
        if (imgUrl) lines.push(`  [GÖRSEL]: ${imgUrl}`);
      }
      // Metin satırları
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

// ── Görsel URL'lerini guide'dan çıkar ───────────────────────────────────────

function extractImageUrls(guide: any): string[] {
  const urls: string[] = [];
  if (!guide.steps) return urls;
  for (const step of guide.steps) {
    let mediaItems: any[] = [];
    if (Array.isArray(step.media?.data)) mediaItems = step.media.data;
    else if (Array.isArray(step.images))  mediaItems = step.images;
    for (const img of mediaItems) {
      if (!img || typeof img !== 'object') continue;
      const url = img.standard || img.large || img.medium || '';
      if (url && url.startsWith('http')) urls.push(url);
    }
  }
  return urls;
}

// ── Ana fonksiyon ────────────────────────────────────────────────────────────

async function processModel(modelName: string): Promise<void> {
  const meta = MODEL_MAP[modelName];
  if (!meta) return;

  const modelDir  = path.join(OUT_DIR, meta.brand, meta.folderSlug);
  const imagesDir = path.join(modelDir, 'images');
  fs.mkdirSync(imagesDir, { recursive: true });

  const textLines: string[] = [];
  textLines.push(`MODEL: ${modelName}`);
  textLines.push(`iFixit Cihaz Sayfası: https://www.ifixit.com/Device/${meta.ifixitSlug}`);
  textLines.push('='.repeat(70));
  textLines.push('');

  // 1. Cihaz wiki bilgisi
  await sleep(DELAY);
  const wiki = await fetchJSON(`${API}/wikis/CATEGORY/${meta.ifixitSlug}`);

  if (!wiki) {
    textLines.push('⚠ Bu model için iFixit cihaz sayfası bulunamadı.');
    fs.writeFileSync(path.join(modelDir, 'bilgi.txt'), textLines.join('\n'), 'utf8');
    return;
  }

  // Cihaz açıklaması
  if (wiki.contents_rendered || wiki.description) {
    textLines.push('=== CİHAZ HAKKINDA ===');
    const desc = (wiki.contents_rendered || wiki.description || '')
      .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    textLines.push(desc);
    textLines.push('');
  }

  // Tüm guide listesi (başlıklar)
  const allGuides: { guideid: number; title: string }[] = wiki.guides || [];
  if (allGuides.length) {
    textLines.push(`=== MEVCUT TAMİR REHBERLERİ (${allGuides.length} adet) ===`);
    for (const g of allGuides) {
      textLines.push(`  [${g.guideid}] ${g.title}`);
    }
    textLines.push('');
  }

  // 2. Her önemli guide için tam içerik
  const keyGuides = allGuides.filter(g => isKeyGuide(g.title));
  let imageCounter = 0;

  for (const g of keyGuides) {
    await sleep(DELAY);
    const guide = await fetchJSON(`${API}/guides/${g.guideid}`);
    if (!guide) continue;

    // Metin ekle
    textLines.push(guideToText(guide, g.title));
    textLines.push('-'.repeat(70));
    textLines.push('');

    // Görselleri indir
    const imageUrls = extractImageUrls(guide);
    for (const imgUrl of imageUrls) {
      imageCounter++;
      const slug = sanitizeFilename(g.title);
      const dest = path.join(imagesDir, `${slug}-${imageCounter}.jpg`);
      await sleep(150);
      await downloadImage(imgUrl, dest);
    }
  }

  // Kaydet
  fs.writeFileSync(path.join(modelDir, 'bilgi.txt'), textLines.join('\n'), 'utf8');
}

// ── Çalıştır ─────────────────────────────────────────────────────────────────

async function main() {
  const models = Object.keys(MODEL_MAP);
  console.log(`Toplam ${models.length} model işlenecek...\n`);

  let done = 0;
  for (const modelName of models) {
    const meta = MODEL_MAP[modelName];
    process.stdout.write(`[${++done}/${models.length}] ${modelName} → ${meta.brand}/${meta.folderSlug} ... `);
    try {
      await processModel(modelName);
      console.log('✓');
    } catch (err) {
      console.log(`✗ HATA: ${err}`);
    }
  }

  console.log(`\n✅ Tamamlandı → ${OUT_DIR}`);
}

main().catch(console.error);
