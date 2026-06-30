/**
 * tamirKey başına anchor text şablonları. {marka} ilgili servis sayfasının
 * markaLabel değeriyle (iPhone/Samsung/Xiaomi) değiştirilir.
 * face-id-tamiri yalnızca iPhone'da var, marka adı şablona gömülü.
 */
export const KEYWORD_TEMPLATES: Record<string, string[]> = {
  "ekran-degisimi": [
    "{marka} ekran değişimi",
    "{marka} ekran tamiri",
    "{marka} cam değişimi",
    "{marka} ekran kırıldı",
    "{marka} dokunmatik sorunu",
    "Trabzon {marka} ekran değişimi",
  ],
  "on-cam-degisimi": [
    "{marka} ön cam değişimi",
    "{marka} ön cam tamiri",
    "{marka} ekran camı kırıldı",
    "{marka} dış cam değişimi",
  ],
  "kamera-cami-tamiri": [
    "{marka} kamera camı değişimi",
    "{marka} kamera camı tamiri",
    "{marka} arka kamera camı kırıldı",
    "{marka} lens camı değişimi",
  ],
  "batarya-degisimi": [
    "{marka} batarya değişimi",
    "{marka} pil değişimi",
    "{marka} pil sağlığı düşük",
    "{marka} şarj sorunu",
    "{marka} batarya şişmesi",
    "{marka} hızlı bitiyor pil",
  ],
  "sarj-soketi-tamiri": [
    "{marka} şarj soketi tamiri",
    "{marka} şarj girişi sorunu",
    "{marka} şarj soketi değişimi",
    "{marka} kablo takılmıyor",
  ],
  "sarj-entegresi-tamiri": [
    "{marka} şarj entegresi tamiri",
    "{marka} şarj IC arızası",
    "{marka} şarj olmuyor anakart",
  ],
  "sarj-olmuyor-tamiri": [
    "{marka} şarj olmuyor",
    "{marka} şarja takılınca tepki vermiyor",
    "{marka} şarj sorunu çözümü",
  ],
  "ses-arizalari": [
    "{marka} ses arızası",
    "{marka} ses gelmiyor",
    "{marka} ses sorunu",
    "{marka} karşı taraf duymuyor",
  ],
  "mikrofon-tamiri": [
    "{marka} mikrofon tamiri",
    "{marka} mikrofon arızası",
    "{marka} ses kaydı çalışmıyor",
    "{marka} karşı taraf beni duymuyor",
  ],
  "hoparlor-tamiri": [
    "{marka} hoparlör tamiri",
    "{marka} hoparlör değişimi",
    "{marka} ses çok kısık",
    "{marka} speakerphone çalışmıyor",
  ],
  "on-kamera-tamiri": [
    "{marka} ön kamera tamiri",
    "{marka} selfie kamerası bozuk",
    "{marka} ön kamera değişimi",
  ],
  "arka-kamera-tamiri": [
    "{marka} arka kamera tamiri",
    "{marka} kamera bulanık",
    "{marka} arka kamera değişimi",
    "{marka} kamera açılmıyor",
  ],
  "face-id-tamiri": [
    "iPhone Face ID tamiri",
    "iPhone yüz tanıma çalışmıyor",
    "iPhone Face ID ayarlanamadı hatası",
  ],
  "kasa-degisimi": [
    "{marka} kasa değişimi",
    "{marka} kasa tamiri",
    "{marka} gövde değişimi",
    "{marka} kasa bükülmüş",
  ],
  "arka-kapak-tamiri": [
    "{marka} arka kapak değişimi",
    "{marka} arka cam kırıldı",
    "{marka} arka kapak tamiri",
  ],
  "anakart-tamiri": [
    "{marka} anakart tamiri",
    "{marka} açılmıyor anakart arızası",
    "{marka} anakart onarımı",
  ],
  "wifi-tamiri": [
    "{marka} wifi sorunu",
    "{marka} wifi tamiri",
    "{marka} internete bağlanmıyor",
  ],
  "servis-yok-arizasi": [
    "{marka} servis yok hatası",
    "{marka} sinyal çekmiyor",
    "{marka} şebeke sorunu",
  ],
  "sivi-temasi-tamiri": [
    "{marka} suya düştü",
    "{marka} sıvı teması tamiri",
    "{marka} su hasarı onarımı",
  ],
  "acma-kapama-tusu-tamiri": [
    "{marka} açma kapama tuşu tamiri",
    "{marka} güç tuşu çalışmıyor",
    "{marka} power tuşu arızası",
  ],
};

export function buildKeywordPool(tamirKey: string, markaLabel: string): string[] {
  const templates = KEYWORD_TEMPLATES[tamirKey] ?? [];
  return templates.map((t) => t.replace("{marka}", markaLabel));
}

/**
 * Marka adı geçmeyen, genel konu ifadeleri (kategori/konu tespiti için).
 * Gerçek blog metinleri çoğunlukla markasız genel cümleler kurar
 * ("telefon bataryası şişti" gibi); bu yüzden kategori tespitinde
 * marka önekini zorunlu tutmuyoruz — yalnızca içerik içi link
 * eklerken (anchor seçiminde) marka adı arandığı için brand-specific
 * havuz (buildKeywordPool) kullanılır.
 */
export function buildGenericTopicTerms(tamirKey: string): string[] {
  const templates = KEYWORD_TEMPLATES[tamirKey] ?? [];
  const terms = templates.map((t) => t.replace("{marka} ", "").replace("{marka}", "").trim());
  return [...new Set(terms.filter(Boolean))];
}
