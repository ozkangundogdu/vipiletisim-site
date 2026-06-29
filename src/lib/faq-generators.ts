export type FaqItem = { question: string; answer: string };

export function generateServiceFaqs(model: string, repairType: string): FaqItem[] {
  const rt = repairType.toLowerCase();
  const isEkran = rt.includes("ekran");
  const isBatarya = rt.includes("batarya");
  const isSarj = rt.includes("şarj");
  const isKamera = rt.includes("kamera");

  return [
    {
      question: `${model} ${repairType} ne kadar sürer?`,
      answer: `Trabzon Vip İletişim'de ${model} ${rt} işlemi ortalama 45–60 dakika sürer. Stokta orijinal parça bulunması halinde aynı gün teslim garantisi veriyoruz. Randevu almadan gelebilirsiniz.`,
    },
    {
      question: `${model} ${repairType} fiyatı ne kadar?`,
      answer: `${model} ${rt} ücreti, cihazın durumuna ve kullanılacak parçaya göre belirlenir. İşleme başlamadan önce ücretsiz ön inceleme yapıyor, net fiyatı size bildiriyoruz. Onaylamazsanız herhangi bir ücret talep etmiyoruz. Fiyat bilgisi için WhatsApp veya telefon ile bize ulaşabilirsiniz.`,
    },
    {
      question: `${model} ${repairType} sırasında verilerim silinir mi?`,
      answer: `Hayır. ${repairType}, yalnızca donanım değişimi içerir; cihazınızdaki veriler korunur. Ancak işlem öncesinde iCloud veya Google yedek almanızı öneririz. Yazılım müdahalesi gerektiren durumlarda sizi önceden bilgilendiririz.`,
    },
    {
      question: `${model} ${repairType} için orijinal parça kullanıyor musunuz?`,
      answer: `Evet. Trabzon Vip İletişim olarak orijinal veya OEM (üretici eşdeğeri) kalitesinde parça kullanıyoruz. ${isEkran ? "Ekran rengi, dokunmatik hassasiyeti ve parlaklık değerleri orijinalle birebir eşdeğerdir." : isBatarya ? "Batarya kapasitesi ve güvenlik sertifikaları orijinal ile aynı standarttadır." : "Kullandığımız tüm parçalar kalite testinden geçmektedir."}`,
    },
    {
      question: `${model} ${repairType} sonrası herhangi bir sorun yaşarsam ne yapmalıyım?`,
      answer: `İşlem sonrasında aynı arızadan kaynaklanan bir sorun yaşarsanız cihazınızı servisimize getirin; ücretsiz olarak yeniden inceleyip müdahale ediyoruz. Anakart onarımlarında 180 gün işçilik garantisi sunmaktayız.`,
    },
    ...(isEkran
      ? [
          {
            question: `${model} ekranı kırıldı ama çalışıyor, tamir ettirmeli miyim?`,
            answer: `Ekran camı kırık ancak dokunmatik çalışıyorsa bile en kısa sürede tamir ettirmenizi öneririz. Kırık cam zamanla LCD veya OLED panele zarar verebilir, su ve toz cihaza sızabilir. Erken müdahale hem daha az maliyetli hem de daha güvenlidir.`,
          },
          {
            question: `${model} ekran değişimi sonrası Face ID / parmak izi çalışır mı?`,
            answer: `Orijinal veya OEM kalitesinde ekran kullandığımızda Face ID ve biyometrik özellikler tam olarak çalışmaya devam eder. Kalitesiz muadil ekranlarda bu özellikler sorun çıkarabilir; bu nedenle Vip İletişim olarak her zaman kaliteli parça tercih ediyoruz.`,
          },
        ]
      : []),
    ...(isBatarya
      ? [
          {
            question: `${model} batarya kaç döngüde değiştirilmeli?`,
            answer: `Genel kural olarak iPhone'larda pil sağlığı %80'in altına düştüğünde, Android cihazlarda ise şarj kapasitesinde belirgin düşüş yaşandığında batarya değişimi önerilir. ${model} için bu genellikle 500–800 şarj döngüsüne denk gelir.`,
          },
          {
            question: `${model} bataryası şişerse ne yapmalıyım?`,
            answer: `Şişen batarya, cihazı ve kullanıcıyı tehdit eden ciddi bir durumdur. Cihazı şarj etmeden, ısıya maruz bırakmadan derhal Vip İletişim'e getirin. Şişen batarya en kısa sürede değiştirilmelidir.`,
          },
        ]
      : []),
    ...(isSarj
      ? [
          {
            question: `${model} şarj almıyorsa ne yapmalıyım?`,
            answer: `Önce farklı bir kablo ve adaptör deneyin, şarj soketini nazikçe kontrol edin. Sorun devam ediyorsa büyük olasılıkla şarj soketi arızalıdır. Trabzon Vip İletişim'e getirerek ücretsiz ön inceleme yaptırabilir, aynı gün tamir ettirebilirsiniz.`,
          },
        ]
      : []),
    ...(isKamera
      ? [
          {
            question: `${model} kamera camı kırılırsa görüntü kalitesi bozulur mu?`,
            answer: `Evet. Kamera camı çizildiğinde veya kırıldığında lens ışığı düzgün kıramaz, fotoğraflarda sis, leke ve bulanıklık oluşur. Trabzon Vip İletişim olarak ${model} kamera camı değişimini 30–45 dakikada tamamlıyor, görüntü kalitesini orijinal seviyesine döndürüyoruz.`,
          },
        ]
      : []),
    {
      question: `Trabzon dışındaysam ${model} ${rt} için ne yapabilirim?`,
      answer: `Giresun, Rize, Artvin, Gümüşhane veya Bayburt'tan kargo ile cihazınızı Vip İletişim'e gönderebilirsiniz. WhatsApp'tan iletişime geçerek ön inceleme bilgisi alın, kargoya verin, tamir sonrası adresinize gönderelim.`,
    },
    {
      question: `Trabzon'da ${model} ${rt} için en iyi teknik servis hangisi?`,
      answer: `Trabzon'da ${model} ${rt} için Vip İletişim Teknik Servis öne çıkmaktadır. Orijinal parça kullanımı, aynı gün teslim ve ücretsiz ön inceleme ile Trabzon'un en çok tercih edilen teknik servislerinden biridir.`,
    },
  ];
}

