import fs from "fs";
import path from "path";

export type DesteklenenModel = {
  model: string;
  aktif: boolean;
};

export type MarkaSSS = {
  soru: string;
  cevap: string;
};

export type MarkaTamir = {
  slug: string;
  marka: "iphone" | "samsung" | "xiaomi";
  markaLabel: string;
  tamirKey: string;
  tamirLabel: string;
  title: string;
  metaDescription: string;
  icerik: string;
  sss: MarkaSSS[];
  desteklenenModeller: DesteklenenModel[];
};

const DIR = path.join(process.cwd(), "content/marka-tamirler");

function ensureDir() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
}

export function getMarkaTamir(slug: string): MarkaTamir | null {
  try {
    const file = path.join(DIR, `${slug}.json`);
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return null;
  }
}

export function getAllMarkaTamirler(): MarkaTamir[] {
  try {
    ensureDir();
    return fs
      .readdirSync(DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf-8")))
      .sort((a, b) => `${a.marka}-${a.tamirKey}`.localeCompare(`${b.marka}-${b.tamirKey}`));
  } catch {
    return [];
  }
}

export function saveMarkaTamir(data: MarkaTamir): void {
  ensureDir();
  const file = path.join(DIR, `${data.slug}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

export function getMarkaTamirlerByMarka(marka: "iphone" | "samsung" | "xiaomi"): MarkaTamir[] {
  return getAllMarkaTamirler().filter((m) => m.marka === marka);
}
