/* =========================================================
   HB ŞANZIMAN — Site sabitleri (tek doğruluk kaynağı / NAP)
   Bir bilgi değişirse SADECE burayı düzenleyin, `npm run build` çalıştırın.
   ========================================================= */

const SITE = {
  origin: 'https://hbsanziman.com',
  name: 'HB Otomatik Şanzıman',
  legalName: 'HB Otomatik Şanzıman',
  slogan: 'Bursa Otomatik Şanzıman Uzmanı',
  lang: 'tr',
  locale: 'tr_TR',

  // NAP — Name / Address / Phone. Google İşletme Profili ve tüm dizinlerde
  // BİREBİR aynı yazılmalıdır. Değişiklik burada yapılır.
  phone: '+905304918005',
  phoneDisplay: '0530 491 80 05',
  phone2: '+905438951732',
  phone2Display: '0543 895 17 32',
  email: 'hbotomatiksanziman16@gmail.com',
  street: 'Üçevler, 28. Sk. 27. Blok No:51',
  district: 'Nilüfer',
  city: 'Bursa',
  postalCode: '16270',
  country: 'TR',
  lat: 40.2214,
  lng: 28.9847,

  hours: { open: '08:30', close: '19:00', days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] },
  hoursText: 'Pazartesi – Cumartesi 08:30 – 19:00',

  ogImage: '/assets/og-image.png',
  logo: '/assets/logo.jpg',
  locationShort: 'Üçevler Sanayi, Nilüfer',

  // Kurulduktan sonra doldurun (boşsa ilgili etiket/blok hiç üretilmez)
  googleSiteVerification: '',
  gaMeasurementId: '',
  socials: [], // ör: ['https://www.instagram.com/hbsanziman']

  /* ---- Google İşletme Profili ----------------------------------------
     Her ikisi de İşletme Profili panelinden alınır:

     • googleBusinessUrl — profilin herkese açık Haritalar bağlantısı.
       Google Haritalar'da işletmenizi açın → Paylaş → Bağlantıyı kopyala.
       Yapısal veride `sameAs` ve `hasMap` olarak kullanılır; Google'ın
       site ile işletme kaydını eşleştirmesini kolaylaştırır.

     • googleReviewUrl — kısa yorum bağlantısı.
       İşletme Profili → "Yorum isteyin" → bağlantıyı kopyalayın
       (https://g.page/r/... biçiminde olur).
       Doldurulduğunda iletişim sayfasına ve alt bilgiye "Google'da
       değerlendirin" bağlantısı otomatik eklenir.

     İkisi de boş bırakılabilir; boşken hiçbir bağlantı görünmez.       */
  googleBusinessUrl: '',
  googleReviewUrl: ''
};

SITE.addressText = `${SITE.street}, ${SITE.postalCode} ${SITE.district} / ${SITE.city}`;

module.exports = { SITE };
