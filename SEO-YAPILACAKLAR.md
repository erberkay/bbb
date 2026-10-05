# Sıradaki Adımlar — Sizin Yapmanız Gerekenler

> ### ⚠️ Tasarım geçişiyle NAP bilgileri değişti — İşletme Profili'ni kontrol edin
>
> Yeni tasarımdaki bilgiler siteye işlendi. **Google İşletme Profili'nde de
> harf harf aynı olmalılar**, yoksa Google iki kaydı farklı işletme sanabilir:
>
> | Alan | Eski site | Yeni (tasarımdan) |
> |------|-----------|-------------------|
> | İşletme adı | HB Şanzıman | **HB Otomatik Şanzıman** |
> | Posta kodu | 16120 | **16270** |
> | E-posta | info@hbsanziman.com | **hbotomatiksanziman16@gmail.com** |
> | İkinci telefon | — | **0543 895 17 32** |
>
> Posta kodu iki kaynakta farklıydı; tasarımdakini (16270) esas aldım.
> Doğrusu hangisiyse `build/config.js` → `postalCode` alanına yazıp
> `npm run build` çalıştırın.

Kod tarafındaki iş tamamlandı. Aşağıdakiler **kodla yapılamayan**, hesap
açma / bilgi girme / doğrulama gerektiren adımlardır. Öncelik sırasına
göre dizilmiştir.

---

## 0. 🔴 GÜVENLİK — Yayına almadan önce (en yüksek öncelik)

`assets/app.js` içindeki yönetici şifresi (`admin` / `hb2024`) tarayıcı
kaynak kodunda **açık şekilde görünür**. Siteyi ziyaret eden herkes
"Sayfa kaynağını görüntüle" diyerek okuyabilir.

**Yapılacaklar:**
1. `ADMIN_CREDS` sabitini tamamen kaldırın.
2. Yönetici girişini Firebase Authentication üzerinden yapın.
3. `firestore.rules` dosyasındaki `YONETICI_EPOSTA@gmail.com` değerini
   kendi Google adresinizle değiştirin ve kuralları yayınlayın:
   ```bash
   firebase deploy --only firestore:rules
   ```
4. Randevu verilerini `localStorage` yerine Firestore'da tutun.

> `firestore.rules` dosyası zaten doğru şekilde hazırlanmış durumda —
> yalnızca e-posta adresini değiştirip yayınlamanız yeterli.

---

## 1. Alan adı ve yayına alma

Site şu anda `https://hbsanziman.com` adresine göre yapılandırılmış.
**Farklı bir alan adı kullanacaksanız:**

```bash
# build/config.js içinde tek satır:
origin: 'https://yenialanadi.com',

# ardından:
npm run build
```

Tüm 39 sayfanın canonical, Open Graph ve yapısal veri adresleri otomatik güncellenir.

**Yayınlama seçenekleri (statik site, hepsi ücretsiz):**
- **Netlify / Vercel** — GitHub deposunu bağlayın, her push'ta otomatik yayın
- **Firebase Hosting** — zaten Firebase kullanıyorsunuz, `firebase deploy`
- **Cloudflare Pages** — ücretsiz CDN ve SSL

> Sunucunuzun `404.html` dosyasını hata sayfası olarak kullandığından emin olun.
> Netlify/Vercel bunu otomatik yapar.

---

## 2. Google Search Console (kritik — 15 dakika)

Bu adım yapılmadan Google'da ne durumda olduğunuzu göremezsiniz.

1. https://search.google.com/search-console adresine girin
2. "Mülk ekle" → **Alan adı** (domain) türünü seçin
3. Verilen TXT kaydını alan adı DNS ayarlarınıza ekleyin
4. Doğrulama tamamlanınca **Site Haritaları** bölümüne gidin
5. `sitemap.xml` yazıp gönderin
6. **URL Denetimi** ile ana sayfayı ve 2–3 alt sayfayı "Dizine ekleme iste" yapın

> Alternatif doğrulama: `build/config.js` içindeki
> `googleSiteVerification` alanına Google'ın verdiği kodu yazıp
> `npm run build` çalıştırın — meta etiket otomatik eklenir.

**İlk sonuçlar 2–4 hafta içinde görünmeye başlar.** Sabırlı olun; yeni
sayfaların sıralanması normalde 1–3 ay sürer.

---

## 3. ✅ Google İşletme Profili — TAMAMLANDI

