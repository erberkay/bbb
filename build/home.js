/* =========================================================
   ANA SAYFA — "HB Otomatik Şanzıman" tasarım kanvasından
   (Masaüstü + Mobil artboard'ları).

   Tasarımdan ayrıldığımız yerler (bilinçli):
   - Kartlar ve satırlar #randevu yerine ilgili alt sayfalara bağlanır
     (iç bağlantı = SEO; ziyaretçi de doğru bilgiye ulaşır).
   - Tasarımdaki randevu bandı, sitedeki gerçek randevu formuyla birleşti.
   - Alt bilgiye hizmet / keşfet / yasal bağlantı sütunları eklendi.
   ========================================================= */
const { SITE } = require('./config');
const { layout, esc, mapsUrl, ICON, faqSchema, gbpSchemaFields } = require('./layout');
const { SERVICES } = require('./content/services');

/* ---------- Tasarımdaki içerik ---------- */

const SYMPTOMS = [
  { title: 'Vites geçişlerinde vuruntu',               text: 'Kavrama paketi, mekatronik veya tork konvertörü', href: 'blog/otomatik-sanziman-ariza-belirtileri/' },
  { title: 'Vites atmıyor, geri viteste gecikme',      text: 'Basınç kaybı, valf gövdesi, seçici modülü',        href: 'hizmetler/otomatik-sanziman-tamiri/' },
  { title: 'Arıza lambası yandı, koruma moduna geçti', text: 'Mekatronik ünitesi ve sensör arızaları',          href: 'hizmetler/mekatronik-tamiri/' },
  { title: 'Şanzıman ısınıyor, yanık yağ kokusu',      text: 'Yağ ve filtre durumu, soğutma devresi',           href: 'hizmetler/sanziman-yagi-degisimi/' },
  { title: 'DSG kalkışta titriyor, silkeliyor',        text: 'DQ200 kuru kavrama aşınması ve adaptasyon',       href: 'hizmetler/dsg-sanziman-tamiri/' },
  { title: 'Devir yükseliyor, hız artmıyor',           text: 'CVT kayış–kasnak kayması veya konvertör',         href: 'hizmetler/cvt-sanziman-tamiri/' }
];

const FAMILIES = [
  { name: 'DSG',        models: 'DQ200 · DQ250 · DQ381 · DQ500', href: 'hizmetler/dsg-sanziman-tamiri/' },
  { name: 'S-Tronic',   models: 'DL501 · DL382',                  href: 'markalar/audi-sanziman-tamiri/' },
  { name: 'CVT',        models: 'Kayışlı ve zincirli tipler',     href: 'hizmetler/cvt-sanziman-tamiri/' },
  { name: 'PowerShift', models: '6DCT250 · 6DCT450',              href: 'markalar/ford-powershift-sanziman-tamiri/' }
];

const HOME_SERVICES = [
  { no: '01', title: 'Teşhis',                   text: 'Arıza kodları ve belirtiler incelenir; sorun net olarak tespit edilir.', href: 'hizmetler/sanziman-ariza-tespiti/' },
  { no: '02', title: 'Mekatronik tamiri',        text: 'Mekatronik ünite onarımı ve ardından kodlama.',                          href: 'hizmetler/mekatronik-tamiri/' },
  { no: '03', title: 'Debriyaj paketi yenileme', text: 'Aşınan debriyaj paketinin yenilenmesi ve adaptasyonu.',                 href: 'hizmetler/dsg-sanziman-tamiri/' },
  { no: '04', title: 'Tork konvertörü',          text: 'Tork konvertörü kontrolü ve servisi.',                                   href: 'hizmetler/tork-konvertoru-tamiri/' },
  { no: '05', title: 'Yağ değişimi',             text: 'Şanzıman tipine uygun bakım ve yağ değişimi.',                           href: 'hizmetler/sanziman-yagi-degisimi/' },
  { no: '06', title: 'Komple revizyon',          text: 'Komple overhaul; onarım sonrası kodlama ve adaptasyon dahil.',          href: 'hizmetler/sanziman-revizyonu/' }
];

