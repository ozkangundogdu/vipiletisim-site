export type Service = {
  slug: string;
  title: string;
  model: string;
  repairType: string;
  metaDescription: string;
};

export const services: Service[] = [
  // iPhone 16 Serisi
  { slug: "iphone-16-ekran-degisimi", title: "iPhone 16 Ekran Değişimi", model: "iPhone 16", repairType: "Ekran Değişimi", metaDescription: "Trabzon'da iPhone 16 ekran değişimi. Orijinal OLED panel, aynı gün teslim. Vip İletişim." },
  { slug: "iphone-16-batarya-degisimi", title: "iPhone 16 Batarya Değişimi", model: "iPhone 16", repairType: "Batarya Değişimi", metaDescription: "iPhone 16 batarya değişimi Trabzon. Pil sağlığı düştüyse orijinal batarya yenileme, uzman servis." },
  { slug: "iphone-16-pro-ekran-degisimi", title: "iPhone 16 Pro Ekran Değişimi", model: "iPhone 16 Pro", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone 16 Pro ekran değişimi. ProMotion OLED ekran montajı, uzman kadro, aynı gün teslim." },
  { slug: "iphone-16-pro-max-ekran-degisimi", title: "iPhone 16 Pro Max Ekran Değişimi", model: "iPhone 16 Pro Max", repairType: "Ekran Değişimi", metaDescription: "iPhone 16 Pro Max ekran değişimi Trabzon. Kırık ya da çalışmayan ekran için profesyonel tamir." },

  // iPhone 15 Serisi
  { slug: "iphone-15-ekran-degisimi", title: "iPhone 15 Ekran Değişimi", model: "iPhone 15", repairType: "Ekran Değişimi", metaDescription: "Trabzon'da iPhone 15 ekran değişimi. Orijinal parça, aynı gün teslim, uzman kadro." },
  { slug: "iphone-15-pro-batarya-degisimi", title: "iPhone 15 Pro Batarya Değişimi", model: "iPhone 15 Pro", repairType: "Batarya Değişimi", metaDescription: "Trabzon iPhone 15 Pro batarya değişimi. Şişen veya hızlı biten pil için orijinal batarya yenileme." },
  { slug: "iphone-15-sarj-soketi-tamiri", title: "iPhone 15 Şarj Soketi Tamiri", model: "iPhone 15", repairType: "Şarj Soketi Tamiri", metaDescription: "iPhone 15 şarj almıyor mu? Trabzon'da aynı gün USB-C şarj soketi tamiri. Uzman teknisyen." },

  // iPhone 14 Serisi
  { slug: "iphone-14-ekran-degisimi", title: "iPhone 14 Ekran Değişimi", model: "iPhone 14", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone 14 ekran değişimi. Kırık cam veya çalışmayan dokunmatik için profesyonel tamir." },
  { slug: "iphone-14-pro-ekran-degisimi", title: "iPhone 14 Pro Ekran Değişimi", model: "iPhone 14 Pro", repairType: "Ekran Değişimi", metaDescription: "iPhone 14 Pro ekran değişimi Trabzon. Orijinal Super Retina XDR ekran montajı, uzman servis." },
  { slug: "iphone-14-sarj-soketi-tamiri", title: "iPhone 14 Şarj Soketi Tamiri", model: "iPhone 14", repairType: "Şarj Soketi Tamiri", metaDescription: "iPhone 14 şarj almıyor mu? Trabzon'da aynı gün şarj soketi tamiri. Orijinal parça, uygun fiyat." },
  { slug: "iphone-14-batarya-degisimi", title: "iPhone 14 Batarya Değişimi", model: "iPhone 14", repairType: "Batarya Değişimi", metaDescription: "iPhone 14 batarya değişimi Trabzon. Pil sağlığı düşen cihazlar için hızlı orijinal yenileme." },

  // iPhone 13 Serisi
  { slug: "iphone-13-ekran-degisimi", title: "iPhone 13 Ekran Değişimi", model: "iPhone 13", repairType: "Ekran Değişimi", metaDescription: "Trabzon'da iPhone 13 ekran değişimi. Kırık ekran için uzman tamir, orijinal parça." },
  { slug: "iphone-13-pro-ekran-degisimi", title: "iPhone 13 Pro Ekran Değişimi", model: "iPhone 13 Pro", repairType: "Ekran Değişimi", metaDescription: "iPhone 13 Pro ekran değişimi Trabzon. ProMotion OLED panel, aynı gün teslim, uzman kadro." },
  { slug: "iphone-13-batarya-degisimi", title: "iPhone 13 Batarya Değişimi", model: "iPhone 13", repairType: "Batarya Değişimi", metaDescription: "iPhone 13 batarya değişimi Trabzon. Hızlı biten pil için orijinal batarya yenileme hizmeti." },

  // iPhone 12 Serisi
  { slug: "iphone-12-ekran-degisimi", title: "iPhone 12 Ekran Değişimi", model: "iPhone 12", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone 12 ekran değişimi. OLED ekran montajı, uygun fiyat, uzman servis." },
  { slug: "iphone-12-batarya-degisimi", title: "iPhone 12 Batarya Değişimi", model: "iPhone 12", repairType: "Batarya Değişimi", metaDescription: "iPhone 12 batarya değişimi Trabzon. Şişen veya hızlı tükenen pil için profesyonel yenileme." },
  { slug: "iphone-12-pro-max-ekran-degisimi", title: "iPhone 12 Pro Max Ekran Değişimi", model: "iPhone 12 Pro Max", repairType: "Ekran Değişimi", metaDescription: "Trabzon'da iPhone 12 Pro Max ekran değişimi. Büyük ekran tamiri, orijinal parça, uzman kadro." },

  // iPhone 11 Serisi
  { slug: "iphone-11-ekran-degisimi", title: "iPhone 11 Ekran Değişimi", model: "iPhone 11", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone 11 ekran değişimi. Kırık LCD ekran için uygun fiyatlı profesyonel tamir." },
  { slug: "iphone-11-batarya-degisimi", title: "iPhone 11 Batarya Değişimi", model: "iPhone 11", repairType: "Batarya Değişimi", metaDescription: "iPhone 11 batarya değişimi Trabzon. Gün içinde tükenen pil için hızlı orijinal yenileme." },
  { slug: "iphone-11-pro-ekran-degisimi", title: "iPhone 11 Pro Ekran Değişimi", model: "iPhone 11 Pro", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone 11 Pro ekran değişimi. OLED Super Retina XDR ekran tamiri, uzman servis." },

  // iPhone X / XS / XR
  { slug: "iphone-x-ekran-degisimi", title: "iPhone X Ekran Değişimi", model: "iPhone X", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone X ekran değişimi. OLED ekran montajı, aynı gün teslim, uzman kadro." },
  { slug: "iphone-x-batarya-degisimi", title: "iPhone X Batarya Değişimi", model: "iPhone X", repairType: "Batarya Değişimi", metaDescription: "iPhone X batarya değişimi Trabzon. 45 dakikada pil yenileme, orijinal parça." },
  { slug: "iphone-xs-ekran-degisimi", title: "iPhone XS Ekran Değişimi", model: "iPhone XS", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone XS ekran değişimi. Uzman kadro ile kırık ekran tamiri, orijinal parça." },
  { slug: "iphone-xr-ekran-degisimi", title: "iPhone XR Ekran Değişimi", model: "iPhone XR", repairType: "Ekran Değişimi", metaDescription: "iPhone XR ekran değişimi Trabzon. LCD ekran montajı, uygun fiyat, profesyonel servis." },
  { slug: "iphone-xr-batarya-degisimi", title: "iPhone XR Batarya Değişimi", model: "iPhone XR", repairType: "Batarya Değişimi", metaDescription: "Trabzon iPhone XR batarya değişimi. Pil sağlığı düşen cihazlar için hızlı yenileme hizmeti." },

  // iPhone SE / Eski Seriler
  { slug: "iphone-se-2020-ekran-degisimi", title: "iPhone SE 2020 Ekran Değişimi", model: "iPhone SE 2020", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone SE 2020 ekran değişimi. Küçük ekranlı modelde uzman tamir, orijinal parça." },
  { slug: "iphone-8-ekran-degisimi", title: "iPhone 8 Ekran Değişimi", model: "iPhone 8", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone 8 ekran değişimi. Uygun fiyatlı kırık ekran tamiri, orijinal parça." },
  { slug: "iphone-8-batarya-degisimi", title: "iPhone 8 Batarya Değişimi", model: "iPhone 8", repairType: "Batarya Değişimi", metaDescription: "iPhone 8 batarya değişimi Trabzon. Hızlı biten pil için 45 dakikada profesyonel yenileme." },
  { slug: "iphone-7-ekran-degisimi", title: "iPhone 7 Ekran Değişimi", model: "iPhone 7", repairType: "Ekran Değişimi", metaDescription: "Trabzon iPhone 7 ekran değişimi. Uzman kadro ile kırık ekran tamiri, aynı gün teslim." },

  // Genel iPhone Tamirleri
  { slug: "iphone-kamera-cami-degisimi", title: "iPhone Kamera Camı Değişimi", model: "iPhone", repairType: "Kamera Camı Değişimi", metaDescription: "iPhone kamera camı değişimi Trabzon. Tüm modellerde kırık kamera camı tamiri, uzman servis." },
  { slug: "iphone-batarya-degisimi", title: "iPhone Batarya Değişimi", model: "iPhone", repairType: "Batarya Değişimi", metaDescription: "Trabzon iPhone batarya değişimi. Tüm modellerde orijinal pil yenileme, hızlı teslim." },
  { slug: "iphone-sarj-soketi-tamiri", title: "iPhone Şarj Soketi Tamiri", model: "iPhone", repairType: "Şarj Soketi Tamiri", metaDescription: "iPhone şarj almıyor mu? Trabzon'da tüm modellerde şarj soketi tamiri. Aynı gün teslim." },
  { slug: "iphone-arka-kamera-degisimi", title: "iPhone Arka Kamera Değişimi", model: "iPhone", repairType: "Arka Kamera Değişimi", metaDescription: "iPhone arka kamera değişimi Trabzon. Bulanık veya çalışmayan kamera için profesyonel tamir." },
  { slug: "iphone-hoparlor-tamiri", title: "iPhone Hoparlör Tamiri", model: "iPhone", repairType: "Hoparlör Tamiri", metaDescription: "iPhone hoparlör sesi kesildi mi? Trabzon'da tüm modellerde hoparlör tamiri. Uzman kadro." },
  { slug: "iphone-acma-kapama-tusu-degisimi", title: "iPhone Açma Kapama Tuşu Değişimi", model: "iPhone", repairType: "Açma Kapama Tuşu Değişimi", metaDescription: "iPhone açma kapama tuşu çalışmıyor mu? Trabzon'da aynı gün tamir ve değişim hizmeti." },

  // Samsung Serisi
  { slug: "samsung-galaxy-s24-ekran-degisimi", title: "Samsung Galaxy S24 Ekran Değişimi", model: "Samsung Galaxy S24", repairType: "Ekran Değişimi", metaDescription: "Trabzon Samsung Galaxy S24 ekran değişimi. Orijinal Dynamic AMOLED ekran montajı, uzman servis." },
  { slug: "samsung-galaxy-s24-ultra-ekran-degisimi", title: "Samsung Galaxy S24 Ultra Ekran Değişimi", model: "Samsung Galaxy S24 Ultra", repairType: "Ekran Değişimi", metaDescription: "Samsung S24 Ultra ekran değişimi Trabzon. Titanium çerçeveli modelde uzman ekran tamiri." },
  { slug: "samsung-galaxy-s23-ekran-degisimi", title: "Samsung Galaxy S23 Ekran Değişimi", model: "Samsung Galaxy S23", repairType: "Ekran Değişimi", metaDescription: "Trabzon Samsung Galaxy S23 ekran değişimi. AMOLED ekran tamiri, aynı gün teslim, orijinal parça." },
  { slug: "samsung-galaxy-s22-batarya-degisimi", title: "Samsung Galaxy S22 Batarya Değişimi", model: "Samsung Galaxy S22", repairType: "Batarya Değişimi", metaDescription: "Samsung Galaxy S22 batarya değişimi Trabzon. Hızlı biten pil için profesyonel orijinal yenileme." },
  { slug: "samsung-a54-ekran-degisimi", title: "Samsung A54 Ekran Değişimi", model: "Samsung A54", repairType: "Ekran Değişimi", metaDescription: "Trabzon Samsung A54 ekran değişimi. Uygun fiyatlı kırık ekran tamiri, orijinal parça." },
  { slug: "samsung-a54-batarya-degisimi", title: "Samsung A54 Batarya Değişimi", model: "Samsung A54", repairType: "Batarya Değişimi", metaDescription: "Samsung A54 batarya değişimi Trabzon. Şişen veya hızlı tükenen pil için uzman yenileme." },
  { slug: "samsung-a34-ekran-degisimi", title: "Samsung A34 Ekran Değişimi", model: "Samsung A34", repairType: "Ekran Değişimi", metaDescription: "Trabzon Samsung A34 ekran değişimi. Kırık Super AMOLED ekran için profesyonel tamir hizmeti." },
  { slug: "samsung-sarj-soketi-tamiri", title: "Samsung Şarj Soketi Tamiri", model: "Samsung", repairType: "Şarj Soketi Tamiri", metaDescription: "Samsung şarj almıyor mu? Trabzon'da tüm Samsung modellerinde şarj soketi tamiri, aynı gün." },
  { slug: "samsung-batarya-degisimi", title: "Samsung Batarya Değişimi", model: "Samsung", repairType: "Batarya Değişimi", metaDescription: "Trabzon Samsung batarya değişimi. Tüm Galaxy modellerinde orijinal pil yenileme, uzman kadro." },

  // Xiaomi / Mi / Redmi
  { slug: "xiaomi-ekran-degisimi", title: "Xiaomi Ekran Değişimi", model: "Xiaomi", repairType: "Ekran Değişimi", metaDescription: "Trabzon Xiaomi ekran değişimi. Tüm Xiaomi ve Redmi modellerinde kırık ekran tamiri, orijinal parça." },
  { slug: "xiaomi-batarya-degisimi", title: "Xiaomi Batarya Değişimi", model: "Xiaomi", repairType: "Batarya Değişimi", metaDescription: "Xiaomi batarya değişimi Trabzon. Redmi, POCO ve Mi serileri için orijinal pil yenileme." },
  { slug: "redmi-note-13-ekran-degisimi", title: "Redmi Note 13 Ekran Değişimi", model: "Redmi Note 13", repairType: "Ekran Değişimi", metaDescription: "Trabzon Redmi Note 13 ekran değişimi. AMOLED ekran tamiri, uygun fiyat, aynı gün teslim." },
  { slug: "xiaomi-sarj-soketi-tamiri", title: "Xiaomi Şarj Soketi Tamiri", model: "Xiaomi", repairType: "Şarj Soketi Tamiri", metaDescription: "Xiaomi şarj almıyor mu? Trabzon'da tüm modellerde şarj soketi tamiri. Hızlı ve uzman kadro." },

  // Huawei
  { slug: "huawei-ekran-degisimi", title: "Huawei Ekran Değişimi", model: "Huawei", repairType: "Ekran Değişimi", metaDescription: "Trabzon Huawei ekran değişimi. P, Mate ve Nova serileri için profesyonel ekran tamiri." },
  { slug: "huawei-batarya-degisimi", title: "Huawei Batarya Değişimi", model: "Huawei", repairType: "Batarya Değişimi", metaDescription: "Huawei batarya değişimi Trabzon. Tüm Huawei modellerinde orijinal pil yenileme, uzman servis." },
  { slug: "huawei-p30-pro-ekran-degisimi", title: "Huawei P30 Pro Ekran Değişimi", model: "Huawei P30 Pro", repairType: "Ekran Değişimi", metaDescription: "Trabzon Huawei P30 Pro ekran değişimi. OLED ekran montajı, uzman kadro, orijinal parça." },

  // Oppo
  { slug: "oppo-ekran-degisimi", title: "Oppo Ekran Değişimi", model: "Oppo", repairType: "Ekran Değişimi", metaDescription: "Trabzon Oppo ekran değişimi. Tüm Oppo modellerinde kırık cam veya dokunmatik tamiri." },
  { slug: "oppo-batarya-degisimi", title: "Oppo Batarya Değişimi", model: "Oppo", repairType: "Batarya Değişimi", metaDescription: "Oppo batarya değişimi Trabzon. Hızlı biten pil için orijinal yenileme, uzman kadro." },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
