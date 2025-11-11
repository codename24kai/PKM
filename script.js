/**
 * Portal Karang Taruna - Main JavaScript
 * Vanilla JS - No Framework Dependencies
 * * Modules:
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

// ==================== PDF Export ====================

function exportToPDF(data, type) {
    // Dummy function for client-side PDF export
    // In a real application, you would use a library like jsPDF or html2canvas
    console.log(`Exporting ${type} data to PDF:`, data);
    const content = `
        <h3>Detail ${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <p>ID: ${data.id}</p>
        <p>Tanggal: ${formatDate(data.tanggalPengajuan || new Date().toISOString())}</p>
        ${type === 'pengaduan' ? `<p>Judul: ${data.judul}</p><p>Deskripsi: ${data.deskripsi.substring(0, 100)}...</p>` : ''}
        ${type === 'mediasi' ? `<p>Nama: ${data.nama}</p><p>Kasus: ${data.ringkasanKasus.substring(0, 100)}...</p>` : ''}
        ${type === 'pengajuan' ? `<p>Judul: ${data.judul}</p><p>Anggaran: ${formatCurrency(data.anggaran)}</p>` : ''}
        <p>Silakan simpan informasi ini.</p>
    `;
    showModal('Export PDF Berhasil', content, [
        { text: 'Tutup', className: 'btn btn--primary', onClick: closeModal }
    ]);
}

// ==================== Navigation & UI ====================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const nav = document.getElementById('nav');
    const links = document.querySelectorAll('.nav__link');

    navToggle.addEventListener('click', () => nav.classList.add('nav--open'));
    navClose.addEventListener('click', () => nav.classList.remove('nav--open'));
    document.getElementById('navOverlay').addEventListener('click', () => nav.classList.remove('nav--open')); // Tambah overlay untuk menutup nav

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

    // Handle initial load for breadcrumb
    const currentHash = window.location.hash || '#beranda';
    const activeLink = document.querySelector(`.nav__link[href="${currentHash}"]`);
    if (activeLink) {
        activeLink.classList.add('nav__link--active');
        const href = activeLink.getAttribute('href').substring(1);
        updateBreadcrumb(activeLink.textContent, href);
    }
}

function updateBreadcrumb(text, id) {
    const breadcrumb = document.getElementById('breadcrumb');
    const list = document.getElementById('breadcrumbList');
    if (id === 'beranda' || !breadcrumb) breadcrumb.style.display = 'none';
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
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
                <p class="article-card__excerpt">${a.excerpt}</p>
                <time class="article-card__date">${formatDate(a.date)}</time>
            </div>
        </article>`).join('');

    renderPagination();
}

function renderPagination() {
    const el = document.getElementById('pagination');
    const total = Math.ceil(STATE.filteredArticles.length / STATE.articlesPerPage);
    if (total <= 1) return el.innerHTML = '';

    let btns = `<button class="pagination__btn" ${STATE.currentPage === 1 ? 'disabled' : ''}
        onclick="changePage(${STATE.currentPage - 1})" aria-label="Previous Page">‹ Prev</button>`;

    for (let i = 1; i <= total; i++) {
        // Simple logic to show first, last, and surrounding pages
        if (i === 1 || i === total || (i >= STATE.currentPage - 1 && i <= STATE.currentPage + 1))
            btns += `<button class="pagination__btn ${i === STATE.currentPage ? 'pagination__btn--active' : ''}"
                onclick="changePage(${i})" aria-label="Page ${i}">${i}</button>`;
        else if (i === STATE.currentPage - 2 || i === STATE.currentPage + 2)
            btns += `<span class="pagination__spacer" aria-hidden="true">...</span>`;
    }

    btns += `<button class="pagination__btn" ${STATE.currentPage === total ? 'disabled' : ''}
        onclick="changePage(${STATE.currentPage + 1})" aria-label="Next Page">Next ›</button>`;
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
    if (!f) return true; // Skip if element not found

    const err = document.getElementById(id + 'Error');
    const v = f.value.trim();

    // Check required for select and file inputs as well
    if (rules.required && (!v || (f.type === 'file' && f.files.length === 0) || (f.tagName === 'SELECT' && v === ''))) 
        return (err.textContent = 'Field ini wajib diisi', f.setAttribute('aria-invalid', 'true'), false);

    if (rules.email && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return (err.textContent = 'Format email tidak valid', f.setAttribute('aria-invalid', 'true'), false);
    if (rules.phone && v && !/^[\d\s\-\+\(\)]+$/.test(v)) return (err.textContent = 'Format nomor telepon tidak valid', f.setAttribute('aria-invalid', 'true'), false);
    if (rules.minLength && v.length < rules.minLength) return (err.textContent = `Minimal ${rules.minLength} karakter`, f.setAttribute('aria-invalid', 'true'), false);
    if (rules.futureDate && v && new Date(v) < new Date().setHours(0, 0, 0, 0))
        return (err.textContent = 'Tanggal tidak boleh di masa lalu', f.setAttribute('aria-invalid', 'true'), false);
    if (rules.currency) {
        // Remove non-digit characters except for comma/dot and validate as number
        const cleanV = v.replace(/[^0-9]/g, '');
        if (isNaN(cleanV) || cleanV.length < 4) // Min value check
            return (err.textContent = 'Anggaran tidak valid', f.setAttribute('aria-invalid', 'true'), false);
    }


    err.textContent = ''; f.removeAttribute('aria-invalid'); return true;
}

function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
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

    if (!input) return; // Guard clause

    input.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) {
            label.textContent = 'Pilih file atau drag & drop';
            preview.style.display = 'none';
            return;
        }

        const val = validateFile(file, 5, ['image/', '.pdf']);
        if (!val.valid) {
            error.textContent = val.error;
            input.value = ''; // Clear file input
            label.textContent = 'Pilih file atau drag & drop';
            preview.style.display = 'none';
            return;
        }

        error.textContent = ''; 
        label.textContent = file.name; 
        preview.style.display = 'block';

        if (file.type.startsWith('image/')) {
            const r = new FileReader();
            r.onload = ev => content.innerHTML = `<img src="${ev.target.result}" alt="Preview">`;
            r.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
            content.innerHTML = `<p>📄 ${file.name}</p><p>Ukuran: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>`;
        } else {
            content.innerHTML = `<p>File: ${file.name}</p><p>Tipe tidak ditampilkan</p>`;
        }
    });

    remove.addEventListener('click', () => {
        input.value = ''; 
        label.textContent = 'Pilih file atau drag & drop';
        preview.style.display = 'none'; 
        error.textContent = '';
    });
}

function initPengajuanFileUpload() {
    const input = document.getElementById('pengajuanDokumen');
    const label = document.getElementById('dokumenLabel');
    const error = document.getElementById('pengajuanDokumenError');

    if (!input) return;

    input.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) {
            label.textContent = 'Pilih file PDF';
            return;
        }

        const val = validateFile(file, 10, ['.pdf']);
        if (!val.valid) {
            error.textContent = val.error;
            input.value = '';
            label.textContent = 'Pilih file PDF';
            return;
        }

        error.textContent = '';
        label.textContent = file.name;
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

function loadDraft(type, formId) {
    try {
        const data = localStorage.getItem(`draft_${type}`);
        if (!data) return showToast('Tidak ada draft tersimpan', 'info'), null;
        
        const draft = JSON.parse(data);
        const form = document.getElementById(formId);
        if (!form) return null;

        Object.keys(draft).forEach(key => {
            const field = form.querySelector(`#${key}`);
            if (field) {
                field.value = draft[key];
            }
        });

        // Specific handling for pengaduan file (can't restore file object)
        if (type === 'pengaduan' && draft.file) {
            document.getElementById('fileLabel').textContent = `[Draft] ${draft.file}`;
            document.getElementById('filePreview').style.display = 'block';
            document.getElementById('filePreviewContent').innerHTML = `<p>File terakhir: ${draft.file}</p><p>Upload ulang jika perlu.</p>`;
        }
        
        showToast(`Draft dimuat (tersimpan ${formatDate(draft.savedAt)})`, 'success');
        return draft;
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
            validateField('mediasiKontak', { required: true, email: true }) & // Add email validation
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
            <p><strong>Nomor Mediasi:</strong> <span class="tracking-number-highlight">${data.id}</span></p>
            <p><strong>Nama:</strong> ${data.nama}</p>
            <p><strong>Tanggal Preferensi:</strong> ${formatDate(data.tanggalPreferensi)}</p>
            <p style="background:#f3f4f6;padding:1rem;border-radius:6px;border-left: 3px solid var(--color-info);">
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

    // Load Draft Listener
    loadBtn?.addEventListener('click', () => {
        loadDraft('pengaduan', 'pengaduanForm');
    });

    // Save Draft Listener
    saveBtn?.addEventListener('click', () => {
        const data = {
            pengaduanJudul: form.pengaduanJudul.value,
            pengaduanKategori: form.pengaduanKategori.value,
            pengaduanLokasi: form.pengaduanLokasi.value,
            pengaduanDeskripsi: form.pengaduanDeskripsi.value,
            file: form.pengaduanFile.files[0]?.name || null,
        };
        saveDraft(data, 'pengaduan');
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        clearFormErrors('pengaduanForm');

        const valid =
            validateField('pengaduanJudul', { required: true, minLength: 5 }) &
            validateField('pengaduanKategori', { required: true }) &
            validateField('pengaduanLokasi', { required: true }) &
            validateField('pengaduanDeskripsi', { required: true, minLength: 20 });
        
        // File validation is handled in initPengaduanFileUpload, but re-run for safety if present
        const fileInput = document.getElementById('pengaduanFile');
        let fileValid = true;
        if (fileInput.files.length > 0) {
            const fileValidation = validateFile(fileInput.files[0], 5, ['image/', '.pdf']);
            if (!fileValidation.valid) {
                document.getElementById('pengaduanFileError').textContent = fileValidation.error;
                fileValid = false;
            }
        }

        if (!valid || !fileValid) return showToast('Mohon lengkapi form dengan benar', 'error');

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

        try {
            await fakeApiCall(data);
            STATE.submissions.pengaduan.push(data);
            showPengaduanConfirmation(data);
            form.reset();
            clearDraft('pengaduan'); // Clear draft after successful submission
            document.getElementById('removeFileBtn').click(); // Reset file upload UI
            showToast('Pengaduan berhasil dikirim', 'success');
        } catch {
            showToast('Gagal mengirim pengaduan', 'error');
        } finally {
            btn.disabled = false; btn.textContent = txt;
        }
    });

    // Tracking Handler
    document.getElementById('trackingBtn')?.addEventListener('click', trackPengaduan);
}

function showPengaduanConfirmation(data) {
    const body = `
        <div>
            <p><strong>Nomor Pengaduan:</strong> <span class="tracking-number-highlight">${data.id}</span></p>
            <p><strong>Judul:</strong> ${data.judul}</p>
            <p><strong>Tanggal Pengaduan:</strong> ${formatDate(data.tanggalPengaduan)}</p>
            <p style="background:#f3f4f6;padding:1rem;border-radius:6px;border-left: 3px solid var(--color-success);">
                Pengaduan Anda telah tercatat. Gunakan nomor tracking di atas untuk memantau status.
            </p>
        </div>`;
    showModal('Pengaduan Berhasil Dikirim', body, [
        { text: 'Export PDF', className: 'btn btn--secondary', onClick: () => exportToPDF(data, 'pengaduan') },
        { text: 'Tutup', className: 'btn btn--primary', onClick: closeModal }
    ]);
}

function trackPengaduan() {
    const trackingId = document.getElementById('trackingInput').value.trim();
    const resultEl = document.getElementById('trackingResult');

    if (!trackingId) {
        resultEl.style.display = 'block';
        resultEl.innerHTML = `<p class="error-text">Mohon masukkan nomor pengaduan.</p>`;
        return;
    }

    const submission = STATE.submissions.pengaduan.find(s => s.id === trackingId);
    
    if (submission) {
        let statusClass = '';
        let statusText = '';
        if (submission.status === 'baru') { statusClass = 'tracking-result__status--new'; statusText = 'Baru'; }
        else if (submission.status === 'proses') { statusClass = 'tracking-result__status--processing'; statusText = 'Diproses'; }
        else if (submission.status === 'selesai') { statusClass = 'tracking-result__status--completed'; statusText = 'Selesai'; }
        
        resultEl.style.display = 'block';
        resultEl.innerHTML = `
            <h4>Status Pengaduan Ditemukan</h4>
            <p><strong>Nomor:</strong> ${submission.id}</p>
            <p><strong>Judul:</strong> ${submission.judul}</p>
            <p><strong>Lokasi:</strong> ${submission.lokasi}</p>
            <p><strong>Tanggal:</strong> ${formatDate(submission.tanggalPengaduan)}</p>
            <span class="tracking-result__status ${statusClass}">${statusText}</span>
        `;
    } else {
        resultEl.style.display = 'block';
        resultEl.innerHTML = `<p class="error-text">Nomor pengaduan <strong>${trackingId}</strong> tidak ditemukan.</p>`;
    }
}

// ==================== Pengajuan Form ====================

function initPengajuanForm() {
    const form = document.getElementById('pengajuanForm');
    if (!form) return;

    // Anggaran formatting on input
    const anggaranInput = document.getElementById('pengajuanAnggaran');
    anggaranInput?.addEventListener('input', e => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = formatCurrency(value).replace('Rp', '').trim();
    });
    // Remove formatting on focus for easy editing
    anggaranInput?.addEventListener('focus', e => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
    // Re-apply formatting on blur
    anggaranInput?.addEventListener('blur', e => {
        if (e.target.value) {
            e.target.value = formatCurrency(e.target.value).replace('Rp', '').trim();
        }
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        clearFormErrors('pengajuanForm');

        // Clean up anggaran value before validation
        const cleanAnggaran = anggaranInput.value.replace(/[^0-9]/g, '');
        anggaranInput.value = cleanAnggaran; // Temporarily unformatted for validation

        const valid =
            validateField('pengajuanJudul', { required: true, minLength: 5 }) &
            validateField('pengajuanRingkasan', { required: true, minLength: 20 }) &
            validateField('pengajuanAnggaran', { required: true, currency: true }) &
            validateField('pengajuanPIC', { required: true, minLength: 3 }) &
            validateField('pengajuanDokumen', { required: true }); // File input validation

        // Re-apply formatting after validation attempt
        anggaranInput.value = formatCurrency(cleanAnggaran).replace('Rp', '').trim();

        // Specific file validation for pengajuan
        const fileInput = document.getElementById('pengajuanDokumen');
        let fileValid = true;
        if (fileInput.files.length > 0) {
            const fileValidation = validateFile(fileInput.files[0], 10, ['.pdf']);
            if (!fileValidation.valid) {
                document.getElementById('pengajuanDokumenError').textContent = fileValidation.error;
                fileValid = false;
            }
        } else if (validateField('pengajuanDokumen').valid) { // if required is true, check it
            document.getElementById('pengajuanDokumenError').textContent = 'Field ini wajib diisi';
            fileValid = false;
        }


        if (!valid || !fileValid) return showToast('Mohon lengkapi form dengan benar', 'error');

        const data = {
            id: generateTrackingNumber('PRO'),
            judul: form.pengajuanJudul.value,
            ringkasan: form.pengajuanRingkasan.value,
            anggaran: parseInt(cleanAnggaran),
            pic: form.pengajuanPIC.value,
            dokumen: form.pengajuanDokumen.files[0]?.name || null,
            status: 'menunggu',
            tanggalPengajuan: new Date().toISOString()
        };

        const btn = form.querySelector('button[type="submit"]');
        const txt = btn.textContent;
        btn.disabled = true; btn.textContent = 'Mengirim...';

        try {
            await fakeApiCall(data);
            STATE.submissions.pengajuan.push(data);
            showPengajuanConfirmation(data);
            form.reset();
            document.getElementById('dokumenLabel').textContent = 'Pilih file PDF'; // Reset file label
            showToast('Pengajuan proposal berhasil dikirim', 'success');
        } catch {
            showToast('Gagal mengirim proposal', 'error');
        } finally {
            btn.disabled = false; btn.textContent = txt;
        }
    });

    // Status Tracking Handler
    document.getElementById('statusBtn')?.addEventListener('click', trackPengajuanStatus);

    // Download Template Button Handler (dummy)
    document.getElementById('downloadTemplateBtn')?.addEventListener('click', e => {
        e.preventDefault();
        showToast('Download template dimulai...', 'info');
    });
}

function showPengajuanConfirmation(data) {
    const body = `
        <div>
            <p><strong>Nomor Pengajuan:</strong> <span class="tracking-number-highlight">${data.id}</span></p>
            <p><strong>Judul Proposal:</strong> ${data.judul}</p>
            <p><strong>Anggaran:</strong> ${formatCurrency(data.anggaran)}</p>
            <p style="background:#f3f4f6;padding:1rem;border-radius:6px;border-left: 3px solid var(--color-warning);">
                Proposal Anda telah diterima dan akan segera diulas. Gunakan nomor di atas untuk cek status.
            </p>
        </div>`;
    showModal('Pengajuan Proposal Diterima', body, [
        { text: 'Export PDF', className: 'btn btn--secondary', onClick: () => exportToPDF(data, 'pengajuan') },
        { text: 'Tutup', className: 'btn btn--primary', onClick: closeModal }
    ]);
}

function trackPengajuanStatus() {
    const trackingId = document.getElementById('statusInput').value.trim();
    const resultEl = document.getElementById('statusResult');

    if (!trackingId) {
        resultEl.style.display = 'block';
        resultEl.innerHTML = `<p class="error-text">Mohon masukkan nomor pengajuan.</p>`;
        return;
    }

    const submission = STATE.submissions.pengajuan.find(s => s.id === trackingId);
    
    if (submission) {
        let statusClass = '';
        let statusText = '';
        if (submission.status === 'menunggu') { statusClass = 'tracking-result__status--new'; statusText = 'Menunggu Review'; }
        else if (submission.status === 'review') { statusClass = 'tracking-result__status--processing'; statusText = 'Dalam Review'; }
        else if (submission.status === 'disetujui') { statusClass = 'tracking-result__status--completed'; statusText = 'Disetujui'; }
        else if (submission.status === 'ditolak') { statusClass = 'tracking-result__status--error'; statusText = 'Ditolak'; }
        
        resultEl.style.display = 'block';
        resultEl.innerHTML = `
            <h4>Status Pengajuan Ditemukan</h4>
            <p><strong>Nomor:</strong> ${submission.id}</p>
            <p><strong>Judul:</strong> ${submission.judul}</p>
            <p><strong>Anggaran:</strong> ${formatCurrency(submission.anggaran)}</p>
            <p><strong>Tanggal:</strong> ${formatDate(submission.tanggalPengajuan)}</p>
            <span class="tracking-result__status ${statusClass}">${statusText}</span>
        `;
    } else {
        resultEl.style.display = 'block';
        resultEl.innerHTML = `<p class="error-text">Nomor pengajuan <strong>${trackingId}</strong> tidak ditemukan.</p>`;
    }
}

// ==================== Admin Panel ====================

function initAdminPanel() {
    const loginForm = document.getElementById('adminLoginForm');
    const adminPanel = document.getElementById('adminPanel');
    const adminLogin = document.getElementById('adminLogin');
    const logoutBtn = document.getElementById('adminLogoutBtn');
    const tabButtons = document.querySelectorAll('.admin-tab');

    if (!loginForm) return;

    // Check login state
    if (STATE.isAdminLoggedIn) {
        showAdminPanel();
    }

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            STATE.isAdminLoggedIn = true;
            showToast('Login Berhasil', 'success');
            showAdminPanel();
        } else {
            showToast('Username atau password salah', 'error');
        }
    });

    logoutBtn?.addEventListener('click', () => {
        STATE.isAdminLoggedIn = false;
        showToast('Logout Berhasil', 'info');
        showAdminLogin();
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('admin-tab--active'));
            btn.classList.add('admin-tab--active');
            renderAdminContent(btn.dataset.tab);
        });
    });

    function showAdminPanel() {
        if (!adminLogin || !adminPanel) return;
        adminLogin.style.display = 'none';
        adminPanel.style.display = 'block';
        // Render default tab content
        document.querySelector('.admin-tab--active') 
            ? renderAdminContent(document.querySelector('.admin-tab--active').dataset.tab)
            : renderAdminContent('pengaduan'); // Default to pengaduan
    }

    function showAdminLogin() {
        if (!adminLogin || !adminPanel) return;
        adminLogin.style.display = 'flex';
        adminPanel.style.display = 'none';
        loginForm.reset();
    }

    function renderAdminContent(type) {
        const contentEl = document.getElementById('adminContent');
        if (!contentEl) return;

        const submissions = STATE.submissions[type] || [];
        let html = `<h3>Daftar ${type.charAt(0).toUpperCase() + type.slice(1)} (${submissions.length})</h3>`;

        if (submissions.length === 0) {
            html += `<p class="admin-empty">Belum ada data ${type}.</p>`;
        } else {
            const headers = {
                pengaduan: ['ID', 'Judul', 'Kategori', 'Lokasi', 'Status', 'Aksi'],
                mediasi: ['ID', 'Nama', 'Pihak Terlibat', 'Tanggal Preferensi', 'Status', 'Aksi'],
                pengajuan: ['ID', 'Judul Proposal', 'Anggaran', 'PIC', 'Status', 'Aksi']
            };
            
            html += `<div class="table-responsive"><table class="admin-table"><thead><tr>`;
            headers[type].forEach(h => html += `<th>${h}</th>`);
            html += `</tr></thead><tbody>`;

            submissions.forEach(s => {
                const statusHtml = getAdminStatusBadge(s.status);
                let detailBtn = `<button class="btn btn--sm btn--primary" onclick="showAdminDetail('${s.id}', '${type}')">Detail</button>`;
                
                html += `<tr>`;
                if (type === 'pengaduan') {
                    html += `<td>${s.id}</td><td>${s.judul.substring(0, 30)}...</td><td>${s.kategori}</td><td>${s.lokasi}</td><td>${statusHtml}</td><td>${detailBtn}</td>`;
                } else if (type === 'mediasi') {
                    html += `<td>${s.id}</td><td>${s.nama}</td><td>${s.pihakTerlibat.substring(0, 30)}...</td><td>${formatDate(s.tanggalPreferensi)}</td><td>${statusHtml}</td><td>${detailBtn}</td>`;
                } else if (type === 'pengajuan') {
                    html += `<td>${s.id}</td><td>${s.judul.substring(0, 30)}...</td><td>${formatCurrency(s.anggaran)}</td><td>${s.pic}</td><td>${statusHtml}</td><td>${detailBtn}</td>`;
                }
                html += `</tr>`;
            });

            html += `</tbody></table></div>`;
        }
        contentEl.innerHTML = html;
    }

    function getAdminStatusBadge(status) {
        let text = status.charAt(0).toUpperCase() + status.slice(1);
        let className = 'status-badge--info';
        if (status === 'baru' || status === 'pending' || status === 'menunggu') className = 'status-badge--info';
        else if (status === 'proses' || status === 'review') className = 'status-badge--warning';
        else if (status === 'selesai' || status === 'disetujui') className = 'status-badge--success';
        else if (status === 'ditolak') className = 'status-badge--error';
        return `<span class="status-badge ${className}">${text}</span>`;
    }
}

function showAdminDetail(id, type) {
    const submission = STATE.submissions[type]?.find(s => s.id === id);
    if (!submission) return showToast('Data tidak ditemukan', 'error');

    let body = `
        <p><strong>ID:</strong> ${submission.id}</p>
        <p><strong>Tanggal Pengajuan:</strong> ${formatDate(submission.tanggalPengajuan)}</p>
        <p><strong>Status:</strong> ${getAdminStatusBadge(submission.status)}</p>
        <hr style="margin: 1rem 0;">
    `;

    if (type === 'pengaduan') {
        body += `
            <p><strong>Judul:</strong> ${submission.judul}</p>
            <p><strong>Kategori:</strong> ${submission.kategori}</p>
            <p><strong>Lokasi:</strong> ${submission.lokasi}</p>
            <p><strong>Deskripsi:</strong> ${submission.deskripsi}</p>
            <p><strong>File Bukti:</strong> ${submission.file || 'Tidak ada'}</p>
        `;
    } else if (type === 'mediasi') {
        body += `
            <p><strong>Nama Pemohon:</strong> ${submission.nama}</p>
            <p><strong>Kontak:</strong> ${submission.kontak}</p>
            <p><strong>Pihak Terlibat:</strong> ${submission.pihakTerlibat}</p>
            <p><strong>Ringkasan Kasus:</strong> ${submission.ringkasanKasus}</p>
            <p><strong>Tanggal Preferensi:</strong> ${formatDate(submission.tanggalPreferensi)}</p>
        `;
    } else if (type === 'pengajuan') {
        body += `
            <p><strong>Judul Proposal:</strong> ${submission.judul}</p>
            <p><strong>Ringkasan:</strong> ${submission.ringkasan}</p>
            <p><strong>Anggaran:</strong> ${formatCurrency(submission.anggaran)}</p>
            <p><strong>Penanggung Jawab (PIC):</strong> ${submission.pic}</p>
            <p><strong>Dokumen:</strong> ${submission.dokumen || 'Tidak ada'}</p>
        `;
    }
    
    // Add status update dropdown (dummy)
    const statusOptions = type === 'pengaduan' ? ['baru', 'proses', 'selesai'] : 
                          type === 'mediasi' ? ['pending', 'diterima', 'selesai'] : 
                          ['menunggu', 'review', 'disetujui', 'ditolak'];
    
    const selectOptions = statusOptions.map(s => 
        `<option value="${s}" ${submission.status === s ? 'selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`
    ).join('');

    body += `
        <div style="margin-top: 1rem;">
            <label for="adminStatusUpdate" class="form__label">Update Status:</label>
            <select id="adminStatusUpdate" class="form__select">${selectOptions}</select>
        </div>
    `;

    showModal(`Detail ${type.charAt(0).toUpperCase() + type.slice(1)}`, body, [
        { text: 'Update', className: 'btn btn--primary', onClick: () => updateSubmissionStatus(id, type) },
        { text: 'Tutup', className: 'btn btn--secondary', onClick: closeModal }
    ]);
}

function updateSubmissionStatus(id, type) {
    const newStatus = document.getElementById('adminStatusUpdate').value;
    const submissionIndex = STATE.submissions[type].findIndex(s => s.id === id);
    if (submissionIndex === -1) return showToast('Error: Data tidak ditemukan', 'error');

    STATE.submissions[type][submissionIndex].status = newStatus;
    showToast(`Status ID ${id} diubah menjadi ${newStatus.toUpperCase()}`, 'success');
    closeModal();
    // Re-render admin content to show the updated status
    const activeTab = document.querySelector('.admin-tab--active')?.dataset.tab || type;
    document.getElementById('adminPanel').style.display = 'block'; // Ensure panel is visible before rendering
    document.querySelector(`[data-tab="${activeTab}"]`).click(); // Force click to re-render
}


// ==================== Initialization ====================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initModal();
    initArticles();
    initPengaduanFileUpload();
    initPengajuanFileUpload();
    initMediasiForm();
    initPengaduanForm();
    initPengajuanForm();
    initAdminPanel();
});