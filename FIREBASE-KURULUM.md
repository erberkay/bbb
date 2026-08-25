# Firebase Entegrasyonu — Kurulum Rehberi

Bu site şu an randevuları tarayıcıda (localStorage) tutuyor. Gerçek Google girişi ve
merkezî randevu kaydı için Firebase kullanacağız. Aşağıdaki adımları tamamlayıp
**config bilgilerini** iletmen yeterli — entegrasyonu ben bağlayıp test edeceğim.

## 1. Firebase Projesi Oluştur

1. https://console.firebase.google.com → **Proje ekle**
2. Proje adı: `hb-sanziman` (GigBridge'den **ayrı** yeni bir proje olsun)
3. Google Analytics: isteğe bağlı, kapatabilirsin.

## 2. Web Uygulaması Ekle

1. Proje ana sayfasında **Web (`</>`)** simgesine tıkla.
2. Takma ad: `HB Şanzıman Web`
3. Karşına çıkan **firebaseConfig** bloğunu kopyala — bana bunu göndereceksin:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "hb-sanziman.firebaseapp.com",
  projectId: "hb-sanziman",
  storageBucket: "hb-sanziman.appspot.com",
  messagingSenderId: "...",
  appId: "1:..."
};
```

## 3. Google Girişini Aç

1. Sol menü **Authentication → Get started**
2. **Sign-in method → Google → Etkinleştir** (destek e-postası seç, kaydet)
3. **Settings → Authorized domains**'e siteyi yayınlayacağın alan adını ekle
   (örn. `hbsanziman.com` ve `erberkay.github.io`). `localhost` zaten ekli.

## 4. Firestore Veritabanı Oluştur

1. Sol menü **Firestore Database → Create database**
2. **Production mode** seç, bölge: `eur3` (Avrupa).
3. Bu depodaki [`firestore.rules`](firestore.rules) dosyasındaki kuralları yapıştır
   (Rules sekmesi → yapıştır → Publish).

## 5. Yönetici (Admin) Yetkisi

Panelde tüm randevuları görebilmek için yönetici hesabına "admin" yetkisi verilir.
Bunu senin config'inle birlikte, giriş yapacağın Google e-postana tanımlayacağım
(Firebase Admin ile tek seferlik `admin: true` custom claim).

---

## Bana Göndereceklerin

1. **firebaseConfig** bloğu (2. adım)
2. Yönetici olacak **Google e-posta adresi**
3. Siteyi yayınlayacağın **alan adı** (varsa)

Bunlar gelince: Firebase SDK'yı ekleyip Google girişini gerçek hale getirecek,
randevuları Firestore'a kaydedip admin panelini canlı veriye bağlayacağım.
Config gelene kadar site localStorage ile sorunsuz çalışmaya devam eder.