const STEPS = [
  { no: '01', title: 'Ön inceleme', text: 'Aracı ve belirtileri birlikte görürüz.' },
  { no: '02', title: 'Teşhis',      text: 'Arızayı tespit eder, açıkça anlatırız.' },
  { no: '03', title: 'Onay',        text: 'Siz onaylamadan işleme başlamayız.' },
  { no: '04', title: 'Onarım',      text: 'Şanzımanı onarır veya revize ederiz.' },
  { no: '05', title: 'Teslim',      text: 'Kodlama ve adaptasyon sonrası teslim ederiz.' }
];

const GUIDES = [
  { title: 'Şanzıman arıza belirtileri', href: 'blog/otomatik-sanziman-ariza-belirtileri/' },
  { title: 'Mekatronik nedir?',          href: 'hizmetler/mekatronik-tamiri/' },
  { title: 'Şanzıman revizyonu',         href: 'hizmetler/sanziman-revizyonu/' },
  { title: 'Şanzıman yağı değişimi',     href: 'blog/sanziman-yagi-ne-zaman-degismeli/' }
];

// Tasarımdaki dört soru. Görünen SSS ile FAQPage şeması aynı listeden üretilir.
const FAQS = [
  { q: 'Aracı görmeden fiyat veriyor musunuz?', a: 'Hayır. Aracı görmeden rakam vermiyoruz; önce ön inceleme ve teşhis yapılır.' },
  { q: 'Onayım olmadan işleme başlanır mı?',    a: 'Hayır. Yapılacak iş onayınıza sunulmadan işleme başlanmaz.' },
  { q: 'Arıza tespiti ücretli mi?',             a: 'Arıza tespiti ücretsizdir.' },
  { q: 'Hangi şanzımanlara bakıyorsunuz?',      a: 'DSG, S-Tronic, CVT ve PowerShift; BMW, Mercedes, VAG Group, Porsche, Land Rover, Opel ve Ford araçlarında.' }
];

// Marka bandı: dosya, alt metni ve doğal en/boy (yükseklik 56px'e göre).
const BRAND_LOGOS = [
  { src: 'porsche.png',    alt: 'Porsche',    w: 50,  h: 56 },
  { src: 'mercedes.png',   alt: 'Mercedes',   w: 59,  h: 56 },
  { src: 'volkswagen.png', alt: 'Volkswagen', w: 65,  h: 56 },
  { src: 'bmw.png',        alt: 'BMW',        w: 58,  h: 56 },
  { src: 'land-rover.svg', alt: 'Land Rover', w: 99,  h: 56 },
  { src: 'opel.svg',       alt: 'Opel',       w: 72,  h: 56 },
  { src: 'ford.svg',       alt: 'Ford',       w: 149, h: 56 }
];

const WA = `https://wa.me/${SITE.phone.replace('+', '')}`;

/* ---------- Bölümler ---------- */

const heroHtml = () => `
  <section class="hero" id="top">
    <div class="hero-inner">
      <div class="hero-copy">
        <div class="hero-kicker up d1">DCT · CVT · S-Tronic · DSG</div>
        <h1 class="up d2">Bursa'da <span class="text-sky">otomatik şanzıman</span> tamiri</h1>
        <p class="hero-lead up d3">Nilüfer Üçevler'deki atölyemizde yalnızca otomatik şanzıman onarıyoruz: DSG, DCT, CVT, S-Tronic, Ford PowerShift, mekatronik ve tork konvertörü. Arıza tespiti ücretsiz; yapılacak işi onayınıza sunmadan işleme başlamıyoruz.</p>
        <div class="hero-cta up d4">
          <a class="btn btn-primary btn-pulse" href="tel:${SITE.phone}">${SITE.phoneDisplay}</a>
          <a class="btn btn-ghost on-night" href="#randevu">Online Randevu Al</a>
        </div>
        <dl class="hero-facts up d4">
          <div><dt>Konum</dt><dd>${esc(SITE.locationShort)}</dd></div>
          <div><dt>Çalışma</dt><dd>Pzt–Cmt ${SITE.hours.open}–${SITE.hours.close}</dd></div>
          <div><dt>Arıza tespiti</dt><dd>Ücretsiz</dd></div>
        </dl>
      </div>
      <div class="hero-art">
        <div class="hero-logo float">
          ${ICON.ring}
          <img src="assets/logo.jpg" width="440" height="440" alt="${esc(SITE.name)} logosu" fetchpriority="high">
        </div>
      </div>
    </div>
  </section>`;

