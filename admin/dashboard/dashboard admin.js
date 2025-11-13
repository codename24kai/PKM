// File: admin/dashboard/dashboard admin.js (TIMPA FILE LAMA)

// Mobile menu toggle (FITUR LAMA AMAN)
const sidebar = document.getElementById('sidebar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

mobileMenuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile (FITUR LAMA AMAN)
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// === FIX UNTUK HIGHLIGHT MENU ===
// Logic lama pakai hash (#), gue ganti pakai pathname (nama file)
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.sidebar-menu-link').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active'); // Hapus active dari yang lain
    }
});

// Simple animation for stats numbers on load (FITUR LAMA AMAN)
window.addEventListener('load', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const isPercentage = text.includes('%');
        const target = parseInt(text);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = isPercentage ? target + '%' : target;
                clearInterval(timer);
            } else {
                stat.textContent = isPercentage ? Math.floor(current) + '%' : Math.floor(current);
            }
        }, 20);
    });
});

// Table row click handler (FITUR LAMA AMAN)
document.querySelectorAll('.data-table tbody tr').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function() {
        const ticketNumber = this.cells[0].textContent;
        alert('Membuka detail untuk: ' + ticketNumber);
    });
});

// Notification click handler (FITUR LAMA AMAN)
document.querySelector('.topbar-notifications').addEventListener('click', function() {
    alert('Membuka notifikasi...\n\n12 notifikasi baru:\n- 5 Pengaduan baru\n- 3 Galeri pending\n- 4 Proposal untuk review');
});

// User menu click handler (=== FIX LINK LOGOUT ===)
document.querySelector('.topbar-user').addEventListener('click', function() {
    const userMenu = confirm('Menu Pengguna:\n\nKlik OK untuk Logout\nKlik Cancel untuk tutup');
    if (userMenu) {
        adminLogout(); // Panggil fungsi logout yang benar
    }
});

// Sidebar menu click handler (FITUR LAMA AMAN)
// Ini gak bakal jalan di link yang udah ada href-nya, jadi aman.
document.querySelectorAll('.sidebar-menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            document.querySelectorAll('.sidebar-menu-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
            alert('Navigasi ke: ' + this.textContent.trim());
        }
    });
});


// Logout function (FITUR LAMA AMAN)
function adminLogout() {
  localStorage.removeItem('admin_logged_in');
  window.location.href = '../login/login admin.html';
}