// @ts-check
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "../content/marka-tamirler");
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

const MARKALAR = [
  { key: "iphone", label: "iPhone", modeller: [
    "iPhone X", "iPhone XS", "iPhone XS Max", "iPhone XR",
    "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max",
    "iPhone SE (2. Nesil)",
    "iPhone 12 mini", "iPhone 12", "iPhone 12 Pro", "iPhone 12 Pro Max",
    "iPhone 13 mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max",
    "iPhone SE (3. Nesil)",
    "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
    "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
    "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
    "iPhone 17", "iPhone 17 Slim", "iPhone 17 Pro", "iPhone 17 Pro Max",
    "iPhone 18", "iPhone 18 Air", "iPhone 18 Pro", "iPhone 18 Pro Max",
  ]},
  { key: "samsung", label: "Samsung", modeller: [
    "Galaxy S20", "Galaxy S20+", "Galaxy S20 Ultra", "Galaxy S20 FE",
    "Galaxy S21", "Galaxy S21+", "Galaxy S21 Ultra", "Galaxy S21 FE",
    "Galaxy S22", "Galaxy S22+", "Galaxy S22 Ultra",
    "Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra", "Galaxy S23 FE",
    "Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra", "Galaxy S24 FE",
    "Galaxy S25", "Galaxy S25+", "Galaxy S25 Ultra", "Galaxy S25 Slim",
    "Galaxy S26", "Galaxy S26+", "Galaxy S26 Ultra",
    "Galaxy A12", "Galaxy A13", "Galaxy A14", "Galaxy A15",
    "Galaxy A16", "Galaxy A17",
    "Galaxy A32", "Galaxy A33", "Galaxy A34", "Galaxy A35",
    "Galaxy A36", "Galaxy A37",
  ]},
  { key: "xiaomi", label: "Xiaomi", modeller: [
    "Redmi Note 11 Pro", "Redmi Note 12 Pro", "Redmi Note 13 Pro",
    "Redmi Note 14 Pro", "Redmi Note 15 Pro", "Redmi Note 15 Pro+",
    "Redmi 13C", "Redmi 14C", "Redmi 15C",
    "Mi 11 Lite", "Xiaomi 12 Lite",
    "Xiaomi 13", "Xiaomi 13T", "Xiaomi 13T Pro",
    "Xiaomi 14", "Xiaomi 14T", "Xiaomi 14T Pro",
    "Xiaomi 15", "Xiaomi 15T", "Xiaomi 15T Pro", "Xiaomi 15 Ultra",
    "Xiaomi 17", "Xiaomi 17T",
  ]},
];

const TAMIRLER = [
  { key: "ekran-degisimi", label: "Ekran Değişimi" },
  { key: "batarya-degisimi", label: "Batarya Değişimi" },
  { key: "sarj-soketi-tamiri", label: "Şarj Soketi Tamiri" },
  { key: "ses-arizalari", label: "Ses Arızaları" },
  { key: "mikrofon-tamiri", label: "Mikrofon Tamiri" },
  { key: "hoparlor-tamiri", label: "Hoparlör Tamiri" },
  { key: "on-kamera-tamiri", label: "Ön Kamera Tamiri" },
  { key: "arka-kamera-tamiri", label: "Arka Kamera Tamiri" },
  { key: "face-id-tamiri", label: "Face ID Tamiri", sadeceiPhone: true },
  { key: "kamera-cami-tamiri", label: "Kamera Camı Değişimi" },
  { key: "kasa-degisimi", label: "Kasa Değişimi" },
  { key: "arka-kapak-tamiri", label: "Arka Kapak Tamiri" },
  { key: "anakart-tamiri", label: "Anakart Tamiri" },
  { key: "sivi-temasi-tamiri", label: "Sıvı Teması Tamiri" },
  { key: "wifi-tamiri", label: "WiFi Tamiri" },
  { key: "servis-yok-arizasi", label: "Servis Yok Arızası" },
  { key: "sarj-olmuyor-tamiri", label: "Şarj Olmuyor Tamiri" },
  { key: "sarj-entegresi-tamiri", label: "Şarj Entegresi Tamiri" },
  { key: "acma-kapama-tusu-tamiri", label: "Açma/Kapama Tuşu Tamiri" },
  { key: "on-cam-degisimi", label: "Ön Cam Değişimi" },
];

// ─── İÇERİK ÜRETİCİLERİ ──────────────────────────────────────────────────────

function icerikUret(marka, markaLabel, tamirKey, tamirLabel) {
  const focus = `${markaLabel} ${tamirLabel} Trabzon`;
  const sehir = "Trabzon";
  const servis = "Vip İletişim";

  const intro = introMap(marka, markaLabel, tamirKey, tamirLabel);
  const belirtiler = belirtilerMap(tamirKey, markaLabel);
  const neden = nedenMap(tamirKey, markaLabel);
  const surec = surecMap(tamirKey, markaLabel);
  const veri = veriMap(tamirKey);
  const fiyat = fiyatMap(tamirKey, markaLabel);

  return `## ${markaLabel} ${tamirLabel} Hakkında

${intro}

## ${markaLabel} ${tamirLabel} Gerektiren Belirtiler

${belirtiler}

## Neden Zamanında ${tamirLabel} Yaptırmalısınız?

${neden}

## Trabzon'da ${markaLabel} ${tamirLabel} Süreci

${sehir} ${servis}'de ${markaLabel} ${tamirLabel} süreci şu adımlarla ilerler:

${surec}

## ${tamirLabel} Sırasında Verilerim Güvende mi?

${veri}

## ${markaLabel} ${tamirLabel} Fiyatı — ${sehir}

${fiyat}`;
}

