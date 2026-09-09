#!/usr/bin/env node
/* =========================================================
   Site denetimi: kırık iç bağlantı, JSON-LD geçerliliği,
   başlık/açıklama uzunlukları, benzersizlik.
   Çalıştırma: npm run verify
   ========================================================= */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'build', 'assets'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(ROOT);

let errors = 0, warns = 0;
const err = m => { console.log('  ✗ ' + m); errors++; };
const warn = m => { console.log('  ! ' + m); warns++; };

const titles = new Map(), descs = new Map();

for (const p of pages) {
  const rel = '/' + path.relative(ROOT, p).replace(/\\/g, '/');
  const html = fs.readFileSync(p, 'utf8');
  const issues = [];
  const push = (fn, m) => issues.push([fn, m]);

  /* --- Başlık --- */
  const t = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  if (!t) push(err, 'title yok');
  else {
    if (t.length > 62) push(warn, `title ${t.length} karakter (>62, SERP'te kısalabilir)`);
    if (t.length < 20) push(warn, `title çok kısa (${t.length})`);
    if (titles.has(t)) push(err, `title tekrarlı: ${titles.get(t)} ile aynı`);
    titles.set(t, rel);
  }

  /* --- Açıklama --- */
  const d = (html.match(/<meta name="description" content="([\s\S]*?)">/) || [])[1];
  if (!d) push(err, 'meta description yok');
  else {
    if (d.length > 165) push(warn, `description ${d.length} karakter (>165)`);
    if (d.length < 70) push(warn, `description çok kısa (${d.length})`);
    if (descs.has(d)) push(err, `description tekrarlı: ${descs.get(d)} ile aynı`);
    descs.set(d, rel);
  }

  /* --- Canonical --- */
  if (!/rel="canonical"/.test(html) && !/404/.test(rel)) push(err, 'canonical yok');

  /* --- H1 --- */
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) push(err, 'h1 yok');
  if (h1s.length > 1) push(err, `${h1s.length} adet h1 (tek olmalı)`);

  /* --- JSON-LD --- */
  const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  blocks.forEach((b, i) => {
    const raw = b.replace(/<\/?script[^>]*>/g, '');
    try { JSON.parse(raw); } catch (e) { push(err, `JSON-LD #${i + 1} geçersiz: ${e.message}`); }
  });
  if (blocks.length === 0) push(warn, 'yapısal veri (JSON-LD) yok');

  /* --- Görsel alt metni --- */
  const imgs = html.match(/<img [^>]*>/g) || [];
  imgs.filter(i => !/alt=/.test(i)).forEach(() => push(err, 'alt metni olmayan <img>'));

  /* --- OG --- */
  if (!/property="og:image"/.test(html)) push(warn, 'og:image yok');

  if (issues.length) {
    console.log(`\n${rel}`);
    issues.forEach(([fn, m]) => fn(m));
  }
}

/* ---------- İç bağlantı kontrolü ---------- */
console.log('\n── İç bağlantılar ──');
const exists = u => {
  const clean = u.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return fs.existsSync(path.join(ROOT, 'index.html'));
  const abs = path.join(ROOT, clean);
  return fs.existsSync(abs) || fs.existsSync(path.join(abs, 'index.html'));
};

let broken = 0, checked = 0;
for (const p of pages) {
  const rel = '/' + path.relative(ROOT, p).replace(/\\/g, '/');
  const dir = path.dirname(p);
  const html = fs.readFileSync(p, 'utf8');
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    checked++;
    const target = href.startsWith('/')
      ? path.join(ROOT, href.split('#')[0])
      : path.resolve(dir, href.split('#')[0]);
    const ok = fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html'));
    if (!ok) { console.log(`  ✗ ${rel} → ${href}`); broken++; errors++; }
  }
}
console.log(`  ${checked} iç bağlantı denetlendi, ${broken} kırık.`);

/* ---------- Sitemap tutarlılığı ---------- */
console.log('\n── Sitemap ──');
const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(/^https?:\/\/[^/]+/, ''));
locs.forEach(l => { if (!exists(l)) { console.log(`  ✗ sitemap URL dosyaya karşılık gelmiyor: ${l}`); errors++; } });
const pageUrls = pages
  .map(p => '/' + path.relative(ROOT, p).replace(/\\/g, '/').replace(/index\.html$/, ''))
  .filter(u => !u.includes('404'));
pageUrls.forEach(u => { if (!locs.includes(u)) { console.log(`  ! sitemap'te olmayan sayfa: ${u}`); warns++; } });
console.log(`  ${locs.length} sitemap URL'si, ${pageUrls.length} HTML sayfası.`);

console.log(`\n${'═'.repeat(46)}`);
console.log(`Sayfa: ${pages.length}  ·  Hata: ${errors}  ·  Uyarı: ${warns}`);
process.exit(errors ? 1 : 0);
