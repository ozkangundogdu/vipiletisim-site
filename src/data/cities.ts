export type City = {
  slug: string;
  name: string;
  il: string;
  title: string;
  metaDescription: string;
  /** Gerçek, doğrulanabilir yerel bilgiye dayanan, ilçeye özgü tanıtım metni. */
  localNote: string;
};

export const cities: City[] = [
  // Trabzon
  {
    slug: "trabzon-iphone-tamiri",
    name: "Trabzon",
    il: "Trabzon",
    title: "Trabzon iPhone ve Telefon Tamiri",
    metaDescription: "Trabzon'da iPhone, Samsung, Xiaomi, Huawei tamiri. Vip İletişim ile aynı gün teslim, orijinal parça.",
    localNote: "Vip İletişim'in atölyesi Trabzon merkezde, Çarşı Mahallesi'nde yer alıyor; şehir merkezinden veya yakın ilçelerden gelen müşteriler cihazlarını elden teslim edip aynı gün geri alabiliyor.",
  },
  {
    slug: "trabzon-akcaabat-telefon-tamiri",
    name: "Akçaabat",
    il: "Trabzon",
    title: "Akçaabat Telefon Tamiri",
    metaDescription: "Akçaabat'ta telefon tamiri arayanlar için Trabzon Vip İletişim. iPhone ve Android tamir, aynı gün hizmet.",
    localNote: "Akçaabat köftesiyle tanınan, Trabzon merkeze yaklaşık 12 km mesafedeki sahil ilçesidir; D-010 karayoluyla şehir merkezine kısa sürede ulaşım mümkün olduğundan Akçaabatlı müşteriler genelde cihazlarını elden teslim etmeyi tercih ediyor.",
  },
  {
    slug: "trabzon-arakli-telefon-tamiri",
    name: "Araklı",
    il: "Trabzon",
    title: "Araklı Telefon Tamiri",
    metaDescription: "Araklı ilçesinden Trabzon'a telefon tamiri için Vip İletişim. Hızlı, garantili, uygun fiyatlı.",
    localNote: "Trabzon'un doğusunda, fındık bahçeleriyle çevrili sahil ilçesi Araklı'dan merkeze ulaşım sahil yolu üzerinden yaklaşık yarım saat sürer; isteyen müşterilerimiz kargo ile de cihaz gönderebilir.",
  },
  {
    slug: "trabzon-of-telefon-tamiri",
    name: "Of",
    il: "Trabzon",
    title: "Of Telefon Tamiri",
    metaDescription: "Of ilçesinde telefon kırıldı mı? Trabzon Vip İletişim ile aynı gün tamir ve teslim hizmeti.",
    localNote: "Trabzon'un doğu ucundaki balıkçılık ve hamsi kültürüyle tanınan Of ilçesi merkeze biraz uzak kaldığından, buradaki müşterilerimizin büyük kısmı cihazını kargoyla gönderip aynı gün tamir sonrası geri kargo ile alıyor.",
  },
  {
    slug: "trabzon-surmene-telefon-tamiri",
    name: "Sürmene",
    il: "Trabzon",
    title: "Sürmene Telefon Tamiri",
    metaDescription: "Sürmene'den Trabzon'a telefon tamiri. Vip İletişim uzman kadrosu ile hızlı ve garantili tamir.",
    localNote: "Geleneksel Sürmene bıçakçılığı ve balıkçı tekneleriyle bilinen bu sahil ilçesinden merkeze sahil yolu üzerinden ulaşım kolaydır; elden getirme ya da kargo, ikisi de tercih edilebiliyor.",
  },
  {
    slug: "trabzon-yomra-telefon-tamiri",
    name: "Yomra",
    il: "Trabzon",
    title: "Yomra Telefon Tamiri",
    metaDescription: "Yomra ilçesinde telefon tamiri için Trabzon Vip İletişim. iPhone, Samsung ve tüm markalar.",
    localNote: "Trabzon Havalimanı'nın bulunduğu Yomra, merkeze en yakın ilçelerden biri olduğundan buradaki müşteriler genellikle cihazlarını elden getirip aynı gün teslim alıyor.",
  },
  {
    slug: "trabzon-vakfikebir-telefon-tamiri",
    name: "Vakfıkebir",
    il: "Trabzon",
    title: "Vakfıkebir Telefon Tamiri",
    metaDescription: "Vakfıkebir'den Trabzon'a iPhone ve telefon tamiri. Orijinal parça ile profesyonel servis.",
    localNote: "Adıyla özdeşleşen Vakfıkebir ekmeğiyle tanınan bu batı ilçesi merkeze yaklaşık 50 km uzaklıkta; mesafe nedeniyle buradan gelen taleplerin çoğu kargo yoluyla karşılanıyor.",
  },
  {
    slug: "trabzon-besikduzu-telefon-tamiri",
    name: "Beşikdüzü",
    il: "Trabzon",
    title: "Beşikdüzü Telefon Tamiri",
    metaDescription: "Beşikdüzü telefon tamiri için Trabzon Vip İletişim. Aynı gün teslim, orijinal parça garantisi.",
    localNote: "Vakfıkebir'in hemen batısındaki sakin sahil ilçesi Beşikdüzü'nden müşterilerimiz genelde kargo yoluyla cihaz gönderiyor; tamir sonrası aynı gün geri kargolanıyor.",
  },
  {
    slug: "trabzon-macka-telefon-tamiri",
    name: "Maçka",
    il: "Trabzon",
    title: "Maçka Telefon Tamiri",
    metaDescription: "Maçka ilçesinde telefon arızası mı? Trabzon Vip İletişim ile hızlı ve uygun fiyatlı tamir.",
    localNote: "Sümela Manastırı'na ev sahipliği yapan dağlık ilçe Maçka, yaz aylarında yayla turizmiyle hareketlenir; merkeze E-97 karayoluyla yaklaşık 30 dakikalık bir mesafededir.",
  },
  {
    slug: "trabzon-tonya-telefon-tamiri",
    name: "Tonya",
    il: "Trabzon",
    title: "Tonya Telefon Tamiri",
    metaDescription: "Tonya'dan Trabzon'a telefon tamiri. Vip İletişim ile garantili, profesyonel teknik servis hizmeti.",
    localNote: "Tonya tereyağıyla ünlü, yüksek rakımlı bu iç kesim ilçesinden merkeze ulaşım dağ yolu üzerinden biraz uzun sürdüğünden, müşterilerimizin tercihi büyük ölçüde kargo ile gönderim yönünde oluyor.",
  },
  // Giresun
  {
    slug: "giresun-telefon-tamiri",
    name: "Giresun",
    il: "Giresun",
    title: "Giresun iPhone ve Telefon Tamiri",
    metaDescription: "Giresun'dan kargo ile telefon tamiri. Trabzon Vip İletişim'e kargo, orijinal parça, uzman servis.",
    localNote: "Türkiye'nin fındık üretiminde başı çeken Giresun'dan Trabzon'a kargo süresi genelde bir gün sürer; cihazınız servisimize ulaştığı gün tamir edilip aynı gün geri yola çıkar.",
  },
  {
    slug: "giresun-bulancak-telefon-tamiri",
    name: "Bulancak",
    il: "Giresun",
    title: "Bulancak Telefon Tamiri",
    metaDescription: "Bulancak'tan kargo ile Trabzon'a telefon tamiri. Vip İletişim ile güvenli ve hızlı tamir.",
    localNote: "Giresun il merkezine komşu sahil ilçesi Bulancak'tan gelen kargolar genellikle bir gün içinde Trabzon'a ulaşıyor; tamir sonrası aynı süratte geri gönderiliyor.",
  },
  {
    slug: "giresun-gorele-telefon-tamiri",
    name: "Görele",
    il: "Giresun",
    title: "Görele Telefon Tamiri",
    metaDescription: "Görele'den Trabzon'a iPhone ve telefon tamiri. Kargo ile gönder, aynı gün tamir et, geri al.",
    localNote: "Fındığı ve geleneksel Görele bıçakçılığıyla tanınan bu sahil ilçesi Trabzon sınırına yakın olduğundan, Görele'den gelen kargolar genelde diğer Giresun ilçelerine göre daha kısa sürede servisimize ulaşıyor.",
  },
  {
    slug: "giresun-tirebolu-telefon-tamiri",
    name: "Tirebolu",
    il: "Giresun",
    title: "Tirebolu Telefon Tamiri",
    metaDescription: "Tirebolu'dan Trabzon Vip İletişim'e kargo ile telefon tamiri. Orijinal parça, hızlı teslim.",
    localNote: "Sahildeki Cenevizlilerden kalma kalesiyle bilinen Tirebolu'dan kargolar Trabzon'a bir gün içinde ulaşır; cihazınız ulaştığı gün ücretsiz incelenip tamire alınır.",
  },
  {
    slug: "giresun-espiye-telefon-tamiri",
    name: "Espiye",
    il: "Giresun",
    title: "Espiye Telefon Tamiri",
    metaDescription: "Espiye'den Trabzon'a kargo ile telefon tamiri. Uzman kadro, orijinal parça, garanti.",
    localNote: "Fındık üretiminin yoğun olduğu Espiye ilçesinden Trabzon'a kargo gönderimi yaygın bir tercih; servisimize ulaşan cihaz aynı gün tamir edilip kargoya teslim ediliyor.",
  },
  // Rize
  {
    slug: "rize-iphone-tamiri",
    name: "Rize",
    il: "Rize",
    title: "Rize iPhone ve Telefon Tamiri",
    metaDescription: "Rize'den kargo ile Trabzon Vip İletişim'e iPhone ve telefon tamiri. Profesyonel servis, garanti.",
    localNote: "Çay üretimiyle özdeşleşen Rize'den Trabzon'a kargo mesafesi kısa olduğundan, cihazınız genelde bir gün içinde servisimize ulaşır ve aynı gün tamir edilir.",
  },
  {
    slug: "rize-cayeli-telefon-tamiri",
    name: "Çayeli",
    il: "Rize",
    title: "Çayeli Telefon Tamiri",
    metaDescription: "Çayeli'nden Trabzon'a iPhone tamiri. Vip İletişim ile kargo ile gönder, orijinal parçayla tamir.",
    localNote: "Çay tarımının yanı sıra Türkiye'nin önemli bakır işletmelerinden birine ev sahipliği yapan Çayeli'nden gelen kargolar Trabzon'a kısa sürede ulaşıyor.",
  },
  {
    slug: "rize-ardesen-telefon-tamiri",
    name: "Ardeşen",
    il: "Rize",
    title: "Ardeşen Telefon Tamiri",
    metaDescription: "Ardeşen'den Trabzon'a telefon tamiri. Vip İletişim Teknik Servis ile hızlı ve garantili hizmet.",
    localNote: "Fırtına Vadisi'ne açılan kapı konumundaki Ardeşen'den yayla turizmi döneminde de yoğun talep alıyoruz; kargo ile gönderilen cihazlar Trabzon'a bir gün içinde ulaşıyor.",
  },
  {
    slug: "rize-pazar-telefon-tamiri",
    name: "Pazar",
    il: "Rize",
    title: "Pazar Telefon Tamiri",
    metaDescription: "Pazar ilçesinden Trabzon'a kargo ile iPhone ve telefon tamiri. Orijinal parça, uzman servis.",
    localNote: "Rize'nin doğusundaki sahil ilçesi Pazar'dan Trabzon'a kargo süresi kısa; cihazınız ulaştığı gün incelenip net fiyatla onayınıza sunulur.",
  },
  {
    slug: "rize-findikli-telefon-tamiri",
    name: "Fındıklı",
    il: "Rize",
    title: "Fındıklı Telefon Tamiri",
    metaDescription: "Fındıklı'dan Trabzon Vip İletişim'e telefon tamiri. Aynı gün tamir, garantili hizmet.",
    localNote: "Yeşilliği ve çay bahçeleriyle bilinen, Artvin sınırına yakın Fındıklı ilçesinden gelen kargolar Trabzon'a bir gün içinde ulaşıyor.",
  },
  // Artvin
  {
    slug: "artvin-telefon-tamiri",
    name: "Artvin",
    il: "Artvin",
    title: "Artvin iPhone ve Telefon Tamiri",
    metaDescription: "Artvin'den kargo ile Trabzon'a iPhone ve telefon tamiri. Vip İletişim, orijinal parça.",
    localNote: "Kaçkar Dağları'nın eteklerindeki dağlık coğrafyasıyla bilinen Artvin'den Trabzon'a kargo gönderimi yaygın; cihazınız servisimize ulaştığı gün tamire alınır.",
  },
  {
    slug: "artvin-hopa-telefon-tamiri",
    name: "Hopa",
    il: "Artvin",
    title: "Hopa Telefon Tamiri",
    metaDescription: "Hopa'dan Trabzon Vip İletişim'e kargo ile iPhone ve Samsung tamiri. Hızlı teslim, garanti.",
    localNote: "Karadeniz'in Gürcistan sınırına en yakın liman ilçesi Hopa'dan Trabzon'a mesafe diğer Artvin ilçelerine göre biraz daha uzun olsa da, kargo ile gönderilen cihazlar yine de kısa sürede servisimize ulaşıyor.",
  },
  {
    slug: "artvin-arhavi-telefon-tamiri",
    name: "Arhavi",
    il: "Artvin",
    title: "Arhavi Telefon Tamiri",
    metaDescription: "Arhavi'den Trabzon'a telefon tamiri. Vip İletişim ile kargo, profesyonel tamir, orijinal parça.",
    localNote: "Yeşil örtüsü ve fındık bahçeleriyle tanınan sahil ilçesi Arhavi'den müşterilerimiz genelde kargo yoluyla cihaz gönderip aynı gün tamir sonrası geri alıyor.",
  },
  {
    slug: "artvin-borcka-telefon-tamiri",
    name: "Borçka",
    il: "Artvin",
    title: "Borçka Telefon Tamiri",
    metaDescription: "Borçka'dan Trabzon'a iPhone ve telefon tamiri. Uzman teknik servis, orijinal parça garantisi.",
    localNote: "Karagöl-Sahara Milli Parkı ve Deriner Barajı'na yakınlığıyla bilinen Borçka'dan gelen kargolar Trabzon'a ortalama bir gün içinde ulaşıyor.",
  },
  // Gümüşhane
  {
    slug: "gumushane-telefon-tamiri",
    name: "Gümüşhane",
    il: "Gümüşhane",
    title: "Gümüşhane iPhone ve Telefon Tamiri",
    metaDescription: "Gümüşhane'den kargo ile Trabzon'a telefon tamiri. Vip İletişim ile garantili profesyonel servis.",
    localNote: "Adını tarihteki gümüş madenciliğinden alan Gümüşhane'den Trabzon'a Zigana Dağı üzerinden kargo gönderimi yapılıyor; cihazınız ulaştığı gün tamire alınır.",
  },
  {
    slug: "gumushane-kelkit-telefon-tamiri",
    name: "Kelkit",
    il: "Gümüşhane",
    title: "Kelkit Telefon Tamiri",
    metaDescription: "Kelkit'ten Trabzon Vip İletişim'e kargo ile iPhone ve telefon tamiri. Hızlı ve garantili.",
    localNote: "İç Anadolu'ya komşu, tarım ve hayvancılığın öne çıktığı Kelkit ilçesinden Trabzon'a mesafe diğer Gümüşhane ilçelerine göre biraz daha uzun olduğundan kargo, en pratik seçenek oluyor.",
  },
  {
    slug: "gumushane-siran-telefon-tamiri",
    name: "Şiran",
    il: "Gümüşhane",
    title: "Şiran Telefon Tamiri",
    metaDescription: "Şiran'dan Trabzon'a kargo ile telefon tamiri. Vip İletişim, orijinal parça, uzman servis.",
    localNote: "Yüksek rakımlı, tarım ve hayvancılıkla geçinen Şiran ilçesinden gelen kargolar Trabzon'a ortalama bir-iki gün içinde ulaşıyor.",
  },
  // Bayburt
  {
    slug: "bayburt-telefon-tamiri",
    name: "Bayburt",
    il: "Bayburt",
    title: "Bayburt iPhone ve Telefon Tamiri",
    metaDescription: "Bayburt'tan kargo ile Trabzon'a iPhone ve telefon tamiri. Vip İletişim, garantili hizmet.",
    localNote: "Kalesi ve yüksek yayla coğrafyasıyla bilinen Bayburt'tan Trabzon'a Zigana Geçidi üzerinden kargo gönderiliyor; cihazınız ulaştığı gün ücretsiz incelenir.",
  },
  {
    slug: "bayburt-aydintepe-telefon-tamiri",
    name: "Aydıntepe",
    il: "Bayburt",
    title: "Aydıntepe Telefon Tamiri",
    metaDescription: "Aydıntepe'den Trabzon Vip İletişim'e kargo ile telefon tamiri. Profesyonel tamir, garanti.",
    localNote: "Yer altı mağara sistemiyle (Aydıntepe Yer Altı Şehri) bilinen bu ilçeden gelen kargolar Trabzon'a ortalama bir-iki gün içinde ulaşıyor.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