const marqueeHtml = () => {
  const set = (hidden) => BRAND_LOGOS.map(b =>
    `<img src="assets/brands/${b.src}" width="${b.w}" height="${b.h}" alt="${hidden ? '' : b.alt}" loading="lazy">`).join('');
  return `
  <div class="marquee" role="img" aria-label="Çalıştığımız markalar: ${BRAND_LOGOS.map(b => b.alt).join(', ')}">
    <div class="mq" aria-hidden="true">${set(false)}${set(true)}</div>
  </div>`;
};

const symptomsHtml = () => `
  <section class="section sec-symptoms">
    <div class="container">
      <span class="eyebrow">Aracınızda ne var?</span>
      <h2 class="sec-title">Belirtiyi seçin, ne olduğunu anlatalım</h2>
      <div class="sym-list">
        ${SYMPTOMS.map(s => `<a class="sym-row" href="${s.href}">
          <span><b>${s.title}</b><small>${s.text}</small></span>
          <span class="go" aria-hidden="true">İncele →</span>
        </a>`).join('\n        ')}
      </div>
    </div>
  </section>`;

const familiesHtml = () => `
  <section class="section sec-families">
    <div class="container">
      <span class="eyebrow">Uzmanlık</span>
      <h2 class="sec-title">Dört şanzıman ailesi, yedi marka grubu</h2>
      <div class="cards">
        ${FAMILIES.map(f => `<a class="card" href="${f.href}">
          <div class="fam-name">${f.name}</div>
          <div class="fam-models mono">${f.models}</div>
          <span class="more">İncele →</span>
        </a>`).join('\n        ')}
      </div>
      <a class="sec-more" href="markalar/">Markaya göre servis →</a>
    </div>
  </section>`;

const servicesHtml = () => `
  <section class="section on-night" id="hizmetler">
    <div class="container">
      <span class="eyebrow">Hizmetler</span>
      <h2 class="sec-title">Teşhisten revizyona</h2>
      <div class="cards wide">
        ${HOME_SERVICES.map(v => `<a class="dcard" href="${v.href}">
          <div class="no">${v.no}</div>
          <h3>${v.title}</h3>
          <p>${v.text}</p>
        </a>`).join('\n        ')}
      </div>
      <a class="sec-more" href="hizmetler/">Tüm hizmetler →</a>
    </div>
  </section>`;

const processHtml = () => `
  <section class="section">
    <div class="container">
      <span class="eyebrow">Çalışma biçimimiz</span>
      <h2 class="sec-title with-lead">Aracı görmeden rakam vermiyoruz</h2>
      <p class="sec-lead">Önce inceleriz, sonra anlatırız. Sizin onayınız olmadan hiçbir işleme başlanmaz.</p>
      <ol class="process">
        ${STEPS.map(p => `<li>
          <div class="no mono">${p.no}</div>
          <h3>${p.title}</h3>
          <p>${p.text}</p>
        </li>`).join('\n        ')}
      </ol>
    </div>
  </section>`;

const guidesHtml = () => `
  <section class="section tight-top" id="rehberler">
    <div class="container">
      <span class="eyebrow">Teknik rehberler</span>
      <h2 class="sec-title">Bilmeniz gerekenler</h2>
      <div class="cards">
        ${GUIDES.map(g => `<a class="card" href="${g.href}">
          <h3>${g.title}</h3>
          <span class="more mono">Oku →</span>
        </a>`).join('\n        ')}
      </div>
      <a class="sec-more" href="blog/">Tüm rehberler →</a>
    </div>
  </section>`;

