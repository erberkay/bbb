# Yapılan İşler — Teslim Raporu

Bu belgede, siteye eklenen her şey departman departman listelenmiştir.

---

## 📊 Özet

| Ölçüt | Önce | Sonra |
|-------|------|-------|
| İndekslenebilir sayfa | **1** | **39** |
| Sitemap URL sayısı | 1 | 39 |
| Yapısal veri (JSON-LD) türü | 1 (AutoRepair) | 6 (AutoRepair, Organization, WebSite, Service, Article, FAQPage, BreadcrumbList) |
| Hedeflenen anahtar kelime kümesi | ~5 | 120+ |
| Blog / rehber içeriği | Yok | 6 uzun rehber |
| Yasal sayfalar | Yok | 3 (Gizlilik, KVKK, Çerez) |
| Sosyal paylaşım görseli | SVG (çoğu platform desteklemez) | 1200×630 PNG |
| 404 sayfası | Yok | Var (yönlendirmeli) |
| PWA manifest | Yok | Var |

---

## 🔍 Teknik SEO

### Site mimarisi (silo modeli)
Tek sayfalık yapıdan, konu otoritesi oluşturan hiyerarşik yapıya geçildi:

```
/                              Ana sayfa
├── /hizmetler/                → 8 hizmet sayfası
├── /markalar/                 → 8 marka sayfası
├── /bolgeler/                 → 6 bölge sayfası
├── /blog/                     → 6 rehber yazısı
├── /sss/                      16 soruluk SSS
├── /hakkimizda/  /iletisim/
└── /gizlilik-politikasi/  /kvkk-aydinlatma-metni/  /cerez-politikasi/
```

Her alt sayfa hub'a, hub da alt sayfalara bağlanır; ek olarak sayfalar arası
konu temelli iç bağlantılar kuruldu (`İlgili sayfalar` blokları).

### Yapısal veri (Schema.org)
| Tür | Nerede | Kazanım |
|-----|--------|---------|
| `AutoRepair` | Ana sayfa, iletişim | Yerel işletme paneli, harita sonuçları |
| `Organization` | Ana sayfa | Marka bilgi paneli |
| `WebSite` | Ana sayfa | Site adı gösterimi |
| `Service` | 22 hizmet/marka/bölge sayfası | Hizmet zengin sonuçları |
| `Article` | 6 blog yazısı | Haber/makale gösterimi, tarih bilgisi |
| `FAQPage` | Ana sayfa + 28 sayfa | **SERP'te açılır soru-cevap** (yüksek tıklama oranı) |
| `BreadcrumbList` | 38 sayfa | SERP'te URL yerine site yolu gösterimi |

> ⚠️ **Bilinçli olarak eklenMEDİ:** `AggregateRating` / `Review`.
> Gerçek müşteri değerlendirmesi olmadan yıldız puanı eklemek Google'ın
> yapısal veri politikasını ihlal eder ve **manuel işlem cezası** getirir.
> Gerçek yorumlar toplandıktan sonra eklenmelidir (bkz. `SEO-YAPILACAKLAR.md`).

### Meta etiketler
- Her sayfada **benzersiz** `<title>` (≤62 karakter) ve `description` (70–165 karakter)
- `canonical` etiketi tüm sayfalarda
- `robots: max-image-preview:large, max-snippet:-1` → SERP'te büyük görsel ve uzun snippet
- Coğrafi meta etiketler (`geo.region`, `geo.position`, `ICBM`)
- Open Graph + Twitter Card, gerçek 1200×630 PNG görselle

### Tarama ve indeksleme
- `sitemap.xml`: 39 URL, öncelik ve güncelleme sıklığı ile
- `robots.txt`: GPTBot / PerplexityBot'a açık (yapay zekâ arama görünürlüğü),
  `/build/` ve UTM parametreli URL'ler taramadan çıkarıldı
- `404.html`: popüler sayfalara yönlendiren, `noindex` işaretli hata sayfası

---

## 📍 Yerel SEO

- **NAP tutarlılığı:** Ad, adres ve telefon `build/config.js` içinde tek noktada
  toplandı. Tüm sayfalar bu kaynaktan üretilir — dizinlerde ve Google İşletme
  Profili'nde birebir aynı yazım kullanılabilir.
