# HB Şanzıman — Kurumsal Web Sitesi & Randevu Sistemi

Bursa / Nilüfer'de faaliyet gösteren **HB Şanzıman** için hazırlanmış, profesyonel tanıtım ve online randevu web sitesi.

## ✨ Özellikler

- **Modern kurumsal tasarım** — koyu tema, altın vurgular, tam responsive (mobil/tablet/masaüstü)
- **Online randevu sistemi** — telefon numarası zorunlu + doğrulamalı
- **Üyelik / Giriş** — Google ile giriş (demo) veya e-posta ile hesap oluşturma
- **Yönetici paneli** — randevu listesi, durum yönetimi, arama/filtreleme, CSV dışa aktarma
- **Bölümler** — Hizmetler, Neden Biz, Çalışma Süreci, İletişim (Google Haritalar)

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

## 🔑 Yönetici Girişi

Sitenin en altındaki **"Yönetici Girişi"** bağlantısından:

- Kullanıcı adı: `admin`
- Şifre: `hb2024`

> ⚠️ Bu bilgiler `assets/app.js` içinde `ADMIN_CREDS` sabitindedir. Yayına almadan önce mutlaka değiştirin ve gerçek doğrulamayı sunucu tarafında yapın.

## 📌 Yayına Alma Notları (Öneriler)

Şu an tüm veriler (kullanıcılar, randevular) tarayıcıda `localStorage` üzerinde tutulur — **demo/prototip** amaçlıdır. Gerçek kullanım için:

1. **Backend**: Firebase Firestore veya bir sunucu ile randevuları merkezî olarak saklayın.
2. **Google Girişi**: Firebase Authentication ya da Google Identity Services ile gerçek OAuth entegrasyonu.
3. **Telefon / e-posta bildirimi**: Yeni randevularda SMS/e-posta bildirimi.
4. Güncellenecek yer tutucular: telefon numarası (`0224 000 00 00`), e-posta (`info@hbsanziman.com`).

## 📍 İletişim

Üçevler, 28. Sk. 27. Blok No:51, 16120 Nilüfer / Bursa
