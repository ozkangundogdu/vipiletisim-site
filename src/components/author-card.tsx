import Image from "next/image";
import Link from "next/link";

export type AuthorInfo = {
  name: string;
  title: string;
  experience: string;
  bio: string;
  image: string;
};

export function AuthorCard({ author }: { author: AuthorInfo }) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="mb-4 text-[11px] font-black uppercase tracking-widest text-zinc-400">
        Bu İçeriği Hazırlayan
      </p>
      <div className="flex items-center gap-4">
        {author.image ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-zinc-100">
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover"
              style={{ objectPosition: "center top" }}
              sizes="64px"
            />
          </div>
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand/10 text-2xl font-black text-brand">
            {author.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-black text-zinc-900">{author.name}</p>
          <p className="text-[13px] text-zinc-500">{author.title}</p>
          <p className="text-[12px] text-brand font-bold">{author.experience}</p>
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-zinc-600 line-clamp-3">
        {author.bio}
      </p>
      <Link
        href="/kurumsal/ekibimiz"
        className="mt-3 inline-block text-[13px] font-bold text-brand hover:underline"
      >
        Uzman Ekibimizi Tanı →
      </Link>
    </section>
  );
}
