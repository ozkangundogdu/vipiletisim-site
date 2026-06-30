import type { ServiceCategory } from "./types";

export const SERVICE_CATEGORY: Record<string, ServiceCategory> = {
  "ekran-degisimi": "ekran-sorunlari",
  "on-cam-degisimi": "ekran-sorunlari",
  "kamera-cami-tamiri": "ekran-sorunlari",
  "batarya-degisimi": "batarya-sorunlari",
  "sarj-soketi-tamiri": "sarj-sorunlari",
  "sarj-entegresi-tamiri": "sarj-sorunlari",
  "sarj-olmuyor-tamiri": "sarj-sorunlari",
  "ses-arizalari": "ses-mikrofon",
  "mikrofon-tamiri": "ses-mikrofon",
  "hoparlor-tamiri": "ses-mikrofon",
  "on-kamera-tamiri": "kamera-sorunlari",
  "arka-kamera-tamiri": "kamera-sorunlari",
  "face-id-tamiri": "kamera-sorunlari",
  "kasa-degisimi": "govde-kasa",
  "arka-kapak-tamiri": "govde-kasa",
  "anakart-tamiri": "anakart-yazilim",
  "wifi-tamiri": "anakart-yazilim",
  "servis-yok-arizasi": "anakart-yazilim",
  "sivi-temasi-tamiri": "sivi-hasari",
  "acma-kapama-tusu-tamiri": "tus-buton",
};

/** İş önceliği: talep sıklığı + komersiyel değere göre 1-10. */
export const TAMIR_PRIORITY: Record<string, number> = {
  "ekran-degisimi": 10,
  "batarya-degisimi": 9,
  "anakart-tamiri": 8,
  "sivi-temasi-tamiri": 7,
  "sarj-soketi-tamiri": 7,
  "sarj-olmuyor-tamiri": 7,
  "sarj-entegresi-tamiri": 6,
  "ses-arizalari": 6,
  "hoparlor-tamiri": 6,
  "arka-kamera-tamiri": 6,
  "mikrofon-tamiri": 5,
  "on-kamera-tamiri": 5,
  "kamera-cami-tamiri": 5,
  "kasa-degisimi": 5,
  "arka-kapak-tamiri": 5,
  "on-cam-degisimi": 5,
  "face-id-tamiri": 4,
  "wifi-tamiri": 4,
  "servis-yok-arizasi": 4,
  "acma-kapama-tusu-tamiri": 4,
};

/** Marka odağı: sitenin ana vurgusu iPhone, ardından Samsung, Xiaomi. */
export const MARKA_WEIGHT: Record<string, number> = {
  iphone: 3,
  samsung: 2,
  xiaomi: 1,
};
