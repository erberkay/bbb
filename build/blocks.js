/* =========================================================
   HB OTOMATİK ŞANZIMAN — Yeniden kullanılabilir içerik blokları
   Görsel dil: mono etiket (üst çizgili) + Archivo başlık,
   satır listeleri, mavi üst çizgili kartlar, koyu kapanış bandı.
   ========================================================= */
const { SITE } = require('./config');
const { esc } = require('./layout');

const eyebrow = label => label ? `<span class="eyebrow">${esc(label)}</span>` : '';

/** Sayfa başlığı (koyu) */
function hero({ tag, h1, lead, root = '../../', meta = '' }) {
  return `
    <section class="page-hero">
      <div class="container">
        ${tag ? `<div class="hero-kicker up d1">${tag}</div>` : ''}
        <h1 class="up d2">${h1}</h1>
        ${meta}
        ${lead ? `<p class="lead up d3">${lead}</p>` : ''}
        <div class="hero-cta up d4">
          <a href="tel:${SITE.phone}" class="btn btn-primary">${SITE.phoneDisplay}</a>
          <a href="${root}#randevu" class="btn btn-ghost on-night">Online Randevu Al</a>
        </div>
      </div>
    </section>`;
}

/** Serbest metin */
function prose({ label, h2, paras = [], id = '' }) {
  return `
    <section class="section prose"${id ? ` id="${id}"` : ''}>
      <div class="container narrow">
        ${eyebrow(label)}
        ${h2 ? `<h2 class="section-h">${h2}</h2>` : ''}
        ${paras.map(p => `<p>${p}</p>`).join('\n        ')}
      </div>
    </section>`;
}

/** Satır biçiminde işaretli liste (belirtiler, kapsam…) */
function bulletSection({ label, h2, intro, items = [], variant = '', id = '' }) {
  return `
    <section class="section ${variant}"${id ? ` id="${id}"` : ''}>
      <div class="container narrow">
        ${eyebrow(label)}
        <h2 class="section-h">${h2}</h2>
        ${intro ? `<p class="section-sub">${intro}</p>` : ''}
        <ul class="check-list">
          ${items.map(i => `<li>${i}</li>`).join('\n          ')}
        </ul>
      </div>
    </section>`;
}

/** Kart ızgarası (hizmet / marka / bölge listeleri) */
function cardGrid({ label, h2, sub, cards = [], root = '../' }) {
  return `
    <section class="section">
      <div class="container">
        ${eyebrow(label)}
        ${h2 ? `<h2 class="sec-title${sub ? ' with-lead' : ''}">${h2}</h2>` : ''}
        ${sub ? `<p class="sec-lead">${sub}</p>` : ''}
        <div class="cards">
          ${cards.map(c => `<a class="card" href="${root}${c.href}">
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.text)}</p>
            <span class="more mono">İncele →</span>
          </a>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

/** Süreç (dikey zaman çizelgesi) */
function stepsSection({ label = 'Çalışma biçimimiz', h2, steps = [] }) {
  return `
    <section class="section alt">
      <div class="container narrow">
        ${eyebrow(label)}
        <h2 class="section-h">${h2}</h2>
        <ol class="proc-list">
          ${steps.map(s => `<li><strong>${esc(s.t.replace(/^\d+\.\s*/, ''))}</strong><span>${s.d}</span></li>`).join('\n          ')}
        </ol>
      </div>
    </section>`;
}

/** Karşılaştırma / bilgi tablosu */
function tableSection({ label = 'Karşılaştırma', h2, intro, head = [], rows = [] }) {
  return `
    <section class="section">
      <div class="container narrow">
        ${eyebrow(label)}
        <h2 class="section-h">${h2}</h2>
        ${intro ? `<p class="section-sub">${intro}</p>` : ''}
        <div class="table-wrap">
          <table class="info-table">
            <thead><tr>${head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
            <tbody>
              ${rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`).join('')}</tr>`).join('\n              ')}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;
}

/** SSS — görünür akordeon (FAQPage şeması layout'ta aynı listeden üretilir) */
function faqSection({ label = 'Sık sorulan sorular', h2 = 'Merak edilenler', faqs = [] }) {
  return `
    <section class="section alt" id="sss">
      <div class="container narrow">
        ${eyebrow(label)}
        <h2 class="section-h">${h2}</h2>
        <div class="faq">
          ${faqs.map(f => `<details>
            <summary>${esc(f.q)}</summary>
            <div class="faq-a"><p>${f.a}</p></div>
          </details>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

/** İlgili sayfalar — iç bağlantı (konu otoritesi için) */
function relatedSection({ label = 'İlgili sayfalar', h2 = 'Devamını okuyun', links = [], root = '../../' }) {
  if (!links.length) return '';
  return `
    <section class="section">
      <div class="container narrow">
        ${eyebrow(label)}
        <h2 class="section-h">${h2}</h2>
        <div class="rel-links">
          ${links.map(l => `<a href="${root}${l.href}">${esc(l.label)}</a>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

/** Koyu kapanış bandı */
function ctaSection({ title, text, root = '../../' }) {
  return `
    <section class="cta-band">
      <div class="cta-inner">
        <div>
          <h2>${title}</h2>
          <p>${text}</p>
        </div>
        <div class="cta-actions">
          <a href="${root}#randevu" class="btn btn-primary">Online Randevu Al</a>
          <a href="tel:${SITE.phone}" class="btn btn-ghost on-night">${SITE.phoneDisplay}</a>
        </div>
      </div>
    </section>`;
}

module.exports = { hero, prose, bulletSection, cardGrid, stepsSection, tableSection, faqSection, relatedSection, ctaSection, eyebrow };
