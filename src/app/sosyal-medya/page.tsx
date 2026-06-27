import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPageContent } from "@/lib/page-content";
import type { SosyalPlatform } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Sosyal Medya | Vip İletişim Trabzon",
  description: "Vip İletişim Trabzon sosyal medya kanalları. Instagram, YouTube, Facebook ve Google İşletme hesaplarımızı takip edin.",
  alternates: { canonical: "https://vipiletisim.com.tr/sosyal-medya" },
};

const PLATFORM_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  instagram: { bg: "from-purple-600 to-pink-500", text: "text-purple-600", border: "border-purple-200" },
  youtube: { bg: "from-red-600 to-red-500", text: "text-red-600", border: "border-red-200" },
  facebook: { bg: "from-blue-700 to-blue-600", text: "text-blue-700", border: "border-blue-200" },
  google: { bg: "from-zinc-700 to-zinc-600", text: "text-zinc-700", border: "border-zinc-200" },
};

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
};

function PlatformCard({ p }: { p: SosyalPlatform }) {
  const colors = PLATFORM_COLORS[p.platform] ?? PLATFORM_COLORS.google;
  const icon = PLATFORM_ICONS[p.platform];

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5 ${colors.border}`}
    >
      {/* Kapak görseli veya gradient header */}
      {p.image ? (
        <div className="aspect-video overflow-hidden">
          <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        </div>
      ) : (
        <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${colors.bg}`}>
          <div className="text-white opacity-30">{icon}</div>
        </div>
      )}

      {/* İçerik */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className={colors.text}>{icon}</div>
          <div>
            <p className="text-[15px] font-black text-zinc-800">{p.name}</p>
            {p.handle && <p className="text-[12px] font-medium text-zinc-400">{p.handle}</p>}
          </div>
        </div>
        {p.description && (
          <p className="flex-1 text-[13px] leading-relaxed text-zinc-600">{p.description}</p>
        )}
        <div className={`mt-4 text-[13px] font-black ${colors.text} group-hover:underline`}>
          Takip Et →
        </div>
      </div>
    </a>
  );
}

import React from "react";

export default function SosyalMedyaPage() {
  const pc = getPageContent("sosyal-medya");

  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="bg-surface-hero py-6 lg:py-8">
          <div className="mx-auto max-w-[1330px] px-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/50">
                <li><Link href="/" className="hover:text-white/80 transition-colors">Anasayfa</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white/80">Sosyal Medya</li>
              </ol>
            </nav>
            <h1 className="mt-3 text-3xl font-black text-white lg:text-4xl">{pc.hero.title}</h1>
            <p className="mt-2 max-w-[600px] text-[15px] text-white/60">{pc.hero.subtitle}</p>
          </div>
        </section>

        {/* Platformlar */}
        <section className="bg-surface-page py-14">
          <div className="mx-auto max-w-[1330px] px-6">
            {pc.intro && (
              <p className="mb-10 max-w-[700px] text-[15px] leading-relaxed text-zinc-600">{pc.intro}</p>
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pc.platforms.map((p) => (
                <PlatformCard key={p.platform} p={p} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
