#!/usr/bin/env node
/* =========================================================
   HB OTOMATİK ŞANZIMAN — Statik sayfa üreticisi
   Çalıştırma:  npm run build   (veya: node build/build.js)
   Çıktı:       proje kökünde klasör/index.html yapısı
   ========================================================= */
const fs = require('fs');
const path = require('path');

const { SITE } = require('./config');
const { layout, esc, gbpSchemaFields, mapsUrl } = require('./layout');
const B = require('./blocks');
const { SERVICES } = require('./content/services');
const { BRANDS } = require('./content/brands');
const { REGIONS } = require('./content/regions');
const { POSTS } = require('./content/blog');
const { buildHome } = require('./home');

const ROOT = path.join(__dirname, '..');

/* Üretilen bölümleri her derlemede sıfırdan yaz: içerikten kaldırılan bir
   sayfa (ör. eski bir marka) diskte ve sitede unutulmuş olarak kalmasın. */
const GENERATED_DIRS = ['hizmetler', 'markalar', 'bolgeler', 'blog', 'sss', 'hakkimizda', 'iletisim',
  'gizlilik-politikasi', 'kvkk-aydinlatma-metni', 'cerez-politikasi'];
GENERATED_DIRS.forEach(d => fs.rmSync(path.join(ROOT, d), { recursive: true, force: true }));
const trDate = d => new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const written = [];

