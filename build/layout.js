/* =========================================================
   HB ŞANZIMAN — Sayfa şablonu (layout)
   Tüm alt sayfalar bu şablondan üretilir → tutarlı head, nav, footer.
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

const NAV = [
  { label: 'Anasayfa',  href: '' },
  { label: 'Hizmetler', href: 'hizmetler/' },
  { label: 'Markalar',  href: 'markalar/' },
  { label: 'Bölgeler',  href: 'bolgeler/' },
  { label: 'Blog',      href: 'blog/' },
  { label: 'S.S.S.',    href: 'sss/' },
  { label: 'İletişim',  href: 'iletisim/' }
];

function navHtml(root) {
  return NAV.map(i => `<li><a href="${root}${i.href}">${i.label}</a></li>`).join('\n          ');
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
  return `<nav class="crumbs" aria-label="Site haritası yolu"><div class="container"><ol>${items}</ol></div></nav>`;
}

/* ---------- Ana şablon ---------- */
function layout(page) {
  const root = page.root || rootOf(page.url);
  const canonical = SITE.origin + page.url;
  const schemas = [];

  if (page.breadcrumb) schemas.push(breadcrumbSchema(page.breadcrumb));
  if (page.type === 'service') schemas.push(serviceSchema(page));
  if (page.type === 'article') schemas.push(articleSchema(page));
  if (page.faqs && page.faqs.length) schemas.push(faqSchema(page.faqs));
  if (page.extraSchema) schemas.push(...[].concat(page.extraSchema));

  const schemaTags = schemas
    .map(s => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`)
    .join('\n');

  const verify = SITE.googleSiteVerification
    ? `  <meta name="google-site-verification" content="${SITE.googleSiteVerification}">\n` : '';

  const analytics = SITE.gaMeasurementId ? `
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.gaMeasurementId}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.gaMeasurementId}');</script>` : '';

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
  <meta name="theme-color" content="#0a0e17">
  <meta name="author" content="${SITE.name}">
${verify}
  <!-- Yerel SEO -->
  <meta name="geo.region" content="TR-16">
  <meta name="geo.placename" content="${SITE.district}, ${SITE.city}">
  <meta name="geo.position" content="${SITE.lat};${SITE.lng}">
  <meta name="ICBM" content="${SITE.lat}, ${SITE.lng}">

  <!-- Open Graph -->
  <meta property="og:type" content="${page.type === 'article' ? 'article' : 'website'}">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:locale" content="${SITE.locale}">
  <meta property="og:image" content="${SITE.origin}${SITE.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(SITE.name)} — ${esc(SITE.slogan)}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${SITE.origin}${SITE.ogImage}">

  <link rel="icon" type="image/svg+xml" href="${root}assets/logo.svg">
  <link rel="apple-touch-icon" href="${root}assets/apple-touch-icon.png">
  <link rel="manifest" href="${root}site.webmanifest">

  <!-- Yazı tipleri: render engellemeyen yükleme -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap"></noscript>

  <link rel="stylesheet" href="${root}assets/styles.css">
  <link rel="stylesheet" href="${root}assets/pages.css">
${schemaTags}${analytics}
</head>
<body>
  <a class="skip-link" href="#icerik">İçeriğe geç</a>

  <!-- ===================== NAVBAR ===================== -->
  <nav class="nav" id="nav">
    <div class="container">
      <a href="${root}" class="brand" aria-label="${esc(SITE.name)} anasayfa">
        <img src="${root}assets/logo.svg" class="logo" width="40" height="40" alt="${esc(SITE.name)} logosu">
        <span class="brand-text"><b>HB ŞANZIMAN</b><span>${SITE.city} · ${SITE.district}</span></span>
      </a>

      <ul class="nav-links" id="navLinks">
          ${navHtml(root)}
        <li class="nav-only-desktop"><a href="${root}#randevu" class="btn btn-primary btn-sm">Randevu Al</a></li>
      </ul>

      <div class="nav-actions">
        <a class="btn btn-ghost btn-sm nav-call" href="tel:${SITE.phone}" aria-label="Telefonla ara">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>
          <span>${SITE.phoneDisplay}</span>
        </a>
        <button class="hamburger" id="hamburger" aria-label="Menüyü aç/kapat" aria-expanded="false" aria-controls="navLinks">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

${page.breadcrumb ? breadcrumbHtml(page.breadcrumb, root) : ''}

  <main id="icerik">
${page.body}
  </main>

  <!-- ===================== FOOTER ===================== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="${root}" class="brand">
            <img src="${root}assets/logo.svg" class="logo" width="40" height="40" alt="${esc(SITE.name)}">
            <span class="brand-text"><b>HB ŞANZIMAN</b><span>${SITE.city} · ${SITE.district}</span></span>
          </a>
          <p>${SITE.city} ${SITE.district}'de otomatik, DSG ve CVT şanzıman tamiri, revizyonu ve bakımında uzman servisiniz. Garantili işçilik, güvenilir hizmet.</p>
          <p class="foot-hours"><strong>Çalışma saatleri:</strong><br>${SITE.hoursText}<br>Pazar: Kapalı</p>
        </div>
        <div>
          <h5>Hizmetler</h5>
          <ul>
            <li><a href="${root}hizmetler/otomatik-sanziman-tamiri/">Otomatik Şanzıman Tamiri</a></li>
            <li><a href="${root}hizmetler/dsg-sanziman-tamiri/">DSG Şanzıman Tamiri</a></li>
            <li><a href="${root}hizmetler/cvt-sanziman-tamiri/">CVT Şanzıman Tamiri</a></li>
            <li><a href="${root}hizmetler/tork-konvertoru-tamiri/">Tork Konvertörü Tamiri</a></li>
            <li><a href="${root}hizmetler/mekatronik-tamiri/">Mekatronik Tamiri</a></li>
            <li><a href="${root}hizmetler/">Tüm hizmetler →</a></li>
          </ul>
        </div>
        <div>
          <h5>Keşfet</h5>
          <ul>
            <li><a href="${root}markalar/">Markaya Göre Servis</a></li>
            <li><a href="${root}bolgeler/">Hizmet Bölgeleri</a></li>
            <li><a href="${root}blog/">Blog & Rehberler</a></li>
            <li><a href="${root}sss/">Sıkça Sorulan Sorular</a></li>
            <li><a href="${root}hakkimizda/">Hakkımızda</a></li>
          </ul>
        </div>
        <div>
          <h5>İletişim</h5>
          <ul>
            <li><a href="${root}iletisim/">${SITE.street}<br>${SITE.postalCode} ${SITE.district} / ${SITE.city}</a></li>
            <li><a href="tel:${SITE.phone}">${SITE.phoneDisplay}</a></li>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          </ul>
          <h5 style="margin-top:18px">Yasal</h5>
          <ul>
            <li><a href="${root}gizlilik-politikasi/">Gizlilik Politikası</a></li>
            <li><a href="${root}kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</a></li>
            <li><a href="${root}cerez-politikasi/">Çerez Politikası</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year">2026</span> ${SITE.name}. Tüm hakları saklıdır.</span>
        <span><a href="${root}#randevu">Randevu Al</a></span>
      </div>
    </div>
  </footer>

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
    <a href="${root}#randevu" class="mb-item primary">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
      <span>Randevu</span>
    </a>
  </div>

  <script src="${root}assets/pages.js" defer></script>
</body>
</html>
`;
}

module.exports = { layout, esc, rootOf, breadcrumbSchema, faqSchema, SITE };
