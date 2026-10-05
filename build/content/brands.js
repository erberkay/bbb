/* =========================================================
   MARKA SAYFALARI — /markalar/*
   "mercedes şanzıman tamiri", "bmw zf şanzıman" gibi
   yüksek satın alma niyetli aramaları hedefler.
   ========================================================= */

const BRANDS = [
  {
    slug: 'volkswagen-dsg-sanziman-tamiri',
    nav: 'Volkswagen',
    brand: 'Volkswagen',
    title: 'Volkswagen DSG Şanzıman Tamiri Bursa | Golf, Passat',
    h1: 'Volkswagen Şanzıman Tamiri',
    description: 'Bursa’da Volkswagen DSG şanzıman tamiri. Golf, Passat, Polo, Tiguan, Caddy için DQ200/DQ250 mekatronik ve debriyaj onarımı.',
    lead: 'Golf, Passat, Polo, Tiguan ve Caddy modellerinde DSG şanzıman arızalarında mekatronik onarımı, debriyaj yenileme ve adaptasyon hizmeti veriyoruz.',
    intro: [
      'Volkswagen araçlarda en yaygın otomatik şanzıman, çift kavramalı <strong>DSG</strong> ailesidir. 1.2 ve 1.4 TSI motorlu Golf, Polo, Passat ve Caddy modellerinde çoğunlukla <strong>DQ200 (7 ileri, kuru debriyaj)</strong>; 2.0 TDI ve GTI gibi yüksek torklu versiyonlarda ise <strong>DQ250 (6 ileri, ıslak debriyaj)</strong> kullanılır.',
      'DQ200 kutularda en sık karşılaştığımız iki şikâyet <strong>mekatronik ünitesi arızası</strong> ve <strong>kuru debriyaj aşınmasına bağlı kalkış titremesidir</strong>. DQ250’de ise yağ ve filtre bakımının ihmali, balata aşınması ve valf bloğu tıkanmasıyla sonuçlanır.',
      'Bu iki kutunun servis yaklaşımı birbirinden farklıdır; bu yüzden işleme başlamadan önce şasi numarasından şanzıman tipini doğruluyor, hata kodlarını ve debriyaj adaptasyon değerlerini okuyoruz.'
    ],
    models: {
      h2: 'Servis verdiğimiz Volkswagen modelleri',
      items: [
        'Golf (5, 6, 7, 8) — DQ200 / DQ250 / DQ381',
        'Passat ve Passat Variant — DQ250 / DQ381',
        'Polo — DQ200',
        'Tiguan — DQ250 / DQ500',
        'Caddy ve Transporter — DQ200 / DQ500',
        'Jetta, Scirocco, Touran, T-Roc, Arteon',
        'Skoda (Octavia, Superb) ve Seat (Leon, Ateca) — aynı DQ ailesi'
      ]
    },
    issues: {
      h2: 'Volkswagen DSG’de sık karşılaşılan şikâyetler',
      items: [
        'Kalkışta titreme ve zıplama (kuru debriyaj aşınması / adaptasyon)',
        '“Şanzıman arızası” uyarısı ve acil moda geçiş',
        'Düşük viteslerde tekleme ve sarsıntı',
        'Vitesin devreye girmemesi, N konumunda kalma',
        'Mekatronik basınç akümülatörü arızası',
        'Islak DSG’de yağ/filtre ihmaline bağlı geçiş bozuklukları'
      ]
    },
    faqs: [
      { q: 'Golf’ümde kalkışta titreme var, mekatronik mi değişmeli?', a: 'Her titreme mekatronik arızası değildir. Debriyaj adaptasyon değerlerinin okunması gerekir; bazı araçlarda yalnızca temel ayar ve adaptasyon şikâyeti giderir. Ölçüm yapmadan parça değişimi önermiyoruz.' },
      { q: 'DQ200 ile DQ250 arasındaki fark nedir?', a: 'DQ200 kuru debriyajlı 7 ileri, DQ250 ise ıslak debriyajlı 6 ileri kutudur. DQ250 daha yüksek torka dayanır ve düzenli yağ + filtre bakımı ister; DQ200’de ise mekatronik ve kuru debriyaj arızaları öne çıkar.' },
      { q: 'Volkswagen DSG yağı ne zaman değişir?', a: 'Islak debriyajlı DQ250 ve DQ500 kutularda genel aralık 60.000 km’dir; şehir içi yoğun kullanımda kısaltılması önerilir. Kuru debriyajlı DQ200’de şanzıman yağı ömürlük kabul edilir, ancak mekatronik hidrolik yağı kontrol edilmelidir.' }
    ],
    related: [
      { href: 'hizmetler/dsg-sanziman-tamiri/', label: 'DSG şanzıman tamiri hizmetimiz' },
      { href: 'hizmetler/mekatronik-tamiri/', label: 'Mekatronik ünitesi tamiri' },
      { href: 'markalar/audi-sanziman-tamiri/', label: 'Audi şanzıman servisi' }
    ]
  },
  {
    slug: 'audi-sanziman-tamiri',
    nav: 'Audi',
    brand: 'Audi',
    title: 'Audi Şanzıman Tamiri Bursa | S-tronic, Multitronic',
    h1: 'Audi Şanzıman Tamiri',
    description: 'Bursa’da Audi S-tronic, Multitronic ve Tiptronic şanzıman tamiri. A3, A4, A5, A6, Q3, Q5 modelleri için mekatronik ve debriyaj onarımı.',
    lead: 'A3, A4, A5, A6, Q3 ve Q5 modellerinde S-tronic (DL382/DL501), Multitronic (CVT) ve Tiptronic şanzımanlara uzman servis.',
    intro: [
      'Audi, model ve çekiş tipine göre birbirinden çok farklı şanzımanlar kullanır. Önden çekişli A3 ve A4 modellerinde <strong>S-tronic (DQ200/DQ381)</strong>, quattro versiyonlarda boyuna yerleşimli <strong>DL501 / DL382 S-tronic</strong>, eski nesil önden çekişli A4 ve A6’larda ise <strong>Multitronic (CVT)</strong> yer alır.',
      '<strong>Multitronic</strong> kutular, zincirli CVT yapısı nedeniyle yağ kalitesine son derece duyarlıdır. Bakım ihmalinde zincir kayması, titreme ve kalkışta zorlanma şikâyetleri ortaya çıkar. <strong>DL501</strong> kutularda ise mekatronik, debriyaj paketi ve yağ pompası kaynaklı arızalar öne çıkar.',
      'Her üç sistemin de teşhis yöntemi ve servis prosedürü farklıdır. Araç kabulünde şanzıman tipini şasi numarasından doğrular, ona uygun tespit protokolünü uygularız.'
    ],
    models: {
      h2: 'Servis verdiğimiz Audi modelleri',
      items: [
        'A3 / S3 — DQ200, DQ250, DQ381 S-tronic',
        'A4 / A5 — Multitronic (CVT), DL501 S-tronic, Tiptronic',
        'A6 / A7 — Multitronic, DL501 S-tronic',
        'Q3 — DQ500 S-tronic',
        'Q5 — DL501 S-tronic, Tiptronic',
        'TT — DQ250 / DQ381'
      ]
    },
    issues: {
      h2: 'Audi şanzımanlarında sık görülen arızalar',
      items: [
        'Multitronic’te kalkışta titreme ve zincir kayması',
        'S-tronic mekatronik ünitesi arızası ve acil moda geçiş',
        'DL501’de debriyaj paketi aşınması ve yağ pompası sorunları',
        'Vites geçişlerinde sertlik veya gecikme',
        'Tiptronic kutularda tork konvertörü kaynaklı titreme',
        'Şanzıman yağı sızıntısı ve soğutucu hattı tıkanıklığı'
      ]
    },
    faqs: [
      { q: 'Audi Multitronic tamir edilebilir mi?', a: 'Evet. Zincir, kasnak yüzeyi, valf bloğu ve kalkış debriyajı kaynaklı arızalar onarılabilir. Kasnak yüzeylerinde derin iz oluşmuşsa kasnak grubu da yenilenir. Doğru teşhis için yağ analizi ve yol testi yapılır.' },
      { q: 'S-tronic ile DSG aynı şey mi?', a: 'Teknik olarak aynı çift kavramalı prensibe dayanırlar; S-tronic, Audi’nin ticari adıdır. Ancak boyuna yerleşimli quattro modellerde kullanılan DL501/DL382 kutular, enine yerleşimli DQ ailesinden yapısal olarak farklıdır ve servis prosedürleri ayrışır.' },
      { q: 'Audi şanzıman yağı değişimi hangi aralıkta yapılmalı?', a: 'Islak debriyajlı S-tronic kutularda genel aralık 60.000 km, Multitronic’te 50.000–60.000 km civarındadır. Aracınızın bakım kitapçığındaki değeri ve kullanım profilinizi birlikte değerlendiririz.' }
    ],
    related: [
      { href: 'hizmetler/dsg-sanziman-tamiri/', label: 'DSG / S-tronic tamiri' },
      { href: 'hizmetler/cvt-sanziman-tamiri/', label: 'CVT (Multitronic) tamiri' },
      { href: 'markalar/volkswagen-dsg-sanziman-tamiri/', label: 'Volkswagen DSG servisi' }
    ]
  },
  {
    slug: 'mercedes-sanziman-tamiri',
    nav: 'Mercedes-Benz',
    brand: 'Mercedes-Benz',
    title: 'Mercedes Şanzıman Tamiri Bursa | 7G-Tronic, 9G',
    h1: 'Mercedes-Benz Şanzıman Tamiri',
    description: 'Bursa’da Mercedes 7G-Tronic (722.9), 9G-Tronic ve 5G-Tronic şanzıman tamiri. Konduktör plakası, valf bloğu ve tork konvertörü onarımı.',
    lead: 'C, E, S serisi, Vito ve Sprinter modellerinde 7G-Tronic, 9G-Tronic ve 5G-Tronic şanzımanlara tamir, revizyon ve bakım hizmeti.',
    intro: [
      'Mercedes-Benz araçlarda en yaygın otomatik şanzımanlar <strong>5G-Tronic (722.6)</strong>, <strong>7G-Tronic (722.9)</strong> ve yeni nesil <strong>9G-Tronic (725.0)</strong> kutularıdır. Bu şanzımanlar doğru bakımla çok uzun ömürlüdür; ancak bakım ihmali durumunda karakteristik arızalar gösterirler.',
      '7G-Tronic kutularda en sık karşılaştığımız arıza <strong>konduktör plakası (elektrik plakası)</strong> kaynaklı hız sensörü hatalarıdır; belirtisi genellikle vitesin devreye girmemesi veya acil moda geçiştir. 722.6 kutularda ise <strong>tork konvertörü kilitleme balatası</strong> ve valf bloğu aşınması öne çıkar.',
      'Sprinter ve Vito gibi ticari araçlarda yüksek yük ve dur-kalk kullanım nedeniyle yağın termal yaşlanması hızlanır; bu araçlarda bakım aralığını kısaltmayı öneriyoruz.'
    ],
    models: {
      h2: 'Servis verdiğimiz Mercedes modelleri',
      items: [
        'C-Serisi (W203, W204, W205) — 722.6 / 722.9 / 725.0',
        'E-Serisi (W211, W212, W213) — 722.9 / 725.0',
        'S-Serisi — 722.9 / 725.0',
        'Vito ve Viano — 722.6 / 722.9',
        'Sprinter — 722.6 / 722.9',
        'GLA, GLC, ML, GLE — 7G / 9G-Tronic'
      ]
    },
    issues: {
      h2: 'Mercedes şanzımanlarında sık görülen arızalar',
      items: [
        'Konduktör plakası (elektrik plakası) arızası — 7G-Tronic',
        'Vites geçişlerinde sertlik, darbe veya gecikme',
        'Tork konvertörü kilitleme balatasına bağlı titreme',
        'Valf bloğu aşınması ve basınç kaybı',
        'Şanzıman yağı sızıntısı (konnektör keçesi, karter contası)',
        'Acil moda geçiş ve vites göstergesinde uyarı'
      ]
    },
    faqs: [
      { q: '7G-Tronic konduktör plakası nedir, neden arızalanır?', a: 'Konduktör plakası, şanzıman içindeki elektrik bağlantılarını ve hız sensörlerini taşıyan ünitedir. Isı, titreşim ve yağ kaynaklı yaşlanma nedeniyle sensör ve iletken hataları verebilir. Belirtisi genellikle vitesin devreye girmemesi ve acil moda geçiştir; parça değişimiyle çözülür.' },
      { q: 'Mercedes şanzıman yağı “ömürlük” mü?', a: 'Üretici bazı modellerde ömürlük ibaresi kullansa da Türkiye kullanım koşullarında bu gerçekçi değildir. Şehir içi trafik ve sıcak iklim yağın termal yaşlanmasını hızlandırır. Uzun ömür için 60.000–80.000 km aralığında yağ ve filtre bakımı öneriyoruz.' },
      { q: 'Sprinter/Vito şanzımanına ticari kullanım zarar verir mi?', a: 'Yüksek yük ve dur-kalk kullanım yağ sıcaklığını yükseltir, bu da balata ve yağ ömrünü kısaltır. Ticari araçlarda bakım aralığının kısaltılması ve yağ soğutucu hattının düzenli kontrolü şanzıman ömrünü belirgin şekilde uzatır.' }
    ],
    related: [
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'hizmetler/tork-konvertoru-tamiri/', label: 'Tork konvertörü tamiri' },
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı değişimi' }
    ]
  },
  {
    slug: 'bmw-sanziman-tamiri',
    nav: 'BMW',
    brand: 'BMW',
    title: 'BMW Şanzıman Tamiri Bursa | ZF 6HP ve 8HP Servisi',
    h1: 'BMW Şanzıman Tamiri',
    description: 'Bursa’da BMW ZF 6HP ve 8HP otomatik şanzıman tamiri. Mekatronik, valf bloğu, tork konvertörü ve yağ bakımı hizmeti.',
    lead: '3, 5, 7 serisi ile X modellerinde kullanılan ZF 6HP ve 8HP şanzımanlarda mekatronik onarımı, valf bloğu revizyonu ve yağ bakımı.',
    intro: [
      'BMW araçların büyük bölümünde <strong>ZF</strong> üretimi otomatik şanzımanlar kullanılır. 2000’li yılların modellerinde <strong>ZF 6HP</strong> serisi, 2009 sonrası modellerde ise <strong>ZF 8HP</strong> serisi yaygındır. Her ikisi de dayanıklı kutulardır; arızaların çoğu yapısal zayıflıktan değil, <strong>yağ bakımının ihmalinden</strong> kaynaklanır.',
      '6HP serisinde en bilinen sorun <strong>mekatronik ünitesindeki keçe ve konnektör kaçaklarıdır</strong>; belirtisi vites geçişlerinde sertlik ve hata kodlarıdır. 8HP serisinde ise uzun süre bakımsız kalan yağ, valf bloğunda basınç kontrolü sorunlarına ve geçiş bozukluklarına yol açar.',
      'BMW’de “ömürlük yağ” yaklaşımı, Türkiye’deki trafik ve iklim koşullarında şanzıman ömrünü kısaltır. Bu kutularda düzenli yağ ve filtre bakımı, ileride çok daha pahalı bir revizyonu önlemenin en etkili yoludur.'
    ],
    models: {
      h2: 'Servis verdiğimiz BMW modelleri',
      items: [
        '3 Serisi (E90, F30, G20) — ZF 6HP / 8HP',
        '5 Serisi (E60, F10, G30) — ZF 6HP / 8HP',
        '7 Serisi — ZF 6HP / 8HP',
        'X1, X3, X5, X6 — ZF 6HP / 8HP',
        '1 ve 2 Serisi — ZF 8HP / Aisin',
        'MINI modelleri — Aisin / GA6F21WA'
      ]
    },
    issues: {
      h2: 'BMW şanzımanlarında sık görülen arızalar',
      items: [
        'Mekatronik keçe ve konnektör kaçağı (6HP serisi)',
        'Vites geçişlerinde sertlik, darbe veya gecikme',
        'Acil moda geçiş, “Transmission malfunction” uyarısı',
        'Tork konvertörü kilitlemesine bağlı titreme',
        'Valf bloğu tıkanması ve basınç kaybı',
        'Şanzıman karteri (yağ tavası) sızıntısı'
      ]
    },
    faqs: [
      { q: 'BMW ZF şanzıman yağı gerçekten ömürlük mü?', a: 'Uygulamada hayır. Üretici ömürlük ibaresi kullansa da yağ, ısı ve sürtünme nedeniyle yaşlanır. Türkiye koşullarında 60.000–80.000 km aralığında yağ ve filtre değişimi, bu şanzımanların ömrünü belirgin şekilde uzatır.' },
      { q: 'ZF 6HP mekatronik kaçağı nasıl anlaşılır?', a: 'Şanzıman konnektörü çevresinde yağ izi, vites geçişlerinde sertlik ve tekrarlayan hata kodları tipik belirtilerdir. Kaçak ilerlediğinde motor bölmesine yağ sızıntısı görülebilir. Keçe ve konnektör takımının yenilenmesiyle çözülür.' },
      { q: 'ZF 8HP’de sarsıntı olması normal mi?', a: 'Hayır. 8HP kutular normalde çok yumuşak geçiş yapar. Sarsıntı genellikle yağ yaşlanması, valf bloğunda basınç kontrolü sorunu veya adaptasyon bozukluğunu gösterir. Bakım ve adaptasyon ile çoğu vaka çözülür.' }
    ],
    related: [
      { href: 'hizmetler/mekatronik-tamiri/', label: 'Mekatronik ünitesi tamiri' },
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı değişimi' },
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' }
    ]
  },
  {
    slug: 'porsche-pdk-sanziman-tamiri',
    nav: 'Porsche',
    brand: 'Porsche',
    title: 'Porsche PDK Şanzıman Tamiri Bursa | Cayenne, Macan',
    h1: 'Porsche Şanzıman Tamiri',
    description: 'Bursa’da Porsche PDK ve Tiptronic S şanzıman tamiri. 911, Boxster, Cayman, Panamera, Macan ve Cayenne için mekatronik, kavrama ve yağ bakımı.',
    lead: '911, Boxster, Cayman, Panamera ve Macan’daki PDK çift kavramalı şanzımanlar ile Cayenne’deki Tiptronic S otomatiklerde arıza tespiti, onarım ve bakım.',
    intro: [
      'Porsche iki farklı otomatik şanzıman mimarisi kullanır. Spor modellerde ve Macan’da <strong>PDK (Porsche Doppelkupplung)</strong> adlı çift kavramalı şanzıman bulunur; Cayenne’de ise tork konvertörlü klasik otomatik olan <strong>Tiptronic S</strong> yer alır. İkisinin arıza karakteri ve servis yöntemi birbirinden tamamen farklıdır.',
      'PDK, ıslak kavramalı bir çift kavrama sistemidir: iki kavrama paketi yağ banyosunda çalışır, geçişleri mekatronik ünitesi yönetir. Bu yüzden PDK’da şanzımanın ömrünü belirleyen iki şey vardır: <strong>yağ ve filtre bakımının düzenli yapılması</strong> ve <strong>kavrama adaptasyon değerlerinin</strong> sağlıklı kalması. 7 ileri PDK önceki nesil 911, Boxster/Cayman ve Panamera’da; 8 ileri PDK yeni nesil 911 ve Panamera’da kullanılır.',
      'Cayenne’deki Tiptronic S ise tork konvertörlü bir otomatiktir. Ağır gövde ve yüksek tork nedeniyle bu kutularda yağın termal yükü yüksektir; ihmal edilen yağ bakımı valf gövdesinde basınç sorunlarına ve tork konvertörü kaynaklı titremeye dönüşür.'
    ],
    models: {
      h2: 'Servis verdiğimiz Porsche modelleri',
      items: [
        '911 — 7 ileri ve 8 ileri PDK',
        'Boxster ve Cayman (718 dahil) — 7 ileri PDK',
        'Panamera — 7 ileri ve 8 ileri PDK',
        'Macan — 7 ileri PDK',
        'Cayenne — 6 ve 8 ileri Tiptronic S (tork konvertörlü)'
      ]
    },
    issues: {
      h2: 'Porsche şanzımanlarında sık görülen şikâyetler',
      items: [
        '“PDK arızası” veya şanzıman uyarısı, acil moda geçiş',
        'Kalkışta veya park manevrasında silkeleme (kavrama adaptasyonu / aşınma)',
        'Geri vites veya 1. viteste gecikme, vuruntu',
        'Mekatronik ünitesi ve sensör kaynaklı hata kayıtları',
        'Cayenne Tiptronic S’te sert geçiş ve tork konvertörü titremesi',
        'Yağ bakımı ihmaline bağlı geçiş bozuklukları ve yağ kaçakları'
      ]
    },
    faqs: [
      { q: 'PDK şanzıman yağı değişir mi?', a: 'Evet. PDK ıslak kavramalı bir çift kavrama sistemidir ve kavramalar yağ banyosunda çalışır; yaşlanan yağ hem kavrama davranışını hem mekatronik valflerini etkiler. Kullanım profilinize ve aracın bakım geçmişine göre uygun aralığı birlikte belirliyoruz.' },
      { q: 'Kalkışta silkeleme PDK’da arıza mıdır?', a: 'Her zaman değil. Kavrama adaptasyon değerlerinin bozulması da aynı hissi verir ve bazı araçlarda temel ayar ile adaptasyon şikâyeti giderir. Aşınma ilerlemişse kavrama paketi yenilenir. Karar, değerler okunup yol testi yapıldıktan sonra verilir.' },
      { q: 'Cayenne’deki şanzıman da PDK mı?', a: 'Hayır. Cayenne’de tork konvertörlü klasik otomatik (Tiptronic S) bulunur. Arıza karakteri PDK’dan farklıdır: valf gövdesi, solenoid ve tork konvertörü kaynaklı şikâyetler öne çıkar.' }
    ],
    related: [
      { href: 'hizmetler/mekatronik-tamiri/', label: 'Mekatronik ünitesi tamiri' },
      { href: 'hizmetler/tork-konvertoru-tamiri/', label: 'Tork konvertörü tamiri' },
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı değişimi' }
    ]
  },
  {
    slug: 'land-rover-sanziman-tamiri',
    nav: 'Land Rover',
    brand: 'Land Rover',
    title: 'Land Rover Şanzıman Tamiri Bursa | ZF 6HP, 8HP, 9HP',
    h1: 'Land Rover Şanzıman Tamiri',
    description: 'Bursa’da Land Rover ve Range Rover otomatik şanzıman tamiri. ZF 6HP, 8HP ve 9HP şanzımanlarda mekatronik, valf gövdesi ve yağ bakımı.',
    lead: 'Range Rover, Range Rover Sport, Velar, Evoque, Discovery ve Discovery Sport modellerindeki ZF otomatik şanzımanlara arıza tespiti, onarım ve bakım.',
    intro: [
      'Land Rover ve Range Rover modellerinin büyük bölümünde <strong>ZF</strong> üretimi otomatik şanzımanlar bulunur. Önceki nesil Range Rover, Range Rover Sport ve Discovery 3/4’te <strong>ZF 6HP</strong>; yeni nesil Range Rover, Range Rover Sport, Velar ve Discovery 5’te boyuna yerleşimli <strong>ZF 8HP</strong>; Evoque ve Discovery Sport’ta ise enine yerleşimli <strong>ZF 9HP</strong> kullanılır.',
      'Bu araçların ağır gövdesi, yüksek torku ve arazi kullanımı şanzıman yağının termal yükünü artırır. Arızaların önemli bir bölümü yapısal kusurdan değil, <strong>“ömürlük” kabul edilip hiç değiştirilmeyen yağdan</strong> kaynaklanır: yaşlanan yağ valf gövdesinde basınç kontrolünü bozar, geçişler sertleşir veya gecikir.',
      '6HP serisinde mekatronik bağlantı noktalarındaki sızdırmazlık elemanları zamanla sertleşir; 9HP’de ise geçiş kalitesi büyük ölçüde yazılım ve adaptasyon değerlerine bağlıdır. Bu yüzden her kutuya kendi tespit protokolüyle yaklaşıyoruz.'
    ],
    models: {
      h2: 'Servis verdiğimiz Land Rover modelleri',
      items: [
        'Range Rover — ZF 6HP / ZF 8HP',
        'Range Rover Sport — ZF 6HP / ZF 8HP',
        'Range Rover Velar — ZF 8HP',
        'Discovery 3 ve 4 — ZF 6HP · Discovery 5 — ZF 8HP',
        'Range Rover Evoque — ZF 9HP',
        'Discovery Sport — ZF 9HP'
      ]
    },
    issues: {
      h2: 'Land Rover şanzımanlarında sık görülen şikâyetler',
      items: [
        '“Gearbox fault” / şanzıman arızası uyarısı ve kısıtlı performans modu',
        'Vites geçişlerinde sertlik, darbe veya gecikme',
        'ZF 6HP’de mekatronik bağlantılarında yağ kaçağı',
        '9HP’de düşük viteslerde kararsız geçiş ve vites seçiminde gecikme',
        'Tork konvertörü kilitlemesine bağlı titreme',
        'Şanzıman karteri ve conta kaynaklı yağ sızıntısı'
      ]
    },
    faqs: [
      { q: 'Land Rover şanzıman yağı gerçekten ömürlük mü?', a: 'Uygulamada hayır. Ağır gövde, yüksek tork ve arazi kullanımı yağı üreticinin varsaydığından hızlı yaşlandırır. Bakım geçmişi bilinmeyen veya yüksek kilometreli araçlarda yağ ve filtre bakımını öneriyoruz; yöntemi şanzımanın durumunu gördükten sonra belirliyoruz.' },
      { q: '“Gearbox fault” uyarısı gelince sürmeye devam edebilir miyim?', a: 'Uyarı şanzımanın kendini korumaya aldığını gösterir. Kısa mesafede servise ulaşmak çoğu zaman mümkündür, ancak sürüşü uzatmak arızayı büyütebilir. Hata kayıtlarını okumadan nedenini söylemek mümkün değildir.' },
      { q: 'Evoque’ta vitesler sert geçiyor, yazılım mı arıza mı?', a: 'ZF 9HP’de geçiş kalitesi adaptasyon değerlerine ve yazılıma çok bağlıdır; bazı şikâyetler temel ayar ve adaptasyonla düzelir. Mekanik aşınma da olabilir — ayrımı, değerler okunup yol testi yapıldıktan sonra yapıyoruz.' }
    ],
    related: [
      { href: 'markalar/bmw-sanziman-tamiri/', label: 'ZF 6HP / 8HP — BMW şanzıman servisi' },
      { href: 'hizmetler/mekatronik-tamiri/', label: 'Mekatronik ünitesi tamiri' },
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı değişimi' }
    ]
  },
  {
    slug: 'opel-otomatik-sanziman-tamiri',
    nav: 'Opel',
    brand: 'Opel',
    title: 'Opel Otomatik Şanzıman Tamiri Bursa | Astra, Insignia',
    h1: 'Opel Otomatik Şanzıman Tamiri',
    description: 'Bursa’da Opel otomatik şanzıman tamiri. Astra, Insignia, Mokka, Corsa ve Grandland için valf gövdesi, kavrama paketi ve yağ bakımı.',
    lead: 'Astra, Insignia, Zafira, Mokka, Corsa ve Grandland modellerindeki tork konvertörlü 6 ve 8 ileri otomatik şanzımanlara arıza tespiti ve onarım.',
    intro: [
      'Opel modellerinde kuşağa göre farklı otomatik şanzımanlar bulunur. Astra J, Insignia A, Zafira C ve ilk nesil Mokka gibi modellerde yaygın olan kutu, <strong>GM 6T40 / 6T45 ailesi 6 ileri otomatiktir</strong>. Bazı dizel Insignia ve önceki nesil modellerde <strong>Aisin üretimi 6 ileri otomatik</strong> yer alır. Yeni nesil Corsa, Astra, Mokka ve Grandland’da ise <strong>8 ileri otomatik (EAT8)</strong> kullanılır.',
      '6T40 ailesinde bilinen bir zayıf nokta, <strong>3-5-R kavrama paketindeki dalga yayıdır</strong>; kırıldığında 3., 5. ve geri vites kaybolur, araç çoğu zaman acil moda geçer. Bu arıza çoğunlukla aniden ortaya çıkar ve şanzımanın açılarak kavrama paketinin onarılmasını gerektirir.',
      'Bütün bu kutularda geçiş kalitesini belirleyen ortak faktör yağın durumu ve adaptasyon değerleridir. Erken aşamadaki sert 1–2 geçişi veya gecikme şikâyetlerinin bir kısmı yağ bakımı ve adaptasyonla çözülebilir; bu yüzden işleme başlamadan önce mutlaka ölçüm yapıyoruz.'
    ],
    models: {
      h2: 'Servis verdiğimiz Opel modelleri',
      items: [
        'Astra J ve K — 6 ileri otomatik (6T40 ailesi)',
        'Insignia A — 6 ileri otomatik (GM 6T / Aisin)',
        'Zafira C ve Mokka — 6 ileri otomatik',
        'Yeni Corsa ve Astra — 8 ileri otomatik',
        'Mokka (yeni nesil) ve Grandland — 8 ileri otomatik',
        'Diğer Opel otomatik modelleri — arıza tespiti ile'
      ]
    },
    issues: {
      h2: 'Opel otomatik şanzımanlarında sık görülen şikâyetler',
      items: [
        '3., 5. veya geri vitesin kaybolması, acil moda geçiş (6T40 — 3-5-R dalga yayı)',
        'Sert 1–2 geçişi ve kalkışta vuruntu',
        'Vites geçişlerinde gecikme, devir yükselmesi',
        'Solenoid ve valf gövdesi kaynaklı hata kayıtları',
        'Yağ yaşlanmasına bağlı geçiş bozuklukları',
        'Tork konvertörü kaynaklı titreme'
      ]
    },
    faqs: [
      { q: 'Astra’mda geri vites ve 3. vites birden kayboldu, ne oldu?', a: '6T40 ailesi şanzımanlarda bu tablo genellikle 3-5-R kavrama paketindeki dalga yayının kırılmasına işaret eder. Kesin teşhis hata kayıtları ve kontrolle konur; onarım için şanzımanın açılması gerekir. Aracı zorlamadan getirmenizi öneririz.' },
      { q: 'Opel otomatik şanzıman yağı değişmeli mi?', a: 'Evet. Bu kutularda geçiş kalitesi büyük ölçüde yağın durumuna bağlıdır. Bakım geçmişi bilinmeyen araçlarda yağ ve filtre durumunu kontrol ederek uygun yöntemi belirliyoruz.' },
      { q: 'Easytronic şanzımana bakıyor musunuz?', a: 'Easytronic, otomatik kumandalı bir manuel şanzımandır (robotize). Biz yalnızca tork konvertörlü ve çift kavramalı otomatik şanzımanlara servis veriyoruz; aracınızın kutu tipinden emin değilseniz bizi arayın, birlikte bakalım.' }
    ],
    related: [
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'hizmetler/sanziman-revizyonu/', label: 'Şanzıman revizyonu' },
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı değişimi' }
    ]
  },
  {
    slug: 'ford-powershift-sanziman-tamiri',
    nav: 'Ford',
    brand: 'Ford',
    title: 'Ford PowerShift Şanzıman Tamiri Bursa | Focus, Kuga',
    h1: 'Ford PowerShift Şanzıman Tamiri',
    description: 'Bursa’da Ford PowerShift (DPS6 / MPS6) şanzıman tamiri. Focus, Fiesta, Kuga, Mondeo için debriyaj, TCM ve mekatronik onarımı.',
    lead: 'Focus, Fiesta, Kuga ve Mondeo modellerinde PowerShift şanzıman arızalarında debriyaj yenileme, TCM onarımı ve adaptasyon hizmeti.',
    intro: [
      'Ford’un çift kavramalı <strong>PowerShift</strong> şanzımanı iki farklı versiyonda karşımıza çıkar: <strong>DPS6</strong> (kuru debriyajlı, Focus ve Fiesta) ve <strong>MPS6 / 6DCT450</strong> (ıslak debriyajlı, Kuga, Mondeo, S-Max).',
      'DPS6 kutularda en yaygın şikâyetler <strong>kalkışta titreme, düşük hızda tekleme ve debriyaj balatası aşınmasıdır</strong>. Ayrıca TCM (şanzıman kontrol modülü) kaynaklı arızalar sık görülür. MPS6 kutularda ise ıslak debriyaj paketi ve yağ bakımı belirleyicidir.',
      'PowerShift onarımlarında en kritik adım, işlem sonrası yapılan <strong>debriyaj adaptasyonudur</strong>. Bu adım tamamlanmazsa şanzıman doğru kavrama noktasını öğrenemez ve titreme şikâyeti kısa sürede geri döner.'
    ],
    models: {
      h2: 'Servis verdiğimiz Ford modelleri',
      items: [
        'Focus (2011+) — DPS6 PowerShift',
        'Fiesta — DPS6 PowerShift',
        'Kuga — MPS6 / 6DCT450',
        'Mondeo — MPS6 / 6DCT450',
        'S-Max ve Galaxy — MPS6',
        'C-Max — DPS6'
      ]
    },
    issues: {
      h2: 'Ford PowerShift’te sık görülen arızalar',
      items: [
        'Kalkışta ve düşük hızda titreme, zıplama',
        'Debriyaj balatası aşınması ve kayma',
        'TCM (şanzıman kontrol modülü) arızası',
        'Vites geçişlerinde sarsıntı ve gecikme',
        'Debriyaj aktüatörü / çatal arızası',
        'MPS6’da yağ ve filtre ihmaline bağlı geçiş bozuklukları'
      ]
    },
    faqs: [
      { q: 'Focus PowerShift titremesi çözülebilir mi?', a: 'Evet. Titremenin kaynağı genellikle debriyaj balatası aşınması, aktüatör ayarı veya adaptasyon bozukluğudur. Ölçüm sonrasında bazı araçlarda yalnızca adaptasyon yeterli olurken, aşınma ilerlemişse debriyaj seti yenilenir.' },
      { q: 'PowerShift kuru mu ıslak mı debriyaj kullanıyor?', a: 'İkisi de var. Focus ve Fiesta’daki DPS6 kuru debriyajlıdır ve şanzıman yağı ayrı bir devrede çalışır. Kuga, Mondeo ve S-Max’taki MPS6 ise ıslak debriyajlıdır ve düzenli yağ + filtre bakımı gerektirir.' },
      { q: 'Debriyaj değişimi sonrası ne yapılmalı?', a: 'Mutlaka temel ayar ve debriyaj adaptasyonu yapılmalıdır. Bu işlem yapılmazsa şanzıman kavrama noktasını doğru hesaplayamaz; titreme ve tekleme şikâyeti kısa sürede tekrarlar.' }
    ],
    related: [
      { href: 'hizmetler/dsg-sanziman-tamiri/', label: 'Çift kavramalı şanzıman tamiri' },
      { href: 'hizmetler/mekatronik-tamiri/', label: 'Mekatronik / TCM onarımı' },
      { href: 'hizmetler/sanziman-ariza-tespiti/', label: 'Şanzıman arıza tespiti' }
    ]
  }
];

module.exports = { BRANDS };
