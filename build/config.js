/* =========================================================
   HB ŞANZIMAN — Site sabitleri (tek doğruluk kaynağı / NAP)
   Bir bilgi değişirse SADECE burayı düzenleyin, `npm run build` çalıştırın.
   ========================================================= */

const SITE = {
  origin: 'https://hbsanziman.com',
  name: 'HB Şanzıman',
  legalName: 'HB Şanzıman Otomotiv',
  slogan: 'Bursa Otomatik Şanzıman Uzmanı',
  lang: 'tr',
  locale: 'tr_TR',

  // NAP — Name / Address / Phone. Google İşletme Profili ve tüm dizinlerde
  // BİREBİR aynı yazılmalıdır. Değişiklik burada yapılır.
  phone: '+905304918005',
  phoneDisplay: '0530 491 80 05',
  email: 'info@hbsanziman.com',
  street: 'Üçevler, 28. Sk. 27. Blok No:51',
  district: 'Nilüfer',
  city: 'Bursa',
  postalCode: '16120',
  country: 'TR',
  lat: 40.2214,
  lng: 28.9847,

  hours: { open: '08:30', close: '19:00', days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] },
  hoursText: 'Pazartesi – Cumartesi 08:30 – 19:00',

  ogImage: '/assets/og-image.png',
  logo: '/assets/logo.svg',

  // Kurulduktan sonra doldurun (boşsa ilgili etiket üretilmez)
  googleSiteVerification: '',
  gaMeasurementId: '',
  socials: [] // ör: ['https://www.instagram.com/hbsanziman']
};

SITE.addressText = `${SITE.street}, ${SITE.postalCode} ${SITE.district} / ${SITE.city}`;

module.exports = { SITE };