function introMap(marka, markaLabel, tamirKey, tamirLabel) {
  const m = {
    "ekran-degisimi": {
      iphone: `${markaLabel} ekranı, Ceramic Shield camı ve OLED/Super Retina teknolojisiyle günlük kullanımın en kritik parçasıdır. Trabzon'da ${markaLabel} ekran değişimi için Vip İletişim'i tercih eden kullanıcılar; orijinal kalitesinde panel ve aynı gün teslim güvencesiyle cihazlarına kavuşuyor. Yanlış müdahale Face ID ve True Tone kalibrasyonunu bozabilir; bu yüzden deneyimli teknisyen şarttır.`,
      samsung: `Samsung ekranları, Dynamic AMOLED ve yüksek yenileme hızı teknolojisiyle mobil deneyimin merkezinde yer alır. Trabzon'da Samsung ekran değişimi için Vip İletişim'i seçenler; orijinal veya OEM kalitesinde panel ve aynı gün teslim avantajından yararlanıyor. Ekran değişiminde parmak izi sensörünün ve kamera modülünün korunması kritik öneme sahiptir.`,
      xiaomi: `Xiaomi ekranları, AMOLED ve IPS LCD teknolojisiyle geniş bir kullanıcı kitlesine hitap eder. Trabzon'da Xiaomi ekran değişimi için Vip İletişim'e başvuranlar; modele uygun parça ve hızlı servis avantajıyla cihazlarına aynı gün kavuşuyor. Xiaomi modellerinde ekran değişimi sırasında parmak izi okuyucu entegrasyonu ayrıca kontrol edilmelidir.`,
    },
    "batarya-degisimi": {
      iphone: `${markaLabel} bataryası zamanla kapasitesini yitirerek cihazı yavaşlatır ve beklenmedik kapanmalara neden olur. Trabzon'da ${markaLabel} batarya değişimi için Vip İletişim'de orijinal kapasiteli yeni batarya takılır; cihaz sanki yeni çıkmış gibi çalışmaya başlar. Apple'ın batarya sağlığı algoritması doğru kalibrasyon yapılmadan çalışmaz; bu nedenle servis deneyimi önemlidir.`,
      samsung: `Samsung bataryaları belirli şarj döngüsünün ardından şişme ve kapasite kaybı yaşayabilir. Trabzon'da Samsung batarya değişimi için Vip İletişim'de güvenilir OEM batarya takılarak cihaz eski performansına kavuşturulur. Şişen batarya ekrana baskı yaparak çok daha pahalı hasara dönüşebilir; erken müdahale şarttır.`,
      xiaomi: `Xiaomi bataryaları yoğun kullanımda şarj döngüsünü hızla tüketir. Trabzon'da Xiaomi batarya değişimi için Vip İletişim'de modele uygun OEM batarya kullanılır ve kalibrasyon tamamlandıktan sonra cihaz teslim edilir. MIUI'nin batarya optimizasyon özelliğinin doğru çalışması için yeni bataryanın ilk şarj döngüsünün eksiksiz tamamlanması gerekir.`,
    },
    "sarj-soketi-tamiri": {
      iphone: `iPhone şarj soketi, yoğun kullanımda toz ve nem birikiminden ya da fiziksel darbeden zarar görebilir. Lightning veya USB-C konektörün temasını kaybetmesi hem şarjı engeller hem de veri aktarımını durdurur. Trabzon'da Vip İletişim, ${markaLabel} modeline uygun şarj soketi değişimini kısa sürede tamamlar.`,
      samsung: `Samsung şarj soketi, günde birçok kez takılıp çıkarılmasıyla zamanla aşınır. USB-C bağlantısının zayıflaması hem şarjı hem de dosya transferini olumsuz etkiler. Trabzon'da Vip İletişim, Samsung modellerine özgü şarj soketi tamirini orijinal parçalarla gerçekleştirir.`,
      xiaomi: `Xiaomi şarj soketi, USB-C standardıyla hızlı şarjı mümkün kılar; ancak toz birikimi veya kablo hasarı bağlantıyı bozabilir. Trabzon'da Vip İletişim, Xiaomi modeline uygun şarj soketi tamirini hızlıca tamamlar.`,
    },
    "ses-arizalari": {
      iphone: `iPhone ses arızaları; hoparlör, mikrofon, şerit kablo veya yazılım kaynaklı olabilir. Sessize alma düğmesindeki mekanik sorunlar da benzer belirtilere neden olur. Trabzon'da Vip İletişim, ${markaLabel} ses sorununu kök nedenine göre çözer.`,
      samsung: `Samsung ses arızaları, tek taraflı hoparlör arızasından mikrofonun çalışmamasına kadar geniş bir yelpazede görülür. Trabzon'da Vip İletişim, Samsung ses sorununu tanı ile tespit ederek ilgili bileşeni değiştirir.`,
      xiaomi: `Xiaomi ses arızaları genellikle hoparlör ızgarasındaki toz birikimi veya yazılım güncellemesi sonrası ortaya çıkar. Trabzon'da Vip İletişim, Xiaomi ses sorunlarını doğru teşhisle ve kısa sürede çözer.`,
    },
    "mikrofon-tamiri": {
      iphone: `iPhone mikrofonu, aramalar ve ses kayıtları için kritik öneme sahiptir. Toz birikimi, su teması veya fiziksel hasar mikrofonun çalışmamasına yol açabilir. Trabzon'da Vip İletişim, ${markaLabel} mikrofon tamirini orijinal parçayla gerçekleştirir.`,
      samsung: `Samsung mikrofonları, video çekim kalitesini ve arama netliğini doğrudan etkiler. Trabzon'da Vip İletişim, Samsung mikrofon arızasını hızlıca tespit edip giderir.`,
      xiaomi: `Xiaomi mikrofonu özellikle video kayıtlarında yüksek ses kalitesi sunar. Hasar veya toz birikimi mikrofonu işlevsiz kılabilir. Trabzon'da Vip İletişim, Xiaomi mikrofon tamirini güvenle tamamlar.`,
    },
    "hoparlor-tamiri": {
      iphone: `iPhone hoparlörü, stereo ses sistemiyle üst düzey bir dinleme deneyimi sunar. Toz birikimi, su teması veya fiziksel darbe hoparlörün sesini kısıklaştırabilir ya da tamamen susturabilir. Trabzon'da Vip İletişim, ${markaLabel} hoparlör tamirini orijinal parçayla tamamlar.`,
      samsung: `Samsung hoparlör sistemi, Dolby Atmos desteğiyle yüksek kaliteli ses üretir. Ek hoparlörün arızalanması stereo dengeyi bozar. Trabzon'da Vip İletişim, Samsung hoparlör tamirini kısa sürede gerçekleştirir.`,
      xiaomi: `Xiaomi hoparlörü özellikle oyun ve medya kullanımında yoğun baskıya maruz kalır. Trabzon'da Vip İletişim, Xiaomi hoparlör tamirini modele uygun parçayla tamamlar.`,
    },
    "on-kamera-tamiri": {
      iphone: `iPhone ön kamerası, Face ID sensörleri ve TrueDepth teknolojisiyle entegre çalışır. Ön kamera tamirinde bu sensörlerin korunması zorunludur. Trabzon'da Vip İletişim, ${markaLabel} ön kamera tamirini hassasiyetle gerçekleştirir.`,
      samsung: `Samsung ön kamerası, yüksek megapiksel ve geniş açı özelliğiyle selfie kalitesini belirler. Ön kamera değişiminde yüz tanıma desteğinin korunması gerekir. Trabzon'da Vip İletişim, Samsung ön kamera tamirini güvenle tamamlar.`,
      xiaomi: `Xiaomi ön kamerası, delikli ekran tasarımıyla modern görünüm sunar. Kamera tamirinde ekran entegrasyonu dikkate alınmalıdır. Trabzon'da Vip İletişim, Xiaomi ön kamera tamirini modele uygun şekilde yapar.`,
    },
    "arka-kamera-tamiri": {
      iphone: `iPhone arka kamera sistemi; ultra geniş, ana ve telephoto lens ile ProRAW desteği gibi gelişmiş özellikler barındırır. Kamera tamirinde tüm lens modüllerinin kalibrasyonu ayrıca doğrulanır. Trabzon'da Vip İletişim, ${markaLabel} arka kamera tamirini eksiksiz tamamlar.`,
      samsung: `Samsung arka kamera sistemi, yüksek megapiksel ve Space Zoom teknolojisiyle profesyonel fotoğraf deneyimi sunar. Kamera değişiminde OIS mekanizmasının çalışması kontrol edilir. Trabzon'da Vip İletişim, Samsung arka kamera tamirini orijinal parçayla yapar.`,
      xiaomi: `Xiaomi arka kamera sistemi, Leica ortaklığıyla geliştirilen modellerde üst düzey görüntü işleme sunar. Kamera tamirinde lens modülü ve OIS kalibrasyonu birlikte değerlendirilir. Trabzon'da Vip İletişim, Xiaomi arka kamera tamirini hızlıca tamamlar.`,
    },
    "face-id-tamiri": {
      iphone: `Face ID, ${markaLabel} cihazlarının TrueDepth kamera sistemiyle çalışan en hassas biyometrik güvenlik teknolojisidir. Face ID tamiri, projector, flood illuminator ve kızılötesi kamera bileşenlerinin birlikte kalibre edilmesini gerektirdiğinden deneyimli teknisyen zorunludur. Trabzon'da Vip İletişim, ${markaLabel} Face ID tamirini orijinal parçayla güvenle tamamlar.`,
    },
    "kamera-cami-tamiri": {
      iphone: `iPhone kamera camı çatladığında lens görüntü kalitesi düşer ve fotoğraflar bulanık çıkar. Kamera camı değişimi, arka kapak açılmadan veya açılarak yapılabilir; modele göre yöntem değişir. Trabzon'da Vip İletişim, ${markaLabel} kamera camı değişimini hızlıca tamamlar.`,
      samsung: `Samsung kamera camı, çoklu lens sistemini koruyan kritik bir bileşendir. Çatlak cam tüm kamera kalitesini etkiler. Trabzon'da Vip İletişim, Samsung kamera camı değişimini orijinal parçayla gerçekleştirir.`,
      xiaomi: `Xiaomi kamera camı, büyük sensörler için geniş alanlı koruma sağlar. Çatlak camın gecikmeden değiştirilmesi lens kirlenmesini önler. Trabzon'da Vip İletişim, Xiaomi kamera camı değişimini kısa sürede tamamlar.`,
    },
    "kasa-degisimi": {
      iphone: `iPhone kasa değişimi, düşme hasarı, bükülme veya yoğun çizilme durumlarında uygulanır. Alüminyum veya titanyum kasanın değişimi iç bileşenlerin tamamen çıkarılmasını gerektirdiğinden kapsamlı bir işlemdir. Trabzon'da Vip İletişim, ${markaLabel} kasa değişimini deneyimli teknisyen ekibiyle tamamlar.`,
      samsung: `Samsung kasa değişimi, ön ve arka cam çerçevesiyle alüminyum orta kasayı kapsar. Kapsamlı bir işlem olan kasa değişimi, modele göre 1-3 saat arasında tamamlanır. Trabzon'da Vip İletişim, Samsung kasa değişimini güvenle gerçekleştirir.`,
      xiaomi: `Xiaomi kasa değişimi, plastik veya alüminyum çerçeve dahil tüm dış yüzeyi yeniler. Trabzon'da Vip İletişim, Xiaomi kasa değişimini modele uygun parçayla tamamlar.`,
    },
    "arka-kapak-tamiri": {
      iphone: `iPhone arka cam kapak değişimi, düşme sonucu kırılan arka yüzeyin yenilenmesini sağlar. Arka cam değişimi sırasında kablosuz şarj bobininin ve IP koruma contalarının korunması şarttır. Trabzon'da Vip İletişim, ${markaLabel} arka kapak tamirini güvenle tamamlar.`,
      samsung: `Samsung arka kapak; cam veya plastik olup düşme hasarına karşı savunmasız bir yüzeydir. Arka kapak değişiminde NFC anten ve kablosuz şarj bobini korunmalıdır. Trabzon'da Vip İletişim, Samsung arka kapak tamirini kısa sürede gerçekleştirir.`,
      xiaomi: `Xiaomi arka kapak cam veya mat plastik yüzeylerde üretilir. Çatlak arka kapak cihazın su ve toz direncini düşürür. Trabzon'da Vip İletişim, Xiaomi arka kapak tamirini hızlıca tamamlar.`,
    },
    "anakart-tamiri": {
      iphone: `iPhone anakart tamiri; grafik arızası, çip seviyesi kısa devre veya bileşen hasarı gibi karmaşık sorunları kapsar. Mikro lehimleme gerektiren bu işlem, uzman ekipman ve deneyimli teknisyen gerektirir. Trabzon'da Vip İletişim, ${markaLabel} anakart tamirinde 90 gün işçilik garantisi sunar.`,
      samsung: `Samsung anakart tamiri, güç döngüsü arızası, siyah ekran veya kısa devre gibi ciddi sorunlara müdahaleyi kapsar. Chip-level repair gerektiren bu işlem için uzman BGA lehimleme ekipmanı kullanılır. Trabzon'da Vip İletişim, Samsung anakart tamirini 90 gün garantiyle tamamlar.`,
      xiaomi: `Xiaomi anakart tamiri, bootloop, güç açılmama veya şarj entegre arızası gibi sorunları kapsar. Trabzon'da Vip İletişim, Xiaomi anakart tamirini uzman ekipmanla gerçekleştirir.`,
    },
    "sivi-temasi-tamiri": {
      iphone: `Su veya sıvı teması ${markaLabel} cihazının anakartını, ekranını ve bataryasını etkiler. IP sertifikası sıvı hasarını tamamen önlemez; yoğun temas durumunda müdahale gerekir. Trabzon'da Vip İletişim, ${markaLabel} sıvı teması tamirini ultrasonik temizlik ve komponent kurutmayla gerçekleştirir.`,
      samsung: `Samsung sıvı teması; kısa devre, ekran hasarı ve batarya şişmesiyle sonuçlanabilir. Su hasarında cihaz kesinlikle şarj edilmemeli ve hemen servise getirilmelidir. Trabzon'da Vip İletişim, Samsung sıvı teması tamirini kapsamlı temizlik ve onarımla tamamlar.`,
      xiaomi: `Xiaomi sıvı teması, özellikle IP derecelendirmesi düşük modellerde ciddi hasar bırakabilir. Trabzon'da Vip İletişim, Xiaomi sıvı teması tamirinde ultrasonik temizlik ve kurutma işlemi uygular.`,
    },
    "wifi-tamiri": {
      iphone: `iPhone WiFi arızası; zayıf sinyal, bağlantı kesintisi veya ağların görünmemesi şeklinde ortaya çıkar. Yazılım güncellemesi sorunu çözmezse anakart üzerindeki WiFi/BT entegresi değiştirilir. Trabzon'da Vip İletişim, ${markaLabel} WiFi tamirini tanı sonrası doğru müdahaleyle gerçekleştirir.`,
      samsung: `Samsung WiFi arızası, 5GHz ağa bağlanamamak veya sinyalin çok zayıf kalması şeklinde görülür. Trabzon'da Vip İletişim, Samsung WiFi tamirini yazılım ve donanım düzeyinde kapsamlı değerlendirerek çözer.`,
      xiaomi: `Xiaomi WiFi arızası genellikle anten kablosu hasarı veya entegre arızasından kaynaklanır. Trabzon'da Vip İletişim, Xiaomi WiFi tamirini hızlıca tamamlar.`,
    },
    "servis-yok-arizasi": {
      iphone: `"Servis Yok" arızası, ${markaLabel} cihazının baz istasyonuyla bağlantısının kesilmesine yol açar. SIM kart, anten kablosu veya baz bandı entegresindeki sorundan kaynaklanabilir. Trabzon'da Vip İletişim, ${markaLabel} servis yok arızasını aşamalı tanıyla tespit eder ve çözer.`,
      samsung: `Samsung "Servis Yok" arızası, baz bandı modemi, anten veya SIM kart yuvası sorunlarından kaynaklanabilir. Trabzon'da Vip İletişim, Samsung şebeke arızasını ayrıntılı teşhisle giderir.`,
      xiaomi: `Xiaomi servis yok arızası; SIM kart okuyucu, anten veya modem bileşenindeki sorundan kaynaklanır. Trabzon'da Vip İletişim, Xiaomi şebeke arızasını kısa sürede tespit edip çözer.`,
    },
    "sarj-olmuyor-tamiri": {
      iphone: `${markaLabel} şarj olmuyorsa; kablo arızası, toz birikmiş soket, şarj entegresi veya anakart sorunu olabilir. Trabzon'da Vip İletişim, ücretsiz ön incelemeyle şarj olmama nedenini belirler ve en kısa yoldan çözer.`,
      samsung: `Samsung şarj olmama sorunu; kablo, adaptör, soket veya şarj entegresinden kaynaklanabilir. Trabzon'da Vip İletişim, Samsung şarj olmama arızasını nedene göre uygun müdahaleyle giderir.`,
      xiaomi: `Xiaomi şarj olmama arızası genellikle soket toz birikimi veya şarj entegresi arızasından kaynaklanır. Trabzon'da Vip İletişim, Xiaomi şarj olmama sorununu hızlıca tespit edip çözer.`,
    },
    "sarj-entegresi-tamiri": {
      iphone: `iPhone şarj entegresi; hızlı şarj, veri aktarımı ve akım denetiminden sorumlu kritik bir bileşendir. Entegre arızasında cihaz ya hiç şarj olmaz ya da yavaş şarj olur. Trabzon'da Vip İletişim, ${markaLabel} şarj entegresi tamirini BGA teknolojisiyle gerçekleştirir.`,
      samsung: `Samsung şarj entegresi, USB-C hızlı şarj protokollerini yönetir. Entegre arızasında şarj hızı düşer veya tamamen kesilir. Trabzon'da Vip İletişim, Samsung şarj entegresi tamirini uzman ekipmanla tamamlar.`,
      xiaomi: `Xiaomi şarj entegresi, HyperCharge gibi yüksek watt şarj protokollerini yönetir. Entegre arızasında şarj durabilir ya da yavaşlayabilir. Trabzon'da Vip İletişim, Xiaomi şarj entegresi tamirini kısa sürede gerçekleştirir.`,
    },
    "acma-kapama-tusu-tamiri": {
      iphone: `iPhone açma/kapama tuşu, ekranı uyandırma ve cihazı yeniden başlatma için kritik bir fiziksel düğmedir. Tıklamanın alınmaması veya sürekli tetiklenmesi cihazı kullanılamaz hale getirir. Trabzon'da Vip İletişim, ${markaLabel} açma/kapama tuşu tamirini hızlıca tamamlar.`,
      samsung: `Samsung güç tuşu, Bixby veya yan düğme olarak da işlev görebilir. Düğmenin çalışmaması ekranı açmayı ve cihazı yeniden başlatmayı engeller. Trabzon'da Vip İletişim, Samsung güç tuşu tamirini modele uygun şekilde gerçekleştirir.`,
      xiaomi: `Xiaomi güç tuşu aynı zamanda parmak izi okuyucu işlevi görebilir. Tuşun arızalanması hem kilidi açmayı hem de şifreleme güvenliğini etkiler. Trabzon'da Vip İletişim, Xiaomi güç tuşu tamirini güvenle tamamlar.`,
    },
    "on-cam-degisimi": {
      iphone: `iPhone ön camı, Ceramic Shield teknolojisiyle güçlendirilmiş olsa da şiddetli düşmelerde çatlayabilir. Ön cam değişiminde Face ID sensörlerinin ve oleofobik kaplamanın korunması şarttır. Trabzon'da Vip İletişim, ${markaLabel} ön cam değişimini hassasiyetle gerçekleştirir.`,
      samsung: `Samsung ön camı, Gorilla Glass korumasına rağmen köşeden gelen darbelerle kırılabilir. Ön cam değişiminde parmak izi okuyucu ve selfie kameranın korunması gerekir. Trabzon'da Vip İletişim, Samsung ön cam değişimini kısa sürede tamamlar.`,
      xiaomi: `Xiaomi ön camı, orta segment modellerde düşmeye karşı daha kırılgan olabilir. Ön cam değişiminde delikli ekran tasarımındaki sensörlerin korunması önemlidir. Trabzon'da Vip İletişim, Xiaomi ön cam değişimini hızlıca gerçekleştirir.`,
    },
  };

  const tamirIcerik = m[tamirKey];
  if (!tamirIcerik) return `${markaLabel} ${tamirLabel} için Trabzon'da Vip İletişim uzman teknik servisi ile hizmetinizdedir.`;
  return tamirIcerik[marka] || tamirIcerik["iphone"] || Object.values(tamirIcerik)[0];
}

