import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

export type SiteScripts = {
  gaId: string;
  gtmId: string;
  headExtra: string;
  bodyStart: string;
  bodyEnd: string;
};

const FILE = path.join(process.cwd(), "content/scripts.json");

const DEFAULT: SiteScripts = {
  gaId: "",
  gtmId: "",
  headExtra: "",
  bodyStart: "",
  bodyEnd: "",
};

export function getScripts(): SiteScripts {
  noStore();
  if (!fs.existsSync(FILE)) return DEFAULT;
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8")) as SiteScripts;
  } catch {
    return DEFAULT;
  }
}

export function saveScripts(data: SiteScripts): void {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
}
