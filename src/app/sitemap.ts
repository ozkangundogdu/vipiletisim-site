import type { MetadataRoute } from "next";
import fs from "fs";

export const revalidate = 3600; // her saat başı yeniden üret
import path from "path";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://vipiletisim.com.tr";

// Dosya yoksa fallback tarih döndür
function fileMtime(filePath: string, fallback: string): string {
  try {
    return fs.statSync(filePath).mtime.toISOString();
  } catch {
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts[0]?.publishedAt ?? "2026-06-25";

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: latestPost, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/tamir-hizmetleri`, lastModified: "2026-06-25", changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/fiyatlar`, lastModified: "2026-06-25", changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/bolge`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tamir-egitimi`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/iletisim`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/kurumsal/hakkimizda`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/kurumsal/sikca-sorulan-sorular`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.6 },
  ];

  const repairPagesDir = path.join(process.cwd(), "content/repair-pages");

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/tamir-hizmetleri/${s.slug}`,
    lastModified: fileMtime(path.join(repairPagesDir, `${s.slug}.json`), "2026-06-25"),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${BASE}/bolge/${c.slug}`,
    lastModified: "2026-06-25",
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPosts: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages, ...blogPosts];
}
