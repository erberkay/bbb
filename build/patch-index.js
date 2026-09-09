#!/usr/bin/env node
/* =========================================================
   Ana sayfayı (index.html) yeni site mimarisine bağlar.
   Idempotent: birden fazla kez çalıştırılabilir.
   ========================================================= */
const fs = require('fs');
const path = require('path');
const { SITE } = require('./config');
const { gbpSchemaFields } = require('./layout');

const file = path.join(__dirname, '..', 'index.html');
let h = fs.readFileSync(file, 'utf8');
const before = h;
const changes = [];
function apply(name, fn) {
  const prev = h; h = fn(h);
  changes.push((h !== prev ? '✓ ' : '· atlandı (zaten uygulanmış): ') + name);
}

/* ---------- 1. robots: zengin sonuç direktifleri ---------- */
apply('robots meta genişletildi', s => s.replace(
  '<meta name="robots" content="index, follow">',
  '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">'
));

/* ---------- 2. OG/Twitter görseli: SVG yerine PNG ---------- */
apply('og:image PNG olarak güncellendi', s => s.replace(
  '<meta property="og:image" content="https://hbsanziman.com/assets/logo.svg">',
  `<meta property="og:image" content="${SITE.origin}${SITE.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="HB Şanzıman — Bursa Otomatik Şanzıman Uzmanı">`
));
apply('twitter:image PNG olarak güncellendi', s => s.replace(
  '<meta name="twitter:image" content="https://hbsanziman.com/assets/logo.svg">',
  `<meta name="twitter:image" content="${SITE.origin}${SITE.ogImage}">`
));

/* ---------- 3. Manifest + apple-touch-icon ---------- */
apply('manifest ve apple-touch-icon eklendi', s => s.includes('site.webmanifest') ? s : s.replace(
  '<link rel="icon" type="image/svg+xml" href="assets/logo.svg">',
  `<link rel="icon" type="image/svg+xml" href="assets/logo.svg">
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">`
));

/* ---------- 4. Yazı tipleri: render engellemeyen yükleme ---------- */
apply('font yüklemesi render engellemeyecek şekilde değiştirildi', s => s.replace(
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">',
  `<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap"></noscript>`
));

/* ---------- 5. pages.css ---------- */
apply('pages.css bağlandı', s => s.includes('assets/pages.css') ? s : s.replace(
  '<link rel="stylesheet" href="assets/styles.css">',
  `<link rel="stylesheet" href="assets/styles.css">
  <link rel="stylesheet" href="assets/pages.css">`
));