function belirtilerMap(tamirKey, markaLabel) {
  const b = {
    "ekran-degisimi": `- Ekranda görünür çatlak veya cam kırığı var\n- Dokunmatik belirli bölgelerde çalışmıyor\n- Ekranda karanlık lekeler veya renkli çizgiler görünüyor\n- Ekran yanıyor ancak dokunuşa tepki vermiyor\n- Köşeden başlayan siyah leke giderek yayılıyor`,
    "batarya-degisimi": `- Telefon bir anda yüksek şarjdan düşük şarja atlıyor\n- Tam şarjla başlayan telefon öğleden önce bitiyor\n- Cihaz %15–20 şarjda iken kendiliğinden kapanıyor\n- Batarya şişmiş; arka kapak ya da ekran hafifçe ayrılmış\n- Yoğun kullanımda cihaz aşırı ısınıyor`,
    "sarj-soketi-tamiri": `- Kablo takılı olmasına rağmen şarj başlamıyor\n- Kabloyu belirli bir açıda tutmak gerekiyor\n- Soket içinde kırık kablo ucu veya toz birikimi var\n- Veri aktarımı çalışmıyor\n- Kablosuz şarj çalışıyor ama kablolu şarj olmuyor`,
    "ses-arizalari": `- Telefon görüşmelerinde karşı taraf duyulmuyor\n- Hoparlörden ses gelmiyor, yalnızca titreşim hissediliyor\n- Kulaklık takılı olmasa da cihaz kulaklık modunda kalıyor\n- Sesli arama ve video sesleri birbirinden bağımsız çalışmıyor\n- Ses düzeyi en yüksek konumda bile kısık geliyor`,
    "mikrofon-tamiri": `- Telefon görüşmelerinde karşı taraf sizi duymuyor\n- Sesli mesaj veya video kaydında ses çıkmıyor\n- Hoparlörden telefon sesi geliyor ama mikrofon kayıt yapmıyor\n- Sesle kontrol (asistan) çalışmıyor\n- Yüksek sesli ortamda ses tamamen kayboluyor`,
    "hoparlor-tamiri": `- Aramalar sırasında hoparlörden ses gelmiyor\n- Müzik ve videolarda ses cızırtılı veya kısık çıkıyor\n- Yüksek ses düzeyinde hoparlör titriyor\n- Yalnızca kulaklıkta ses geliyor, hoparlörden gelmiyor\n- Stereo hoparlörden yalnızca bir tanesi çalışıyor`,
    "on-kamera-tamiri": `- Ön kamera görüntüsü donuk veya karanlık\n- Selfie fotoğrafları bulanık çıkıyor\n- Video görüşmelerinde karşı taraf sizi göremez\n- Ön kamera uygulamaları açılmıyor ya da donuyor\n- Face ID / yüz tanıma çalışmıyor`,
    "arka-kamera-tamiri": `- Fotoğraflar bulanık veya odaksız çıkıyor\n- Kamera uygulaması açılınca siyah ekran görünüyor\n- Belirli bir lens (geniş açı/zoom) çalışmıyor\n- OIS mekanizması titreme yaratıyor\n- Flaş çalışıyor ama fotoğraf çekilemiyor`,
    "face-id-tamiri": `- Face ID bir anda çalışmayı durdurdu\n- "Face ID Kullanılamıyor" veya "Face ID'yi Ayarla" uyarısı alınıyor\n- Yüz tanıma yalnızca belirli aydınlatma koşullarında çalışıyor\n- Face ID kurulumu yarıda başarısız oluyor\n- Yüz maskesiyle de kilit açma çalışmıyor`,
    "kamera-cami-tamiri": `- Kamera üzerindeki cam çatlamış ya da kırılmış\n- Fotoğraflarda cam çatlağından kaynaklanan bulanıklık var\n- Cam parçaları dağılmaya başladı\n- Kamera çevresi çizilmiş ama kamera çalışıyor\n- Cam kırığından lens içine toz girmiş`,
    "kasa-degisimi": `- Kasa düşme sonucu bükülmüş veya şekli bozulmuş\n- Köşeler ve kenarlar ciddi şekilde çizilmiş\n- Kasa kırığından su veya toz giriyor\n- Düğmeler kasayla birlikte hasar görmüş\n- Genel görünüm eskimiş, yenilenmesi isteniyor`,
    "arka-kapak-tamiri": `- Arka cam kırılmış veya çatlamış\n- Kablosuz şarj çalışmıyor (anten hasarı)\n- Arka yüzeyden cam parçaları dağılıyor\n- Cihaz tutulmaz hale gelmiş\n- Arka kapak çizilmiş, yenilenmesi isteniyor`,
    "anakart-tamiri": `- Cihaz hiç açılmıyor\n- Ekran tamamen kararıyor, ses devam ediyor\n- Şarj alıyor ama cihaz başlamıyor\n- Belirli uygulamalarda sürekli çöküyor\n- Sıvı temasından sonra cihaz çalışmıyor`,
    "sivi-temasi-tamiri": `- Cihaz suya veya sıvıya düştü\n- Açılmıyor veya ekran titreşiyor\n- Hoparlörden boğuk veya garip ses geliyor\n- Ekranda nem/su izleri görünüyor\n- Şarj soketi düzensiz çalışıyor`,
    "wifi-tamiri": `- WiFi ağları listede görünmüyor\n- Bağlanılıyor ama internet çalışmıyor\n- Bağlantı sürekli kopuyor\n- Yalnızca 2.4GHz bağlanıyor, 5GHz görünmüyor\n- Yönlendiriciye yakın olmasına rağmen sinyal zayıf`,
    "servis-yok-arizasi": `- Telefon "Servis Yok" veya "No Service" gösteriyor\n- SIM kart takılı ama şebeke bulunmuyor\n- Uçak modu açıp kapatmak geçici çözüm sağlıyor\n- Yalnızca acil çağrı yapılabiliyor\n- Başka bir SIM kart takıldığında çalışıyor`,
    "sarj-olmuyor-tamiri": `- Kablo takılmasına rağmen şarj göstergesi çıkmıyor\n- Farklı kablo ve adaptörle denendi, sonuç değişmedi\n- Kablosuz şarj çalışıyor ama kablolu çalışmıyor\n- Şarj göstergesi yanıyor ama yüzde artmıyor\n- Cihaz ısınıyor ama şarj olmuyor`,
    "sarj-entegresi-tamiri": `- Hızlı şarj desteği kayboldu\n- Şarj olmuyor veya çok yavaş oluyor\n- Farklı kablo ve adaptörle aynı sorun yaşanıyor\n- Cihaz yalnızca belirli voltajda şarj alıyor\n- Şarj sırasında cihaz aşırı ısınıyor`,
    "acma-kapama-tusu-tamiri": `- Güç tuşuna basmak ekranı açmıyor\n- Tuş sürekli basılı kalıyor, cihaz kapanıp açılıyor\n- Ekranı uyandırmak için yan tuşa basmak gerekiyor\n- Tuş mekanik tıklama hissi vermiyor\n- Parmak izi (yan tuş) artık çalışmıyor`,
    "on-cam-degisimi": `- Ön yüzey camı çatlamış veya kırılmış\n- Cam parçaları dağılmaya başladı\n- Ekran çalışıyor ama cam kırığı rahatsızlık yaratıyor\n- Parmak camda takılıyor, dokunmatik hassasiyet düşmüş\n- Cam kırığından tozun içeri girmesi endişe yaratıyor`,
  };
  return b[tamirKey] || `- ${markaLabel} ${tamirLabel} belirtileri için servisimize başvurun\n- Ücretsiz ön inceleme ile arıza tespit edilir`;
}

