import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

const PAGES_DIR = path.join(process.cwd(), "content/pages");

export type FiyatlarContent = {
  hero: { title: string; subtitle: string; image: string };
  pricingDesc: { heading: string; text: string };
  infoCards: { title: string; desc: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  faq: { q: string; a: string }[];
};

export type TeamMember = {
  name: string;
  title: string;
  education: string;
  experience: string;
  bio: string;
  certificates: string[];
  specialties: string[];
  image: string;
  imagePosition?: string;
};

export type EkibimizContent = {
  hero: { title: string; subtitle: string };
  members: TeamMember[];
};

export type HakkimizdaContent = {
  hero: { title: string; subtitle: string; image: string };
  intro: {
    badge: string;
    heading: string;
    image: string;
    paragraphs: string[];
    checkList: string[];
  };
  stats: { value: string; label: string }[];
  whyUs: { title: string; desc: string }[];
  brands: { name: string; note: string }[];
};

export type CourseTopic = { title: string; items: string[] };
export type Course = {
  badge: string;
  title: string;
  subtitle: string;
  devices: string;
  duration: string;
  target: string;
  image: string;
  topics: CourseTopic[];
};

export type TamirEgitimiContent = {
  hero: { title: string; subtitle: string; image: string };
  courses: Course[];
  benefits: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
};

export type SosyalPlatform = {
  platform: "instagram" | "youtube" | "facebook" | "google";
  name: string;
  handle: string;
  url: string;
  description: string;
  image: string;
};

export type SosyalMedyaContent = {
  hero: { title: string; subtitle: string; image: string };
  intro: string;
  platforms: SosyalPlatform[];
};

type PageContentMap = {
  fiyatlar: FiyatlarContent;
  hakkimizda: HakkimizdaContent;
  ekibimiz: EkibimizContent;
  "tamir-egitimi": TamirEgitimiContent;
  "sosyal-medya": SosyalMedyaContent;
};

export function getPageContent<K extends keyof PageContentMap>(slug: K): PageContentMap[K] {
  noStore();
  const file = path.join(PAGES_DIR, `${slug}.json`);
  return JSON.parse(fs.readFileSync(file, "utf-8")) as PageContentMap[K];
}

export function savePageContent<K extends keyof PageContentMap>(slug: K, data: PageContentMap[K]): void {
  if (!fs.existsSync(PAGES_DIR)) fs.mkdirSync(PAGES_DIR, { recursive: true });
  fs.writeFileSync(path.join(PAGES_DIR, `${slug}.json`), JSON.stringify(data, null, 2), "utf-8");
}
