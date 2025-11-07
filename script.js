/**
 * Portal Karang Taruna - Main JavaScript
 * Vanilla JS - No Framework Dependencies
 * 
 * Modules:
 * - Navigation & UI Controls
 * - Article Management with Search, Filter, Pagination
 * - Form Validation & Submission
 * - File Upload & Preview
 * - LocalStorage Draft Management
 * - PDF Export (Client-side)
 * - Admin Panel
 * - Fake API Simulation
 */

// ==================== Global State ====================
const STATE = {
    articles: [],
    currentPage: 1,
    articlesPerPage: 6,
    filteredArticles: [],
    submissions: {
        pengaduan: [],
        mediasi: [],
        pengajuan: []
    },
    isAdminLoggedIn: false
};

// Admin credentials (dummy - stored in JS)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// ==================== Utility Functions ====================

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast--${type} toast--show`;
    setTimeout(() => toast.classList.remove('toast--show'), 3000);
}

function showModal(title, body, footerButtons = []) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = body;

    const modalFooter = document.getElementById('modalFooter');
    modalFooter.innerHTML = '';
    footerButtons.forEach(btn => {
        const button = document.createElement('button');
        button.className = btn.className || 'btn btn--primary';
        button.textContent = btn.text;
        button.onclick = btn.onClick;
        modalFooter.appendChild(button);
    });

    modal.classList.add('modal--show');
}

function closeModal() {
    document.getElementById('modal').classList.remove('modal--show');
}

function generateTrackingNumber(prefix = 'CTR') {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    return `${prefix}-${y}${m}${d}-${rand}`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date(dateString));
}

function validateFile(file, maxSizeMB, allowedTypes) {
    if (!file) return { valid: false, error: 'Tidak ada file yang dipilih' };
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) return { valid: false, error: `Ukuran file maksimal ${maxSizeMB}MB` };

    const ext = file.name.split('.').pop().toLowerCase();
    const isValid = allowedTypes.some(type =>
        type.startsWith('.') ? ext === type.substring(1) : file.type.includes(type)
    );
    if (!isValid) return { valid: false, error: 'Tipe file tidak didukung' };
    return { valid: true };
}

function fakeApiCall(data, delay = 1000) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ success: true, data, message: 'Data berhasil dikirim' }), delay);
    });
}

// ==================== Navigation & UI ====================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const nav = document.getElementById('nav');
    const links = document.querySelectorAll('.nav__link');

    navToggle.addEventListener('click', () => nav.classList.add('nav--open'));
    navClose.addEventListener('click', () => nav.classList.remove('nav--open'));

    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('nav__link--active'));
            link.classList.add('nav__link--active');
            const href = link.getAttribute('href').substring(1);
            updateBreadcrumb(link.textContent, href);
            nav.classList.remove('nav--open');
        });
    });

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        const y = window.pageYOffset;
        header.style.boxShadow = y > 100
            ? '0 4px 12px rgba(0,0,0,0.1)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
}

function updateBreadcrumb(text, id) {
    const breadcrumb = document.getElementById('breadcrumb');
    const list = document.getElementById('breadcrumbList');
    if (id === 'beranda') breadcrumb.style.display = 'none';
    else {
        breadcrumb.style.display = 'block';
        list.innerHTML = `
            <li class="breadcrumb__item"><a href="#beranda">Beranda</a></li>
            <li class="breadcrumb__item">${text}</li>`;
    }
}

function initModal() {
    const modal = document.getElementById('modal');
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('modal--show')) closeModal();
    });
}

// ==================== Articles ====================

function generateArticles() {
    const categories = ['pengumuman', 'kegiatan', 'berita', 'artikel'];
    const titles = [
        'Rapat Koordinasi Bulanan Karang Taruna',
        'Program Bakti Sosial di Desa Sejahtera',
        'Pelatihan Kewirausahaan untuk Pemuda',
        'Gotong Royong Bersih Kampung',
        'Pengumuman Seleksi Pengurus Baru',
        'Workshop Digital Marketing',
        'Kegiatan Donor Darah Massal',
        'Lomba Kreativitas Pemuda',
        'Sosialisasi Bahaya Narkoba',
        'Festival Seni dan Budaya Lokal',
        'Program Pendampingan UMKM',
        'Turnamen Olahraga Antar RT'
    ];
    return titles.map((title, i) => ({
        id: i + 1,
        title,
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        category: categories[Math.floor(Math.random() * categories.length)],
        date: new Date(2025, 9, Math.floor(Math.random() * 28) + 1).toISOString(),
        image: `Article ${i + 1}`
    }));
}

function renderArticles() {
    const grid = document.getElementById('articlesGrid');
    const start = (STATE.currentPage - 1) * STATE.articlesPerPage;
    const end = start + STATE.articlesPerPage;
    const show = STATE.filteredArticles.slice(start, end);

    if (!show.length) {
        grid.innerHTML = '<p class="admin-empty">Tidak ada artikel ditemukan</p>';
        return;
    }

    grid.innerHTML = show.map(a => `
        <article class="article-card">
            <div class="article-card__image">${a.image}</div>
            <div class="article-card__content">
                <span class="article-card__category">${a.category}</span>
                <h3 class="article-card__title">${a.title}</h3>
                <p>${a.excerpt}</p>
                <time>${formatDate(a.date)}</time>
            </div>
        </article>`).join('');

    renderPagination();
}

function renderPagination() {
    const el = document.getElementById('pagination');
    const total = Math.ceil(STATE.filteredArticles.length / STATE.articlesPerPage);
    if (total <= 1) return el.innerHTML = '';

    let btns = `<button class="pagination__btn" ${STATE.currentPage === 1 ? 'disabled' : ''}
        onclick="changePage(${STATE.currentPage - 1})">‹ Prev</button>`;

    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= STATE.currentPage - 1 && i <= STATE.currentPage + 1))
            btns += `<button class="pagination__btn ${i === STATE.currentPage ? 'pagination__btn--active' : ''}"
                onclick="changePage(${i})">${i}</button>`;
        else if (i === STATE.currentPage - 2 || i === STATE.currentPage + 2)
            btns += `<span class="pagination__btn" disabled>...</span>`;
    }

    btns += `<button class="pagination__btn" ${STATE.currentPage === total ? 'disabled' : ''}
        onclick="changePage(${STATE.currentPage + 1})">Next ›</button>`;
    el.innerHTML = btns;
}

function changePage(p) {
    STATE.currentPage = p;
    renderArticles();
    document.getElementById('informasi').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function filterArticles() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const cat = document.getElementById('categoryFilter').value;
    STATE.filteredArticles = STATE.articles.filter(a =>
        (a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)) &&
        (!cat || a.category === cat)
    );
    STATE.currentPage = 1;
    renderArticles();
}

function initArticles() {
    STATE.articles = generateArticles();
    STATE.filteredArticles = [...STATE.articles];
    renderArticles();
    document.getElementById('searchInput').addEventListener('input', filterArticles);
    document.getElementById('categoryFilter').addEventListener('change', filterArticles);
}

// ==================== Form Validation ====================

function validateField(id, rules = {}) {
    const f = document.getElementById(id);
    const err = document.getElementById(id + 'Error');
    const v = f.value.trim();

    if (rules.required && !v) return (err.textContent = 'Field ini wajib diisi', f.setAttribute('aria-invalid', 'true'), false);
    if (rules.email && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return (err.textContent = 'Format email tidak valid', f.setAttribute('aria-invalid', 'true'), false);
    if (rules.phone && v && !/^[\d\s\-\+\(\)]+$/.test(v)) return (err.textContent = 'Format nomor telepon tidak valid', f.setAttribute('aria-invalid', 'true'), false);
    if (rules.minLength && v.length < rules.minLength) return (err.textContent = `Minimal ${rules.minLength} karakter`, f.setAttribute('aria-invalid', 'true'), false);
    if (rules.futureDate && v && new Date(v) < new Date().setHours(0, 0, 0, 0))
        return (err.textContent = 'Tanggal tidak boleh di masa lalu', f.setAttribute('aria-invalid', 'true'), false);

    err.textContent = ''; f.removeAttribute('aria-invalid'); return true;
}

function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    form.querySelectorAll('.form__error').forEach(e => e.textContent = '');
    form.querySelectorAll('[aria-invalid="true"]').forEach(f => f.removeAttribute('aria-invalid'));
}

// ==================== File Uploads ====================

function initPengaduanFileUpload() {
    const input = document.getElementById('pengaduanFile');
    const label = document.getElementById('fileLabel');
    const preview = document.getElementById('filePreview');
    const content = document.getElementById('filePreviewContent');
    const remove = document.getElementById('removeFileBtn');
    const error = document.getElementById('pengaduanFileError');

    input.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const val = validateFile(file, 5, ['image/', '.pdf']);
        if (!val.valid) return (error.textContent = val.error, input.value = '');

        error.textContent = ''; label.textContent = file.name; preview.style.display = 'block';
        if (file.type.startsWith('image/')) {
            const r = new FileReader();
            r.onload = ev => content.innerHTML = `<img src="${ev.target.result}" alt="Preview">`;
            r.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
            content.innerHTML = `<p>📄 ${file.name}</p><p>Ukuran: ${(file.size / 1024).toFixed(2)} KB</p>`;
        }
    });

    remove.addEventListener('click', () => {
        input.value = ''; label.textContent = 'Pilih file atau drag & drop';
        preview.style.display = 'none'; error.textContent = '';
    });
}

// ==================== Draft Management ====================

function saveDraft(data, type) {
    try {
        localStorage.setItem(`draft_${type}`, JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
        showToast('Draft berhasil disimpan', 'success');
    } catch {
        showToast('Gagal menyimpan draft', 'error');
    }
}

function loadDraft(type) {
    try {
        const data = localStorage.getItem(`draft_${type}`);
        if (!data) return showToast('Tidak ada draft tersimpan', 'info'), null;
        return JSON.parse(data);
    } catch {
        showToast('Gagal memuat draft', 'error'); return null;
    }
}

function clearDraft(type) {
    localStorage.removeItem(`draft_${type}`);
}

// ==================== Mediasi Form ====================

function initMediasiForm() {
    const form = document.getElementById('mediasiForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        clearFormErrors('mediasiForm');

        const valid =
            validateField('mediasiNama', { required: true, minLength: 3 }) &
            validateField('mediasiKontak', { required: true }) &
            validateField('mediasiPihak', { required: true, minLength: 10 }) &
            validateField('mediasiKasus', { required: true, minLength: 20 }) &
            validateField('mediasiTanggal', { required: true, futureDate: true });

        if (!valid) return showToast('Mohon lengkapi form dengan benar', 'error');

        const data = {
            id: generateTrackingNumber('MED'),
            nama: form.mediasiNama.value,
            kontak: form.mediasiKontak.value,
            pihakTerlibat: form.mediasiPihak.value,
            ringkasanKasus: form.mediasiKasus.value,
            tanggalPreferensi: form.mediasiTanggal.value,
            status: 'pending',
            tanggalPengajuan: new Date().toISOString()
        };

        const btn = form.querySelector('button[type="submit"]');
        const txt = btn.textContent;
        btn.disabled = true; btn.textContent = 'Mengirim...';

        try {
            await fakeApiCall(data);
            STATE.submissions.mediasi.push(data);
            showMediasiConfirmation(data);
            form.reset();
            showToast('Permintaan mediasi berhasil dikirim', 'success');
        } catch {
            showToast('Gagal mengirim permintaan', 'error');
        } finally {
            btn.disabled = false; btn.textContent = txt;
        }
    });
}

function showMediasiConfirmation(data) {
    const body = `
        <div>
            <p><strong>Nomor Mediasi:</strong> ${data.id}</p>
            <p><strong>Nama:</strong> ${data.nama}</p>
            <p><strong>Tanggal Preferensi:</strong> ${formatDate(data.tanggalPreferensi)}</p>
            <p style="background:#f3f4f6;padding:1rem;border-radius:6px;">
                Permintaan mediasi Anda telah diterima. Tim kami akan menghubungi Anda dalam 2x24 jam.
            </p>
        </div>`;
    showModal('Permintaan Mediasi Diterima', body, [
        { text: 'Export PDF', className: 'btn btn--secondary', onClick: () => exportToPDF(data, 'mediasi') },
        { text: 'Tutup', className: 'btn btn--primary', onClick: closeModal }
    ]);
}

// ==================== Pengaduan Form ====================

function initPengaduanForm() {
    const form = document.getElementById('pengaduanForm');
    if (!form) return;

    const saveBtn = document.getElementById('saveDraftBtn');
    const loadBtn = document.getElementById('loadDraftBtn');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        clearFormErrors('pengaduanForm');

        const valid =
            validateField('pengaduanJudul', { required: true, minLength: 5 }) &
            validateField('pengaduanKategori', { required: true }) &
            validateField('pengaduanLokasi', { required: true }) &
            validateField('pengaduanDeskripsi', { required: true, minLength: 20 });

        if (!valid) return showToast('Mohon lengkapi form dengan benar', 'error');

        const data = {
            id: generateTrackingNumber('CTR'),
            judul: form.pengaduanJudul.value,
            kategori: form.pengaduanKategori.value,
            lokasi: form.pengaduanLokasi.value,
            deskripsi: form.pengaduanDeskripsi.value,
            file: form.pengaduanFile.files[0]?.name || null,
            status: 'baru',
            tanggalPengaduan: new Date().toISOString()
        };

        const btn = form.querySelector('button[type="submit"]');
        const txt = btn.textContent;
        btn.disabled = true; 
        btn.textContent = 'Mengirim...';