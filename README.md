# HB Şanzıman — Kurumsal Web Sitesi & Randevu Sistemi

Bursa / Nilüfer'de faaliyet gösteren **HB Şanzıman** için hazırlanmış kurumsal
web sitesi, online randevu sistemi ve SEO içerik mimarisi.

> **39 indekslenebilir sayfa** · statik · derleme adımı Node.js ile

---

## 📚 Belgeler

| Dosya | İçerik |
|-------|--------|
| **[EKIP-VE-STRATEJI.md](EKIP-VE-STRATEJI.md)** | Ekip yapısı, durum analizi, anahtar kelime mimarisi |
| **[SEO-YAPILANLAR.md](SEO-YAPILANLAR.md)** | Yapılan tüm işlerin teslim raporu |
| **[SEO-YAPILACAKLAR.md](SEO-YAPILACAKLAR.md)** | ⭐ Sizin yapmanız gerekenler (adım adım) |
| **[FIREBASE-KURULUM.md](FIREBASE-KURULUM.md)** | Firebase/Firestore kurulumu |

> 🔴 **Yayına almadan önce** `SEO-YAPILACAKLAR.md → 0. Güvenlik` bölümünü mutlaka okuyun.

---

## 🗂 Dosya yapısı

```
.
├── index.html                  Ana sayfa (randevu, giriş, admin paneli)
├── 404.html                    Hata sayfası
├── sitemap.xml                 Otomatik üretilir
├── robots.txt                  Otomatik üretilir
├── site.webmanifest            Otomatik üretilir
│
├── hizmetler/                  8 hizmet sayfası          ┐
├── markalar/                   8 marka sayfası           │ hepsi
├── bolgeler/                   6 bölge sayfası           ├ build/ ile
├── blog/                       6 rehber yazısı           │ üretilir
├── sss/  hakkimizda/  iletisim/                          │
├── gizlilik-politikasi/  kvkk-aydinlatma-metni/  cerez-politikasi/  ┘
│
├── assets/
│   ├── styles.css              Tasarım sistemi
│   ├── pages.css               Alt sayfa stilleri + erişilebilirlik
│   ├── app.js                  Randevu / giriş / admin mantığı
│   ├── pages.js                Alt sayfa etkileşimleri (hafif)
│   ├── firebase-config.js
│   ├── logo.svg  gear.svg
│   ├── og-image.png            Sosyal paylaşım görseli (1200×630)
│   └── icon-192.png  icon-512.png  apple-touch-icon.png
│
└── build/                      Statik sayfa üreticisi
    ├── config.js               ⭐ NAP / site sabitleri — tek doğruluk kaynağı
    ├── layout.js               Ortak şablon (head, nav, footer, JSON-LD)
    ├── blocks.js               İçerik blokları
    ├── build.js                Üretici
    ├── patch-index.js          Ana sayfayı mimariye bağlar (idempotent)
    ├── verify.js               Denetleyici
    └── content/
        ├── services.js         Hizmet içerikleri
        ├── brands.js           Marka içerikleri
        ├── regions.js          Bölge içerikleri
        └── blog.js             Blog yazıları
```

---

## 🚀 Çalıştırma

```bash
npm run serve     # http://localhost:8123 (404 yönlendirmesi dahil)
```

Kurulum gerektirmez — bağımlılık yoktur, yalnızca Node.js 18+ ister.

---

## 🔧 İçerik güncelleme

**Sayfalar elle düzenlenmez.** İçerik veri dosyalarından üretilir:

```bash
npm run build     # tüm sayfaları üret (sitemap + robots + manifest dahil)
npm run verify    # kırık bağlantı, SEO ve JSON-LD denetimi
npm run check     # ikisini birden
```

### Sık yapılan değişiklikler

| Ne değişecek | Nerede | Sonra |
|--------------|--------|-------|
| Telefon, adres, e-posta, çalışma saati | `build/config.js` | `npm run build` |
| Alan adı | `build/config.js` → `origin` | `npm run build` |
| Bir hizmetin metni | `build/content/services.js` | `npm run build` |
| Yeni blog yazısı | `build/content/blog.js` | `npm run build` |
| Yeni bölge sayfası | `build/content/regions.js` | `npm run build` |
| Google Analytics kimliği | `build/config.js` → `gaMeasurementId` | `npm run build` |
| Sosyal medya hesapları | `build/config.js` → `socials` | `npm run build` |

> `build/config.js` içindeki NAP bilgileri (ad, adres, telefon) tüm sayfalarda
> ve yapısal veride kullanılır. Google İşletme Profili ve dizin kayıtlarında
> **birebir aynı yazımı** kullanın — yerel SEO için kritiktir.

---

## 🔑 Yönetici girişi (demo)

Sitenin en altındaki **"Yönetici Girişi"** bağlantısından:
`admin` / `hb2024`

> ⚠️ Bu bilgiler `assets/app.js` içinde **açık şekilde** durur ve gerçek bir
> koruma sağlamaz. Yayına almadan önce `SEO-YAPILACAKLAR.md → 0. Güvenlik`
> bölümünü uygulayın.

---

## 📍 İletişim

Üçevler, 28. Sk. 27. Blok No:51, 16120 Nilüfer / Bursa
0530 491 80 05 · info@hbsanziman.com
Pazartesi – Cumartesi 08:30 – 19:00