function nedenMap(tamirKey, markaLabel) {
  const n = {
    "ekran-degisimi": `Kırık ekranı ertelemek, küçük bir sorunun büyük bir masrafa dönüşmesine neden olur. Yalnızca cam çatlamışken sadece cam değiştirilerek düşük maliyetle sonuç alınabilir. Ancak hasar OLED/LCD panele ilerlediğinde ekran ve panel birlikte değiştirilir; maliyet iki katına çıkar. Bunun yanı sıra çatlak cam parmak kesebilir ve cihazın su direncini ortadan kaldırır.`,
    "batarya-degisimi": `Şişen batarya yalnızca performans kaybına değil, ekrana ve anakarta fiziksel baskı yaparak çok daha pahalı hasarlara da yol açabilir. İleri düzeyde şişme yangın riski taşıyan tehlikeli bir durumdur. Batarya değişimini zamanında yaptırmak, yüzlerce liralık ekstra tamiri önler ve cihazın güvenli kullanımını sürdürür.`,
    "sarj-soketi-tamiri": `Bozuk şarj soketi cihazın kullanılamaz hale gelmesine neden olabilir. Soket içindeki nem veya toz birikimi zamanla anakartı etkileyerek çok daha pahalı bir arızaya dönüşebilir. Sorun erken müdahaleyle genellikle düşük maliyetle çözülür.`,
    "ses-arizalari": `Ses arızaları genellikle birden fazla bileşeni etkiler. Müdahale geciktikçe sorun yayılabilir ve daha maliyetli bir tamire dönüşebilir. Aramalarda iki taraflı iletişimin çalışmaması iş ve günlük hayatı doğrudan etkiler.`,
    "mikrofon-tamiri": `Mikrofon arızası; sesli aramalar, video konferans ve sesli kayıtları tamamen işlevsiz kılar. Özellikle iş hayatında kritik olan bu sorunun gecikmeden çözülmesi gerekir. Üstelik mikrofon arızası bazen şerit kablo hasarından kaynaklandığından erken teşhis ek maliyeti önler.`,
    "hoparlor-tamiri": `Hoparlör arızasında ses tamamen kesilirse acil aramalarda bile konuşmak güçleşir. Toz birikiminden kaynaklanan sorunlar temizlikle çözülebilirken yıpranmış hoparlör mutlaka değiştirilmelidir. Erken müdahale, arızanın şerit kabloya veya anakarta yayılmasını önler.`,
    "on-kamera-tamiri": `Ön kamera arızası; video görüşmeleri, kimlik doğrulama ve fotoğraf çekimini engeller. iPhone'da Face ID devre dışı kalır; bu durum cihazın kilidini açmayı güçleştirir. Erken müdahale, sensör sisteminin zarar görmesini önler.`,
    "arka-kamera-tamiri": `Arka kamera arızası modern akıllı telefonların en çok kullanılan özelliğini devre dışı bırakır. OIS mekanizmasındaki sorun anakart bağlantılarını zorlayabilir. Cam kırığı lens içine toz ve nem girerek kalıcı hasara yol açabilir.`,
    "face-id-tamiri": `Face ID devre dışı kaldığında cihaz yalnızca şifreyle açılabilir. Bu yalnızca bir güvenlik sorunu değil, Apple Pay ve uygulama şifrelerini de etkiler. Erken müdahale TrueDepth kamera sisteminin geri alınamaz hasarını önler.`,
    "kamera-cami-tamiri": `Çatlak kamera camı lens içine toz ve nem girmesine zemin hazırlar. Cam içindeki optik sapma fotoğraf ve video kalitesini kalıcı olarak düşürür. Değişim gecikildiğinde lens modülünün tamamı hasar görebilir; bu da çok daha maliyetli bir tamire dönüşür.`,
    "kasa-degisimi": `Hasarlı kasa iç bileşenleri dış etkenlere karşı savunmasız bırakır. Bükülmüş kasa anakart ve batarya üzerine sürekli baskı uygulayarak uzun vadede ek arızalara neden olur. Erken kasa değişimi cihazın ömrünü uzatır.`,
    "arka-kapak-tamiri": `Kırık arka kapak kablosuz şarjı ve NFC'yi devre dışı bırakabilir. Cam parçaları dağıldığında cihazı tutmak güçleşir ve el kesebilir. IP koruma contaları da hasar gördüğünden sıvı teması riski artar.`,
    "anakart-tamiri": `Anakart arızası cihazın tamamen işlevsiz kalmasına yol açabilir. Müdahale gecikildiğinde hasar genişler ve onarım imkânsız hale gelebilir. Uzman chip-level onarımla cihaz yeniden işler hale getirilebilir; bu yeni cihaz almaktan çok daha ekonomiktir.`,
    "sivi-temasi-tamiri": `Sıvı temasında en kritik faktör müdahale hızıdır. Ne kadar erken servise getirilirse o kadar az bileşen hasar görür. Cihazı şarj etmek veya açmaya çalışmak kısa devreye neden olarak hasarı hızla genişletir.`,
    "wifi-tamiri": `WiFi arızası cihazı yalnızca mobil veriyle sınırlar; bu hem masraflı hem yetersizdir. Sorun yazılım kaynaklıysa ücretsiz çözülür; donanım kaynaklıysa entegre değiştirilir. Erken teşhis hangi yolun izleneceğini belirleyerek gereksiz harcamayı önler.`,
    "servis-yok-arizasi": `Şebeke bağlantısı olmadan cihaz arama ve SMS işlevini kaybeder. Sorun SIM kart okuyucudan veya anten kablosundan kaynaklanıyorsa düşük maliyetle çözülür. Anakart seviyesindeki arızalarda erken müdahale tedavinin başarısını artırır.`,
    "sarj-olmuyor-tamiri": `Şarj olmayan cihaz tamamen kullanılamaz hale gelir. Soket toz birikiminden kaynaklanıyorsa temizlikle hızlıca çözülür. Geciken müdahale şarj entegresini etkiyerek daha pahalı bir tamire neden olabilir.`,
    "sarj-entegresi-tamiri": `Şarj entegresi arızası hızlı şarjı devre dışı bırakır; uzun vadede bataryayı da olumsuz etkiler. Chip-level onarımla entegre değiştirilebilir; bu, yeni cihaz almaktan çok daha ekonomiktir.`,
    "acma-kapama-tusu-tamiri": `Güç tuşunun çalışmaması ekranı uyandırmayı ve acil yeniden başlatmayı imkânsız kılar. Sürekli basılı kalan tuş pil ömrünü tüketir ve cihazı döngüye sokar. Erken müdahale basit bir mekanik değişimle sorunu çözer.`,
    "on-cam-degisimi": `Ön cam yalnızca estetik bir sorun değildir; parçalanan cam parmak kesebilir ve ekrana zarar verebilir. Oleofobik kaplama çatlak camla birlikte işlevsiz kalır. Erken değişim ekranın ve sensörlerin korunmasını sağlar.`,
  };
  return n[tamirKey] || `${markaLabel} ${tamirKey} sorununun gecikmeden çözülmesi ek hasar riskini önler. Ücretsiz ön inceleme için Vip İletişim'e başvurun.`;
}