export function generateBlogFaqs(
  title: string,
  category: string,
  keywords: string[]
): { q: string; a: string }[] {
  const kw = (title + " " + category + " " + keywords.join(" ")).toLowerCase();

  const isBatarya = kw.includes("batarya") || kw.includes("pil") || kw.includes("şarj");
  const isEkran = kw.includes("ekran") || kw.includes("cam") || kw.includes("dokunmatik");
  const isKamera = kw.includes("kamera") || kw.includes("fotoğraf");
  const isSu = kw.includes("su") || kw.includes("ıslatma");
  const isIphone = kw.includes("iphone") || kw.includes("apple");
  const isSamsung = kw.includes("samsung") || kw.includes("galaxy");
  const isTrabzon = kw.includes("trabzon");
  const marka = isIphone ? "iPhone" : isSamsung ? "Samsung" : "telefon";

  const faqs: { q: string; a: string }[] = [];

  if (isBatarya) {
    faqs.push(
      {
        q: `${marka} batarya değişimi ne kadar sürer?`,
        a: `Trabzon Vip İletişim'de ${marka} batarya değişimi ortalama 30–45 dakikada tamamlanır. Aynı gün teslim garantisi veriyoruz. İşlem öncesinde ücretsiz ön inceleme yapılır.`,
      },
      {
        q: `${marka} batarya değişimi veri kaybına yol açar mı?`,
        a: `Hayır. Batarya değişimi yalnızca donanım işlemidir; yazılım ve depolama birimine dokunulmaz. Yine de işlem öncesinde iCloud veya Google yedek almanızı tavsiye ederiz.`,
      },
      {
        q: `Trabzon'da ${marka} batarya değişimi için nereye gidebilirim?`,
        a: `Trabzon Merkez'deki Vip İletişim Teknik Servis'e başvurabilirsiniz. Orijinal ve OEM kalitesinde batarya kullanıyor, aynı gün teslim yapıyoruz. Giresun, Rize, Artvin ve çevre illerden kargo ile de tamir yaptırabilirsiniz.`,
      }
    );
  }

  if (isEkran) {
    faqs.push(
      {
        q: `${marka} ekran tamiri ne kadar sürer?`,
        a: `Trabzon Vip İletişim'de ${marka} ekran değişimi 45–60 dakikada tamamlanır. Stokta parça bulunması halinde aynı gün teslim yapılır.`,
      },
      {
        q: `Kırık ekranı geç tamir ettirmenin zararı var mı?`,
        a: `Evet. Çatlak ekran zamanla LCD veya OLED paneli bozar, suya karşı korumayı ortadan kaldırır. Erken müdahale hem maliyet hem de güvenlik açısından daha doğrudur.`,
      },
      {
        q: `Trabzon'da ${marka} ekran değişimi yaptırmak için ne yapmalıyım?`,
        a: `Trabzon Vip İletişim Teknik Servis'e randevusuz gelebilirsiniz. Ücretsiz ön inceleme ile durumu belirliyor, onayınızın ardından işleme başlıyoruz. Giresun, Rize, Artvin illerinden kargo ile de tamir yaptırabilirsiniz.`,
      }
    );
  }

  if (isKamera) {
    faqs.push(
      {
        q: `${marka} kamera tamiri ne kadar sürer?`,
        a: `${marka} kamera değişimi veya cam tamiri Vip İletişim'de 30–60 dakikada tamamlanır. Parça stokta mevcutsa aynı gün teslim yapılır.`,
      },
      {
        q: `${marka} kamera camı kırılırsa fotoğraf kalitesi nasıl etkilenir?`,
        a: `Kırık veya çizili kamera camı ışığı düzgün kıramaz; fotoğraflarda bulanıklık, sis ve leke oluşur. Cam değişimiyle görüntü kalitesi orijinal seviyesine döner.`,
      }
    );
  }

  if (isSu) {
    faqs.push(
      {
        q: `Suya düşen telefon için ne yapmalıyım?`,
        a: `Telefonu hemen kapatın, şarj etmeyin ve ısıya maruz bırakmayın. En kısa sürede Vip İletişim'e getirin. Ultrasonik temizleme ile pek çok su hasarlı cihaz kurtarılabilmektedir.`,
      },
      {
        q: `Su hasarlı ${marka} tamiri ne kadar sürer?`,
        a: `Su hasarı incelemesi birkaç saat sürebilir. Ultrasonik temizleme ve kurutma işlemi tamamlandıktan sonra hasar değerlendirilir. İşlem süresi hasarın boyutuna göre değişir.`,
      }
    );
  }

  // Her blog için genel sorular
  faqs.push(
    {
      q: `Trabzon'da ${marka} tamiri için ücretsiz ön inceleme var mı?`,
      a: `Evet. Trabzon Vip İletişim'de tüm cihazlara ücretsiz ön inceleme yapılır. Arızayı tespit edip net fiyatı bildiriyoruz; onaylamazsanız herhangi bir ücret alınmaz.`,
    },
    {
      q: isTrabzon
        ? `Trabzon'da telefon tamiri için en iyi adres neresi?`
        : `Trabzon'da ${marka} tamiri için en güvenilir servis hangisi?`,
      a: `Trabzon'da 10+ yıllık deneyimi, orijinal yedek parça kullanımı ve aynı gün teslim garantisiyle Vip İletişim Teknik Servis öne çıkmaktadır. Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan kargo ile tamir imkânı da sunulmaktadır.`,
    },
    {
      q: `Trabzon dışından kargo ile tamir yaptırabilir miyim?`,
      a: `Evet. Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan kargoya verilen cihazlar servisimize ulaştığı gün tamir edilir ve aynı gün kargolanır. Detaylı bilgi için WhatsApp hattımızdan ulaşabilirsiniz.`,
    }
  );

  return faqs;
}

