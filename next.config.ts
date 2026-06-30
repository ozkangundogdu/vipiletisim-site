import type { NextConfig } from "next";

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
        source: "/api/admin/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
      // Admin sayfaları — asla cache'lenmemeli
      {
        source: "/admin(.*)",
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
