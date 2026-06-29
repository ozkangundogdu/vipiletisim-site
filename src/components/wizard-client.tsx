'use client';

import { useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { type Brand, getModelsForBrand, getRepairTypesForModel, repairTypeList, getBrandsForRepair } from '@/data/services';
import type { CustomDevice } from '@/lib/custom-services';

const repairIcons: Record<string, string> = {
  'ekran-degisimi':
    'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z',
  'batarya-degisimi':
    'M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zm.33 16H8V6h8v14z',
  'sarj-soketi-tamiri':
    'M7 2v11h3v9l7-12h-4l4-8z',
  'ses-arizalari':
    'M12 3C7.03 3 3 7.03 3 12v7c0 1.1.9 2 2 2h1v-8H4v-1c0-4.42 3.58-8 8-8s8 3.58 8 8v1h-2v8h1c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z',
  'mikrofon-tamiri':
    'M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z',
  'hoparlor-tamiri':
    'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z',
  'on-kamera-tamiri':
    'M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 12.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 8.5 12 8.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z',
  'arka-kamera-tamiri':
    'M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm7-5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12zM3 4h2V2C3.9 2 3 2.9 3 4zm16 0h2c0-1.1-.9-2-2-2v2z',
  'face-id-tamiri':
    'M9 3H5c-1.1 0-2 .9-2 2v4h2V5h4V3zm7 0v2h4v4h2V5c0-1.1-.9-2-2-2h-4zm4 14h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM5 17H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm7-9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 4h4c0 1.1-.9 2-2 2s-2-.9-2-2z',
  'kamera-cami-tamiri':
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z',
  'kasa-degisimi':
    'M7 3h10v2H7V3zm10 4H7c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z',
  'arka-kapak-tamiri':
    'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-3 0H7v-3h7v3z',
  'anakart-tamiri':
    'M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7C5.9 5 5 5.9 5 7v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z',
  'sivi-temasi-tamiri':
    'M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z',
  'wifi-tamiri':
    'M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z',
  'servis-yok-arizasi':
    'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-3-8h-4v2h4v-2zm0 4h-4v2h4v-2z',
  'sarj-olmuyor-tamiri':
    'M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z',
  'sarj-entegresi-tamiri':
    'M11 4H4v7H2v2h2v7h7v-2h2v2h7v-7h2v-2h-2V4h-7v2h-2V4zm2 14H9v-1H6v-4h3v-1h2v1h3v4h-3v1zm2-10v1h-2V7h2v1zm2 0V7h1v2h-1z',
  'acma-kapama-tusu-tamiri':
    'M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z',
  'on-cam-degisimi':
    'M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5S10.67 19 11.5 19s1.5.67 1.5 1.5S12.33 22 11.5 22zm4.5-4H7V4h9v14z',
};

const brandConfig: Record<Brand, { label: string; bg: string; text: string; logo: string }> = {
  iphone:  { label: 'iPhone',  bg: '#111111', text: '#ffffff', logo: '/images/temir sihirbazı/iphone.png' },
  samsung: { label: 'Samsung', bg: '#1428A0', text: '#ffffff', logo: '/images/temir sihirbazı/samsung.png' },
  xiaomi:  { label: 'Xiaomi',  bg: '#FF6900', text: '#ffffff', logo: '/images/temir sihirbazı/xiaomi.png' },
};

function slugify(text: string): string {
  return text
    .replace(/\+/g, ' Plus')
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/İ/g, 'i')
    .replace(/ş/g, 's').replace(/ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\./g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <div
          key={n}
          className="h-3 w-3 rounded-full transition-all"
          style={{
            background: n === step ? '#F3C409' : n < step ? '#111' : '#d1d5db',
            transform: n === step ? 'scale(1.3)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mb-6 flex items-center gap-1 text-sm font-semibold text-zinc-500 hover:text-zinc-800 transition"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
      Geri
    </button>
  );
}

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: color }}>
      {label}
    </span>
  );
}

