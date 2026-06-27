"use client";

import { useState } from "react";
import Link from "next/link";
import type { Video } from "@/lib/video-utils";
import { youtubeThumbnail, CATEGORY_LABELS, CATEGORY_COLORS, PLACEHOLDER_GRADIENTS } from "@/lib/video-utils";

type Category = "tumu" | "tamir" | "musteri" | "inceleme" | "diger";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "tumu", label: "Tümü" },
  { value: "tamir", label: "Tamir" },
  { value: "musteri", label: "Müşteri" },
  { value: "inceleme", label: "İnceleme" },
  { value: "diger", label: "Diğer" },
];

function YouTubeBadge() {
  return (
    <span className="flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-black text-white shadow">
      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
      </svg>
      YouTube
    </span>
  );
}

function InstagramBadge() {
  return (
    <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-2 py-0.5 text-[11px] font-black text-white shadow">
      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current">
        <path d="M12 2.2c3.2 0 3.6.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.63.07 4.85 0 3.2-.01 3.6-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.63.07-4.85.07-3.2 0-3.6-.01-4.85-.07C3.69 21.57 2.15 20.03 2 16.8 1.94 15.55 1.93 15.17 1.93 12c0-3.2.01-3.6.07-4.85.15-3.27 1.67-4.77 4.92-4.92C8.4 2.21 8.8 2.2 12 2.2zm0 3.08a4.92 4.92 0 1 1 0 9.84 4.92 4.92 0 0 1 0-9.84z" />
      </svg>
      Instagram
    </span>
  );
}

function VideoCard({ video }: { video: Video }) {
  const [imgOk, setImgOk] = useState(true);
  const gradient = PLACEHOLDER_GRADIENTS[video.category] ?? PLACEHOLDER_GRADIENTS.diger;

  return (
    <Link
      href={`/cep-tamir-videolar/${video.id}`}
      className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-zinc-900 shrink-0">
        {video.platform === "youtube" && imgOk ? (
          <img
            src={youtubeThumbnail(video.videoId)}
            alt={video.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <svg viewBox="0 0 24 24" className="h-14 w-14 text-white/20" fill="currentColor">
              <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition group-hover:opacity-100">
          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Platform badge */}
        <div className="absolute left-2.5 top-2.5">
          {video.platform === "youtube" ? <YouTubeBadge /> : <InstagramBadge />}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4">
        <span className={`inline-block self-start rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wide mb-2 ${CATEGORY_COLORS[video.category] ?? CATEGORY_COLORS.diger}`}>
          {CATEGORY_LABELS[video.category] ?? "Diğer"}
        </span>
        <h3 className="text-[14px] font-bold text-zinc-800 leading-snug line-clamp-2 mb-2">{video.title}</h3>
        {video.description && (
          <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-2 flex-1">{video.description}</p>
        )}
        <p className="mt-3 text-[12px] font-bold text-[#1A3A6B] group-hover:underline">
          {video.platform === "youtube" ? "▶ Videoyu İzle" : "▶ Instagram'da İzle"}
        </p>
      </div>
    </Link>
  );
}

export function VideoGallery({ videos }: { videos: Video[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("tumu");

  const filtered = activeCategory === "tumu"
    ? videos
    : videos.filter((v) => v.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const count = cat.value === "tumu"
            ? videos.length
            : videos.filter((v) => v.category === cat.value).length;
          if (count === 0 && cat.value !== "tumu") return null;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-black transition-all ${
                activeCategory === cat.value
                  ? "text-white shadow-md"
                  : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400"
              }`}
              style={activeCategory === cat.value ? { background: "#1A3A6B" } : undefined}
            >
              {cat.label} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-zinc-400 font-bold text-center py-16">Bu kategoride henüz video yok.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </>
  );
}