const faqHtml = () => `
  <section class="section alt" id="sss">
    <div class="container narrow">
      <span class="eyebrow bare">Sık Sorulan Sorular</span>
      <h2 class="sec-title" style="margin-bottom:24px">Merak edilenler</h2>
      <div class="faq">
        ${FAQS.map(f => `<details>
          <summary>${f.q}</summary>
          <div class="faq-a"><p>${f.a}</p></div>
        </details>`).join('\n        ')}
      </div>
      <a class="sec-more" href="sss/">Tüm soruları görün →</a>
    </div>
  </section>`;

const bookingHtml = () => `
  <section class="booking on-night" id="randevu">
    <div class="booking-inner">
      <div class="booking-copy">
        <h2>Aracınızı getirin, <span class="text-sky">birlikte bakalım</span></h2>
        <p>${SITE.hoursText}</p>
        <div class="booking-cta">
          <a class="btn btn-primary" href="tel:${SITE.phone}">${SITE.phoneDisplay}</a>
          <a class="btn btn-ghost" href="${WA}" target="_blank" rel="noopener">WhatsApp'tan yazın</a>
        </div>
        <dl class="booking-facts">
          <div><dt>Adres</dt><dd>${SITE.street}<br>${SITE.postalCode} ${SITE.district} / ${SITE.city}</dd></div>
          <div><dt>Telefon</dt><dd><a href="tel:${SITE.phone}">${SITE.phoneDisplay}</a> · <a href="tel:${SITE.phone2}">${SITE.phone2Display}</a></dd></div>
          <div><dt>Arıza tespiti</dt><dd>Ücretsiz — onayınız olmadan işlem yapılmaz</dd></div>
        </dl>
      </div>
      <div class="appt-form-card" id="apptCard" aria-live="polite">
        <!-- app.js: giriş kapısı veya randevu formu -->
        <p class="muted">Randevu formu yükleniyor…</p>
      </div>
    </div>
  </section>`;

/* ---------- Uygulama kabuğu: modallar, yönetici paneli, bildirimler ---------- */
const CLOSE_SVG = '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>';
const GOOGLE_SVG = '<svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.5c5.4 0 10.3-2 14-5.3l-6.5-5.5c-2 1.5-4.6 2.3-7.5 2.3-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39 16.2 43.5 24 43.5z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.5 5.5c-.5.4 6.7-4.9 6.7-15 0-1.2-.1-2.3-.9-3.5z"/></svg>';

