/* =========================================================
   HB ŞANZIMAN — Uygulama Mantığı
   Firebase (Auth + Firestore) varsa gerçek backend,
   yoksa localStorage (demo) ile çalışır.
   ========================================================= */
(function () {
  'use strict';

  /* -----------------------------------------------------
     FIREBASE — yapılandırma varsa başlat
  ----------------------------------------------------- */
  const CFG = window.HB_FIREBASE_CONFIG;

  const FB = (() => {
    const ok = CFG && CFG.apiKey && !String(CFG.apiKey).includes('BURAYA') && window.firebase;
    if (!ok) return { on: false };
    try {
      firebase.initializeApp(CFG);
      const auth = firebase.auth();
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
      const provider = new firebase.auth.GoogleAuthProvider();
      // Firestore SDK'sı yalnızca randevu bölümü olan sayfalara yükleniyor
      // (alt sayfalarda ~100 KB boşuna inmesin diye). Yoksa db null kalır;
      // giriş/çıkış etkilenmez, yalnızca veri okuma/yazma devre dışıdır.
      const db = (typeof firebase.firestore === 'function') ? firebase.firestore() : null;
      return { on: true, auth, db, provider };
    } catch (e) {
      console.warn('[HB] Firebase başlatılamadı, localStorage moduna geçiliyor:', e);
      return { on: false };
    }
  })();

  // Firestore gerçekten kullanılabilir mi? (FB.on tek başına yetmez)
  const canDb = () => FB.on && !!FB.db;

  function firebaseErr(e) {
    const m = {
      'auth/popup-closed-by-user': 'Giriş penceresi kapatıldı.',
      'auth/cancelled-popup-request': 'Giriş iptal edildi.',
      'auth/popup-blocked': 'Tarayıcı açılır pencereyi engelledi.',
      'auth/email-already-in-use': 'Bu e-posta zaten kayıtlı.',
      'auth/invalid-email': 'Geçersiz e-posta.',
      'auth/weak-password': 'Şifre çok zayıf (en az 6 karakter).',
      'auth/wrong-password': 'E-posta veya şifre hatalı.',
      'auth/user-not-found': 'E-posta veya şifre hatalı.',
      'auth/invalid-credential': 'E-posta veya şifre hatalı.',
      'auth/operation-not-allowed': 'Bu giriş yöntemi Firebase Console\'da açık değil.',
      'permission-denied': 'Yetki reddedildi (Firestore kuralları).',
    };
    return m[e && e.code] || (e && e.message) || 'Bir hata oluştu.';
  }

  /* -----------------------------------------------------
     STORE — localStorage veri katmanı (Firebase yoksa)
  ----------------------------------------------------- */
  const KEY = { users: 'hb_users', appts: 'hb_appointments', session: 'hb_session' };

  const Store = {
    read(k, fb) { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } },
    write(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
    getUsers() { return this.read(KEY.users, []); },
    saveUsers(u) { this.write(KEY.users, u); },
    getAppts() { return this.read(KEY.appts, []); },
    saveAppts(a) { this.write(KEY.appts, a); },
    getSession() { return this.read(KEY.session, null); },
    setSession(s) { s ? this.write(KEY.session, s) : localStorage.removeItem(KEY.session); },
  };

  /* -----------------------------------------------------
     YARDIMCILAR
  ----------------------------------------------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function simpleHash(str) { let h = 0; for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; } return 'h' + h; }
  function initials(name) { return (name || '?').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase(); }
  function uid() { return 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function refCode() { return 'HB' + String(Date.now()).slice(-6); }

  function normPhone(v) { let d = String(v).replace(/\D/g, ''); if (d.startsWith('90')) d = d.slice(2); if (d.startsWith('0')) d = d.slice(1); return d; }
  function validPhone(v) { const d = normPhone(v); return d.length === 10 && /^[2-5]/.test(d); }
  function fmtPhone(v) { const d = normPhone(v); if (d.length !== 10) return v; return `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`; }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function todayStr() { return new Date().toISOString().split('T')[0]; }

  const STATUS = {
    pending: { label: 'Bekliyor', cls: 'pending' },
    confirmed: { label: 'Onaylandı', cls: 'confirmed' },
    done: { label: 'Tamamlandı', cls: 'done' },
    cancelled: { label: 'İptal', cls: 'cancelled' },
  };

  /* -----------------------------------------------------
     SESSION — oturum durumu (Firebase modunda bellek + mirror)
  ----------------------------------------------------- */
  let SESSION = FB.on ? null : Store.getSession();
  function getSession() { return SESSION; }
  function setSession(s) { SESSION = s; if (!FB.on) Store.setSession(s); }

  /* -----------------------------------------------------
     DATA — randevu veri katmanı (Firestore veya localStorage)
  ----------------------------------------------------- */
  const Data = {
    async create(appt) {
      if (canDb()) return FB.db.collection('appointments').doc(appt.id).set(appt);
      const a = Store.getAppts(); a.push(appt); Store.saveAppts(a);
    },
    async listByUser(userId) {
      if (canDb()) {
        const q = await FB.db.collection('appointments').where('userId', '==', userId).get();
        return q.docs.map(d => d.data()).sort((a, b) => b.createdAt - a.createdAt);
      }
      return Store.getAppts().filter(a => a.userId === userId).sort((a, b) => b.createdAt - a.createdAt);
    },
    // Yönetici işlemleri. Bu fonksiyonların çağrılabiliyor olması yetki VERMEZ:
    // yetkilendirme Firestore güvenlik kurallarındaki isAdmin() ile sunucu
    // tarafında yapılır. İstemci kodunu değiştiren biri paneli açabilir ama
    // Firestore veriyi yine de vermez.
    async listAll() {
      if (!canDb()) return Store.getAppts().sort((a, b) => b.createdAt - a.createdAt);
      const q = await FB.db.collection('appointments').get();
      return q.docs.map(d => d.data()).sort((a, b) => b.createdAt - a.createdAt);
    },
    async setStatus(id, status) {
      if (!canDb()) {
        const a = Store.getAppts(); const x = a.find(v => v.id === id);
        if (x) { x.status = status; Store.saveAppts(a); }
        return;
      }
      return FB.db.collection('appointments').doc(id).update({ status });
    },
    async remove(id) {
      if (!canDb()) { Store.saveAppts(Store.getAppts().filter(v => v.id !== id)); return; }
      return FB.db.collection('appointments').doc(id).delete();
    },
    async saveUserPhone(userId, phone, name) {
      if (canDb()) { try { await FB.db.collection('users').doc(userId).set({ phone, name }, { merge: true }); } catch (e) { /* opsiyonel */ } }
    },
    async getUserPhone(userId) {
      if (canDb()) { try { const d = await FB.db.collection('users').doc(userId).get(); return d.exists ? (d.data().phone || '') : ''; } catch (e) { return ''; } }
      return '';
    },
  };

  /* -----------------------------------------------------
     TOAST
  ----------------------------------------------------- */
  function toast(title, msg, type = 'success') {
    const wrap = $('#toastWrap');
    if (!wrap) return;
    const icons = {
      success: '<path d="M20 6L9 17l-5-5"/>',
      error: '<path d="M18 6L6 18M6 6l12 12"/>',
      info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<div class="t-ic"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">${icons[type]}</svg></div>
      <div><b>${esc(title)}</b>${msg ? `<small>${esc(msg)}</small>` : ''}</div>`;
    wrap.appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 3800);
  }

  /* -----------------------------------------------------
     MODAL
  ----------------------------------------------------- */
  function openModal(id) { $('#' + id).classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal(id) { $('#' + id).classList.remove('open'); if (!$('.modal-overlay.open')) document.body.style.overflow = ''; }
  function bindModals() {
    $$('.modal-overlay').forEach(ov => ov.addEventListener('click', e => { if (e.target === ov) closeModal(ov.id); }));
    $$('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(b.dataset.close)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.modal-overlay.open').forEach(m => closeModal(m.id)); });
  }

  /* -----------------------------------------------------
     AUTH
  ----------------------------------------------------- */
  let authMode = 'login';

  function setAuthMode(mode) {
    authMode = mode;
    if (!$('#authForm')) return; // auth modalı olmayan sayfalar (alt hizmet sayfaları)
    const reg = mode === 'register';
    $('#authTitle').textContent = reg ? 'Hesap Oluştur' : 'Giriş Yap';
    $('#authSubtitle').textContent = reg ? 'Randevu almak için ücretsiz hesap oluşturun' : 'Randevu almak için hesabınıza giriş yapın';
    $('#authSubmit').textContent = reg ? 'Hesap Oluştur' : 'Giriş Yap';
    $('#authSwitchText').textContent = reg ? 'Zaten hesabınız var mı?' : 'Hesabınız yok mu?';
    $('#authSwitchBtn').textContent = reg ? 'Giriş Yap' : 'Kayıt Ol';
    $('#nameField').style.display = reg ? 'flex' : 'none';
    // Firebase modunda telefon üyelikte değil, randevuda alınır
    $('#phoneField').style.display = (reg && !FB.on) ? 'flex' : 'none';
    $('#authForm').querySelector('[name=password]').setAttribute('autocomplete', reg ? 'new-password' : 'current-password');
    clearFieldErrors($('#authForm'));
  }

  function openAuth(mode = 'login') { setAuthMode(mode); openModal('authModal'); }

  // Giriş sonrası nereye gidileceği kullanıcıya göre değişir: yönetici hesabı
  // randevuları yönetmek için giriyor, o yüzden panel doğrudan açılıyor.
  // Diğer herkes için hesabın tek amacı randevu almak.
  //
  // Dikkat: Firebase'de SESSION'ı onAuthStateChanged dolduruyor ve bu asenkron.
  // Giriş anında hemen karar verirsek e-postayı henüz bilmiyor olabiliriz, o
  // yüzden niyeti bayrağa yazıp oturum belli olunca çalıştırıyoruz.
  let pendingPostLogin = false;

  function goToAppointment() {
    pendingPostLogin = true;
    setTimeout(runPostLogin, 150);
  }

  function runPostLogin() {
    if (!pendingPostLogin || !getSession()) return;
    pendingPostLogin = false;

    if (isAdminUser()) {
      // Panel yalnızca ana sayfada var; alt sayfadan giren yöneticiyi oraya al.
      if ($('#adminPanel')) openAdmin();
      else location.href = '/#randevu';
      return;
    }
    const el = document.getElementById('randevu');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function clearFieldErrors(form) { $$('.field.invalid', form).forEach(f => f.classList.remove('invalid')); }
  function markInvalid(input, msg) {
    const field = input.closest('.field');
    field.classList.add('invalid');
    if (msg) { const err = $('.err', field); if (err) err.textContent = msg; }
  }

  async function handleAuthSubmit(e) {
    e.preventDefault();
    const form = e.target;
    clearFieldErrors(form);
    const data = Object.fromEntries(new FormData(form));
    let ok = true;

    if (authMode === 'register' && (!data.name || data.name.trim().length < 2)) { markInvalid(form.name, 'Lütfen adınızı girin.'); ok = false; }
    if (!validEmail(data.email)) { markInvalid(form.email, 'Geçerli bir e-posta girin.'); ok = false; }
    if (authMode === 'register' && !FB.on && !validPhone(data.phone)) { markInvalid(form.phone, 'Geçerli bir telefon girin.'); ok = false; }
    if (!data.password || data.password.length < 6) { markInvalid(form.password, 'Şifre en az 6 karakter olmalı.'); ok = false; }
    if (!ok) return;

    // --- Firebase Auth (e-posta/şifre) ---
    if (FB.on) {
      const btn = $('#authSubmit'); btn.disabled = true;
      try {
        if (authMode === 'register') {
          const cred = await FB.auth.createUserWithEmailAndPassword(data.email.trim(), data.password);
          await cred.user.updateProfile({ displayName: data.name.trim() });
          await Data.saveUserPhone(cred.user.uid, '', data.name.trim());
          toast('Hoş geldiniz, ' + data.name.trim().split(' ')[0] + '!', 'Hesabınız oluşturuldu.', 'success');
        } else {
          await FB.auth.signInWithEmailAndPassword(data.email.trim(), data.password);
          toast('Tekrar hoş geldiniz!', '', 'success');
        }
        closeModal('authModal'); form.reset(); goToAppointment();
      } catch (err) {
        markInvalid(form.password, firebaseErr(err));
      } finally { btn.disabled = false; }
      return;
    }

    // --- localStorage (demo) ---
    const users = Store.getUsers();
    if (authMode === 'register') {
      if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) { markInvalid(form.email, 'Bu e-posta zaten kayıtlı.'); return; }
      const user = { id: uid(), name: data.name.trim(), email: data.email.toLowerCase(), phone: fmtPhone(data.phone), pass: simpleHash(data.password), provider: 'email', createdAt: Date.now() };
      users.push(user); Store.saveUsers(users);
      loginSessionLocal(user); closeModal('authModal'); goToAppointment();
      toast('Hoş geldiniz, ' + user.name.split(' ')[0] + '!', 'Hesabınız oluşturuldu.', 'success');
    } else {
      const user = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
      if (!user || user.pass !== simpleHash(data.password)) { markInvalid(form.password, 'E-posta veya şifre hatalı.'); return; }
      loginSessionLocal(user); closeModal('authModal'); goToAppointment();
      toast('Tekrar hoş geldiniz!', user.name, 'success');
    }
    form.reset();
  }

  async function handleGoogleLogin() {
    if (FB.on) {
      try {
        await FB.auth.signInWithPopup(FB.provider);
        closeModal('authModal'); goToAppointment();
        toast('Google ile giriş yapıldı', '', 'success');
      } catch (err) {
        toast('Giriş yapılamadı', firebaseErr(err), 'error');
      }
      return;
    }
    // demo
    const users = Store.getUsers();
    let user = users.find(u => u.provider === 'google');
    if (!user) { user = { id: uid(), name: 'Google Kullanıcısı', email: 'kullanici@gmail.com', phone: '', pass: null, provider: 'google', createdAt: Date.now() }; users.push(user); Store.saveUsers(users); }
    loginSessionLocal(user); closeModal('authModal'); goToAppointment();
    toast('Google ile giriş yapıldı', 'Demo modu — randevuda telefonunuzu ekleyin.', 'success');
  }

  // localStorage modunda oturum aç
  function loginSessionLocal(user) {
    setSession({ id: user.id, name: user.name, email: user.email, phone: user.phone || '', provider: user.provider });
    renderAuthUI(); renderApptCard();
  }

  async function logout() {
    closeAdmin();
    if (FB.on) { try { await FB.auth.signOut(); } catch (e) {} }
    else { setSession(null); renderAuthUI(); renderApptCard(); }
    toast('Çıkış yapıldı', 'Tekrar bekleriz!', 'info');
  }

  function renderAuthUI() {
    const s = getSession();
    const area = $('#navAuthArea');
    if (!area) return;
    if (s) {
      area.innerHTML = `<div class="nav-user">
        ${(isAdminUser() && $('#adminPanel')) ? '<button class="btn btn-primary btn-sm" id="navAdminBtn">Randevular</button>' : ''}
        <div class="avatar" title="${esc(s.name)}">${esc(initials(s.name))}</div>
        <button class="btn btn-ghost btn-sm" id="navLogoutBtn">Çıkış</button>
      </div>`;
      $('#navLogoutBtn').addEventListener('click', logout);
      const ab = $('#navAdminBtn');
      if (ab) ab.addEventListener('click', openAdmin);
    } else {
      area.innerHTML = `<button class="btn btn-ghost btn-sm" id="navLoginBtn">Giriş Yap</button>`;
      $('#navLoginBtn').addEventListener('click', () => openAuth('login'));
    }
    renderMobileLogout();
  }

  // Mobilde nav çubuğu giriş sonrası taşıyordu; "Çıkış" düğmesi orada gizlenip
  // hamburger menüsünün sonuna taşındı. Masaüstünde bu satır görünmez (CSS).
  function renderMobileLogout() {
    const menu = $('#navLinks');
    if (!menu) return;
    const eski = $('#navLogoutMobile');
    if (eski) eski.parentElement.remove();
    if (!getSession()) return;
    const li = document.createElement('li');
    li.className = 'nav-only-mobile';
    li.innerHTML = '<button type="button" id="navLogoutMobile">Çıkış yap</button>';
    menu.appendChild(li);
    li.querySelector('button').addEventListener('click', () => {
      menu.classList.remove('open');
      logout();
    });
  }

  // Firebase oturum değişimini izle
  function watchFirebaseAuth() {
    FB.auth.onAuthStateChanged(async (u) => {
      if (u) {
        const phone = await Data.getUserPhone(u.uid);
        SESSION = {
          id: u.uid,
          name: u.displayName || (u.email || 'Kullanıcı').split('@')[0],
          email: (u.email || '').toLowerCase(),
          phone: phone || '',
          provider: (u.providerData[0] && u.providerData[0].providerId) || 'password',
        };
      } else {
        SESSION = null;
      }
      renderAuthUI();
      renderApptCard();
      runPostLogin(); // oturum artık belli — bekleyen giriş sonrası iş varsa şimdi
    });
  }

  /* -----------------------------------------------------
     YÖNETİCİ PANELİ
     Yetki Firestore kurallarında (isAdmin) tanımlı; buradaki kontrol
     yalnızca arayüzü göstermek/gizlemek için. Gerçek koruma sunucuda.
  ----------------------------------------------------- */
  const ADMIN_EMAIL = 'hbotomatiksanziman16@gmail.com';
  let adminCache = [];

  function isAdminUser() {
    const s = getSession();
    return !!s && (s.email || '').toLowerCase() === ADMIN_EMAIL;
  }

  function openAdmin() {
    const panel = $('#adminPanel');
    if (!panel) return;
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
    loadAdmin();
  }

  function closeAdmin() {
    const panel = $('#adminPanel');
    if (!panel) return;
    panel.classList.remove('open');
    document.body.style.overflow = '';
  }

  async function loadAdmin() {
    const body = $('#adminBody');
    if (!body) return;
    body.innerHTML = '<div class="admin-empty">Randevular yükleniyor…</div>';
    try {
      adminCache = await Data.listAll();
    } catch (err) {
      body.innerHTML = `<div class="admin-empty">Randevular okunamadı.<br><small>${esc(firebaseErr(err))}</small></div>`;
      return;
    }
    renderAdmin();
  }

  function renderAdmin() {
    const body = $('#adminBody');
    if (!body) return;
    const q = ($('#adminSearch') && $('#adminSearch').value || '').trim().toLowerCase();
    const f = ($('#adminFilter') && $('#adminFilter').value) || 'all';

    let rows = adminCache;
    if (f !== 'all') rows = rows.filter(a => a.status === f);
    if (q) rows = rows.filter(a => [a.name, a.phone, a.vehicle, a.ref, a.email].join(' ').toLowerCase().includes(q));

    const counts = adminCache.reduce((m, a) => { m[a.status] = (m[a.status] || 0) + 1; return m; }, {});
    const stat = $('#adminStats');
    if (stat) {
      stat.innerHTML = Object.keys(STATUS).map(k =>
        `<div class="astat"><b>${counts[k] || 0}</b><span>${STATUS[k].label}</span></div>`).join('')
        + `<div class="astat"><b>${adminCache.length}</b><span>Toplam</span></div>`;
    }

    if (!rows.length) {
      body.innerHTML = '<div class="admin-empty">Kayıt bulunamadı.</div>';
      return;
    }

    body.innerHTML = rows.map(a => {
      const st = STATUS[a.status] || STATUS.pending;
      return `<div class="arow" data-id="${esc(a.id)}">
        <div class="arow-main">
          <div class="arow-top">
            <b>${esc(a.name)}</b>
            <span class="badge ${st.cls}">${st.label}</span>
            <span class="aref">${esc(a.ref || '')}</span>
          </div>
          <div class="arow-meta">
            <a href="tel:${esc((a.phone || '').replace(/\s/g, ''))}">${esc(a.phone || '')}</a>
            <span>${esc(a.vehicle || '')}</span>
            <span>${esc(a.service || '')}</span>
            <span>${esc(a.date || '')} ${esc(a.time || '')}</span>
          </div>
          ${a.note ? `<div class="arow-note">${esc(a.note)}</div>` : ''}
        </div>
        <div class="arow-actions">
          <select class="astatus" data-id="${esc(a.id)}">
            ${Object.keys(STATUS).map(k => `<option value="${k}"${k === a.status ? ' selected' : ''}>${STATUS[k].label}</option>`).join('')}
          </select>
          <button class="adel" data-id="${esc(a.id)}" title="Sil" aria-label="Randevuyu sil">Sil</button>
        </div>
      </div>`;
    }).join('');

    $$('.astatus').forEach(sel => sel.addEventListener('change', async (e) => {
      const id = e.target.dataset.id, status = e.target.value;
      try {
        await Data.setStatus(id, status);
        const x = adminCache.find(v => v.id === id); if (x) x.status = status;
        renderAdmin();
        toast('Durum güncellendi', '', 'success');
      } catch (err) { toast('Güncellenemedi', firebaseErr(err), 'error'); }
    }));

    $$('.adel').forEach(btn => btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      const rec = adminCache.find(v => v.id === id);
      if (!confirm(`${rec ? rec.name : 'Bu'} randevusu silinsin mi? Bu işlem geri alınamaz.`)) return;
      try {
        await Data.remove(id);
        adminCache = adminCache.filter(v => v.id !== id);
        renderAdmin();
        toast('Randevu silindi', '', 'success');
      } catch (err) { toast('Silinemedi', firebaseErr(err), 'error'); }
    }));
  }

  /* -----------------------------------------------------
     RANDEVU
  ----------------------------------------------------- */
  const SERVICES = ['Otomatik Şanzıman Tamiri', 'Tork Konvertörü Tamiri', 'DSG / CVT Şanzıman', 'Şanzıman Revizyonu', 'Arıza Tespiti (Diagnostik)', 'Şanzıman Yağı & Bakım', 'Diğer / Emin Değilim'];
  const GEARTYPES = ['Otomatik', 'Yarı Otomatik', 'DSG (Çift Kavrama)', 'CVT', 'Bilmiyorum'];
  const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:30', '14:30', '15:30', '16:30', '17:30'];

  const GOOGLE_SVG = `<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.5c5.4 0 10.3-2 14-5.3l-6.5-5.5c-2 1.5-4.6 2.3-7.5 2.3-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39 16.2 43.5 24 43.5z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.5 5.5c-.5.4 6.7-4.9 6.7-15 0-1.2-.1-2.3-.9-3.5z"/></svg>`;

  function renderApptCard() {
    if (!$('#apptCard')) return; // randevu bölümü olmayan sayfalar
    const card = $('#apptCard');
    const s = getSession();

    if (!s) {
      card.innerHTML = `
        <div class="auth-gate">
          <div class="lock-ic"><svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
          <h3>Randevu için giriş yapın</h3>
          <p>Randevu oluşturmak için hesabınızla giriş yapın veya hızlıca ücretsiz hesap oluşturun.</p>
          <button class="btn-google" id="gateGoogle" style="margin-bottom:14px">${GOOGLE_SVG} Google ile devam et</button>
          <button class="btn btn-ghost btn-block" id="gateEmail">E-posta ile giriş / kayıt</button>
        </div>`;
      $('#gateGoogle').addEventListener('click', handleGoogleLogin);
      $('#gateEmail').addEventListener('click', () => openAuth('login'));
      return;
    }

    const serviceOpts = SERVICES.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join('');
    const gearOpts = GEARTYPES.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join('');
    const timeOpts = TIMES.map(x => `<option value="${x}">${x}</option>`).join('');

    card.innerHTML = `
      <div class="logged-user-chip">
        <div class="avatar">${esc(initials(s.name))}</div>
        <div><b>${esc(s.name)}</b><small>${esc(s.email)}</small></div>
      </div>
      <form id="apptForm" novalidate>
        <div class="form-grid">
          <div class="field">
            <label>Ad Soyad <span class="req">*</span></label>
            <input type="text" name="name" value="${esc(s.name)}" placeholder="Adınız Soyadınız">
            <div class="err">Lütfen adınızı girin.</div>
          </div>
          <div class="field">
            <label>Telefon <span class="req">*</span></label>
            <input type="tel" name="phone" value="${esc(s.phone || '')}" placeholder="0(5xx) xxx xx xx" inputmode="tel">
            <div class="err">Geçerli bir telefon numarası girin.</div>
          </div>
          <div class="field">
            <label>Araç Marka / Model <span class="req">*</span></label>
            <input type="text" name="vehicle" placeholder="Örn. Volkswagen Passat 2018">
            <div class="err">Araç bilgisini girin.</div>
          </div>
          <div class="field">
            <label>Şanzıman Tipi</label>
            <select name="gearType">${gearOpts}</select>
          </div>
          <div class="field">
            <label>Hizmet <span class="req">*</span></label>
            <select name="service">${serviceOpts}</select>
          </div>
          <div class="field">
            <label>Tercih Edilen Tarih <span class="req">*</span></label>
            <input type="date" name="date" min="${todayStr()}">
            <div class="err">Geçerli bir tarih seçin.</div>
          </div>
          <div class="field">
            <label>Tercih Edilen Saat <span class="req">*</span></label>
            <select name="time">${timeOpts}</select>
          </div>
          <div class="field full">
            <label>Sorunun Açıklaması</label>
            <textarea name="note" placeholder="Aracınızdaki belirtileri kısaca anlatın (ses, sarsıntı, vites atlaması vb.)"></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block" id="apptSubmitBtn" style="margin-top:20px">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
          Randevuyu Onayla
        </button>
        <p class="form-note">Randevunuz için telefon numaranız zorunludur; onay araması yapılabilir.</p>
      </form>
      <div id="myApptsWrap"></div>`;

    $('#apptForm').addEventListener('submit', handleApptSubmit);
    loadMyAppts(s.id);
  }

  async function loadMyAppts(userId) {
    let list = [];
    try { list = await Data.listByUser(userId); } catch (e) { return; }
    const wrap = $('#myApptsWrap');
    if (!wrap || !list.length) return;
    const rows = list.slice(0, 4).map(a => {
      const st = STATUS[a.status] || STATUS.pending;
      return `<div class="appt-summary" style="margin-bottom:10px">
        <div class="r"><span>Randevu No</span><b>${esc(a.ref)}</b></div>
        <div class="r"><span>Tarih</span><b>${esc(a.date)} · ${esc(a.time)}</b></div>
        <div class="r"><span>Hizmet</span><b>${esc(a.service)}</b></div>
        <div class="r"><span>Durum</span><span class="badge ${st.cls}">${st.label}</span></div>
      </div>`;
    }).join('');
    wrap.innerHTML = `<div style="margin-top:28px;border-top:1px solid var(--border);padding-top:22px">
      <h4 style="font-family:var(--ff-display);margin-bottom:14px">Randevularım</h4>${rows}</div>`;
  }

  async function handleApptSubmit(e) {
    e.preventDefault();
    const form = e.target;
    clearFieldErrors(form);
    const d = Object.fromEntries(new FormData(form));
    let ok = true;

    if (!d.name || d.name.trim().length < 2) { markInvalid(form.name, 'Lütfen adınızı girin.'); ok = false; }
    if (!validPhone(d.phone)) { markInvalid(form.phone, 'Geçerli bir telefon numarası girin.'); ok = false; }
    if (!d.vehicle || d.vehicle.trim().length < 2) { markInvalid(form.vehicle, 'Araç bilgisini girin.'); ok = false; }
    if (!d.date || d.date < todayStr()) { markInvalid(form.date, 'Bugün veya ileri bir tarih seçin.'); ok = false; }
    if (!ok) { toast('Formu kontrol edin', 'Zorunlu alanları doldurun.', 'error'); return; }

    const s = getSession();
    const appt = {
      ref: refCode(), id: uid(), userId: s.id,
      name: d.name.trim(), phone: fmtPhone(d.phone), email: s.email,
      vehicle: d.vehicle.trim(), gearType: d.gearType, service: d.service,
      date: d.date, time: d.time, note: (d.note || '').trim(),
      status: 'pending', createdAt: Date.now(),
    };

    const btn = $('#apptSubmitBtn'); if (btn) btn.disabled = true;
    try {
      await Data.create(appt);
    } catch (err) {
      if (btn) btn.disabled = false;
      toast('Randevu kaydedilemedi', firebaseErr(err), 'error');
      return;
    }

    // Telefonu profile kaydet (bir dahaki sefer hazır gelsin)
    if (!s.phone) {
      s.phone = appt.phone;
      if (canDb()) { Data.saveUserPhone(s.id, appt.phone, s.name); }
      else { setSession(s); const us = Store.getUsers(); const u = us.find(x => x.id === s.id); if (u) { u.phone = appt.phone; Store.saveUsers(us); } }
    }

    showApptSuccess(appt);
    toast('Randevu oluşturuldu!', 'No: ' + appt.ref, 'success');
  }

  function showApptSuccess(a) {
    const card = $('#apptCard');
    card.innerHTML = `
      <div class="appt-success">
        <div class="check"><svg width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></div>
        <h3>Randevunuz Alındı!</h3>
        <p>Talebiniz bize ulaştı. En kısa sürede telefonla onay için sizi arayacağız.</p>
        <div class="ref-code">${esc(a.ref)}</div>
        <div class="appt-summary">
          <div class="r"><span>Ad Soyad</span><b>${esc(a.name)}</b></div>
          <div class="r"><span>Telefon</span><b>${esc(a.phone)}</b></div>
          <div class="r"><span>Araç</span><b>${esc(a.vehicle)}</b></div>
          <div class="r"><span>Hizmet</span><b>${esc(a.service)}</b></div>
          <div class="r"><span>Tarih / Saat</span><b>${esc(a.date)} · ${esc(a.time)}</b></div>
          <div class="r"><span>Durum</span><span class="badge pending">Bekliyor</span></div>
        </div>
        <button class="btn btn-primary btn-block" id="newApptBtn">Yeni Randevu Oluştur</button>
      </div>`;
    $('#newApptBtn').addEventListener('click', renderApptCard);
  }

  /* -----------------------------------------------------
     ADMIN — KALDIRILDI (güvenlik)
     Yönetici paneli herkese açık siteden tamamen çıkarıldı. Statik bir sitede
     istemci tarafında güvenli yetkilendirme yapılamaz: tarayıcıya inen her şey
     okunabilir, bu yüzden şifreyi gömmek/hash'lemek koruma sağlamaz.
     Randevular Firebase Console üzerinden yönetilir.
  ----------------------------------------------------- */

  /* -----------------------------------------------------
     UI
  ----------------------------------------------------- */
  function bindUI() {
    const nav = $('#nav');
    if (nav) {
      const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
      window.addEventListener('scroll', onScroll); onScroll();
    }

    // Footer link kolonları mobilde kapalı başlasın (masaüstünde açık kalır).
    // <details open> HTML'de duruyor ki JS çalışmazsa içerik erişilebilir olsun.
    if (window.matchMedia('(max-width: 720px)').matches) {
      $$('.footer-col[open]').forEach(d => d.removeAttribute('open'));
    }

    const burger = $('#hamburger'), links = $('#navLinks');
    if (burger && links) {
      burger.addEventListener('click', () => links.classList.toggle('open'));
      $$('#navLinks a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
    }

    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => io.observe(el));
  }

  /* -----------------------------------------------------
     BAŞLANGIÇ
  ----------------------------------------------------- */
  function init() {
    bindModals();
    bindUI();
    renderAuthUI();
    renderApptCard();

    // Alt hizmet sayfalarında randevu formu yok, auth modalı var. Her biri ayrı kontrol
    // ediliyor ki sayfa bileşimi ne olursa olsun JS hata vermesin.
    const authForm = $('#authForm');
    if (authForm) authForm.addEventListener('submit', handleAuthSubmit);
    const googleBtn = $('#googleBtn');
    if (googleBtn) googleBtn.addEventListener('click', handleGoogleLogin);
    const switchBtn = $('#authSwitchBtn');
    if (switchBtn) switchBtn.addEventListener('click', () => setAuthMode(authMode === 'login' ? 'register' : 'login'));

    const adminClose = $('#adminCloseBtn');
    if (adminClose) adminClose.addEventListener('click', closeAdmin);
    const adminRefresh = $('#adminRefreshBtn');
    if (adminRefresh) adminRefresh.addEventListener('click', loadAdmin);
    const adminSearch = $('#adminSearch');
    if (adminSearch) adminSearch.addEventListener('input', renderAdmin);
    const adminFilter = $('#adminFilter');
    if (adminFilter) adminFilter.addEventListener('change', renderAdmin);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAdmin(); });
    $('#navLoginBtn') && $('#navLoginBtn').addEventListener('click', () => openAuth('login'));

    if (FB.on) { setAuthMode('login'); watchFirebaseAuth(); }
    else { seedDemo(); }
  }

  function seedDemo() {
    if (Store.getAppts().length || localStorage.getItem('hb_seeded')) return;
    localStorage.setItem('hb_seeded', '1');
    const now = Date.now();
    const demo = [
      { ref: 'HB100234', id: uid(), userId: 'demo', name: 'Ahmet Yılmaz', phone: '0532 111 22 33', email: 'ahmet@example.com', vehicle: 'BMW 320i 2017', gearType: 'Otomatik', service: 'Otomatik Şanzıman Tamiri', date: todayStr(), time: '10:00', note: 'Vites geçişlerinde sarsıntı var.', status: 'pending', createdAt: now - 3600e3 },
      { ref: 'HB100235', id: uid(), userId: 'demo', name: 'Elif Demir', phone: '0505 444 55 66', email: 'elif@example.com', vehicle: 'Audi A4 2019', gearType: 'DSG (Çift Kavrama)', service: 'DSG / CVT Şanzıman', date: todayStr(), time: '13:30', note: 'Mekatronik arıza uyarısı.', status: 'confirmed', createdAt: now - 7200e3 },
    ];
    Store.saveAppts(demo);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
