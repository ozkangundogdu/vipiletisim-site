import Image from "next/image";
import Link from "next/link";
import { getHero } from "@/lib/hero";
import type { HeroOzellik } from "@/lib/hero";
import { getSettings } from "@/lib/settings";

const ICONS: Record<string, React.ReactNode> = {
  check: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  speed: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5v-5l-2.28 2.28C7.81 18 6 15.21 6 12c0-4.08 3.05-7.44 7-7.93V2.05z" />
    </svg>
  ),
  search: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  ),
  wrench: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
    </svg>
  ),
  star: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
};

function FeatureItem({ feature }: { feature: HeroOzellik }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 shrink-0 text-accent">
        {ICONS[feature.ikon] ?? ICONS.check}
      </div>
      <div>
        <div className="text-[15px] font-black leading-snug text-white">{feature.baslik}</div>
        <p className="mt-1 text-[13px] leading-relaxed text-white/70">{feature.aciklama}</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  const hero = getHero();
  const settings = getSettings();

  return (
    <section
      id="anasayfa"
      className="relative isolate overflow-hidden"
      aria-label="Ana karşılama bölümü"
    >
      {/* Arka plan görseli */}
      <Image
        src={hero.arkaplan}
        alt="Trabzon profesyonel telefon tamiri - Vip İletişim Teknik Servis"
        fill
        priority
        className="absolute inset-0 -z-20 object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-surface-hero/75" aria-hidden="true" />

      <div className="mx-auto max-w-[1330px] px-6 py-16 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">

          {/* SOL — Ana İçerik */}
          <div className="flex-1">
            <h1 className="text-4xl font-black leading-tight text-white lg:text-5xl xl:text-[56px]">
              {hero.baslikOnce}{" "}
              <span className="text-accent">{hero.baslikVurgu}</span>{" "}
              {hero.baslikSonra}
            </h1>

            <p className="mt-5 text-lg text-white/80 lg:text-xl">
              {hero.aciklama}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tamir-sihirbazi"
                className="inline-flex items-center gap-2 rounded-[4px] bg-[linear-gradient(180deg,#ffe56b_0%,#F3C409_48%,#b78f00_100%)] px-6 py-3.5 text-[15px] font-black text-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(90,70,0,0.22),0_10px_22px_rgba(0,0,0,0.32)] transition hover:bg-[linear-gradient(180deg,#fff0a3_0%,#f7c900_42%,#8f6d00_100%)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                </svg>
                Tamire Başla
              </Link>

              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Vipiletisim.com.tr hoşgeldiniz - Cep Telefonu Tamiri hakkında bilgi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[4px] bg-[linear-gradient(180deg,#55ee91_0%,#25D366_48%,#138f43_100%)] px-6 py-3.5 text-[15px] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,70,30,0.3),0_10px_22px_rgba(0,0,0,0.32)] transition hover:bg-[linear-gradient(180deg,#6af2a0_0%,#25D366_45%,#107f3a_100%)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* SAĞ — Özellik Paneli */}
          {hero.ozellikler.length > 0 && (
            <div className="w-full lg:w-[380px] xl:w-[420px]">
              <div
                className="rounded-xl border p-6 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)" }}
              >
                <div className="flex flex-col gap-6">
                  {hero.ozellikler.map((f, i) => (
                    <FeatureItem key={i} feature={f} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
