import type { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { BrandsSection } from "@/components/brands-section";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const revalidate = 600;

const BASE = "https://vipiletisim.com.tr";

export const metadata: Metadata = {
  title: {
    absolute: "Vip İletişim | Trabzon iPhone ve Cep Telefonu Tamiri",
  },
  description:
    "Trabzon'da profesyonel iPhone, Samsung, Xiaomi, Huawei ve Oppo tamiri. Orijinal parça, uzman teknisyen, aynı gün teslim. Hızlı ve güvenilir teknik servis.",
  keywords: [
    "trabzon iphone tamiri",
    "trabzon cep telefonu tamiri",
    "trabzon samsung tamiri",
    "trabzon telefon teknik servis",
    "Trabzon Vip İletişim",
    "trabzon telefon servisi",
    "iphone ekran değişimi trabzon",
  ],
  alternates: { canonical: BASE },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: BASE,
    siteName: "Trabzon Vip İletişim",
    title: "Vip İletişim | Trabzon iPhone ve Cep Telefonu Tamiri",
    description:
      "Trabzon'da profesyonel iPhone, Samsung, Xiaomi, Huawei ve Oppo tamiri. Orijinal parça, uzman teknisyen, aynı gün teslim.",
    images: [
      {
        url: `${BASE}/images/hero/phone-repair-hero.webp`,
        width: 1200,
        height: 630,
        alt: "Vip İletişim Trabzon Telefon Tamiri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vip İletişim | Trabzon iPhone ve Cep Telefonu Tamiri",
    description:
      "Trabzon'da profesyonel iPhone, Samsung, Xiaomi, Huawei ve Oppo tamiri. Orijinal parça, uzman teknisyen, aynı gün teslim.",
    images: [`${BASE}/images/hero/phone-repair-hero.webp`],
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ReviewsSection />
        <BrandsSection />
        <ServicesSection />
        <BlogSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