function surecMap(tamirKey, markaLabel) {
  const adimlar = {
    "ekran-degisimi": [
      ["Ücretsiz Ön İnceleme", "Ekranın yanı sıra dokunmatik, Face ID sensörleri ve iç bileşenler kontrol edilir."],
      ["Güvenli Açılım", "Isı ve özel el aletleriyle kasa açılır; IP contaları korunur."],
      ["Panel Değişimi", "Hasarlı ekran çıkarılır; yeni panel hassas biçimde bağlanır."],
      ["Dokunmatik + Görüntü Testi", "Tüm ekran bölgelerinde renk doğruluğu ve dokunmatik hassasiyet test edilir."],
      ["Conta Yenileme + Teslim", "IP koruma contaları yenilenerek cihaz kapatılır; garantiyle teslim edilir."],
    ],
    "batarya-degisimi": [
      ["Kapasite ve Sağlık Testi", "Mevcut bataryanın kapasitesi ve şarj döngüsü profesyonel ekipmanla ölçülür."],
      ["Güvenli Söküm", "Batarya yapışkanlığı özel solüsyonla çözülerek kasa veya ekrana zarar vermeden çıkarılır."],
      ["Orijinal Kapasite Batarya Takımı", "Sertifikalı, orijinal kapasite değerlerine sahip batarya takılır."],
      ["Kalibrasyon ve Test", "Yeni bataryanın doğru ölçüm yapması için kalibrasyon döngüsü tamamlanır."],
      ["Garantili Teslim", "Cihaz çalışma testi yapılarak garantiyle teslim edilir."],
    ],
  };
  const varsayilan = [
    ["Ücretsiz Ön İnceleme", "Arızanın kaynağı ve boyutu ücretsiz olarak tespit edilir."],
    ["Net Fiyat Bildirimi", "İşleme başlamadan önce onayınız alınır; reddetme hakkınız saklıdır."],
    ["Orijinal Parça Takımı", "Sertifikalı OEM veya orijinal parçayla müdahale gerçekleştirilir."],
    ["Kapsamlı Test", "Tamir edilen bileşen ve bağlı tüm fonksiyonlar test edilir."],
    ["Garantili Teslim", "İşçilik garantisiyle cihaz teslim edilir."],
  ];
  const s = adimlar[tamirKey] || varsayilan;
  return s.map((a, i) => `${i + 1}. **${a[0]}:** ${a[1]}`).join("\n");
}