function write(url, html) {
  const dir = path.join(ROOT, url.replace(/^\/|\/$/g, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  written.push(url);
}

const HOME = { name: 'Anasayfa', url: '/' };

/* ===================== ANA SAYFA ===================== */
fs.writeFileSync(path.join(ROOT, 'index.html'), buildHome(), 'utf8');
written.push('/');

/* ===================== HİZMETLER ===================== */
const svcHub = { name: 'Hizmetler', url: '/hizmetler/' };

write(svcHub.url, layout({
  url: svcHub.url,
  title: 'Şanzıman Hizmetlerimiz | Otomatik, DSG, CVT | Bursa',
  description: 'Bursa’da otomatik şanzıman tamiri, DSG, CVT, tork konvertörü, mekatronik, revizyon ve yağ değişimi. Tüm şanzıman hizmetlerimiz.',
  breadcrumb: [HOME, svcHub],
  body: B.hero({
    tag: 'Hizmetler · Bursa Nilüfer',
    h1: 'Şanzıman Hizmetlerimiz',
    lead: 'Arıza tespitinden komple revizyona kadar, otomatik ve çift kavramalı şanzımanlarda ihtiyaç duyabileceğiniz tüm hizmetler.',
    root: '../'
  })
  + B.prose({ paras: [
      'Şanzıman arızaları tek bir başlık altında toplanamaz. Bir araçta sorun ömrünü doldurmuş yağdan kaynaklanırken, diğerinde mekatronik ünitesinden, bir başkasında ise tork konvertöründen kaynaklanabilir. Bu nedenle her hizmetimizi ayrı ayrı ve şeffaf şekilde anlatıyoruz.',
      'Hangi hizmete ihtiyacınız olduğundan emin değilseniz doğru başlangıç noktası <strong>ücretsiz arıza tespitidir</strong>. Aracınızı sökmeden önce hata kodlarını okur, yağ analizi ve yol testi yaparız; ancak bundan sonra kapsam ve maliyet konuşuruz.'
    ]})
  + B.cardGrid({
      h2: 'Tüm hizmetler',
      sub: 'Detaylı bilgi için hizmet başlığına tıklayın.',
      root: '../hizmetler/',
      cards: SERVICES.map(s => ({ href: s.slug + '/', title: s.h1, text: s.lead.slice(0, 130) + '…' }))
    })
  + B.ctaSection({ title: 'Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?', text: 'Ücretsiz arıza tespiti ile başlayalım. Bulguları ve seçenekleri maliyetiyle birlikte anlatalım, kararı siz verin.', root: '../' })
}));

SERVICES.forEach(s => {
  const url = `/hizmetler/${s.slug}/`;
  let body = B.hero({ tag: s.kicker || 'Hizmet · Otomatik şanzıman', h1: s.h1, lead: s.lead, root: '../../' });
  body += B.prose({ label: 'Genel bakış', h2: `${s.h1} hakkında`, paras: s.intro });
  if (s.symptoms) body += B.bulletSection({ label: 'Belirtiler', ...s.symptoms, variant: 'alt' });
  if (s.scope) body += B.bulletSection({ label: 'Kapsam', ...s.scope });
  if (s.table) body += B.tableSection(s.table);
  if (s.steps) body += B.stepsSection({ h2: 'Nasıl çalışıyoruz?', steps: s.steps });
  body += B.faqSection({ faqs: s.faqs });
  body += B.relatedSection({ links: s.related, root: '../../' });
  body += B.ctaSection({ title: `${s.h1} için randevu alın`, text: 'Arıza tespiti ücretsizdir ve sizi bağlamaz. Onayınız olmadan hiçbir işleme başlanmaz.', root: '../../' });

  write(url, layout({
    url, type: 'service', title: s.title, description: s.description,
    h1: s.h1, serviceType: s.h1, faqs: s.faqs,
    breadcrumb: [HOME, svcHub, { name: s.nav, url }],
    body
  }));
});

/* ===================== MARKALAR ===================== */
const brandHub = { name: 'Markalar', url: '/markalar/' };

write(brandHub.url, layout({
  url: brandHub.url,
  title: 'Markaya Göre Şanzıman Servisi | Bursa | HB Otomatik Şanzıman',
  description: 'BMW, Mercedes, Volkswagen, Audi, Porsche, Land Rover, Opel ve Ford otomatik şanzıman tamiri. Markaya özel arıza karakteri ve servis yaklaşımı.',
  breadcrumb: [HOME, brandHub],
  body: B.hero({
    tag: 'Markalar · Yedi marka grubu',
    h1: 'Markaya Göre Şanzıman Servisi',
    lead: 'Her markanın şanzıman mimarisi ve tipik arıza karakteri farklıdır. Aracınızın markasına göre bilgi alın.',
    root: '../'
  })
  + B.prose({ paras: [
      'Aynı şikâyet farklı markalarda farklı nedenlerden kaynaklanır. Bir Volkswagen’de kalkış titremesi genellikle DSG debriyajı ve adaptasyonla ilgiliyken, bir Mercedes’te aynı his tork konvertörü kilitleme balatasından kaynaklanabilir.',
      'Bu yüzden marka ve şanzıman tipini araç kabulünde şasi numarasından doğruluyor, o kutuya özel tespit protokolünü uyguluyoruz. Aşağıda servis verdiğimiz markaları ve her birinde sık karşılaştığımız arızaları bulabilirsiniz.'
    ]})
  + B.cardGrid({
      h2: 'Servis verdiğimiz markalar',
      root: '../markalar/',
      cards: BRANDS.map(b => ({ href: b.slug + '/', title: b.h1, text: b.lead.slice(0, 130) + '…' }))
    })
  + B.ctaSection({ title: 'Markanızı listede göremediniz mi?', text: 'Listede olmayan markalar için de arıza tespiti yapıyoruz. Bizi arayın, aracınızın şanzıman tipini birlikte değerlendirelim.', root: '../' })
}));

BRANDS.forEach(b => {
  const url = `/markalar/${b.slug}/`;
  let body = B.hero({ tag: `${b.brand} · Otomatik şanzıman`, h1: b.h1, lead: b.lead, root: '../../' });
  body += B.prose({ label: 'Genel bakış', h2: `${b.brand} şanzımanları hakkında`, paras: b.intro });
  if (b.models) body += B.bulletSection({ label: 'Modeller', ...b.models, variant: 'alt' });
  if (b.issues) body += B.bulletSection({ label: 'Sık şikâyetler', ...b.issues });
  body += B.faqSection({ faqs: b.faqs });
  body += B.relatedSection({ links: b.related, root: '../../' });
  body += B.ctaSection({ title: `${b.brand} aracınız için randevu alın`, text: 'Ücretsiz arıza tespiti ile başlıyoruz. Bulguları ve maliyeti gördükten sonra kararı siz verirsiniz.', root: '../../' });

  write(url, layout({
    url, type: 'service', title: b.title, description: b.description,
    h1: `${b.brand} Şanzıman Tamiri`, serviceType: 'Şanzıman Tamiri', faqs: b.faqs,
    breadcrumb: [HOME, brandHub, { name: b.nav, url }],
    body
  }));
});

/* ===================== BÖLGELER ===================== */
const regHub = { name: 'Bölgeler', url: '/bolgeler/' };

write(regHub.url, layout({
  url: regHub.url,
  title: 'Hizmet Bölgelerimiz | Bursa Şanzıman Servisi',
  description: 'Nilüfer, Osmangazi, Yıldırım, Gemlik, İnegöl ve Mudanya’dan gelen araçlara şanzıman tamiri. Atölyemiz Nilüfer Üçevler’de.',
  breadcrumb: [HOME, regHub],
  body: B.hero({
    tag: 'Hizmet bölgeleri · Bursa',
    h1: 'Hizmet Bölgelerimiz',
    lead: 'Atölyemiz Bursa Nilüfer Üçevler’de. Bursa geneli ve çevre ilçelerden gelen araçlara servis veriyoruz.',
    root: '../'
  })
  + B.prose({ paras: [
      'Bursa’nın farklı bölgelerindeki sürüş koşulları, şanzımanların yıpranma biçimini de değiştirir. Şehir merkezindeki dur-kalk trafiği, Uludağ yönündeki eğimli güzergâhlar, sahil kesimindeki nem ve ticari bölgelerdeki yük altında kullanım — her biri farklı bir yıpranma profili oluşturur.',
      'Aşağıdaki sayfalarda her bölge için ulaşım bilgisi, o bölgeye özgü kullanım koşulları ve önerdiğimiz bakım yaklaşımını bulabilirsiniz.'
    ]})
  + B.cardGrid({
      h2: 'Bölge sayfaları',
      root: '../bolgeler/',
      cards: REGIONS.map(r => ({ href: r.slug + '/', title: r.h1, text: r.lead }))
    })
  + B.ctaSection({ title: 'Bursa’nın her yerinden ulaşabilirsiniz', text: `${SITE.addressText} · ${SITE.hoursText}`, root: '../' })
}));

REGIONS.forEach(r => {
  const url = `/bolgeler/${r.slug}/`;
  let body = B.hero({ tag: `${r.area} · Bursa`, h1: r.h1, lead: r.lead, root: '../../' });
  body += B.prose({ label: 'Bölge', h2: `${r.area}’den gelen araçlarda yaklaşımımız`, paras: r.intro });
  if (r.neighborhoods) body += B.bulletSection({ label: 'Mahalleler', ...r.neighborhoods, variant: 'alt' });
  if (r.access) body += B.bulletSection({ label: 'Ulaşım', ...r.access });
  body += B.faqSection({ faqs: r.faqs });
  body += B.relatedSection({
    h2: 'Sık talep edilen hizmetler',
    root: '../../',
    links: [
      { href: 'hizmetler/otomatik-sanziman-tamiri/', label: 'Otomatik şanzıman tamiri' },
      { href: 'hizmetler/dsg-sanziman-tamiri/', label: 'DSG şanzıman tamiri' },
      { href: 'hizmetler/cvt-sanziman-tamiri/', label: 'CVT şanzıman tamiri' },
      { href: 'hizmetler/sanziman-ariza-tespiti/', label: 'Ücretsiz arıza tespiti' },
      { href: 'bolgeler/', label: 'Tüm hizmet bölgeleri' }
    ]
  });
  body += B.ctaSection({ title: `${r.area}’den randevu alın`, text: 'Online randevu formumuzu doldurabilir veya doğrudan telefonla ulaşabilirsiniz.', root: '../../' });

  write(url, layout({
    url, type: 'service', title: r.title, description: r.description,
    h1: r.h1, serviceType: 'Şanzıman Tamiri', areaServed: [r.area, 'Bursa'], faqs: r.faqs,
    breadcrumb: [HOME, regHub, { name: r.nav, url }],
    body
  }));
});

/* ===================== BLOG ===================== */
const blogHub = { name: 'Blog', url: '/blog/' };

write(blogHub.url, layout({
  url: blogHub.url,
  title: 'Şanzıman Rehberleri ve Blog | HB Otomatik Şanzıman',
  description: 'Şanzıman arıza belirtileri, yağ değişimi, DSG bakımı, CVT ve tork konvertörü hakkında uzman rehberleri.',
  breadcrumb: [HOME, blogHub],
  body: B.hero({
    tag: 'Teknik rehberler',
    h1: 'Şanzıman Rehberleri',
    lead: 'Aracınızın şanzımanını daha iyi anlamanız için hazırladığımız teknik rehberler. Sade dille, satış kaygısı olmadan.',
    root: '../'
  })
  + `
    <section class="section">
      <div class="container">
        <span class="eyebrow">Tüm rehberler</span>
        <h2 class="sec-title">Bilmeniz gerekenler</h2>
        <div class="post-list">
          ${POSTS.map(p => `<a class="card post-card" href="../blog/${p.slug}/">
            <div class="post-date"><time datetime="${p.published}">${trDate(p.published)}</time> · ${p.readingTime} okuma</div>
            <h2>${esc(p.h1)}</h2>
            <p>${esc(p.excerpt)}</p>
            <span class="more mono">Oku →</span>
          </a>`).join('\n          ')}
        </div>
      </div>
    </section>`
  + B.ctaSection({ title: 'Aracınızda bir şikâyet mi var?', text: 'Okumak yerine doğrudan sormak isterseniz, arıza tespiti ücretsizdir.', root: '../' })
}));

POSTS.forEach(p => {
  const url = `/blog/${p.slug}/`;
  let body = `
    <article>
    <section class="page-hero">
      <div class="container">
        <div class="hero-kicker up d1">Teknik rehber</div>
        <h1 class="up d2">${esc(p.h1)}</h1>
        <div class="post-meta up d3">
          <time datetime="${p.published}">${trDate(p.published)}</time>
          · ${p.readingTime} okuma
          · Güncelleme: <time datetime="${p.modified}">${trDate(p.modified)}</time>
        </div>
        <p class="lead up d3">${p.lead}</p>
      </div>
    </section>
    <section class="section prose article-body">
      <div class="container narrow">
        <nav class="toc" aria-label="İçindekiler">
          <div class="mono">İçindekiler</div>
          <ol>${p.sections.map((s, i) => `<li><a href="#b${i + 1}">${esc(s.h2)}</a></li>`).join('')}</ol>
        </nav>
        ${p.sections.map((s, i) => `
        <h2 id="b${i + 1}">${esc(s.h2)}</h2>
        ${(s.paras || []).map(x => `<p>${x}</p>`).join('\n        ')}
        ${s.list ? `<ul class="check-list">${s.list.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
        ${s.table ? `<div class="table-wrap"><table class="info-table"><thead><tr>${s.table.head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map(r => `<tr>${r.map((c, j) => j === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}
        `).join('\n')}
      </div>
    </section>
    </article>`;
  body += B.faqSection({ faqs: p.faqs });
  body += B.relatedSection({ links: p.related, root: '../../' });
  body += B.ctaSection({ title: 'Aracınızı kontrol ettirmek ister misiniz?', text: 'Ücretsiz arıza tespiti için randevu oluşturun. Bulguları ve seçenekleri açıkça anlatalım.', root: '../../' });

  write(url, layout({
    url, type: 'article', title: p.title, description: p.description,
    h1: p.h1, published: p.published, modified: p.modified, faqs: p.faqs,
    breadcrumb: [HOME, blogHub, { name: p.h1.length > 40 ? p.h1.slice(0, 40) + '…' : p.h1, url }],
    body
  }));
});

/* ===================== SSS ===================== */
const GENERAL_FAQS = [
  { q: 'Arıza tespiti ücretli mi?', a: 'Hayır. Hata kodu okuma, yağ kontrolü ve yol testini içeren standart arıza tespitimiz ücretsizdir ve sizi hiçbir şeye bağlamaz. Onarım kararını, bulguları ve maliyeti gördükten sonra siz verirsiniz.' },
  { q: 'Randevu almadan gelebilir miyim?', a: 'Gelebilirsiniz, ancak yoğunluğa bağlı olarak bekleme olabilir. Online randevu formumuzu doldurarak veya telefonla arayarak randevu almanız süreci hızlandırır.' },
  { q: 'Şanzıman tamiri ne kadar sürer?', a: 'Arızanın kapsamına göre değişir. Solenoid veya valf bloğu müdahalesi genellikle 1 iş günü içinde tamamlanır. Komple revizyon, parça teminine bağlı olarak 2–5 iş günü sürebilir. Kesin süre arıza tespiti sonrasında bildirilir.' },
  { q: 'Yaptığınız işe garanti veriyor musunuz?', a: 'Evet. İşçilik ve değişen parçalar için garanti veriyoruz. Garanti kapsamı ve süresi, uygulanan işleme göre teslim sırasında yazılı olarak belirtilir.' },
  { q: 'Aracı görmeden fiyat veriyor musunuz?', a: 'Hayır. Aracı görmeden rakam vermiyoruz. Aynı şikâyetin arkasında maliyeti çok farklı arızalar olabilir; önce ön inceleme ve teşhis yapılır, ardından yapılacak işi ve maliyetini onayınıza sunarız. Arıza tespiti ücretsizdir.' },
  { q: 'Onayım olmadan işlem yapılır mı?', a: 'Hayır. Kapsam ve maliyet netleşip siz onaylamadan hiçbir işleme başlanmaz. Süreçte kapsam değişirse önce size bilgi verir, onayınızı alırız.' },
  { q: 'Aracımı çektirmem gerekir mi?', a: 'Araç vites atmıyor, harekete geçmiyor veya acil moda geçtiyse aracı zorlamadan çekici ile getirmeniz en doğrusudur. Sürüşe devam etmek çoğu zaman hasarı büyütür ve maliyeti artırır.' },
  { q: 'Hangi şanzıman tiplerine servis veriyorsunuz?', a: 'Yalnızca otomatik şanzımanlara bakıyoruz: DSG, S-Tronic, CVT ve PowerShift aileleri ile tork konvertörlü klasik otomatikler. Manuel şanzımana servis vermiyoruz.' },
  { q: 'Hangi markalara bakıyorsunuz?', a: 'BMW, Mercedes, VAG Group (Volkswagen, Audi, Skoda, Seat), Porsche, Land Rover, Opel ve Ford araçlarının otomatik şanzımanlarına servis veriyoruz.' },
  { q: 'Şanzıman yağı ne zaman değişmeli?', a: 'Klasik otomatiklerde genel aralık 60.000–80.000 km, ıslak debriyajlı DSG kutularda ~60.000 km, CVT’de ise 40.000–60.000 km’dir. Şehir içi yoğun kullanım, yük çekimi ve ticari kullanımda bu aralıkların kısaltılmasını öneriyoruz.' },
  { q: 'Şanzımanı sökmeden arızayı bulabilir misiniz?', a: 'Çoğu durumda evet. Hata kodu okuma, canlı veri analizi, yağ analizi, basınç ölçümü ve yol testi ile arızanın elektronik mi, hidrolik mi yoksa mekanik mi olduğunu büyük ölçüde belirleyebiliyoruz. Mekanik iç hasar şüphesinde kesin sonuç için söküm gerekir.' },
  { q: 'Her arızada komple revizyon mu gerekir?', a: 'Hayır. Birçok arıza solenoid değişimi, valf bloğu revizyonu, yağ + filtre bakımı veya adaptasyon ile çözülür. Revizyon yalnızca birden fazla bileşende aşınma olduğunda önerilir. Gereksiz revizyon önermiyoruz.' },
  { q: 'Şanzıman arızasıyla araç kullanmaya devam edebilir miyim?', a: 'Belirtiye bağlıdır. Kayma, uğultu, acil moda geçiş ve vitesin devreye girmemesi gibi durumlarda sürüşe devam etmek hasarı belirgin şekilde büyütür. Hafif sarsıntıda kısa mesafede servise ulaşmak genellikle mümkündür, ancak ertelemek doğru değildir.' },
  { q: 'Kullandığınız parçalar orijinal mi?', a: 'Araca ve arızaya göre orijinal, orijinal muadili veya yenilenmiş parça seçenekleri sunuyoruz. Hangisinin kullanılacağını, maliyet ve garanti farkıyla birlikte önceden bilginize sunar, tercihi sizinle birlikte belirleriz.' },
  { q: 'Adaptasyon ve kodlama yapıyor musunuz?', a: 'Evet. Özellikle DSG, DCT ve mekatronik müdahalelerinde temel ayar, adaptasyon ve gerekli kodlama işlemleri yapılır. Bu adımlar atlanırsa onarım kalıcı olmaz.' },
  { q: 'İkinci görüş alabilir miyim?', a: 'Elbette. Başka bir serviste teşhis konduysa, elinizdeki raporları getirmeniz süreci hızlandırır. Kendi ölçümlerimizi bağımsız olarak yapar, bulgularımızı açıkça paylaşırız.' }
];

const sssUrl = '/sss/';
write(sssUrl, layout({
  url: sssUrl,
  title: 'Sıkça Sorulan Sorular | Bursa Şanzıman Tamiri',
  description: 'Şanzıman tamiri hakkında sık sorulan sorular: süre, fiyat, garanti, arıza tespiti, yağ değişimi ve daha fazlası.',
  breadcrumb: [HOME, { name: 'S.S.S.', url: sssUrl }],
  faqs: GENERAL_FAQS,
  body: B.hero({ tag: 'Sık sorulan sorular', h1: 'Sıkça Sorulan Sorular', lead: 'Müşterilerimizden en çok aldığımız soruları ve dürüst cevaplarını burada topladık.', root: '../' })
    + B.faqSection({ h2: 'Genel sorular', faqs: GENERAL_FAQS })
    + B.relatedSection({
        h2: 'Cevabını bulamadınız mı?',
        root: '../',
        links: [
          { href: 'iletisim/', label: 'İletişim sayfamızdan bize ulaşın' },
          { href: 'hizmetler/', label: 'Hizmetlerimizi inceleyin' },
          { href: 'blog/', label: 'Rehber yazılarımıza göz atın' }
        ]
      })
    + B.ctaSection({ title: 'Sorunuzu doğrudan sormak ister misiniz?', text: 'Telefonla arayın veya online randevu oluşturun; aracınızı birlikte değerlendirelim.', root: '../' })
}));

/* ===================== HAKKIMIZDA ===================== */
const aboutUrl = '/hakkimizda/';
write(aboutUrl, layout({
  url: aboutUrl,
  title: 'Hakkımızda | HB Otomatik Şanzıman',
  description: 'HB Otomatik Şanzıman hakkında: yalnızca otomatik şanzımana odaklanan atölyemiz, çalışma ilkelerimiz ve Bursa Nilüfer Üçevler’deki konumumuz.',
  breadcrumb: [HOME, { name: 'Hakkımızda', url: aboutUrl }],
  body: B.hero({ tag: 'Kurumsal', h1: 'Hakkımızda', lead: 'Bursa Nilüfer Üçevler’de yalnızca otomatik şanzıman onaran bir atölyeyiz.', root: '../' })
    + B.prose({ h2: 'Biz kimiz?', paras: [
        'HB Otomatik Şanzıman, Bursa Nilüfer Üçevler’de faaliyet gösteren ve <strong>yalnızca otomatik şanzıman</strong> onaran bir atölyedir. Genel bir oto tamirhanesi değiliz; işimizin tamamı DSG, S-Tronic, CVT, PowerShift ve tork konvertörlü otomatik şanzımanlar üzerinedir.',
        'Bu uzmanlaşma bir tercihtir. Şanzıman, aracın en karmaşık mekanik grubudur; hidrolik, elektronik ve mekanik disiplinlerin kesiştiği noktadır. Doğru teşhis için hem diagnostik ekipmana hem de yılların getirdiği deneyime aynı anda ihtiyaç vardır.',
        'Servis verdiğimiz yedi marka grubu: BMW, Mercedes, VAG Group, Porsche, Land Rover, Opel ve Ford. Bu dar odak, her kutunun tipik arızasını ve doğru onarım yöntemini derinlemesine bilmemizi sağlıyor.'
      ]})
    + B.bulletSection({
        h2: 'Çalışma ilkelerimiz',
        intro: 'Şanzıman tamiri, müşterinin kontrol etmesi zor bir alandır. Bu yüzden şeffaflığı bir tercih değil, zorunluluk olarak görüyoruz.',
        variant: 'alt',
        items: [
          '<strong>Aracı görmeden rakam vermiyoruz.</strong> Önce inceleriz, sonra anlatırız; arıza tespiti ücretsizdir ve sizi bağlamaz.',
          '<strong>Gereken kadar müdahale.</strong> Her arızada komple revizyon önermiyoruz. Sorun tek bir parçayla çözülüyorsa çözüm odur.',
          '<strong>Onaysız işlem yok.</strong> Kapsam ve maliyet netleşip onay vermeden hiçbir işleme başlanmaz.',
          '<strong>Değişen parçalar gösterilir.</strong> Sökülen ve yenilenen parçaları görmek isterseniz size sunulur.',
          '<strong>Yazılı garanti.</strong> İşçilik ve parça garantisi teslim sırasında yazılı olarak belirtilir.',
          '<strong>Gerçekçi süre bilgisi.</strong> Teslim tarihi baştan bildirilir; değişiklik olursa önceden haber verilir.'
        ]
      })
    + B.bulletSection({
        h2: 'Neden yalnızca otomatik şanzıman?',
        items: [
          '<strong>Doğru teşhis oranı.</strong> Gün boyu aynı sistem üzerinde çalışmak, arıza örüntülerini tanımayı sağlar.',
          '<strong>Doğru ekipman.</strong> Şanzımana özel diagnostik, basınç ölçüm ve söküm ekipmanları.',
          '<strong>Marka bazlı deneyim.</strong> Her kutunun (DQ200, DL501, ZF 8HP, 722.9, 6DCT250…) kendine özgü zayıf noktaları vardır.',
          '<strong>Adaptasyon ve kodlama yetkinliği.</strong> Onarımın kalıcı olması için zorunlu son adım.',
          '<strong>Tork konvertörü revizyon kapasitesi.</strong> Kesme, balata yenileme, balans ve yeniden kaynak işlemleri.',
          '<strong>Gereksiz işlemden kaçınma.</strong> Uzmanlık, ne yapılmayacağını bilmektir.'
        ],
        variant: 'alt'
      })
    + B.relatedSection({ h2: 'Devamı', root: '../', links: [
        { href: 'hizmetler/', label: 'Hizmetlerimiz' },
        { href: 'iletisim/', label: 'İletişim ve konum' },
        { href: 'sss/', label: 'Sıkça sorulan sorular' }
      ]})
    + B.ctaSection({ title: 'Atölyemize bekleriz', text: `${SITE.addressText} · ${SITE.hoursText}`, root: '../' })
}));

/* ===================== İLETİŞİM ===================== */
const contactUrl = '/iletisim/';
write(contactUrl, layout({
  url: contactUrl,
  title: 'İletişim | HB Otomatik Şanzıman',
  description: `${SITE.name} iletişim bilgileri. ${SITE.addressText}. Telefon: ${SITE.phoneDisplay}. ${SITE.hoursText}.`,
  breadcrumb: [HOME, { name: 'İletişim', url: contactUrl }],
  extraSchema: {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': SITE.origin + '/#business',
    name: SITE.name,
    url: SITE.origin + '/',
    telephone: SITE.phone,
    email: SITE.email,
    image: SITE.origin + SITE.ogImage,
    ...gbpSchemaFields(),
    address: {
      '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.district,
      addressRegion: SITE.city, postalCode: SITE.postalCode, addressCountry: SITE.country
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.lat, longitude: SITE.lng },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: SITE.hours.days, opens: SITE.hours.open, closes: SITE.hours.close }]
  },
  body: B.hero({ tag: 'İletişim · Üçevler Sanayi, Nilüfer', h1: 'Bize ulaşın', lead: 'Aracı görmeden rakam vermiyoruz — ama belirtiyi telefonda dinleyip ne yapmanız gerektiğini söyleyebiliriz. Arıza tespiti ücretsiz.', root: '../' })
    + `
    <section class="section">
      <div class="container">
        <span class="eyebrow">Ulaşım kanalları</span>
        <h2 class="sec-title">Telefon, WhatsApp, e-posta</h2>
        <div class="cards">
          <div class="card contact-card">
            <h3>Telefon</h3>
            <p><a class="big-link" href="tel:${SITE.phone}">${SITE.phoneDisplay}</a></p>
            <p><a class="big-link" href="tel:${SITE.phone2}">${SITE.phone2Display}</a></p>
            <p class="muted">${SITE.hoursText}</p>
          </div>
          <div class="card contact-card">
            <h3>WhatsApp</h3>
            <p><a class="big-link" href="https://wa.me/${SITE.phone.replace('+', '')}" rel="noopener" target="_blank">Mesaj gönderin</a></p>
            <p class="muted">Arıza lambasının fotoğrafını veya okunmuş hata kodlarını paylaşabilirsiniz.</p>
          </div>
          <div class="card contact-card">
            <h3>E-posta</h3>
            <p><a class="big-link" style="font-size:17px;overflow-wrap:anywhere" href="mailto:${SITE.email}">${SITE.email}</a></p>
            <p class="muted">Kurumsal ve filo talepleri</p>
          </div>
        </div>
${SITE.googleReviewUrl || SITE.googleBusinessUrl ? `
        <div class="card contact-card" style="margin-top:16px">
          <h3>Google</h3>
          <p>Hizmetimizden memnun kaldıysanız kısa bir değerlendirme yazmanız, aynı sorunu yaşayan diğer araç sahiplerinin bize ulaşmasına yardımcı olur.</p>
          <div class="review-actions">
${SITE.googleReviewUrl ? `            <a class="btn btn-primary btn-sm" href="${SITE.googleReviewUrl}" target="_blank" rel="noopener">Değerlendirme yazın</a>\n` : ''}${SITE.googleBusinessUrl ? `            <a class="btn btn-ghost btn-sm" href="${SITE.googleBusinessUrl}" target="_blank" rel="noopener">Google İşletme Profilimiz →</a>\n` : ''}          </div>
        </div>` : ''}
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <span class="eyebrow">Adres</span>
        <h2 class="sec-title with-lead">${SITE.locationShort}</h2>
        <p class="sec-lead">${SITE.street}, ${SITE.postalCode} ${SITE.district} / ${SITE.city}</p>
        <a class="btn btn-ghost" target="_blank" rel="noopener" href="${mapsUrl()}">Google Haritalar'da aç →</a>
        <div class="map-embed">
          <iframe title="${SITE.name} konumu" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=${SITE.lat},${SITE.lng}&z=15&output=embed"></iframe>
        </div>
      </div>
    </section>`
    + B.bulletSection({
        h2: 'Gelmeden önce hazırlarsanız işimizi kolaylaştırır',
        variant: 'alt',
        items: [
          '<strong>Araç bilgisi:</strong> marka, model, yıl, motor ve mümkünse şanzıman tipi',
          '<strong>Şikâyetin tarifi:</strong> ne zaman, hangi viteste, hangi hızda oluşuyor?',
          '<strong>Soğukken mi, ısındıkça mı</strong> belirginleşiyor?',
          '<strong>Gösterge uyarısı</strong> var mı, aracın acil moda geçtiği oldu mu?',
          '<strong>Bakım geçmişi:</strong> şanzıman yağı en son ne zaman değişti?',
          '<strong>Varsa önceki servis raporları</strong> veya okunmuş hata kodları'
        ]
      })
    + B.ctaSection({ title: 'Online randevu oluşturun', text: 'Formu doldurun, uygun saat için sizi arayalım.', root: '../' })
}));

/* ===================== YASAL SAYFALAR ===================== */
const legal = [
  {
    slug: 'gizlilik-politikasi', nav: 'Gizlilik Politikası',
    title: 'Gizlilik Politikası | HB Otomatik Şanzıman',
    description: 'HB Otomatik Şanzıman web sitesi gizlilik politikası: hangi veriler toplanır, nasıl kullanılır ve nasıl korunur.',
    h1: 'Gizlilik Politikası',
    sections: [
      { h2: 'Genel', paras: [`Bu gizlilik politikası, ${SITE.name} (“biz”) tarafından işletilen ${SITE.origin} adresindeki web sitesini ziyaret ettiğinizde kişisel verilerinizin nasıl işlendiğini açıklar.`] },
      { h2: 'Toplanan veriler', paras: ['Sitemiz üzerinden yalnızca sizin ilettiğiniz verileri topluyoruz:'], list: [
        '<strong>Randevu formu:</strong> ad soyad, telefon numarası, e-posta adresi, araç bilgisi ve şikâyet açıklaması',
        '<strong>Üyelik / giriş:</strong> ad soyad, e-posta adresi, telefon numarası',
        '<strong>Teknik veriler:</strong> tarayıcı türü, cihaz bilgisi ve site kullanım istatistikleri (analitik araçlar etkinse)'
      ]},
      { h2: 'Verilerin kullanım amacı', list: [
        'Randevu taleplerinizi almak, planlamak ve size dönüş yapmak',
        'Hizmet süreci hakkında sizi bilgilendirmek',
        'Yasal yükümlülüklerimizi yerine getirmek',
        'Site kullanımını analiz ederek hizmet kalitesini geliştirmek'
      ]},
      { h2: 'Verilerin paylaşımı', paras: ['Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla pazarlama amacıyla paylaşılmaz. Randevu ve iletişim verileri yalnızca hizmetin sunulması amacıyla kullanılır.'] },
      { h2: 'Veri güvenliği', paras: ['Verilerinizin yetkisiz erişime karşı korunması için teknik ve idari tedbirler uygulanır. Ancak internet üzerinden yapılan hiçbir veri aktarımının %100 güvenli olmadığını hatırlatırız.'] },
      { h2: 'Haklarınız', paras: ['KVKK kapsamındaki haklarınızın tamamı ve başvuru yöntemi için <a href="../kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</a> sayfamızı inceleyebilirsiniz.'] },
      { h2: 'İletişim', paras: [`Gizlilik politikamızla ilgili sorularınız için: <a href="mailto:${SITE.email}">${SITE.email}</a> · <a href="tel:${SITE.phone}">${SITE.phoneDisplay}</a>`] },
      { h2: 'Değişiklikler', paras: ['Bu politika zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır.'] }
    ]
  },
  {
    slug: 'kvkk-aydinlatma-metni', nav: 'KVKK Aydınlatma Metni',
    title: 'KVKK Aydınlatma Metni | HB Otomatik Şanzıman',
    description: '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında HB Otomatik Şanzıman aydınlatma metni.',
    h1: 'KVKK Aydınlatma Metni',
    sections: [
      { h2: 'Veri sorumlusu', paras: [`6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca veri sorumlusu sıfatıyla ${SITE.name}, ${SITE.addressText} adresinde faaliyet göstermektedir.`] },
      { h2: 'İşlenen kişisel veriler', list: [
        '<strong>Kimlik bilgisi:</strong> ad, soyad',
        '<strong>İletişim bilgisi:</strong> telefon numarası, e-posta adresi',
        '<strong>Müşteri işlem bilgisi:</strong> araç marka/model bilgisi, plaka, randevu kaydı, hizmet geçmişi',
        '<strong>İşlem güvenliği bilgisi:</strong> site kullanımına ilişkin teknik kayıtlar'
      ]},
      { h2: 'İşleme amaçları', list: [
        'Randevu taleplerinin alınması ve planlanması',
        'Hizmetin sunulması ve süreç hakkında bilgilendirme yapılması',
        'Sözleşmesel ve yasal yükümlülüklerin yerine getirilmesi',
        'Hizmet kalitesinin ölçülmesi ve geliştirilmesi'
      ]},
      { h2: 'Hukuki sebep', paras: ['Kişisel verileriniz KVKK m.5/2 uyarınca sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, hukuki yükümlülüğün yerine getirilmesi ve veri sorumlusunun meşru menfaati hukuki sebeplerine dayanarak; bunların dışındaki hâllerde ise açık rızanıza dayanarak işlenmektedir.'] },
      { h2: 'Toplama yöntemi', paras: ['Kişisel verileriniz; web sitemizdeki randevu ve üyelik formları, telefon görüşmeleri ve doğrudan atölyemize başvurunuz yoluyla, otomatik ve otomatik olmayan yöntemlerle toplanmaktadır.'] },
      { h2: 'Aktarım', paras: ['Kişisel verileriniz yasal yükümlülükler ve yetkili kamu kurumlarının talepleri dışında üçüncü kişilere aktarılmamaktadır.'] },
      { h2: 'KVKK m.11 kapsamındaki haklarınız', list: [
        'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
        'İşlenmişse buna ilişkin bilgi talep etme',
        'İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme',
        'Yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme',
        'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
        'Kanunda öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme',
        'Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme',
        'Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonuç doğmasına itiraz etme',
        'Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme'
      ]},
      { h2: 'Başvuru', paras: [`Haklarınıza ilişkin taleplerinizi <a href="mailto:${SITE.email}">${SITE.email}</a> adresine e-posta ile veya ${SITE.addressText} adresine yazılı olarak iletebilirsiniz. Başvurularınız en geç 30 gün içinde sonuçlandırılır.`] }
    ]
  },
  {
    slug: 'cerez-politikasi', nav: 'Çerez Politikası',
    title: 'Çerez Politikası | HB Otomatik Şanzıman',
    description: 'HB Otomatik Şanzıman web sitesinde kullanılan çerezler, amaçları ve çerez tercihlerinizi nasıl yönetebileceğiniz.',
    h1: 'Çerez Politikası',
    sections: [
      { h2: 'Çerez nedir?', paras: ['Çerezler (cookies), ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır. Sitenin düzgün çalışmasını sağlamak ve kullanıcı deneyimini iyileştirmek için kullanılırlar.'] },
      { h2: 'Kullandığımız çerez türleri', list: [
        '<strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için gereklidir. Oturum yönetimi ve randevu formunun çalışması bu kapsamdadır. Devre dışı bırakılamaz.',
        '<strong>İşlevsel çerezler:</strong> Tercihlerinizi hatırlar (örneğin oturum bilgisi). Kullanıcı deneyimini iyileştirir.',
        '<strong>Analitik çerezler:</strong> Site kullanımını anonim olarak ölçer; hangi sayfaların daha çok ziyaret edildiğini anlamamızı sağlar. (Analitik araç etkinse kullanılır.)'
      ]},
      { h2: 'Tarayıcı depolama', paras: ['Sitemiz, randevu ve oturum bilgilerinin saklanması amacıyla tarayıcınızın yerel depolama (localStorage) alanını kullanabilir. Bu veriler yalnızca sizin cihazınızda tutulur ve tarayıcı ayarlarınızdan temizlenebilir.'] },
      { h2: 'Çerezleri nasıl yönetebilirsiniz?', paras: ['Tarayıcınızın ayarlar bölümünden çerezleri silebilir veya engelleyebilirsiniz. Ancak zorunlu çerezleri engellemeniz durumunda sitenin bazı bölümleri (örneğin randevu formu) düzgün çalışmayabilir.'] },
      { h2: 'Üçüncü taraf hizmetler', paras: ['Sitemizde harita gösterimi için Google Haritalar ve yazı tipleri için Google Fonts kullanılmaktadır. Bu hizmetler kendi çerez politikalarına tabidir.'] },
      { h2: 'İletişim', paras: [`Çerez politikamızla ilgili sorularınız için: <a href="mailto:${SITE.email}">${SITE.email}</a>`] }
    ]
  }
];

legal.forEach(l => {
  const url = `/${l.slug}/`;
  const body = B.hero({ tag: 'Yasal', h1: l.h1, lead: '', root: '../' })
    + `
    <section class="section prose">
      <div class="container narrow">
        ${l.sections.map(s => `
        <h2>${esc(s.h2)}</h2>
        ${(s.paras || []).map(p => `<p>${p}</p>`).join('\n        ')}
        ${s.list ? `<ul class="check-list">${s.list.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}`).join('\n')}
        <p class="muted" style="margin-top:32px">Son güncelleme: ${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
    </section>`;
  write(url, layout({
    url, title: l.title, description: l.description,
    breadcrumb: [HOME, { name: l.nav, url }],
    body
  }));
});

/* ===================== 404 ===================== */
const html404 = layout({
  url: '/404.html', root: '/', noindex: true,
  title: 'Sayfa Bulunamadı (404) | HB Otomatik Şanzıman',
  description: 'Aradığınız sayfa bulunamadı. Hizmetlerimize, markalara veya iletişim sayfamıza göz atabilirsiniz.',
  body: `
    <section class="page-hero">
      <div class="container">
        <div class="hero-kicker">404 · Sayfa bulunamadı</div>
        <h1>Aradığınız sayfa burada değil</h1>
        <p class="lead">Bağlantı taşınmış veya adres yanlış yazılmış olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.</p>
        <div class="hero-cta">
          <a href="/" class="btn btn-primary">Anasayfaya dön</a>
          <a href="tel:${SITE.phone}" class="btn btn-ghost on-night">${SITE.phoneDisplay}</a>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container narrow">
        <span class="eyebrow">Popüler sayfalar</span>
        <h2 class="section-h">Buradan devam edin</h2>
        <div class="rel-links">
          <a href="/hizmetler/">Tüm hizmetlerimiz</a>
          <a href="/hizmetler/dsg-sanziman-tamiri/">DSG şanzıman tamiri</a>
          <a href="/hizmetler/mekatronik-tamiri/">Mekatronik tamiri</a>
          <a href="/markalar/">Markaya göre servis</a>
          <a href="/blog/">Teknik rehberler</a>
          <a href="/sss/">Sık sorulan sorular</a>
          <a href="/iletisim/">İletişim</a>
        </div>
      </div>
    </section>`
});
fs.writeFileSync(path.join(ROOT, '404.html'), html404, 'utf8');

/* ===================== SITEMAP ===================== */
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: '/', pri: '1.0', freq: 'weekly' },
  { loc: '/hizmetler/', pri: '0.9', freq: 'monthly' },
  ...SERVICES.map(s => ({ loc: `/hizmetler/${s.slug}/`, pri: '0.9', freq: 'monthly' })),
  { loc: '/markalar/', pri: '0.8', freq: 'monthly' },
  ...BRANDS.map(b => ({ loc: `/markalar/${b.slug}/`, pri: '0.8', freq: 'monthly' })),
  { loc: '/bolgeler/', pri: '0.7', freq: 'monthly' },
  ...REGIONS.map(r => ({ loc: `/bolgeler/${r.slug}/`, pri: '0.7', freq: 'monthly' })),
  { loc: '/blog/', pri: '0.7', freq: 'weekly' },
  ...POSTS.map(p => ({ loc: `/blog/${p.slug}/`, pri: '0.6', freq: 'monthly', lastmod: p.modified })),
  { loc: '/sss/', pri: '0.7', freq: 'monthly' },
  { loc: '/hakkimizda/', pri: '0.6', freq: 'yearly' },
  { loc: '/iletisim/', pri: '0.8', freq: 'yearly' },
  { loc: '/gizlilik-politikasi/', pri: '0.2', freq: 'yearly' },
  { loc: '/kvkk-aydinlatma-metni/', pri: '0.2', freq: 'yearly' },
  { loc: '/cerez-politikasi/', pri: '0.2', freq: 'yearly' }
];

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE.origin}${u.loc}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pri}</priority>
  </url>`).join('\n')}
</urlset>
`, 'utf8');

