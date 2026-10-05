/* =========================================================
   HB OTOMATİK ŞANZIMAN — Sayfa şablonu
   Ana sayfa dahil TÜM sayfalar bu şablondan üretilir:
   ortak <head>, üst bilgi, alt bilgi ve yapısal veri.
   ========================================================= */
const { SITE } = require('./config');

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/** '/hizmetler/dsg-sanziman-tamiri/' → derinliğe göre kök yolu ('../../') */
function rootOf(url) {
  const depth = url.replace(/^\/|\/$/g, '').split('/').filter(Boolean).length;
  return depth === 0 ? './' : '../'.repeat(depth);
}

/* Tasarımdaki gezinme: Anasayfa · Hizmetler · Rehber · S.S.S. · İletişim
   (Markalar ve Bölgeler alt bilgiden ve hizmet sayfalarından bağlanır.) */
const NAV = [
  { label: 'Anasayfa',  href: '',          match: /^\/$/ },
  { label: 'Hizmetler', href: 'hizmetler/', match: /^\/(hizmetler|markalar|bolgeler)\// },
  { label: 'Rehber',    href: 'blog/',      match: /^\/blog\// },
  { label: 'S.S.S.',    href: 'sss/',       match: /^\/sss\// },
  { label: 'İletişim',  href: 'iletisim/',  match: /^\/iletisim\// }
];

const FONTS = 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap';

const ICON = {
  phone: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>',
  ring:  '<svg class="ring spin" viewBox="0 0 400 400" aria-hidden="true"><circle cx="200" cy="200" r="196" fill="none" stroke="#16509b" stroke-width="2" stroke-dasharray="3 9"/></svg>'
};

const mapsUrl = () => SITE.googleBusinessUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.name}, ${SITE.street}, ${SITE.district} ${SITE.city}`)}`;

/* ---------- Google İşletme Profili yardımcıları ---------- */

/** Yapısal veride `sameAs` için: İşletme Profili + sosyal hesaplar. */
function sameAsList() {
  return [SITE.googleBusinessUrl, ...SITE.socials].filter(Boolean);
}

/** İşletme Profili doldurulmuşsa yerel işletme şemasına eklenecek alanlar. */
function gbpSchemaFields() {
  const out = {};
  const same = sameAsList();
  if (same.length) out.sameAs = same;
  if (SITE.googleBusinessUrl) out.hasMap = SITE.googleBusinessUrl;
  return out;
}

/* ---------- Yapısal veri parçaları ---------- */

function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: SITE.origin + t.url
    }))
  };
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') }
    }))
  };
}

function serviceSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: page.serviceType || page.h1,
    name: page.h1,
    description: page.description,
    url: SITE.origin + page.url,
    provider: {
      '@type': 'AutoRepair',
      name: SITE.name,
      telephone: SITE.phone,
      url: SITE.origin + '/',
      ...gbpSchemaFields(),
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.street,
        addressLocality: SITE.district,
        addressRegion: SITE.city,
        postalCode: SITE.postalCode,
        addressCountry: SITE.country
      }
    },
    areaServed: (page.areaServed || ['Bursa']).map(n => ({ '@type': 'City', name: n })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: SITE.origin + '/#randevu',
      servicePhone: SITE.phone
    }
  };
}

function articleSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.description,
    url: SITE.origin + page.url,
    datePublished: page.published,
    dateModified: page.modified || page.published,
    inLanguage: 'tr-TR',
    author: { '@type': 'Organization', name: SITE.name, url: SITE.origin + '/' },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: SITE.origin + SITE.logo }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE.origin + page.url }
  };
}

