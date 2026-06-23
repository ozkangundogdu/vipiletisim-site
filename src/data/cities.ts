export type City = {
  slug: string;
  name: string;
  il: string;
  title: string;
  metaDescription: string;
};

export const cities: City[] = [
  // Trabzon
  { slug: "trabzon-iphone-tamiri", name: "Trabzon", il: "Trabzon", title: "Trabzon iPhone ve Telefon Tamiri", metaDescription: "Trabzon'da iPhone, Samsung, Xiaomi, Huawei tamiri. Vip İletişim ile aynı gün teslim, orijinal parça." },
  { slug: "trabzon-akcaabat-telefon-tamiri", name: "Akçaabat", il: "Trabzon", title: "Akçaabat Telefon Tamiri", metaDescription: "Akçaabat'ta telefon tamiri arayanlar için Trabzon Vip İletişim. iPhone ve Android tamir, aynı gün hizmet." },
  { slug: "trabzon-arakli-telefon-tamiri", name: "Araklı", il: "Trabzon", title: "Araklı Telefon Tamiri", metaDescription: "Araklı ilçesinden Trabzon'a telefon tamiri için Vip İletişim. Hızlı, garantili, uygun fiyatlı." },
  { slug: "trabzon-of-telefon-tamiri", name: "Of", il: "Trabzon", title: "Of Telefon Tamiri", metaDescription: "Of ilçesinde telefon kırıldı mı? Trabzon Vip İletişim ile aynı gün tamir ve teslim hizmeti." },
  { slug: "trabzon-surmene-telefon-tamiri", name: "Sürmene", il: "Trabzon", title: "Sürmene Telefon Tamiri", metaDescription: "Sürmene'den Trabzon'a telefon tamiri. Vip İletişim uzman kadrosu ile hızlı ve garantili tamir." },
  { slug: "trabzon-yomra-telefon-tamiri", name: "Yomra", il: "Trabzon", title: "Yomra Telefon Tamiri", metaDescription: "Yomra ilçesinde telefon tamiri için Trabzon Vip İletişim. iPhone, Samsung ve tüm markalar." },
  { slug: "trabzon-vakfikebir-telefon-tamiri", name: "Vakfıkebir", il: "Trabzon", title: "Vakfıkebir Telefon Tamiri", metaDescription: "Vakfıkebir'den Trabzon'a iPhone ve telefon tamiri. Orijinal parça ile profesyonel servis." },
  { slug: "trabzon-besikduzu-telefon-tamiri", name: "Beşikdüzü", il: "Trabzon", title: "Beşikdüzü Telefon Tamiri", metaDescription: "Beşikdüzü telefon tamiri için Trabzon Vip İletişim. Aynı gün teslim, orijinal parça garantisi." },
  { slug: "trabzon-macka-telefon-tamiri", name: "Maçka", il: "Trabzon", title: "Maçka Telefon Tamiri", metaDescription: "Maçka ilçesinde telefon arızası mı? Trabzon Vip İletişim ile hızlı ve uygun fiyatlı tamir." },
  { slug: "trabzon-tonya-telefon-tamiri", name: "Tonya", il: "Trabzon", title: "Tonya Telefon Tamiri", metaDescription: "Tonya'dan Trabzon'a telefon tamiri. Vip İletişim ile garantili, profesyonel teknik servis hizmeti." },
  // Giresun
  { slug: "giresun-telefon-tamiri", name: "Giresun", il: "Giresun", title: "Giresun iPhone ve Telefon Tamiri", metaDescription: "Giresun'dan kargo ile telefon tamiri. Vip İletişim Trabzon'a kargo, orijinal parça, uzman servis." },
  { slug: "giresun-bulancak-telefon-tamiri", name: "Bulancak", il: "Giresun", title: "Bulancak Telefon Tamiri", metaDescription: "Bulancak'tan kargo ile Trabzon'a telefon tamiri. Vip İletişim ile güvenli ve hızlı tamir." },
  { slug: "giresun-gorele-telefon-tamiri", name: "Görele", il: "Giresun", title: "Görele Telefon Tamiri", metaDescription: "Görele'den Trabzon'a iPhone ve telefon tamiri. Kargo ile gönder, aynı gün tamir et, geri al." },
  { slug: "giresun-tirebolu-telefon-tamiri", name: "Tirebolu", il: "Giresun", title: "Tirebolu Telefon Tamiri", metaDescription: "Tirebolu'dan Trabzon Vip İletişim'e kargo ile telefon tamiri. Orijinal parça, hızlı teslim." },
  { slug: "giresun-espiye-telefon-tamiri", name: "Espiye", il: "Giresun", title: "Espiye Telefon Tamiri", metaDescription: "Espiye'den Trabzon'a kargo ile telefon tamiri. Uzman kadro, orijinal parça, garanti." },
  // Rize
  { slug: "rize-iphone-tamiri", name: "Rize", il: "Rize", title: "Rize iPhone ve Telefon Tamiri", metaDescription: "Rize'den kargo ile Trabzon Vip İletişim'e iPhone ve telefon tamiri. Profesyonel servis, garanti." },
  { slug: "rize-cayeli-telefon-tamiri", name: "Çayeli", il: "Rize", title: "Çayeli Telefon Tamiri", metaDescription: "Çayeli'nden Trabzon'a iPhone tamiri. Vip İletişim ile kargo ile gönder, orijinal parçayla tamir." },
  { slug: "rize-ardeşen-telefon-tamiri", name: "Ardeşen", il: "Rize", title: "Ardeşen Telefon Tamiri", metaDescription: "Ardeşen'den Trabzon'a telefon tamiri. Vip İletişim Teknik Servis ile hızlı ve garantili hizmet." },
  { slug: "rize-pazar-telefon-tamiri", name: "Pazar", il: "Rize", title: "Pazar Telefon Tamiri", metaDescription: "Pazar ilçesinden Trabzon'a kargo ile iPhone ve telefon tamiri. Orijinal parça, uzman servis." },
  { slug: "rize-findikli-telefon-tamiri", name: "Fındıklı", il: "Rize", title: "Fındıklı Telefon Tamiri", metaDescription: "Fındıklı'dan Trabzon Vip İletişim'e telefon tamiri. Aynı gün tamir, garantili hizmet." },
  // Artvin
  { slug: "artvin-telefon-tamiri", name: "Artvin", il: "Artvin", title: "Artvin iPhone ve Telefon Tamiri", metaDescription: "Artvin'den kargo ile Trabzon'a iPhone ve telefon tamiri. Vip İletişim, orijinal parça." },
  { slug: "artvin-hopa-telefon-tamiri", name: "Hopa", il: "Artvin", title: "Hopa Telefon Tamiri", metaDescription: "Hopa'dan Trabzon Vip İletişim'e kargo ile iPhone ve Samsung tamiri. Hızlı teslim, garanti." },
  { slug: "artvin-arhavi-telefon-tamiri", name: "Arhavi", il: "Artvin", title: "Arhavi Telefon Tamiri", metaDescription: "Arhavi'den Trabzon'a telefon tamiri. Vip İletişim ile kargo, profesyonel tamir, orijinal parça." },
  { slug: "artvin-borcka-telefon-tamiri", name: "Borçka", il: "Artvin", title: "Borçka Telefon Tamiri", metaDescription: "Borçka'dan Trabzon'a iPhone ve telefon tamiri. Uzman teknik servis, orijinal parça garantisi." },
  // Gümüşhane
  { slug: "gumushane-telefon-tamiri", name: "Gümüşhane", il: "Gümüşhane", title: "Gümüşhane iPhone ve Telefon Tamiri", metaDescription: "Gümüşhane'den kargo ile Trabzon'a telefon tamiri. Vip İletişim ile garantili profesyonel servis." },
  { slug: "gumushane-kelkit-telefon-tamiri", name: "Kelkit", il: "Gümüşhane", title: "Kelkit Telefon Tamiri", metaDescription: "Kelkit'ten Trabzon Vip İletişim'e kargo ile iPhone ve telefon tamiri. Hızlı ve garantili." },
  { slug: "gumushane-siran-telefon-tamiri", name: "Şiran", il: "Gümüşhane", title: "Şiran Telefon Tamiri", metaDescription: "Şiran'dan Trabzon'a kargo ile telefon tamiri. Vip İletişim, orijinal parça, uzman servis." },
  // Bayburt
  { slug: "bayburt-telefon-tamiri", name: "Bayburt", il: "Bayburt", title: "Bayburt iPhone ve Telefon Tamiri", metaDescription: "Bayburt'tan kargo ile Trabzon'a iPhone ve telefon tamiri. Vip İletişim, garantili hizmet." },
  { slug: "bayburt-aydintepe-telefon-tamiri", name: "Aydıntepe", il: "Bayburt", title: "Aydıntepe Telefon Tamiri", metaDescription: "Aydıntepe'den Trabzon Vip İletişim'e kargo ile telefon tamiri. Profesyonel tamir, garanti." },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
