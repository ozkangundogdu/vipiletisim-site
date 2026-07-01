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
    metaDescription: "Trabzon telefon tamiri: iPhone, Samsung ve Xiaomi ekran, batarya, şarj soketi ve anakart onarımı. Randevuyla beklerken tamir, aynı gün teslim — Vip İletişim.",
    localNote: "Vip İletişim'in teknik servis atölyesi Trabzon Ortahisar'da, Çarşı Mahallesi Uzun Sokak Kolotoğlu Pasajı'nda yer alır. Merkezden gelen müşterilerimizin önemli bir bölümü bizi daha önce hizmet alanların tavsiyesiyle ya da sosyal medya paylaşımlarımızla tanıyor. iPhone, Samsung ve Xiaomi cihazlarda ekran kırılması, batarya performans düşüşü, yazılım sorunları, şarj soketi arızaları ve anakart onarımları için düzenli olarak tercih ediliyoruz. Randevu alındığında ekran, batarya ve şarj soketi gibi parça değişimleri parça stoktaysa çoğu zaman 25-45 dakikada tamamlanır. Anakart, sıvı teması veya şebeke gibi detaylı ölçüm isteyen arızalarda ise işlem aynı gün bitebilir ya da cihazın durumuna göre ertesi güne sarkabilir.",
  },
  {
    slug: "trabzon-akcaabat-telefon-tamiri",
    name: "Akçaabat",
    il: "Trabzon",
    title: "Akçaabat Telefon Tamiri",
    metaDescription: "Akçaabat telefon tamiri: iPhone, Samsung ve Xiaomi ekran, batarya, şarj soketi ve anakart onarımı. Randevuyla beklerken tamir, aynı gün teslim — Vip İletişim.",
    localNote: "Akçaabat köftesiyle tanınan ve Trabzon merkeze yaklaşık 12 km mesafedeki sahil ilçesidir; D-010 karayoluyla ulaşım kısa sürdüğü için Akçaabatlı müşteriler cihazlarını çoğunlukla elden teslim etmeyi tercih eder. Teknik servisimiz Trabzon Ortahisar'da olduğundan Akçaabat'ta ayrı bir şube bulunmaz; tüm işlemler merkezdeki atölyede yapılır. Randevu alındığında ekran, batarya ve şarj soketi gibi parça değişimleri çoğu zaman siz beklerken 20-45 dakikada tamamlanır. Akçaabat'tan en sık açılmayan ya da şarj almayan iPhone modelleri, sıvı teması sonrası çalışmayan cihazlar ve Samsung ile Xiaomi tarafında konnektör ve şarj yolu arızaları geliyor; anakart seviyesindeki işlemler ise cihazın durumuna göre aynı gün veya ertesi güne sarkabilir.",
  },
  {
    slug: "trabzon-arakli-telefon-tamiri",
    name: "Araklı",
    il: "Trabzon",
    title: "Araklı Telefon Tamiri",
    metaDescription: "Araklı telefon tamiri: iPhone, Samsung, Xiaomi ekran, batarya, şarj soketi ve şarj entegresi onarımı. Elden teslim, randevuyla beklerken tamir — Vip İletişim.",
    localNote: "Trabzon'un doğusunda, fındık bahçeleriyle çevrili sahil ilçesi Araklı'dan merkeze ulaşım sahil yolu üzerinden yaklaşık yarım saat sürer; bu yakınlık nedeniyle Araklılı müşteriler cihazlarını çoğunlukla elden teslim etmeyi tercih eder. Teknik servisimiz Trabzon Ortahisar'da olduğundan Araklı'da ayrı bir şube bulunmaz. Şarj soketi değişimi, şarj entegresi arızası, ekran ve batarya değişimi ile kamera onarımı buradan en sık gelen taleplerdir. Randevu alındığında cihaz modeli ve arıza önceden öğrenildiği için parça ve teknik masa hazırlığı yapılır; böylece ekran, batarya ve şarj soketi işlemleri çoğu zaman siz beklerken 25-45 dakikada tamamlanır. İsteyen müşterilerimiz cihazını kargoyla da gönderebilir.",
  },
  {
    slug: "trabzon-of-telefon-tamiri",
    name: "Of",
    il: "Trabzon",
    title: "Of Telefon Tamiri",
    metaDescription: "Of telefon tamiri: iPhone, Samsung, Xiaomi anakart, şarj entegresi ve şebeke onarımı. Minibüs veya randevuyla teslim, ücretsiz ön inceleme — Vip İletişim.",
    localNote: "Trabzon'un doğu ucundaki balıkçılık ve hamsi kültürüyle tanınan Of ilçesi merkeze biraz uzak kaldığından, buradaki müşterilerimiz çoğu zaman önce kendi bölgesinde çözüm arıyor; fiyat, parça kalitesi ya da anakart seviyesinde onarım gerektiğinde Trabzon'daki servisimize ulaşıyor. Of'tan özellikle açılmayan cihazlar, iPhone, Samsung ve Xiaomi anakart arızaları, şarj entegresi ve şebeke problemleri ile daha önce sonuç alınamamış tamirler geliyor. Cihaz randevuyla elden getirilebildiği gibi Trabzon'a çalışan minibüs hattıyla da gönderilebilir; araç plakası ve saati paylaşıldığında takibi yapılır. Teknik servisimiz Trabzon Ortahisar'da olduğundan Of'ta ayrı bir şube bulunmaz.",
  },
  {
    slug: "trabzon-surmene-telefon-tamiri",
    name: "Sürmene",
    il: "Trabzon",
    title: "Sürmene Telefon Tamiri",
    metaDescription: "Sürmene telefon tamiri: iPhone 15/16 Pro ekran-kasa, batarya, sıvı teması ve şarj soketi onarımı. Minibüs veya elden teslim, hızlı servis — Vip İletişim.",
    localNote: "Geleneksel Sürmene bıçakçılığı ve balıkçı tekneleriyle bilinen bu sahil ilçesinden merkeze sahil yolu üzerinden ulaşım kolaydır. Sürmene'den gelen talepler özellikle yaz ayları ve çay toplama döneminde artıyor; bu dönemde ekran kırılması, batarya sorunları, sıvı teması ve şarj soketi arızaları sıklaşıyor. Turistik hareketliliğin etkisiyle iPhone 15 Pro ve iPhone 16 Pro gibi üst segment modellerde ekran ve kasa kaynaklı arızalarla da karşılaşıyoruz. Cihaz elden getirilebildiği gibi çoğu müşterimiz minibüs hattını tercih ediyor; araç plakası ve saati paylaşıldığında cihaz teslim alınır, işlem sonrası yine minibüs veya kargoyla geri gönderilir.",
  },
  {
    slug: "trabzon-yomra-telefon-tamiri",
    name: "Yomra",
    il: "Trabzon",
    title: "Yomra Telefon Tamiri",
    metaDescription: "Yomra telefon tamiri: iPhone, Samsung ve Xiaomi ekran, batarya ve şarj soketi değişimi. Elden teslim, randevuyla beklerken tamir — Vip İletişim.",
    localNote: "Trabzon Havalimanı'nın bulunduğu Yomra, merkeze en yakın ilçelerden biri olduğundan buradaki müşteriler genellikle cihazlarını elden getirip aynı gün teslim alıyor. Teknik servisimiz Trabzon Ortahisar'da olduğundan Yomra'da ayrı bir şube bulunmaz; tüm işlemler merkezdeki atölyede yapılır. Bu yakınlık sayesinde ekran değişimi, batarya değişimi ve şarj soketi gibi parça değişimleri için randevu alan müşterilerimiz cihazını çoğu zaman beklerken, 20-45 dakika içinde tamamlanmış olarak geri alabiliyor. Anakart arızası veya sıvı teması gibi detaylı işlemlerde ise süre cihazın durumuna göre değişir. Gelmeden önce WhatsApp üzerinden model ve arıza bilgisini paylaşmak süreci hızlandırır.",
  },
  {
    slug: "trabzon-vakfikebir-telefon-tamiri",
    name: "Vakfıkebir",
    il: "Trabzon",
    title: "Vakfıkebir Telefon Tamiri",
    metaDescription: "Vakfıkebir telefon tamiri: iPhone, Samsung, Xiaomi ekran, batarya, şarj soketi ve kamera değişimi. Randevuyla aynı gün, kargo seçeneği — Vip İletişim.",
    localNote: "Adıyla özdeşleşen Vakfıkebir ekmeğiyle tanınan bu batı ilçesi merkeze yaklaşık 50 km uzaklıktadır. Buradan gelen müşterilerimiz genellikle cihazını aynı gün yaptırıp dönmek istediği için randevulu servis süreci önem kazanıyor; model ve arıza önceden paylaşıldığında ekran, batarya, şarj soketi ve kamera gibi parça değişimleri için gerekli hazırlık yapılıyor. Böylece bu işlemler çoğu zaman siz beklerken kısa sürede tamamlanabiliyor. Anakart arızaları ve sıvı teması gibi detaylı işlemlerde ise cihazın servisimizde biraz daha uzun kalması gerekebilir. Mesafe nedeniyle kargo da sık tercih edilen bir yöntemdir.",
  },
  {
    slug: "trabzon-besikduzu-telefon-tamiri",
    name: "Beşikdüzü",
    il: "Trabzon",
    title: "Beşikdüzü Telefon Tamiri",
    metaDescription: "Beşikdüzü telefon tamiri: iPhone, Samsung, Xiaomi ekran, batarya, şarj soketi, kamera ve anakart onarımı. Randevu veya kargoyla teslim — Vip İletişim.",
    localNote: "Vakfıkebir'in hemen batısındaki sakin sahil ilçesi Beşikdüzü'nden müşterilerimiz ekran değişimi, batarya değişimi, şarj soketi değişimi, kamera arızaları ve anakart onarımları için Vip İletişim'e ulaşıyor. Mesafe nedeniyle Beşikdüzülü müşterilerimize randevu alarak gelmelerini öneriyoruz; böylece uygun parça kontrolü ve teknik hazırlık önceden tamamlanır, mümkün olan parça değişimleri siz beklerken kısa sürede sonuçlandırılır. Teknik servisimiz Trabzon Ortahisar'da olduğundan Beşikdüzü'nde ayrı bir şubemiz yoktur. İsteyen müşterilerimiz cihazını kargo yoluyla da gönderebilir; tamir sonrası cihaz aynı gün geri kargolanır.",
  },
  {
    slug: "trabzon-macka-telefon-tamiri",
    name: "Maçka",
    il: "Trabzon",
    title: "Maçka Telefon Tamiri",
    metaDescription: "Maçka telefon tamiri: iPhone, Samsung ve Xiaomi ekran, batarya, şarj soketi ve anakart onarımı. Elden veya minibüsle gönderim, randevuyla servis — Vip İletişim.",
    localNote: "Sümela Manastırı'na ev sahipliği yapan dağlık ilçe Maçka, yaz aylarında yayla turizmiyle hareketlenir ve merkeze E-97 karayoluyla yaklaşık 30 dakikalık mesafededir. Teknik servisimiz Trabzon Ortahisar'da bulunduğundan Maçka'da ayrı bir şubemiz yoktur; müşteriler cihazlarını elden getirebilir ya da Trabzon'a çalışan minibüs hatlarıyla gönderebilir. Minibüsle gönderimde araç plakası ve saati paylaşıldığında cihazın takibi yapılır ve tamir sonrası cihaz yine aynı yolla geri ulaştırılır. Önceden randevu alındığında ekran, batarya ve şarj soketi gibi parça değişimleri çoğu zaman siz beklerken 20-45 dakikada tamamlanır. Anakart arızası veya sıvı teması gibi detaylı ölçüm gerektiren işlemlerde ise süre cihazın durumuna göre aynı gün veya ertesi güne değişebilir.",
  },
  {
    slug: "trabzon-tonya-telefon-tamiri",
    name: "Tonya",
    il: "Trabzon",
    title: "Tonya Telefon Tamiri",
    metaDescription: "Tonya telefon tamiri: iPhone, Samsung, Xiaomi ekran, batarya, şarj soketi ve anakart onarımı. Kargo veya minibüsle gönderim, hızlı servis — Vip İletişim.",
    localNote: "Tonya tereyağıyla ünlü, yüksek rakımlı bu iç kesim ilçesinden merkeze ulaşım dağ yolu üzerinden biraz uzun sürdüğünden, müşterilerimizin tercihi büyük ölçüde kargo ve Trabzon'a çalışan minibüs hatları yönünde oluyor. Minibüsle gönderimde araç plakası ve saati paylaşıldığında cihazın takibi yapılır, tamir sonrası yine aynı yolla geri ulaştırılır. Teknik servisimiz Trabzon Ortahisar'da olduğundan Tonya'da ayrı bir şubemiz yoktur. Ekran, batarya ve şarj soketi gibi parça değişimleri parça stoktaysa hızlı tamamlanırken, anakart ve sıvı teması gibi işlemlerde süre cihazın durumuna göre değişir. Göndermeden önce WhatsApp'tan model ve arıza paylaşmak işi hızlandırır.",
  },
  // Giresun
  {
    slug: "giresun-telefon-tamiri",
    name: "Giresun",
    il: "Giresun",
    title: "Giresun iPhone ve Telefon Tamiri",
    metaDescription: "Giresun telefon tamiri: iPhone-iPad anakart, açılmama ve şarj arızası onarımı. Otobüs terminali veya kargoyla gönderim, ücretsiz ön inceleme — Vip İletişim.",
    localNote: "Türkiye'nin fındık üretiminde başı çeken Giresun'dan hem son kullanıcı müşterilerimizden hem de teknik servislerden cihaz kabul ediyoruz. Özellikle iPhone ve iPad anakart sorunları, açılmayan cihazlar, şarj almayan modeller ve daha önce sonuç alınamamış onarımlar için Giresun'dan bize cihaz gönderiliyor. Giresun-Trabzon arası ulaşım nedeniyle otobüs terminali üzerinden gönderim sık kullanılıyor; firma adı, araç plakası ve saat bilgisi paylaşıldığında cihazın takibi yapılır. Cihaz servisimize ulaştığı gün ücretsiz ön incelemeden geçirilir ve onayınız olmadan işlem başlatılmaz. Tamir tamamlandığında cihaz yine otobüs, minibüs veya kargoyla geri gönderilir.",
  },
  {
    slug: "giresun-bulancak-telefon-tamiri",
    name: "Bulancak",
    il: "Giresun",
    title: "Bulancak Telefon Tamiri",
    metaDescription: "Bulancak telefon tamiri: iPhone, Samsung, Xiaomi ekran, batarya, şarj soketi ve anakart onarımı. Kargo veya otobüsle gönderim — Vip İletişim.",
    localNote: "Giresun il merkezine komşu sahil ilçesi Bulancak'tan gelen cihazlar genellikle bir gün içinde Trabzon'daki servisimize ulaşıyor. Müşterilerimiz cihazını kargoyla gönderebildiği gibi, Trabzon'a çalışan otobüs firmaları üzerinden de ulaştırabiliyor; araç bilgileri paylaşıldığında takibi yapılır. Teknik servisimiz Trabzon Ortahisar'da olduğundan Bulancak'ta ayrı bir şube bulunmaz. Cihaz servisimize ulaştığında ücretsiz ön incelemeden geçirilir; arıza, tahmini süre ve ücret bildirilir, onayınız olmadan işlem başlatılmaz. Ekran, batarya ve şarj soketi gibi parça değişimleri hızlı tamamlanırken anakart ve sıvı teması işlemlerinde süre cihazın durumuna göre değişir.",
  },
  {
    slug: "giresun-gorele-telefon-tamiri",
    name: "Görele",
    il: "Giresun",
    title: "Görele Telefon Tamiri",
    metaDescription: "Görele telefon tamiri: iPhone şebeke-şarj, Samsung görüntü ve anakart arızası onarımı. Minibüs hattıyla gönderim, ücretsiz ön inceleme — Vip İletişim.",
    localNote: "Fındığı ve geleneksel Görele bıçakçılığıyla tanınan bu sahil ilçesinden gelen taleplerde çoğu zaman daha önce işlem görmüş ama arızası devam eden cihazlarla karşılaşıyoruz. iPhone şarj almıyor, iPhone 16 Pro Max'te şebeke yok ve arama yapılamıyor, Samsung ekranı değiştiği halde görüntü gelmiyor gibi detaylı inceleme gerektiren şikayetler sık soruluyor. Görele-Trabzon minibüs hattı üzerinden gönderim yapılabiliyor; cihaz servisimize ulaştığında önce ücretsiz ön inceleme yapılır ve arıza kaynağı belirlenir. Anakart, şebeke ve görüntü arızalarında işlem süresi cihazın durumuna göre değişebilir. Onayınız olmadan hiçbir işlem başlatılmaz.",
  },
  {
    slug: "giresun-tirebolu-telefon-tamiri",
    name: "Tirebolu",
    il: "Giresun",
    title: "Tirebolu Telefon Tamiri",
    metaDescription: "Tirebolu telefon tamiri: iPhone, Samsung, Xiaomi anakart, açılmama, şarj ve ses arızası onarımı. Minibüs hattıyla gönderim — Vip İletişim.",
    localNote: "Sahildeki Cenevizlilerden kalma kalesiyle bilinen Tirebolu'dan gelen cihazlarda iPhone, Samsung ve Xiaomi modellerde anakart arızaları, kapanıp açılmama, sesin karşı tarafa gitmemesi, şarj almama ve sıvı teması gibi sorunlarla sık karşılaşıyoruz. Bölgedeki bazı teknik servislerden de ileri seviye anakart onarımı için cihaz yönlendirmesi yapılabiliyor. Tirebolu-Trabzon arasında minibüs hattı kullanıldığından gönderim ve geri teslim pratik yönetiliyor; araç bilgileri paylaşıldığında cihaz teslim alınır. Servisimize ulaşan cihaz ücretsiz incelenir ve onayınız olmadan işlem başlatılmaz. Teknik servisimiz Trabzon Ortahisar'dadır.",
  },
  {
    slug: "giresun-espiye-telefon-tamiri",
    name: "Espiye",
    il: "Giresun",
    title: "Espiye Telefon Tamiri",
    metaDescription: "Espiye telefon tamiri: Samsung S serisi ve Ultra anakart, CPU, şarj ve görüntü arızası onarımı. Kargo, minibüs veya otobüsle gönderim — Vip İletişim.",
    localNote: "Fındık üretiminin yoğun olduğu Espiye ilçesinden servisimize gelen cihazlarda Samsung modeller öne çıkıyor. Özellikle Samsung S serisi ve Ultra modellerde anakart, CPU çevresi, şarj, görüntü ve kapanma-açılma sorunları için detaylı teknik inceleme yapılıyor. Bu tür cihazlarda işlem öncesi arıza belirtisinin net anlatılması süreci hızlandırır. Cihaz kargo, minibüs veya otobüs yoluyla gönderilebilir; servisimize ulaştığında ölçüm yapılır, arıza ve tahmini süre size bildirilir. Teknik servisimiz Trabzon Ortahisar'da olduğundan Espiye'de ayrı bir şube bulunmaz ve onayınız olmadan işlem başlatılmaz.",
  },
  // Rize
  {
    slug: "rize-iphone-tamiri",
    name: "Rize",
    il: "Rize",
    title: "Rize iPhone ve Telefon Tamiri",
    metaDescription: "Rize telefon tamiri: sıvı teması, şarj soketi oksitlenmesi, batarya şişmesi ve anakart onarımı. Kargo, otobüs veya randevuyla teslim — Vip İletişim.",
    localNote: "Çay üretimiyle özdeşleşen Rize'den Trabzon'a kargo mesafesi kısa olduğundan cihazınız genelde bir gün içinde servisimize ulaşır. Rize'nin yağışlı ve nemli iklimi nedeniyle en sık sıvı teması, şarj soketi oksitlenmesi, ahize-hoparlör ses azalması, batarya şişmesi ve anakart kaynaklı açılmama sorunlarıyla karşılaşıyoruz; özellikle şarj soketi, mikrofon ve iç bağlantı noktalarında oksitlenme görülebiliyor. Yaz ayları ve çay toplama döneminde talep artıyor. Müşterilerimiz cihazını kargo, otobüs veya minibüsle gönderebildiği gibi randevu alarak da gelebiliyor. Sıvı teması olan cihazların şarja takılmadan servise ulaştırılması onarım şansını artırır.",
  },
  {
    slug: "rize-cayeli-telefon-tamiri",
    name: "Çayeli",
    il: "Rize",
    title: "Çayeli Telefon Tamiri",
    metaDescription: "Çayeli telefon tamiri: sıvı teması, şarj soketi oksitlenmesi, ekran ve batarya onarımı. Kargo, otobüs veya minibüsle gönderim — Vip İletişim.",
    localNote: "Çay tarımının yanı sıra Türkiye'nin önemli bakır işletmelerinden birine ev sahipliği yapan Çayeli'nden gelen kargolar Trabzon'daki servisimize kısa sürede ulaşıyor. Rize'nin nemli ikliminde sık görülen sıvı teması ve şarj soketi oksitlenmesi gibi arızalar Çayeli'nden gelen cihazlarda da karşımıza çıkabiliyor. Müşterilerimiz cihazını kargoyla gönderebildiği gibi Trabzon'a çalışan otobüs ve minibüs hatlarıyla da ulaştırabiliyor. Cihaz servisimize ulaştığında ücretsiz ön incelemeden geçirilir; arıza ve ücret bilgisi paylaşılır, onayınız olmadan işlem başlatılmaz. Ekran ve batarya gibi parça değişimleri hızlı tamamlanırken anakart ve sıvı işlemlerinde süre değişir.",
  },
  {
    slug: "rize-ardesen-telefon-tamiri",
    name: "Ardeşen",
    il: "Rize",
    title: "Ardeşen Telefon Tamiri",
    metaDescription: "Ardeşen telefon tamiri: sıvı teması, şarj soketi, batarya ve anakart onarımı. Kargo, otobüs veya minibüsle gönderim, ücretsiz ön inceleme — Vip İletişim.",
    localNote: "Fırtına Vadisi'ne açılan kapı konumundaki Ardeşen'den, yayla turizminin canlandığı dönemlerde de yoğun talep alıyoruz. Bölgenin nemli iklimi nedeniyle sıvı teması, şarj soketi oksitlenmesi ve batarya sorunları Ardeşen'den gelen cihazlarda sık görülebiliyor. Cihazlar kargoyla veya Trabzon'a çalışan otobüs-minibüs hatlarıyla gönderilebilir; araç bilgileri paylaşıldığında takibi yapılır. Servisimize ulaşan cihaz ücretsiz incelenir ve net fiyat onayınıza sunulur. Ekran, batarya ve şarj soketi gibi parça değişimleri kısa sürede tamamlanırken anakart ve sıvı teması gibi işlemlerde süre cihazın durumuna göre değişir. Sıvı değen cihazı şarja takmadan göndermeniz önemlidir.",
  },
  {
    slug: "rize-pazar-telefon-tamiri",
    name: "Pazar",
    il: "Rize",
    title: "Pazar Telefon Tamiri",
    metaDescription: "Pazar telefon tamiri: sıvı teması, şarj soketi, ekran ve batarya onarımı. Kargo, otobüs veya minibüsle gönderim, ücretsiz ön inceleme — Vip İletişim.",
    localNote: "Rize'nin doğusundaki sahil ilçesi Pazar'dan Trabzon'a kargo süresi kısadır; cihazınız ulaştığı gün ücretsiz incelenir ve net fiyatla onayınıza sunulur. Bölgenin nemli havası nedeniyle sıvı teması ve şarj soketi oksitlenmesi Pazar'dan gelen cihazlarda da sık rastlanan arızalar arasında. Müşterilerimiz cihazını kargo, otobüs veya minibüs hatlarıyla gönderebilir; araç bilgileri paylaşıldığında takip sağlanır. Ekran, batarya ve şarj soketi gibi parça değişimleri stok durumuna göre hızlı tamamlanırken, anakart ve sıvı teması gibi detaylı işlemlerde süre cihazın durumuna göre değişir. Teknik servisimiz Trabzon Ortahisar'dadır.",
  },
  {
    slug: "rize-findikli-telefon-tamiri",
    name: "Fındıklı",
    il: "Rize",
    title: "Fındıklı Telefon Tamiri",
    metaDescription: "Fındıklı telefon tamiri: sıvı teması, şarj soketi, ekran ve batarya onarımı. Kargo, otobüs veya minibüsle gönderim — Vip İletişim.",
    localNote: "Yeşilliği ve çay bahçeleriyle bilinen, Artvin sınırına yakın Fındıklı ilçesinden gelen kargolar Trabzon'daki servisimize bir gün içinde ulaşıyor. Bölgenin nemli iklimi nedeniyle sıvı teması ve şarj soketi oksitlenmesi Fındıklı'dan gelen cihazlarda da görülebiliyor. Müşterilerimiz cihazını kargoyla ya da Trabzon'a çalışan otobüs-minibüs hatlarıyla gönderebilir. Cihaz servisimize ulaştığında ücretsiz ön incelemeden geçirilir; arıza, tahmini süre ve ücret bildirilir, onayınız olmadan işlem başlatılmaz. Ekran ve batarya gibi parça değişimleri hızlı tamamlanırken anakart ve sıvı teması gibi işlemlerde süre değişir. Sıvı değmiş cihazı şarja takmadan göndermeniz onarım şansını artırır.",
  },
  // Artvin
  {
    slug: "artvin-telefon-tamiri",
    name: "Artvin",
    il: "Artvin",
    title: "Artvin iPhone ve Telefon Tamiri",
    metaDescription: "Artvin telefon tamiri: iPhone, Samsung ve Xiaomi ekran, batarya ve anakart onarımı. Kargo veya otobüsle gönderim, ücretsiz ön inceleme — Vip İletişim.",
    localNote: "Kaçkar Dağları'nın eteklerindeki dağlık coğrafyasıyla bilinen Artvin'den Trabzon'a kargo gönderimi yaygın bir yöntemdir; cihaz servisimize ulaştığı gün ücretsiz incelemeye alınır. Dağlık yapı nedeniyle ulaşım biraz uzun sürebildiğinden, göndermeden önce WhatsApp üzerinden model, arıza belirtisi ve varsa fotoğraf paylaşmak süreci hızlandırır. Müşterilerimiz cihazını kargoyla ya da Trabzon'a çalışan otobüs firmalarıyla ulaştırabilir; araç bilgileri paylaşıldığında takip yapılır. Ekran, batarya ve şarj soketi gibi parça değişimleri stok durumuna göre hızlı tamamlanırken anakart ve sıvı teması gibi işlemlerde süre cihazın durumuna göre değişir. Onayınız olmadan işlem başlatılmaz.",
  },
  {
    slug: "artvin-hopa-telefon-tamiri",
    name: "Hopa",
    il: "Artvin",
    title: "Hopa Telefon Tamiri",
    metaDescription: "Hopa telefon tamiri: iPhone, Samsung, Xiaomi ekran, batarya, şarj soketi ve anakart onarımı. Kargo veya otobüsle gönderim — Vip İletişim.",
    localNote: "Karadeniz'in Gürcistan sınırına en yakın liman ilçesi Hopa'dan Trabzon'a mesafe diğer Artvin ilçelerine göre biraz daha uzun olsa da, kargoyla gönderilen cihazlar yine de kısa sürede servisimize ulaşıyor. Mesafe nedeniyle Hopalı müşterilerimize göndermeden önce WhatsApp'tan model ve arıza bilgisini paylaşmalarını öneriyoruz. Cihaz kargoyla ya da Trabzon'a çalışan otobüs firmalarıyla ulaştırılabilir; araç bilgileri paylaşıldığında takip sağlanır. Servisimize ulaşan cihaz ücretsiz incelenir, net fiyat onayınıza sunulur. Ekran ve batarya gibi parça değişimleri hızlı tamamlanırken anakart ve sıvı teması gibi işlemlerde süre cihazın durumuna göre değişir.",
  },
  {
    slug: "artvin-arhavi-telefon-tamiri",
    name: "Arhavi",
    il: "Artvin",
    title: "Arhavi Telefon Tamiri",
    metaDescription: "Arhavi telefon tamiri: sıvı teması, şarj soketi, ekran, batarya ve anakart onarımı. Kargo, otobüs veya minibüsle gönderim — Vip İletişim.",
    localNote: "Yeşil örtüsü ve fındık bahçeleriyle tanınan sahil ilçesi Arhavi'den müşterilerimiz genelde cihazını kargoyla gönderip tamir sonrası geri alıyor. Trabzon'a çalışan otobüs ve minibüs hatları da bir gönderim seçeneği; araç bilgileri paylaşıldığında cihazın takibi yapılır. Karadeniz ikliminin nemi nedeniyle sıvı teması ve şarj soketi oksitlenmesi Arhavi'den gelen cihazlarda da görülebiliyor. Servisimize ulaşan cihaz ücretsiz ön incelemeden geçirilir; arıza, süre ve ücret bilgisi verilir, onayınız olmadan işlem başlatılmaz. Ekran ve batarya değişimleri hızlı tamamlanırken anakart işlemlerinde süre cihazın durumuna göre değişir.",
  },
  {
    slug: "artvin-borcka-telefon-tamiri",
    name: "Borçka",
    il: "Artvin",
    title: "Borçka Telefon Tamiri",
    metaDescription: "Borçka telefon tamiri: iPhone, Samsung, Xiaomi ekran, batarya, şarj soketi ve anakart onarımı. Kargo veya otobüsle gönderim — Vip İletişim.",
    localNote: "Karagöl-Sahara Milli Parkı ve Deriner Barajı'na yakınlığıyla bilinen Borçka'dan gelen kargolar Trabzon'daki servisimize ortalama bir gün içinde ulaşıyor. Müşterilerimiz cihazını kargoyla ya da Trabzon'a çalışan otobüs firmalarıyla gönderebilir; araç bilgileri paylaşıldığında takibi yapılır. Göndermeden önce WhatsApp'tan model, arıza belirtisi ve varsa fotoğraf paylaşmak süreci hızlandırır. Cihaz servisimize ulaştığında ücretsiz ön incelemeden geçirilir ve onayınız olmadan işlem başlatılmaz. Ekran, batarya ve şarj soketi gibi parça değişimleri stok durumuna göre hızlı tamamlanırken anakart ve sıvı teması gibi işlemlerde süre cihazın durumuna göre değişir.",
  },
  // Gümüşhane
  {
    slug: "gumushane-telefon-tamiri",
    name: "Gümüşhane",
    il: "Gümüşhane",
    title: "Gümüşhane iPhone ve Telefon Tamiri",
    metaDescription: "Gümüşhane telefon tamiri: iPhone şarj entegresi ve iPhone 14 Pro anakart onarımı. Otogar, minibüs veya kargoyla gönderim — Vip İletişim.",
    localNote: "Adını tarihteki gümüş madenciliğinden alan Gümüşhane'den gelen müşteri sayımız zaman içinde belirgin şekilde arttı. Buradan gelen cihazlarda iPhone şarj entegresi arızaları, özellikle araç şarjı veya yan sanayi adaptör kullanımı sonrası oluşan şarj problemleri, ve iPhone 14 Pro gibi modellerde teknik ölçüm gerektiren anakart arızaları sık görülüyor. Gümüşhane-Trabzon otogar ve minibüs hattı üzerinden gönderim yapılabiliyor; araç bilgileri paylaşıldığında cihazın takibi sağlanıyor. Zigana geçidi üzerinden kargo da bir seçenektir. Cihaz servisimize ulaştığında ücretsiz incelenir ve onayınız olmadan işlem başlatılmaz.",
  },
  {
    slug: "gumushane-kelkit-telefon-tamiri",
    name: "Kelkit",
    il: "Gümüşhane",
    title: "Kelkit Telefon Tamiri",
    metaDescription: "Kelkit telefon tamiri: iPhone, Samsung, Xiaomi ekran, batarya, şarj soketi ve anakart onarımı. Kargo veya otobüsle gönderim — Vip İletişim.",
    localNote: "İç Anadolu'ya komşu, tarım ve hayvancılığın öne çıktığı Kelkit ilçesinden Trabzon'a mesafe diğer Gümüşhane ilçelerine göre biraz daha uzun olduğundan, kargo ve Trabzon'a çalışan otobüs hatları en pratik seçenek oluyor. Araç bilgileri paylaşıldığında cihazın takibi yapılır, tamir sonrası yine aynı yolla geri gönderilir. Göndermeden önce WhatsApp'tan model ve arıza paylaşmak süreci hızlandırır. Cihaz servisimize ulaştığında ücretsiz ön incelemeden geçirilir, net fiyat onayınıza sunulur. Ekran, batarya ve şarj soketi gibi parça değişimleri hızlı tamamlanırken anakart ve sıvı teması gibi işlemlerde süre cihazın durumuna göre değişir.",
  },
  {
    slug: "gumushane-siran-telefon-tamiri",
    name: "Şiran",
    il: "Gümüşhane",
    title: "Şiran Telefon Tamiri",
    metaDescription: "Şiran telefon tamiri: iPhone, Samsung ve Xiaomi ekran, batarya ve anakart onarımı. Kargo veya otobüsle gönderim, ücretsiz ön inceleme — Vip İletişim.",
    localNote: "Yüksek rakımlı, tarım ve hayvancılıkla geçinen Şiran ilçesinden gelen kargolar Trabzon'daki servisimize ortalama bir-iki gün içinde ulaşıyor. Mesafe nedeniyle Şiranlı müşterilerimize göndermeden önce WhatsApp'tan model, arıza belirtisi ve varsa fotoğraf paylaşmalarını öneriyoruz. Cihaz kargoyla ya da Trabzon'a çalışan otobüs hatlarıyla ulaştırılabilir. Servisimize ulaşan cihaz ücretsiz ön incelemeden geçirilir ve onayınız olmadan işlem başlatılmaz. Ekran, batarya ve şarj soketi gibi parça değişimleri stok durumuna göre hızlı tamamlanırken anakart ve sıvı teması gibi detaylı işlemlerde süre cihazın durumuna göre değişir.",
  },
  // Bayburt
  {
    slug: "bayburt-telefon-tamiri",
    name: "Bayburt",
    il: "Bayburt",
    title: "Bayburt iPhone ve Telefon Tamiri",
    metaDescription: "Bayburt telefon tamiri: uygun fiyatlı ekran-batarya değişimi ve iPhone, Samsung, Xiaomi anakart onarımı. Kargo veya otobüsle gönderim — Vip İletişim.",
    localNote: "Kalesi ve yüksek yayla coğrafyasıyla bilinen Bayburt'tan gelen müşterilerimiz bizi çoğunlukla YouTube, Instagram ve Facebook hesaplarımız üzerinden tanıyor. Hem uygun fiyatlı ekran ve batarya değişimi hem de iPhone, Samsung ve Xiaomi anakart tamiri için Trabzon'da güvenilir teknik servis arayanlar Vip İletişim'e ulaşıyor. Cihazlar Zigana Geçidi üzerinden kargoyla ya da Trabzon'a çalışan otobüs ve minibüs hatlarıyla gönderilebilir; araç bilgileri paylaşıldığında takip sağlanır. Parça değişimi işlemleri stok durumuna göre hızlı tamamlanırken, anakart arızaları ve sıvı teması gibi detaylı işlemlerde cihazın teknik incelemeye alınması gerekir. Onayınız olmadan işlem başlatılmaz.",
  },
  {
    slug: "bayburt-aydintepe-telefon-tamiri",
    name: "Aydıntepe",
    il: "Bayburt",
    title: "Aydıntepe Telefon Tamiri",
    metaDescription: "Aydıntepe telefon tamiri: iPhone, Samsung, Xiaomi ekran, batarya, şarj soketi ve anakart onarımı. Kargo veya otobüsle gönderim — Vip İletişim.",
    localNote: "Yer altı mağara sistemiyle bilinen Aydıntepe ilçesinden gelen kargolar Trabzon'daki servisimize ortalama bir-iki gün içinde ulaşıyor. Müşterilerimiz cihazını kargoyla ya da Trabzon'a çalışan otobüs ve minibüs hatlarıyla gönderebilir; araç bilgileri paylaşıldığında cihazın takibi yapılır. Mesafe nedeniyle göndermeden önce WhatsApp'tan model ve arıza paylaşmak süreci hızlandırır. Cihaz servisimize ulaştığında ücretsiz ön incelemeden geçirilir ve onayınız olmadan işlem başlatılmaz. Ekran, batarya ve şarj soketi gibi parça değişimleri stok durumuna göre hızlı tamamlanırken anakart ve sıvı teması gibi işlemlerde süre cihazın durumuna göre değişir.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
