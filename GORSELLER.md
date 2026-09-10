# Görseller — durum ve yapılacaklar

## 1. Marka bölümüne fotoğraf ekleme (yarım kalan iş)

Marka kartlarına teknik fotoğraf istenmişti. **Fotoğraflar eklenemedi:** bu iş
bilgisayarında değil, dışarı internet erişimi kapalı bir ortamda yapıldı;
Unsplash ve Pexels'ten görsel indirilemedi.

Kartların HTML ve CSS'i **fotoğrafa hazır**. Bir kartın içine `<img>` koyduğunuz
anda tipografik plaka (`.brand-plate`) otomatik gizlenir, fotoğraf 16:9 oranında
yerine oturur. Yapılacak tek şey dosyayı koymak ve satırı eklemek.

### Adım adım

1. Aşağıdaki dosya adlarıyla 7 fotoğraf hazırlayın:

   | Dosya | Kart | Ne fotoğrafı olmalı |
   |---|---|---|
   | `assets/img/brands/bmw.webp` | BMW | Şanzıman gövdesi / valf gövdesi |
   | `assets/img/brands/mercedes.webp` | Mercedes-Benz | Otomatik şanzıman kesiti |
   | `assets/img/brands/vag.webp` | VAG Grubu | Çift kavrama paketi |
   | `assets/img/brands/porsche.webp` | Porsche | Mekatronik ünitesi |
   | `assets/img/brands/landrover.webp` | Land Rover | Tork konvertörü |
   | `assets/img/brands/opel.webp` | Opel | Dişli takımı / planet seti |
   | `assets/img/brands/ford.webp` | Ford | Kavrama diski / TCM |

2. Ölçü: **400 × 225 piksel** (16:9), WebP, kalite 80. Kart genişliği en fazla
   200px olduğu için daha büyüğü boşuna byte.

3. `index.html` içinde ilgili kartta `<span class="brand-plate">…</span>`
   satırının **üstüne** şunu ekleyin:

   ```html
   <img src="/assets/img/brands/bmw.webp" width="400" height="225" loading="lazy"
        alt="ZF 8HP otomatik şanzıman gövdesi">
   ```

   Plakayı silmenize gerek yok; CSS `:has(img)` ile kendiliğinden gizler.
   Fotoğraf bulunamayan markada plaka görünmeye devam eder, karışık durmaz.

### Nereden bulunur

Ücretsiz ticari kullanıma açık, **yapay zekâ üretimi olmayan** kaynaklar:

- Unsplash — <https://unsplash.com/s/photos/car-transmission>,
  <https://unsplash.com/s/photos/gearbox>, <https://unsplash.com/s/photos/clutch>
- Pexels — <https://www.pexels.com/search/car%20transmission/>

**Unsplash+ / iStock işaretli olanları almayın**, onlar ücretli.

Seçerken: parlak reklam görseli değil, tezgâh üstünde parça fotoğrafı arayın.
Vites topuzu ve direksiyon fotoğrafları çok çıkıyor — bunlar şanzıman tamirini
anlatmıyor, kullanmayın.

### En iyisi: kendi atölye fotoğraflarınız

Yukarıdakilerin hepsi ikinci en iyi çözüm. Kurumsal algıyı en çok belirleyen şey
gerçek atölye fotoğrafı. Telefonla çekilmiş 7 kare yeter: tezgâhta sökülü bir
kutu, mekatronik ünitesi, valf gövdesi, kavrama paketi, tork konvertörü, dişli
takımı, dükkân cephesi. Bunlar stok fotoğrafın yapamadığı şeyi yapar — bu işi
sizin yaptığınızı gösterir.

---

## 2. Hero fotoğrafı

`assets/img/hero-workshop.webp` — Mehmet Talha Onuk, Unsplash Lisansı
(ücretsiz ticari kullanım). Atıf `index.html` içinde yorum olarak duruyor,
lisans gereği **silmeyin**.

Not: fotoğraf büyük bir yetkili servis atölyesini gösteriyor. Kendi
atölyenizin fotoğrafıyla değiştirilmesi hem daha dürüst hem daha etkili olur.

---

## 3. Silinmesi gereken dosyalar

`assets/img/brands/` altındaki 11 marka logosu (`bmw.svg`, `mercedes.webp`,
`audi.webp`, `volkswagen.svg`, `seat.svg`, `skoda.webp`, `cupra.svg`,
`porsche.svg`, `landrover.svg`, `opel.svg`, `ford.svg`) **artık hiçbir
sayfadan çağrılmıyor.**

Tescilli marka oldukları için siteden kaldırıldılar. Çalıştığım ortam dosya
silme izni vermediği için diskte duruyorlar. Elle silin:

```
rm assets/img/brands/*.svg assets/img/brands/*.webp
```

(Yukarıdaki tablodaki yeni fotoğrafları koyacaksanız önce silin, sonra koyun.)
