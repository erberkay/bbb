# HB Şanzıman — Kurumsal Web Sitesi & Randevu Sistemi

Bursa / Nilüfer'de faaliyet gösteren **HB Şanzıman** için hazırlanmış, profesyonel tanıtım ve online randevu web sitesi.

## ✨ Özellikler

- **Modern kurumsal tasarım** — koyu tema, mavi vurgular, tam responsive (mobil/tablet/masaüstü)
- **Online randevu sistemi** — telefon numarası zorunlu + doğrulamalı
- **Üyelik / Giriş** — Google ile giriş (demo) veya e-posta ile hesap oluşturma
- **Bölümler** — Hizmetler, Uzmanlık Alanlarımız (şanzıman tipleri ve marka grupları), Neden Biz, Çalışma Süreci, İletişim (Google Haritalar)

## 🗂 Dosya Yapısı

```
HB-Sanziman/
├── index.html          # Ana site + tüm bölümler ve modallar
├── assets/
│   ├── styles.css      # Tasarım sistemi / stiller
│   ├── app.js          # Randevu, giriş, admin ve arayüz mantığı
│   ├── logo.svg        # HB monogram logo
│   └── gear.svg        # Arka plan dişli görseli
└── README.md
```

## 🚀 Çalıştırma

Statik bir sitedir, kurulum gerektirmez. Yerel önizleme için:

```bash
cd HB-Sanziman
python3 -m http.server 8123
# tarayıcı: http://localhost:8123
```

## 🔑 Randevuları Görüntüleme

Yönetici paneli **güvenlik gerekçesiyle siteden kaldırılmıştır.**

Sebep: Bu tamamen statik bir sitedir. Tarayıcıya inen her şey — HTML, CSS, JavaScript — ziyaretçi tarafından okunabilir. Bu yüzden istemci tarafında tutulan bir şifre, nasıl saklanırsa saklansın (düz metin, base64, hash) gerçek bir koruma sağlamaz. Eski sabit kodlanmış yönetici girişi sayfa kaynağında herkese açıktı ve müşteri ad/telefon bilgilerine erişim veriyordu.

Randevular artık **Firebase Console** üzerinden yönetilir:
`Firebase Console > Firestore Database > appointments`

Gerçek bir yönetim paneli istenirse, yetkilendirme sunucu tarafında yapılmalıdır (Firebase Authentication + Firestore güvenlik kuralları veya Cloud Functions).

## 📌 Yayına Alma Notları (Öneriler)

Şu an tüm veriler (kullanıcılar, randevular) tarayıcıda `localStorage` üzerinde tutulur — **demo/prototip** amaçlıdır. Gerçek kullanım için:

1. **Backend**: Firebase Firestore veya bir sunucu ile randevuları merkezî olarak saklayın.
2. **Google Girişi**: Firebase Authentication ya da Google Identity Services ile gerçek OAuth entegrasyonu.
3. **Telefon / e-posta bildirimi**: Yeni randevularda SMS/e-posta bildirimi.
4. Güncellenecek yer tutucular: telefon numarası (`0224 000 00 00`), e-posta (`info@hbsanziman.com`).

## 📍 İletişim

Üçevler, 28. Sk. 27. Blok No:51, 16270 Nilüfer / Bursa
