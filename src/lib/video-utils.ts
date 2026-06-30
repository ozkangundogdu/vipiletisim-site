export type VideoCategory = "tamir" | "musteri" | "inceleme" | "diger";
export type VideoPlatform = "youtube" | "instagram";

export type Video = {
  id: string;
  platform: VideoPlatform;
  videoId: string;
  title: string;
  description?: string;
  category: VideoCategory;
  thumbnail?: string;
  visibleFrom?: string; // ISO tarihi — set ise bu tarihten önce public sayfada görünmez
};

export function youtubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export function instagramUrl(shortcode: string): string {
  return `https://www.instagram.com/reel/${shortcode}/`;
}

export function instagramEmbedUrl(shortcode: string): string {
  return `https://www.instagram.com/reel/${shortcode}/embed/`;
}

export const CATEGORY_LABELS: Record<string, string> = {
  tamir: "Tamir",
  musteri: "Müşteri",
  inceleme: "İnceleme",
  diger: "Diğer",
};

export const CATEGORY_COLORS: Record<string, string> = {
  tamir: "bg-blue-100 text-blue-700",
  musteri: "bg-green-100 text-green-700",
  inceleme: "bg-purple-100 text-purple-700",
  diger: "bg-zinc-100 text-zinc-600",
};

export const PLACEHOLDER_GRADIENTS: Record<string, string> = {
  tamir: "from-blue-900 to-blue-700",
  musteri: "from-green-900 to-green-700",
  inceleme: "from-purple-900 to-purple-700",
  diger: "from-zinc-700 to-zinc-600",
};