/* ===================== ROBOTS ===================== */
fs.writeFileSync(path.join(ROOT, 'robots.txt'),
`# HB Otomatik Şanzıman — robots.txt
User-agent: *
Allow: /

# Yapay zekâ / tarama botlarına açık (marka görünürlüğü için)
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Gereksiz tarama yükünü azalt
Disallow: /build/
Disallow: /*?*utm_

Sitemap: ${SITE.origin}/sitemap.xml
`, 'utf8');

/* ===================== MANIFEST ===================== */
fs.writeFileSync(path.join(ROOT, 'site.webmanifest'), JSON.stringify({
  name: `${SITE.name} — ${SITE.slogan}`,
  short_name: SITE.name,
  description: `${SITE.city} ${SITE.district}'de otomatik, DSG ve CVT şanzıman tamiri ve bakımı.`,
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#14181d',
  theme_color: '#14181d',
  lang: 'tr',
  dir: 'ltr',
  categories: ['business', 'automotive'],
  icons: [
    { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ],
  shortcuts: [
    { name: 'Randevu Al', url: '/#randevu' },
    { name: 'Hizmetler', url: '/hizmetler/' },
    { name: 'İletişim', url: '/iletisim/' }
  ]
}, null, 2), 'utf8');

console.log(`✓ ${written.length} sayfa üretildi`);
written.forEach(u => console.log('  ' + u));
console.log('✓ 404.html, sitemap.xml, robots.txt, site.webmanifest güncellendi');
