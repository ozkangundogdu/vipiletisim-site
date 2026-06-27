import fs from "fs";
import path from "path";
import { getServiceBySlug } from "@/data/services";
import { getCustomServiceBySlug } from "@/lib/custom-services";

export const dynamic = "force-dynamic";

const DIR = path.join(process.cwd(), "content/repair-pages");

type RepairPageFile = {
  slug: string;
  customTitle?: string;
  customDescription?: string;
  customContent?: string;
  coverImage?: string;
  publishedAt?: string;
};

function readAll(): RepairPageFile[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(DIR, f), "utf-8")) as RepairPageFile;
      } catch { return null; }
    })
    .filter(Boolean) as RepairPageFile[];
}

export async function GET() {
  const now = new Date();
  const files = readAll();
  const items = files
    .filter((file) => !file.publishedAt || new Date(file.publishedAt) > now)
    .map((file) => {
      const svc = getServiceBySlug(file.slug) ?? getCustomServiceBySlug(file.slug);
      return {
        slug: file.slug,
        title: file.customTitle || svc?.title || file.slug,
        publishedAt: file.publishedAt ?? "",
        hasContent: !!file.customContent,
        isDraft: !!file.publishedAt,
      };
    });
  return Response.json(items);
}

export async function POST(request: Request) {
  const updates: { slug: string; publishedAt: string }[] = await request.json();
  let count = 0;
  for (const { slug, publishedAt } of updates) {
    const filePath = path.join(DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) continue;
    try {
      const data: RepairPageFile = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      data.publishedAt = publishedAt;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      count++;
    } catch { /* skip */ }
  }
  return Response.json({ ok: true, updated: count });
}
