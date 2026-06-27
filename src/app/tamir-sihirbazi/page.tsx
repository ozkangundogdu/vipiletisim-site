import type { Metadata } from 'next';
import { WizardClient } from '@/components/wizard-client';
import { getCustomDevices, getDraftCustomSlugs } from '@/lib/custom-services';

export const metadata: Metadata = {
  title: { absolute: 'Tamir Sihirbazı — Marka & Arıza Seçin | Vip İletişim Trabzon' },
  description:
    "iPhone, Samsung veya Xiaomi modelinizi seçin, arızanızı belirtin. Trabzon'da profesyonel cep telefonu tamiri — aynı gün teslim, orijinal parça.",
  keywords: [
    "trabzon tamir sihirbazı",
    "trabzon iphone tamir seç",
    "trabzon samsung tamir seç",
    "trabzon xiaomi tamir seç",
    "telefon arıza seçici trabzon",
  ],
  alternates: { canonical: "https://vipiletisim.com.tr/tamir-sihirbazi" },
  openGraph: {
    title: "Tamir Sihirbazı | Vip İletişim Trabzon",
    description: "Markanızı ve arızanızı seçin, size özel tamir sayfasına yönlendirelim.",
    url: "https://vipiletisim.com.tr/tamir-sihirbazi",
    images: [{ url: "/images/hero/phone-repair-hero.webp", width: 1200, height: 630, alt: "Trabzon Telefon Tamir Sihirbazı" }],
  },
};

export default function TamirSihirbaziPage() {
  const customDevices = getCustomDevices();
  const draftCustomSlugs = getDraftCustomSlugs();
  return (
    <main className="mx-auto max-w-[900px] px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
        <ol className="flex items-center gap-1">
          <li><a href="/" className="hover:underline">Anasayfa</a></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-zinc-800">Tamir Sihirbazı</li>
        </ol>
      </nav>

      <h1 className="mb-2 text-2xl font-black text-zinc-900 lg:text-3xl">
        Tamir Sihirbazı
      </h1>
      <p className="mb-8 text-zinc-500">
        Markanızı, modelinizi ve arıza türünüzü seçin — size özel tamir sayfasına yönlendirelim.
      </p>

      <WizardClient customDevices={customDevices} draftCustomSlugs={draftCustomSlugs} />
    </main>
  );
}
