import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

export type SiteSettings = {
  telefon: string;
  telefonRaw: string;
  whatsapp: string;
  calisma: string;
  adres: string;
  sehir: string;
  ilce: string;
  posta: string;
  lat: number;
  lng: number;
  siteAdi: string;
  slogan: string;
  sosyal: {
    instagram: string;
    youtube: string;
    facebook: string;
    google: string;
  };
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  tarih: string;
  hizmet: string;
};

export type FaqItem = {
  id: string;
  soru: string;
  cevap: string;
};

export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  icon?: boolean;
  hasDropdown?: boolean;
  children?: NavChild[];
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getSettings(): SiteSettings {
  noStore();
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "settings.json"), "utf-8");
  return JSON.parse(raw) as SiteSettings;
}

export function getReviews(): Review[] {
  noStore();
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "reviews.json"), "utf-8");
  return JSON.parse(raw) as Review[];
}

export function getFaq(): FaqItem[] {
  noStore();
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "faq.json"), "utf-8");
  return JSON.parse(raw) as FaqItem[];
}

export function saveSettings(data: SiteSettings): void {
  fs.writeFileSync(path.join(CONTENT_DIR, "settings.json"), JSON.stringify(data, null, 2), "utf-8");
}

export function saveReviews(data: Review[]): void {
  fs.writeFileSync(path.join(CONTENT_DIR, "reviews.json"), JSON.stringify(data, null, 2), "utf-8");
}

export function saveFaq(data: FaqItem[]): void {
  fs.writeFileSync(path.join(CONTENT_DIR, "faq.json"), JSON.stringify(data, null, 2), "utf-8");
}

const DEFAULT_NAV: NavItem[] = [
  { label: "Anasayfa", href: "/" },
  { label: "Tamir Merkezi", href: "/tamir-hizmetleri#wizard", icon: true },
  { label: "Fiyatlar", href: "/fiyatlar" },
  { label: "Tamir Eğitimi", href: "/tamir-egitimi" },
  { label: "Blog", href: "/blog" },
  {
    label: "Kurumsal", href: "/kurumsal", hasDropdown: true,
    children: [
      { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
      { label: "Sıkça Sorulan Sorular", href: "/kurumsal/sikca-sorulan-sorular" },
    ],
  },
  { label: "İletişim", href: "/iletisim" },
];

export function getNav(): NavItem[] {
  noStore();
  const filePath = path.join(CONTENT_DIR, "nav.json");
  if (!fs.existsSync(filePath)) return DEFAULT_NAV;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as NavItem[];
  } catch {
    return DEFAULT_NAV;
  }
}

export function saveNav(data: NavItem[]): void {
  fs.writeFileSync(path.join(CONTENT_DIR, "nav.json"), JSON.stringify(data, null, 2), "utf-8");
}
