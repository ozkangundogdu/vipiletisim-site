import fs from "fs";
import path from "path";
import { repairTypeList } from "@/data/services";

export type CustomDevice = {
  id: string;
  brandKey: string;
  brandLabel: string;
  model: string;
  repairKeys: string[];
};

export type CustomService = {
  slug: string;
  title: string;
  model: string;
  brand: string;
  brandLabel: string;
  repairType: string;
  repairKey: string;
  duration: string;
  metaDescription: string;
  isCustom: true;
};

function slugify(text: string): string {
  return text
    .replace(/\+/g, " Plus")
    .toLowerCase()
    .replace(/ı/g, "i").replace(/İ/g, "i")
    .replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ü/g, "u").replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\./g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const DEVICES_FILE = path.join(process.cwd(), "content/custom-devices.json");

export function getCustomDevices(): CustomDevice[] {
  try {
    return JSON.parse(fs.readFileSync(DEVICES_FILE, "utf-8"));
  } catch { return []; }
}

export function saveCustomDevices(devices: CustomDevice[]): void {
  fs.writeFileSync(DEVICES_FILE, JSON.stringify(devices, null, 2), "utf-8");
}

export function getCustomServices(): CustomService[] {
  const devices = getCustomDevices();
  const result: CustomService[] = [];
  for (const device of devices) {
    for (const repairKey of device.repairKeys) {
      const rt = repairTypeList.find((r) => r.key === repairKey);
      if (!rt) continue;
      result.push({
        slug: `${slugify(device.model)}-${repairKey}`,
        title: `${device.model} ${rt.label}`,
        model: device.model,
        brand: device.brandKey,
        brandLabel: device.brandLabel,
        repairType: rt.label,
        repairKey,
        duration: rt.duration,
        metaDescription: `Trabzon'da ${device.model} ${rt.label} hizmeti. Uzman teknisyen, orijinal parça, aynı gün teslim. Vip İletişim Teknik Servis.`,
        isCustom: true,
      });
    }
  }
  return result;
}

export function getCustomServiceBySlug(slug: string): CustomService | null {
  return getCustomServices().find((s) => s.slug === slug) ?? null;
}

export function makeSlug(model: string, repairKey: string): string {
  return `${slugify(model)}-${repairKey}`;
}

export function modelSlug(model: string): string {
  return slugify(model);
}

export function getDraftCustomSlugs(): string[] {
  const now = new Date();
  const devices = getCustomDevices();
  const drafts: string[] = [];
  for (const device of devices) {
    for (const repairKey of device.repairKeys) {
      const slug = makeSlug(device.model, repairKey);
      try {
        const file = path.join(process.cwd(), "content/repair-pages", `${slug}.json`);
        const data = JSON.parse(fs.readFileSync(file, "utf-8"));
        if (data.publishedAt && new Date(data.publishedAt) > now) {
          drafts.push(slug);
        }
      } catch { /* dosya yoksa taslak değil */ }
    }
  }
  return drafts;
}
