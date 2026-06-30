import type { MarkaTamir } from "@/lib/marka-tamir";
import type { BlogPost } from "@/lib/blog";

export type ServiceCategory =
  | "ekran-sorunlari"
  | "batarya-sorunlari"
  | "sarj-sorunlari"
  | "ses-mikrofon"
  | "kamera-sorunlari"
  | "govde-kasa"
  | "anakart-yazilim"
  | "sivi-hasari"
  | "tus-buton";

export type Service = {
  slug: string;
  url: string;
  title: string;
  marka: MarkaTamir["marka"];
  markaLabel: string;
  tamirKey: string;
  tamirLabel: string;
  category: ServiceCategory;
  priority: number;
  keywordPool: string[];
};

export type SelectedLink = {
  service: Service;
  anchorText: string;
};

export type LinkSelectionResult = {
  usedInContent: SelectedLink[];
  related: Service[];
};

export type { BlogPost };