export function generateCityFaqs(name: string, il: string): FaqItem[] {
  const isKargo = il !== "Trabzon";

  return [
    {
      question: `${name}'da iPhone tamiri nerede yaptırılır?`,
      answer: `${name}${isKargo ? `'dan` : `'da`} iPhone tamiri için Trabzon Vip İletişim Teknik Servis'i tercih edebilirsiniz. ${isKargo ? `${name}'dan kargo ile cihazınızı gönderin, aynı gün tamir edip adresinize yollayalım.` : `Servisimize gelerek aynı gün tamir ve teslim hizmetinden yararlanabilirsiniz.`}`,
    },
    {
      question: `${name}'dan Trabzon'a telefon tamiri için kargo ücreti ne kadar?`,
      answer: `${isKargo ? `${name}'dan Vip İletişim'e kargo gönderim ücretleri taşıyıcıya göre değişir. Belirli tamir paketlerinde kargo ücretsiz olabilir; detay için WhatsApp hattımızdan bilgi alabilirsiniz.` : `${name} Trabzon'da yer aldığından kargo gerekmez. Servisimize doğrudan gelebilirsiniz.`}`,
    },
    {
      question: `${name}'dan gönderilen telefon ne zaman teslim edilir?`,
      answer: `${isKargo ? `Kargo yoluyla gelen cihazlar servisimize ulaştığı gün tamir edilir. Tamir süreci 45–60 dakika sürer ve aynı gün kargolanır. Toplam kargo + tamir süresi genellikle 2–3 iş günüdür.` : `${name} merkezinden getirilen cihazlar ortalama 45–60 dakikada tamir edilir ve aynı gün teslim edilir.`}`,
    },
    {
      question: `${name}${isKargo ? "'dan" : "'da"} Samsung telefon tamiri yaptırabilir miyim?`,
      answer: `Evet. Vip İletişim olarak Samsung Galaxy S, A ve M serisi dahil tüm Samsung modellerinde ${isKargo ? `${name}'dan kargo ile` : ``} tamir hizmeti sunuyoruz. Ekran, batarya, şarj soketi, kamera ve daha fazlası için uzman kadromuz hazır.`,
    },
    {
      question: `Tamir öncesi fiyat öğrenebilir miyim?`,
      answer: `Evet. WhatsApp'tan fotoğraf ve arıza bilgisi göndererek ücretsiz fiyat tahmini alabilirsiniz. Kesin fiyat cihaz incelendikten sonra belirlenir. Onaylamazsanız herhangi bir ücret talep etmiyoruz.`,
    },
    {
      question: `${name} için Vip İletişim'i neden tercih etmeliyim?`,
      answer: `Trabzon'da 10+ yıllık deneyim, orijinal yedek parça, aynı gün teslim ve ücretsiz ön inceleme ile Vip İletişim, ${il} bölgesinin en güvenilir teknik servislerinden biridir. ${isKargo ? `${name} dahil tüm çevre illerden kargo ile tamir imkânı sunmaktayız.` : ``}`,
    },
    {
      question: `${name}'da kırık iPhone ekranı tamir ettirmek ne kadar sürer?`,
      answer: `${isKargo ? `${name}'dan kargoya verilen cihaz servisimize ulaştıktan sonra ekran değişimi 45–60 dakikada tamamlanır.` : `${name}'dan servisimize getirilen iPhone'larda ekran değişimi ortalama 45–60 dakika sürer, aynı gün teslim edilir.`} Stokta orijinal parça bulunması şartıyla bekleme süresi yoktur.`,
    },
    {
      question: `${name} bölgesinden su hasarlı telefon tamiri için ne yapmalıyım?`,
      answer: `Telefonunuz suya düştüyse önce kapatın, şarj etmeyin. ${isKargo ? `Güvenli paketleyip Vip İletişim adresine kargo ile gönderin.` : `En kısa sürede Vip İletişim'e getirin.`} Ultrasonik temizleme ile pek çok su hasarlı cihaz kurtarılabilmektedir. Erken müdahale başarı şansını artırır.`,
    },
  ];
}
