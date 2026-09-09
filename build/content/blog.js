/* =========================================================
   BLOG / REHBER SAYFALARI — /blog/*
   Bilgilendirici arama niyetini hedefler (huni üstü trafik).
   Article + FAQPage yapısal verisi ile yayınlanır.
   ========================================================= */

const POSTS = [
  {
    slug: 'otomatik-sanziman-ariza-belirtileri',
    title: 'Otomatik Şanzıman Arıza Belirtileri: 10 Uyarı İşareti',
    h1: 'Otomatik Şanzıman Arıza Belirtileri: Dikkat Etmeniz Gereken 10 İşaret',
    description: 'Otomatik şanzıman arızasının 10 belirtisi, her birinin olası nedeni ve ne yapmanız gerektiği. Erken teşhis onarım maliyetini düşürür.',
    published: '2026-01-15',
    modified: '2026-09-09',
    excerpt: 'Sarsıntı, kayma, gecikme, uğultu… Otomatik şanzımanınızın verdiği uyarıları okumayı öğrenin. Her belirtinin arkasındaki olası neden ve yapmanız gereken.',
    readingTime: '7 dakika',
    lead: 'Otomatik şanzımanlar nadiren aniden bozulur. Neredeyse her zaman önce uyarı verirler. Bu uyarıları erken fark etmek, onarım maliyeti ile komple revizyon arasındaki farkı belirler.',
    sections: [
      { h2: 'Neden erken teşhis bu kadar önemli?', paras: [
        'Otomatik şanzıman arızaları <strong>zincirleme ilerler</strong>. Örneğin aşınmaya başlayan bir kavrama balatası, yağa toz bırakır. Bu toz valf bloğu kanallarını daraltır; basınç kontrolü bozulur. Bozulan basınç diğer balataların da kaymasına yol açar. Başlangıçta tek bir balata değişimiyle çözülebilecek sorun, birkaç bin kilometre sonra komple revizyona dönüşür.',
        'Bu yüzden aşağıdaki belirtilerden herhangi birini fark ettiğinizde, “biraz daha idare eder” demek genellikle en pahalı seçenektir.'
      ]},
      { h2: '1. Vites geçişlerinde sarsıntı veya darbe', paras: [
        '<strong>Nasıl hissedilir:</strong> Özellikle 1-2 ve 2-3 geçişlerinde araçta sert bir vuruntu, tekme hissi.',
        '<strong>Olası nedenler:</strong> Yağın ömrünü doldurması, valf bloğunda basınç kontrolü sorunu, solenoid arızası, kavrama balatası aşınması veya adaptasyon değerlerinin bozulması.',
        '<strong>Ne yapmalı:</strong> Erken aşamada yağ + filtre bakımı ve adaptasyon çoğu zaman yeterli olur. Sarsıntı giderek sertleşiyorsa mekanik aşınma başlamış olabilir; gecikmeden kontrol ettirin.'
      ]},
      { h2: '2. Devir yükseliyor ama araç hızlanmıyor', paras: [
        '<strong>Nasıl hissedilir:</strong> Gaza bastığınızda motor devri yükseliyor, fakat hız aynı oranda artmıyor. Debriyajı yanmış manuel araç hissine benzer.',
        '<strong>Olası nedenler:</strong> Kavrama balatalarının kayması (slip), hidrolik basınç kaybı, düşük yağ seviyesi veya CVT’de kayış kayması.',
        '<strong>Ne yapmalı:</strong> Bu belirti ile sürüşe devam etmek balataları hızla yakar. En kısa sürede servise başvurun.'
      ]},
      { h2: '3. Vitesin geç devreye girmesi', paras: [
        '<strong>Nasıl hissedilir:</strong> Vites kolunu P’den D veya R’ye aldığınızda aracın tepki vermesi 2–3 saniyeyi buluyor.',
        '<strong>Olası nedenler:</strong> Düşük yağ seviyesi veya basıncı, valf bloğu tıkanması, aşınmış kavrama paketi.',
        '<strong>Ne yapmalı:</strong> Önce yağ seviyesi ve durumu kontrol edilmeli. Gecikme soğukken belirginse ve ısındıkça azalıyorsa, bu genellikle hidrolik basınç sorununa işaret eder.'
      ]},
      { h2: '4. Gösterge panelinde şanzıman uyarısı', paras: [
        '<strong>Nasıl görünür:</strong> Dişli ikonu, ünlem işareti ya da “Şanzıman arızası — servise başvurun” yazısı.',
        '<strong>Olası nedenler:</strong> Şanzıman kontrol ünitesi bir hata kaydetti. Bu, basınç sensöründen mekatronik arızasına kadar geniş bir aralığı işaret edebilir.',
        '<strong>Ne yapmalı:</strong> Hata kodunun okunması gerekir. Ancak dikkat: <strong>hata kodu arızayı değil, hangi devrede sorun algılandığını söyler.</strong> Kod tek başına teşhis değildir.'
      ]},
      { h2: '5. Araç acil (limp) moda geçiyor', paras: [
        '<strong>Nasıl hissedilir:</strong> Araç genellikle 3. viteste sabitlenir, hız ve devir sınırlanır.',
        '<strong>Olası nedenler:</strong> Şanzıman kendini korumaya aldı — ciddi bir basınç, sıcaklık veya elektronik hata var.',
        '<strong>Ne yapmalı:</strong> Acil mod bir koruma mekanizmasıdır, görmezden gelinmemelidir. Kısa mesafede servise ulaşmak mümkün olabilir; sürüşü uzatmak hasarı büyütür.'
      ]},
      { h2: '6. Şanzıman yağında yanık kokusu veya koyu renk', paras: [
        '<strong>Nasıl anlaşılır:</strong> Sağlıklı ATF berrak kırmızı-pembe tonundadır. Koyu kahve/siyah renk ve yanık kokusu ciddi bir uyarıdır.',
        '<strong>Olası nedenler:</strong> Aşırı ısınma, balata aşınması, yağın ömrünü doldurması, yağ soğutucu hattının tıkanması.',
        '<strong>Ne yapmalı:</strong> Yağda metalik parıltı da varsa mekanik aşınma başlamış demektir; sadece yağ değişimi yeterli olmayacaktır.'
      ]},
      { h2: '7. Uğultu, vınlama veya metalik ses', paras: [
        '<strong>Nasıl hissedilir:</strong> Hızla birlikte artan uğultu (özellikle CVT’de), rölantide metalik tıkırtı veya viteste belirginleşen ses.',
        '<strong>Olası nedenler:</strong> Rulman aşınması, planet dişli hasarı, CVT’de kayış/kasnak sorunu, yağ pompası arızası.',
        '<strong>Ne yapmalı:</strong> Sesli arızalar mekanik hasara işaret eder ve ilerleyicidir. Aracı zorlamadan kontrole getirin.'
      ]},
      { h2: '8. Belirli hız aralığında titreme', paras: [
        '<strong>Nasıl hissedilir:</strong> Genellikle 60–90 km/s arasında, sabit gazda hissedilen titreşim.',
        '<strong>Olası nedenler:</strong> Tork konvertörünün kilitleme (lock-up) balatası aşınması. Ancak motor takozları, aktarma mili ve jant balansı da benzer titreşim yaratabilir.',
        '<strong>Ne yapmalı:</strong> Kaynağın doğrulanması için yol testi gerekir; ölçüm yapılmadan konvertör değişimi önerilmemelidir.'
      ]},
      { h2: '9. Aracın altında kırmızımsı sıvı sızıntısı', paras: [
        '<strong>Nasıl anlaşılır:</strong> Park yerinde kırmızı-kahverengi yağ lekesi. (Motor yağı daha koyu ve siyaha yakındır.)',
        '<strong>Olası nedenler:</strong> Karter contası, ön/arka keçe, konnektör keçesi veya soğutucu hattı kaçağı.',
        '<strong>Ne yapmalı:</strong> Kaçak yağ seviyesini düşürerek basınç kaybına ve balata yanmasına yol açar. Küçük görünen bir kaçak, ihmal edildiğinde en pahalı arızanın nedeni olabilir.'
      ]},
      { h2: '10. Vitesin devreye hiç girmemesi', paras: [
        '<strong>Nasıl hissedilir:</strong> Vites kolu D veya R’de, motor çalışıyor, ancak araç hareket etmiyor.',
        '<strong>Olası nedenler:</strong> Ciddi hidrolik basınç kaybı, yağ pompası arızası, kavrama paketinin tamamen aşınması, mekatronik arızası veya iç mekanik kırılma.',
        '<strong>Ne yapmalı:</strong> Aracı çalıştırıp zorlamayın. Bu durumda çekici ile servise getirmek en doğrusudur.'
      ]},
      { h2: 'Özet: Belirti gördüğünüzde ne yapmalı?', paras: [
        'Kısa kural: <strong>şanzıman şikâyeti kendiliğinden geçmez, ilerler.</strong> Yukarıdaki belirtilerden birini fark ettiğinizde yapılacak en doğru şey, aracı zorlamadan bir arıza tespitinden geçirmektir.',
        'Tespit; hata kodu okuma, canlı veri analizi, yağ kontrolü ve yol testinin birlikte yapılmasıdır. Bu adımlar tamamlanmadan verilen bir onarım kararı, çoğu zaman ya gereksiz masraf ya da tekrarlayan şikâyet üretir.'
      ]}
    ],
    faqs: [
      { q: 'Şanzıman arızası ile sürmeye devam edebilir miyim?', a: 'Belirtiye bağlıdır. Kayma, uğultu, acil moda geçiş ve vitesin devreye girmemesi gibi durumlarda sürüşe devam etmek hasarı belirgin şekilde büyütür. Hafif sarsıntıda kısa mesafede servise ulaşmak genellikle mümkündür, ancak ertelemek doğru değildir.' },
      { q: 'Şanzıman arızası aniden mi ortaya çıkar?', a: 'Nadiren. Neredeyse her zaman önce sarsıntı, gecikme, ses veya yağ rengi değişimi gibi uyarılar gelir. Ani görünen arızaların çoğu, aslında fark edilmemiş uyarıların birikmiş sonucudur.' },
      { q: 'Hata kodu okutmak arızayı bulmaya yeter mi?', a: 'Hayır. Hata kodu yalnızca hangi devrede sorun algılandığını söyler, nedenini söylemez. Aynı kod farklı nedenlerden kaynaklanabilir. Doğru teşhis için kod; canlı veri, basınç ölçümü ve yol testiyle birlikte değerlendirilmelidir.' }
    ],
    related: [
      { href: 'hizmetler/sanziman-ariza-tespiti/', label: 'Ücretsiz şanzıman arıza tespiti' },
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'blog/sanziman-yagi-ne-zaman-degismeli/', label: 'Şanzıman yağı ne zaman değişmeli?' }
    ]
  },

  {
    slug: 'sanziman-yagi-ne-zaman-degismeli',
    title: 'Şanzıman Yağı Ne Zaman Değişmeli? Kapsamlı Rehber',
    h1: 'Şanzıman Yağı Ne Zaman Değişmeli?',
    description: 'Otomatik, DSG ve CVT şanzımanlarda yağ değişim aralıkları, "ömürlük yağ" gerçeği ve doğru değişim yöntemi hakkında kapsamlı rehber.',
    published: '2026-02-10',
    modified: '2026-09-09',
    excerpt: 'Üretici "ömürlük" diyor, servis "60 binde değişmeli" diyor. Hangisi doğru? Şanzıman tipine göre gerçekçi bakım aralıkları ve doğru değişim yöntemi.',
    readingTime: '8 dakika',
    lead: 'Şanzıman yağı sadece yağlamaz; hidrolik basıncı taşır, kavrama davranışını belirler ve soğutur. Bu üç görev nedeniyle yağın durumu, şanzımanın ömrünü doğrudan belirler.',
    sections: [
      { h2: 'Şanzıman yağı ne işe yarar?', paras: [
        'Motor yağı esas olarak yağlar ve soğutur. Otomatik şanzıman yağı (ATF) ise üç kritik görevi aynı anda üstlenir:',
        '<strong>1. Hidrolik basınç iletimi.</strong> Otomatik şanzımanda vites geçişleri, yağ basıncıyla devreye giren kavrama paketleriyle yapılır. Yağ burada bir <em>güç aktarım akışkanıdır</em>.',
        '<strong>2. Sürtünme kontrolü.</strong> ATF’nin içindeki katık paketi, kavrama balatalarının hangi anda ve ne sertlikte tutacağını belirler. Yağ yaşlandıkça bu katıklar tükenir; geçişler ya sertleşir ya kayar.',
        '<strong>3. Soğutma.</strong> Şanzıman içinde üretilen ısının önemli bölümü yağ üzerinden radyatöre taşınır.'
      ]},
      { h2: '“Ömürlük yağ” gerçekten ömürlük mü?', paras: [
        'Birçok üretici, bazı şanzıman tipleri için “lifetime fill / ömürlük dolum” ifadesi kullanır. Bu ifadenin pratikteki anlamı çoğu zaman yanlış anlaşılır.',
        '“Ömürlük” tanımı genellikle <strong>üreticinin öngördüğü tasarım ömrü</strong> ve <strong>ideal laboratuvar koşulları</strong> üzerinden yapılır. Türkiye’deki gerçek kullanım ise bu koşullardan uzaktır: yoğun dur-kalk trafiği, yaz aylarında yüksek ortam sıcaklığı, eğimli güzergâhlar ve sık kısa mesafe kullanım.',
        'Bu koşullarda yağın <strong>termal yaşlanması</strong> hızlanır. Katık paketi tükenir, viskozite değişir, oksidasyon ürünleri birikir. Sonuç, üreticinin varsaydığından çok daha erken bozulan bir yağdır.',
        'Pratik yaklaşımımız şu: “ömürlük” ibaresi olan araçlarda bile yağın <strong>durumunu kontrol etmek</strong> ve gerektiğinde değiştirmek, sonradan yapılacak bir revizyondan çok daha ekonomiktir.'
      ]},
      { h2: 'Şanzıman tipine göre bakım aralıkları', paras: [
        'Aşağıdaki değerler <strong>genel referanstır</strong>. Kesin aralık; aracınızın bakım kitapçığına, şanzıman tipine ve kullanım profilinize göre belirlenmelidir.'
      ], table: {
        head: ['Şanzıman tipi', 'Yağ', 'Genel aralık', 'Kritik not'],
        rows: [
          ['Klasik otomatik (torklu)', 'ATF (üretici spesifik)', '60.000 – 80.000 km', 'Filtre ve karter contası birlikte yenilenmeli'],
          ['DSG / DCT — ıslak debriyaj', 'DSG özel yağı', '~60.000 km', 'Filtre değişimi zorunlu'],
          ['DSG — kuru debriyaj (DQ200)', 'Mekatronik hidrolik yağı', 'Kontrol esaslı', 'Şanzıman yağı ömürlük kabul edilir'],
          ['CVT', 'CVT özel yağı', '40.000 – 60.000 km', 'ATF ile ASLA değiştirilmemeli'],
          ['Manuel', 'Dişli yağı (MTF)', '80.000 – 100.000 km', 'Sert kullanımda kısaltılmalı']
        ]
      }},
      { h2: 'Bu aralıkları hangi durumlarda kısaltmalısınız?', paras: [
        'Aşağıdaki koşullardan biri veya birkaçı sizin için geçerliyse, yukarıdaki aralıkları yaklaşık <strong>%20–30 oranında kısaltmanızı</strong> öneriyoruz:'
      ], list: [
        'Ağırlıklı <strong>şehir içi dur-kalk</strong> kullanım',
        '<strong>Eğimli güzergâhların</strong> düzenli kullanımı',
        '<strong>Römork veya yük çekimi</strong>',
        '<strong>Ticari kullanım</strong> (taksi, kurye, servis aracı)',
        'Sık <strong>kısa mesafe</strong> sürüş (şanzıman ısınmaya fırsat bulamıyor)',
        '<strong>Sportif / agresif sürüş</strong> alışkanlığı'
      ]},
      { h2: 'Doğru değişim yöntemi: karter sökümü mü, makine ile yıkama mı?', paras: [
        'Piyasada iki yöntem yaygındır ve hangisinin doğru olduğu <strong>şanzımanın durumuna bağlıdır</strong>.',
        '<strong>Karter sökümlü değişim:</strong> Karter (yağ tavası) sökülür, filtre ve conta yenilenir, mıknatıslar temizlenir. Yağın bir kısmı tork konvertörü içinde kalır, bu nedenle tam değişim sağlamaz — ancak şanzıman içi görülür ve metal partikül kontrolü yapılabilir.',
        '<strong>Makine ile (basınçlı) değişim:</strong> Yağın neredeyse tamamı yenilenir. Ancak <strong>yüksek kilometreli ve uzun süre bakımsız kalmış şanzımanlarda risklidir</strong>: basınç, birikmiş tortuları yerinden oynatarak dar kanalları tıkayabilir.',
        '<strong>Bizim yaklaşımımız:</strong> Bakım geçmişi düzenli araçlarda makine ile değişim tercih edilebilir. Hiç bakım görmemiş, yüksek kilometreli araçlarda ise karter sökümlü ve kontrollü değişimi uyguluyoruz. Yöntem kararını yağın ve şanzımanın durumunu gördükten sonra veriyoruz.'
      ]},
      { h2: 'Yağ seviyesi neden “sıcaklık kontrollü” ölçülür?', paras: [
        'Otomatik şanzımanlarda doğru yağ seviyesi, belirli bir yağ sıcaklığı aralığında (çoğu araçta yaklaşık <strong>35–45 °C</strong>) ölçülür. Yağ soğukken hacmi küçülür, sıcakken genleşir.',
        'Bu nedenle soğukken yapılan bir ölçüm “eksik” gösterip fazla dolum yapılmasına; aşırı sıcakken yapılan ölçüm ise “fazla” gösterip eksik dolum yapılmasına yol açar. Her iki durum da arıza nedenidir: <strong>fazla yağ</strong> köpürmeye ve basınç kaybına, <strong>eksik yağ</strong> ise balata yanmasına yol açar.',
        'Doğru uygulama, diagnostik cihazla yağ sıcaklığını izleyerek seviyeyi üretici aralığında ayarlamaktır.'
      ]},
      { h2: 'Yanlış yağ kullanımının sonuçları', paras: [
        'Şanzıman yağları birbirinin yerine kullanılamaz. Her üreticinin kendi spesifikasyonu vardır ve bu spesifikasyon, o şanzımanın balata malzemesine ve valf tasarımına göre belirlenmiştir.',
        'En kritik örnek <strong>CVT şanzımanlardır</strong>. CVT yağı, çelik kayış ile kasnak arasında belirli bir sürtünme katsayısı sağlayacak şekilde formüle edilmiştir. Yerine ATF konulduğunda kayış kasnak üzerinde kaymaya başlar ve <strong>kasnak yüzeylerinde kalıcı iz</strong> bırakır. Bu hasar oluştuktan sonra doğru yağa dönmek sorunu çözmez.'
      ]}
    ],
    faqs: [
      { q: 'Şanzıman yağını hiç değiştirmezsem ne olur?', a: 'Yağ yaşlandıkça hidrolik basıncı doğru iletemez ve kavrama balataları kaymaya başlar. Aşınma tozu ile metal partikülleri valf bloğunu ve solenoidleri tıkar. Sonuçta vites geçişlerinde sarsıntı, kayma ve nihayetinde komple revizyon gerektiren hasar oluşur.' },
      { q: 'CVT yağı yerine normal ATF kullanılabilir mi?', a: 'Kesinlikle hayır. CVT yağı, kayış ile kasnak arasında belirli bir sürtünme katsayısı sağlayacak şekilde özel olarak formüle edilmiştir. ATF kullanımı kısa sürede kaymaya ve kasnak yüzeylerinde kalıcı hasara yol açar.' },
      { q: 'Yağ değişiminde filtre de değişmeli mi?', a: 'Evet. Filtre, yağdaki aşınma partiküllerini tutar ve zamanla tıkanır. Tıkalı filtre yağ akışını kısıtlayarak basınç kaybına yol açar. Karter sökümlü bakımda filtre ve karter contasının birlikte yenilenmesi standart uygulamadır.' },
      { q: 'Yağ değişimi tek başına sarsıntıyı geçirir mi?', a: 'Erken aşamadaki sarsıntı ve gecikme şikâyetlerinin bir kısmı yağ + filtre yenilemesi ve adaptasyon ile düzelebilir. Ancak balata aşınması veya mekanik hasar başlamışsa yağ değişimi kalıcı çözüm sağlamaz. Bu yüzden önce tespit yapılmalıdır.' }
    ],
    related: [
      { href: 'hizmetler/sanziman-yagi-degisimi/', label: 'Şanzıman yağı ve filtre değişimi hizmetimiz' },
      { href: 'blog/otomatik-sanziman-ariza-belirtileri/', label: 'Otomatik şanzıman arıza belirtileri' },
      { href: 'hizmetler/cvt-sanziman-tamiri/', label: 'CVT şanzıman tamiri' }
    ]
  },

  {
    slug: 'dsg-sanziman-bakimi-rehberi',
    title: 'DSG Şanzıman Bakımı: Ömrünü Uzatmanın Yolları',
    h1: 'DSG Şanzıman Bakımı ve Kullanım Rehberi',
    description: 'DSG şanzıman nasıl çalışır, hangi bakımları ister ve ömrünü uzatmak için nelere dikkat edilmeli? DQ200 ve DQ250 farkları.',
    published: '2026-03-05',
    modified: '2026-09-09',
    excerpt: 'DSG şanzımanlar doğru kullanıldığında uzun ömürlüdür. Kuru ve ıslak tip farkları, bakım aralıkları ve debriyaj ömrünü uzatan sürüş alışkanlıkları.',
    readingTime: '7 dakika',
    lead: 'DSG şanzımanlar hakkında en yaygın yanılgı, “sorunlu” olduklarıdır. Gerçekte çoğu DSG arızası, sistemin doğasından değil bakım ve kullanım alışkanlıklarından kaynaklanır.',
    sections: [
      { h2: 'DSG nasıl çalışır?', paras: [
        'DSG (Direct Shift Gearbox), aslında <strong>iki manuel şanzımanın tek gövdede birleştirilmiş halidir</strong>. Bir debriyaj tek sayılı vitesleri (1-3-5-7), diğeri çift sayılı vitesleri (2-4-6) yönetir.',
        'Siz 2. viteste giderken şanzıman 3. vitesi çoktan hazırlamıştır; geçiş anında sadece debriyajlar yer değiştirir. Bu, klasik otomatiklerden çok daha hızlı ve tork kesintisiz bir geçiş sağlar.',
        'Bu tasarımın bedeli ise şudur: klasik otomatiklerdeki <strong>tork konvertörünün yumuşatıcı etkisi yoktur</strong>. Kalkış ve düşük hız manevralarında yükü doğrudan debriyaj karşılar — ve debriyaj aşınan bir parçadır.'
      ]},
      { h2: 'Kuru mu, ıslak mı? Önce bunu bilin', paras: [
        'DSG bakımını konuşmadan önce aracınızdaki kutunun tipini bilmek gerekir, çünkü bakım gereksinimleri tamamen farklıdır.'
      ], table: {
        head: ['Özellik', 'Kuru debriyaj (DQ200)', 'Islak debriyaj (DQ250/DQ500)'],
        rows: [
          ['Vites sayısı', '7 ileri', '6 veya 7 ileri'],
          ['Tipik motorlar', '1.0 – 1.4 TSI', '1.8 – 2.0 TSI / TDI'],
          ['Debriyaj soğutma', 'Hava ile', 'Yağ banyosunda'],
          ['Şanzıman yağı', 'Ömürlük kabul edilir', '~60.000 km’de değişmeli'],
          ['Mekatronik yağı', 'Ayrı devre, kontrol edilmeli', 'Ortak devre'],
          ['Zayıf noktası', 'Mekatronik, kuru debriyaj aşınması', 'Yağ bakımı ihmali, balata aşınması']
        ]
      }},
      { h2: 'DSG bakımında yapılması gerekenler', paras: [
        'Islak debriyajlı kutularda (DQ250, DQ500, DL501) <strong>yağ ve filtre değişimi</strong> yaklaşık 60.000 km’de yapılmalıdır. Bu bakım ihmal edildiğinde yağdaki balata tozu mekatronik valf kanallarını tıkar ve geçiş kalitesi bozulur.',
        'Kuru debriyajlı DQ200’de şanzıman yağı ömürlük kabul edilir; ancak <strong>mekatronik hidrolik yağının</strong> durumu ve seviyesi kontrol edilmelidir.',
        'Her iki tipte de periyodik olarak <strong>debriyaj adaptasyon değerlerinin okunması</strong> son derece faydalıdır. Bu değerler, balataların ne kadar aşındığını arıza ortaya çıkmadan önce gösterir — yani size erken uyarı verir.'
      ]},
      { h2: 'Debriyaj ömrünü uzatan sürüş alışkanlıkları', paras: [
        'DSG debriyajının en çok yıprandığı an, <strong>düşük hızda kavramanın yarı-tutuşta kaldığı</strong> durumlardır. Aşağıdaki alışkanlıklar debriyaj ömrünü belirgin şekilde uzatır:'
      ], list: [
        '<strong>Yokuşta frenle tutun, gazla tutmayın.</strong> Gazla tutmak debriyajı sürekli kaydırır ve ısıtır — DSG’de en yıpratıcı davranıştır.',
        '<strong>Uzun beklemelerde N konumuna alın.</strong> Trafik ışığı gibi 30 saniyeyi aşan beklemelerde D yerine N kullanmak debriyaj yükünü kaldırır.',
        '<strong>Yavaş manevralarda gaz-fren arası gidip gelmeyin.</strong> Park ve otopark manevralarında sürekli yarım gaz, debriyajı ısıtır.',
        '<strong>Soğukken ilk kilometrelerde agresif hızlanmayın.</strong> Yağ çalışma sıcaklığına ulaşmadan yüksek yük bindirmek aşınmayı artırır.',
        '<strong>Aracı kalkışta “zorlamayın”.</strong> Sık ani kalkış, kuru debriyajlı kutularda balata ömrünü ciddi ölçüde kısaltır.',
        '<strong>Isınma uyarısını ciddiye alın.</strong> Debriyaj sıcaklık uyarısı geldiğinde aracı bir süre dinlendirin.'
      ]},
      { h2: 'Adaptasyon neden bu kadar önemli?', paras: [
        'DSG şanzıman, debriyajın tam olarak hangi noktada tutmaya başladığını “öğrenerek” çalışır. Bu öğrenilmiş değerlere <strong>adaptasyon</strong> denir ve balatalar aşındıkça sürekli güncellenir.',
        'Debriyaj veya mekatronik değişimi sonrası adaptasyon sıfırlanıp yeniden yapılmazsa, şanzıman eski (artık geçersiz) değerlerle çalışmayı sürdürür. Sonuç: kalkışta titreme, tekleme ve kısa sürede tekrarlayan şikâyet.',
        'Bu yüzden <strong>adaptasyon yapılmadan tamamlanan bir DSG onarımı eksik iştir.</strong> Onarım sonrası temel ayar ve adaptasyonun yapıldığından mutlaka emin olun.'
      ]}
    ],
    faqs: [
      { q: 'DSG şanzıman gerçekten sorunlu mu?', a: 'Hayır. DSG kutuların önemli bir bölümü, düzenli bakımla uzun yıllar sorunsuz kullanılır. Arızaların çoğu yağ bakımının ihmali, adaptasyonun yapılmaması ve debriyajı zorlayan sürüş alışkanlıklarından kaynaklanır.' },
      { q: 'Trafikte D konumunda beklemek zararlı mı?', a: 'Kısa beklemelerde sorun yoktur. Ancak 30 saniyeyi aşan beklemelerde N konumuna almak, özellikle kuru debriyajlı DQ200 kutularda debriyaj üzerindeki yükü ve ısınmayı azaltır.' },
      { q: 'DSG debriyajı kaç kilometre dayanır?', a: 'Kullanım biçimine göre çok değişir. Ağırlıklı şehir içi ve sık dur-kalk kullanımda ömür kısalırken, uzun yol ağırlıklı ve yumuşak sürüşte belirgin şekilde uzar. Kesin bir rakam yerine, adaptasyon değerlerinin periyodik okunmasını öneriyoruz.' },
      { q: 'DSG yağı değişimini erteleyebilir miyim?', a: 'Islak debriyajlı kutularda ertelemek önerilmez. Yaşlanan yağ mekatronik valf kanallarını tıkar ve arıza maliyeti, yağ bakımının çok üzerine çıkar. Yağ bakımı, DSG için en ucuz sigortadır.' }
    ],
    related: [
      { href: 'hizmetler/dsg-sanziman-tamiri/', label: 'DSG şanzıman tamiri hizmetimiz' },
      { href: 'hizmetler/mekatronik-tamiri/', label: 'Mekatronik ünitesi tamiri' },
      { href: 'markalar/volkswagen-dsg-sanziman-tamiri/', label: 'Volkswagen DSG servisi' }
    ]
  },

  {
    slug: 'cvt-sanziman-nedir-nasil-calisir',
    title: 'CVT Şanzıman Nedir, Nasıl Çalışır? Tam Rehber',
    h1: 'CVT Şanzıman Nedir, Nasıl Çalışır?',
    description: 'CVT (kademesiz) şanzımanın çalışma prensibi, avantajları, zayıf noktaları ve bakımı. Toyota, Honda, Nissan CVT sistemleri hakkında rehber.',
    published: '2026-04-12',
    modified: '2026-09-09',
    excerpt: 'Kademesiz şanzıman nasıl çalışır, neden yağa bu kadar duyarlıdır ve ömrünü uzatmak için ne yapmalısınız?',
    readingTime: '6 dakika',
    lead: 'CVT şanzımanlar vites kademesi olmadan çalışır. Bu, sarsıntısız bir sürüş ve daha iyi yakıt ekonomisi sağlar — ancak sistemi yağ kalitesine olağanüstü bağımlı hale getirir.',
    sections: [
      { h2: 'Kademesiz şanzıman nasıl çalışır?', paras: [
        'Klasik bir otomatik şanzımanda sabit sayıda vites kademesi vardır: 1., 2., 3. vites gibi. CVT’de ise <strong>kademe yoktur</strong>. Bunun yerine iki konik kasnak ve aralarında gerilen bir <strong>çelik kayış (veya zincir)</strong> bulunur.',
        'Kasnakların konik yüzeyleri hidrolik basınçla birbirine yaklaşır veya uzaklaşır. Kayış bu koniler üzerinde farklı çaplarda oturur; böylece çevrim oranı <strong>kademesiz ve sonsuz sayıda</strong> değişebilir.',
        'Sonuç: motor her zaman en verimli devir aralığında tutulabilir. Bu yüzden CVT’li araçlarda hızlanma sırasında devrin sabit kalıp hızın artması gibi alışılmadık bir his oluşur.'
      ]},
      { h2: 'CVT’nin avantajları ve zayıf noktaları', paras: [
        'CVT’nin güçlü ve zayıf yanlarını bilmek, aracınızı doğru kullanmanın ilk adımıdır.'
      ], table: {
        head: ['Avantajlar', 'Zayıf noktalar'],
        rows: [
          ['Vites geçiş sarsıntısı yok', 'Yağ kalitesine aşırı duyarlı'],
          ['Daha iyi yakıt ekonomisi', 'Yüksek ve sürekli torka hassas'],
          ['Motor optimum devirde tutulabilir', 'Kayış/kasnak aşınması onarımı maliyetli'],
          ['Daha az parça, daha hafif yapı', 'Ağır çekme işlerine uygun değil'],
          ['Şehir içinde çok konforlu', 'Yanlış yağ kalıcı hasar verir']
        ]
      }},
      { h2: 'Neden yağ bu kadar kritik?', paras: [
        'CVT’de güç aktarımı, kayış ile kasnak arasındaki <strong>sürtünmeye</strong> dayanır. Bu sürtünmenin katsayısını belirleyen şey yağdır.',
        'CVT yağı, normal ATF’den farklı olarak <strong>sürtünmeyi azaltmak değil, kontrollü şekilde korumak</strong> üzere formüle edilmiştir. Yağ yaşlandığında bu katsayı düşer; kayış kasnak üzerinde mikro kaymalar yapar.',
        'Bu mikro kaymalar başlangıçta fark edilmez. Ancak zamanla konik yüzeylerde <strong>iz (glazing)</strong> oluşturur. İz oluştuktan sonra yeni yağ koymak sorunu çözmez — çünkü hasar artık mekaniktir.',
        'İşte bu yüzden CVT’de <strong>koruyucu bakım, onarımdan kıyaslanamayacak kadar ucuzdur</strong>.'
      ]},
      { h2: 'CVT’de dikkat edilmesi gerekenler', list: [
        '<strong>Sadece üreticinin belirlediği CVT yağını kullanın.</strong> ATF veya “üniversal” yağ kalıcı hasar verir.',
        '<strong>Yağ değişimini ertelemeyin.</strong> Genel aralık 40.000–60.000 km; şehir içi kullanımda kısaltın.',
        '<strong>Uğultuyu ciddiye alın.</strong> Hızla artan uğultu, kayış-kasnak temasının bozulduğunun ilk işaretidir.',
        '<strong>Ani ve tam gaz kalkışlardan kaçının.</strong> Kayışa binen ani tork, kayma riskini artırır.',
        '<strong>Çekme kapasitesini aşmayın.</strong> CVT sürekli yüksek torkta klasik otomatiklere göre daha hassastır.',
        '<strong>Uzun yokuşlarda yağ sıcaklığına dikkat edin.</strong> Isınma uyarısı geldiğinde aracı dinlendirin.',
        '<strong>Kar/çamurda tekerlek döndürmekten kaçının.</strong> Ani boşta dönme ve tutma, kayışa şok yükü bindirir.'
      ]},
      { h2: 'CVT arızası nasıl anlaşılır?', paras: [
        'CVT arızalarının belirtileri klasik otomatiklerden farklıdır, çünkü vites kademesi yoktur — dolayısıyla “vites atmıyor” tarzı bir şikâyet nadirdir. Bunun yerine:',
        '<strong>Hızla birlikte artan uğultu:</strong> Kayış veya rulman aşınması. En önemli erken uyarıdır.',
        '<strong>Devir yükseliyor, hız artmıyor:</strong> Kayış kayması. Sürüşe devam etmek kasnak yüzeylerine kalıcı zarar verir.',
        '<strong>Düşük hızda titreme (judder):</strong> Genellikle yağ bozulması veya kasnak yüzey hasarı.',
        '<strong>Yağda metalik parıltı:</strong> Kayış/kasnak aşınmasının kesin göstergesidir.'
      ]},
      { h2: 'e-CVT (hibrit) sistemler farklıdır', paras: [
        'Toyota ve Lexus hibrit modellerinde kullanılan <strong>e-CVT</strong>, isim benzerliğine rağmen tamamen farklı bir sistemdir. Kayış ve konik kasnak <strong>yoktur</strong>.',
        'Bunun yerine bir planet dişli grubu ve iki elektrik motoru, devir oranını elektronik olarak yönetir. Aşınan bir kayış olmadığı için klasik CVT arızaları bu sistemlerde görülmez.',
        'Ancak e-CVT’de de transaksel yağının kontrolü ve soğutma sisteminin sağlıklı çalışması önemlidir. Bu araçlarda arıza tespiti tamamen farklı bir protokolle yapılır.'
      ]}
    ],
    faqs: [
      { q: 'CVT şanzıman dayanıksız mı?', a: 'Doğru yağla ve zamanında bakımla kullanıldığında CVT’ler uzun ömürlüdür. Arızaların büyük bölümü yanlış yağ kullanımı, geciktirilmiş bakım ve kapasitenin üzerinde yük/çekme kaynaklıdır.' },
      { q: 'CVT’li araçla römork çekebilir miyim?', a: 'Üreticinin belirttiği çekme kapasitesi içinde kalmak koşuluyla evet. Ancak CVT, sürekli yüksek tork altında klasik otomatiklere göre daha hassastır. Uzun yokuşlarda yağ sıcaklığını izlemek ve kapasiteyi zorlamamak önemlidir.' },
      { q: 'CVT’de vites geçişi hissedilmiyor, normal mi?', a: 'Evet, tamamen normaldir. CVT kademesiz çalıştığı için vites geçişi hissi yoktur. Bazı üreticiler sürüş hissini doğallaştırmak için yazılımsal “sanal vites” kademeleri ekler.' },
      { q: 'CVT yağı kaç kilometrede değişir?', a: 'Genel aralık 40.000–60.000 km’dir. Şehir içi dur-kalk kullanım, sıcak iklim ve yük taşıma durumunda bu aralığın kısaltılması önerilir. Mutlaka üreticinin belirlediği spesifikasyondaki CVT yağı kullanılmalıdır.' }
    ],
    related: [
      { href: 'hizmetler/cvt-sanziman-tamiri/', label: 'CVT şanzıman tamiri hizmetimiz' },
      { href: 'markalar/toyota-cvt-sanziman-tamiri/', label: 'Toyota & Honda CVT servisi' },
      { href: 'blog/sanziman-yagi-ne-zaman-degismeli/', label: 'Şanzıman yağı ne zaman değişmeli?' }
    ]
  },

  {
    slug: 'tork-konvertoru-arizasi-belirtileri',
    title: 'Tork Konvertörü Arızası: Belirtiler ve Nedenleri',
    h1: 'Tork Konvertörü Arızası: Belirtiler, Nedenler ve Çözüm',
    description: 'Tork konvertörü nedir, nasıl çalışır, arıza belirtileri nelerdir? Titreme, stop etme ve uğultu şikâyetlerinin nedenleri.',
    published: '2026-05-20',
    modified: '2026-09-09',
    excerpt: 'Belirli hızda gelen titreme, rölantide stop etme ve uğultu… Tork konvertörü arızalarının belirtileri, nedenleri ve onarım yöntemi.',
    readingTime: '6 dakika',
    lead: 'Tork konvertörü, motor ile otomatik şanzıman arasındaki hidrolik köprüdür. Arızası genellikle titreme ile başlar ve ihmal edildiğinde tüm şanzımanı etkileyen zincirleme bir hasara dönüşür.',
    sections: [
      { h2: 'Tork konvertörü ne işe yarar?', paras: [
        'Manuel şanzımanda motoru şanzımandan ayırmak için debriyaj pedalına basarsınız. Otomatik şanzımanda bu görevi <strong>tork konvertörü</strong> üstlenir — ancak mekanik değil, <strong>hidrolik</strong> olarak.',
        'İçinde yağ dolu bir muhafaza, motora bağlı bir pompa çarkı, şanzımana bağlı bir türbin çarkı ve ikisi arasında bir stator bulunur. Motor döndükçe pompa yağı fırlatır, bu yağ türbini döndürür. Böylece araç durduğunda motor stop etmez, ancak vites devrede kalabilir.',
        'Belirli bir hızın üzerinde ise devreye <strong>kilitleme (lock-up) debriyajı</strong> girer. Bu debriyaj motoru ve şanzımanı doğrudan mekanik olarak bağlar; hidrolik kayıp ortadan kalkar ve yakıt tüketimi düşer. Arızaların büyük bölümü işte bu kilitleme debriyajıyla ilgilidir.'
      ]},
      { h2: 'Arıza belirtileri ve anlamları', paras: [
        'Aşağıdaki belirtiler tork konvertörü arızasının tipik göstergeleridir.'
      ], table: {
        head: ['Belirti', 'Olası neden'],
        rows: [
          ['60–90 km/s arasında titreme', 'Kilitleme debriyajı balatasının aşınması'],
          ['Rölantide araç stop ediyor', 'Kilitleme debriyajı ayrılamıyor / valf takılması'],
          ['Kalkışta zorlanma, güç kaybı', 'Stator tek yönlü rulmanı arızası'],
          ['Viteste artan, boşta kaybolan uğultu', 'Konvertör içi rulman veya kanat hasarı'],
          ['Şanzıman yağının hızla kararması', 'Balata tozunun yağa karışması'],
          ['Şanzıman aşırı ısınıyor', 'Sürekli hidrolik kayma, kilitlenememe'],
          ['Yokuşta devir yükselmesi, hızın artmaması', 'Konvertör içi kayma']
        ]
      }},
      { h2: 'Titreme her zaman konvertörden mi gelir?', paras: [
        'Hayır — ve bu, gereksiz masrafın en sık nedenidir. Benzer titreşim şu kaynaklardan da gelebilir:',
        '<strong>Motor takozları:</strong> Yıpranmış takoz, motor titreşimini kabine iletir. Rölantide belirginleşmesi tipiktir.',
        '<strong>Aktarma mili / aks:</strong> Balanssız aktarma mili genellikle belirli hız aralığında titreme yaratır — konvertör titremesine çok benzer.',
        '<strong>Jant balansı ve lastik:</strong> Hıza bağlı titreşimin en yaygın nedenidir ve en ucuz kontrolüdür.',
        '<strong>Ateşleme sistemi:</strong> Tekleme, yük altında titreme olarak hissedilebilir.',
        'Bu nedenle titreme şikâyetinde <strong>yol testi ve ölçüm yapmadan</strong> konvertör değişimi önermiyoruz. Kilitleme debriyajı kaynaklı titreme, lock-up devreye girdiğinde belirginleşip devre dışı kaldığında kaybolmasıyla ayırt edilir.'
      ]},
      { h2: 'Neden ihmal edilmemeli?', paras: [
        'Tork konvertörü arızası, sadece kendi sorunu olarak kalmaz. Aşınan kilitleme balatası, <strong>sürtünme tozunu doğrudan şanzıman yağına bırakır</strong>.',
        'Bu toz yağla birlikte tüm şanzımanı dolaşır: valf bloğu kanallarını daraltır, solenoid süzgeçlerini tıkar, filtreyi doldurur. Basınç kontrolü bozulur; diğer kavrama paketleri de kaymaya başlar.',
        'Yani başlangıçta yalnızca konvertör revizyonu ile çözülebilecek bir sorun, ihmal edildiğinde <strong>komple şanzıman revizyonuna</strong> dönüşür. Titremenin “yaşanabilir” olması, hasarın ilerlemediği anlamına gelmez.'
      ]},
      { h2: 'Onarım nasıl yapılır?', paras: [
        'Tork konvertörü kapalı ve kaynaklı bir gövdedir; onarım için <strong>kesilerek açılması</strong> gerekir. Uyguladığımız süreç:'
      ], list: [
        'Konvertörün araçtan sökülmesi ve tezgâhta kesilerek açılması',
        'Kilitleme (lock-up) debriyaj balatasının yenilenmesi',
        'Stator, türbin ve pompa kanatlarının kontrolü',
        'Tek yönlü rulman ve burçların değişimi',
        'Keçe ve o-ring yenileme',
        '<strong>Hassas balans ayarı</strong> — atlanırsa yüksek devirde titreşim üretir',
        'Yeniden kaynaklama ve basınçlı sızdırmazlık testi',
        '<strong>Şanzıman yağı, filtre ve soğutucu hattının temizliği</strong> — balata tozu temizlenmezse arıza tekrarlar'
      ]},
      { h2: 'En kritik iki adım', paras: [
        '<strong>Balans ayarı.</strong> Konvertör motor devriyle döner. Kaynak sonrası balans alınmazsa yüksek devirde titreşim oluşur; bu titreşim hem konforu bozar hem de şanzıman ön keçesine ve krank rulmanına zarar verir.',
        '<strong>Yağ ve soğutucu temizliği.</strong> Konvertör yenilense bile, sistemde kalan eski balata tozu yeni parçayı kısa sürede kirletir. Yağ soğutucu hattı basınçlı olarak temizlenmezse onarım kalıcı olmaz.'
      ]}
    ],
    faqs: [
      { q: 'Tork konvertörü onarılabilir mi?', a: 'Evet. Kilitleme balatası, rulman ve keçe kaynaklı arızaların büyük bölümünde revizyon yeterlidir ve yeni parçaya göre belirgin şekilde ekonomiktir. Gövde deformasyonu veya kanat hasarı varsa yenileme önerilir.' },
      { q: 'Titremeyle sürmeye devam edebilir miyim?', a: 'Önerilmez. Aşınan balatanın bıraktığı toz şanzıman yağına karışarak valf bloğunu ve solenoidleri tıkar. Bu durumda konvertör revizyonuyla çözülebilecek sorun, komple şanzıman revizyonuna dönüşür.' },
      { q: 'Konvertör değişince yağ da değişmeli mi?', a: 'Mutlaka. Sistemde kalan balata tozu yeni konvertörü kısa sürede kirletir. Yağ, filtre ve yağ soğutucu hattının temizliği onarımın ayrılmaz parçasıdır.' },
      { q: 'Balans ayarı yapılmazsa ne olur?', a: 'Konvertör motor devriyle döndüğü için dengesizlik yüksek devirde titreşim üretir. Bu titreşim sürüş konforunu bozmanın yanı sıra şanzıman ön keçesine ve krank rulmanına zarar verebilir.' }
    ],
    related: [
      { href: 'hizmetler/tork-konvertoru-tamiri/', label: 'Tork konvertörü tamiri hizmetimiz' },
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'blog/otomatik-sanziman-ariza-belirtileri/', label: 'Otomatik şanzıman arıza belirtileri' }
    ]
  },

  {
    slug: 'sanziman-tamiri-fiyatlari-nasil-belirlenir',
    title: 'Şanzıman Tamiri Fiyatları Nasıl Belirlenir?',
    h1: 'Şanzıman Tamiri Fiyatları Nasıl Belirlenir?',
    description: 'Şanzıman tamir maliyetini belirleyen faktörler, telefonda neden net fiyat verilemez ve teklif alırken nelere dikkat etmelisiniz?',
    published: '2026-06-18',
    modified: '2026-09-09',
    excerpt: '“Şanzıman tamiri ne kadar?” sorusunun tek bir cevabı yok. Maliyeti belirleyen faktörler ve teklif alırken sormanız gereken sorular.',
    readingTime: '6 dakika',
    lead: 'Şanzıman tamirinde en sık sorulan soru fiyattır — ve telefonda dürüstçe verilebilecek tek cevap “önce bakmamız gerekiyor”dur. İşte bunun teknik nedeni ve teklif alırken dikkat etmeniz gerekenler.',
    sections: [
      { h2: 'Neden telefonda net fiyat verilemez?', paras: [
        'Aynı şikâyetin arkasında birbirinden çok farklı arızalar olabilir. Örneğin “vites geçişinde sarsıntı” şikâyetinin nedeni şunlardan herhangi biri olabilir:',
        '• Ömrünü doldurmuş şanzıman yağı — <em>bakım seviyesinde bir işlem</em><br>• Bozulmuş adaptasyon değerleri — <em>yalnızca yazılım işlemi</em><br>• Arızalı bir solenoid — <em>tek parça değişimi</em><br>• Tıkanmış valf bloğu — <em>revizyon gerektiren işlem</em><br>• Aşınmış kavrama paketi — <em>komple revizyon</em>',
        'Bu seçeneklerin maliyetleri arasında <strong>kat kat fark</strong> vardır. Tespit yapmadan verilen bir rakam ya gerçekçi olmayacak kadar düşük (sonradan artacak) ya da gereksiz yüksek olur. Her iki durum da müşteriye zarar verir.'
      ]},
      { h2: 'Maliyeti belirleyen faktörler', paras: [
        'Bir şanzıman onarımının maliyeti temel olarak şu başlıklardan oluşur:'
      ], list: [
        '<strong>Arızanın türü ve kapsamı.</strong> Tek parça değişimi ile komple revizyon arasında büyük fark vardır.',
        '<strong>Şanzıman tipi.</strong> Klasik otomatik, DSG/DCT ve CVT kutuların parça ve işçilik gereksinimleri farklıdır.',
        '<strong>Araç markası ve modeli.</strong> Parça bulunabilirliği ve fiyatı markadan markaya belirgin şekilde değişir.',
        '<strong>Parça tercihi.</strong> Orijinal, orijinal muadili veya yenilenmiş parça seçenekleri farklı maliyet ve garanti profili sunar.',
        '<strong>Söküm-takma işçiliği.</strong> Bazı araçlarda şanzımana erişim için çok daha fazla söküm gerekir.',
        '<strong>Ek işlemler.</strong> Tork konvertörü revizyonu, yağ soğutucu temizliği, adaptasyon ve kodlama.'
      ]},
      { h2: 'Erken müdahale maliyeti nasıl değiştirir?', paras: [
        'Şanzıman arızalarında maliyeti en çok etkileyen tek faktör, çoğu zaman <strong>ne kadar beklendiğidir</strong>.',
        'Somut bir örnek: aşınmaya başlayan bir tork konvertörü balatası, ilk aşamada yalnızca konvertör revizyonu ve yağ bakımı ile çözülebilir. Ancak sürüşe devam edildiğinde balata tozu yağa karışır, valf bloğunu tıkar ve diğer kavrama paketlerinin de kaymasına yol açar. Birkaç bin kilometre sonra artık <strong>komple revizyon</strong> gerekir.',
        'Aynı mantık yağ bakımı için de geçerlidir: zamanında yapılan bir yağ + filtre bakımı, ertelendiğinde ortaya çıkacak onarımın yanında son derece küçük bir maliyettir.',
        'Bu yüzden en ekonomik şanzıman stratejisi basittir: <strong>belirti çıktığında beklemeyin, düzenli bakımı aksatmayın.</strong>'
      ]},
      { h2: 'Teklif alırken sormanız gereken sorular', paras: [
        'Şanzıman onarımı teklifi alırken şu soruları sormanız, karşılaştırma yapmanızı kolaylaştırır:'
      ], list: [
        '<strong>Arıza nasıl tespit edildi?</strong> Hata kodu okundu mu, yol testi ve basınç ölçümü yapıldı mı?',
        '<strong>Tam olarak hangi parçalar değişecek?</strong> Kalem kalem liste isteyin.',
        '<strong>Parçalar orijinal mi, muadil mi, yenilenmiş mi?</strong>',
        '<strong>Yağ, filtre ve conta fiyata dahil mi?</strong>',
        '<strong>Tork konvertörü kontrol edilecek mi?</strong> Otomatiklerde sık atlanan kalemdir.',
        '<strong>Yağ soğutucu hattı temizlenecek mi?</strong> Atlanırsa arıza tekrarlayabilir.',
        '<strong>Adaptasyon ve kodlama yapılacak mı?</strong> DSG/DCT’de zorunludur.',
        '<strong>Garanti kapsamı ve süresi nedir?</strong> Yazılı olmasını isteyin.'
      ]},
      { h2: 'Bizim yaklaşımımız', paras: [
        'HB Şanzıman olarak fiyatlandırmada üç ilkeye bağlı kalıyoruz:',
        '<strong>1. Önce tespit, sonra fiyat.</strong> Arıza tespiti ücretsizdir ve sizi bağlamaz. Ne bulduğumuzu ve hangi seçeneklerin olduğunu maliyetleriyle birlikte anlatırız.',
        '<strong>2. Gereken kadar müdahale.</strong> Her arızada komple revizyon önermiyoruz. Sorun tek bir solenoid veya yağ bakımıyla çözülüyorsa, çözümü budur.',
        '<strong>3. Onaysız işlem yok.</strong> Kapsam ve maliyet netleşip siz onaylamadan hiçbir işleme başlanmaz. Süreçte kapsam değişirse önce size bilgi veririz.'
      ]}
    ],
    faqs: [
      { q: 'Telefonda yaklaşık bir fiyat öğrenebilir miyim?', a: 'Aracınızın marka, model ve şanzıman tipini bildiğimizde genel bir aralık paylaşabiliriz. Ancak bu bir teklif değildir; gerçekçi fiyat yalnızca arıza tespitinden sonra çıkar. Tespit ücretsizdir ve sizi bağlamaz.' },
      { q: 'Arıza tespiti ücretli mi?', a: 'Hayır. Hata kodu okuma, yağ kontrolü ve yol testini içeren standart arıza tespitimiz ücretsizdir. Onarım kararını bulguları ve maliyeti gördükten sonra siz verirsiniz.' },
      { q: 'Neden bazı servisler çok daha ucuz fiyat veriyor?', a: 'Fiyat farkı genellikle kapsam farkından doğar. Tork konvertörü kontrolünün, yağ soğutucu temizliğinin, adaptasyonun veya conta takımının dahil olup olmaması ciddi fark yaratır. Bu yüzden teklifleri karşılaştırırken kalem kalem liste istemenizi öneriyoruz.' },
      { q: 'Şanzıman değiştirmek mi ucuz, tamir mi?', a: 'Hasarın boyutuna bağlıdır. Balata, keçe, solenoid ve valf bloğu kaynaklı arızalarda onarım hem daha ekonomik hem kalıcıdır. Gövde çatlağı veya yaygın dişli hasarı gibi durumlarda yenileme değerlendirilir. Tespit sonrası her iki seçeneği de maliyetiyle paylaşırız.' }
    ],
    related: [
      { href: 'hizmetler/sanziman-ariza-tespiti/', label: 'Ücretsiz arıza tespiti' },
      { href: 'hizmetler/sanziman-revizyonu/', label: 'Şanzıman revizyonu' },
      { href: 'sss/', label: 'Sıkça sorulan sorular' }
    ]
  }
];

module.exports = { POSTS };
