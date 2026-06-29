import type { ModelSpec } from '@/data/model-specs';

export type RepairContent = {
  intro: string;
  symptomsHeading: string;
  symptoms: string[];
  whyHeading: string;
  why: string;
  processHeading: string;
  processSteps: { title: string; desc: string }[];
  dataSafeHeading: string;
  dataSafe: string;
  priceHeading: string;
  price: string;
  expertNote: string;
};

type Generator = (model: string, brand: string, spec: ModelSpec | null) => RepairContent;

const generators: Record<string, Generator> = {

  'ekran-degisimi': (model, _brand, spec) => {
    const screenDesc = spec?.screen ?? 'ekran paneli';
    const isOled = screenDesc.toLowerCase().includes('oled') || screenDesc.toLowerCase().includes('amoled');
    const isProMotion = spec?.hz === 120 && isOled;
    const hasDI = spec?.dynamicIsland ?? false;
    const screenNote = isProMotion
      ? `${model}'ın ${screenDesc} ekranı ${spec!.hz}Hz ProMotion adaptif yenileme hızıyla üstün kaydırma akıcılığı sunar.`
      : `${model}'ın ${screenDesc} ekranı, yüksek dokunma hassasiyeti ve renk doğruluğuyla öne çıkar.`;
    const burnNote = isOled
      ? 'OLED panelde yanma izi veya donuk görüntü kalıntısı oluşmuş'
      : 'Arka aydınlatma arızası nedeniyle ekran karanlık, telefon çalışıyor';
    const diNote = hasDI
      ? 'Dynamic Island bölgesinde renk dönüşümü veya dokunma hatalıysa ekran modülünün tamamı değiştirilmelidir.'
      : 'Ekran değişiminde sensör şeritlerinin bağlantısı korunarak işlem gerçekleştirilir.';
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} ekran değişimi, Trabzon'da Vip İletişim Teknik Servis'in en sık gerçekleştirdiği tamir işlemlerinden biridir. ${screenNote} Düşme, darbe veya üretim kaynaklı ekran arızaları hem görsel hem de dokunmatik işlev kaybına neden olur. ${model} için orijinal ya da OEM kalitesinde panel kullanılarak yapılan ekran değişimi, cihazınızı fabrika çıkışı kalitesine döndürür.\n\nTrabzon'da ${model} ekran değişimi için uzman desteği almak istiyorsanız, Vip İletişim'e uğramak ya da WhatsApp hattımızdan ulaşmak yeterlidir. Ücretsiz ön inceleme sonrası net fiyat bildirimi yapılır; onaylamazsanız herhangi bir ücret alınmaz.`,
      symptomsHeading: `${model} Ekranı Ne Zaman Değiştirilmeli?`,
      symptoms: [
        'Ekran camı çatlamış veya kırılmış, cam parçaları ayrılıyor',
        'Dokunmatik tepki vermiyor ya da yanlış koordinatta algılıyor',
        'Görüntüde siyah leke, mor-yeşil renk kayması veya yatay-dikey çizgiler var',
        'Ekran tamamen karanlık ancak telefon çalışıyor (arka aydınlatma sorunu)',
        burnNote,
        'Kenar kırığından sızan nem ekranı içten etkiliyor',
      ],
      whyHeading: `${model} Ekran Değişimini Neden Geciktirmemelisiniz?`,
      why: `Kırık ekranla kullanıma devam edildiğinde cam kesikleri yaralanma riskine yol açar; aynı zamanda ${isOled ? 'OLED' : 'LCD'} panelin zarar görme ihtimali her geçen gün artar. Çatlak camdan giren toz ve nem, anakartı olumsuz etkileyebilir. Erkenden yapılan ${model} ekran değişimi, hem daha ekonomik hem de cihazınızın uzun vadeli sağlığı açısından kritik öneme sahiptir.`,
      processHeading: `Trabzon'da ${model} Ekran Değişimi Nasıl Yapılır?`,
      processSteps: [
        { title: 'Ücretsiz Ön İnceleme', desc: `${model} cihazınız ücret alınmadan incelenir; ekran hasarının boyutu ve dokunmatik durumu test edilir.` },
        { title: 'Orijinal Panel Takımı', desc: `OEM veya orijinal kalitesinde ${screenDesc} modülü, özel ısı ve vakum aparatlarıyla hassasiyetle yerleştirilir.` },
        { title: 'Dokunmatik ve Renk Kalibrasyonu', desc: 'Yeni ekranın dokunma hassasiyeti, parlaklık dengesi ve renk profili test edilir.' },
        { title: 'Kalite Testi ve Teslim', desc: 'Tüm tuşlar, kameralar ve sensörler çalışır durumdayken cihazınız teslim edilir.' },
      ],
      dataSafeHeading: `${model} Ekran Değişiminde Verilerim Silinir mi?`,
      dataSafe: `Ekran değişimi yalnızca donanımsal bir işlemdir; yazılıma ve depolama birimine müdahale edilmez. Fotoğraflarınız, uygulamalarınız ve kişisel verileriniz eksiksiz korunur. Yine de ihtiyati tedbir amacıyla işlem öncesinde yedek almanızı öneririz.`,
      priceHeading: `Trabzon'da ${model} Ekran Değişimi Fiyatı`,
      price: `${model} ekran değişimi ücreti, kullanılacak panel kalitesine (orijinal, OEM, muadil) ve cihazın genel durumuna göre belirlenir. İşleme başlamadan önce size net fiyat bildirilir; onaylamazsanız ücret alınmaz. Güncel fiyat için WhatsApp hattımızı ya da telefonu kullanabilirsiniz.`,
      expertNote: isOled
        ? `${model}'ın ${screenDesc} ekranında muadil panel kullanımı renk doğruluğunu ve True Tone/Always-On işlevini olumsuz etkileyebilir. ${diNote} Bu nedenle Vip İletişim, ${model} için OEM kalite panel tercih etmektedir.`
        : `${model}'ın ${screenDesc} ekranında kaliteli OEM panel kullanımı hem maliyet hem görüntü kalitesi açısından optimum seçimdir. ${diNote}`,
    };
  },

  'batarya-degisimi': (model, brand, spec) => {
    const mah = spec?.battery ? `${spec.battery} mAh kapasiteli ` : '';
    const hasMagSafe = spec?.magSafe ?? false;
    const isIphone = brand === 'iphone';
    const healthCheck = isIphone
      ? 'iPhone pil sağlığı Ayarlar > Pil > Pil Sağlığı bölümünden izlenebilir; %80\'in altı değişim işareti'
      : `${model} pil kapasitesi izleme uygulamalarıyla takip edilebilir; belirgin düşüş değişim gerektirir`;
    const magSafeNote = hasMagSafe
      ? ` MagSafe batarya pakedi kullananlar için yeni batarya takılmasının ardından manyetik hizalamanın kontrol edilmesi önerilir.`
      : '';
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} batarya değişimi, cihazın performansını ve günlük kullanım süresini doğrudan etkileyen kritik bir tamir işlemidir. ${model}'ın ${mah}lityum-iyon pili her şarj döngüsünde küçük bir kapasite kaybeder; belirli bir eşiğin altına düştüğünde cihazı yavaşlatabilir ya da beklenmedik kapanmalara yol açabilir. Trabzon'da ${model} batarya değişimi için Vip İletişim Teknik Servis'i tercih eden kullanıcılar cihazlarını aynı gün teslim almaktadır.\n\nOrijinal kapasite değerlerine sahip yeni batarya takıldığında telefon sanki yeni çıkmış gibi çalışmaya başlar. Şarj süreleri ve performans kısıtlamaları ortadan kalkar.${magSafeNote}`,
      symptomsHeading: `${model} Batarya Değişimi Gerektiğinin Belirtileri`,
      symptoms: [
        'Sabah tam şarjla başlayan telefon öğleden önce uyarı veriyor',
        'Pil yüzdesi bir anda yüksek rakamdan düşük rakama atlıyor',
        'Telefon %20–30 şarjdayken kendiliğinden kapanıyor',
        'Batarya şişmiş; arka kapak ya da ekran hafifçe ayrılmış',
        healthCheck,
        'Cihaz yoğun kullanımda aşırı ısınıyor',
      ],
      whyHeading: `${model} Batarya Neden Zamanında Değiştirilmeli?`,
      why: `Şişen bir batarya yalnızca performans kaybına değil, ekrana ve anakarta fiziksel baskı yaparak çok daha pahalı hasarlara da yol açabilir. İleri düzeyde şişme, yangın riski taşıyan tehlikeli bir durumdur. ${model}'ın ${mah}bataryasını zamanında değiştirmek, yüzlerce liralık ekstra tamiri önler ve cihazınızın güvenli kullanımını sürdürür.`,
      processHeading: `${model} Batarya Değişimi Süreci`,
      processSteps: [
        { title: 'Kapasite ve Sağlık Testi', desc: `${model} bataryasının mevcut kapasitesi ve şarj döngüsü sayısı profesyonel ekipmanla ölçülür.` },
        { title: 'Güvenli Söküm', desc: 'Batarya yapışkanlığı özel solüsyonla çözülerek kasa veya ekrana zarar vermeden çıkarılır.' },
        { title: 'Orijinal Kapasite Batarya Takımı', desc: `${mah ? mah + 'kapasitesinde ' : ''}sertifikalı, orijinal kapasite değerlerine sahip batarya takılır.` },
        { title: 'Kalibrasyon ve Teslim', desc: 'Yeni bataryanın doğru ölçüm yapması için kısa bir kalibrasyon döngüsü tamamlanır.' },
      ],
      dataSafeHeading: `${model} Batarya Değişiminde Veriler Güvende mi?`,
      dataSafe: `Batarya değişimi sırasında cihazınızın depolama birimine müdahale edilmez. Tüm verileriniz korunur. İşlem esnasında cihaz birkaç dakika kapalı kalabilir; bu normal bir prosedürdür.`,
      priceHeading: `${model} Batarya Değişimi Fiyatı — Trabzon`,
      price: `${model} batarya değişimi ücreti kullanılacak bataryanın orijinallik düzeyine ve cihazın modeline göre değişir. Ücret bilgisi ve randevu için WhatsApp veya telefon hattımızdan bize ulaşabilirsiniz.`,
      expertNote: hasMagSafe
        ? `${model} MagSafe destekli bir cihaz olduğundan manyetik sarım içeren orijinal kapasiteli batarya kullanılması önemlidir. Şişen bataryayla cihazı şarj etmeyin; servisimize en kısa sürede getirmenizi öneririz.`
        : 'Şişen bataryayla cihazı şarj etmeyin; ısı kaynağına yaklaştırmayın. Servisimize en kısa sürede getirmenizi öneririz.',
    };
  },

  'sarj-soketi-tamiri': (model, _brand, spec) => {
    const port = spec?.port ?? 'USB-C';
    const portName = port === 'Lightning' ? 'Lightning' : 'USB-C';
    const portNote = port === 'Lightning'
      ? `${model}, Apple'ın Lightning konektörünü kullanır; bu porta özgü temizleme ve değişim işlemleri standart USB-C servisinden farklıdır.`
      : `${model}, evrensel USB-C konektörünü kullanır; hızlı şarj ve veri aktarımı bu port üzerinden yürütülür.`;
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} ${portName} şarj soketi tamiri, cihazın en temel işlevini — şarj olmayı ve veri aktarımını — doğrudan etkileyen önemli bir tamir hizmetidir. ${portNote} ${portName} soketleri günlük takılıp çıkarma işlemleriyle yıpranır; ayrıca toz, kir ve nem birikimi bağlantı sorunlarına yol açar. Trabzon'da ${model} şarj soketi tamiri için Vip İletişim'e başvurabilirsiniz.\n\nÜcretsiz ön inceleme sırasında soketin fiziksel durumu ve anakart bağlantısı test edilir; temizlik mi yoksa değişim mi gerektiği netleştirilir.`,
      symptomsHeading: `${model} Şarj Soketi Arızasının Belirtileri`,
      symptoms: [
        `${portName} kablo takıldığında şarj simgesi görünmüyor veya geç görünüyor`,
        'Şarj kablosunu belirli açıda tutmak gerekiyor',
        'Bilgisayara bağlanıldığında cihaz tanınmıyor',
        'Sokette toz ya da yabancı cisim birikmesi görülüyor',
        'Hızlı şarj çalışmıyor, standart şarj da kesiliyor',
        'Şarj esnasında soket ısınıyor',
      ],
      whyHeading: `${model} Şarj Soketi Arızası Neden İhmal Edilmemeli?`,
      why: `Şarj soketi arızası zamanla derinleşir. Başlangıçta küçük bir kablo açısı sorunu, gecikildiğinde ${portName} soket pinlerinin kırılmasına ve anakart üzerindeki bağlantı noktalarının hasar görmesine dönüşebilir. Erken müdahale çoğunlukla yalnızca soket temizliğiyle çözülürken; geciken müdahale pahalı anakart tamirini gerektirebilir. ${model} için zamanında yapılan şarj soketi tamiri maliyeti önemli ölçüde düşürür.`,
      processHeading: `Trabzon'da ${model} Şarj Soketi Tamiri`,
      processSteps: [
        { title: 'Tanı ve İnceleme', desc: `${portName} soketinin fiziksel durumu, pin sağlamlığı ve anakart bağlantısı test edilir.` },
        { title: 'Temizlik veya Değişim', desc: 'Toz birikimi varsa ultrasonik temizleme yapılır; fiziksel hasar varsa soket modülü değiştirilir.' },
        { title: 'Şarj ve Veri Aktarım Testi', desc: 'Farklı kablo ve adaptörlerle şarj hızı ve veri aktarımı kontrol edilir.' },
        { title: 'Teslim', desc: 'Cihazınız çalışır hâlde teslim edilir; ortalama işlem süresi 30–60 dakikadır.' },
      ],
      dataSafeHeading: `Şarj Soketi Tamirinde Verilerim Etkilenir mi?`,
      dataSafe: `${model} şarj soketi tamiri fiziksel bir donanım işlemidir; yazılım veya depolama birimine müdahale edilmez. Verileriniz güvendedir.`,
      priceHeading: `${model} Şarj Soketi Tamiri Fiyatı — Trabzon`,
      price: `Şarj soketi tamiri ücreti, yalnızca temizlik mi yoksa tam değişim mi gerektiğine göre farklılık gösterir. Ücretsiz ön inceleme sonrası net fiyat bildirilir.`,
      expertNote: `${portName} soketini temizlemeden önce kürdan veya metal cisim kullanmayın; pin hasarı onarım maliyetini katlayabilir.`,
    };
  },

  'ses-arizalari': (model, _brand, spec) => {
    const chip = spec?.chip ? `${spec.chip} işlemcili ` : '';
    const year = spec?.year ? `${spec.year} yılı ` : '';
    return {
      intro: `${year}${chip}${model} ses arızası, konuşma kalitesini ve medya deneyimini doğrudan etkileyen yaygın bir teknik sorundur. Ses entegresi (audio IC), anten veya hoparlör bağlantısından kaynaklanan bu arızalar; bazen darbe, bazen nem, bazen ise yazılım güncellemesi sonrasında ortaya çıkar. Trabzon'da ${model} ses arızası tamiri için Vip İletişim'in uzman kadrosu profesyonel test ekipmanlarıyla kesin tanı koyar.\n\nDoğru tanı olmadan gereksiz parça değişimi yapılmasının önüne geçmek için kapsamlı ses testi uygulanır; ardından en ekonomik ve kalıcı çözüm hayata geçirilir.`,
      symptomsHeading: `${model} Ses Arızası Belirtileri`,
      symptoms: [
        'Telefon görüşmelerinde karşı taraf duyulmuyor ya da ses çok kısık',
        'Zil, bildirim ve medya sesi çıkmıyor',
        'Ses açma/kapama tuşu çalışmıyor veya düzensiz davranıyor',
        'Kulaklık takılıyken ses hoparlörden çıkmaya devam ediyor',
        'Belirli uygulamalarda ses çalışıyor; diğerlerinde çalışmıyor',
        'Sesli yardımcı uyarıları alınıyor ama zil sesi duyulmuyor',
      ],
      whyHeading: `${model} Ses Sorunu Neden Uzman Tanı Gerektiriyor?`,
      why: `Ses arızaları birden fazla bileşeni kapsayabilir: hoparlör, mikrofon, ses entegresi veya anakart üzerindeki bağlantı pinleri. Belirtiler aynı olsa da neden farklıdır; bu yüzden tanısız yapılan müdahale hem zaman hem de para kaybına yol açar. Vip İletişim, ${model} ses arızasında önce sinyal testi ve bileşen izolasyonu uygular, sonra hedefe yönelik tamir gerçekleştirir.`,
      processHeading: `${model} Ses Arızası Tamir Süreci`,
      processSteps: [
        { title: 'Çok Kanallı Ses Testi', desc: 'Hoparlör, mikrofon, kulaklık girişi ve ses IC bağımsız olarak test edilir.' },
        { title: 'Bileşen İzolasyonu', desc: 'Arızanın kaynağı — yazılım, donanım ya da bağlantı sorunu — kesin olarak belirlenir.' },
        { title: 'Hedefli Tamir', desc: 'Yalnızca arızalı bileşen değiştirilir; gereksiz parça maliyeti önlenir.' },
        { title: 'Tam Ses Kontrolü', desc: 'Tüm ses kanalları teslimden önce doğrulanır.' },
      ],
      dataSafeHeading: `Ses Tamiri Sırasında Verilerim Silinir mi?`,
      dataSafe: `${model} ses arızası tamiri donanım düzeyinde bir işlemdir. Cihazınızdaki veriler, uygulamalar ve ayarlar etkilenmez.`,
      priceHeading: `${model} Ses Arızası Tamiri Fiyatı — Trabzon`,
      price: `Ses arızası tamir ücreti arızanın kaynağına göre farklılık gösterir; hoparlör değişimi ile ses IC tamiri farklı işlemlerdir. Kesin fiyat için ücretsiz ön inceleme yaptırın.`,
      expertNote: 'Ses arızasını yazılım güncellemesiyle çözmeye çalışmadan önce servis tanısı yaptırmanızı öneririz; yanlış müdahale arızayı kalıcı hâle getirebilir.',
    };
  },

  'mikrofon-tamiri': (model, _brand, spec) => {
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} mikrofon tamiri, telefon görüşmeleri ve ses kayıtlarının kalitesini belirleyen kritik bir tamir hizmetidir. Mikrofon arızası olan bir cihazda karşı taraf sizi duyamaz; sesli asistan ve ses kaydı işlevleri devre dışı kalır. Trabzon'da ${model} mikrofon tamiri için Vip İletişim'e başvurduğunuzda, sorunun birincil mikrofon mu yoksa ikincil gürültü önleyici mikrofon mu olduğu önce tanılanır.\n\nDoğru tanı; gereksiz parça değişimini önler ve tamirin kalıcı olmasını sağlar.`,
      symptomsHeading: `${model} Mikrofon Arızasının Belirtileri`,
      symptoms: [
        'Telefon görüşmelerinde karşı taraf sizi duymuyor veya sesiniz çok kısık geliyor',
        'Ses kaydı uygulamalarında hiç ses kaydedilemiyor',
        'Video çekimlerinde görüntü var ama ses yok',
        'Sesli asistan (Siri, Google) komutları algılamıyor',
        'WhatsApp sesli mesajlarda ses çok bozuk veya hiç yok',
        'Eller serbest arama sırasında sorun yok ama normal görüşmede var',
      ],
      whyHeading: `${model} Mikrofon Neden Arızalanır?`,
      why: `Mikrofon arızaları genellikle üç nedenden kaynaklanır: fiziksel darbe sonrası bağlantı kopması, toz ve nem birikiminin iletkenliği düşürmesi veya üretim hatasından kaynaklanan erken yıpranma. Modern akıllı telefonlar birden fazla mikrofona sahiptir; biri arızalanınca diğerleri tam işlev görmeyebilir. ${model} için uzman tanısı, hangi mikrofonun değiştirileceğini kesin olarak belirler.`,
      processHeading: `Trabzon'da ${model} Mikrofon Tamiri`,
      processSteps: [
        { title: 'Çoklu Mikrofon Testi', desc: 'Birincil, ikincil ve gürültü önleyici mikrofon ayrı ayrı test edilir.' },
        { title: 'Temizlik veya Değişim', desc: 'Toz birikiminde temizleme uygulanır; hasar varsa mikrofon modülü değiştirilir.' },
        { title: 'Ses Kayıt Testi', desc: 'Farklı uygulamalarla ses kalitesi ve hassasiyet kontrol edilir.' },
        { title: 'Teslim', desc: 'Ortalama 30–60 dakikada tamamlanan işlem sonrası cihaz teslim edilir.' },
      ],
      dataSafeHeading: `Mikrofon Tamirinde Veriler Etkileniyor mu?`,
      dataSafe: `${model} mikrofon değişimi donanımsal bir işlemdir; verileriniz, uygulama ayarlarınız ve hesaplarınız tamamen korunur.`,
      priceHeading: `${model} Mikrofon Tamiri Fiyatı — Trabzon`,
      price: `Mikrofon tamiri ücreti, yalnızca temizlik mi yoksa modül değişimi mi gerektiğine göre değişir. Kesin fiyat için ücretsiz ön inceleme yaptırın.`,
      expertNote: 'Mikrofon deliklerini iğne veya kürdan gibi sert cisimlerle temizlemeye çalışmayın; mikrofon zarı kalıcı olarak hasar görebilir.',
    };
  },

  'hoparlor-tamiri': (model, _brand, spec) => {
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} hoparlör tamiri, medya sesi ve handsfree görüşme kalitesini yenileyen önemli bir teknik hizmettir. Alt hoparlör (speakerphone) ile kulak hoparlörü (earpiece) birbirinden farklı bileşenlerdir ve her ikisi de ayrı arızalanabilir. Trabzon'da ${model} hoparlör tamiri için Vip İletişim; hangi hoparlörün sorunlu olduğunu tanılar, yalnızca gerekli parçayı değiştirir.\n\nHoparlör tamiri çoğunlukla 30–45 dakikada tamamlanır ve aynı gün teslim yapılır.`,
      symptomsHeading: `${model} Hoparlör Arızasının Belirtileri`,
      symptoms: [
        'Müzik, video ve uygulama seslerinde ses çıkmıyor veya çok kısık',
        'Hoparlörden cızırtı, titreme ya da bozuk ses geliyor',
        'Speakerphone (hopsfree) çalışmıyor; yalnızca kulaklıkla ses duyuluyor',
        'Kulak hoparlöründen ses gelmiyor, arama sırasında sessizlik var',
        'Belirli ses seviyelerinde titreşim veya çıtırtı oluşuyor',
      ],
      whyHeading: `${model} Hoparlörü Neden Arızalanır?`,
      why: `Hoparlörler hem fiziksel titreşime hem de neme karşı duyarlıdır. Yüksek ses seviyesinde uzun süreli kullanım, nem teması veya düşme hasarı hoparlör zarını ya da iletken katmanını bozabilir. İki hoparlörden birinin arızalanması genellikle her ikisinin değiştirilmesini gerektirmez; ${model} için hedefli tamir hem daha hızlı hem de daha ekonomiktir.`,
      processHeading: `${model} Hoparlör Tamiri Süreci`,
      processSteps: [
        { title: 'Hoparlör İzolasyon Testi', desc: 'Alt ve üst hoparlör ayrı ayrı ses çıkışı için test edilir.' },
        { title: 'Modül Değişimi', desc: 'Arızalı hoparlör modülü temiz bir şekilde sökülerek yenisi takılır.' },
        { title: 'Frekans ve Ses Kalitesi Testi', desc: 'Farklı ses seviyelerinde titreşim ve bozulma olup olmadığı kontrol edilir.' },
        { title: 'Teslim', desc: 'Aynı gün teslim ile cihazınız çalışır hâlde size verilir.' },
      ],
      dataSafeHeading: `Hoparlör Değişiminde Veriler Güvende mi?`,
      dataSafe: `${model} hoparlör değişimi yalnızca donanım içerir; cihazınızdaki veriler, uygulamalar ve hesaplar etkilenmez.`,
      priceHeading: `${model} Hoparlör Tamiri Fiyatı — Trabzon`,
      price: `Hoparlör tamir ücreti, hangi hoparlörün (alt ya da üst) arızalı olduğuna göre belirlenir. Ücretsiz ön inceleme sonrası net fiyat bildirilir.`,
      expertNote: 'Hoparlör problemi önce yazılım sıfırlamasıyla çözülmeye çalışılabilir; ancak yazılım müdahalesi ses donanımı arızasını gidermez, uzman tanısı tercih edilmelidir.',
    };
  },

  'on-kamera-tamiri': (model, _brand, spec) => {
    const hasFaceId = spec?.faceId ?? false;
    const hasDI = spec?.dynamicIsland ?? false;
    const biometricNote = hasFaceId
      ? (hasDI
        ? `${model}'ın Dynamic Island içindeki TrueDepth kamera sistemi hem Face ID'yi hem de selfie kamerasını barındırır; değişim sırasında bu alanın bütünlüğü korunmak zorundadır.`
        : `${model}'ın ön çentiğindeki (notch) TrueDepth kamera sistemi Face ID işlevini de yürütür; değişim hassasiyet gerektirir.`)
      : `${model}'ın ön kamerası yüksek kaliteli selfie ve video konferans deneyimi için optimize edilmiştir.`;
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} ön kamera tamiri; selfie fotoğrafçılığı, video görüşme${hasFaceId ? ' ve Face ID işlevini' : 'yi'} doğrudan etkiler. ${biometricNote} Ön kamera arızaları düşme, darbe veya nem sonrasında ortaya çıkabileceği gibi üretim kaynaklı erken yıpranma sonucunda da oluşabilir. Trabzon'da ${model} ön kamera tamiri için Vip İletişim orijinal kamera modülü kullanarak görüntü kalitesini${hasFaceId ? ' ve biyometrik güvenlik özelliklerini' : ''} tam olarak yeniler.`,
      symptomsHeading: `${model} Ön Kamera Arızası Belirtileri`,
      symptoms: [
        'Selfie kamerası siyah ekran gösteriyor ya da hiç açılmıyor',
        'Görüntü bulanık, odak çalışmıyor',
        'Ekranda renk bozukluğu, çizgi veya pikselleşme var',
        'FaceTime, Zoom veya Teams\'te ön kamera görüntüsü gelmiyor',
        hasFaceId ? 'Face ID "Ayarlanamadı" hatası veriyor (ön kamera TrueDepth sistemiyle bağlantılı)' : 'Kamera uygulaması ön kameraya geçildiğinde yanıt vermiyor',
        'Kamera uygulaması ön kameraya geçildiğinde çöküyor',
      ],
      whyHeading: `${model} Ön Kamera Değişimi Neden Önemli?`,
      why: `Ön kamera modülü yalnızca fotoğraf değil; video konferans${hasFaceId ? ', biyometrik kimlik doğrulama' : ''} ve belge tarama işlevlerini de yürütür. Düşük kaliteli veya uyumsuz modül takılması görüntü kalitesini kalıcı olarak düşürebilir${hasFaceId ? ' ve Face ID\'nin çalışmamasına neden olabilir' : ''}. ${model} için orijinal ya da OEM kalitesinde ön kamera kullanılması bu riskleri ortadan kaldırır.`,
      processHeading: `${model} Ön Kamera Değişimi Süreci`,
      processSteps: [
        { title: 'Görüntü Testi', desc: 'Ön kameranın çözünürlük, odak ve ışık sensörü çalışması test edilir.' },
        { title: 'Hassas Söküm', desc: 'Ekran ve sensör şeritlerине zarar vermeden kamera modülü ayrılır.' },
        { title: 'Orijinal Modül Takımı', desc: 'OEM kalitesinde ön kamera yerleştirilir.' },
        { title: hasFaceId ? 'Biyometrik ve Görüntü Kontrolü' : 'Görüntü Kalitesi Kontrolü', desc: hasFaceId ? 'Face ID çalışması ve görüntü netliği doğrulanır.' : 'Görüntü netliği ve dokunmatik uyumu doğrulanır.' },
      ],
      dataSafeHeading: `Ön Kamera Değişiminde Verilerim Silinir mi?`,
      dataSafe: `${model} ön kamera değişimi donanımsal bir işlemdir. Verileriniz ve ayarlarınız tamamen korunur.${hasFaceId ? ' Face ID yeniden kayıt gerektirebilir.' : ''}`,
      priceHeading: `${model} Ön Kamera Tamiri Fiyatı — Trabzon`,
      price: `Ön kamera tamiri fiyatı modele ve kullanılan parça kalitesine göre belirlenir. Ücretsiz inceleme sonrası net fiyat bildirilir.`,
      expertNote: hasFaceId
        ? `${model} ön kamera değişimi TrueDepth sistemini etkiler; deneyimsiz müdahale Face ID'yi kalıcı olarak devre dışı bırakabilir.`
        : `${model} ön kamera değişiminde orijinal kalitede parça kullanılması görüntü kalitesini ve uygulama uyumluluğunu garanti eder.`,
    };
  },

  'arka-kamera-tamiri': (model, _brand, spec) => {
    const hasLidar = spec?.lidar ?? false;
    const lidarNote = hasLidar
      ? ` ${model}'ın LiDAR tarayıcısı, arka kamera sistemiyle entegre çalışır; kamera modülüne yapılan müdahalede LiDAR bağlantısı da kontrol edilir.`
      : '';
    const screenDesc = spec?.screen ?? '';
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} arka kamera tamiri; ana kamera, ultra geniş açı ve telefoto lensleri kapsayan kapsamlı bir teknik hizmettir. Modern akıllı telefonların çok lensli kamera sistemleri, darbe ve nem gibi dış etkenlerden daha kolay etkilenebilir.${lidarNote} Trabzon'da ${model} arka kamera tamiri için Vip İletişim orijinal kamera modülleri kullanarak görüntü kalitesini tamamen yeniler.\n\nSorunun lens mi, sensör mü yoksa anakart bağlantısı mı kaynaklandığı ücretsiz tanı aşamasında netleştirilir; yalnızca arızalı bileşen değiştirilir.`,
      symptomsHeading: `${model} Arka Kamera Arızasının Belirtileri`,
      symptoms: [
        'Ana kamera siyah görüntü veriyor ya da hiç açılmıyor',
        'Fotoğraflar bulanık; otomatik odak (AF) çalışmıyor',
        'Kamera uygulaması açıldığında donuyor veya çöküyor',
        'Zoom kamera çalışmıyor, yalnızca geniş açı açılıyor',
        'Görüntüde renk bozukluğu, titreşim veya çizgi var',
        'Kamera camı kırılmış ve lens içeri zarar görmüş',
      ],
      whyHeading: `${model} Arka Kamera Neden Arızalanır?`,
      why: `Arka kamera modülü cihazın en çok darbeye maruz kalan bileşenidir. Düşme anında kamera modülü önce hasar görür; cam kırılırsa altındaki lens çizilir. Ayrıca nem teması optik stabilizan (OIS) mekanizmasını bozabilir. ${model} için erken müdahale yalnızca kamera camıyla sınırlı kalabilecek onarımı, çok daha pahalı sensör değişimine dönüşmeden çözer.`,
      processHeading: `${model} Arka Kamera Değişimi Süreci`,
      processSteps: [
        { title: 'Çok Lensli Sistem Testi', desc: 'Geniş, ultra geniş ve zoom kameralar ayrı ayrı test edilir.' + (hasLidar ? ' LiDAR tarayıcı işlevi de kontrol edilir.' : '') },
        { title: 'Modül Ayrımı', desc: 'Yalnızca arızalı kamera modülü değiştirilir; diğerleri korunur.' },
        { title: 'OEM Kamera Takımı', desc: 'Orijinal kalitesinde kamera modülü yerleştirilir.' },
        { title: 'Görüntü Kalitesi ve OIS Testi', desc: 'Odak hızı, zoom performansı ve optik sabitleme kontrol edilir.' },
      ],
      dataSafeHeading: `Arka Kamera Değişiminde Verilerim Güvende mi?`,
      dataSafe: `${model} arka kamera değişimi depolama birimine müdahale etmez. Fotoğraflarınız ve tüm verileriniz korunur.`,
      priceHeading: `${model} Arka Kamera Tamiri Fiyatı — Trabzon`,
      price: `Arka kamera tamiri ücreti; hangi lensin (ana, geniş açı, zoom${hasLidar ? ', LiDAR' : ''}) arızalı olduğuna göre değişir. Ücretsiz ön inceleme sonrası net fiyat bildirilir.`,
      expertNote: hasLidar
        ? `${model}'ın Pro kamera sistemi LiDAR tarayıcı içerir; kamera değişiminde bu bileşenin uyumluluğu deneyimli servis tarafından doğrulanmalıdır.`
        : 'Çok kameralı sistemlerde yalnızca arızalı modül değiştirilir; çalışan modüllere gereksiz müdahaleden kaçınılır.',
    };
  },

  'face-id-tamiri': (model, _brand, spec) => {
    const hasDI = spec?.dynamicIsland ?? false;
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    const systemDesc = hasDI
      ? `${model}'ın Dynamic Island alanında konumlanan TrueDepth kamera sistemi`
      : `${model}'ın ön çentiğindeki (notch) TrueDepth kamera sistemi`;
    return {
      intro: `${year}${model} Face ID tamiri, Apple'ın iPhone'lara özel biyometrik kimlik doğrulama teknolojisiyle ilgili bir hizmettir. ${systemDesc}; kızılötesi kamera, flood illuminator, nokta projektör ve yakınlık sensöründen oluşan karmaşık bir yapıya sahiptir. Bu sistemdeki herhangi bir bileşenin arızalanması yüz tanımanın tamamen durmasına neden olur. Trabzon'da ${model} Face ID tamiri için Vip İletişim, Apple prosedürlerine uygun teşhis ve onarım uygular.\n\nFace ID arızası bazen yazılımdan, bazen ekran değişiminden, bazen de TrueDepth modülünün fiziksel hasarından kaynaklanır. Doğru tanı olmadan yapılan müdahale bu özelliği kalıcı olarak devre dışı bırakabilir.`,
      symptomsHeading: `${model} Face ID Arızasının Belirtileri`,
      symptoms: [
        '"Face ID Kullanılamıyor" ya da "Ayarlanamadı" hatası çıkıyor',
        'Yüz tanıma çalışmıyor; her seferinde PIN isteniyor',
        'Yazılım güncellemesi sonrası Face ID kapandı',
        'Ekran değişiminden sonra Face ID devre dışı kaldı',
        hasDI ? 'Dynamic Island alanında görsel veya dokunmatik sorun Face ID\'yi etkiliyor' : 'Düşme sonrası ön sensör grubu hasar gördü',
        'Apple Pay ve App Store onayı çalışmıyor',
      ],
      whyHeading: `${model} Face ID Neden Sadece Uzman Servisinde Tamir Edilmeli?`,
      why: `Face ID, Apple'ın donanım kilidi sistemine bağlıdır. Sistem, orijinal TrueDepth modülünü seri numarasıyla eşleştirir; uyumsuz parça takılırsa Face ID kalıcı olarak devre dışı kalır. ${model} Face ID tamiri yalnızca Apple prosedürüne uygun ekipman ve orijinal modülle gerçekleştirilmelidir. Vip İletişim bu konuda deneyimli kadrosuyla Trabzon'da hizmet vermektedir.`,
      processHeading: `${model} Face ID Tamir Süreci`,
      processSteps: [
        { title: 'Yazılım Tanısı', desc: 'Önce yazılım kaynaklı sorun olup olmadığı kontrol edilir; güncelleme ve sıfırlama denenebilir.' },
        { title: 'TrueDepth Sistem Testi', desc: 'Her bileşen — flood illuminator, IR kamera, nokta projektör — ayrı ayrı test edilir.' },
        { title: 'Modül Değişimi', desc: 'Arızalı bileşen orijinal parçayla değiştirilir.' },
        { title: 'Face ID Eğitimi ve Teslim', desc: 'İşlem sonrası yüz kaydı sıfırlanır; yeniden kayıt için kullanıcıya rehberlik edilir.' },
      ],
      dataSafeHeading: `Face ID Tamirinde Verilerim Silinir mi?`,
      dataSafe: `${model} Face ID tamiri veri gerektirmeyen bir donanım işlemidir. Ancak Face ID verisi sıfırlanacağından işlem sonrasında yeniden yüz kaydı yapmanız gerekebilir. Tüm diğer verileriniz ve hesaplarınız korunur.`,
      priceHeading: `${model} Face ID Tamiri Fiyatı — Trabzon`,
      price: `Face ID tamiri, arızanın TrueDepth sisteminin hangi bileşenini etkilediğine bağlı olarak farklı maliyetler taşır. Kesin fiyat için ücretsiz tanı yaptırın.`,
      expertNote: `Face ID yalnızca iPhone X ve sonrası modellerde mevcuttur. ${model}'da bu sistemin tamiri yalnızca Apple donanım protokolüne uygun uzman servis tarafından yapılmalıdır.`,
    };
  },

  'kamera-cami-tamiri': (model, _brand, spec) => {
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    const hasLidar = spec?.lidar ?? false;
    return {
      intro: `${year}${model} kamera camı tamiri, kamera modülünü değiştirmeden yalnızca üzerindeki koruyucu camın yenilenmesi işlemidir. Kamera camı çatladığında veya kırıldığında görüntüde sis, leke ve bulanıklık oluşur; eğer zamanında müdahale edilmezse kırık cam lens yüzeyini çizebilir. Trabzon'da ${model} kamera camı tamiri için Vip İletişim hızlı ve ekonomik bir çözüm sunar.\n\nKamera camı değişimi, tüm modül değişimine kıyasla çok daha uygun maliyetlidir ve aynı gün tamamlanır.`,
      symptomsHeading: `${model} Kamera Camı Hasarının Belirtileri`,
      symptoms: [
        'Arka kamera bölgesinde çatlak veya kırık cam görünüyor',
        'Fotoğraflarda yaygın sis, merkezi leke veya parlaklık sapması var',
        'Kırık cam parçaları lens yüzeyine temas ediyor',
        'Yalnızca belirli kamera (ana, ultra geniş, zoom' + (hasLidar ? ', LiDAR' : '') + ') etkilenmiş görünüyor',
        'Kamera görüntüsü normal ama cam estetik açıdan bozuk',
      ],
      whyHeading: `${model} Kamera Camı Neden Hemen Değiştirilmeli?`,
      why: `Kamera camındaki küçük çatlak, kullanım sürdükçe büyür ve cam parçaları optiği doğrudan çizmeye başlar. Lens yüzeyi bir kez çizildiğinde kamera modülünün tamamının değiştirilmesi gerekebilir; bu, kamera camı tamirinin kat kat üzerinde bir maliyete denk gelir. ${model} için erken kamera camı değişimi hem görüntü kalitesini korur hem de ciddi tamir masrafından kurtarır.`,
      processHeading: `${model} Kamera Camı Değişim Süreci`,
      processSteps: [
        { title: 'Hasar Tespiti', desc: 'Camın altındaki lens ve sensör durumu incelenir; modül hasarı var mı kontrol edilir.' },
        { title: 'Cam Çıkarma', desc: 'Isı uygulamasıyla kırık cam güvenli şekilde kaldırılır.' },
        { title: 'Yeni Cam Takımı', desc: 'Orijinal kalibrasyon değerlerine sahip yeni koruyucu cam yerleştirilir.' },
        { title: 'Görüntü Kalitesi Testi', desc: 'Tüm kameralar yeni camla test edilir, görüntü netliği doğrulanır.' },
      ],
      dataSafeHeading: `Kamera Camı Değişiminde Veriler Etkileniyor mu?`,
      dataSafe: `${model} kamera camı değişimi kamera modülüne dokunmadan gerçekleştirilen bir işlemdir; verileriniz, fotoğraflarınız ve ayarlarınız etkilenmez.`,
      priceHeading: `${model} Kamera Camı Değişimi Fiyatı — Trabzon`,
      price: `Kamera camı değişimi, tam modül değişimiyle karşılaştırıldığında çok daha ekonomiktir. Kesin fiyat için servisimize uğrayın veya WhatsApp'tan yazın.`,
      expertNote: 'Kamera camı değişimini ertelerseniz lens çizilmesi kaçınılmaz olacaktır; kamera modülünün tamamını değiştirmek zorunda kalabilirsiniz.',
    };
  },

  'kasa-degisimi': (model, _brand, spec) => {
    const ip = spec?.ip;
    const ipNote = ip ? ` ${ip} su ve toz geçirmezlik sertifikasına sahip ${model}'da kasa hasarı bu koruma özelliğini geçersiz kılar.` : '';
    const isTitanium = spec?.titanium ?? false;
    const kasaMateryali = isTitanium ? 'titanyum' : 'alüminyum veya polimer';
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} kasa değişimi; düşme, çarpma veya uzun süreli kullanımdan kaynaklanan yapısal hasarı tamamen gideren kapsamlı bir teknik hizmettir. ${model}'ın ${kasaMateryali} kasası ezildiğinde veya büküldüğünde iç bileşenlere kronik baskı uygulayarak zamanla anakart, batarya ve ekran arızalarına yol açabilir.${ipNote} Trabzon'da ${model} kasa değişimi için Vip İletişim orijinal kalite kasa parçaları kullanır.\n\nKasa değişimi diğer tamirlerden daha uzun sürer; ancak cihazı neredeyse yeni görünüme kavuşturur.`,
      symptomsHeading: `${model} Kasa Değişimi Gereken Durumlar`,
      symptoms: [
        'Kasa düşme nedeniyle belirgin şekilde ezilmiş veya bükülmüş',
        'Güç, ses veya diğer tuşlar hasar gördüğü için çalışmıyor',
        'Kasa hasarı ekran çerçevesine baskı yapıyor',
        ip ? `${ip} su geçirmezlik contası hasarlanmış, koruma özelliği ortadan kalkmış` : 'Kasa contası hasarlanmış, nem girişi riski oluşmuş',
        'Derin çizikler ve boyama soyulması cihazın değerini düşürüyor',
      ],
      whyHeading: `${model} Kasa Değişimi Neden Gerekli Olabilir?`,
      why: `Hafif bir çizik yalnızca estetik sorunken; ciddi bir kasa bükülmesi veya ezilmesi anakart bağlantılarına baskı yaparak kısa devreye veya arızalı dokunmatik çalışmasına neden olabilir. Aynı zamanda hasarlı kasa su ve toz geçişine olanak tanır. ${model} kasa değişimi bu sorunların tümünü ortadan kaldırarak cihaza ikinci bir ömür kazandırır.`,
      processHeading: `${model} Kasa Değişimi Süreci`,
      processSteps: [
        { title: 'Tam Sökme', desc: 'Tüm dahili bileşenler tek tek çıkarılır; anakart, batarya ve diğer parçalar korunur.' },
        { title: 'Yeni Kasa Montajı', desc: `Orijinal kalite ${kasaMateryali} kasa montajlanır; tüm bileşenler yeni kasaya yerleştirilir.` },
        { title: 'Kablo ve Bağlantı Kontrolü', desc: 'Tüm flex kablolar, konektörler ve tuşlar kontrol edilir.' },
        { title: 'Kapsamlı Test ve Teslim', desc: 'Yazılım açılışı, tüm tuşlar ve sensörler test edilir.' },
      ],
      dataSafeHeading: `Kasa Değişiminde Verilerim Güvende mi?`,
      dataSafe: `${model} kasa değişiminde dahili depolama birimine müdahale edilmez. Bileşenler yeni kasaya aktarılırken verileriniz korunur. Yine de bu kapsamlı işlem öncesinde yedek almanızı öneririz.`,
      priceHeading: `${model} Kasa Değişimi Fiyatı — Trabzon`,
      price: `Kasa değişimi en kapsamlı tamir işlemlerinden biridir; fiyat modele ve parça kalitesine göre belirlenir. Ücretsiz ön inceleme için servisimize gelin ya da WhatsApp'tan yazın.`,
      expertNote: isTitanium
        ? `${model}'ın titanyum kasası özel aletler gerektiren hassas bir işlem sürecidir; bu alanda deneyimli servis tercihi kritik önem taşır.`
        : 'Kasa değişimi yaklaşık 2–4 saat sürer; aynı gün randevu alınması durumunda gün içinde teslim yapılabilir.',
    };
  },

  'arka-kapak-tamiri': (model, _brand, spec) => {
    const ip = spec?.ip;
    const ipNote = ip
      ? `${ip} su ve toz geçirmezlik özelliğine sahip ${model}'da arka kapak kırığı bu sertifikayı geçersiz kılar ve iç bileşenleri neme karşı savunmasız bırakır.`
      : 'Arka kapak hasarı iç bileşenlerin toz ve neme maruz kalma riskini artırır.';
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} arka kapak tamiri, cihazın su geçirmezliğini ve darbe korumasını yenileyen önemli bir hizmettir. ${ipNote} Cam arka kapak kırığı; toz, nem ve darbe geçişine kapı açarak iç bileşenleri riske atar. Trabzon'da ${model} arka kapak tamiri için Vip İletişim, orijinal kalite arka cam veya kapak kullanarak cihazı fabrika görünümüne döndürür.\n\nArka kapak değişimi görece hızlı bir işlemdir ve çoğunlukla aynı gün tamamlanır.`,
      symptomsHeading: `${model} Arka Kapak Hasarının Belirtileri`,
      symptoms: [
        'Cam arka kapak çatlamış, kırılmış veya parçalanmış',
        'Kırık cam elleri çiziyor ya da kesik yaralanmasına neden oluyor',
        ip ? `${ip} su ve toz geçirmezlik özelliği ortadan kalkmış` : 'Su ve nem koruma contası hasarlanmış',
        'Arka kapak tamamen kopmuş; batarya veya iç bileşenler görünüyor',
        'Kırık kısım yapıştırıcıyla tutturulmaya çalışılmış',
      ],
      whyHeading: `${model} Arka Kapak Değişimi Neden Önemli?`,
      why: `Arka kapak, cihazın dış kabuğundaki en ince ve en kırılgan bölümdür. Kırık cam parçaları elleri zedelerken aynı zamanda içeri sızan nem anakartı ve bataryayı tehdit eder. ${ip ? `${ip} derecelendirmeli ${model}'da arka kapak kırığı güvenlik sertifikasını geçersiz kılar.` : ''} ${model} arka kapak tamiri bu riskleri ortadan kaldırır ve cihazın güvenli kullanımını sağlar.`,
      processHeading: `${model} Arka Kapak Değişimi Süreci`,
      processSteps: [
        { title: 'Cam Çıkarma', desc: 'Isı uygulamasıyla kırık arka cam, iç bileşenlere zarar vermeden çıkarılır.' },
        { title: 'Conta Temizliği', desc: 'Eski su geçirmezlik contası temizlenir; yenisi hazırlanır.' },
        { title: 'Yeni Kapak Takımı', desc: 'Orijinal kalite arka kapak yerleştirilerek yapıştırıcı uygulanır.' },
        { title: 'Kür ve Test', desc: 'Yapıştırıcının tam oturması için uygun süre beklenir; ardından cihaz test edilir.' },
      ],
      dataSafeHeading: `Arka Kapak Değişiminde Veriler Etkileniyor mu?`,
      dataSafe: `${model} arka kapak tamiri iç bileşenlere dokunmadan gerçekleştirilir. Verileriniz ve ayarlarınız tamamen korunur.`,
      priceHeading: `${model} Arka Kapak Değişimi Fiyatı — Trabzon`,
      price: `Arka kapak değişimi fiyatı modele (cam mı, plastik mi) ve parça kalitesine göre belirlenir. Güncel fiyat için bize ulaşın.`,
      expertNote: 'Arka camı kendiniz çıkarmaya çalışmayın; ısıtma aparatı olmadan yapılan müdahale anakart veya batarya hasarına yol açabilir.',
    };
  },

  'anakart-tamiri': (model, _brand, spec) => {
    const chip = spec?.chip ? `${spec.chip} işlemcisini` : 'güçlü işlemcisini';
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} anakart tamiri, cep telefonu tamirinin en karmaşık ve en yüksek uzmanlık gerektiren dalıdır. ${model}'ın anakartı ${chip} barındırır; ayrıca bellek, şarj entegresi, güç yönetim modülü ve kablosuz iletişim çipleri gibi onlarca kritik bileşen bu kart üzerindedir. Trabzon'da ${model} anakart tamiri için Vip İletişim; trinoküler mikroskop ve profesyonel mikro lehimleme ekipmanlarıyla komponent düzeyinde onarım uygular.\n\nDeneyimsiz ellerde yapılan anakart müdahalesi kalıcı veri kaybına ve geri dönüşü olmayan hasara yol açabilir. Bu nedenle uzman servis tercihi anakart tamirinde hayati önem taşır.`,
      symptomsHeading: `${model} Anakart Arızasının Belirtileri`,
      symptoms: [
        'Telefon hiç açılmıyor; şarja takılınca da ekran yanmıyor',
        'Rastgele kapanmalar ve yeniden başlamalar yaşanıyor',
        'Belirli bir özellik (WiFi, ses, şarj, anten) çalışmıyor',
        'Suya düşme sonrası kısa devre ya da korozyon oluşmuş',
        'Aşırı ısınma ve bataryanın hızlı bitmesiyle birlikte genel yavaşlama',
        'iTunes/Android Studio cihazı tanımıyor ya da kurtarma modunda takılı kalıyor',
      ],
      whyHeading: `${model} Anakart Tamiri Neden Uzman Gerektirir?`,
      why: `Anakart üzerindeki bileşenler 0,1 mm'nin altında boyutlara sahiptir ve trinoküler mikroskop olmadan müdahale edilemez. BGA çipler, vias onarımı ve reballing gibi işlemler özel ekipman ve yıllarca birikim gerektiren bir uzmanlık alanıdır. Vip İletişim bu alanda hem ${model} hem de geniş bir model yelpazesinde başarılı anakart onarım geçmişine sahiptir.`,
      processHeading: `${model} Anakart Tamiri Süreci`,
      processSteps: [
        { title: 'Kapsamlı Tanı', desc: 'Termometre, multimetre ve dijital osiloskopla arızalı bileşen tespit edilir.' },
        { title: 'Mikroskop Altında Müdahale', desc: 'Trinoküler mikroskop altında kusurlu çip veya bağlantı noktası onarılır.' },
        { title: 'Lehimleme ve Yeniden Test', desc: 'Tamir edilen bölge fonksiyon testiyle doğrulanır; komşu bileşenler kontrol edilir.' },
        { title: 'Yazılım Açılış Testi', desc: 'Anakart cihaza takılarak tam yazılım açılışı test edilir.' },
      ],
      dataSafeHeading: `${model} Anakart Tamirinde Verilerim Ne Olur?`,
      dataSafe: `Anakart tamiri bazı durumlarda veri kaybı riski taşıyabilir; özellikle NAND belleğe yakın müdahalelerde. İşlem öncesinde mümkünse verilerinizi yedeklemenizi kesinlikle öneririz. Veri kurtarma işlemi ayrı bir hizmet olarak da sunulmaktadır.`,
      priceHeading: `${model} Anakart Tamiri Fiyatı — Trabzon`,
      price: `Anakart tamiri fiyatı arızanın karmaşıklığına ve hangi bileşenin değiştirildiğine göre belirlenir. Ücretsiz ön tanı sonrası detaylı fiyat verilir.`,
      expertNote: '90 gün işçilik garantisi anakart tamirlerimizde standarttır; tamir edilen bileşen aynı arızayla tekrar bozulursa ücretsiz yeniden müdahale yapılır.',
    };
  },

  'sivi-temasi-tamiri': (model, _brand, spec) => {
    const ip = spec?.ip;
    const ipNote = ip
      ? `${model} ${ip} su direncine sahip olsa da bu sertifika tatlı su ve belirli derinlik/süre koşullarında geçerlidir; deniz suyu, şampuan veya yüksek basınçlı temas hasara yol açabilir.`
      : `${model}'ın su geçirmezlik sertifikası bulunmadığından her türlü sıvı teması ciddi risk taşır.`;
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} sıvı teması tamiri, her dakikanın kritik öneme sahip olduğu acil bir müdahale hizmetidir. ${ipNote} Suya ya da başka bir sıvıya temas eden cihazda oksidasyon (korozyon) birkaç dakika içinde başlar; anakart, ekran bağlantıları ve sensörler sırayla etkilenmeye başlar. Trabzon'da ${model} sıvı teması tamiri için Vip İletişim ultrasonik temizleme ve korozyon giderme teknolojisiyle müdahale eder.\n\nCihazınız suya düştüyse hemen kapatın, şarj etmeyin ve en kısa sürede servisimize getirin. Erken müdahale başarı şansını önemli ölçüde artırır.`,
      symptomsHeading: `${model} Sıvı Temasının Belirtileri`,
      symptoms: [
        'Cihaz suya ya da başka bir sıvıya düştü veya ıslandı',
        'Telefon açılmıyor ya da açıldıktan sonra kapanıyor',
        'Ekranda nem lekesi, buhar ya da içten yoğuşma görünüyor',
        'Hoparlörden boğuk, cızırtılı ya da hiç ses gelmiyor',
        'Şarj olmuyor ya da şarj tutarsız çalışıyor',
        'Bazı tuşlar veya dokunmatik belirli bölgelerde tepki vermiyor',
      ],
      whyHeading: `${model} Sıvı Temasında Neden Hemen Servis Gerekli?`,
      why: `Sıvı temas ettiği anda elektrik ileten mineraller korozyon zincirine başlar. Cihaz kapatılmadığında kısa devre riski gerçekleşir; şarj edildiğinde hasar katlanır. Pirinç içine koymak veya saç makinesiyle kurutmak efsanevi çözümlerdir; yalnızca zaman kaybettirir. ${model} için en etkili yöntem; ultrasonik temizleme, korozyon giderme maddesi ve mikro düzey bileşen kontrolüdür.`,
      processHeading: `${model} Sıvı Teması Tamir Süreci`,
      processSteps: [
        { title: 'Acil Söküm', desc: 'Batarya bağlantısı kesilir; nem kaynaklı kısa devre riski ortadan kaldırılır.' },
        { title: 'Ultrasonik Temizleme', desc: 'Anakart ve bileşenler ultrasonik banyoda temizlenir; tüm mineral birikimi giderilir.' },
        { title: 'Korozyon Haritası', desc: 'Mikroskop altında korozyonun sınırları belirlenir; etkilenen bileşenler listelenir.' },
        { title: 'Onarım ve Test', desc: 'Hasarlı bileşenler değiştirilir; cihaz kademelerde test edilir ve teslim edilir.' },
      ],
      dataSafeHeading: `Sıvı Teması Tamirinde Verilerim Ne Olur?`,
      dataSafe: `Sıvı temasında veri güvenliği hasar derecesine bağlıdır. Hafif temaslarda veriler tamamen korunur. Şiddetli hasarda veri kurtarma ek işlem gerektirebilir. İşlem öncesinde veri yedekleme mümkünse kesinlikle yapılmalıdır.`,
      priceHeading: `${model} Sıvı Teması Tamir Fiyatı — Trabzon`,
      price: `Sıvı teması tamir fiyatı, korozyonun yaygınlığına ve değiştirilecek bileşen sayısına göre belirlenir. Önce ücretsiz tanı, ardından net fiyat verilir.`,
      expertNote: 'Cihazı asla kendi kendinize açmayın; sökme sırasında oluşabilecek kıvılcım hasarı katlar. Kapalı hâlde servisimize getirin.',
    };
  },

  'wifi-tamiri': (model, _brand, spec) => {
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    const chip = spec?.chip ? ` ${spec.chip} platformlu ` : ' ';
    return {
      intro: `${year}${chip}${model} WiFi tamiri; internet bağlantısı, Bluetooth ve bazı modellerde GPS işlevini etkileyen teknik bir hizmettir. WiFi ve Bluetooth çoğunlukla aynı kombine çipi paylaşır; bu nedenle ikisi birden aynı anda sorun yaşamaya başladığında anakart düzeyinde bir arıza olduğu anlaşılır. Trabzon'da ${model} WiFi tamiri için Vip İletişim, sinyal testi ve bileşen izolasyonu uygulayarak kalıcı çözüm sunar.\n\nYazılım sıfırlamasıyla geçmeyen WiFi sorunları donanım müdahalesi gerektirir.`,
      symptomsHeading: `${model} WiFi Arızasının Belirtileri`,
      symptoms: [
        'WiFi seçeneği ayarlarda soluk görünüyor ve açılamıyor',
        'Ağlar listelenmiyor ya da listelenip hemen kayboluyor',
        'Bağlanıyor ama internet erişimi olmuyor',
        'Yalnızca 2.4 GHz ya da yalnızca 5 GHz bağlanıyor',
        'Bluetooth da aynı anda çalışmıyor (kombine çip belirtisi)',
        'Belirli bir güncelleme ya da düşme sonrası WiFi kapandı',
      ],
      whyHeading: `${model} WiFi Sorunu Neden Uzman Tanı Gerektirir?`,
      why: `WiFi arızası; yazılım hatası, anten kablosu kopukluğu, WiFi/BT kombine çip hasarı ya da anakart üzerindeki kondansatör arızasından kaynaklanabilir. Her birinin çözüm yöntemi farklıdır; tanısız müdahale hem zaman hem maliyet kaybıdır. Vip İletişim, ${model} WiFi tamirinde RF test ekipmanıyla sinyal seviyesini ölçerek arızanın kaynağını kesin olarak belirler.`,
      processHeading: `${model} WiFi Tamir Süreci`,
      processSteps: [
        { title: 'Yazılım Kontrolü', desc: 'Ağ ayarları sıfırlaması ve güncel yazılım kontrolüyle yazılım kaynaklı sorun elenir.' },
        { title: 'Anten Kablosu Testi', desc: 'WiFi anten bağlantıları fiziksel olarak kontrol edilir; kopuk ya da hasarlı kablo değiştirilir.' },
        { title: 'Çip Düzeyi Müdahale', desc: 'Anten sorunu yoksa WiFi/BT çipi veya ilgili pasif bileşenler onarılır.' },
        { title: 'Sinyal Testi ve Teslim', desc: '2.4 GHz ve 5 GHz bantlarında bağlantı testi yapılarak cihaz teslim edilir.' },
      ],
      dataSafeHeading: `WiFi Tamirinde Verilerim Güvende mi?`,
      dataSafe: `${model} WiFi tamiri donanım düzeyinde bir işlemdir. Cihazınızdaki veriler, uygulamalar ve hesaplar etkilenmez.`,
      priceHeading: `${model} WiFi Tamiri Fiyatı — Trabzon`,
      price: `WiFi tamir fiyatı arızanın kaynağına — anten mi, çip mi — göre belirlenir. Ücretsiz ön tanıyla net fiyat öğrenilebilir.`,
      expertNote: 'Yazılım sıfırlaması WiFi sorununu geçici çözebilir; donanım arızasında birkaç gün içinde aynı sorun tekrar eder.',
    };
  },

  'servis-yok-arizasi': (model, _brand, spec) => {
    const port = spec?.port ?? 'USB-C';
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} servis yok arızası; SIM kart soketi, anten bağlantısı, baseband çipi veya anakart kaynaklı olabilen ve cihazın GSM şebekesinden tamamen kopmasına yol açan ciddi bir teknik sorundur. Trabzon'da ${model} servis yok arızası tamiri için Vip İletişim, RF (radyo frekans) test ekipmanıyla arızanın kaynağını kesin olarak tespit eder; doğru tanı olmadan yapılan değişimler bu arızayı çözmez.\n\nSIM kart değişimiyle geçmeyen sinyal sorunları donanımsal müdahale gerektirir.`,
      symptomsHeading: `${model} Servis Yok Arızasının Belirtileri`,
      symptoms: [
        'Ekranda anten simgesi yok ya da "Servis Yok" yazıyor',
        'SIM kart tanınıyor ancak şebekeye bağlanamıyor',
        'Farklı bir SIM kartla da sorun devam ediyor',
        'Arama ve kısa mesaj çalışmıyor; yalnızca WiFi üzerinden iletişim mümkün',
        'Belirli bölgelerde sinyal var, diğerlerinde yok',
        'Yazılım güncellemesi ya da fabrika ayarlarına dönme sorunu çözmedi',
      ],
      whyHeading: `${model} Servis Yok Arızası Neden Oluşur?`,
      why: `Servis yok arızasının birden fazla kaynağı olabilir: SIM kart pinlerinin yıpranması, anten flex kablosunun kopması, baseband işlemcisinin hasar görmesi veya RF filtresinin arızalanması. Bu farklı nedenlerin her birinin çözüm yöntemi tamamen farklıdır. Vip İletişim, ${model} servis yok arızasında adım adım izolasyon testi yaparak gerçek nedeni bulur ve en ekonomik çözümü uygular.`,
      processHeading: `${model} Servis Yok Arızası Tamir Süreci`,
      processSteps: [
        { title: 'SIM Soket Testi', desc: 'SIM soketinin pin durumu ve elektrik iletkenliği kontrol edilir.' },
        { title: 'Anten Bağlantısı Kontrolü', desc: 'Anten flex kabloları ve bağlantı noktaları incelenir; kopuk bağlantı onarılır.' },
        { title: 'Baseband ve RF Testi', desc: 'RF sinyal seviyesi ölçülür; baseband çipi veya filtre arızası tespit edilir.' },
        { title: 'Onarım ve Şebeke Testi', desc: 'Arızalı bileşen onarılır; SIM ile şebeke bağlantısı test edilerek cihaz teslim edilir.' },
      ],
      dataSafeHeading: `Servis Yok Tamirinde Verilerim Etkilenir mi?`,
      dataSafe: `${model} servis yok arızası tamiri yalnızca ağ donanımına müdahale eder; depolama birimi ve yazılıma dokunulmaz. Verileriniz güvende kalır.`,
      priceHeading: `${model} Servis Yok Arızası Tamir Fiyatı — Trabzon`,
      price: `Servis yok tamir fiyatı, arızanın SIM soket mi yoksa anakart bileşeni mi olduğuna göre değişir. Ücretsiz tanı sonrası net fiyat bildirilir.`,
      expertNote: 'Servis yok arızasında fabrika ayarlarına dönmek geçici ve yüzeysel bir çözümdür; donanım sorunu varsa mutlaka uzman tamir gerekmektedir.',
    };
  },

  'sarj-olmuyor-tamiri': (model, _brand, spec) => {
    const port = spec?.port ?? 'USB-C';
    const portName = port === 'Lightning' ? 'Lightning' : 'USB-C';
    const hasMagSafe = spec?.magSafe ?? false;
    const wirelessNote = hasMagSafe
      ? 'MagSafe veya Qi kablosuz şarj çalışıyor ama kablolu şarj çalışmıyor'
      : 'Qi kablosuz şarj çalışıyor ama kablolu şarj çalışmıyor';
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} şarj olmama sorunu; günlük kullanımı tamamen engelleyen ve birden fazla nedeni olabilen karmaşık bir teknik arızadır. ${portName} şarj soketi mi hasarlı, şarj entegresi mi arızalı, batarya mı ölü yoksa anakart bağlantısı mı kopuk — bu soruların doğru yanıtı ücretsiz ön incelemeyle netleştirilmeden müdahale yapılmamalıdır. Trabzon'da ${model} şarj olmama sorunu için Vip İletişim hem zaman hem para tasarrufu sağlayan tanı odaklı bir yaklaşım benimser.\n\nKablo veya adaptör değişimiyle çözülmeyen şarj sorunları donanım müdahalesi gerektirir.`,
      symptomsHeading: `${model} Şarj Olmuyor Arızasının Belirtileri`,
      symptoms: [
        `${portName} kablo takılı; ancak ekranda şarj simgesi görünmüyor`,
        wirelessNote,
        'Şarj yüzdesi artmıyor; takılı kalmasına rağmen azalıyor',
        '"Desteklenmeyen aksesuar" veya "şarj mümkün değil" uyarısı çıkıyor',
        'Farklı kablo ve adaptörle de sorun devam ediyor',
        `${portName} soketine bir cisim girilmiş ve pin hasar görmüş`,
      ],
      whyHeading: `${model} Şarj Olmama Sorununun Kaynağı Nasıl Belirlenir?`,
      why: `Şarj olmama sorunu çok sayıda bileşenden kaynaklanabilir. Soket temizliği bazen yeterli olurken; şarj entegresi arızasında anakart müdahalesi, batarya ölümünde ise batarya değişimi gerekir. Yanlış bileşeni değiştirmek hem gereksiz maliyet hem de zaman kaybıdır. Vip İletişim ${model} şarj sorununda kısa devre testi, voltaj ölçümü ve bileşen izolasyonu yöntemiyle kaynağı kesin olarak belirler.`,
      processHeading: `${model} Şarj Olmama Sorunu Tamir Süreci`,
      processSteps: [
        { title: 'Kablo ve Adaptör Doğrulaması', desc: `Farklı kaliteli ${portName} kablo ve adaptörle test yapılır; aksesuar kaynaklı sorun elenir.` },
        { title: 'Soket Temizliği ve Pin Kontrolü', desc: `${portName} şarj soketindeki toz temizlenir, pinler kontrol edilir.` },
        { title: 'Voltaj ve Entegre Testi', desc: 'Şarj voltaj seviyesi ve şarj entegresi çalışması profesyonel ekipmanla ölçülür.' },
        { title: 'Hedefli Tamir ve Test', desc: 'Arızalı bileşen değiştirilir; tam şarj döngüsüyle test edilip teslim edilir.' },
      ],
      dataSafeHeading: `Şarj Tamirinde Verilerim Güvende mi?`,
      dataSafe: `${model} şarj olmama tamiri verilerinizi etkilemez. İşlem yalnızca şarj bileşenlerine yönelik bir donanım müdahalesidir.`,
      priceHeading: `${model} Şarj Olmama Tamiri Fiyatı — Trabzon`,
      price: `Fiyat arızanın kaynağına — soket temizliği, batarya veya şarj entegresi — göre farklılaşır. Ücretsiz ön tanıyla net fiyat öğrenilebilir.`,
      expertNote: 'Cihazınızı farklı kablo ve adaptörle test edin; sorun çözülüyorsa aksesuar kaynaklıdır ve tamir gerekmez.',
    };
  },

  'sarj-entegresi-tamiri': (model, _brand, spec) => {
    const chip = spec?.chip ? `${spec.chip} platformuna sahip ` : '';
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${chip}${model} şarj entegresi tamiri, anakart üzerindeki mikro boyutlu bir entegre devrenin (IC) onarımını kapsayan ileri düzey bir teknik hizmettir. Şarj entegresi; güç yönetimi, şarj hızı kontrolü ve batarya koruması işlevlerini yürütür. Bu bileşen arızalandığında cihaz şarj olmaz, aşırı ısınır ya da yanlış şarj yüzdesi gösterir. Trabzon'da ${model} şarj entegresi tamiri için Vip İletişim trinoküler mikroskop ve profesyonel BGA istasyonu kullanır.\n\nŞarj entegresi tamiri, soket ya da batarya tamiriyle çözülemeyen şarj sorunlarının kalıcı çözümüdür.`,
      symptomsHeading: `${model} Şarj Entegresi Arızasının Belirtileri`,
      symptoms: [
        'Şarj soketi ve batarya sağlam görünüyor; ancak cihaz şarj olmuyor',
        'Hızlı şarj devre dışı; standart şarj çok yavaş veya tutarsız',
        'Şarjdayken cihaz normalüstü ısınıyor',
        'Şarj yüzdesi anlık atlıyor, saatlerce aynı değerde kalıyor',
        'Kablosuz şarj çalışıyor ama kablolu şarj hiç çalışmıyor',
        '"Şarj desteklenmiyor" uyarısı orijinal aksesuar kullanılmasına rağmen çıkıyor',
      ],
      whyHeading: `${model} Şarj Entegresi Tamiri Neden Uzmanlık Gerektirir?`,
      why: `Şarj entegresi, anakart yüzeyindeki 1–2 mm boyutunda bir BGA çipdir. Değişimi; trinoküler mikroskop, ısı tabancası ve reballing ekipmanı gerektiren mikro lehimleme uzmanlığı ister. Deneyimsiz müdahale entegrenin yanı sıra çevresindeki bileşenleri de hasara uğratır. Vip İletişim ${model} şarj entegresi tamirini bu konuda uzmanlaşmış kadrosuyla Trabzon'da başarıyla uygulamaktadır.`,
      processHeading: `${model} Şarj Entegresi Tamir Süreci`,
      processSteps: [
        { title: 'Voltaj ve Akım Testi', desc: 'Şarj devresi boyunca voltaj ve akım ölçülerek entegre arızası doğrulanır.' },
        { title: 'Eski Entegrenin Sökümlenmesi', desc: 'Trinoküler mikroskop altında arızalı IC güvenli şekilde çıkarılır.' },
        { title: 'Reballing ve Yeni IC Takımı', desc: 'Yeni entegrenin pinleri kalaylanır (reballing); anakarta yapıştırılır.' },
        { title: 'Şarj Döngüsü Testi', desc: 'Tam şarj döngüsü ve hızlı şarj protokolü test edilir; teslim yapılır.' },
      ],
      dataSafeHeading: `Şarj Entegresi Tamirinde Verilerim Ne Olur?`,
      dataSafe: `${model} şarj entegresi tamiri anakart üzerinde gerçekleşir. NAND belleğe yakın müdahalelerde teorik risk bulunduğundan işlem öncesinde yedek almanızı öneririz. Çoğu vakada veriler tamamen korunmaktadır.`,
      priceHeading: `${model} Şarj Entegresi Tamiri Fiyatı — Trabzon`,
      price: `Şarj entegresi tamiri, teknik karmaşıklığı nedeniyle diğer şarj onarımlarından daha yüksek maliyetlidir. Ücretsiz tanı sonrası net fiyat bildirilir.`,
      expertNote: 'Şarj entegresi tamiri yapan servisler piyasada azdır; yanlış kişiye başvurulursa anakart kalıcı olarak hasar görebilir.',
    };
  },

  'acma-kapama-tusu-tamiri': (model, _brand, spec) => {
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} açma/kapama tuşu tamiri; cihazı açıp kapama, ekranı uyandırma ve yeniden başlatma işlevlerini yenileyen önemli bir donanım hizmetidir. Tuş; fiziksel darbe, yıpranma veya flex kablo hasarı nedeniyle çalışmaz hale gelebilir. Trabzon'da ${model} açma/kapama tuşu tamiri için Vip İletişim hızlı tanı ve doğru parça kullanarak kısa sürede çözüm sunar.\n\nAçma/kapama tuşu arızasında cihazı yeniden başlatmak imkânsız hale gelir; bu durum yazılım güncellemelerini ve acil durumları ciddi ölçüde zorlaştırır.`,
      symptomsHeading: `${model} Açma/Kapama Tuşu Arızasının Belirtileri`,
      symptoms: [
        'Güç tuşuna basıldığında ekran yanmıyor ya da kapanmıyor',
        'Tuş mekanik olarak sıkışmış, basılı pozisyonda takılı kalmış',
        'Cihaz yalnızca şarj kablosu takılınca açılıyor',
        'Tuş gevşek ya da içeri çökmüş',
        'Ekran kilidi çalışmıyor; dokunuşla uyandırılmak zorunda kalınıyor',
        'Zorunlu yeniden başlatma (force restart) mümkün olmuyor',
      ],
      whyHeading: `${model} Açma/Kapama Tuşu Neden Arızalanır?`,
      why: `Güç tuşu, günde onlarca kez basılan mekanik bir bileşendir. Zamanla tuş mekanizmasının yayı gevşeyebilir ya da flex kablosu kırılabilir. Düşme ya da darbe halinde tuş içe çöker. Sorunun tuş mu yoksa flex kablo mu kaynaklandığı tanı aşamasında netleştirilerek yalnızca gerekli parça değiştirilir.`,
      processHeading: `${model} Açma/Kapama Tuşu Tamir Süreci`,
      processSteps: [
        { title: 'Mekanik ve Elektrik Testi', desc: 'Tuşun fiziksel tepkisi ve flex kablo iletkenliği test edilir.' },
        { title: 'Tuş veya Flex Kablo Değişimi', desc: 'Arızaya göre yalnızca tuş mekanizması ya da flex kablo değiştirilir.' },
        { title: 'Basma Tepkisi Kalibrasyonu', desc: 'Tuş tepkisi ve çift basma işlevi kontrol edilir.' },
        { title: 'Teslim', desc: 'Ortalama 20–45 dakikada tamamlanan işlem sonrası cihaz teslim edilir.' },
      ],
      dataSafeHeading: `Tuş Değişiminde Verilerim Etkilenir mi?`,
      dataSafe: `${model} açma/kapama tuşu değişimi veri gerektirmeyen bir donanım işlemidir; tüm verileriniz korunur.`,
      priceHeading: `${model} Açma/Kapama Tuşu Tamiri Fiyatı — Trabzon`,
      price: `Tuş tamiri fiyatı, yalnızca tuş mu yoksa flex kablo mu değişeceğine göre belirlenir. Kesin fiyat için ücretsiz inceleme yaptırın.`,
      expertNote: 'Asistan (AssistiveTouch) gibi yazılım geçici çözümler tuş arızasını gidermez; donanım tamiri kalıcı çözümdür.',
    };
  },

  'on-cam-degisimi': (model, _brand, spec) => {
    const screenDesc = spec?.screen ?? 'ekran paneli';
    const isOled = screenDesc.toLowerCase().includes('oled') || screenDesc.toLowerCase().includes('amoled');
    const year = spec?.year ? `${spec.year} yılı modeli olan ` : '';
    return {
      intro: `${year}${model} ön cam değişimi; ekranın ${isOled ? 'OLED' : 'LCD'} alt katmanı sağlamken yalnızca üstteki dokunmatik cam tabakasının yenilenmesini kapsayan ekonomik bir tamir hizmetidir. Ön cam kırıldığında görüntü normal olabilir; ancak cam parçaları dokunmatik hassasiyetini bozar, elleri çizer ve nem sızmasına davetiye çıkarır. Trabzon'da ${model} ön cam değişimi için Vip İletişim laminasyon teknolojisiyle hem ekonomik hem de dayanıklı bir çözüm sunar.\n\nTam ekran değişimi yerine yalnızca cam değişimi yapılabilmesi önemli maliyet avantajı sağlar.`,
      symptomsHeading: `${model} Ön Cam Değişimi Gerektiğinin Belirtileri`,
      symptoms: [
        `Ekran camı çatlamış ancak ${isOled ? 'OLED' : 'LCD'} görüntüsü normal ve net`,
        'Dokunmatik bazı noktalarda tepki vermiyor ya da hatalı algılıyor',
        'Kırık cam parçaları elleri çiziyor',
        'Çatlak camdan içeri nem veya toz giriyor',
        'Kenar kırığından başlayan çatlak ağ gibi yayılıyor',
      ],
      whyHeading: `${model} Ön Cam Değişiminin Ekran Değişiminden Farkı Nedir?`,
      why: `Tam ekran değişimi ${isOled ? 'OLED' : 'LCD'} + cam + çerçeve bütünü değiştirildiğinde uygulanır. Ön cam değişimi ise yalnızca dış cam tabakasının laminasyon yöntemiyle yenilenmesidir; ${isOled ? 'OLED' : 'LCD'} dokunulmaz. ${model} için doğru tanı; gereksiz tam ekran değişimini önleyerek önemli tasarruf sağlar. Erken müdahale önemlidir; çünkü devam eden kullanım ${isOled ? 'OLED\'in' : 'LCD\'nin'} de hasar görmesine yol açar.`,
      processHeading: `${model} Ön Cam Değişimi Süreci`,
      processSteps: [
        { title: `${isOled ? 'OLED' : 'LCD'} Durum Testi`, desc: 'Alt panel hasarsız mı kontrol edilir; laminasyon için uygunluk değerlendirilir.' },
        { title: 'Cam Ayrıştırma', desc: 'Isı ve vakum aparatıyla kırık cam panel hasarı olmadan çıkarılır.' },
        { title: 'Yeni Cam Laminasyonu', desc: 'Yeni cam, optik yapıştırıcıyla laminasyon makinesinde yerleştirilir.' },
        { title: 'Hava Kabarcığı Giderme ve Test', desc: 'OCA kür sürecinin ardından dokunmatik hassasiyet test edilir; cihaz teslim edilir.' },
      ],
      dataSafeHeading: `Ön Cam Değişiminde Verilerim Güvende mi?`,
      dataSafe: `${model} ön cam değişimi ekranın iç katmanına ve anakarta müdahale etmez. Tüm verileriniz tamamen korunur.`,
      priceHeading: `${model} Ön Cam Değişimi Fiyatı — Trabzon`,
      price: `Ön cam değişimi tam ekran değişimine göre önemli ölçüde daha ekonomiktir. Kesin fiyat için ücretsiz inceleme yaptırın.`,
      expertNote: `${isOled ? 'OLED' : 'LCD'} alt panel hasarlıysa ön cam değişimi yeterli olmaz; tam ekran değişimi gerekir. Doğru tanı bu ayrımı netleştirir.`,
    };
  },
};