- **6 bölge sayfası** — Nilüfer, Osmangazi, Yıldırım, Gemlik, İnegöl, Mudanya.
  Her biri özgün içerik taşır: ulaşım süresi, bölgeye özgü sürüş koşulları
  (Osmangazi'de eğim, Mudanya'da nem/korozyon, İnegöl'de ticari araç yükü,
  Yıldırım'da yüksek kilometreli araç profili) ve o profile uygun bakım önerisi.

> ⚠️ **Neden aynı metni ilçe adı değiştirerek çoğaltmadık?**
> Bu yöntem "kapı sayfası" (doorway page) sayılır, Google tarafından spam
> olarak değerlendirilir ve tüm sitenin sıralamasını düşürür. Her bölge
> sayfası gerçekten farklı bilgi verdiği için bu riskten kaçınıldı.

- Çalışma saatleri `openingHoursSpecification` ile yapısal veride
- Google Haritalar gömülü harita `loading="lazy"` ile
- Konuma tıklanabilir `tel:` ve WhatsApp bağlantıları

---

## ✍️ İçerik

### 8 hizmet sayfası
Otomatik şanzıman tamiri · DSG · CVT · Tork konvertörü · Revizyon ·
Yağ değişimi · Arıza tespiti · Mekatronik

Her sayfada: teknik açıklama, arıza belirtileri, onarım kapsamı, çalışma
süreci, sayfaya özel SSS ve iç bağlantılar.

### 8 marka sayfası
Volkswagen · Audi · Mercedes-Benz · BMW · Porsche · Land Rover · Opel · Ford
(tasarım geçişinde yedi marka grubuna hizalandı — aşağıya bakın)

Her markada: kullanılan şanzıman tipleri (DQ200, ZF 8HP, 722.9, DPS6, DL501…),
servis verilen modeller, o markaya özgü tipik arızalar ve SSS.

### 6 rehber yazısı
1. Otomatik şanzıman arıza belirtileri — 10 uyarı işareti
2. Şanzıman yağı ne zaman değişmeli?
3. DSG şanzıman bakımı ve kullanım rehberi
4. CVT şanzıman nedir, nasıl çalışır?
5. Tork konvertörü arızası: belirtiler ve nedenleri
6. Şanzıman tamiri fiyatları nasıl belirlenir?

Her yazıda içindekiler menüsü, karşılaştırma tabloları, SSS ve hizmet
sayfalarına bağlantı.

### SSS
- Ana sayfada 8 soruluk bölüm (`FAQPage` şeması ile)
- `/sss/` sayfasında 16 soru
- Ayrıca her hizmet, marka ve bölge sayfasında 3–6 sayfaya özel soru

---

## 🎨 Tasarım & Erişilebilirlik

- Mevcut koyu tema + altın vurgu tasarım sistemi korundu, alt sayfalara genişletildi
- **İçeriğe atlama bağlantısı** (klavye kullanıcıları için)
- **Görünür odak halkası** (`:focus-visible`) tüm etkileşimli öğelerde
- Hamburger menüde `aria-expanded` / `aria-controls`, Esc ile kapatma
- Ekmek kırıntısı navigasyonu (görünür + yapısal veri)
- **Mobil hızlı eylem çubuğu** — Ara / WhatsApp / Randevu
- `prefers-reduced-motion` desteği
- Yazdırma stilleri
- Tüm görsellerde `alt` metni ve `width`/`height` (CLS önleme)

---

## ⚡ Performans

- **Yazı tipleri artık render engellemiyor:** `preload` + `media="print"` tekniği,
  `<noscript>` yedeği ile
- Logo görsellerine `width`/`height` → düzen kayması (CLS) önlendi
- Harita `iframe`'i `loading="lazy"`
- Alt sayfalarda ağır `app.js` yerine hafif `pages.js` (1.8 KB)
- Tablolar sayfayı değil kendi kutusunu yatay kaydırır

---

## 🐛 Düzeltilen hatalar

### 1. Sayfa içeriğinin görünmez kalması (kritik)
`.reveal` sınıfı `opacity: 0` ile başlıyor ve görünürlüğü tamamen
IntersectionObserver'a bağlıydı. Ölçümde **35 bölümden 33'ü görünür hale
gelmiyordu**. JavaScript yavaş yüklendiğinde veya hata verdiğinde sayfanın
büyük bölümü boş kalıyordu.

**Çözüm (üç katmanlı):**
1. `.reveal` artık varsayılan olarak **görünür**; gizleme yalnızca
   `<html class="js">` varken uygulanır (aşamalı geliştirme).
2. `IntersectionObserver` desteklenmiyorsa `js` sınıfı hiç eklenmez.
3. Sayfa yüklendikten 2,5 saniye sonra kalan tüm bölümler zorla açılır.

Doğrulama: 35/35 bölüm görünür.

### 2. Hamburger menüde durum bildirimi eksikti
`aria-expanded` güncellenmiyordu ve `active` sınıfı eklenmiyordu (X animasyonu
çalışmıyordu). Düzeltildi.

### 3. Mobilde CTA taşması
`.btn` üzerindeki `white-space: nowrap` nedeniyle uzun buton metinleri dar
ekranlarda taşıyordu. 560px altında butonlar tam genişlik ve satır kaydırmalı.

---

## 🛠 Altyapı

Site artık **statik sayfa üreticisi** ile yönetiliyor. 39 sayfayı elle
güncellemek yerine içerik veri dosyalarından üretiliyor:

```
build/
├── config.js              NAP ve site sabitleri (tek doğruluk kaynağı)
├── layout.js              Ortak şablon: head, nav, footer, yapısal veri
├── blocks.js              Yeniden kullanılabilir içerik blokları
├── build.js               Üretici
├── home.js                Ana sayfa üreticisi (tasarım kanvasından)
├── verify.js              Denetleyici
└── content/
    ├── services.js  brands.js  regions.js  blog.js
```

**Komutlar:**
```bash
npm run build     # tüm sayfaları üret
npm run verify    # kırık bağlantı / SEO / JSON-LD denetimi
npm run check     # ikisini birden
npm run serve     # http://localhost:8123 (404 sayfası dahil)
```

**Denetim sonucu:** 40 sayfa · 0 hata · 1 uyarı (404 sayfasında JSON-LD yok — normal)

---

## 🔐 Güvenlik notu

`assets/app.js` içindeki yönetici şifresi tarayıcı kaynak kodunda açıktır.
Kodun içine ayrıntılı uyarı eklendi. Yayına almadan önce mutlaka
`SEO-YAPILACAKLAR.md → 0. Güvenlik` bölümünü uygulayın.

---

## 🎨 Tasarım geçişi — "HB Otomatik Şanzıman" kanvası

Site, kullanıcının hazırladığı Masaüstü + Mobil tasarıma geçirildi.

**Görsel sistem:** kâğıt zemin (#f7f6f4) + gece bölümleri (#14181d), 4px keskin
köşeler, Archivo başlık / Inter gövde / IBM Plex Mono etiket, yanık turuncu
eylem rengi (#b45309), lacivert yapı rengi (#16509b). Eski `styles.css` +
`pages.css` tek bir `styles.css`'te yeniden yazıldı; randevu formu, giriş
modalı, yönetici paneli ve bildirimler de yeni görünüme taşındı.

**Ana sayfa artık üretiliyor.** `index.html` elle düzenlenmiyor;
`build/home.js` tasarımdaki bölümleri (kahraman, marka bandı, belirtiler,
şanzıman aileleri, hizmetler, süreç, rehberler, SSS, randevu) üretir.
Kırılgan metin yamaları yapan `patch-index.js` kaldırıldı.

**Tasarımdan bilinçli olarak ayrılınan yerler:**
- Kartlar ve belirti satırları `#randevu` yerine ilgili alt sayfaya bağlanır
  (iç bağlantı; ziyaretçi de doğru bilgiye ulaşır).
- Tasarımdaki randevu bandı, gerçek randevu formuyla birleştirildi.
- Alt bilgiye Hizmetler / Keşfet / Yasal bağlantı sütunları eklendi
  (yasal sayfalar ve marka/bölge sayfaları başka yerden bağlanmıyor).
- Mobil hızlı eylem çubuğu kaldırıldı (tasarımda yok).

**Tasarımın getirdiği içerik değişiklikleri siteye uygulandı:**
- İşletme adı, e-posta, ikinci telefon, posta kodu (bkz. `SEO-YAPILACAKLAR.md`)
- **Yalnızca otomatik şanzıman:** manuel şanzıman servisi iddiaları kaldırıldı
- **Yedi marka grubu:** Toyota/Honda, Hyundai/Kia, Renault sayfaları kaldırıldı;
  Porsche (PDK / Tiptronic S), Land Rover (ZF 6HP / 8HP / 9HP) ve
  Opel (6T40 ailesi / 8 ileri) sayfaları yazıldı
- **"Aracı görmeden rakam vermiyoruz":** SSS'de, fiyat rehberinde ve Yıldırım
  sayfasında "telefonda genel aralık verebiliriz" diyen cevaplar bu politikaya
  hizalandı
- Tasarımda yer almayan "15+ yıl", "binlerce şanzıman" gibi doğrulanamayan
  rakamlar kaldırıldı; sosyal paylaşım görseli yeni kimlikle yeniden üretildi

**Geçiş sırasında düzeltilen hatalar:**
- Randevu kartındaki "E-posta ile giriş" düğmesi koyu bölümün stilini
  miras aldığı için açık kart üzerinde neredeyse görünmüyordu
- Mobilde kahraman logosu oval görünüyordu (dikey flex'te esneme)
- Alt sayfalarda üst bilgi iki satıra kırılıyordu; hamburger eşiği 1080px'e alındı
- Yönetici giriş modalında varsayılan kullanıcı adı ve şifre **sayfada açıkça
  yazıyordu** — kaldırıldı
- Derleme artık üretilen klasörleri sıfırdan yazıyor: içerikten kaldırılan
  bir sayfa diskte unutulmuş olarak kalmıyor
