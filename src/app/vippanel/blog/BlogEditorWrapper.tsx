"use client";

import { useState } from "react";
import { BlogEditor } from "./BlogEditor";
import { useRouter } from "next/navigation";

type BlogData = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  coverImage: string;
  keywords: string[];
  content: string;
};

export function BlogEditorWrapper({ initialData }: { initialData: BlogData }) {
  const router = useRouter();
  const [deleted, setDeleted] = useState(false);

  async function handleDelete() {
    if (!confirm(`"${initialData.title}" yazısını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) return;
    const res = await fetch(`/api/vippanel/blog/${initialData.slug}`, { method: "DELETE" });
    if (res.ok) {
      setDeleted(true);
      router.push("/vippanel/blog");
      router.refresh();
    }
  }

  if (deleted) return null;

  return (
    <div>
      <BlogEditor mode="edit" initialData={initialData} />
      <div className="px-6 pb-8 md:px-8">
        <div className="max-w-3xl border-t border-red-100 pt-6">
          <p className="text-xs font-bold text-zinc-500 mb-3">Tehlikeli Bölge</p>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-bold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            Bu Yazıyı Sil
          </button>
        </div>
      </div>
    </div>
  );
}
