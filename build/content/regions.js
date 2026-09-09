/* =========================================================
   BÖLGE SAYFALARI — /bolgeler/*
   NOT: Bunlar "kapı sayfası" (doorway page) DEĞİLDİR.
   Her sayfa; ulaşım, bölgeye özgü sürüş koşulları ve
   araç profili açısından özgün içerik taşır. Aynı metnin
   ilçe adı değiştirilerek çoğaltılması Google tarafından
   spam sayılır ve sıralama kaybı yaratır.
   ========================================================= */

const REGIONS = [
  {
    slug: 'nilufer-sanziman-tamiri',
    nav: 'Nilüfer',
    area: 'Nilüfer',
    title: 'Nilüfer Şanzıman Tamiri | Otomatik Şanzıman Servisi',
    h1: 'Nilüfer Şanzıman Tamiri',
    description: 'Nilüfer’de otomatik şanzıman tamiri. Üçevler’deki atölyemizde ücretsiz arıza tespiti, DSG, CVT ve otomatik şanzıman onarımı.',
    lead: 'Atölyemiz Nilüfer Üçevler’de bulunuyor. İlçe içinden gelen araçlar için aynı gün arıza tespiti yapabiliyoruz.',
    intro: [
      'HB Şanzıman’ın atölyesi <strong>Nilüfer Üçevler’de</strong>, 28. Sokak üzerindedir. Nilüfer sınırları içindeki mahallelerden ulaşım kısa sürdüğü için, ilçe içinden gelen araçlarda çoğunlukla <strong>aynı gün arıza tespiti</strong> yapabiliyoruz.',
      'Nilüfer, Bursa’nın en yoğun trafiğe sahip ilçelerinden biri. Özellikle sabah ve akşam saatlerinde Üniversite Caddesi, İzmir Yolu ve FSM Bulvarı üzerindeki dur-kalk trafik, otomatik şanzımanlar için en yorucu kullanım biçimidir. Sürekli kalkış-duruş döngüsü tork konvertörünü ve çift kavramalı kutularda debriyajı ısıtır; bu da yağın termal yaşlanmasını hızlandırır.',
      'Bu nedenle ağırlıklı olarak şehir içi kullanılan Nilüfer araçlarında, üreticinin belirlediği yağ bakım aralığını <strong>bir miktar kısaltmayı</strong> öneriyoruz. Bu basit önlem, ileride çok daha maliyetli bir revizyon riskini belirgin şekilde azaltır.'
    ],
    neighborhoods: {
      h2: 'Nilüfer’de hizmet verdiğimiz mahalleler',
      intro: 'Aşağıdaki mahallelerden atölyemize ulaşım genellikle 10–20 dakika sürer.',
      items: [
        'Üçevler, Ertuğrul, Beşevler', 'İhsaniye, Fethiye, Karaman',
        'Görükle, Özlüce, Konak', 'Odunluk, Esentepe, Balat',
        'Altınşehir, Ataevler, Barış', '23 Nisan, Cumhuriyet, Kültür'
      ]
    },
    access: {
      h2: 'Bize nasıl ulaşırsınız?',
      items: [
        '<strong>Üniversite Caddesi</strong> üzerinden Üçevler yönüne dönüş yaparak yaklaşık 5 dakika',
        '<strong>FSM Bulvarı</strong> üzerinden Üçevler sapağı ile kısa mesafe',
        '<strong>İzmir Yolu</strong> istikametinden Beşevler üzerinden erişim',
        'Araç hareket edemiyorsa çekici ile getirilmesi konusunda yönlendirme yapıyoruz',
        'Yol tarifi için telefonla arayabilir veya iletişim sayfamızdaki haritayı kullanabilirsiniz'
      ]
    },
    faqs: [
      { q: 'Nilüfer’den aynı gün servis alabilir miyim?', a: 'Arıza tespiti çoğu zaman aynı gün içinde yapılabilir. Onarım süresi ise arızanın kapsamına ve parça teminine bağlıdır; tespit sonrası size net bir süre bildiririz.' },
      { q: 'Aracım hareket etmiyor, Nilüfer içinden nasıl getirebilirim?', a: 'Araç vites atmıyor veya harekete geçmiyorsa zorlamadan çekici ile getirmeniz en doğrusudur. Sürüşe devam etmek çoğu zaman hasarı büyütür. Bizi arayın, süreç konusunda yönlendirelim.' },
      { q: 'Şehir içi kullanım şanzımanı yıpratır mı?', a: 'Evet. Sürekli dur-kalk trafiği, otomatik şanzımanlarda yağ sıcaklığını yükseltir ve tork konvertörü ile debriyaj yükünü artırır. Ağırlıklı şehir içi kullanımda yağ bakım aralığının kısaltılmasını öneriyoruz.' }
    ]
  },
  {
    slug: 'osmangazi-sanziman-tamiri',
    nav: 'Osmangazi',
    area: 'Osmangazi',
    title: 'Osmangazi Şanzıman Tamiri | Otomatik Şanzıman Servisi',
    h1: 'Osmangazi Şanzıman Tamiri',
    description: 'Osmangazi’den ulaşılabilecek şanzıman servisi. Otomatik, DSG ve CVT şanzıman tamiri, ücretsiz arıza tespiti — Nilüfer Üçevler.',
    lead: 'Osmangazi’den atölyemize ulaşım ortalama 15–25 dakika sürer. Randevu ile geldiğinizde bekleme süresi olmadan aracınızı teslim alıyoruz.',
    intro: [
      'Osmangazi, Bursa’nın merkez ilçesi olarak hem yoğun şehir içi trafiğe hem de eğimli güzergâhlara sahiptir. Atölyemiz Nilüfer Üçevler’de bulunduğundan, Osmangazi’nin batı mahallelerinden ulaşım oldukça kısadır; merkez ve doğu mahallelerinden ise ortalama 20–25 dakikadır.',
      'Osmangazi’de şanzıman açısından belirleyici olan iki faktör var: <strong>merkezdeki dur-kalk trafiği</strong> ve <strong>eğimli sokaklar</strong>. Özellikle Uludağ yönüne çıkan eğimli güzergâhlarda otomatik şanzımanlar yüksek tork altında ve düşük hızda çalışır. Bu koşul, tork konvertöründe ısı üretimini artıran en zorlu senaryolardan biridir.',
      'Yokuşlu güzergâhı düzenli kullanan araçlarda <strong>yağ soğutucu hattının kontrolü</strong> ayrıca önemlidir. Tıkalı veya verimsiz bir soğutucu, şanzıman yağının çalışma sıcaklığını sürekli yüksek tutar ve balata ömrünü kısaltır.'
    ],
    neighborhoods: {
      h2: 'Osmangazi’de hizmet verdiğimiz bölgeler',
      items: [
        'Altıparmak, Çekirge, Hüdavendigar', 'Soğanlı, Panayır, Demirtaş',
        'Santral Garaj, Kükürtlü, Sırameşeler', 'Emek, Hürriyet, Yeşilyayla',
        'Alacahırka, Muradiye, Gaziakdemir', 'Yunuseli, Akpınar, Dikkaldırım'
      ]
    },
    access: {
      h2: 'Osmangazi’den ulaşım',
      items: [
        '<strong>Acemler</strong> üzerinden Üçevler yönüne yaklaşık 15 dakika',
        '<strong>Altıparmak / Çekirge</strong> bölgesinden İzmir Yolu üzerinden erişim',
        '<strong>Santral Garaj</strong> çevresinden FSM Bulvarı ile bağlantı',
        'Araç sürüşe uygun değilse çekici organizasyonu için yönlendirme yapıyoruz'
      ]
    },
    faqs: [
      { q: 'Osmangazi’den aracımı getirmem ne kadar sürer?', a: 'Bulunduğunuz mahalleye ve trafiğe göre değişmekle birlikte, Osmangazi’nin çoğu bölgesinden atölyemize ulaşım ortalama 15–25 dakikadır. Randevu alarak geldiğinizde bekleme süresi olmadan aracınızı teslim alırız.' },
      { q: 'Yokuşlu güzergâhta sürüş şanzımana zarar verir mi?', a: 'Doğrudan zarar vermez, ancak yüksek tork ve düşük hızda çalışma yağ sıcaklığını yükseltir. Uludağ yönü gibi eğimli güzergâhları düzenli kullanan araçlarda yağ bakım aralığının kısaltılmasını ve yağ soğutucu hattının kontrol edilmesini öneriyoruz.' },
      { q: 'Randevu almadan gelebilir miyim?', a: 'Gelebilirsiniz, ancak yoğunluğa bağlı olarak bekleme olabilir. Online randevu formumuz veya telefonla randevu almanız hem sizin hem bizim için zaman kazandırır.' }
    ]
  },
  {
    slug: 'yildirim-sanziman-tamiri',
    nav: 'Yıldırım',
    area: 'Yıldırım',
    title: 'Yıldırım Şanzıman Tamiri | Otomatik Şanzıman Servisi',
    h1: 'Yıldırım Şanzıman Tamiri',
    description: 'Yıldırım’dan ulaşılabilecek uzman şanzıman servisi. Otomatik, DSG ve CVT şanzıman onarımı, ücretsiz arıza tespiti.',
    lead: 'Yıldırım ilçesinden gelen araçlarda randevulu çalışıyoruz. Arıza tespiti ücretsiz, onarım kararı size ait.',
    intro: [
      'Yıldırım, Bursa’nın nüfus yoğunluğu en yüksek ilçelerinden biridir ve araç parkı ağırlıklı olarak <strong>yüksek kilometreli, şehir içi kullanılan otomobillerden</strong> oluşur. Bu profil, şanzıman servisi açısından belirgin bir özellik taşır: arızalar genellikle ani bir mekanik kırılmadan değil, <strong>uzun süre biriken bakım ihmalinden</strong> doğar.',
      'Atölyemize gelen Yıldırım kaynaklı araçlarda en sık karşılaştığımız durum, hiç değiştirilmemiş şanzıman yağıdır. Yağ yaşlandıkça hidrolik basıncı doğru iletemez; balatalar kayar, aşınma tozu valf bloğunu tıkar. Bu noktada artık tek başına yağ değişimi çözüm olmaz.',
      'Bu nedenle Yıldırım’dan gelen yüksek kilometreli araçlarda önce ayrıntılı tespit yapıyoruz. Yağın durumu, hata kayıtları ve basınç değerleri birlikte değerlendirilmeden yapılan işlem, çoğu zaman şikâyeti geçici olarak bastırır ve kısa sürede tekrarlar.'
    ],
    neighborhoods: {
      h2: 'Yıldırım’da hizmet verdiğimiz bölgeler',
      items: [
        'Değirmenönü, Millet, Yiğitler', 'Beyazıt, Duaçınarı, Arabayatağı',
        'Şirinevler, Erikli, Hacivat', 'Mimarsinan, Vakıf, Ertuğrul',
        'Yavuzselim, Karapınar, Teferrüç', '75. Yıl, Anadolu, Esenevler'
      ]
    },
    access: {
      h2: 'Yıldırım’dan ulaşım',
      items: [
        '<strong>Ankara Yolu</strong> üzerinden şehir merkezi bağlantısıyla erişim',
        '<strong>Çevre yolu</strong> kullanılarak Nilüfer / Üçevler yönü',
        'Araç sürüşe uygunsa yol testi için getirmeniz teşhisi kolaylaştırır',
        'Hareket etmeyen araçlar için çekici organizasyonuna yönlendirme yapıyoruz'
      ]
    },
    faqs: [
      { q: 'Yüksek kilometreli aracımın şanzımanı revizyon ister mi?', a: 'Kilometre tek başına belirleyici değildir. Belirleyici olan bakım geçmişi, yağın durumu ve mevcut aşınmadır. Ölçüm ve test yapmadan revizyon önermiyoruz; birçok araçta yağ + filtre bakımı ve valf bloğu revizyonu yeterli olabiliyor.' },
      { q: 'Hiç şanzıman yağı değiştirmedim, şimdi değiştirsem zarar verir mi?', a: 'Çok yüksek kilometreli ve hiç bakım görmemiş şanzımanlarda basınçlı şok yıkama, tortuların yerinden oynayarak kanalları tıkamasına yol açabilir. Bu araçlarda karter sökümlü, kontrollü değişimi tercih ediyor; yöntem kararını şanzımanın durumunu görerek veriyoruz.' },
      { q: 'Önce fiyat öğrenebilir miyim?', a: 'Telefonda ancak genel bir aralık verilebilir; gerçekçi fiyat arıza tespitinden sonra çıkar. Tespit ücretsizdir ve sizi bağlamaz — kararı bulguları ve maliyeti gördükten sonra verirsiniz.' }
    ]
  },
  {
    slug: 'gemlik-sanziman-tamiri',
    nav: 'Gemlik',
    area: 'Gemlik',
    title: 'Gemlik Şanzıman Tamiri | Otomatik Şanzıman Servisi',
    h1: 'Gemlik Şanzıman Tamiri',
    description: 'Gemlik’ten gelen araçlar için otomatik şanzıman tamiri ve revizyonu. Randevulu çalışma, ücretsiz arıza tespiti — Bursa Nilüfer.',
    lead: 'Gemlik’ten gelen araçlar için randevu planlamasını, tek seferde işlem yapılabilecek şekilde düzenliyoruz.',
    intro: [
      'Gemlik’ten Bursa merkeze ulaşım yaklaşık 30–40 dakika sürdüğü için, bu bölgeden gelen müşterilerimizde <strong>randevu planlamasına özel önem veriyoruz</strong>. Amacımız, aracın gereksiz yere birden fazla kez getirilmesini önlemek: tespit, teklif ve mümkünse işlemin aynı ziyarette ilerlemesini sağlamak.',
      'Gemlik ve çevresindeki araç kullanımının belirgin bir özelliği var: <strong>şehirlerarası yol ağırlıklı sürüş</strong>. Uzun yol kullanımı, şehir içi dur-kalk trafiğe göre şanzıman için genellikle daha az yıpratıcıdır. Ancak burada başka bir risk devreye girer — yüksek hızda ve sabit devirde uzun süre çalışma, yağın termal yükünü sürekli kılar.',
      'Ayrıca bölgede römork veya yük çekimi yapan araç oranı yüksektir. <strong>Çekme yükü altında çalışan otomatik şanzımanlarda</strong> yağ sıcaklığı belirgin şekilde artar; bu araçlarda yağ soğutucu hattının verimliliği ve bakım aralığı özellikle takip edilmelidir.'
    ],
    neighborhoods: {
      h2: 'Gemlik ve çevresinde hizmet verdiğimiz yerler',
      items: [
        'Gemlik merkez', 'Umurbey', 'Küçük Kumla', 'Büyük Kumla',
        'Kurşunlu', 'Engürücük ve çevre mahalleler'
      ]
    },
    access: {
      h2: 'Gemlik’ten ulaşım ve süreç',
      items: [
        '<strong>Bursa – Gemlik yolu</strong> üzerinden Nilüfer / Üçevler yönüne yaklaşık 30–40 dakika',
        'Uzak mesafe nedeniyle randevuyu tek ziyarette işlem yapılabilecek şekilde planlıyoruz',
        'Aracınızın markası, modeli ve şikâyetini önceden bildirirseniz parça hazırlığı yapabiliriz',
        'Onarım birden fazla gün sürecekse süreci baştan net şekilde bildiririz'
      ]
    },
    faqs: [
      { q: 'Gemlik’ten geliyorum, aracı bırakmam gerekir mi?', a: 'Arıza tespiti genellikle aynı gün tamamlanır. Onarım gerekiyorsa ve parça mevcutsa aynı ziyarette ilerleyebiliriz. Uzak mesafeden geldiğiniz için süreci baştan planlayıp size net bilgi vermeye özen gösteriyoruz.' },
      { q: 'Uzun yol kullanımı şanzıman için daha mı iyi?', a: 'Genel olarak evet — dur-kalk trafiğe göre daha az yıpratıcıdır. Ancak yüksek hızda sabit devirde uzun süre çalışma yağ sıcaklığını sürekli yüksek tutar. Uzun yol ağırlıklı araçlarda da düzenli yağ bakımı gereklidir.' },
      { q: 'Römork çekiyorum, ek bakım gerekir mi?', a: 'Evet. Çekme yükü altında şanzıman yağı belirgin şekilde daha fazla ısınır. Bu araçlarda yağ bakım aralığının kısaltılmasını ve yağ soğutucu hattının düzenli kontrolünü öneriyoruz.' }
    ]
  },
  {
    slug: 'inegol-sanziman-tamiri',
    nav: 'İnegöl',
    area: 'İnegöl',
    title: 'İnegöl Şanzıman Tamiri | Otomatik Şanzıman Servisi',
    h1: 'İnegöl Şanzıman Tamiri',
    description: 'İnegöl’den gelen araçlar için otomatik ve DSG şanzıman tamiri. Ücretsiz arıza tespiti, planlı randevu — Bursa Nilüfer.',
    lead: 'İnegöl’den gelen araçlarda süreci telefonla önceden planlıyor, gereksiz ikinci ziyareti önlemeye çalışıyoruz.',
    intro: [
      'İnegöl, Bursa merkeze yaklaşık 45 dakikalık mesafededir. Bu nedenle bölgeden gelen araçlarda <strong>süreci telefonla önceden planlıyoruz</strong>: aracın markası, modeli, şanzıman tipi ve şikâyetinizi baştan alıp, olası parça ihtiyacını önceden değerlendiriyoruz.',
      'İnegöl ve çevresindeki sürüş profilinde iki unsur öne çıkar: <strong>eğimli bağlantı yolları</strong> ve <strong>ticari araç yoğunluğu</strong>. Mobilya sanayii nedeniyle bölgede hafif ticari araç kullanımı yaygındır; bu araçlar sık sık yük altında ve dur-kalk şekilde çalışır.',
      'Yük altında çalışan otomatik şanzımanlarda tork konvertörü daha uzun süre kilitlenmemiş modda kalır ve ısı üretir. Bu araçlarda <strong>yağ bakım aralığının kısaltılması</strong> ve soğutucu hattının kontrolü, arıza riskini azaltmanın en pratik yoludur.'
    ],
    neighborhoods: {
      h2: 'İnegöl ve çevresinde hizmet verdiğimiz yerler',
      items: [
        'İnegöl merkez', 'Cerrah', 'Alanyurt', 'Yenice',
        'Hamzabey', 'Kurşunlu ve çevre mahalleler'
      ]
    },
    access: {
      h2: 'İnegöl’den ulaşım ve süreç',
      items: [
        '<strong>Bursa – İnegöl karayolu</strong> üzerinden Nilüfer yönüne yaklaşık 45 dakika',
        'Gelmeden önce telefonla bilgi verirseniz parça ve zaman planlaması yapabiliriz',
        'Ticari araçlarda iş kaybını azaltmak için teslim süresini baştan netleştiriyoruz',
        'Araç hareket edemiyorsa çekici süreci konusunda yönlendirme yapıyoruz'
      ]
    },
    faqs: [
      { q: 'İnegöl’den gelmeden önce ne yapmalıyım?', a: 'Bizi arayarak aracınızın marka, model ve yılını, mümkünse şanzıman tipini ve şikâyetinizi paylaşın. Bu bilgiyle olası parça ihtiyacını önceden değerlendirir, geldiğinizde süreci hızlandırırız.' },
      { q: 'Ticari aracımın şanzımanı daha çabuk mu bozulur?', a: 'Yük altında ve dur-kalk çalışan araçlarda şanzıman yağı daha fazla ısınır, balata ve yağ ömrü kısalır. Arıza kaçınılmaz değildir; ancak bakım aralığının kısaltılması bu araçlarda belirgin fark yaratır.' },
      { q: 'Onarım kaç gün sürer, aracımı ne zaman alabilirim?', a: 'Arızanın kapsamına ve parça teminine bağlıdır. Tespit sonrası tahmini teslim tarihini net olarak bildiriyoruz; ticari araçlarda iş kaybını azaltmak için planlamayı buna göre yapıyoruz.' }
    ]
  },
  {
    slug: 'mudanya-sanziman-tamiri',
    nav: 'Mudanya',
    area: 'Mudanya',
    title: 'Mudanya Şanzıman Tamiri | Otomatik Şanzıman Servisi',
    h1: 'Mudanya Şanzıman Tamiri',
    description: 'Mudanya’dan gelen araçlar için otomatik, DSG ve CVT şanzıman tamiri. Ücretsiz arıza tespiti — Bursa Nilüfer Üçevler.',
    lead: 'Mudanya’dan atölyemize ulaşım yaklaşık 25–30 dakika. Sahil kesimi araçlarında korozyon ve nem kontrolünü de yapıyoruz.',
    intro: [
      'Mudanya’dan Nilüfer Üçevler’deki atölyemize ulaşım, Mudanya yolu üzerinden yaklaşık 25–30 dakikadır. Bölgeden düzenli olarak araç kabul ediyoruz.',
      'Mudanya’nın şanzıman açısından kendine özgü bir yanı var: <strong>sahil bölgesi ve nemli hava</strong>. Deniz kenarındaki araçlarda elektrik konnektörleri, şanzıman soketleri ve metal bağlantı noktalarında korozyon riski iç bölgelere göre daha yüksektir. Şanzıman arızası şüphesiyle gelen bazı araçlarda sorunun kaynağı aslında <strong>oksitlenmiş bir soket veya kablo bağlantısı</strong> olabiliyor.',
      'Bu nedenle Mudanya ve sahil kesiminden gelen araçlarda tespit protokolümüze <strong>ek bir görsel kontrol adımı</strong> ekliyoruz: şanzıman konnektörleri, sensör soketleri ve toprak bağlantıları oksitlenmeye karşı ayrıca inceleniyor. Bu basit kontrol, bazen gereksiz bir parça değişiminin önüne geçiyor.',
      'Ayrıca Mudanya yolundaki eğimli bölümler, otomatik şanzımanların yüksek tork altında çalıştığı güzergâhlardır; bu profilde yağ soğutucu hattının sağlığı ayrıca önem kazanır.'
    ],
    neighborhoods: {
      h2: 'Mudanya ve çevresinde hizmet verdiğimiz yerler',
      items: [
        'Mudanya merkez', 'Güzelyalı', 'Badırga', 'Çağrışan',
        'Zeytinbağı (Tirilye)', 'Altıntaş ve çevre mahalleler'
      ]
    },
    access: {
      h2: 'Mudanya’dan ulaşım',
      items: [
        '<strong>Mudanya yolu</strong> üzerinden Nilüfer / Üçevler yönüne yaklaşık 25–30 dakika',
        '<strong>Güzelyalı</strong> istikametinden çevre yolu bağlantısı ile erişim',
        'Sahil kesiminden gelen araçlarda ek korozyon/soket kontrolü yapıyoruz',
        'Randevu ile geldiğinizde bekleme olmadan araç kabulü yapılır'
      ]
    },
    faqs: [
      { q: 'Deniz kenarında park etmek şanzımanı etkiler mi?', a: 'Şanzımanın iç mekaniğini doğrudan etkilemez, ancak nemli ve tuzlu hava elektrik konnektörlerinde ve soketlerde korozyona yol açabilir. Bu da sensör hataları ve hatalı şanzıman uyarıları üretebilir. Sahil kesiminden gelen araçlarda bu noktaları ayrıca kontrol ediyoruz.' },
      { q: 'Mudanya’dan geliyorum, önce arayayım mı?', a: 'Evet, öneririz. Randevu alarak geldiğinizde bekleme olmaz ve aracınızı doğrudan teslim alırız. Marka/model bilgisini önceden paylaşırsanız hazırlık yapabiliriz.' },
      { q: 'Eğimli yol kullanımı için ek bakım gerekir mi?', a: 'Eğimli güzergâhta otomatik şanzıman yüksek tork ve düşük hızda çalışır; bu, yağ sıcaklığını yükseltir. Bu güzergâhı düzenli kullanan araçlarda yağ bakım aralığının kısaltılmasını ve soğutucu hattının kontrolünü öneriyoruz.' }
    ]
  }
];

module.exports = { REGIONS };
