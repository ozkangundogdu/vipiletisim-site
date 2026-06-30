import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getVideos } from "@/lib/videos";
import { VideoGallery } from "./VideoGallery";

export const metadata: Metadata = {
  title: "Tamir Videoları | Trabzon Vip İletişim",
  description:
    "Trabzon'da cep telefonu tamir süreçlerimizi anlatan gerçek videolar. iPhone, Samsung, Xiaomi ekran, batarya ve kamera tamiri. Uzman ekibimizin çalışmalarını izleyin.",
  keywords: [
    "trabzon telefon tamir videosu",
    "iphone ekran değişimi video trabzon",
    "samsung tamir videosu trabzon",
    "cep telefonu tamir süreci",
    "vip iletişim trabzon video",
  ],
  alternates: { canonical: "https://vipiletisim.com.tr/cep-tamir-videolar" },
};

export default function TamirVideolariPage() {
  const now = new Date();
  const videos = getVideos().filter(v => !v.visibleFrom || new Date(v.visibleFrom) <= now);

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 lg:py-20"
        style={{ background: "linear-gradient(135deg, #0a1a3a 0%, #1A3A6B 60%, #0f2a50 100%)" }}
      >
        {/* Dekoratif daireler */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #ff351b, transparent)" }} />
        <div className="pointer-events-none absolute -bottom-10 right-10 h-56 w-56 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />

        <div className="relative mx-auto max-w-[1330px] px-6 text-center">
          {/* Platform badges */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <a
              href="https://www.youtube.com/@FatihcomertVip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-sm font-black text-white transition hover:bg-red-500"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
              </svg>
              YouTube
            </a>
            <a
              href="https://www.instagram.com/trabzonvipiletisim/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-black text-white transition hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 2.2c3.2 0 3.6.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.63.07 4.85 0 3.2-.01 3.6-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.63.07-4.85.07-3.2 0-3.6-.01-4.85-.07C3.69 21.57 2.15 20.03 2 16.8 1.94 15.55 1.93 15.17 1.93 12c0-3.2.01-3.6.07-4.85.15-3.27 1.67-4.77 4.92-4.92C8.4 2.21 8.8 2.2 12 2.2zm0 3.08a4.92 4.92 0 1 1 0 9.84 4.92 4.92 0 0 1 0-9.84z" />
              </svg>
              Instagram
            </a>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
            Tamir <span style={{ color: "#ff351b" }}>Videolarımız</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[680px] text-[16px] leading-relaxed text-zinc-300">
            Gerçek tamirler, uzman ekip. Trabzon'da nasıl çalıştığımızı kendi gözlerinizle görün —
            ekran değişiminden su hasarı kurtarımına tüm süreçler burada.
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm font-bold text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="text-accent">●</span> {videos.length} Video
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-red-500">●</span> YouTube
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-pink-400">●</span> Instagram Reels
            </span>
          </div>
        </div>
      </section>

      {/* Video gallery */}
      <main className="mx-auto max-w-[1330px] px-6 py-12 lg:py-16">
        {videos.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-xl font-black text-zinc-400">Henüz video eklenmemiş.</p>
            <p className="mt-2 text-sm text-zinc-500">Admin panelinden video ekleyebilirsiniz.</p>
          </div>
        ) : (
          <VideoGallery videos={videos} />
        )}
      </main>

      <SiteFooter />
    </>
  );
}
