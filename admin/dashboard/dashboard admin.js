// File: admin/dashboard/dashboard admin.js

// === BAGIAN 1: FITUR UI DASAR (LAMA & AMAN) ===

// Mobile menu toggle
const sidebar = document.getElementById('sidebar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Highlight active menu based on current page
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.sidebar-menu-link').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    // Cek jika nama file sama ATAU jika linknya '#' (dashboard default)
    if (linkPage === currentPage || (currentPage === '' && link.getAttribute('href') === 'dashboard admin.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Simple animation for stats numbers on load
window.addEventListener('load', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const isPercentage = text.includes('%');
        const target = parseInt(text);
        let current = 0;
        const increment = target / 50;
        
        if (!isNaN(target)) {
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = isPercentage ? target + '%' : target;
                    clearInterval(timer);
                } else {
                    stat.textContent = isPercentage ? Math.floor(current) + '%' : Math.floor(current);
                }
            }, 20);
        }
    });
});

// Table row click handler
document.querySelectorAll('.data-table tbody tr').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function() {
        const ticketNumber = this.cells[0].textContent;
        // alert('Membuka detail untuk: ' + ticketNumber); // Opsional: disable alert ini kalau ganggu
    });
});

// Notification click handler
const notifBtn = document.querySelector('.topbar-notifications');
if (notifBtn) {
    notifBtn.addEventListener('click', function() {
        alert('Membuka notifikasi...\n\n12 notifikasi baru:\n- 5 Pengaduan baru\n- 3 Galeri pending\n- 4 Proposal untuk review');
    });
}


// === BAGIAN 2: LOGIC PROFILE & LOGOUT (UPDATE BARU) ===

// 1. Update Event Listener Tombol Profil (User Avatar)
const userProfileBtn = document.querySelector('.topbar-user');
if (userProfileBtn) {
    const newBtn = userProfileBtn.cloneNode(true);
    userProfileBtn.parentNode.replaceChild(newBtn, userProfileBtn);

    // SEKARANG MANGGIL OPEN PROFILE DULU
    newBtn.addEventListener('click', function() {
        openProfileModal();
    });
}

// --- LOGIC PROFILE MODAL ---
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    if(modal) modal.style.display = 'flex';
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if(modal) modal.style.display = 'none';
}

// Fungsi Transisi: Tutup Profile -> Buka Logout Confirmation
function triggerLogoutFromProfile() {
    closeProfileModal(); // Tutup dulu profilnya
    setTimeout(() => {
        openLogoutModal(); // Baru buka konfirmasi logout
    }, 200); // Delay dikit biar animasinya enak
}

// --- LOGIC LOGOUT CONFIRMATION (Sama kayak sebelumnya) ---
function openLogoutModal(e) {
    if(e) e.preventDefault();
    const modal = document.getElementById('logoutModal');
    if (modal) modal.style.display = 'flex';
}

function closeLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) modal.style.display = 'none';
}

function confirmLogout() {
    localStorage.removeItem('admin_logged_in');
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        window.location.href = '../login/login admin.html';
    }, 500);
}

// Tutup modal kalau klik overlay (Berlaku buat Logout & Profile)
window.addEventListener('click', function(e) {
    const logoutModal = document.getElementById('logoutModal');
    const profileModal = document.getElementById('profileModal');
    
    if (e.target === logoutModal) closeLogoutModal();
    if (e.target === profileModal) closeProfileModal();
});

// Sidebar menu click handler (Prevent default for '#' links)
document.querySelectorAll('.sidebar-menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            document.querySelectorAll('.sidebar-menu-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }
    });
});

// === DASHBOARD LOGIC UPDATE ===