> **Durum:** Profil oluşturuldu. ✅
>
> **Sıradaki tek kod adımı — profil bağlantısını siteye ekleyin:**
> ```js
> // build/config.js
> googleBusinessUrl: 'https://maps.app.goo.gl/...',   // Haritalar → Paylaş → Bağlantıyı kopyala
> googleReviewUrl:   'https://g.page/r/.../review',   // İşletme Profili → "Yorum isteyin"
> ```
> ardından `npm run build`. Bu iki satır şunları açar:
> - Yapısal veride `sameAs` + `hasMap` → Google'ın site ile işletme kaydını
>   eşleştirmesini kolaylaştırır (aynı işletme olduğunuzu doğrular)
> - İletişim sayfasında "Google'da değerlendirin" kartı
> - Tüm sayfaların alt bilgisinde profil ve yorum bağlantısı
>
> Alanlar boşken hiçbir bağlantı görünmez — yanlışlıkla kırık bağlantı oluşmaz.

---

### Profil kurulduktan sonra: kontrol listesi

Aşağıdakiler sıralamayı doğrudan etkiler; profil açıldı diye bitmiş sayılmaz.

Bursa'da "şanzıman tamiri" aratan birinin gördüğü ilk şey harita
sonuçlarıdır. Web sitesi bu sıralamayı destekler ama **belirleyici olan
İşletme Profili'dir.**

1. https://business.google.com → işletmenizi ekleyin/talep edin
2. Kategori: **Oto Tamir Servisi** (birincil), ek olarak *Şanzıman Servisi*
3. **NAP bilgilerini birebir şu şekilde girin** (sitedekiyle harf harf aynı olmalı):
   ```
   HB Otomatik Şanzıman
   Üçevler, 28. Sk. 27. Blok No:51, 16270 Nilüfer / Bursa
   0530 491 80 05  (ikinci hat: 0543 895 17 32)
   ```
4. Çalışma saatleri: Pazartesi–Cumartesi 08:30–19:00, Pazar kapalı
5. Web sitesi: alan adınız
6. **Hizmetler** bölümüne 8 hizmetin hepsini tek tek ekleyin
7. **Fotoğraf yükleyin** — bu sıralamayı doğrudan etkiler:
   - Atölye dış cephe (tabela görünür)
   - Atölye iç mekân, tezgâh, diagnostik cihazlar
   - Ekip fotoğrafı
   - Çalışma anından kareler (sökülmüş şanzıman, tork konvertörü)
   - **En az 10–15 gerçek fotoğraf**
8. **Soru-Cevap** bölümüne `/sss/` sayfasındaki soruları ekleyin
9. Haftada bir **Güncelleme** paylaşın (blog yazılarınızı kullanabilirsiniz)

---

## 4. 🔴 Müşteri yorumları — ŞİMDİ SIRA BUNDA (en yüksek etkili faktör)

Yerel aramada yorum sayısı ve puanı, sıralamayı belirleyen en güçlü
sinyallerden biridir.

**Pratik yöntem:**
1. Google İşletme Profili'nden **kısa yorum bağlantınızı** alın
2. Bu bağlantıyı QR koda çevirip atölyede görünür bir yere asın
3. Araç teslimi sırasında memnun müşteriden yorum isteyin —
   en yüksek dönüş oranı bu andadır
4. WhatsApp ile teslim sonrası kısa mesaj gönderin
5. **Gelen her yoruma cevap yazın** (olumsuz olanlar dahil)

**Hedef:** ilk 3 ayda 25+ yorum.

> ⚠️ Yorum satın almayın, sahte yorum yazmayın. Google bunları tespit eder
> ve profil kapatılabilir.

**Yorumlar toplandıktan sonra** bize haber verin — `AggregateRating`
yapısal verisini ekleyip SERP'te yıldız gösterimini açabiliriz.
(Gerçek yorum olmadan eklemek politika ihlalidir, bu yüzden şimdilik eklenmedi.)

---

## 5. Google Analytics 4

1. https://analytics.google.com → mülk oluşturun
2. Ölçüm kimliğini (`G-XXXXXXXXXX`) alın
3. `build/config.js` içine yazın:
   ```js
   gaMeasurementId: 'G-XXXXXXXXXX',
   ```
4. `npm run build` çalıştırın — kod tüm sayfalara eklenir
5. GA4'te **dönüşüm olayı** tanımlayın: randevu formu gönderimi, telefon tıklaması

---

## 6. Fotoğraf ve görsel içerik

Şu anda sitede gerçek atölye fotoğrafı yok. Bu hem dönüşüm oranını
hem de güveni doğrudan etkiler.

**Çekilecek fotoğraflar:**
- Atölye dış cephe ve tabela
- İç mekân, tezgâhlar, kaldırma sistemi
- Diagnostik cihazlar (marka görünsün)
- Sökülmüş şanzıman, tork konvertörü kesiti, mekatronik ünitesi
- Ekip fotoğrafı
- Önce/sonra kareleri

