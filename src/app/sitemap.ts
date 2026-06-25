import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://vipiletisim.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/tamir-hizmetleri`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/fiyatlar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/bolge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tamir-egitimi`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/iletisim`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/kurumsal/hakkimizda`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/kurumsal/sikca-sorulan-sorular`, lastModified: "2026-06-25", changeFrequency: "monthly", priority: 0.6 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/tamir-hizmetleri/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${BASE}/bolge/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages, ...blogPosts];
}