/* ---------- 6. Ek yapısal veri: WebSite + Organization + FAQPage ---------- */
const HOME_FAQS = [
  { q: 'Şanzıman arıza tespiti ücretli mi?', a: 'Hayır. Hata kodu okuma, yağ kontrolü ve yol testini içeren standart arıza tespitimiz ücretsizdir ve sizi hiçbir şeye bağlamaz. Onarım kararını, bulguları ve maliyeti gördükten sonra siz verirsiniz.' },
  { q: 'Şanzıman tamiri ne kadar sürer?', a: 'Arızanın kapsamına göre değişir. Solenoid veya valf bloğu müdahalesi genellikle 1 iş günü içinde tamamlanır. Komple revizyon, parça teminine bağlı olarak 2–5 iş günü sürebilir. Kesin süre arıza tespiti sonrasında bildirilir.' },
  { q: 'Yaptığınız işe garanti veriyor musunuz?', a: 'Evet. İşçilik ve değişen parçalar için garanti veriyoruz. Garanti kapsamı ve süresi, uygulanan işleme göre teslim sırasında yazılı olarak belirtilir.' },
  { q: 'Telefonda fiyat öğrenebilir miyim?', a: 'Aracınızın marka, model ve şanzıman tipini bildiğimizde genel bir aralık paylaşabiliriz, ancak bu bir teklif değildir. Aynı şikâyetin arkasında çok farklı maliyetlerde arızalar olabilir; gerçekçi fiyat tespitten sonra çıkar.' },
  { q: 'Şanzıman yağı ne zaman değişmeli?', a: 'Klasik otomatiklerde genel aralık 60.000–80.000 km, ıslak debriyajlı DSG kutularda yaklaşık 60.000 km, CVT şanzımanlarda ise 40.000–60.000 km’dir. Şehir içi yoğun kullanım ve yük çekiminde bu aralıkların kısaltılmasını öneriyoruz.' },
  { q: 'Hangi markalara servis veriyorsunuz?', a: 'Volkswagen, Audi, Mercedes-Benz, BMW, Ford, Renault, Dacia, Toyota, Honda, Hyundai ve Kia başta olmak üzere çoğu binek ve hafif ticari araca servis veriyoruz.' },
  { q: 'Şanzıman arızasıyla araç kullanmaya devam edebilir miyim?', a: 'Belirtiye bağlıdır. Kayma, uğultu, acil moda geçiş ve vitesin devreye girmemesi gibi durumlarda sürüşe devam etmek hasarı belirgin şekilde büyütür. Aracı zorlamadan kontrole getirmenizi öneririz.' },
  { q: 'Her arızada komple revizyon mu gerekir?', a: 'Hayır. Birçok arıza solenoid değişimi, valf bloğu revizyonu, yağ ve filtre bakımı veya adaptasyon ile çözülür. Revizyon yalnızca birden fazla bileşende aşınma olduğunda önerilir.' }
];

const extraSchema = `
  <!-- Yapısal Veri: Web Sitesi -->
  <script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'WebSite',
  '@id': SITE.origin + '/#website', name: SITE.name, url: SITE.origin + '/',
  inLanguage: 'tr-TR',
  publisher: { '@id': SITE.origin + '/#organization' }
}, null, 2)}
  </script>

  <!-- Yapısal Veri: Kurum -->
  <script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Organization',
  '@id': SITE.origin + '/#organization', name: SITE.name, legalName: SITE.legalName,
  url: SITE.origin + '/', logo: SITE.origin + SITE.logo, image: SITE.origin + SITE.ogImage,
  email: SITE.email,
  ...gbpSchemaFields(),
  address: {
    '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.district,
    addressRegion: SITE.city, postalCode: SITE.postalCode, addressCountry: SITE.country
  },
  contactPoint: [{
    '@type': 'ContactPoint', telephone: SITE.phone, contactType: 'customer service',
    areaServed: 'TR', availableLanguage: ['Turkish']
  }]
}, null, 2)}
  </script>

  <!-- Yapısal Veri: Sıkça Sorulan Sorular -->
  <script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
}, null, 2)}
  </script>
`;

const SCHEMA_START = '  <!-- ÜRETİLEN YAPISAL VERİ — BAŞLANGIÇ (elle düzenlemeyin; build/patch-index.js üretir) -->';
const SCHEMA_END   = '  <!-- ÜRETİLEN YAPISAL VERİ — BİTİŞ -->';
const schemaBlock  = `${SCHEMA_START}\n${extraSchema}${SCHEMA_END}\n`;

const GENERATED_TYPES = ['WebSite', 'Organization', 'FAQPage'];

