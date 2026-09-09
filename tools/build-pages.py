#!/usr/bin/env python3
"""
Hizmet sayfalarını üretir.

Nav, footer, auth modalı ve script blokları index.html'den OKUNUR — böylece
navigasyon değiştiğinde 14 sayfayı tek tek güncellemek gerekmez, bu script
yeniden çalıştırılır. Üretilen HTML depoya işlenir; sunucu tarafında build
adımı yoktur (GitHub Pages düz statik dosya servis eder).

Kullanım:  python3 tools/build-pages.py
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://hbotomatiksanziman.com"


def slice_between(html, start_marker, end_marker, include_end=True):
    """start_marker'dan end_marker'a kadar olan parçayı döndürür.

    include_end=False, bitiş işaretçisinin kendisini DIŞARIDA bırakır. Bitiş
    işaretçisi bir sonraki bölümün açılış yorumu olduğunda (ör. "<!-- TOAST")
    bu şart: aksi hâlde kapanmamış bir yorum üretilir ve arkasından gelen
    HTML yorumun içinde kalıp ekrana hiç çıkmaz.
    """
    i = html.index(start_marker)
    j = html.index(end_marker, i)
    if include_end:
        j += len(end_marker)
    return html[i:j]


def to_home_anchors(fragment):
    """Ana sayfadaki çıplak çapaları (#hizmetler) alt sayfalarda çalışır hâle getirir.

    Nav ve footer index.html'den birebir alınıyor; oradaki href="#bolum" bağlantıları
    alt sayfada hiçbir yere gitmez, çünkü o bölümler yalnızca ana sayfada var.
    """
    fragment = re.sub(r'href="#([a-zA-Z][\w-]*)"', r'href="/#\1"', fragment)
    fragment = fragment.replace('href="#"', 'href="/"')  # logo/marka bağlantısı
    return fragment


def load_shell():
    with open(os.path.join(ROOT, "index.html"), encoding="utf-8") as f:
        home = f.read()
    return {
        "nav": to_home_anchors(slice_between(home, "<!-- ===================== NAVBAR", "</nav>")),
        "footer": to_home_anchors(slice_between(home, "<!-- ===================== FOOTER", "</footer>")),
        "mailscript": slice_between(home, "<!-- E-posta adreslerini kur", "</script>"),
        "authmodal": slice_between(home, "<!-- ===================== AUTH MODAL", "<!-- Yönetici giriş modalı", include_end=False),
        # app.js'i şablon kendisi ekliyor; buraya dahil edilirse iki kez yüklenir.
        "scripts": subpage_scripts(
            slice_between(home, "<!-- Firebase SDK (compat) -->", '<script src="/assets/app.js"></script>', include_end=False)
        ),
    }


def subpage_scripts(block):
    """Alt sayfalarda Firestore SDK'sını yükleme.

    Randevu formu ve yönetici paneli yalnızca ana sayfada; alt sayfalarda
    Firestore'un tek işi ~100 KB indirilmek olurdu. Giriş/çıkış için gereken
    firebase-auth kalıyor, app.js Firestore yoksa FB.db'yi null bırakıyor.
    """
    return "\n".join(
        line for line in block.split("\n") if "firebase-firestore-compat" not in line
    )


def faq_schema(faqs):
    return {
        "@type": "FAQPage",
        "@id": "{url}#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a},
            }
            for q, a in faqs
        ],
    }


def build_schema(page):
    url = f"{SITE}/{page['slug']}/"
    graph = [
        {
            "@type": "WebPage",
            "@id": f"{url}#webpage",
            "url": url,
            "name": page["title"],
            "description": page["meta"],
            "isPartOf": {"@id": f"{SITE}/#website"},
            "about": {"@id": f"{SITE}/#business"},
        },
        {
            "@type": "BreadcrumbList",
            "@id": f"{url}#breadcrumb",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": f"{SITE}/"},
                {"@type": "ListItem", "position": 2, "name": page["h1"]},
            ],
        },
        {
            "@type": "Service",
            "@id": f"{url}#service",
            "name": page["service_name"],
            "serviceType": page["service_type"],
            "provider": {"@id": f"{SITE}/#business"},
            "areaServed": [
                {"@type": "City", "name": "Bursa"},
                {"@type": "AdministrativeArea", "name": "Nilüfer"},
            ],
        },
    ]
    if page.get("faqs"):
        graph.append(
            {
                "@type": "FAQPage",
                "@id": f"{url}#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": q,
                        "acceptedAnswer": {"@type": "Answer", "text": a},
                    }
                    for q, a in page["faqs"]
                ],
            }
        )
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, indent=2)


def render_body(page):
    out = []
    for block in page["sections"]:
        out.append('      <div class="prose-block reveal">')
        out.append(f'        <h2>{block["h2"]}</h2>')
        for para in block["body"]:
            out.append(f"        <p>{para}</p>")
        if block.get("items"):
            out.append('        <ul class="tick-list">')
            for it in block["items"]:
                out.append(f"          <li>{it}</li>")
            out.append("        </ul>")
        out.append("      </div>")
    return "\n".join(out)


def render_faq(page):
    if not page.get("faqs"):
        return ""
    rows = []
    for q, a in page["faqs"]:
        rows.append(
            f'        <details class="faq-item">\n'
            f"          <summary>{q}</summary>\n"
            f"          <p>{a}</p>\n"
            f"        </details>"
        )
    return (
        '      <div class="prose-block reveal">\n'
        "        <h2>Sık sorulan sorular</h2>\n"
        + "\n".join(rows)
        + "\n      </div>"
    )


def render_related(page, all_pages):
    links = []
    for slug in page.get("related", []):
        target = next((p for p in all_pages if p["slug"] == slug), None)
        if target:
            links.append(
                f'          <a class="related-card" href="/{target["slug"]}/">'
                f'<span class="related-kicker">{target["kicker"]}</span>'
                f'<span class="related-title">{target["h1"]}</span></a>'
            )
    if not links:
        return ""
    return (
        '      <div class="related reveal">\n'
        "        <h2>İlgili sayfalar</h2>\n"
        '        <div class="related-grid">\n'
        + "\n".join(links)
        + "\n        </div>\n      </div>"
    )


PAGE_TMPL = """<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{meta}">
  <meta name="theme-color" content="#0a0d14">
  <link rel="icon" type="image/png" href="/assets/img/favicon-48.png">
  <link rel="canonical" href="{url}">
  <meta name="robots" content="index, follow">

  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{meta}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{url}">
  <meta property="og:site_name" content="HB Otomatik Şanzıman">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:image" content="{site}/assets/img/og-hb.png">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{meta}">
  <meta name="twitter:image" content="{site}/assets/img/og-hb.png">

  <meta name="geo.region" content="TR-16">
  <meta name="geo.placename" content="Nilüfer, Bursa">
  <meta name="geo.position" content="40.2214;28.9847">

  <script type="application/ld+json">
{schema}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <script>document.documentElement.className += " js";</script>
  <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>

{nav}

  <main class="page">
    <div class="container">

      <nav class="crumbs" aria-label="Site yolu">
        <a href="/">Ana Sayfa</a><span aria-hidden="true">›</span><span>{h1}</span>
      </nav>

      <header class="page-head reveal">
        <span class="section-tag">{kicker}</span>
        <h1>{h1}</h1>
        <p class="lead">{intro}</p>
        <div class="page-cta">
          <a href="/#randevu" class="btn btn-primary">Online Randevu Al</a>
          <a href="tel:+905304918005" class="btn btn-ghost">0530 491 80 05</a>
        </div>
      </header>

{body}

{faq}

{related}

      <div class="page-foot-cta reveal">
        <div>
          <h2>Aracınızı Bursa Nilüfer'e getirin</h2>
          <p>Arıza tespitinden sonra yapılacak işlemi ve kapsamı onayınıza sunuyoruz. Telefonla tahmini rakam vermiyoruz; aracı görmeden fiyat çıkarmak doğru olmuyor.</p>
        </div>
        <a href="/#randevu" class="btn btn-primary">Randevu Al</a>
      </div>

    </div>
  </main>

{footer}

{mailscript}

{authmodal}
  <div class="toast-wrap" id="toastWrap"></div>

{scripts}
  <script src="/assets/app.js"></script>
</body>
</html>
"""


def main():
    shell = load_shell()
    with open(os.path.join(ROOT, "tools", "pages.json"), encoding="utf-8") as f:
        pages = json.load(f)

    written = []
    for page in pages:
        url = f"{SITE}/{page['slug']}/"
        html = PAGE_TMPL.format(
            title=page["title"],
            meta=page["meta"],
            url=url,
            site=SITE,
            schema=build_schema(page),
            nav=shell["nav"],
            footer=shell["footer"],
            mailscript=shell["mailscript"],
            authmodal=shell["authmodal"],
            scripts=shell["scripts"],
            h1=page["h1"],
            kicker=page["kicker"],
            intro=page["intro"],
            body=render_body(page),
            faq=render_faq(page),
            related=render_related(page, pages),
        )
        outdir = os.path.join(ROOT, page["slug"])
        os.makedirs(outdir, exist_ok=True)
        with open(os.path.join(outdir, "index.html"), "w", encoding="utf-8") as f:
            f.write(html)
        written.append(page["slug"])

    # sitemap.xml — ana sayfa + üretilen sayfalar
    from datetime import date
    today = date.today().isoformat()
    urls = [(f"{SITE}/", "1.0")] + [(f"{SITE}/{p['slug']}/", "0.8") for p in pages]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, prio in urls:
        sm += ["  <url>", f"    <loc>{loc}</loc>", f"    <lastmod>{today}</lastmod>",
               "    <changefreq>monthly</changefreq>", f"    <priority>{prio}</priority>", "  </url>"]
    sm.append("</urlset>")
    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write("\n".join(sm) + "\n")

    print(f"{len(written)} sayfa üretildi:")
    for s in written:
        print(f"  /{s}/")
    print(f"sitemap.xml güncellendi ({len(urls)} URL)")


if __name__ == "__main__":
    main()