// 1. Helper: Ambil Data dari LocalStorage (Sama kayak admin-crud.js)
function getDbData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// 2. RENDER DATA KE CAROUSEL
function renderDashboardData() {
    // A. Render Pengaduan (Ambil 3 terbaru)
    const pengaduan = getDbData('db_pengaduan').slice(-3).reverse();
    const tbodyPengaduan = document.getElementById('tbody-pengaduan');
    if (tbodyPengaduan) {
        tbodyPengaduan.innerHTML = pengaduan.length ? pengaduan.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.pelapor}</td>
                <td>${p.kategori}</td>
                <td><span class="status-badge ${p.status.toLowerCase()}">${p.status}</span></td>
            </tr>
        `).join('') : '<tr><td colspan="4" class="text-center">Belum ada pengaduan</td></tr>';
    }

    // B. Render Proposal (Ambil 3 terbaru)
    const proposal = getDbData('db_proposal').slice(-3).reverse();
    const tbodyProposal = document.getElementById('tbody-proposal');
    if (tbodyProposal) {
        tbodyProposal.innerHTML = proposal.length ? proposal.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.pic}</td>
                <td>${p.judul}</td>
                <td>${p.anggaran}</td>
            </tr>
        `).join('') : '<tr><td colspan="4" class="text-center">Belum ada proposal</td></tr>';
    }

    // C. Render Galeri (Ambil 4 gambar terbaru)
    const galeri = getDbData('db_galeri').slice(-4).reverse();
    const gridGaleri = document.getElementById('grid-galeri');
    if (gridGaleri) {
        gridGaleri.innerHTML = galeri.length ? galeri.map(g => `
            <div class="gallery-preview-item">
                <img src="${g.image}" alt="${g.caption}">
                <div style="font-size:11px; margin-top:4px;">${g.caption}</div>
            </div>
        `).join('') : '<p>Belum ada foto</p>';
    }

    // D. Render Artikel (Ambil 3 terbaru)
    const artikel = getDbData('db_artikel').slice(-3).reverse();
    const listArtikel = document.getElementById('list-artikel');
    if (listArtikel) {
        listArtikel.innerHTML = artikel.length ? artikel.map(a => `
            <div class="article-preview-item">
                <img src="${a.image || 'https://via.placeholder.com/60'}" class="article-preview-img">
                <div>
                    <div style="font-weight:600; font-size:14px;">${a.title}</div>
                    <div style="font-size:12px; color:#666;">${a.category} • ${a.date}</div>
                </div>
            </div>
        `).join('') : '<p>Belum ada artikel</p>';
    }

    // E. Render Aktivitas Terkini (Clickable)
    renderRecentActivities();
}

function renderRecentActivities() {
    const activities = [
        { type: 'pengaduan', title: 'Pengaduan Baru', desc: 'Jalan Rusak di RT 05', time: '5 menit lalu', url: 'pengaduan-admin.html' },
        { type: 'galeri', title: 'Galeri Diupdate', desc: 'Foto Kerja Bakti ditambah', time: '1 jam lalu', url: 'galeri-admin.html' },
        { type: 'proposal', title: 'Proposal Masuk', desc: 'Lomba 17an', time: '2 jam lalu', url: 'proposal.html' }
    ];

    const list = document.getElementById('activityList');
    if(list) {
        list.innerHTML = activities.map(act => `
            <li class="activity-item" onclick="window.location.href='${act.url}'">
                <div class="activity-icon ${act.type}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${act.title}</div>
                    <div class="activity-desc">${act.desc}</div>
                    <div class="activity-time">${act.time}</div>
                </div>
            </li>
        `).join('');
    }
}


// === LOGIC CAROUSEL / ROLLING ===
let currentSlide = 0;
const slides = ['slide-pengaduan', 'slide-proposal', 'slide-galeri', 'slide-artikel'];
const titles = ['Pengaduan Terbaru', 'Proposal Terbaru', 'Galeri Terbaru', 'Artikel Terbaru'];
let slideInterval;

function showSlide(index) {
    // Reset semua slide & dot
    document.querySelectorAll('.slide-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(el => el.classList.remove('active'));
    
    // Aktifkan yang dipilih
    document.getElementById(slides[index]).classList.add('active');
    document.querySelectorAll('.dot')[index].classList.add('active');
    document.getElementById('sliderTitle').textContent = titles[index];
    currentSlide = index;
}

function setSlide(index) {
    clearInterval(slideInterval); // Stop auto roll kalau diklik manual
    showSlide(index);
    startAutoSlide(); // Start lagi
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }, 5000); // Ganti tiap 5 detik
}


// === LOGIC NOTIFIKASI ===
function toggleNotifications(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('show');
}

function clearNotifs() {
    document.querySelectorAll('.notif-item').forEach(el => el.classList.remove('unread'));
    document.getElementById('notifCount').style.display = 'none';
}

// Close dropdown kalau klik di luar
window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('notificationDropdown');
    if (dropdown && !e.target.closest('.notification-wrapper')) {
        dropdown.classList.remove('show');
    }
});

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    renderDashboardData();
    startAutoSlide();
});

// Fallback Logout Function (Jaga-jaga kalau ada link lama)
function adminLogout() {
  openLogoutModal();
}