apply('WebSite / Organization / FAQPage yapısal verisi güncellendi', s => {
  // 1) Daha önce üretilmiş blokları — işaretli ya da işaretsiz — tamamen kaldır.
  //    Tür bazlı çalışır, bu yüzden eski sürümlerin çıktısını da temizler ve
  //    tekrar tekrar çalıştırıldığında blok çoğaltmaz.
  s = s.replace(
    /[ \t]*(?:<!--[^>]*-->\s*)?<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>\n?/g,
    (full, json) => {
      let obj;
      try { obj = JSON.parse(json); } catch { return full; }
      return GENERATED_TYPES.includes(obj['@type']) ? '' : full;
    }
  );
  s = s.replace(new RegExp(SCHEMA_START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\n*'), '')
       .replace(new RegExp(SCHEMA_END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\n*'), '');

  // 2) Taze bloğu yerleştir.
  return s.replace(
    '  <link rel="preconnect" href="https://fonts.googleapis.com">',
    schemaBlock + '\n  <link rel="preconnect" href="https://fonts.googleapis.com">'
  );
});

/* ---------- 7. İçeriğe atlama bağlantısı ---------- */
apply('içeriğe atlama bağlantısı eklendi', s => s.includes('skip-link') ? s : s.replace(
  '<body>\n',
  '<body>\n  <a class="skip-link" href="#anasayfa">İçeriğe geç</a>\n'
));

/* ---------- 8. Navigasyon: yeni bölümler ---------- */
apply('navigasyon yeni sayfalara bağlandı', s => s.replace(
  `        <li><a href="#anasayfa">Anasayfa</a></li>
        <li><a href="#hizmetler">Hizmetler</a></li>
        <li><a href="#neden-biz">Neden Biz</a></li>
        <li><a href="#surec">Süreç</a></li>
        <li><a href="#iletisim">İletişim</a></li>`,
  `        <li><a href="#anasayfa">Anasayfa</a></li>
        <li><a href="hizmetler/">Hizmetler</a></li>
        <li><a href="markalar/">Markalar</a></li>
        <li><a href="bolgeler/">Bölgeler</a></li>
        <li><a href="blog/">Blog</a></li>
        <li><a href="sss/">S.S.S.</a></li>
        <li><a href="#iletisim">İletişim</a></li>`
));

/* ---------- 9. Hamburger erişilebilirliği ---------- */
apply('hamburger düğmesine ARIA durumu eklendi', s => s.replace(
  '<button class="hamburger" id="hamburger" aria-label="Menü">',
  '<button class="hamburger" id="hamburger" aria-label="Menüyü aç/kapat" aria-expanded="false" aria-controls="navLinks">'
));

/* ---------- 10. Logolara boyut (CLS önleme) ---------- */
apply('logo görsellerine genişlik/yükseklik eklendi', s =>
  s.replace(/<img src="assets\/logo\.svg" class="logo" alt="([^"]*)">/g,
            '<img src="assets/logo.svg" class="logo" width="40" height="40" alt="$1">'));

/* ---------- 11. Hizmet kartlarını detay sayfalarına bağla ---------- */
const cardLinks = {
  'Otomatik Şanzıman Tamiri': 'hizmetler/otomatik-sanziman-tamiri/',
  'Tork Konvertörü Tamiri': 'hizmetler/tork-konvertoru-tamiri/',
  'DSG &amp; CVT Şanzıman': 'hizmetler/dsg-sanziman-tamiri/',
  'DSG & CVT Şanzıman': 'hizmetler/dsg-sanziman-tamiri/',
  'Şanzıman Revizyonu': 'hizmetler/sanziman-revizyonu/',
  'Arıza Tespiti (Diagnostik)': 'hizmetler/sanziman-ariza-tespiti/',
  'Şanzıman Yağı &amp; Bakım': 'hizmetler/sanziman-yagi-degisimi/',
  'Şanzıman Yağı & Bakım': 'hizmetler/sanziman-yagi-degisimi/'
};
apply('hizmet kartları detay sayfalarına bağlandı', s => {
  Object.entries(cardLinks).forEach(([title, href]) => {
    const plain = `<h3>${title}</h3>`;
    if (s.includes(plain)) s = s.replace(plain, `<h3><a href="${href}">${title}</a></h3>`);
  });
  // Her kartın altına "Detaylı bilgi" bağlantısı
  Object.entries(cardLinks).forEach(([title, href]) => {
    const re = new RegExp(`(<h3><a href="${href.replace(/\//g, '\\/')}">${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</a></h3>\\s*<p>[^<]*</p>)`);
    if (re.test(s) && !s.includes(`href="${href}" class="card-more"`)) {
      s = s.replace(re, `$1\n          <a href="${href}" class="card-more">Detaylı bilgi →</a>`);
    }
  });
  return s;
});

/* ---------- 12. Hizmetler bölümüne hub bağlantısı ---------- */
apply('hizmetler bölümüne alt sayfa keşif bloğu eklendi', s => s.includes('id="hizmet-kesif"') ? s : s.replace(
  `      </div>
    </div>
  </section>

  <!-- ===================== NEDEN BİZ ===================== -->`,
  `      </div>

      <div class="explore-row" id="hizmet-kesif">
        <a href="hizmetler/">Tüm hizmetlerimiz →</a>
        <a href="markalar/">Markaya göre servis →</a>
        <a href="bolgeler/">Hizmet bölgelerimiz →</a>
        <a href="blog/">Şanzıman rehberleri →</a>
      </div>
    </div>
  </section>

  <!-- ===================== NEDEN BİZ ===================== -->`
));

/* ---------- 13. SSS bölümü (FAQPage şeması ile eşleşir) ---------- */
const faqHtml = `
  <!-- ===================== SIKÇA SORULAN SORULAR ===================== -->
  <section class="section" id="sss" style="background:var(--bg-2)">
    <div class="container narrow">
      <div class="center reveal">
        <span class="section-tag">S.S.S.</span>
        <h2 class="section-title">Sıkça sorulan <span class="text-gold">sorular</span></h2>
        <p class="section-sub">Müşterilerimizden en çok aldığımız soruların dürüst cevapları.</p>
      </div>

      <div class="faq reveal" style="margin-top:40px">
${HOME_FAQS.map(f => `        <details>
          <summary>${f.q}</summary>
          <div class="faq-a"><p>${f.a}</p></div>
        </details>`).join('\n')}
      </div>

      <div class="explore-row" style="margin-top:28px">
        <a href="sss/">Tüm soruları görün →</a>
        <a href="blog/">Rehber yazılarımız →</a>
      </div>
    </div>
  </section>

`;
apply('SSS bölümü eklendi', s => s.includes('id="sss"') ? s : s.replace(
  '  <!-- ===================== İLETİŞİM ===================== -->',
  faqHtml + '  <!-- ===================== İLETİŞİM ===================== -->'
));

/* ---------- 14. Footer: yeni sayfalar + yasal bağlantılar ---------- */
apply('footer hizmet bağlantıları güncellendi', s => s.replace(
  `            <li><a href="#hizmetler">Otomatik Şanzıman</a></li>
            <li><a href="#hizmetler">Tork Konvertörü</a></li>
            <li><a href="#hizmetler">DSG & CVT</a></li>
            <li><a href="#hizmetler">Revizyon</a></li>
            <li><a href="#hizmetler">Yağ & Bakım</a></li>`,
  `            <li><a href="hizmetler/otomatik-sanziman-tamiri/">Otomatik Şanzıman Tamiri</a></li>
            <li><a href="hizmetler/dsg-sanziman-tamiri/">DSG Şanzıman Tamiri</a></li>
            <li><a href="hizmetler/cvt-sanziman-tamiri/">CVT Şanzıman Tamiri</a></li>
            <li><a href="hizmetler/tork-konvertoru-tamiri/">Tork Konvertörü Tamiri</a></li>
            <li><a href="hizmetler/mekatronik-tamiri/">Mekatronik Tamiri</a></li>
            <li><a href="hizmetler/">Tüm hizmetler →</a></li>`
));

apply('footer kurumsal bağlantıları güncellendi', s => s.replace(
  `          <h5>Kurumsal</h5>
          <ul>
            <li><a href="#neden-biz">Neden Biz</a></li>
            <li><a href="#surec">Çalışma Sürecimiz</a></li>
            <li><a href="#randevu">Randevu Al</a></li>
            <li><a href="#iletisim">İletişim</a></li>
          </ul>`,
  `          <h5>Keşfet</h5>
          <ul>
            <li><a href="markalar/">Markaya Göre Servis</a></li>
            <li><a href="bolgeler/">Hizmet Bölgeleri</a></li>
            <li><a href="blog/">Blog & Rehberler</a></li>
            <li><a href="sss/">Sıkça Sorulan Sorular</a></li>
            <li><a href="hakkimizda/">Hakkımızda</a></li>
            <li><a href="iletisim/">İletişim</a></li>
          </ul>`
));

apply('footer yasal bağlantıları eklendi', s => s.includes('gizlilik-politikasi') ? s : s.replace(
  `            <li><a href="mailto:info@hbsanziman.com">info@hbsanziman.com</a></li>
          </ul>`,
  `            <li><a href="mailto:info@hbsanziman.com">info@hbsanziman.com</a></li>
          </ul>
          <h5 style="margin-top:18px">Yasal</h5>
          <ul>
            <li><a href="gizlilik-politikasi/">Gizlilik Politikası</a></li>
            <li><a href="kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</a></li>
            <li><a href="cerez-politikasi/">Çerez Politikası</a></li>
          </ul>`
));

/* ---------- 15. Aşamalı geliştirme bayrağı ---------- */
apply('reveal animasyonu için js sınıfı betiği eklendi', s => s.includes("classList.add('js')") ? s : s.replace(
  '<head>',
  `<head>
  <script>if('IntersectionObserver' in window)document.documentElement.classList.add('js');</script>`
));

/* ---------- 16. Mobil hızlı eylem çubuğu ---------- */
const mobileBar = `
  <!-- Mobil hızlı eylem çubuğu -->
  <div class="mobile-bar">
    <a href="tel:${SITE.phone}" class="mb-item">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>
      <span>Ara</span>
    </a>
    <a href="https://wa.me/${SITE.phone.replace('+', '')}" class="mb-item" rel="noopener" target="_blank">
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1a8 8 0 01-2.4-1.5 9 9 0 01-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.5 2.5 1 3 .8 3.6.8.5-.1 1.8-.7 2-1.5.3-.7.3-1.3.2-1.4l-.7-.4zM12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2z"/></svg>
      <span>WhatsApp</span>
    </a>
    <a href="#randevu" class="mb-item primary">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
      <span>Randevu</span>
    </a>
  </div>
`;
apply('mobil hızlı eylem çubuğu eklendi', s => s.includes('mobile-bar') ? s : s.replace(
  '</body>', mobileBar + '</body>'
));


/* ---------- 17. Ana sayfa AutoRepair şemasına İşletme Profili bağlantısı ----------
   Elle yazılmış JSON-LD bloğu ayrıştırılır, alanlar ayarlanır ve yeniden
   yazılır. Metin üzerinde arama/değiştirme yapılmadığı için tekrar tekrar
   çalıştırıldığında alan çoğaltmaz; config boşaltılırsa alanları temizler. */
apply('AutoRepair şemasına Google İşletme Profili bağlandı', s => {
  const fields = gbpSchemaFields();
  return s.replace(
    /(<script type="application\/ld\+json">\s*)(\{[\s\S]*?\})(\s*<\/script>)/g,
    (full, open, json, close) => {
      let obj;
      try { obj = JSON.parse(json); } catch { return full; }
      if (obj['@type'] !== 'AutoRepair') return full;
      delete obj.sameAs; delete obj.hasMap;
      Object.assign(obj, fields);
      return open + JSON.stringify(obj, null, 2).replace(/\n/g, '\n  ') + close;
    }
  );
});

fs.writeFileSync(file, h, 'utf8');
console.log(changes.join('\n'));
console.log(h === before ? '\nDeğişiklik yok.' : `\nindex.html güncellendi (${before.length} → ${h.length} bayt).`);