function veriMap(tamirKey) {
  const veri = [
    `Bu tamir işleminde verileriniz güvende kalır. Depolama birimine erişilmez; yalnızca ilgili donanım bileşeni değiştirilir. Fotoğraf ve uygulamalarınız tamir öncesi ve sonrası aynı şekilde cihazınızda yer alır.`,
    `Tamir sırasında kişisel verilerinize kesinlikle dokunulmaz. Teknisyenlerimiz yalnızca arızalı bileşen üzerinde çalışır; mesajlarınız, fotoğraflarınız ve uygulamalarınız güvende kalır.`,
    `İşlem süresince cihazınızın depolama birimine müdahale edilmez. Tüm verileriniz korunur; tamir tamamlandıktan sonra cihazınız eksiksiz teslim edilir.`,
  ];
  const idx = ["ekran-degisimi", "batarya-degisimi", "anakart-tamiri", "sivi-temasi-tamiri"].indexOf(tamirKey);
  return veri[Math.max(0, idx % 3)];
}

function fiyatMap(tamirKey, markaLabel) {
  return `${markaLabel} ${tamirKey.replace(/-/g, " ")} ücreti; kullanılacak parçanın orijinallik düzeyine, cihazın modeline ve mevcut durumuna göre belirlenir. İşleme başlamadan önce [ücretsiz ön inceleme](/iletisim) yaparak net fiyatı paylaşıyoruz; onaylamazsanız herhangi bir ücret talep etmiyoruz. Güncel fiyat bilgisi ve randevu için WhatsApp veya telefon hattımızdan bize ulaşabilirsiniz.\n\n**Kargo ile Tamir:** Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan [teknik servisimize](/tamir-hizmetleri) kargo ile cihaz gönderebilirsiniz. Tamir sonrası adresinize göndeririz.`;
}