function WizardInner({
  customDevices,
  draftCustomSlugs,
}: {
  customDevices: CustomDevice[];
  draftCustomSlugs: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const arizoParam = searchParams.get('ariza');
  const markaParam = searchParams.get('marka') as Brand | null;

  const arizoLabel = arizoParam
    ? (repairTypeList.find((r) => r.key === arizoParam)?.label ?? arizoParam)
    : null;

  const draftSet = useMemo(() => new Set(draftCustomSlugs), [draftCustomSlugs]);

  const validMarka = markaParam && brandConfig[markaParam] ? markaParam : null;
  const allowedBrands = arizoParam ? getBrandsForRepair(arizoParam) : null;
  const [step, setStep] = useState<1 | 2 | 3>(validMarka ? 2 : 1);
  const [brand, setBrand] = useState<Brand | null>(validMarka);
  const [model, setModel] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Custom models for selected brand (only live ones for the selected repair)
  const customModelsForBrand = useMemo(() => {
    if (!brand) return [] as CustomDevice[];
    return customDevices.filter((d) => {
      if (d.brandKey !== brand) return false;
      if (!arizoParam) return true;
      // Only include if this repair key is supported and not a draft
      const slug = `${slugify(d.model)}-${arizoParam}`;
      return d.repairKeys.includes(arizoParam) && !draftSet.has(slug);
    });
  }, [brand, customDevices, arizoParam, draftSet]);

  const allModels = useMemo(() => {
    if (!brand) return [];
    const hardcoded = getModelsForBrand(brand);
    const customNames = customModelsForBrand.map((d) => d.model);
    // Custom modeller önce (zaten yeni), hardcoded yeniden eskiye
    return [...customNames.filter((n) => !hardcoded.includes(n)), ...[...hardcoded].reverse()];
  }, [brand, customModelsForBrand]);

  const filteredModels = allModels.filter((m) =>
    m.toLowerCase().includes(search.toLowerCase())
  );

  function selectBrand(b: Brand) {
    setBrand(b);
    setModel(null);
    setSearch('');
    setStep(2);
  }

  function selectModel(m: string) {
    // Check if this is a custom device
    const customDevice = customDevices.find((d) => d.model === m && d.brandKey === brand);

    if (customDevice) {
      const mSlug = slugify(customDevice.model);
      if (arizoParam) {
        const slug = `${mSlug}-${arizoParam}`;
        if (customDevice.repairKeys.includes(arizoParam) && !draftSet.has(slug)) {
          router.push(`/tamir-hizmetleri/${slug}`);
        }
        return;
      }
      setModel(m);
      setStep(3);
      return;
    }

    // Hardcoded device
    if (arizoParam && brand) {
      const repairTypes = getRepairTypesForModel(m, brand);
      const rt = repairTypes.find((r) => r.key === arizoParam);
      if (rt) {
        router.push(`/tamir-hizmetleri/${rt.slug}`);
        return;
      }
    }
    setModel(m);
    setStep(3);
  }

  function selectRepair(slug: string) {
    router.push(`/tamir-hizmetleri/${slug}`);
  }

  // Repair types for selected model (handles both custom and hardcoded)
  const repairTypesForModel = useMemo(() => {
    if (!model || !brand) return [];
    const customDevice = customDevices.find((d) => d.model === model && d.brandKey === brand);
    if (customDevice) {
      const mSlug = slugify(customDevice.model);
      return customDevice.repairKeys
        .filter((rk) => !draftSet.has(`${mSlug}-${rk}`))
        .map((rk) => {
          const rt = repairTypeList.find((r) => r.key === rk);
          return rt ? { key: rk, label: rt.label, duration: rt.duration, slug: `${mSlug}-${rk}` } : null;
        })
        .filter(Boolean) as { key: string; label: string; duration: string; slug: string }[];
    }
    return getRepairTypesForModel(model, brand);
  }, [model, brand, customDevices, draftSet]);

  const totalSteps = arizoParam ? 2 : 3;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:p-8">
      <StepIndicator step={step} total={totalSteps} />

      {arizoLabel && (
        <div className="mb-5 flex items-center justify-center gap-2">
          <span className="text-sm text-zinc-500">Seçilen arıza:</span>
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-black text-zinc-800">
            {arizoLabel}
          </span>
        </div>
      )}

      {/* ADIM 1 — Marka */}
      {step === 1 && (
        <div>
          <h2 className="mb-6 text-center text-lg font-black text-zinc-800">
            Telefonunuzun markasını seçin
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {(Object.entries(brandConfig) as [Brand, typeof brandConfig[Brand]][])
              .filter(([key]) => !allowedBrands || allowedBrands.includes(key))
              .map(([key, cfg]) => (
                <a
                  key={key}
                  href={arizoParam ? `/tamir-sihirbazi?ariza=${arizoParam}&marka=${key}` : `/tamir-sihirbazi?marka=${key}`}
                  onClick={(e) => { e.preventDefault(); selectBrand(key); }}
                  className="flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-400 hover:shadow-md hover:scale-[1.02]"
                >
                  <Image
                    src={cfg.logo}
                    alt={cfg.label}
                    width={120}
                    height={60}
                    className="h-14 w-auto object-contain"
                  />
                </a>
              ))}
          </div>
        </div>
      )}

      {/* ADIM 2 — Model */}
      {step === 2 && brand && (
        <div>
          <BackButton onClick={() => setStep(1)} />
          <div className="mb-4 flex items-center gap-2">
            <Chip label={brandConfig[brand].label} color={brandConfig[brand].bg} />
            <h2 className="text-lg font-black text-zinc-800">
              {arizoParam ? 'Modelinizi seçin' : 'Model seçin'}
            </h2>
          </div>
          <input
            type="search"
            placeholder="Model ara…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-500"
          />

          {/* Samsung: S ve A serisi yan yana (arama yoksa) */}
          {brand === 'samsung' && !search ? (() => {
            const sSeries = filteredModels.filter((m) => /^Galaxy S\d/.test(m));
            const aSeries = filteredModels.filter((m) => /^Galaxy A\d/.test(m));
            const others  = filteredModels.filter((m) => !/^Galaxy [SA]\d/.test(m));

            const ModelButton = ({ m }: { m: string }) => {
              const isCustom = customDevices.some((d) => d.model === m && d.brandKey === brand);
              return (
                <button
                  key={m}
                  onClick={() => selectModel(m)}
                  className="rounded-lg border border-zinc-200 px-3 py-2.5 text-left text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 flex items-center gap-2"
                >
                  <span className="flex-1">Samsung {m}</span>
                  {isCustom && (
                    <span className="shrink-0 text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">YENİ</span>
                  )}
                </button>
              );
            };

            return (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* S Serisi */}
                  <div>
                    <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-zinc-400">Galaxy S Serisi</p>
                    <div className="flex flex-col gap-1.5">
                      {sSeries.map((m) => <ModelButton key={m} m={m} />)}
                    </div>
                  </div>
                  {/* A Serisi */}
                  <div>
                    <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-zinc-400">Galaxy A Serisi</p>
                    <div className="flex flex-col gap-1.5">
                      {aSeries.map((m) => <ModelButton key={m} m={m} />)}
                    </div>
                  </div>
                </div>
                {others.length > 0 && (
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                    {others.map((m) => <ModelButton key={m} m={m} />)}
                  </div>
                )}
              </div>
            );
          })() : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {filteredModels.map((m) => {
                const isCustom = customDevices.some((d) => d.model === m && d.brandKey === brand);
                const displayName = brand === 'samsung' ? `Samsung ${m}` : m;
                return (
                  <button
                    key={m}
                    onClick={() => selectModel(m)}
                    className="rounded-lg border border-zinc-200 px-3 py-2.5 text-left text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 flex items-center gap-2"
                  >
                    <span className="flex-1">{displayName}</span>
                    {isCustom && (
                      <span className="shrink-0 text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">YENİ</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ADIM 3 — Arıza */}
      {step === 3 && brand && model && !arizoParam && (
        <div>
          <BackButton onClick={() => setStep(2)} />
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Chip label={brandConfig[brand].label} color={brandConfig[brand].bg} />
            <Chip label={model} color="#374151" />
            <h2 className="text-lg font-black text-zinc-800">Arıza seçin</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {repairTypesForModel.map((rt) => (
              <button
                key={rt.key}
                onClick={() => selectRepair(rt.slug)}
                className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 p-4 text-center transition hover:border-accent hover:bg-yellow-50"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-600">
                  <path d={repairIcons[rt.key] ?? ''} />
                </svg>
                <span className="text-xs font-bold leading-tight text-zinc-700">{rt.label}</span>
                <span className="text-[10px] text-zinc-400">{rt.duration}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function WizardClient({
  customDevices = [],
  draftCustomSlugs = [],
}: {
  customDevices?: CustomDevice[];
  draftCustomSlugs?: string[];
}) {
  return (
    <Suspense fallback={<div className="py-10 text-center text-zinc-400">Yükleniyor…</div>}>
      <WizardInner customDevices={customDevices} draftCustomSlugs={draftCustomSlugs} />
    </Suspense>
  );
}