const appShellHtml = () => `
  <!-- ===================== GİRİŞ / KAYIT ===================== -->
  <div class="modal-overlay" id="authModal">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="authTitle">
      <button class="modal-close" data-close="authModal" aria-label="Kapat">${CLOSE_SVG}</button>
      <div class="modal-head">
        <img src="assets/logo.jpg" class="logo" width="64" height="64" alt="">
        <h3 id="authTitle">Giriş Yap</h3>
        <p id="authSubtitle">Randevu almak için hesabınıza giriş yapın</p>
      </div>
      <button class="btn-google" id="googleBtn">${GOOGLE_SVG} Google ile devam et</button>
      <div class="divider">veya e-posta ile</div>
      <form id="authForm" novalidate>
        <div class="field full" id="nameField" style="display:none; margin-bottom:14px">
          <label for="authName">Ad Soyad <span class="req">*</span></label>
          <input id="authName" type="text" name="name" placeholder="Adınız Soyadınız" autocomplete="name">
          <div class="err">Lütfen adınızı girin.</div>
        </div>
        <div class="field full" style="margin-bottom:14px">
          <label for="authEmail">E-posta <span class="req">*</span></label>
          <input id="authEmail" type="email" name="email" placeholder="ornek@eposta.com" autocomplete="email">
          <div class="err">Geçerli bir e-posta girin.</div>
        </div>
        <div class="field full" id="phoneField" style="display:none; margin-bottom:14px">
          <label for="authPhone">Telefon <span class="req">*</span></label>
          <input id="authPhone" type="tel" name="phone" placeholder="0(5xx) xxx xx xx" inputmode="tel" autocomplete="tel">
          <div class="err">Geçerli bir telefon numarası girin.</div>
        </div>
        <div class="field full" style="margin-bottom:18px">
          <label for="authPass">Şifre <span class="req">*</span></label>
          <input id="authPass" type="password" name="password" placeholder="••••••••" autocomplete="current-password">
          <div class="err">Şifre en az 6 karakter olmalı.</div>
        </div>
        <button type="submit" class="btn btn-primary btn-block" id="authSubmit">Giriş Yap</button>
      </form>
      <div class="auth-switch">
        <span id="authSwitchText">Hesabınız yok mu?</span>
        <button type="button" id="authSwitchBtn">Kayıt Ol</button>
      </div>
      <p class="form-note">Devam ederek <a href="gizlilik-politikasi/">Gizlilik Politikası</a> ve <a href="kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</a>'ni kabul etmiş olursunuz.</p>
    </div>
  </div>

  <!-- ===================== YÖNETİCİ GİRİŞİ ===================== -->
  <div class="modal-overlay" id="adminModal">
    <div class="modal" style="max-width:400px" role="dialog" aria-modal="true" aria-labelledby="adminTitle">
      <button class="modal-close" data-close="adminModal" aria-label="Kapat">${CLOSE_SVG}</button>
      <div class="modal-head">
        <div class="lock-badge"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
        <h3 id="adminTitle">Yönetici Girişi</h3>
        <p>Randevuları yönetmek için giriş yapın</p>
      </div>
      <form id="adminForm" novalidate>
        <div class="field full" style="margin-bottom:14px">
          <label for="adminUser">Kullanıcı Adı</label>
          <input id="adminUser" type="text" name="username" autocomplete="username">
        </div>
        <div class="field full" style="margin-bottom:18px">
          <label for="adminPass">Şifre</label>
          <input id="adminPass" type="password" name="password" placeholder="••••••••" autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-navy btn-block">Panele Giriş</button>
      </form>
    </div>
  </div>

  <!-- ===================== YÖNETİCİ PANELİ ===================== -->
  <div class="admin-panel" id="adminPanel">
    <div class="admin-top">
      <div class="brand">
        <img class="brand-logo" src="assets/logo.jpg" width="40" height="40" alt="" style="width:40px;height:40px">
        <span class="brand-text"><span class="brand-name">HB <small>OTOMATİK</small> ŞANZIMAN</span><span class="brand-sub">Yönetim paneli</span></span>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <button class="btn btn-ghost btn-sm" id="refreshBtn">Yenile</button>
        <button class="btn btn-primary btn-sm" id="adminLogout">Çıkış</button>
      </div>
    </div>
    <div class="admin-body">
      <div class="admin-stats">
        <div class="astat"><div class="num" id="stTotal">0</div><div class="lbl">Toplam randevu</div></div>
        <div class="astat gold"><div class="num" id="stPending">0</div><div class="lbl">Bekleyen</div></div>
        <div class="astat blue"><div class="num" id="stConfirmed">0</div><div class="lbl">Onaylanan</div></div>
        <div class="astat green"><div class="num" id="stDone">0</div><div class="lbl">Tamamlanan</div></div>
      </div>
      <div class="admin-toolbar">
        <input type="search" id="searchInput" placeholder="İsim, telefon, araç veya randevu no ara…" aria-label="Randevu ara">
        <select id="filterStatus" aria-label="Duruma göre filtrele">
          <option value="">Tüm durumlar</option>
          <option value="pending">Bekleyen</option>
          <option value="confirmed">Onaylanan</option>
          <option value="done">Tamamlanan</option>
          <option value="cancelled">İptal edilen</option>
        </select>
        <button class="btn btn-ghost btn-sm" id="exportBtn">CSV indir</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Randevu No</th><th>Müşteri</th><th>Telefon</th><th>Araç</th><th>Hizmet</th><th>Tarih / Saat</th><th>Durum</th><th>İşlem</th></tr>
          </thead>
          <tbody id="apptTableBody"></tbody>
        </table>
      </div>
      <div class="empty-state" id="emptyState" style="display:none">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <p>Henüz randevu bulunmuyor.</p>
      </div>
    </div>
  </div>

  <div class="toast-wrap" id="toastWrap" aria-live="polite"></div>

  <!-- Firebase SDK (compat) + uygulama -->
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
  <script src="assets/firebase-config.js"></script>
  <script src="assets/app.js"></script>`;