/* ---------- Görünür ekmek kırıntısı ---------- */
function breadcrumbHtml(trail, root) {
  const items = trail.map((t, i) => {
    const last = i === trail.length - 1;
    const href = t.url === '/' ? root : root + t.url.replace(/^\//, '');
    return last
      ? `<li aria-current="page">${esc(t.name)}</li>`
      : `<li><a href="${href}">${esc(t.name)}</a></li>`;
  }).join('<li class="sep" aria-hidden="true">/</li>');
  return `<nav class="crumbs" aria-label="Sayfa yolu"><div class="container"><ol>${items}</ol></div></nav>`;
}

/* ---------- <head> ---------- */
function headHtml(page, root) {
  const canonical = SITE.origin + page.url;
  const verify = SITE.googleSiteVerification
    ? `\n  <meta name="google-site-verification" content="${SITE.googleSiteVerification}">` : '';
  const analytics = SITE.gaMeasurementId ? `
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.gaMeasurementId}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.gaMeasurementId}');</script>` : '';
  const schemaTags = (page.schemas || [])
    .map(s => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
  <meta name="theme-color" content="#14181d">
  <meta name="author" content="${esc(SITE.name)}">${verify}

  <!-- Yerel SEO -->
  <meta name="geo.region" content="TR-16">
  <meta name="geo.placename" content="${SITE.district}, ${SITE.city}">
  <meta name="geo.position" content="${SITE.lat};${SITE.lng}">
  <meta name="ICBM" content="${SITE.lat}, ${SITE.lng}">

  <!-- Open Graph / Twitter -->
  <meta property="og:type" content="${page.type === 'article' ? 'article' : 'website'}">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:locale" content="${SITE.locale}">
  <meta property="og:image" content="${SITE.origin}${SITE.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(SITE.name)} — ${esc(SITE.slogan)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${SITE.origin}${SITE.ogImage}">

  <link rel="icon" type="image/png" sizes="48x48" href="${root}assets/favicon-48.png">
  <link rel="apple-touch-icon" href="${root}assets/apple-touch-icon.png">
  <link rel="manifest" href="${root}site.webmanifest">

  <!-- Yazı tipleri: render engellemeyen yükleme -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="${FONTS}">
  <link rel="stylesheet" href="${FONTS}" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="${FONTS}"></noscript>
  <link rel="stylesheet" href="${root}assets/styles.css">
${page.preloadLogo ? `  <link rel="preload" as="image" href="${root}assets/logo.jpg">\n` : ''}${schemaTags}${analytics}
</head>`;
}

/* ---------- Üst bilgi ---------- */
function headerHtml(page, root) {
  const links = NAV.map(i => {
    const cur = i.match.test(page.url) ? ' aria-current="page"' : '';
    return `<li><a href="${root}${i.href}"${cur}>${i.label}</a></li>`;
  }).join('');
  const book = page.url === '/' ? '#randevu' : `${root}#randevu`;
  // Ana sayfada app.js giriş düğmesini #navAuthArea içine çizer.
  const auth = page.withApp
    ? `<div id="navAuthArea"><button class="btn btn-ghost btn-sm" id="navLoginBtn">Giriş Yap</button></div>`
    : `<a class="btn btn-ghost btn-sm" href="tel:${SITE.phone}">${ICON.phone}${SITE.phoneDisplay}</a>`;

  return `
  <a class="skip-link" href="#icerik">İçeriğe geç</a>

  <header class="nav${page.withApp ? '' : ' nav-sub'}" id="nav">
    <div class="nav-inner">
      <a href="${root}" class="brand" aria-label="${esc(SITE.name)} — anasayfa">
        <img class="brand-logo" src="${root}assets/logo.jpg" width="54" height="54" alt="${esc(SITE.name)} logosu">
        <span class="brand-text">
          <span class="brand-name">HB <small>OTOMATİK</small> ŞANZIMAN</span>
          <span class="brand-sub">${SITE.city} · ${SITE.district}</span>
        </span>
        <span class="brand-tag">Şanzıman uzmanı</span>
      </a>
      <button class="hamburger" id="hamburger" aria-label="Menüyü aç/kapat" aria-expanded="false" aria-controls="navLinks">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav-menu" id="navLinks" aria-label="Ana menü">
        <ul class="nav-links">${links}</ul>
        <div class="nav-actions">
          <a class="btn btn-primary btn-sm" href="${book}">Randevu Al</a>
          ${auth}
        </div>
      </nav>
    </div>
  </header>`;
}

/* ---------- Alt bilgi ---------- */
function footerHtml(page, root) {
  const gbp = [
    SITE.googleBusinessUrl ? `<li><a href="${SITE.googleBusinessUrl}" target="_blank" rel="noopener">Google'da bizi bulun</a></li>` : '',
    SITE.googleReviewUrl ? `<li><a href="${SITE.googleReviewUrl}" target="_blank" rel="noopener">Google'da değerlendirin</a></li>` : ''
  ].join('');
  const admin = page.withApp ? `<a href="#" id="adminEntry">Yönetici girişi</a>` : '';

  return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="foot-brand">
        <img class="foot-logo" src="${root}assets/logo.jpg" width="132" height="132" alt="${esc(SITE.name)}" loading="lazy">
        <p>Bursa'da yalnızca otomatik şanzıman tamiri ve revizyonu.</p>
      </div>
      <div>
        <div class="foot-col">
          <div class="foot-h">İletişim</div>
          <ul>
            <li><a href="tel:${SITE.phone}">${SITE.phoneDisplay}</a></li>
            <li><a href="tel:${SITE.phone2}">${SITE.phone2Display}</a></li>
            <li><a class="email" href="mailto:${SITE.email}">${SITE.email}</a></li>
            ${gbp}
          </ul>
        </div>
        <div class="foot-col">
          <div class="foot-h">Adres</div>
          <p>${SITE.street}<br>${SITE.postalCode} ${SITE.district} / ${SITE.city}</p>
          <p class="foot-hours">${SITE.hoursText}</p>
          <a class="btn btn-ghost btn-sm" href="${mapsUrl()}" target="_blank" rel="noopener">Haritada göster</a>
        </div>
      </div>
      <div>
        <div class="foot-col">
          <div class="foot-h">Hizmetler</div>
          <ul>
            <li><a href="${root}hizmetler/dsg-sanziman-tamiri/">DSG şanzıman tamiri</a></li>
            <li><a href="${root}hizmetler/mekatronik-tamiri/">Mekatronik tamiri</a></li>
            <li><a href="${root}hizmetler/cvt-sanziman-tamiri/">CVT şanzıman tamiri</a></li>
            <li><a href="${root}hizmetler/tork-konvertoru-tamiri/">Tork konvertörü</a></li>
            <li><a href="${root}hizmetler/sanziman-revizyonu/">Komple revizyon</a></li>
            <li><a href="${root}hizmetler/">Tüm hizmetler →</a></li>
          </ul>
        </div>
      </div>
      <div>
        <div class="foot-col">
          <div class="foot-h">Keşfet</div>
          <ul>
            <li><a href="${root}markalar/">Markalar</a></li>
            <li><a href="${root}bolgeler/">Hizmet bölgeleri</a></li>
            <li><a href="${root}blog/">Teknik rehberler</a></li>
            <li><a href="${root}sss/">Sık sorulan sorular</a></li>
            <li><a href="${root}hakkimizda/">Hakkımızda</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <div class="foot-h">Yasal</div>
          <ul>
            <li><a href="${root}gizlilik-politikasi/">Gizlilik politikası</a></li>
            <li><a href="${root}kvkk-aydinlatma-metni/">KVKK aydınlatma metni</a></li>
            <li><a href="${root}cerez-politikasi/">Çerez politikası</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="year">${new Date().getFullYear()}</span> ${esc(SITE.name)}</span>
      ${admin}
    </div>
  </footer>`;
}

/* ---------- Ana şablon ---------- */
function layout(page) {
  const root = page.root || rootOf(page.url);
  const schemas = [];
  if (page.breadcrumb) schemas.push(breadcrumbSchema(page.breadcrumb));
  if (page.type === 'service') schemas.push(serviceSchema(page));
  if (page.type === 'article') schemas.push(articleSchema(page));
  if (page.faqs && page.faqs.length) schemas.push(faqSchema(page.faqs));
  if (page.extraSchema) schemas.push(...[].concat(page.extraSchema));

  return `${headHtml({ ...page, schemas }, root)}
<body>
${headerHtml(page, root)}
${page.breadcrumb ? breadcrumbHtml(page.breadcrumb, root) : ''}

  <main id="icerik">
${page.body}
  </main>
${footerHtml(page, root)}
${page.afterFooter || ''}
${page.withApp ? '' : `  <script src="${root}assets/pages.js" defer></script>`}
</body>
</html>
`;
}

module.exports = { layout, esc, rootOf, mapsUrl, ICON, breadcrumbSchema, faqSchema, gbpSchemaFields, sameAsList, SITE };