// ─── SSS ÜRETİCİSİ ───────────────────────────────────────────────────────────

function sssUret(marka, markaLabel, tamirKey, tamirLabel) {
  const sss = [
    {
      soru: `${markaLabel} ${tamirLabel} ne kadar sürer?`,
      cevap: `Çoğu durumda 30–90 dakika içinde teslim yapılır. Parça stokta mevcutsa aynı gün servisini tamamlarız. Ek hasar tespiti veya anakart müdahalesi gereken durumlarda süre uzayabilir; bu konuda sizi önceden bilgilendiririz.`,
    },
    {
      soru: `${markaLabel} ${tamirLabel} fiyatı ne kadar?`,
      cevap: `Net fiyat, cihaz servis bankosunda incelendikten sonra paylaşılır. Ön inceleme tamamen ücretsizdir; fiyatı onaylamazsanız herhangi bir ödeme yapmanız gerekmez. Güncel bilgi için WhatsApp hattımızdan ulaşabilirsiniz.`,
    },
    {
      soru: `${tamirLabel} sırasında verilerim silinir mi?`,
      cevap: `Hayır, verileriniz güvende. Fotoğraf, mesaj ve uygulamalarınıza müdahale edilmez. Yine de işlem öncesinde iCloud, Google veya bilgisayar yedeği almanızı öneririz.`,
    },
    {
      soru: `Trabzon dışından tamir yaptırabilir miyim?`,
      cevap: `Evet, kargo ile tamir yapıyoruz. Giresun, Rize, Artvin, Gümüşhane ve Bayburt'tan cihazınızı bize gönderebilirsiniz. Tamir tamamlandıktan sonra adresinize kargolanır. Detaylar için WhatsApp hattımızdan bilgi alabilirsiniz.`,
    },
    {
      soru: `Tamir sonrası garanti sunuluyor mu?`,
      cevap: `Evet. Tüm tamir işlemlerimize işçilik garantisi verilir. Anakart ve kapsamlı işlemlerde 90 gün garanti uygulanır. Garanti kapsamı ve süresi teslim sırasında yazılı olarak bildirilir.`,
    },
    {
      soru: `Orijinal parça mı kullanılıyor?`,
      cevap: `Evet, orijinal veya OEM kalitesinde sertifikalı parça kullanılır. Hangi parçanın takıldığı işlem başlamadan önce size bildirilir. Daha düşük maliyetli alternatif parça tercih etmek isterseniz bu seçeneği de sunabiliriz; karar tamamen sizindir.`,
    },
  ];
  return sss;
}

