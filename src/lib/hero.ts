import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

export type HeroOzellik = {
  ikon: "check" | "speed" | "search" | "shield" | "wrench" | "star";
  baslik: string;
  aciklama: string;
};

export type HeroData = {
  baslikOnce: string;
  baslikVurgu: string;
  baslikSonra: string;
  aciklama: string;
  arkaplan: string;
  ozellikler: HeroOzellik[];
};

const FILE = path.join(process.cwd(), "content/hero.json");

const DEFAULT: HeroData = {
  baslikOnce: "Profesyonel",
  baslikVurgu: "iPhone",
  baslikSonra: "ve Cep Telefonu Tamiri",
  aciklama: "Trabzon'da iPhone, Samsung, Xiaomi ve tüm marka telefonlar için aynı gün tamir. Orijinal parça, uzman kadro.",
  arkaplan: "/images/hero/phone-repair-hero.webp",
  ozellikler: [
    { ikon: "check", baslik: "Anakart Tamirinde 90 Gün Garanti", aciklama: "Anakart onarımlarında 90 gün işçilik garantisi, tüm işlemlerde uzman kadro güvencesi." },
    { ikon: "speed", baslik: "Hızlı & Kaliteli İşçilik", aciklama: "Orijinal parçalarla kalite garantisiyle en hızlı şekilde tamir edilir." },
    { ikon: "search", baslik: "Uzman Teknisyenler: Hızlı Tamir", aciklama: "Sektörün en iyi teknisyenleri ile cihazınızı kısa sürede teslim alın." },
  ],
};

export function getHero(): HeroData {
  noStore();
  if (!fs.existsSync(FILE)) return DEFAULT;
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8")) as HeroData;
  } catch {
    return DEFAULT;
  }
}

export function saveHero(data: HeroData): void {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
}
