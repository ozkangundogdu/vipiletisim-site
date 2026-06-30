import Link from "next/link";
import type { Service } from "@/lib/internal-linking/types";

export function RelatedServices({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
      <h3 className="mb-4 text-[16px] font-black text-zinc-900">İlgili Hizmetler</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.url}
            href={service.url}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-[14px] font-bold text-zinc-700 transition hover:border-brand hover:text-brand"
          >
            {service.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
