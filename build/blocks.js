/* =========================================================
   HB ŞANZIMAN — Yeniden kullanılabilir içerik blokları
   ========================================================= */
const { SITE } = require('./config');
const { esc } = require('./layout');

/** Sayfa başlığı bloğu */
function hero({ tag, h1, lead, root = '../../' }) {
  return `
    <section class="page-hero">
      <div class="container">
        ${tag ? `<span class="section-tag">${tag}</span>` : ''}
        <h1>${h1}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
        <div class="hero-cta">
          <a href="${root}#randevu" class="btn btn-primary">Ücretsiz Arıza Tespiti İçin Randevu Al</a>
          <a href="tel:${SITE.phone}" class="btn btn-ghost">${SITE.phoneDisplay}</a>
        </div>
      </div>
    </section>`;
}

/** Serbest metin bölümü — paragraf dizisi */
function prose({ h2, paras = [], id = '' }) {
  return `
    <section class="section prose"${id ? ` id="${id}"` : ''}>
      <div class="container narrow">
        ${h2 ? `<h2>${h2}</h2>` : ''}
        ${paras.map(p => `<p>${p}</p>`).join('\n        ')}
      </div>
    </section>`;
}

/** İşaretli liste bölümü (belirtiler, kapsam vb.) */
function bulletSection({ h2, intro, items = [], variant = '', id = '' }) {
  return `
    <section class="section ${variant}"${id ? ` id="${id}"` : ''}>
      <div class="container narrow">
        <h2>${h2}</h2>
        ${intro ? `<p class="section-sub left">${intro}</p>` : ''}
        <ul class="check-list">
          ${items.map(i => `<li>${i}</li>`).join('\n          ')}
        </ul>
      </div>
    </section>`;
}

/** Kart ızgarası (hizmet / marka / bölge listeleri) */
function cardGrid({ h2, sub, cards = [], root = '../' }) {
  return `
    <section class="section">
      <div class="container">
        ${h2 ? `<div class="center"><h2 class="section-title">${h2}</h2>${sub ? `<p class="section-sub">${sub}</p>` : ''}</div>` : ''}
        <div class="grid grid-3">
          ${cards.map(c => `<a class="card link-card" href="${root}${c.href}">
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.text)}</p>
            <span class="card-more">Detaylı bilgi →</span>
          </a>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

/** Adım adım süreç */
function stepsSection({ h2, steps = [] }) {
  return `
    <section class="section" style="background:var(--bg-2)">
      <div class="container narrow">
        <h2>${h2}</h2>
        <ol class="proc-list">
          ${steps.map(s => `<li><strong>${esc(s.t)}</strong><span>${s.d}</span></li>`).join('\n          ')}
        </ol>
      </div>
    </section>`;
}

/** Karşılaştırma / bilgi tablosu */
function tableSection({ h2, intro, head = [], rows = [] }) {
  return `
    <section class="section">
      <div class="container narrow">
        <h2>${h2}</h2>
        ${intro ? `<p class="section-sub left">${intro}</p>` : ''}
        <div class="table-wrap">
          <table class="info-table">
            <thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
            <tbody>
              ${rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`).join('')}</tr>`).join('\n              ')}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;
}

/** SSS — görünür akordeon (schema layout tarafında üretilir) */
function faqSection({ h2 = 'Sıkça Sorulan Sorular', faqs = [] }) {
  return `
    <section class="section" style="background:var(--bg-2)" id="sss">
      <div class="container narrow">
        <h2>${h2}</h2>
        <div class="faq">
          ${faqs.map(f => `<details>
            <summary>${esc(f.q)}</summary>
            <div class="faq-a"><p>${f.a}</p></div>
          </details>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

/** İlgili sayfalara iç bağlantı bloğu (konu otoritesi için kritik) */
function relatedSection({ h2 = 'İlgili sayfalar', links = [], root = '../../' }) {
  if (!links.length) return '';
  return `
    <section class="section related">
      <div class="container narrow">
        <h2>${h2}</h2>
        <ul class="rel-links">
          ${links.map(l => `<li><a href="${root}${l.href}">${esc(l.label)}</a></li>`).join('\n          ')}
        </ul>
      </div>
    </section>`;
}

/** Kapanış çağrısı */
function ctaSection({ title, text, root = '../../' }) {
  return `
    <section class="cta-band">
      <div class="container">
        <div class="cta-inner">
          <div>
            <h2>${title}</h2>
            <p>${text}</p>
          </div>
          <div class="cta-actions">
            <a href="${root}#randevu" class="btn btn-primary">Online Randevu Al</a>
            <a href="tel:${SITE.phone}" class="btn btn-ghost">${SITE.phoneDisplay}</a>
          </div>
        </div>
        <p class="cta-note">${SITE.addressText} · ${SITE.hoursText}</p>
      </div>
    </section>`;
}

module.exports = { hero, prose, bulletSection, cardGrid, stepsSection, tableSection, faqSection, relatedSection, ctaSection };
