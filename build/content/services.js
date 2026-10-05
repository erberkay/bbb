/* =========================================================
   HİZMET SAYFALARI — /hizmetler/*
   Her sayfa tek bir arama niyetine (search intent) odaklanır.
   ========================================================= */

const SERVICES = [
  {
    slug: 'otomatik-sanziman-tamiri',
    nav: 'Otomatik Şanzıman Tamiri',
    title: 'Otomatik Şanzıman Tamiri Bursa | HB Otomatik Şanzıman',
    h1: 'Otomatik Şanzıman Tamiri',
    description: 'Bursa Nilüfer’de otomatik şanzıman tamiri ve revizyonu. Sarsıntı, vites atmama, kayma arızalarında ücretsiz arıza tespiti ve garantili işçilik.',
    kicker: 'Torklu otomatik · Valf gövdesi · Solenoid',
    lead: 'Vites geçişlerinde sarsıntı, gecikme veya kayma yaşıyorsanız sorun büyümeden çözülebilir. Otomatik şanzımanınızı sökmeden önce diagnostik test ve yağ analizi ile gerçek arızayı tespit ediyoruz.',
    intro: [
      'Otomatik şanzıman, aracınızın en karmaşık ve en pahalı mekanik grubudur. Hidrolik, elektronik ve mekanik bileşenlerin birlikte çalıştığı bu sistemde küçük bir balata aşınması ya da tıkanmış bir valf, kısa sürede tüm şanzımanı etkileyebilir. Bu nedenle <strong>erken teşhis</strong>, onarım maliyetini belirleyen en önemli faktördür.',
      'HB Otomatik Şanzıman olarak Bursa Nilüfer’deki atölyemizde, aracınızı sökmeden önce her zaman <strong>arıza tespiti</strong> yaparız: hata kodları okunur, yağ durumu ve seviyesi kontrol edilir, yol testi yapılır ve basınç değerleri ölçülür. Ancak bu adımlar tamamlandıktan sonra size gerçekçi bir onarım kapsamı ve fiyat sunarız.',
      'Amacımız her arızada komple revizyon satmak değil; sorunun kaynağını bulup <strong>gereken kadar</strong> müdahale etmektir. Bazı durumlarda sadece solenoid değişimi veya yağ + filtre bakımı sorunu çözer.'
    ],
    symptoms: {
      h2: 'Otomatik şanzıman arızasının belirtileri',
      intro: 'Aşağıdaki belirtilerden birini yaşıyorsanız aracı zorlamadan servise getirmenizi öneririz. Erken müdahale çoğu zaman komple revizyonu önler.',
      items: [
        '<strong>Vites geçişlerinde sarsıntı veya darbe</strong> — özellikle 1-2 ve 2-3 geçişlerinde hissedilen sert vuruntu',
        '<strong>Devir yükseliyor ama araç hızlanmıyor</strong> — kavrama balatalarının kayması (slip)',
        '<strong>Vites geç giriyor</strong> — P/R veya P/D geçişinde 2-3 saniyeyi aşan gecikme',
        '<strong>Araç harekete geçmiyor</strong> — hidrolik basınç kaybı veya pompa arızası',
        '<strong>Gösterge panelinde arıza lambası</strong> — şanzıman kontrol ünitesi hata kaydetti',
        '<strong>Şanzıman yağında yanık kokusu veya koyu renk</strong> — aşırı ısınma ve balata aşınması',
        '<strong>Rölantide uğultu / metalik ses</strong> — rulman veya planet dişli grubunda hasar',
        '<strong>Araç acil (limp) moda geçiyor</strong> — genellikle 3. viteste sabitlenir, hız sınırlanır',
        '<strong>Aracın altında kırmızımsı yağ sızıntısı</strong> — keçe veya conta kaçağı'
      ]
    },
    scope: {
      h2: 'Onarım kapsamımız',
      items: [
        'Komple şanzıman sökümü, temizliği ve parça bazında ölçümü',
        'Kavrama (debriyaj) balata ve çelik disk yenileme',
        'Keçe, conta ve o-ring takımlarının komple değişimi',
        'Valf bloğu (valve body) temizliği, revizyonu veya değişimi',
        'Solenoid ve basınç sensörü testi / yenileme',
        'Tork konvertörü kontrolü, gerekirse revizyonu veya yenilenmesi',
        'Planet dişli grubu, rulman ve mil kontrolü',
        'Yağ soğutucu (radyatör) hattının basınçlı temizliği',
        'Montaj sonrası basınç testi, adaptasyon ve yol testi'
      ]
    },
    steps: [
      { t: '1. Ön görüşme ve randevu', d: 'Aracın markası, modeli, şanzıman tipi ve şikâyetiniz kaydedilir. Uygun gün ve saat için randevu oluşturulur.' },
      { t: '2. Ücretsiz arıza tespiti', d: 'Hata kodları okunur, yağ analizi ve yol testi yapılır. Gerekirse basınç ölçümü alınır.' },
      { t: '3. Onarım teklifi ve onay', d: 'Tespit edilen arıza, yapılacak işlemler ve maliyet net biçimde paylaşılır. Onayınız olmadan işleme başlanmaz.' },
      { t: '4. Onarım ve montaj', d: 'Şanzıman sökülür, arızalı parçalar yenilenir, temizlik ve montaj yapılır.' },
      { t: '5. Test ve teslim', d: 'Adaptasyon yapılır, yol testi gerçekleştirilir ve araç garanti belgesiyle teslim edilir.' }
    ],
    faqs: [
      { q: 'Otomatik şanzıman tamiri ne kadar sürer?', a: 'Arızanın kapsamına göre değişir. Solenoid veya valf bloğu müdahalesi genellikle 1 iş günü içinde tamamlanır. Komple revizyon gerektiren işlemler, parça teminine bağlı olarak 2–5 iş günü sürebilir. Kesin süre arıza tespiti sonrasında bildirilir.' },
      { q: 'Şanzımanı sökmeden arızayı anlayabilir misiniz?', a: 'Çoğu durumda evet. Hata kodu okuma, yağ analizi, basınç ölçümü ve yol testi ile arızanın hidrolik mi, elektronik mi yoksa mekanik mi olduğunu büyük ölçüde belirleyebiliyoruz. Mekanik iç hasar şüphesinde kesin sonuç için söküm gerekir.' },
      { q: 'Tamir mi ettirmeliyim, şanzıman değiştirmeli miyim?', a: 'Bu karar hasarın boyutuna bağlıdır. Balata, keçe, solenoid veya valf bloğu kaynaklı arızalarda onarım hem daha ekonomik hem de kalıcıdır. Gövde çatlağı ya da yaygın dişli hasarı gibi durumlarda yenileme değerlendirilir. Tespit sonrası her iki seçeneği de maliyetiyle birlikte anlatırız.' },
      { q: 'Onarıma garanti veriyor musunuz?', a: 'Evet. Yapılan işçilik ve değişen parçalar için garanti veriyoruz. Garanti kapsamı ve süresi, uygulanan işleme göre teslim sırasında yazılı olarak belirtilir.' },
      { q: 'Arıza tespiti ücretli mi?', a: 'Hayır. Arıza tespiti ücretsizdir. Onarım kararını, tespit sonucunu ve maliyeti gördükten sonra siz verirsiniz.' },
      { q: 'Aracımı çektirmem gerekir mi?', a: 'Araç vites atmıyor, harekete geçmiyor veya acil moda geçtiyse aracı zorlamadan çekici ile getirmeniz en doğrusudur. Sürüşe devam etmek çoğu zaman hasarı büyütür.' }
    ],
    related: [
      { href: 'hizmetler/sanziman-revizyonu/', label: 'Şanzıman revizyonu nedir, ne zaman gerekir?' },
      { href: 'hizmetler/tork-konvertoru-tamiri/', label: 'Tork konvertörü tamiri' },
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı ve filtre değişimi' },
      { href: 'blog/otomatik-sanziman-ariza-belirtileri/', label: 'Rehber: Otomatik şanzıman arıza belirtileri' }
    ]
  },

  {
    slug: 'dsg-sanziman-tamiri',
    nav: 'DSG Şanzıman Tamiri',
    title: 'DSG Şanzıman Tamiri Bursa | Mekatronik & Debriyaj',
    h1: 'DSG Şanzıman Tamiri',
    description: 'Bursa’da DSG (DQ200, DQ250, DQ381) şanzıman tamiri, mekatronik onarımı ve debriyaj değişimi. Volkswagen, Audi, Skoda, Seat için uzman servis.',
    kicker: 'DQ200 · DQ250 · DQ381 · DQ500',
    lead: 'Kalkışta titreme, düşük viteslerde tekleme veya “şanzıman arızası” uyarısı DSG şanzımanlarda en sık görülen şikâyetlerdir. Kuru ve ıslak tip DSG kutularında mekatronik ve debriyaj onarımı yapıyoruz.',
    intro: [
      'DSG (Direct Shift Gearbox), iki ayrı debriyaj üzerinden çalışan çift kavramalı bir otomatik şanzımandır. Klasik otomatiklerden farklı olarak tork konvertörü yerine debriyaj kullanır; bu da onu daha hızlı ve yakıt açısından verimli yapar, ancak <strong>debriyaj ve mekatronik ünitesi</strong> daha çok yıpranır.',
      'Volkswagen grubu araçlarında en yaygın tipler <strong>DQ200 (7 ileri, kuru debriyaj)</strong>, <strong>DQ250 (6 ileri, ıslak debriyaj)</strong> ve daha yeni <strong>DQ381 / DQ500</strong> kutularıdır. Her birinin tipik arıza karakteri farklıdır: DQ200’de mekatronik ve kuru debriyaj problemleri, DQ250’de ise balata aşınması ve yağ/filtre kaynaklı sorunlar öne çıkar.',
      'Atölyemizde DSG şanzımanlarda hem <strong>mekatronik ünitesi onarımı</strong> hem de <strong>debriyaj seti yenileme</strong> yapılmakta, işlem sonrasında zorunlu olan <strong>debriyaj adaptasyonu ve temel ayar</strong> uygulanmaktadır. Adaptasyon yapılmadan tamamlanan bir DSG onarımı kısa sürede aynı şikâyeti tekrar üretir.'
    ],
    symptoms: {
      h2: 'DSG şanzıman arıza belirtileri',
      intro: 'DSG kutularda arızalar genellikle kademeli ilerler. İlk belirtide müdahale, debriyaj setinin yanmasını ve maliyetin büyümesini önler.',
      items: [
        '<strong>Kalkışta titreme / zıplama</strong> — debriyaj balatalarının aşınması veya adaptasyon bozukluğu',
        '<strong>Düşük viteslerde tekleme, sarsıntı</strong> — 1-2 ve 2-3 geçişlerinde belirgin',
        '<strong>“Şanzıman arızası — servise başvurun” uyarısı</strong> — mekatronik hata kaydı',
        '<strong>Vites atmıyor, N konumunda kalıyor</strong> — mekatronik valf veya sensör arızası',
        '<strong>Rölantide tıkırtı sesi</strong> — çift kütleli volan veya debriyaj çatalı',
        '<strong>Geri viteste zorlanma veya girmeme</strong>',
        '<strong>Araç acil moda geçiyor, hız sınırlanıyor</strong>',
        '<strong>Şanzıman yağı kaçağı (ıslak tip DQ250/DQ500)</strong>'
      ]
    },
    scope: {
      h2: 'DSG servis kapsamımız',
      items: [
        'Mekatronik ünitesi arıza tespiti, sökümü ve onarımı',
        'Kuru debriyaj (DQ200) seti değişimi',
        'Islak debriyaj (DQ250 / DQ500) paketi yenileme',
        'Çift kütleli volan kontrolü ve değişimi',
        'DSG yağı ve filtre değişimi (üretici spesifikasyonunda yağ ile)',
        'Basınç akümülatörü ve solenoid kontrolü',
        'Hata kodu silme, temel ayar ve <strong>debriyaj adaptasyonu</strong>',
        'Yol testi ile geçiş kalitesinin doğrulanması'
      ]
    },
    table: {
      h2: 'DSG tipleri ve tipik arızaları',
      intro: 'Aracınızdaki kutu tipini bilmiyorsanız şasi numarasından tespit edebiliriz.',
      head: ['Şanzıman', 'Tip', 'Sık görülen araçlar', 'Tipik arıza'],
      rows: [
        ['DQ200 (0AM)', '7 ileri · kuru debriyaj', 'Golf, Polo, Passat 1.2/1.4 TSI, Octavia, Ibiza', 'Mekatronik arızası, kalkışta titreme, debriyaj aşınması'],
        ['DQ250 (02E)', '6 ileri · ıslak debriyaj', 'Golf GTI, Passat 2.0 TDI, Tiguan, Superb', 'Balata aşınması, yağ/filtre kaynaklı sarsıntı, valf tıkanması'],
        ['DQ381 / DQ500', '7 ileri · ıslak debriyaj', 'Yeni nesil Golf, Tiguan, Transporter', 'Mekatronik yazılım/valf sorunları, yağ bakımı ihmali'],
        ['DL501 (S-tronic)', '7 ileri · boyuna, ıslak', 'Audi A4, A5, A6, Q5 quattro', 'Mekatronik, debriyaj paketi, yağ pompası']
      ]
    },
    steps: [
      { t: '1. Hata kodu ve canlı veri okuma', d: 'Şanzıman kontrol ünitesinden hata kayıtları ve debriyaj adaptasyon değerleri okunur.' },
      { t: '2. Yol testi', d: 'Şikâyetin hangi vites ve hangi yükte oluştuğu birebir doğrulanır.' },
      { t: '3. Kapsam belirleme', d: 'Sorunun mekatronik mi, debriyaj mı yoksa yağ/filtre kaynaklı mı olduğu netleştirilir ve teklif sunulur.' },
      { t: '4. Onarım', d: 'İlgili ünite sökülür, onarılır veya yenilenir; ıslak tiplerde yağ ve filtre yenilenir.' },
      { t: '5. Adaptasyon ve teslim', d: 'Debriyaj adaptasyonu ve temel ayar yapılır, yol testiyle doğrulanır ve araç teslim edilir.' }
    ],
    faqs: [
      { q: 'DSG şanzımanda kalkışta titreme neden olur?', a: 'En yaygın nedenler debriyaj balatalarının aşınması, adaptasyon değerlerinin bozulması ve mekatronik ünitesindeki basınç kontrolü sorunlarıdır. Bazı durumlarda sadece yazılım adaptasyonu şikâyeti giderir; bu nedenle önce ölçüm yapıyor, gereksiz parça değişimi önermiyoruz.' },
      { q: 'DSG yağı kaç kilometrede değişmeli?', a: 'Islak debriyajlı DSG kutularında (DQ250, DQ500, DL501) üreticiler genellikle 60.000 km civarında yağ ve filtre değişimi öngörür. Kuru debriyajlı DQ200’de şanzıman yağı ömürlük kabul edilse de mekatronik hidrolik yağının kontrolü önemlidir. Şehir içi yoğun kullanımda aralığı kısaltmanızı öneririz.' },
      { q: 'Mekatronik ünitesi onarılabilir mi, yoksa değişmeli mi?', a: 'Çoğu mekatronik arızası onarılabilir. Solenoid, basınç sensörü ve kart üzerindeki lehim/iletken sorunları giderilebilir. Yalnızca ağır elektronik hasarda ünite yenilenir. Hangi yolun uygun olduğunu tespit sonrası maliyet karşılaştırmasıyla anlatırız.' },
      { q: 'DSG onarımı sonrası adaptasyon şart mı?', a: 'Evet, kesinlikle. Debriyaj veya mekatronik müdahalesi sonrası temel ayar ve adaptasyon yapılmazsa şanzıman doğru kavrama noktasını bilemez; kısa sürede aynı titreme ve sarsıntı şikâyeti tekrarlar.' },
      { q: 'Hangi markalara DSG servisi veriyorsunuz?', a: 'Volkswagen, Audi, Skoda ve Seat başta olmak üzere VAG grubu araçların DSG ve S-tronic şanzımanlarına servis veriyoruz. Ford PowerShift ve Porsche PDK gibi diğer çift kavramalı sistemlerde de hizmet sunuyoruz.' }
    ],
    related: [
      { href: 'hizmetler/mekatronik-tamiri/', label: 'Mekatronik ünitesi tamiri' },
      { href: 'markalar/volkswagen-dsg-sanziman-tamiri/', label: 'Volkswagen DSG şanzıman servisi' },
      { href: 'markalar/audi-sanziman-tamiri/', label: 'Audi S-tronic / Multitronic servisi' },
      { href: 'blog/dsg-sanziman-bakimi-rehberi/', label: 'Rehber: DSG şanzıman bakımı' }
    ]
  },

  {
    slug: 'cvt-sanziman-tamiri',
    nav: 'CVT Şanzıman Tamiri',
    title: 'CVT Şanzıman Tamiri Bursa | Kayış ve Konik Onarımı',
    h1: 'CVT Şanzıman Tamiri',
    description: 'Bursa’da CVT şanzıman tamiri: kayış (çelik bant) değişimi, konik yüzey kontrolü, valf bloğu ve step motor onarımı. Audi Multitronic, Mercedes Autotronic.',
    kicker: 'Kayışlı ve zincirli CVT',
    lead: 'CVT şanzımanlar kademesiz çalışır; bu yüzden arıza belirtileri klasik otomatiklerden farklıdır. Uğultu, kayma ve titreşim şikâyetlerinde kayış ve konik yüzey kontrolü yapıyoruz.',
    intro: [
      'CVT (Continuously Variable Transmission — kademesiz şanzıman), sabit vites kademeleri yerine iki konik kasnak arasında gerilen <strong>çelik kayış veya zincir</strong> ile çalışır. Kasnakların açıklığı değiştikçe çevrim oranı kademesiz olarak değişir. Bu yapı yakıt verimliliği ve sarsıntısız sürüş sağlar, ancak sistem <strong>yağ kalitesine ve temizliğine olağanüstü duyarlıdır</strong>.',
      'CVT arızalarının büyük bölümü mekanik hatadan değil, <strong>bakımsızlıktan</strong> kaynaklanır. Ömrünü doldurmuş yağ sürtünme katsayısını değiştirir; kayış kasnak üzerinde mikro kaymalar yapar ve konik yüzeylerde iz bırakır. Bu iz oluştuktan sonra sadece yağ değiştirmek sorunu çözmez.',
      'Bu nedenle CVT şanzımanlarda <strong>koruyucu bakım, onarımdan çok daha ekonomiktir</strong>. Aracınızda henüz şikâyet yoksa bile, üreticinin öngördüğü aralıkta CVT yağı değişimi yaptırmanızı öneriyoruz.'
    ],
    symptoms: {
      h2: 'CVT şanzıman arıza belirtileri',
      intro: 'CVT’de en tehlikeli belirti “uğultu”dur; genellikle kayış ve kasnak temasının bozulduğunu gösterir.',
      items: [
        '<strong>Hızla birlikte artan uğultu / vınlama sesi</strong> — kayış veya rulman aşınması',
        '<strong>Gaza basınca devir yükseliyor, hız artmıyor</strong> — kayış kayması',
        '<strong>Kalkışta veya düşük hızda titreme (judder)</strong> — yağ bozulması, kasnak yüzey hasarı',
        '<strong>Sürüş sırasında ani güç kaybı</strong>',
        '<strong>Araç acil moda giriyor, devir sınırlanıyor</strong>',
        '<strong>Yokuş çıkışta zorlanma, ısınma uyarısı</strong>',
        '<strong>Vites kolu D konumunda ama araç geç tepki veriyor</strong>',
        '<strong>Şanzıman yağında metalik parıltı</strong> — kayış/kasnak aşınmasının kesin işareti'
      ]
    },
    scope: {
      h2: 'CVT servis kapsamımız',
      items: [
        'CVT yağı ve filtre değişimi (üretici spesifikasyonunda özel CVT yağı ile)',
        'Çelik kayış / zincir kontrolü ve değişimi',
        'Konik kasnak (pulley) yüzey kontrolü ve yenileme',
        'Step motor ve basınç kontrol solenoidi testi',
        'Valf bloğu temizliği ve revizyonu',
        'Kalkış debriyajı / tork konvertörü kontrolü',
        'Diferansiyel ve rulman kontrolü',
        'Basınç testi, adaptasyon ve yol testi'
      ]
    },
    steps: [
      { t: '1. Yağ ve hata kodu kontrolü', d: 'Yağ rengi, kokusu ve metalik partikül varlığı incelenir; hata kayıtları okunur.' },
      { t: '2. Yol testi', d: 'Uğultu, kayma ve titreme şikâyetinin hangi hız/yük aralığında oluştuğu doğrulanır.' },
      { t: '3. İç kontrol', d: 'Gerekirse şanzıman sökülerek kayış ve kasnak yüzeyleri ölçüm ile değerlendirilir.' },
      { t: '4. Onarım', d: 'Aşınan kayış/kasnak yenilenir, valf bloğu ve solenoidler revize edilir.' },
      { t: '5. Yağ, adaptasyon ve teslim', d: 'Doğru spesifikasyonda CVT yağı doldurulur, adaptasyon ve yol testi yapılır.' }
    ],
    faqs: [
      { q: 'CVT yağı normal şanzıman yağıyla değiştirilebilir mi?', a: 'Hayır. CVT şanzımanlar, kayış ile kasnak arasında belirli bir sürtünme katsayısı sağlayan özel formülasyonlu yağ kullanır. Yanlış yağ kullanımı kısa sürede kaymaya ve kasnak yüzeylerinde kalıcı hasara yol açar. Her zaman aracın üreticisinin belirlediği spesifikasyondaki yağ kullanılmalıdır.' },
      { q: 'CVT şanzıman yağı kaç kilometrede değişir?', a: 'Marka ve modele göre değişmekle birlikte genel aralık 40.000–60.000 km’dir. Şehir içi dur-kalk kullanım, çekiş yapılan araçlar ve sıcak iklim koşullarında bu aralığın kısaltılması önerilir. Aracınızın bakım kitapçığındaki değeri esas alırız.' },
      { q: 'CVT’den uğultu geliyorsa ne yapmalıyım?', a: 'Uğultu genellikle kayış-kasnak temasının bozulduğunu veya rulman aşınmasını gösterir ve ilerleyici bir arızadır. Aracı zorlamadan en kısa sürede kontrole getirmenizi öneririz; erken aşamada yapılan müdahale kasnak değişimini önleyebilir.' },
      { q: 'CVT şanzıman tamir edilebilir mi, yoksa komple mi değişir?', a: 'Kayış, rulman, valf bloğu ve solenoid kaynaklı arızalar onarılabilir. Konik kasnak yüzeylerinde derin iz oluşmuşsa kasnak grubu da yenilenir. Komple değişim yalnızca yaygın iç hasarda gündeme gelir — tespit sonrası her iki seçeneği de maliyetiyle paylaşırız.' },
      { q: 'CVT araç çeker mi, römork takılabilir mi?', a: 'CVT şanzımanlar yüksek ve sürekli tork altında klasik otomatiklere göre daha hassastır. Üreticinin izin verdiği çekme kapasitesini aşmamak, uzun yokuşlarda yağ sıcaklığına dikkat etmek şanzıman ömrünü belirgin şekilde uzatır.' }
    ],
    related: [
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı ve filtre değişimi' },
      { href: 'markalar/audi-sanziman-tamiri/', label: 'Audi Multitronic (zincirli CVT) servisi' },
      { href: 'blog/cvt-sanziman-nedir-nasil-calisir/', label: 'Rehber: CVT şanzıman nedir, nasıl çalışır?' }
    ]
  },

  {
    slug: 'tork-konvertoru-tamiri',
    nav: 'Tork Konvertörü Tamiri',
    title: 'Tork Konvertörü Tamiri Bursa | Balata ve Balans',
    h1: 'Tork Konvertörü Tamiri',
    description: 'Bursa’da tork konvertörü (torkmatik) tamiri ve balans ayarı. Titreme, uğultu ve kilitleme (lock-up) arızalarında uzman onarım.',
    kicker: 'Kilitleme balatası · Balans · Kaynak',
    lead: 'Belirli hızlarda gelen titreme ve rölantide duran araçta stop etme şikâyetlerinin çoğu tork konvertörü kaynaklıdır. Konvertörü kesip revize ediyor, balans ayarı yaparak yeniden kaynaklıyoruz.',
    intro: [
      'Tork konvertörü, motor ile otomatik şanzıman arasındaki hidrolik bağlantıyı sağlayan parçadır. Kısaca “sıvı kavrama” olarak düşünülebilir: motorun ürettiği tork, yağ akışıyla şanzımana aktarılır. Belirli bir hızın üzerinde ise <strong>kilitleme (lock-up) debriyajı</strong> devreye girerek doğrudan mekanik bağlantı kurar ve yakıt tüketimini düşürür.',
      'Bu kilitleme debriyajının balatası zamanla aşınır. Aşınan balata hem <strong>titreme</strong> yaratır hem de şanzıman yağını kirleterek valf bloğunu ve solenoidleri tıkar. Bu nedenle tork konvertörü arızası, ihmal edildiğinde <strong>tüm şanzımanı etkileyen</strong> bir zincirleme hasara dönüşür.',
      'Atölyemizde tork konvertörü tamiri, konvertörün kesilerek açılması, iç bileşenlerin yenilenmesi, <strong>balans ayarı</strong> yapılması ve sızdırmazlık testiyle yeniden kaynaklanması şeklinde uygulanır. Balans ayarı yapılmadan kapatılan bir konvertör, araçta yüksek devirde titreşim üretir.'
    ],
    symptoms: {
      h2: 'Tork konvertörü arıza belirtileri',
      items: [
        '<strong>Belirli hız aralığında titreme</strong> — genellikle 60–90 km/s arasında, lock-up devredeyken',
        '<strong>Rölantide araç stop ediyor</strong> — kilitleme debriyajı ayrılamıyor',
        '<strong>Kalkışta zorlanma, güç kaybı</strong>',
        '<strong>Vites boştayken kaybolan, viteste artan uğultu</strong>',
        '<strong>Şanzıman yağının hızlı kararması</strong> — balata tozu yağa karışıyor',
        '<strong>Şanzıman aşırı ısınıyor</strong>',
        '<strong>Yokuş çıkışta devir yükselmesi, hızın artmaması</strong>',
        '<strong>Vites geçişlerinde gecikme ve sertlik</strong>'
      ]
    },
    scope: {
      h2: 'Tork konvertörü onarım kapsamı',
      items: [
        'Konvertörün araçtan sökülmesi ve kesilerek açılması',
        'Kilitleme (lock-up) debriyaj balatasının yenilenmesi',
        'Stator, türbin ve pompa kanatlarının kontrolü',
        'Tek yönlü (one-way) rulman ve burç değişimi',
        'Keçe ve o-ring yenileme',
        'Hassas <strong>balans ayarı</strong>',
        'Yeniden kaynaklama ve basınçlı sızdırmazlık testi',
        'Şanzıman yağı, filtre ve soğutucu hattının temizliği'
      ]
    },
    faqs: [
      { q: 'Tork konvertörü tamir mi edilir, değiştirilir mi?', a: 'Kilitleme balatası, rulman ve keçe kaynaklı arızaların büyük bölümünde revizyon yeterlidir ve yenisine göre belirgin şekilde ekonomiktir. Gövde deformasyonu veya kanat hasarı varsa yenileme önerilir.' },
      { q: 'Tork konvertörü değişirken şanzıman yağı da değişmeli mi?', a: 'Evet, mutlaka. Aşınan balata tozu yağın içine karışır ve valf bloğunu tıkar. Konvertör onarımı sırasında yağ, filtre ve yağ soğutucu hattı da temizlenmez veya yenilenmezse arıza kısa sürede tekrarlar.' },
      { q: 'Titreme her zaman tork konvertöründen mi kaynaklanır?', a: 'Hayır. Motor takozları, aktarma mili, jant balansı ve buji/ateşleme sorunları da benzer titreşim yaratabilir. Bu nedenle yol testi ve ölçümle konvertör kaynaklı olduğunu doğrulamadan işleme başlamıyoruz.' },
      { q: 'Balans ayarı neden önemli?', a: 'Tork konvertörü motor devriyle birlikte döner. Kaynak sonrası balans ayarı yapılmazsa yüksek devirde titreşim oluşur; bu titreşim hem konforu bozar hem de şanzıman ön keçesi ve krank rulmanına zarar verir.' }
    ],
    related: [
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı ve filtre değişimi' },
      { href: 'blog/tork-konvertoru-arizasi-belirtileri/', label: 'Rehber: Tork konvertörü arızası belirtileri' }
    ]
  },

  {
    slug: 'sanziman-revizyonu',
    nav: 'Şanzıman Revizyonu',
    title: 'Şanzıman Revizyonu Bursa | Komple Bakım ve Yenileme',
    h1: 'Şanzıman Revizyonu',
    description: 'Bursa’da komple şanzıman revizyonu: söküm, parça bazında ölçüm, aşınan bileşenlerin yenilenmesi, montaj ve test. Garantili işçilik.',
    kicker: 'Söküm · Ölçüm · Yenileme · Adaptasyon',
    lead: 'Revizyon, şanzımanın komple sökülüp her parçasının ölçülerek değerlendirilmesi ve aşınan bileşenlerin yenilenmesidir. Yüksek kilometreli araçlarda şanzımanı ilk günkü performansına yaklaştırır.',
    intro: [
      '“Şanzıman revizyonu” (overhaul), tek bir parçanın değişimi değil; şanzımanın araçtan sökülüp <strong>tamamen parçalarına ayrılması</strong>, her bileşenin ölçülerek değerlendirilmesi ve aşınmış olanların yenilenmesi işlemidir. Revizyon sonrası şanzıman, tolerans değerleri içinde yeniden monte edilir.',
      'Revizyon genellikle şu durumlarda gündeme gelir: yüksek kilometre nedeniyle birden fazla bileşende aşınma, uzun süre ihmal edilmiş bir arızanın yaygın hasara dönüşmesi, aşırı ısınma sonucu balataların yanması veya şanzıman içine metal partikül yayılması.',
      'Önemli bir nokta: <strong>her arıza revizyon gerektirmez</strong>. Sadece solenoid, keçe veya valf bloğu kaynaklı bir sorun için komple revizyon yapmak gereksiz maliyettir. Bu yüzden her araçta önce ayrıntılı tespit yapar, revizyon gerçekten gerekliyse kapsamını kalem kalem açıklarız.'
    ],
    scope: {
      h2: 'Revizyon kapsamında yapılanlar',
      items: [
        'Şanzımanın araçtan sökülmesi ve tezgâhta tamamen parçalanması',
        'Tüm parçaların basınçlı yıkama ile temizliği',
        'Parça bazında ölçüm ve aşınma raporu',
        'Kavrama balataları ve çelik disklerin yenilenmesi',
        'Komple keçe, conta ve o-ring takımı değişimi',
        'Rulman, burç ve pul (thrust washer) yenileme',
        'Planet dişli grubu ve mil kontrolü',
        'Valf bloğu revizyonu, solenoid testi',
        'Tork konvertörü revizyonu veya yenilenmesi',
        'Yağ soğutucu hattının basınçlı temizliği',
        'Montaj, basınç testi, adaptasyon ve yol testi'
      ]
    },
    steps: [
      { t: '1. Tespit ve karar', d: 'Revizyonun gerçekten gerekli olup olmadığı ölçüm ve testlerle belirlenir.' },
      { t: '2. Söküm ve parçalama', d: 'Şanzıman araçtan alınır, tezgâhta parçalarına ayrılır ve temizlenir.' },
      { t: '3. Ölçüm ve raporlama', d: 'Her bileşen ölçülür; hangi parçanın neden değişeceği net biçimde paylaşılır.' },
      { t: '4. Yenileme ve montaj', d: 'Aşınan parçalar yenilenir, şanzıman tolerans değerlerinde monte edilir.' },
      { t: '5. Test ve teslim', d: 'Basınç testi, adaptasyon ve yol testi yapılır; araç garanti belgesiyle teslim edilir.' }
    ],
    faqs: [
      { q: 'Şanzıman revizyonu ne zaman gerekir?', a: 'Birden fazla bileşende aşınma tespit edildiğinde, şanzıman içinde metal partikül bulunduğunda, balatalar yandığında veya uzun süre ihmal edilmiş bir arıza yaygın hasara dönüştüğünde revizyon önerilir. Tek bir parçanın arızasında revizyon gerekmez.' },
      { q: 'Revizyon ile komple değişim arasındaki fark nedir?', a: 'Revizyonda mevcut şanzımanınız korunur; yalnızca aşınan parçalar yenilenir. Komple değişimde şanzıman ünitesi tamamen yenisiyle veya yenilenmiş bir üniteyle değiştirilir. Revizyon genellikle daha ekonomiktir ve aracın orijinal ünitesini korur.' },
      { q: 'Revizyon sonrası şanzıman ne kadar dayanır?', a: 'Doğru yapılan bir revizyonda, aşınan tüm bileşenler yenilendiği için şanzıman uzun yıllar sorunsuz kullanılabilir. Ömrü belirleyen asıl faktör, sonrasındaki bakım disiplinidir: yağ değişim aralığına uyulması ve soğutma sisteminin sağlıklı çalışması.' },
      { q: 'Revizyon kaç gün sürer?', a: 'Kapsama ve parça teminine bağlı olarak genellikle 2–5 iş günüdür. Süreç başında size tahmini teslim tarihi bildirilir.' }
    ],
    related: [
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'hizmetler/tork-konvertoru-tamiri/', label: 'Tork konvertörü tamiri' },
      { href: 'hizmetler/sanziman-ariza-tespiti/', label: 'Şanzıman arıza tespiti (diagnostik)' }
    ]
  },

  {
    slug: 'sanziman-yagi-degisimi',
    nav: 'Şanzıman Yağı Değişimi',
    title: 'Şanzıman Yağı Değişimi Bursa | Filtre ve Karter',
    h1: 'Şanzıman Yağı ve Filtre Değişimi',
    description: 'Bursa’da otomatik şanzıman yağı değişimi. Karter sökümlü bakım, filtre ve conta yenileme, üretici spesifikasyonunda ATF/CVT/DSG yağı.',
    kicker: 'ATF · DSG · CVT yağları',
    lead: 'Şanzıman yağı sadece yağlamaz; hidrolik basıncı taşır, soğutur ve kavrama performansını belirler. Zamanında yapılan yağ bakımı, şanzıman arızalarının en etkili önleyicisidir.',
    intro: [
      'Otomatik şanzımanlarda yağ (ATF), motor yağından çok daha kritik bir görev üstlenir. Yağlamanın yanı sıra <strong>hidrolik basıncı iletir</strong>, kavrama balatalarının sürtünme davranışını belirler ve şanzımanı soğutur. Ömrünü doldurmuş yağ bu üç görevin üçünü birden aksatır.',
      'Yaşlanan yağda sürtünme katsayısı değişir; vites geçişleri sertleşir veya kayar. Balata tozu ve metal partikülleri yağın içinde birikerek <strong>valf bloğunu ve solenoidleri tıkar</strong>. Bu noktadan sonra sorun artık “yağ değişimiyle” çözülmez hale gelir. Şanzıman arızalarının önemli bir kısmının kökeninde ihmal edilmiş yağ bakımı vardır.',
      '“Ömürlük yağ” ifadesi Türkiye’deki kullanım koşulları için yanıltıcıdır. Şehir içi dur-kalk trafik, yüksek yaz sıcaklıkları ve yokuşlu güzergâhlar yağın termal yaşlanmasını hızlandırır. Aracınızın kullanım profiline göre gerçekçi bir bakım aralığı öneriyoruz.'
    ],
    scope: {
      h2: 'Yağ bakımında yaptığımız işlemler',
      items: [
        'Mevcut yağın seviye, renk, koku ve partikül analizi',
        'Karter sökümü ve şanzıman içinin temizliği',
        'Yağ filtresi ve karter contası yenileme',
        'Mıknatısların temizliği (metal partikül kontrolü)',
        'Üretici spesifikasyonunda ATF / CVT / DSG yağı dolumu',
        'Yağ seviyesinin <strong>sıcaklık kontrollü</strong> ayarlanması',
        'Gerekirse yağ soğutucu (radyatör) hattının basınçlı temizliği',
        'Hata kodu kontrolü, adaptasyon ve yol testi'
      ]
    },
    table: {
      h2: 'Şanzıman tipine göre yağ bakım aralıkları',
      intro: 'Aşağıdaki değerler genel referanstır. Kesin aralık aracınızın bakım kitapçığına ve kullanım profiline göre belirlenir.',
      head: ['Şanzıman tipi', 'Yağ tipi', 'Genel bakım aralığı', 'Not'],
      rows: [
        ['Klasik otomatik (torklu)', 'ATF (üretici spesifik)', '60.000 – 80.000 km', 'Şehir içi yoğun kullanımda kısaltılmalı'],
        ['DSG — ıslak debriyaj', 'DSG özel yağı', '~60.000 km', 'Filtre birlikte değişmeli'],
        ['DSG — kuru debriyaj (DQ200)', 'Mekatronik hidrolik yağı', 'Kontrol esaslı', 'Şanzıman yağı ömürlük kabul edilir'],
        ['CVT', 'CVT özel yağı', '40.000 – 60.000 km', 'Kesinlikle ATF ile değiştirilmemeli']
      ]
    },
    faqs: [
      { q: 'Şanzıman yağı değişmezse ne olur?', a: 'Yağ yaşlandıkça hidrolik basıncı doğru iletemez, kavrama balataları kayar ve aşınır. Biriken balata tozu ile metal partikülleri valf bloğunu ve solenoidleri tıkar. Sonuçta vites geçişlerinde sarsıntı, kayma ve nihayetinde komple revizyon gerektiren hasar ortaya çıkar.' },
      { q: 'Yağ değişiminde “makine ile şok yıkama” yapılmalı mı?', a: 'Yüksek kilometreli ve uzun süre bakımı ihmal edilmiş şanzımanlarda basınçlı yıkama, tortuların yerinden oynayarak kanalları tıkamasına yol açabilir. Bu araçlarda karter sökümlü, kontrollü değişimi tercih ediyoruz. Yöntem kararını şanzımanın durumuna göre veriyoruz.' },
      { q: 'Sadece yağ değişimi arızamı çözer mi?', a: 'Erken aşamadaki sarsıntı ve gecikme şikâyetlerinin bir kısmı yağ ve filtre yenilemesiyle düzelebilir. Ancak balata aşınması veya mekanik hasar varsa yağ değişimi kalıcı çözüm sağlamaz. Bu nedenle önce tespit yapıyor, beklentiyi baştan net anlatıyoruz.' },
      { q: 'Yağ seviyesi neden sıcaklık kontrollü ayarlanıyor?', a: 'Otomatik şanzımanlarda doğru yağ seviyesi belirli bir yağ sıcaklığı aralığında (genellikle 35–45 °C) ölçülür. Soğukken veya aşırı sıcakken yapılan ölçüm hatalı sonuç verir; eksik ya da fazla yağ ise arızaya yol açar.' }
    ],
    related: [
      { href: 'hizmetler/cvt-sanziman-tamiri/', label: 'CVT şanzıman tamiri' },
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'blog/sanziman-yagi-ne-zaman-degismeli/', label: 'Rehber: Şanzıman yağı ne zaman değişmeli?' }
    ]
  },

  {
    slug: 'sanziman-ariza-tespiti',
    nav: 'Arıza Tespiti (Diagnostik)',
    title: 'Şanzıman Arıza Tespiti Bursa | Ücretsiz Diagnostik',
    h1: 'Şanzıman Arıza Tespiti (Diagnostik)',
    description: 'Bursa’da ücretsiz şanzıman arıza tespiti. Hata kodu okuma, canlı veri analizi, basınç ölçümü ve yol testi ile doğru teşhis.',
    kicker: 'Hata kodu · Canlı veri · Basınç · Yol testi',
    lead: 'Doğru onarım, doğru teşhisle başlar. Şanzımanı sökmeden önce hata kodu, canlı veri, basınç ölçümü ve yol testi ile arızanın gerçek kaynağını belirliyoruz. Arıza tespiti ücretsizdir.',
    intro: [
      'Şanzıman arızalarında en pahalı hata, <strong>yanlış teşhistir</strong>. Basit bir solenoid arızası için komple revizyon yapmak da, gerçekte iç hasarı olan bir şanzımana sadece yağ değiştirmek de aynı sonucu doğurur: gereksiz masraf ve tekrarlayan şikâyet.',
      'Bu yüzden atölyemizde her araç, onarım kararından önce standart bir <strong>tespit protokolünden</strong> geçer. Bu protokol arızanın <em>elektronik</em> mi, <em>hidrolik</em> mi yoksa <em>mekanik</em> mi olduğunu ayırt etmeyi hedefler — çünkü üçünün çözümü ve maliyeti birbirinden tamamen farklıdır.',
      'Arıza tespiti hizmetimiz <strong>ücretsizdir</strong> ve sizi hiçbir şeye bağlamaz. Tespit sonucunda ne bulduğumuzu, hangi seçeneklerin olduğunu ve her birinin maliyetini anlatırız; kararı siz verirsiniz.'
    ],
    scope: {
      h2: 'Tespit protokolümüz',
      items: [
        '<strong>Şikâyet analizi</strong> — sorunun ne zaman, hangi viteste, hangi sıcaklıkta oluştuğu',
        '<strong>Hata kodu okuma</strong> — şanzıman ve motor kontrol ünitelerinden kayıtlı ve anlık kodlar',
        '<strong>Canlı veri analizi</strong> — devir, yağ sıcaklığı, solenoid akımları, adaptasyon değerleri',
        '<strong>Yağ analizi</strong> — seviye, renk, koku ve metalik partikül kontrolü',
        '<strong>Yol testi</strong> — şikâyetin birebir doğrulanması ve geçiş kalitesinin gözlenmesi',
        '<strong>Hidrolik basınç ölçümü</strong> — hat basıncının üretici değerleriyle karşılaştırılması',
        '<strong>Görsel kontrol</strong> — kaçak, keçe, soğutucu hattı ve elektrik bağlantıları',
        '<strong>Raporlama</strong> — bulguların ve onarım seçeneklerinin maliyetiyle birlikte sunulması'
      ]
    },
    faqs: [
      { q: 'Arıza tespiti gerçekten ücretsiz mi?', a: 'Evet. Hata kodu okuma, yağ kontrolü ve yol testini içeren standart arıza tespitimiz ücretsizdir. Onarım kararını, bulguları ve maliyeti gördükten sonra siz verirsiniz.' },
      { q: 'Hata kodu okutmak arızayı bulmaya yeter mi?', a: 'Hayır. Hata kodu yalnızca hangi devrede sorun algılandığını söyler, nedenini söylemez. Örneğin bir basınç kodu; solenoid, valf bloğu, yağ seviyesi ya da aşınmış balata kaynaklı olabilir. Bu yüzden kodu her zaman canlı veri, basınç ölçümü ve yol testiyle birlikte değerlendiririz.' },
      { q: 'Aracımı bırakmam gerekir mi?', a: 'Standart tespit genellikle aynı gün içinde tamamlanır. Aracınızı bırakmanız gerekmeyebilir; yoğunluğa göre randevu sırasında bilgi veriyoruz.' },
      { q: 'Başka serviste teşhis kondu, ikinci görüş alabilir miyim?', a: 'Elbette. Elinizdeki teşhisi ve varsa raporları getirmeniz süreci hızlandırır. Kendi ölçümlerimizi bağımsız olarak yapar, bulgularımızı açıkça paylaşırız.' }
    ],
    related: [
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'hizmetler/sanziman-revizyonu/', label: 'Şanzıman revizyonu' },
      { href: 'sss/', label: 'Sıkça sorulan sorular' }
    ]
  },

  {
    slug: 'mekatronik-tamiri',
    nav: 'Mekatronik Tamiri',
    title: 'Mekatronik Ünitesi Tamiri Bursa | DSG ve ZF Şanzıman',
    h1: 'Mekatronik Ünitesi Tamiri',
    description: 'Bursa’da şanzıman mekatronik ünitesi tamiri. Solenoid, basınç sensörü ve kart onarımı; DSG, S-tronic ve ZF şanzımanlar için.',
    kicker: 'DSG · S-Tronic · ZF · Kodlama',
    lead: 'Mekatronik, şanzımanın beynidir. “Şanzıman arızası” uyarısı, vites atmama ve acil moda geçme şikâyetlerinin büyük kısmı mekatronik kaynaklıdır ve çoğu onarılabilir.',
    intro: [
      'Mekatronik ünitesi, elektronik kontrol kartı ile hidrolik valf bloğunun tek gövdede birleştiği bileşendir. Şanzıman kontrol ünitesinden gelen komutları solenoidler aracılığıyla hidrolik basınca çevirir; hangi kavramanın ne zaman ve hangi basınçla devreye gireceğini belirler.',
      'Mekatronik arızaları genellikle üç grupta toplanır: <strong>solenoid arızaları</strong> (tıkanma, bobin kopması), <strong>basınç sensörü hataları</strong> ve <strong>kart üzerindeki elektronik/lehim sorunları</strong>. Bunlara ek olarak kirlenmiş yağdan gelen partiküller valf kanallarını tıkayarak basınç kontrolünü bozabilir.',
      'Önemli avantajı şudur: <strong>mekatronik arızalarının büyük bölümü ünite yenilemeden onarılabilir.</strong> Ünite komple değiştirildiğinde hem maliyet ciddi şekilde artar hem de çoğu araçta kodlama/eşleştirme gerekir. Onarım mümkünse önce onu değerlendiriyoruz.'
    ],
    symptoms: {
      h2: 'Mekatronik arıza belirtileri',
      items: [
        '<strong>“Şanzıman arızası — servise başvurun” uyarısı</strong>',
        '<strong>Araç vites atmıyor, N konumunda kalıyor</strong>',
        '<strong>Acil (limp) moda geçiş, hız ve devir sınırlaması</strong>',
        '<strong>Belirli vitesin devreye girmemesi</strong>',
        '<strong>Kalkışta titreme ve sarsıntı</strong> (adaptasyon/basınç kontrolü)',
        '<strong>Geri vites çalışmıyor</strong>',
        '<strong>Araç çalıştırıldığında vites göstergesi yanıp sönüyor</strong>',
        '<strong>Basınç veya solenoid ile ilgili tekrar eden hata kodları</strong>'
      ]
    },
    scope: {
      h2: 'Mekatronik onarım kapsamı',
      items: [
        'Mekatronik ünitesinin sökümü ve tezgâhta test edilmesi',
        'Solenoidlerin tek tek elektriksel ve akış testi',
        'Basınç sensörü kontrolü ve yenileme',
        'Elektronik kart üzerindeki lehim ve iletken onarımı',
        'Valf bloğu kanallarının temizliği ve valf aşınma kontrolü',
        'Sızdırmazlık elemanlarının (o-ring, conta) yenilenmesi',
        'Montaj sonrası kodlama, temel ayar ve adaptasyon',
        'Yol testiyle geçiş kalitesinin doğrulanması'
      ]
    },
    faqs: [
      { q: 'Mekatronik tamir edilebilir mi?', a: 'Evet, çoğu durumda edilebilir. Solenoid, basınç sensörü, lehim/iletken ve valf kanalı tıkanıklığı kaynaklı arızalar onarılabilir. Yalnızca ağır elektronik hasarda ünite yenilenir.' },
      { q: 'Mekatronik değişince kodlama gerekir mi?', a: 'Genellikle evet. Yeni veya yenilenmiş ünitenin araca tanıtılması, temel ayar ve debriyaj adaptasyonu yapılması gerekir. Bu adım atlanırsa şanzıman doğru çalışmaz.' },
      { q: 'Mekatronik arızası neden oluşur?', a: 'En yaygın nedenler kirlenmiş veya ömrünü doldurmuş şanzıman yağı, ısı ve titreşimin elektronik kart üzerindeki etkisi, nem/su teması ve solenoidlerin doğal aşınmasıdır. Düzenli yağ bakımı bu arızaların önemli bir kısmını önler.' },
      { q: 'Aracım acil moda geçti, sürebilir miyim?', a: 'Acil mod şanzımanı korumak için devreye girer. Kısa mesafede servise ulaşmak mümkün olabilir, ancak sürüşü uzatmak arızayı büyütebilir. Aracı zorlamadan en kısa sürede kontrole getirmenizi öneririz.' }
    ],
    related: [
      { href: 'hizmetler/dsg-sanziman-tamiri/', label: 'DSG şanzıman tamiri' },
      { href: 'markalar/bmw-sanziman-tamiri/', label: 'BMW ZF şanzıman servisi' },
      { href: 'hizmetler/sanziman-ariza-tespiti/', label: 'Şanzıman arıza tespiti' }
    ]
  }
];

module.exports = { SERVICES };