// ─── ANA ÜRETİM ──────────────────────────────────────────────────────────────

let toplam = 0;

for (const marka of MARKALAR) {
  for (const tamir of TAMIRLER) {
    if (tamir.sadeceiPhone && marka.key !== "iphone") continue;

    const slug = `${marka.key}-${tamir.key}`;
    const outPath = path.join(DIR, `${slug}.json`);

    if (fs.existsSync(outPath)) {
      console.log(`⏭  ${slug} (mevcut)`);
      continue;
    }

    const icerik = icerikUret(marka.key, marka.label, tamir.key, tamir.label);
    const sss = sssUret(marka.key, marka.label, tamir.key, tamir.label);

    const data = {
      slug,
      marka: marka.key,
      markaLabel: marka.label,
      tamirKey: tamir.key,
      tamirLabel: tamir.label,
      title: `${marka.label} ${tamir.label}`,
      metaDescription: `Trabzon'da ${marka.label} ${tamir.label.toLowerCase()} için Vip İletişim Teknik Servis. Orijinal parça, aynı gün teslim, 90 gün garanti. Ücretsiz ön inceleme için arayın.`,
      icerik,
      sss,
      desteklenenModeller: marka.modeller.map((m) => ({ model: m, aktif: true })),
    };

    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`✓ ${slug}`);
    toplam++;
  }
}

console.log(`\n${toplam} sayfa oluşturuldu.`);
