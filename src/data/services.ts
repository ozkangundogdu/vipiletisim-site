export type Brand = 'iphone' | 'samsung' | 'xiaomi';

export type RepairTypeInfo = {
  key: string;
  label: string;
  duration: string;
  brands?: Brand[]; // undefined = tüm markalar için geçerli
};

export type BrandInfo = {
  slug: Brand;
  label: string;
  models: string[];
};

export type Service = {
  slug: string;
  title: string;
  model: string;
  brand: Brand;
  repairType: string;
  repairKey: string;
  duration: string;
  metaDescription: string;
};

export const repairTypeList: RepairTypeInfo[] = [
  { key: 'ekran-degisimi',         label: 'Ekran Değişimi',    duration: '30–60 dk'  },
  { key: 'batarya-degisimi',       label: 'Batarya Değişimi',  duration: '20–40 dk'  },
  { key: 'sarj-soketi-tamiri',     label: 'Şarj Soketi',       duration: '30–60 dk'  },
  { key: 'ses-arizalari',           label: 'Ses Arızaları',          duration: '20–40 dk'  },
  { key: 'mikrofon-tamiri',         label: 'Mikrofon Tamiri',        duration: '30–60 dk'  },
  { key: 'hoparlor-tamiri',         label: 'Hoparlör Tamiri',        duration: '30–60 dk'  },
  { key: 'on-kamera-tamiri',        label: 'Ön Kamera',              duration: '30–60 dk'  },
  { key: 'arka-kamera-tamiri',      label: 'Arka Kamera',            duration: '30–60 dk'  },
  { key: 'face-id-tamiri',          label: 'Face ID',                duration: '20–40 dk',  brands: ['iphone'] },
  { key: 'kamera-cami-tamiri',      label: 'Kamera Camı',            duration: '20–40 dk'  },
  { key: 'kasa-degisimi',           label: 'Kasa Değişimi',          duration: '60–120 dk' },
  { key: 'arka-kapak-tamiri',       label: 'Arka Kapak',             duration: '30–60 dk'  },
  { key: 'anakart-tamiri',          label: 'Anakart Tamiri',         duration: '60–120 dk' },
  { key: 'sivi-temasi-tamiri',      label: 'Sıvı Teması',            duration: '30–60 dk'  },
  { key: 'wifi-tamiri',             label: 'WiFi Tamiri',            duration: '30–60 dk'  },
  { key: 'servis-yok-arizasi',      label: 'Servis Yok Arızası',     duration: '30–60 dk'  },
  { key: 'sarj-olmuyor-tamiri',     label: 'Şarj Olmuyor',           duration: '20–40 dk'  },
  { key: 'sarj-entegresi-tamiri',   label: 'Şarj Entegresi Tamiri',  duration: '30–60 dk'  },
  { key: 'acma-kapama-tusu-tamiri', label: 'Açma/Kapama Tuşu',       duration: '20–40 dk'  },
  { key: 'on-cam-degisimi',         label: 'Ön Cam Değişimi',        duration: '30–60 dk'  },
];

const brandModelMap: Record<Brand, string[]> = {
  iphone: [],
  samsung: [],
  xiaomi: [],
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

function buildMetaDesc(model: string, repairLabel: string): string {
  return `Trabzon'da ${model} ${repairLabel} hizmeti. Uzman teknisyen, orijinal parça, aynı gün teslim. Vip İletişim Teknik Servis.`;
}

export const services: Service[] = (Object.entries(brandModelMap) as [Brand, string[]][]).flatMap(
  ([brand, models]) =>
    models.flatMap((model) =>
      repairTypeList
        .filter((rt) => !rt.brands || rt.brands.includes(brand))
        .map((rt) => ({
          slug: `${slugify(model)}-${rt.key}`,
          title: `${model} ${rt.label}`,
          model,
          brand,
          repairType: rt.label,
          repairKey: rt.key,
          duration: rt.duration,
          metaDescription: buildMetaDesc(model, rt.label),
        }))
    )
);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getModelsForBrand(brand: Brand): string[] {
  return brandModelMap[brand] ?? [];
}

export function getBrandInfos(): BrandInfo[] {
  return (Object.entries(brandModelMap) as [Brand, string[]][]).map(([slug, models]) => ({
    slug,
    label: slug === 'iphone' ? 'iPhone' : slug === 'samsung' ? 'Samsung' : 'Xiaomi',
    models,
  }));
}

export function getRepairTypesForModel(model: string, brand: Brand) {
  const modelSlug = slugify(model);
  return repairTypeList
    .filter((rt) => !rt.brands || rt.brands.includes(brand))
    .map((rt) => ({
      key: rt.key,
      label: rt.label,
      duration: rt.duration,
      slug: `${modelSlug}-${rt.key}`,
      brand,
    }));
}

export function getBrandsForRepair(repairKey: string): Brand[] | null {
  const rt = repairTypeList.find((r) => r.key === repairKey);
  if (!rt || !rt.brands) return null; // null = tüm markalar geçerli
  return rt.brands;
}