/* ---------- Yapısal veri ---------- */
function homeSchemas() {
  const address = {
    '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.district,
    addressRegion: SITE.city, postalCode: SITE.postalCode, addressCountry: SITE.country
  };
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'AutoRepair',
      '@id': SITE.origin + '/#business',
      name: SITE.name,
      description: 'Bursa Nilüfer Üçevler\'de yalnızca otomatik şanzıman tamiri: DSG, S-Tronic, CVT, PowerShift, mekatronik ve tork konvertörü. Arıza tespiti ücretsiz.',
      url: SITE.origin + '/',
      telephone: SITE.phone,
      email: SITE.email,
      image: SITE.origin + SITE.logo,
      logo: SITE.origin + SITE.logo,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY',
      address,
      geo: { '@type': 'GeoCoordinates', latitude: SITE.lat, longitude: SITE.lng },
      areaServed: { '@type': 'City', name: SITE.city },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: SITE.hours.days, opens: SITE.hours.open, closes: SITE.hours.close }],
      contactPoint: [SITE.phone, SITE.phone2].filter(Boolean).map(t => ({
        '@type': 'ContactPoint', telephone: t, contactType: 'customer service', areaServed: 'TR', availableLanguage: ['Turkish']
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Otomatik şanzıman hizmetleri',
        itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.h1, url: `${SITE.origin}/hizmetler/${s.slug}/` } }))
      },
      ...gbpSchemaFields()
    },
    {
      '@context': 'https://schema.org', '@type': 'WebSite',
      '@id': SITE.origin + '/#website', name: SITE.name, url: SITE.origin + '/', inLanguage: 'tr-TR',
      publisher: { '@id': SITE.origin + '/#organization' }
    },
    {
      '@context': 'https://schema.org', '@type': 'Organization',
      '@id': SITE.origin + '/#organization', name: SITE.name, legalName: SITE.legalName,
      url: SITE.origin + '/', logo: SITE.origin + SITE.logo, image: SITE.origin + SITE.ogImage,
      email: SITE.email, address,
      contactPoint: [{ '@type': 'ContactPoint', telephone: SITE.phone, contactType: 'customer service', areaServed: 'TR', availableLanguage: ['Turkish'] }],
      ...gbpSchemaFields()
    },
    faqSchema(FAQS)
  ];
}

function buildHome() {
  return layout({
    url: '/',
    withApp: true,
    preloadLogo: true,
    title: 'Bursa Otomatik Şanzıman Tamiri | HB Otomatik Şanzıman',
    description: 'Nilüfer Üçevler\'de yalnızca otomatik şanzıman: DSG, DCT, CVT, S-Tronic, PowerShift, mekatronik ve tork konvertörü. Arıza tespiti ücretsiz.',
    extraSchema: homeSchemas(),
    body: [heroHtml(), marqueeHtml(), symptomsHtml(), familiesHtml(), servicesHtml(), processHtml(), guidesHtml(), faqHtml(), bookingHtml()].join('\n'),
    afterFooter: appShellHtml()
  });
}

module.exports = { buildHome, HOME_FAQS: FAQS };
