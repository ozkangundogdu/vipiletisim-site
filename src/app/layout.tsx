import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const BASE = "https://vipiletisim.com.tr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Vip İletişim | Trabzon iPhone ve Cep Telefonu Tamiri",
    template: "%s | Vip İletişim Trabzon",
  },
  description:
    "Trabzon'da profesyonel iPhone, Samsung, Xiaomi, Huawei ve Oppo tamiri. Orijinal parça, uzman teknisyen, aynı gün teslim. Hızlı ve güvenilir teknik servis.",
  keywords: [
    "trabzon iphone tamiri",
    "trabzon cep telefonu tamiri",
    "trabzon samsung tamiri",
    "trabzon telefon teknik servis",
    "vip iletişim trabzon",
  ],
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: BASE,
    siteName: "Vip İletişim Trabzon",
    title: "Vip İletişim | Trabzon iPhone ve Cep Telefonu Tamiri",
    description:
      "Trabzon'da profesyonel iPhone, Samsung, Xiaomi, Huawei ve Oppo tamiri. Orijinal parça, uzman teknisyen, aynı gün teslim.",
    images: [
      {
        url: "/images/hero/phone-repair-hero.webp",
        width: 1200,
        height: 630,
        alt: "Vip İletişim Trabzon Telefon Tamiri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vip İletişim | Trabzon iPhone ve Cep Telefonu Tamiri",
    description: "Trabzon'da profesyonel iPhone, Samsung, Xiaomi, Huawei ve Oppo tamiri.",
    images: ["/images/hero/phone-repair-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vip İletişim Trabzon",
  url: BASE,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE}/arama?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE}/#localbusiness`,
  name: "Vip İletişim Teknik Servis",
  description:
    "Trabzon'da iPhone, Samsung, Xiaomi, Huawei ve Oppo telefon tamiri. Orijinal parça, uzman kadro.",
  url: BASE,
  telephone: "+905052754540",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Çarşı Mahallesi Uzun Sokak Kolotoğlu Pasajı Kat 1",
    addressLocality: "Ortahisar",
    addressRegion: "Trabzon",
    postalCode: "61040",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0057,
    longitude: 39.7254,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "₺₺",
  areaServed: [
    { "@type": "City", name: "Trabzon" },
    { "@type": "City", name: "Giresun" },
    { "@type": "City", name: "Rize" },
    { "@type": "City", name: "Artvin" },
    { "@type": "City", name: "Gümüşhane" },
    { "@type": "City", name: "Bayburt" },
  ],
  hasMap: "https://maps.app.goo.gl/DZ4cDzDNBNAGvxsR9",
  currenciesAccepted: "TRY",
  paymentAccepted: "Nakit, EFT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`h-full ${nunitoSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
