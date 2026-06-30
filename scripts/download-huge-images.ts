/**
 * iFixit Görsel Yeniden İndirici — standard → huge
 * Tüm bilgi.txt dosyalarındaki [GÖRSEL] URL'lerini okur,
 * .huge versiyonunu indirir, hash ismiyle kaydeder.
 * Zaten varsa atlar (resume özelliği).
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const IFITIT_DIR = 'C:\\Users\\W11\\Desktop\\ifitit';
const DELAY_MS   = 150; // ms — rate limit için

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

function downloadImage(url: string, dest: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        resolve(false);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
      file.on('error', () => { file.close(); fs.unlink(dest, () => {}); resolve(false); });
    }).on('error', () => { file.close(); fs.unlink(dest, () => {}); resolve(false); });
  });
}

function extractHashFromUrl(url: string): string | null {
  // https://guide-images.cdn.ifixit.com/igi/HASH.standard
  const m = url.match(/\/igi\/([^.\/]+)\./);
  return m ? m[1] : null;
}

async function main() {
  // Tüm bilgi.txt dosyalarını bul
  const bilgiFiles: string[] = [];
  function findBilgi(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) findBilgi(full);
      else if (entry.name === 'bilgi.txt') bilgiFiles.push(full);
    }
  }
  findBilgi(IFITIT_DIR);

  console.log(`${bilgiFiles.length} model klasörü bulundu.\n`);

  let totalUrls  = 0;
  let downloaded = 0;
  let skipped    = 0;
  let failed     = 0;

  for (let i = 0; i < bilgiFiles.length; i++) {
    const bilgiPath  = bilgiFiles[i];
    const imagesDir  = path.join(path.dirname(bilgiPath), 'images');
    fs.mkdirSync(imagesDir, { recursive: true });

    const lines = fs.readFileSync(bilgiPath, 'utf8').split('\n');
    const görselLines = lines.filter(l => l.includes('[GÖRSEL]:'));

    const modelName = path.basename(path.dirname(bilgiPath));
    process.stdout.write(`[${i+1}/${bilgiFiles.length}] ${modelName} — ${görselLines.length} görsel: `);

    let modelDl = 0;
    let modelSk = 0;

    for (const line of görselLines) {
      const urlMatch = line.match(/\[GÖRSEL\]:\s*(https?:\/\/\S+)/);
      if (!urlMatch) continue;

      const originalUrl = urlMatch[1].trim();
      const hash = extractHashFromUrl(originalUrl);
      if (!hash) continue;

      totalUrls++;
      const hugeUrl = `https://guide-images.cdn.ifixit.com/igi/${hash}.huge`;
      const dest    = path.join(imagesDir, `${hash}.jpg`);

      // Zaten varsa ve > 10KB ise atla
      if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
        skipped++;
        modelSk++;
        continue;
      }

      await sleep(DELAY_MS);
      const ok = await downloadImage(hugeUrl, dest);
      if (ok) { downloaded++; modelDl++; }
      else    { failed++; }
    }

    console.log(`✓ indirildi:${modelDl} atlandı:${modelSk}`);
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Toplam URL    : ${totalUrls}
İndirilen     : ${downloaded}
Atlandı (var) : ${skipped}
Başarısız     : ${failed}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(console.error);
