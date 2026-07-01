import type { NextConfig } from "next";

// Sitede gerçekten kullanılan dış kaynaklar (next.config.ts içindeki
// güvenlik başlıklarını bozmadan önce src/ taranarak çıkarıldı):
// - GA/GTM: googletagmanager.com (script + iframe), google-analytics.com (beacon)
// - YouTube embed (cep-tamir-videolar), Instagram embed (cep-tamir-videolar)
// - Google Maps embed (iletişim sayfası)
const cspDirectives = [
  "default-src 'self'",
  // Next.js hydration/inline script'leri (gtag, gtm init) nonce altyapısı
  // olmadığı için 'unsafe-inline' gerekiyor; Report-Only modda risk yok.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://img.youtube.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com",
  "frame-src https://www.youtube.com https://www.instagram.com https://maps.google.com https://www.googletagmanager.com",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  // Tarayıcı MIME türünü değiştirmesin
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Site başka bir sitede iframe içinde gösterilemesin (clickjacking koruması)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Eski tarayıcılarda XSS koruması
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Referrer bilgisi: sadece aynı origin'de tam URL, dışarıya yalnızca domain
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Kamera/mikrofon/konum izinleri
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  // DNS ön yüklemesini aç (performans)
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // HTTPS zorunluluğu — site tamamen HTTPS üzerinden servis ediliyor.
  // 2 yıl + alt domainler; preload listesine eklenmek istenirse
  // hstspreload.org üzerinden ayrıca başvuru gerekir.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  // CSP — şimdilik Report-Only: hiçbir şeyi engellemez, yalnızca tarayıcı
  // konsoluna ihlalleri loglar. Bir süre canlıda izlendikten ve gerçek
  // ihlal çıkmadığı doğrulandıktan sonra "Content-Security-Policy" olarak
  // (Report-Only olmadan) değiştirilip zorlayıcı hale getirilmeli.
  { key: "Content-Security-Policy-Report-Only", value: cspDirectives },
];

const nextConfig: NextConfig = {
  // Tüm URL'ler slash'siz: /blog değil /blog/
  trailingSlash: false,

  // "X-Powered-By: Next.js" başlığını kaldır (güvenlik)
  poweredByHeader: false,

  // Gzip/Brotli sıkıştırma
  compress: true,

  // Resim optimizasyonu
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31_536_000,
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },

  async headers() {
    return [
      // Tüm sayfalara güvenlik başlıkları
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Next.js statik dosyaları (JS/CSS bundle'ları) — hash'li olduğu için 1 yıl immutable
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Public klasöründeki resimler
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Fontlar
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // favicon ve manifest
      {
        source: "/(favicon.ico|site.webmanifest|robots.txt)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      // Admin API — asla cache'lenmemeli
      {
        source: "/api/vippanel/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
      // Admin sayfaları — asla cache'lenmemeli
      {
        source: "/vippanel(.*)",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },

  async redirects() {
    return [
      // www → www'suz yönlendirme (Nginx'te de yapılabilir ama buraya da eklendi)
      {
        source: "/(.*)",
        has: [{ type: "host", value: "www.vipiletisim.com.tr" }],
        destination: "https://vipiletisim.com.tr/$1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
