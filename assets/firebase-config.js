/* =========================================================
   HB ŞANZIMAN — Firebase Yapılandırması
   Firebase Console > Proje Ayarları > Genel > Uygulamalarınız
   ========================================================= */
window.HB_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBgoeoSTTj0K4qRaUMwE1NAhMTffxo9_rk",
  authDomain: "hb-sanziman.firebaseapp.com",
  projectId: "hb-sanziman",
  storageBucket: "hb-sanziman.firebasestorage.app",
  messagingSenderId: "1040578137610",
  appId: "1:1040578137610:web:98f2655381c10580fa19f3",
  measurementId: "G-7GJR4C4N4H"
};

// NOT: HB_ADMIN_EMAIL kaldırıldı — yönetici paneli güvenlik gerekçesiyle
// herkese açık siteden çıkarıldı. Randevular Firebase Console üzerinden yönetilir.
// Yetkilendirme yeniden eklenecekse sunucu tarafında (Firestore güvenlik
// kuralları / Cloud Functions) yapılmalıdır, istemci kodunda değil.
