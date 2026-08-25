/* =========================================================
   HB ŞANZIMAN — Uygulama Mantığı
   Veri katmanı (Store) + Auth + Randevu + Admin + UI
   NOT: Demo amaçlı veriler tarayıcıda (localStorage) tutulur.
        Gerçek ortam için Firebase/sunucu entegrasyonu önerilir.
   ========================================================= */
(function () {
  'use strict';

  /* -----------------------------------------------------
     STORE — localStorage veri katmanı ("backend" simülasyonu)
  ----------------------------------------------------- */
  const KEY = { users: 'hb_users', appts: 'hb_appointments', session: 'hb_session', admin: 'hb_admin_session' };
  const ADMIN_CREDS = { username: 'admin', password: 'hb2024' }; // Üretimde sunucu tarafında doğrulanmalı

  const Store = {
    read(k, fallback) { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } },
    write(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
    getUsers() { return this.read(KEY.users, []); },
    saveUsers(u) { this.write(KEY.users, u); },
    getAppts() { return this.read(KEY.appts, []); },
    saveAppts(a) { this.write(KEY.appts, a); },
    getSession() { return this.read(KEY.session, null); },
    setSession(s) { s ? this.write(KEY.session, s) : localStorage.removeItem(KEY.session); },
    isAdmin() { return this.read(KEY.admin, false) === true; },
    setAdmin(v) { v ? this.write(KEY.admin, true) : localStorage.removeItem(KEY.admin); },
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

  // Türkiye telefon doğrulama & biçimlendirme
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
     TOAST bildirimleri
  ----------------------------------------------------- */
  function toast(title, msg, type = 'success') {
    const wrap = $('#toastWrap');
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
     MODAL kontrolü
  ----------------------------------------------------- */
  function openModal(id) { $('#' + id).classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal(id) { $('#' + id).classList.remove('open'); if (!$('.modal-overlay.open')) document.body.style.overflow = ''; }
  function bindModals() {
    $$('.modal-overlay').forEach(ov => ov.addEventListener('click', e => { if (e.target === ov) closeModal(ov.id); }));
    $$('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(b.dataset.close)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.modal-overlay.open').forEach(m => closeModal(m.id)); });
  }

  /* -----------------------------------------------------
     AUTH — kayıt / giriş / Google / çıkış
  ----------------------------------------------------- */
  let authMode = 'login'; // 'login' | 'register'

  function setAuthMode(mode) {
    authMode = mode;
    const reg = mode === 'register';
    $('#authTitle').textContent = reg ? 'Hesap Oluştur' : 'Giriş Yap';
    $('#authSubtitle').textContent = reg ? 'Randevu almak için ücretsiz hesap oluşturun' : 'Randevu almak için hesabınıza giriş yapın';
    $('#authSubmit').textContent = reg ? 'Hesap Oluştur' : 'Giriş Yap';
    $('#authSwitchText').textContent = reg ? 'Zaten hesabınız var mı?' : 'Hesabınız yok mu?';
    $('#authSwitchBtn').textContent = reg ? 'Giriş Yap' : 'Kayıt Ol';
    $('#nameField').style.display = reg ? 'flex' : 'none';
    $('#phoneField').style.display = reg ? 'flex' : 'none';
    $('#authForm').querySelector('[name=password]').setAttribute('autocomplete', reg ? 'new-password' : 'current-password');
    clearFieldErrors($('#authForm'));
  }

  function openAuth(mode = 'login') { setAuthMode(mode); openModal('authModal'); }

  function clearFieldErrors(form) { $$('.field.invalid', form).forEach(f => f.classList.remove('invalid')); }
  function markInvalid(input, msg) {
    const field = input.closest('.field');
    field.classList.add('invalid');
    if (msg) { const err = $('.err', field); if (err) err.textContent = msg; }
  }

  function handleAuthSubmit(e) {
    e.preventDefault();
    const form = e.target;
    clearFieldErrors(form);
    const data = Object.fromEntries(new FormData(form));
    let ok = true;

    if (authMode === 'register' && (!data.name || data.name.trim().length < 2)) { markInvalid(form.name, 'Lütfen adınızı girin.'); ok = false; }
    if (!validEmail(data.email)) { markInvalid(form.email, 'Geçerli bir e-posta girin.'); ok = false; }
    if (authMode === 'register' && !validPhone(data.phone)) { markInvalid(form.phone, 'Geçerli bir telefon girin.'); ok = false; }
    if (!data.password || data.password.length < 6) { markInvalid(form.password, 'Şifre en az 6 karakter olmalı.'); ok = false; }
    if (!ok) return;

    const users = Store.getUsers();

    if (authMode === 'register') {
      if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
        markInvalid(form.email, 'Bu e-posta zaten kayıtlı.'); return;
      }
      const user = { id: uid(), name: data.name.trim(), email: data.email.toLowerCase(), phone: fmtPhone(data.phone), pass: simpleHash(data.password), provider: 'email', createdAt: Date.now() };
      users.push(user); Store.saveUsers(users);
      loginSession(user); closeModal('authModal');
      toast('Hoş geldiniz, ' + user.name.split(' ')[0] + '!', 'Hesabınız oluşturuldu.', 'success');
    } else {
      const user = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
      if (!user || user.pass !== simpleHash(data.password)) { markInvalid(form.password, 'E-posta veya şifre hatalı.'); return; }
      loginSession(user); closeModal('authModal');
      toast('Tekrar hoş geldiniz!', user.name, 'success');
    }
    form.reset();
  }

  // Google ile giriş — DEMO simülasyonu.
  // Gerçek entegrasyon: Google Identity Services veya Firebase Auth (aşağıdaki nota bakın).
  function handleGoogleLogin() {
    const users = Store.getUsers();
    let user = users.find(u => u.provider === 'google');
    if (!user) {
      user = { id: uid(), name: 'Google Kullanıcısı', email: 'kullanici@gmail.com', phone: '', pass: null, provider: 'google', createdAt: Date.now() };
      users.push(user); Store.saveUsers(users);
    }
    loginSession(user); closeModal('authModal');
    toast('Google ile giriş yapıldı', 'Demo modu — randevuda telefonunuzu ekleyin.', 'success');
  }

  function loginSession(user) {
    Store.setSession({ id: user.id, name: user.name, email: user.email, phone: user.phone || '', provider: user.provider });
    renderAuthUI();
    renderApptCard();
  }
  function logout() {
    Store.setSession(null); renderAuthUI(); renderApptCard();
    toast('Çıkış yapıldı', 'Tekrar bekleriz!', 'info');
  }

  function renderAuthUI() {
    const s = Store.getSession();
    const area = $('#navAuthArea');
    if (s) {
      area.innerHTML = `<div class="nav-user">
        <div class="avatar" title="${esc(s.name)}">${esc(initials(s.name))}</div>
        <button class="btn btn-ghost btn-sm" id="navLogoutBtn">Çıkış</button>
      </div>`;
      $('#navLogoutBtn').addEventListener('click', logout);
    } else {
      area.innerHTML = `<button class="btn btn-ghost btn-sm" id="navLoginBtn">Giriş Yap</button>`;
      $('#navLoginBtn').addEventListener('click', () => openAuth('login'));
    }
  }

  /* -----------------------------------------------------
     RANDEVU — kart render, form, gönderim
  ----------------------------------------------------- */
  const SERVICES = ['Otomatik Şanzıman Tamiri', 'Tork Konvertörü Tamiri', 'DSG / CVT Şanzıman', 'Şanzıman Revizyonu', 'Arıza Tespiti (Diagnostik)', 'Şanzıman Yağı & Bakım', 'Diğer / Emin Değilim'];
  const GEARTYPES = ['Otomatik', 'Yarı Otomatik', 'DSG (Çift Kavrama)', 'CVT', 'Bilmiyorum'];
  const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:30', '14:30', '15:30', '16:30', '17:30'];

  function renderApptCard() {
    const card = $('#apptCard');
    const s = Store.getSession();

    if (!s) {
      card.innerHTML = `
        <div class="auth-gate">
          <div class="lock-ic"><svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
          <h3>Randevu için giriş yapın</h3>
          <p>Randevu oluşturmak için hesabınızla giriş yapın veya hızlıca ücretsiz hesap oluşturun.</p>
          <button class="btn-google" id="gateGoogle" style="margin-bottom:14px">
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.5c5.4 0 10.3-2 14-5.3l-6.5-5.5c-2 1.5-4.6 2.3-7.5 2.3-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39 16.2 43.5 24 43.5z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.5 5.5c-.5.4 6.7-4.9 6.7-15 0-1.2-.1-2.3-.9-3.5z"/></svg>
            Google ile devam et
          </button>
          <button class="btn btn-ghost btn-block" id="gateEmail">E-posta ile giriş / kayıt</button>
        </div>`;
      $('#gateGoogle').addEventListener('click', handleGoogleLogin);
      $('#gateEmail').addEventListener('click', () => openAuth('login'));
      return;
    }

    const myAppts = Store.getAppts().filter(a => a.userId === s.id).sort((a, b) => b.createdAt - a.createdAt);
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
        <button type="submit" class="btn btn-primary btn-block" style="margin-top:20px">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
          Randevuyu Onayla
        </button>
        <p class="form-note">Randevunuz için telefon numaranız zorunludur; onay araması yapılabilir.</p>
      </form>
      ${myAppts.length ? renderMyAppts(myAppts) : ''}`;

    $('#apptForm').addEventListener('submit', handleApptSubmit);
  }

  function renderMyAppts(list) {
    const rows = list.slice(0, 4).map(a => {
      const st = STATUS[a.status];
      return `<div class="appt-summary" style="margin-bottom:10px">
        <div class="r"><span>Randevu No</span><b>${esc(a.ref)}</b></div>
        <div class="r"><span>Tarih</span><b>${esc(a.date)} · ${esc(a.time)}</b></div>
        <div class="r"><span>Hizmet</span><b>${esc(a.service)}</b></div>
        <div class="r"><span>Durum</span><span class="badge ${st.cls}">${st.label}</span></div>
      </div>`;
    }).join('');
    return `<div style="margin-top:28px;border-top:1px solid var(--border);padding-top:22px">
      <h4 style="font-family:var(--ff-display);margin-bottom:14px">Randevularım</h4>${rows}</div>`;
  }

  function handleApptSubmit(e) {
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

    const s = Store.getSession();
    const appt = {
      ref: refCode(), id: uid(), userId: s.id,
      name: d.name.trim(), phone: fmtPhone(d.phone), email: s.email,
      vehicle: d.vehicle.trim(), gearType: d.gearType, service: d.service,
      date: d.date, time: d.time, note: (d.note || '').trim(),
      status: 'pending', createdAt: Date.now(),
    };
    const appts = Store.getAppts(); appts.push(appt); Store.saveAppts(appts);

    // Kullanıcının telefonunu güncelle (bir dahaki sefere hazır gelsin)
    if (!s.phone) { s.phone = appt.phone; Store.setSession(s); const us = Store.getUsers(); const u = us.find(x => x.id === s.id); if (u) { u.phone = appt.phone; Store.saveUsers(us); } }

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
     ADMIN — giriş, tablo, durum, silme, filtre, dışa aktarım
  ----------------------------------------------------- */
  function handleAdminSubmit(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    if (d.username === ADMIN_CREDS.username && d.password === ADMIN_CREDS.password) {
      Store.setAdmin(true); closeModal('adminModal'); e.target.reset(); openAdminPanel();
      toast('Yönetici girişi başarılı', 'Panele hoş geldiniz.', 'success');
    } else {
      toast('Giriş başarısız', 'Kullanıcı adı veya şifre hatalı.', 'error');
    }
  }

  function openAdminPanel() { $('#adminPanel').classList.add('open'); document.body.style.overflow = 'hidden'; renderAdmin(); }
  function closeAdminPanel() { $('#adminPanel').classList.remove('open'); document.body.style.overflow = ''; }

  function renderAdmin() {
    const all = Store.getAppts().sort((a, b) => b.createdAt - a.createdAt);
    // İstatistikler
    $('#stTotal').textContent = all.length;
    $('#stPending').textContent = all.filter(a => a.status === 'pending').length;
    $('#stConfirmed').textContent = all.filter(a => a.status === 'confirmed').length;
    $('#stDone').textContent = all.filter(a => a.status === 'done').length;

    // Filtre + arama
    const q = ($('#searchInput').value || '').toLowerCase().trim();
    const fs = $('#filterStatus').value;
    const list = all.filter(a => {
      const matchQ = !q || [a.ref, a.name, a.phone, a.vehicle, a.service].some(v => String(v).toLowerCase().includes(q));
      const matchS = !fs || a.status === fs;
      return matchQ && matchS;
    });

    const body = $('#apptTableBody');
    $('#emptyState').style.display = list.length ? 'none' : 'block';
    body.innerHTML = list.map(a => {
      const opts = Object.entries(STATUS).map(([k, v]) => `<option value="${k}" ${k === a.status ? 'selected' : ''}>${v.label}</option>`).join('');
      return `<tr data-id="${a.id}">
        <td><b style="color:var(--gold)">${esc(a.ref)}</b></td>
        <td class="cust-name">${esc(a.name)}<small>${esc(a.email || '')}</small></td>
        <td><a href="tel:${esc(a.phone)}" style="color:var(--text-soft)">${esc(a.phone)}</a></td>
        <td>${esc(a.vehicle)}<br><small style="color:var(--text-dim)">${esc(a.gearType || '')}</small></td>
        <td>${esc(a.service)}</td>
        <td>${esc(a.date)}<br><small style="color:var(--text-dim)">${esc(a.time)}</small></td>
        <td><select class="status-select" data-id="${a.id}">${opts}</select></td>
        <td><div class="row-actions">
          <button class="icon-btn" data-call="${esc(a.phone)}" title="Ara"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg></button>
          <button class="icon-btn danger" data-del="${a.id}" title="Sil"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg></button>
        </div></td>
      </tr>`;
    }).join('');

    // Olay bağlama
    $$('.status-select', body).forEach(sel => sel.addEventListener('change', () => updateStatus(sel.dataset.id, sel.value)));
    $$('[data-del]', body).forEach(b => b.addEventListener('click', () => deleteAppt(b.dataset.del)));
    $$('[data-call]', body).forEach(b => b.addEventListener('click', () => { location.href = 'tel:' + b.dataset.call; }));
  }

  function updateStatus(id, status) {
    const appts = Store.getAppts(); const a = appts.find(x => x.id === id);
    if (a) { a.status = status; Store.saveAppts(appts); renderAdmin(); toast('Durum güncellendi', STATUS[status].label, 'info'); }
  }
  function deleteAppt(id) {
    if (!confirm('Bu randevuyu silmek istediğinize emin misiniz?')) return;
    Store.saveAppts(Store.getAppts().filter(x => x.id !== id)); renderAdmin(); toast('Randevu silindi', '', 'info');
  }

  function exportCSV() {
    const appts = Store.getAppts();
    if (!appts.length) { toast('Veri yok', 'Dışa aktarılacak randevu bulunmuyor.', 'error'); return; }
    const head = ['Randevu No', 'Ad Soyad', 'Telefon', 'E-posta', 'Araç', 'Şanzıman Tipi', 'Hizmet', 'Tarih', 'Saat', 'Durum', 'Not'];
    const rows = appts.map(a => [a.ref, a.name, a.phone, a.email, a.vehicle, a.gearType, a.service, a.date, a.time, STATUS[a.status].label, a.note]
      .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));
    const csv = '﻿' + [head.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = `hb-randevular-${todayStr()}.csv`; a.click(); URL.revokeObjectURL(url);
    toast('CSV indirildi', appts.length + ' randevu dışa aktarıldı.', 'success');
  }

  /* -----------------------------------------------------
     UI — navbar, mobil menü, reveal, sayaçlar
  ----------------------------------------------------- */
  function bindUI() {
    // Navbar scroll
    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll); onScroll();

    // Mobil menü
    const burger = $('#hamburger'), links = $('#navLinks');
    burger.addEventListener('click', () => links.classList.toggle('open'));
    $$('#navLinks a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

    // Yıl
    $('#year').textContent = new Date().getFullYear();

    // Reveal animasyonu
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => io.observe(el));

    // Sayaç animasyonu
    const counters = $$('[data-count]');
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => cio.observe(c));
  }

  function animateCount(el) {
    const target = +el.dataset.count; const dur = 1400; const start = performance.now();
    const suffix = target === 100 ? '' : (target >= 1000 ? '+' : (target === 15 || target === 12 ? '+' : ''));
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = val.toLocaleString('tr-TR') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* -----------------------------------------------------
     BAŞLANGIÇ
  ----------------------------------------------------- */
  function init() {
    bindModals();
    bindUI();
    renderAuthUI();
    renderApptCard();

    // Auth modal olayları
    $('#authForm').addEventListener('submit', handleAuthSubmit);
    $('#googleBtn').addEventListener('click', handleGoogleLogin);
    $('#authSwitchBtn').addEventListener('click', () => setAuthMode(authMode === 'login' ? 'register' : 'login'));
    $('#navLoginBtn')?.addEventListener('click', () => openAuth('login'));

    // Randevu Al butonları giriş yoksa uyarı vermeden bölüme kaydırır; kart zaten gate gösterir.

    // Admin olayları
    $('#adminEntry').addEventListener('click', (e) => { e.preventDefault(); if (Store.isAdmin()) openAdminPanel(); else openModal('adminModal'); });
    $('#adminForm').addEventListener('submit', handleAdminSubmit);
    $('#adminLogout').addEventListener('click', () => { Store.setAdmin(false); closeAdminPanel(); toast('Yönetici çıkışı yapıldı', '', 'info'); });
    $('#refreshBtn').addEventListener('click', renderAdmin);
    $('#searchInput').addEventListener('input', renderAdmin);
    $('#filterStatus').addEventListener('change', renderAdmin);
    $('#exportBtn').addEventListener('click', exportCSV);

    // Demo verisi (ilk açılışta örnek randevular)
    seedDemo();
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
