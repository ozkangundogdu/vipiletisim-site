import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getVideos } from "@/lib/videos";
import { youtubeEmbedUrl, instagramUrl, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/video-utils";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = getVideos().find((v) => v.id === id);
  if (!video) return {};
  return {
    title: video.title,
    description: video.description ?? `Trabzon Vip İletişim — ${video.title}`,
    alternates: { canonical: `https://vipiletisim.com.tr/cep-tamir-videolar/${id}` },
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params;
  const videos = getVideos();
  const video = videos.find((v) => v.id === id);
  if (!video) notFound();

  const others = videos.filter((v) => v.id !== id).slice(0, 3);
  const categoryLabel = CATEGORY_LABELS[video.category] ?? "Diğer";
  const categoryColor = CATEGORY_COLORS[video.category] ?? CATEGORY_COLORS.diger;

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-[1330px] px-6 py-10 lg:py-14">
        {/* Geri butonu */}
        <Link
          href="/cep-tamir-videolar"
          className="inline-flex items-center gap-2 text-sm font-black text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Tüm Videolar
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          {/* Sol: video + bilgi */}
          <div>
            {/* Video */}
            {video.platform === "youtube" ? (
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg">
                <iframe
                  src={youtubeEmbedUrl(video.videoId)}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={video.title}
                />
              </div>
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 to-pink-700 flex flex-col items-center justify-center gap-4 shadow-lg">
                <svg viewBox="0 0 24 24" className="h-16 w-16 text-white/40" fill="currentColor">
                  <path d="M12 2.2c3.2 0 3.6.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.63.07 4.85 0 3.2-.01 3.6-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.63.07-4.85.07-3.2 0-3.6-.01-4.85-.07C3.69 21.57 2.15 20.03 2 16.8 1.94 15.55 1.93 15.17 1.93 12c0-3.2.01-3.6.07-4.85.15-3.27 1.67-4.77 4.92-4.92C8.4 2.21 8.8 2.2 12 2.2zm0 3.08a4.92 4.92 0 1 1 0 9.84 4.92 4.92 0 0 1 0-9.84z" />
                </svg>
                <a
                  href={instagramUrl(video.videoId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-6 py-3 text-sm font-black text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M12 2.2c3.2 0 3.6.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.63.07 4.85 0 3.2-.01 3.6-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.63.07-4.85.07-3.2 0-3.6-.01-4.85-.07C3.69 21.57 2.15 20.03 2 16.8 1.94 15.55 1.93 15.17 1.93 12c0-3.2.01-3.6.07-4.85.15-3.27 1.67-4.77 4.92-4.92C8.4 2.21 8.8 2.2 12 2.2zm0 3.08a4.92 4.92 0 1 1 0 9.84 4.92 4.92 0 0 1 0-9.84z" />
                  </svg>
                  Instagram'da İzle
                </a>
              </div>
            )}

            {/* Başlık ve açıklama */}
            <div className="mt-6">
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-black uppercase tracking-wide ${categoryColor}`}>
                  {categoryLabel}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-black ${video.platform === "youtube" ? "bg-red-100 text-red-700" : "bg-purple-100 text-purple-700"}`}>
                  {video.platform === "youtube" ? "YouTube" : "Instagram Reels"}
                </span>
              </div>

              <h1 className="text-2xl font-black text-zinc-900 lg:text-3xl leading-tight">{video.title}</h1>

              {video.description && (
                <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">{video.description}</p>
              )}

              {/* Hizmet CTA */}
              <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div>
                  <p className="font-black text-zinc-900">Telefonunuz için randevu alın</p>
                  <p className="text-sm text-zinc-500 mt-0.5">Trabzon'da aynı gün tamir — orijinal parça garantisi</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Link
                    href="/tamir-hizmetleri#wizard"
                    className="px-4 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
                    style={{ background: "#ff351b" }}
                  >
                    Fiyat Al
                  </Link>
                  <Link
                    href="/iletisim"
                    className="px-4 py-2.5 rounded-xl text-sm font-black border border-zinc-300 text-zinc-700 hover:border-zinc-500 transition-colors"
                  >
                    İletişim
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ: diğer videolar */}
          {others.length > 0 && (
            <aside>
              <h2 className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-4">Diğer Videolar</h2>
              <div className="space-y-3">
                {others.map((v) => {
                  const thumb = v.platform === "youtube"
                    ? `https://img.youtube.com/vi/${v.videoId}/default.jpg`
                    : null;
                  return (
                    <Link
                      key={v.id}
                      href={`/cep-tamir-videolar/${v.id}`}
                      className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-3 hover:border-zinc-400 hover:shadow-sm transition group"
                    >
                      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                        {thumb ? (
                          <img src={thumb} alt={v.title} className="h-full w-full object-cover group-hover:scale-105 transition" />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-purple-800 to-pink-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className={`text-[10px] font-black uppercase ${CATEGORY_COLORS[v.category]?.split(" ")[1] ?? "text-zinc-500"}`}>
                          {CATEGORY_LABELS[v.category]}
                        </span>
                        <p className="text-[13px] font-bold text-zinc-800 line-clamp-2 mt-0.5 leading-snug">{v.title}</p>
                      </div>
                    </Link>
                  );
                })}
                <Link
                  href="/cep-tamir-videolar"
                  className="block text-center text-sm font-black text-[#1A3A6B] hover:underline py-2"
                >
                  Tüm Videoları Gör →
                </Link>
              </div>
            </aside>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
