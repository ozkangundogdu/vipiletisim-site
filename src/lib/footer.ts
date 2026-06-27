import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

export type FooterLink = { label: string; href: string };

export type FooterContent = {
  firmaBaslik: string;
  popularHizmetler: FooterLink[];
  popularBolgeler: FooterLink[];
  altMetin: string;
};

const FILE = path.join(process.cwd(), "content/footer.json");

const DEFAULT: FooterContent = {
  firmaBaslik: "Vip İletişim Trabzon Cep Telefonu Teknik Servisi",
  popularHizmetler: [
    { label: "iPhone 16 Ekran Değişimi", href: "/tamir-hizmetleri/iphone-16-ekran-degisimi" },
    { label: "iPhone 14 Ekran Değişimi", href: "/tamir-hizmetleri/iphone-14-ekran-degisimi" },
    { label: "Samsung S24 Ekran", href: "/tamir-hizmetleri/samsung-galaxy-s24-ekran-degisimi" },
    { label: "iPhone Şarj Soketi Tamiri", href: "/tamir-hizmetleri/iphone-sarj-soketi-tamiri" },
    { label: "iPhone Batarya Değişimi", href: "/tamir-hizmetleri/iphone-batarya-degisimi" },
  ],
  popularBolgeler: [
    { label: "Trabzon iPhone Tamiri", href: "/bolge/trabzon-iphone-tamiri" },
    { label: "Giresun Telefon Tamiri", href: "/bolge/giresun-telefon-tamiri" },
    { label: "Rize iPhone Tamiri", href: "/bolge/rize-iphone-tamiri" },
    { label: "Artvin Telefon Tamiri", href: "/bolge/artvin-telefon-tamiri" },
    { label: "Gümüşhane Telefon Tamiri", href: "/bolge/gumushane-telefon-tamiri" },
  ],
  altMetin: "Trabzon iPhone Tamiri · Samsung Tamiri · Telefon Teknik Servis Trabzon",
};

export function getFooter(): FooterContent {
  noStore();
  if (!fs.existsSync(FILE)) return DEFAULT;
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8")) as FooterContent;
  } catch {
    return DEFAULT;
  }
}

export function saveFooter(data: FooterContent): void {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
}
