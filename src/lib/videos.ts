import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import type { Video } from "@/lib/video-utils";

export type { Video, VideoCategory, VideoPlatform } from "@/lib/video-utils";

const FILE = path.join(process.cwd(), "content/videos.json");

export function getVideos(): Video[] {
  noStore();
  if (!fs.existsSync(FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8")) as Video[];
  } catch {
    return [];
  }
}

export function saveVideos(data: Video[]): void {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
}