**Yüklerken:**
- WebP formatında, 1600px genişliği aşmayacak şekilde
- Dosya adı Türkçe ve açıklayıcı: `otomatik-sanziman-revizyonu-bursa.webp`
- `alt` metni gerçek içeriği anlatsın, anahtar kelime doldurmayın

Fotoğrafları gönderdiğinizde ilgili sayfalara yerleştirebiliriz.

---

## 7. Sosyal medya ve dizin kayıtları (citation)

Yerel SEO'da adres tutarlılığı önemlidir. **Her yerde birebir aynı NAP** kullanın.

**Öncelikli dizinler:**
- Google İşletme Profili ⭐ (bkz. madde 3)
- Bing Places for Business
- Apple Business Connect (Apple Haritalar)
- Yandex İşletme
- Foursquare
- Sarı Sayfalar / Yerel işletme rehberleri

**Sosyal medya:**
- Instagram (şanzıman içeriği görsel olarak çok iyi çalışır)
- YouTube (onarım süreci videoları — güçlü bir güven sinyalidir)
- Facebook sayfası

Hesapları açtıktan sonra `build/config.js` içindeki `socials` dizisine
ekleyin; `sameAs` yapısal verisi otomatik oluşur:
```js
socials: ['https://www.instagram.com/hbsanziman', 'https://www.youtube.com/@hbsanziman'],
```

---

## 8. İçerik takvimi (sürdürülebilir büyüme)

Blog yazıları huni üstü trafiği getirir ve site otoritesini artırır.
**Ayda 1–2 yazı yeterlidir**; düzenlilik miktardan önemlidir.

**Hazır konu havuzu:**
- Şanzıman arıza kodları ne anlama gelir? (P0700, P0730, P0741…)
- Manuel mi otomatik mi? Alırken nelere dikkat etmeli
- İkinci el araçta şanzıman nasıl kontrol edilir?
- Kışın şanzıman bakımı ve dikkat edilmesi gerekenler
- Şanzıman garantisi neleri kapsar?
- Hibrit araçlarda e-CVT nasıl çalışır?
- Tiptronic, S-tronic, DSG, EDC — farkları nedir?
- Şanzıman ısınması: nedenleri ve önlemleri
- Çekici çağırmak mı, sürerek gelmek mi?
- Şanzıman yağı renkleri ne anlatır? (görsel rehber)

**Yeni yazı eklemek için** `build/content/blog.js` dosyasına mevcut
yapıya uygun bir kayıt ekleyip `npm run build` çalıştırmanız yeterli —
sitemap, blog listesi ve yapısal veri otomatik güncellenir.

---

## 9. Google Ads (isteğe bağlı — hızlı sonuç için)

SEO 2–6 ayda sonuç verir. Hemen müşteri gerekiyorsa:

- **Kampanya türü:** Arama Ağı, konum hedefli (Bursa + 30 km)
- **Yüksek niyetli kelimeler:** "şanzıman tamiri bursa", "otomatik şanzıman servisi",
  "dsg tamiri bursa", "acil şanzıman tamiri"
- **Negatif kelimeler:** "ücretsiz", "nasıl yapılır", "ikinci el şanzıman", "iş ilanı"
- **Reklam uzantıları:** telefonla arama, konum, site bağlantıları (hizmet sayfalarına)
- **Açılış sayfası:** ilgili hizmet sayfası (ana sayfa değil — dönüşüm oranı daha yüksek)

---

## 📅 Öncelik takvimi

| Ne zaman | Ne yapılacak |
|----------|--------------|
| **Yayından önce** | Madde 0 (güvenlik), Madde 1 (alan adı) |
| **1. hafta** | Madde 2 (Search Console), ~~Madde 3 (İşletme Profili)~~ ✅, Madde 5 (Analytics) |
| **2.–4. hafta** | Madde 6 (fotoğraflar), Madde 7 (dizin kayıtları) |
| **Sürekli** | Madde 4 (yorum toplama), Madde 8 (ayda 1–2 yazı) |
| **İsteğe bağlı** | Madde 9 (Google Ads) |

---

## 📈 Gerçekçi beklenti

| Süre | Beklenen |
|------|----------|
| 2–4 hafta | Sayfalar indekslenir, Search Console'da görünmeye başlar |
| 1–2 ay | Uzun kuyruk aramalarda ("dsg mekatronik arızası bursa") sıralama |
| 3–4 ay | Marka ve hizmet aramalarında ilk sayfa |
| 6+ ay | "bursa şanzıman" gibi rekabetçi terimlerde üst sıralar |

Bu sürelerin en büyük belirleyicisi **Google İşletme Profili ve
müşteri yorumlarıdır** — teknik SEO tek başına yeterli değildir.
