// Mobile menu toggle
const sidebar = document.getElementById('sidebar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

mobileMenuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Highlight active menu based on current page
const currentPage = window.location.hash || '#dashboard';
document.querySelectorAll('.sidebar-menu-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
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

// Table row click handler
document.querySelectorAll('.data-table tbody tr').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function() {
        const ticketNumber = this.cells[0].textContent;
        alert('Membuka detail untuk: ' + ticketNumber);
        // In production, this would navigate to detail page
        // window.location.href = 'detail.html?ticket=' + ticketNumber;
    });
});

// Notification click handler
document.querySelector('.topbar-notifications').addEventListener('click', function() {
    alert('Membuka notifikasi...\n\n12 notifikasi baru:\n- 5 Pengaduan baru\n- 3 Mediasi pending\n- 4 Proposal untuk review');
    // In production, this would open a notification panel
});

// User menu click handler
document.querySelector('.topbar-user').addEventListener('click', function() {
    const userMenu = confirm('Menu Pengguna:\n\nKlik OK untuk Logout\nKlik Cancel untuk tutup');
    if (userMenu) {
        window.location.href = 'login.html';
    }
});

// Sidebar menu click handler (for demo purposes)
document.querySelectorAll('.sidebar-menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            // Remove active class from all links
            document.querySelectorAll('.sidebar-menu-link').forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
            
            alert('Navigasi ke: ' + this.textContent.trim());
        }
    });
});


// Logout function
function adminLogout() {
  localStorage.removeItem('admin_logged_in');
  window.location.href = '../login/login admin.html';
}