const fallback: Generator = (model, _brand, _spec) => ({
  intro: `${model} tamiri için Trabzon'da Vip İletişim Teknik Servis'i tercih edin. Uzman kadromuz ve orijinal yedek parçalarımızla cihazınızı fabrika kalitesine döndürüyoruz.`,
  symptomsHeading: 'Arızanın Belirtileri',
  symptoms: [
    'Cihazda gözle görülür hasar veya işlev kaybı',
    'Ani kapanmalar veya tepkisizlik',
    'Dokunmatik, ekran veya bağlantı sorunları',
    'Şişme, ısınma veya beklenmedik davranışlar',
  ],
  whyHeading: `${model} Tamiri Neden Gerekli?`,
  why: `Bu arıza zamanında müdahale edilmediğinde cihazınızın diğer bileşenlerine zarar verebilir. Vip İletişim olarak Trabzon'da profesyonel tamir hizmeti sunarak cihazınızı fabrika kalitesine döndürüyoruz.`,
  processHeading: 'Tamir Süreci',
  processSteps: [
    { title: 'Ücretsiz Ön İnceleme', desc: 'Cihazınız ücret alınmadan incelenir.' },
    { title: 'Net Fiyat Bildirimi', desc: 'İşleme başlamadan önce fiyat bildirilir; onaylamazsanız ücret alınmaz.' },
    { title: 'Tamir ve Test', desc: 'Orijinal veya OEM parçayla tamir yapılır, test edilir.' },
    { title: 'Aynı Gün Teslim', desc: 'Cihazınız çalışır hâlde teslim edilir.' },
  ],
  dataSafeHeading: 'Tamir Sırasında Verilerim Güvende mi?',
  dataSafe: `Bu tamir işlemi sırasında cihazınızdaki veriler etkilenmez. İhtiyati tedbir olarak yedek almanızı öneririz.`,
  priceHeading: `${model} Tamir Fiyatı — Trabzon`,
  price: 'Tamir ücreti arızanın boyutuna göre belirlenir. Ücretsiz ön inceleme sonrası net fiyat bildirilir.',
  expertNote: 'Vip İletişim olarak 10+ yıllık deneyimimizle Trabzon\'da güvenilir teknik servis hizmeti sunuyoruz.',
});

export function getRepairContent(
  model: string,
  brand: string,
  repairKey: string,
  spec?: import('@/data/model-specs').ModelSpec | null,
): RepairContent {
  const gen = generators[repairKey] ?? fallback;
  return gen(model, brand, spec ?? null);
}
