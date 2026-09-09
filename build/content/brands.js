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
        'Jetta, Scirocco, Touran, T-Roc, Arteon'
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
  },
  {
    slug: 'renault-edc-sanziman-tamiri',
    nav: 'Renault & Dacia',
    brand: 'Renault',
    title: 'Renault EDC Şanzıman Tamiri Bursa | Megane, Clio',
    h1: 'Renault & Dacia Şanzıman Tamiri',
    description: 'Bursa’da Renault EDC (DC4) ve Dacia otomatik şanzıman tamiri. Megane, Clio, Fluence, Duster için mekatronik ve debriyaj onarımı.',
    lead: 'Megane, Clio, Fluence, Captur ve Dacia Duster modellerinde EDC çift kavramalı şanzımanlara tamir, bakım ve adaptasyon hizmeti.',
    intro: [
      'Renault’nun <strong>EDC (Efficient Dual Clutch)</strong> şanzımanı, Getrag kaynaklı çift kavramalı bir kutudur ve Megane, Clio, Fluence, Captur ile Dacia Duster gibi modellerde yaygın olarak kullanılır. Türkiye’de çok sayıda araçta bulunması nedeniyle atölyemizde sık servis verdiğimiz sistemlerdendir.',
      'EDC kutularda en yaygın şikâyetler <strong>kalkışta titreme</strong>, <strong>düşük viteslerde tekleme</strong> ve <strong>mekatronik kaynaklı vites atmama</strong> problemleridir. Ayrıca debriyaj aktüatörü ve yağ kaçakları sık karşılaşılan arızalardandır.',
      'Renault EDC’de doğru teşhis için debriyaj adaptasyon değerlerinin ve hata kayıtlarının birlikte okunması gerekir. Adaptasyon değerleri sınırda olan araçlarda parça değiştirmeden önce temel ayar denemesi yapıyoruz.'
    ],
    models: {
      h2: 'Servis verdiğimiz Renault & Dacia modelleri',
      items: [
        'Megane (3, 4) — EDC / DC4',
        'Clio (4, 5) — EDC',
        'Fluence — EDC',
        'Captur ve Kadjar — EDC',
        'Dacia Duster — EDC',
        'Dacia Sandero, Logan — Otomatik / EDC'
      ]
    },
    issues: {
      h2: 'Renault EDC’de sık görülen arızalar',
      items: [
        'Kalkışta titreme ve zıplama',
        'Düşük viteslerde tekleme ve sarsıntı',
        'Vites atmama, N konumunda kalma',
        'Mekatronik ünitesi ve solenoid arızaları',
        'Debriyaj aktüatörü arızası',
        'Şanzıman yağı kaçağı'
      ]
    },
    faqs: [
      { q: 'Megane EDC titremesi neden olur?', a: 'En yaygın nedenler debriyaj balatası aşınması ve adaptasyon değerlerinin bozulmasıdır. Bazı araçlarda temel ayar ve adaptasyon şikâyeti giderir; aşınma ilerlemişse debriyaj seti yenilenir. Karar ölçüm sonrası verilir.' },
      { q: 'EDC şanzıman yağı değişmeli mi?', a: 'Evet. EDC kutularda yağ ve filtre bakımı ihmal edilirse mekatronik valf kanalları tıkanır ve geçiş kalitesi bozulur. Kullanım profilinize göre uygun aralığı belirliyoruz.' },
      { q: 'Dacia Duster otomatik şanzımanına servis veriyor musunuz?', a: 'Evet. Duster ve diğer Dacia modellerindeki EDC ve otomatik şanzımanlara arıza tespiti, onarım ve bakım hizmeti veriyoruz.' }
    ],
    related: [
      { href: 'hizmetler/dsg-sanziman-tamiri/', label: 'Çift kavramalı şanzıman tamiri' },
      { href: 'hizmetler/mekatronik-tamiri/', label: 'Mekatronik ünitesi tamiri' },
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı değişimi' }
    ]
  },
  {
    slug: 'toyota-cvt-sanziman-tamiri',
    nav: 'Toyota & Honda',
    brand: 'Toyota',
    title: 'Toyota ve Honda CVT Şanzıman Tamiri Bursa',
    h1: 'Toyota & Honda Şanzıman Tamiri',
    description: 'Bursa’da Toyota ve Honda CVT ile otomatik şanzıman tamiri. Corolla, C-HR, Auris, Civic ve CR-V için kayış, kasnak ve valf bloğu onarımı.',
    lead: 'Corolla, C-HR, Auris, Civic ve CR-V modellerinde CVT ve klasik otomatik şanzımanlara bakım, arıza tespiti ve onarım hizmeti.',
    intro: [
      'Toyota ve Honda, orta sınıf modellerinin büyük bölümünde <strong>CVT (kademesiz)</strong> şanzıman kullanır. Toyota’nın <strong>K-serisi CVT</strong> ve Honda’nın CVT kutuları dayanıklı sistemlerdir; ancak performansları doğrudan <strong>yağ kalitesine</strong> bağlıdır.',
      'Bu araçlarda en sık karşılaştığımız şikâyetler hızla artan <strong>uğultu</strong>, gaza basıldığında devrin yükselip hızın artmaması (<strong>kayış kayması</strong>) ve düşük hızda titremedir. Bu belirtilerin ortak kökeni çoğunlukla ömrünü doldurmuş CVT yağıdır.',
      'Toyota hibrit modellerdeki <strong>e-CVT</strong> sistemi ise yapı olarak farklıdır; kayış yerine planet dişli ve elektrik motorları kullanır. Bu sistemlerde arıza karakteri ve servis yaklaşımı tamamen ayrışır.'
    ],
    models: {
      h2: 'Servis verdiğimiz Toyota & Honda modelleri',
      items: [
        'Toyota Corolla — CVT / e-CVT (hibrit)',
        'Toyota C-HR — CVT / e-CVT',
        'Toyota Auris — CVT / e-CVT',
        'Toyota RAV4, Yaris — CVT / e-CVT',
        'Honda Civic — CVT',
        'Honda CR-V, HR-V, Jazz — CVT'
      ]
    },
    issues: {
      h2: 'Toyota & Honda CVT’de sık görülen arızalar',
      items: [
        'Hızla birlikte artan uğultu / vınlama sesi',
        'Gaza basınca devir yükselmesi, hızın artmaması (kayma)',
        'Düşük hızda titreme (judder)',
        'Yokuşta zorlanma ve ısınma uyarısı',
        'Valf bloğu ve step motor arızaları',
        'CVT yağının ömrünü doldurmasına bağlı geçiş bozuklukları'
      ]
    },
    faqs: [
      { q: 'Toyota CVT yağı kaç kilometrede değişir?', a: 'Genel aralık 40.000–60.000 km’dir. Şehir içi dur-kalk kullanımda ve sıcak iklimde bu aralığın kısaltılması önerilir. Mutlaka üreticinin belirlediği spesifikasyonda CVT yağı kullanılmalıdır.' },
      { q: 'Honda CVT’den uğultu geliyor, tehlikeli mi?', a: 'Uğultu genellikle kayış-kasnak temasının bozulduğunu veya rulman aşınmasını gösterir ve ilerleyici bir arızadır. Aracı zorlamadan kısa sürede kontrole getirmek, kasnak değişimi gibi çok daha maliyetli bir onarımı önleyebilir.' },
      { q: 'Hibrit Toyota’ların e-CVT sistemine bakım gerekir mi?', a: 'e-CVT sistemleri kayış kullanmaz, bu nedenle klasik CVT arızaları görülmez. Ancak transaksel yağının kontrolü ve soğutma sisteminin sağlıklı çalışması yine de önemlidir. Bu araçlarda arıza tespiti farklı bir protokolle yapılır.' }
    ],
    related: [
      { href: 'hizmetler/cvt-sanziman-tamiri/', label: 'CVT şanzıman tamiri' },
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı değişimi' },
      { href: 'blog/cvt-sanziman-nedir-nasil-calisir/', label: 'Rehber: CVT şanzıman nedir?' }
    ]
  },
  {
    slug: 'hyundai-kia-sanziman-tamiri',
    nav: 'Hyundai & Kia',
    brand: 'Hyundai',
    title: 'Hyundai ve Kia Şanzıman Tamiri Bursa | DCT, Otomatik',
    h1: 'Hyundai & Kia Şanzıman Tamiri',
    description: 'Bursa’da Hyundai ve Kia otomatik / DCT şanzıman tamiri. i20, i30, Tucson, Ceed, Sportage için mekatronik ve debriyaj onarımı.',
    lead: 'i20, i30, Tucson, Elantra, Ceed ve Sportage modellerinde DCT ve klasik otomatik şanzımanlara uzman servis.',
    intro: [
      'Hyundai ve Kia araçlarda iki ana otomatik şanzıman ailesi bulunur: klasik <strong>torklu otomatik (A6MF, A8MF)</strong> ve çift kavramalı <strong>DCT (D7UF / 7DCT)</strong> kutular. DCT kutular yakıt verimliliği sağlar, ancak dur-kalk trafikte debriyaj yükü artar.',
      'DCT modellerde en sık gelen şikâyetler <strong>kalkışta titreme</strong>, <strong>düşük viteslerde tekleme</strong> ve <strong>debriyaj aşırı ısınma uyarısıdır</strong>. Klasik otomatiklerde ise valf bloğu, solenoid ve tork konvertörü kaynaklı arızalar öne çıkar.',
      'Bu araçlarda doğru teşhis için hata kodlarının yanı sıra debriyaj sıcaklık ve adaptasyon verilerinin de okunması gerekir. Yalnızca hata koduna bakılarak yapılan parça değişimleri çoğu zaman şikâyeti çözmez.'
    ],
    models: {
      h2: 'Servis verdiğimiz Hyundai & Kia modelleri',
      items: [
        'Hyundai i20, i30 — 7DCT / otomatik',
        'Hyundai Tucson, Elantra, Kona — DCT / A6MF / A8MF',
        'Hyundai Accent, Bayon — otomatik / DCT',
        'Kia Ceed, Rio — 7DCT',
        'Kia Sportage, Stonic — DCT / otomatik',
        'Kia Cerato, Niro — DCT / otomatik'
      ]
    },
    issues: {
      h2: 'Hyundai & Kia şanzımanlarında sık görülen arızalar',
      items: [
        'DCT’de kalkışta titreme ve tekleme',
        'Debriyaj aşırı ısınma uyarısı (yoğun trafikte)',
        'Vites geçişlerinde sarsıntı ve gecikme',
        'Mekatronik / TCU kaynaklı vites atmama',
        'Valf bloğu ve solenoid arızaları (klasik otomatik)',
        'Tork konvertörü kaynaklı titreme'
      ]
    },
    faqs: [
      { q: 'Hyundai DCT trafikte ısınma uyarısı veriyor, arıza mı?', a: 'Yoğun dur-kalk trafikte kuru debriyajlı DCT kutular ısınabilir ve koruma amaçlı uyarı verebilir. Ancak uyarı sıklaşıyor veya normal koşullarda geliyorsa debriyaj aşınması söz konusu olabilir; ölçüm yapılması gerekir.' },
      { q: 'Kia Ceed 7DCT titremesi nasıl çözülür?', a: 'Öncelikle debriyaj adaptasyon değerleri ve hata kayıtları okunur. Bazı araçlarda temel ayar ve adaptasyon yeterli olurken, balata aşınması ilerlemişse debriyaj seti yenilenir ve ardından adaptasyon yapılır.' },
      { q: 'Hyundai/Kia otomatik şanzıman yağı ne zaman değişir?', a: 'Klasik otomatiklerde genel aralık 60.000–80.000 km, DCT kutularda ise kullanım profiline göre belirlenir. Şehir içi yoğun kullanımda aralığın kısaltılmasını öneriyoruz.' }
    ],
    related: [
      { href: 'hizmetler/dsg-sanziman-tamiri/', label: 'Çift kavramalı (DCT) şanzıman tamiri' },
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'hizmetler/sanziman-ariza-tespiti/', label: 'Şanzıman arıza tespiti' }
    ]
  }
];

module.exports = { BRANDS };
