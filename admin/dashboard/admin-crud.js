// File: admin/dashboard/admin-crud.js (FILE BARU)

// === KONFIGURASI TIAP HALAMAN ===
const SCHEMAS = {
    galeri: {
        key: 'db_galeri',
        title: 'Manajemen Galeri Kegiatan',
        headers: ['Gambar', 'Caption', 'Tanggal', 'Aksi'],
        fields: [
            { name: 'image', label: 'URL Gambar', type: 'text', placeholder: 'https://...' },
            { name: 'caption', label: 'Judul Kegiatan', type: 'text' },
            { name: 'date', label: 'Tanggal Pelaksanaan', type: 'date' }
        ]
    },
    artikel: {
        key: 'db_artikel',
        title: 'Manajemen Artikel & Berita',
        headers: ['Judul', 'Kategori', 'Penulis', 'Tanggal', 'Aksi'],
        fields: [
            { name: 'title', label: 'Judul Artikel', type: 'text' },
            { name: 'category', label: 'Kategori', type: 'select', options: ['Berita', 'Kegiatan', 'Pengumuman'] },
            { name: 'author', label: 'Penulis', type: 'text' },
            { name: 'content', label: 'Isi Artikel', type: 'textarea' },
            { name: 'date', label: 'Tanggal Publish', type: 'date' }
        ]
    },
    pengaduan: {
        key: 'db_pengaduan', // Simulasi database
        title: 'Data Pengaduan Masuk',
        headers: ['ID Tiket', 'Judul', 'Kategori', 'Status', 'Aksi'],
        allowAdd: false, // Admin gak nambah pengaduan, cuma edit status
        fields: [
            { name: 'status', label: 'Update Status', type: 'select', options: ['Pending', 'Diproses', 'Selesai', 'Ditolak'] },
            { name: 'response', label: 'Tanggapan Admin', type: 'textarea' }
        ]
    },
    proposal: {
        key: 'db_proposal',
        title: 'Data Pengajuan Proposal',
        headers: ['ID', 'Judul Proposal', 'Anggaran', 'Status', 'Aksi'],
        allowAdd: false,
        fields: [
            { name: 'status', label: 'Status Approval', type: 'select', options: ['Menunggu', 'Disetujui', 'Ditolak'] },
            { name: 'notes', label: 'Catatan Revisi', type: 'textarea' }
        ]
    },
    pengguna: {
        key: 'admins', // Nyambung sama login system lo
        title: 'Manajemen Admin',
        headers: ['Username', 'Password', 'Aksi'],
        fields: [
            { name: 'username', label: 'Username', type: 'text' },
            { name: 'password', label: 'Password', type: 'text' } // Plain text biar gampang testing
        ]
    },
    // Buat halaman pengaturan
    pengaturan: {
        key: 'db_pengaturan',
        title: 'Pengaturan Website',
        headers: ['Setting', 'Value', 'Aksi'],
        allowAdd: true, // Bisa nambah setting baru
        fields: [
            { name: 'setting', label: 'Nama Pengaturan', type: 'text' },
            { name: 'value', label: 'Value', type: 'text' }
        ]
    }
};

// === INISIALISASI DATA DUMMY (Biar gak kosong pas pertama buka) ===
function initDummyData(key, data) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}
initDummyData('db_galeri', [{ image: 'https://via.placeholder.com/100', caption: 'Kerja Bakti RT 05', date: '2025-01-12' }]);
initDummyData('db_artikel', [{ title: 'Pemuda Bintaro Juara', category: 'Berita', author: 'Admin', date: '2025-11-10', content: '...' }]);
initDummyData('db_pengaduan', [{ id: 'CTR-001', judul: 'Jalan Rusak', kategori: 'Infrastruktur', status: 'Pending' }]);
initDummyData('db_proposal', [{ id: 'PRO-001', judul: 'Lomba 17an', anggaran: '5.000.000', status: 'Menunggu' }]);
// 'admins' udah ada dari register.js
initDummyData('db_pengaturan', [{ setting: 'Nama Website', value: 'Portal Karang Taruna' }]);


// === LOGIC UTAMA ===
const pageId = document.body.dataset.page;
const config = SCHEMAS[pageId];
let editIndex = -1;

// Helper: Get Data
function getData() {
    const data = localStorage.getItem(config.key);
    return JSON.parse(data) || [];
}

// Helper: Status Badge Color
function getStatusBadge(status) {
    const colors = { 'Selesai': 'done', 'Disetujui': 'done', 'Diproses': 'process', 'Menunggu': 'pending', 'Pending': 'pending', 'Ditolak': 'rejected' };
    return `<span class="status-badge ${colors[status] || ''}">${status}</span>`;
}

// 1. Render Table
function loadTable() {
    // Cek kalo config-nya ada
    if (!config) return;

    document.getElementById('pageTitle').textContent = config.title;
    
    // Hide Add Button if not allowed
    if (config.allowAdd === false) document.getElementById('btnAdd').style.display = 'none';

    // Render Headers
    const thead = document.getElementById('tableHeaders');
    thead.innerHTML = config.headers.map(h => `<th>${h}</th>`).join('');

    // Render Rows
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    const data = getData();

    if(data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${config.headers.length}" style="text-align:center; padding: 20px;">Belum ada data bestie.</td></tr>`;
        return;
    }

    data.forEach((item, idx) => {
        let rowHtml = '';
        
        // Custom Row Rendering per Page Type
        if (pageId === 'galeri-admin') {
            rowHtml = `<td><img src="${item.image}" style="height:40px; border-radius:4px;"></td><td>${item.caption}</td><td>${item.date}</td>`;
        } else if (pageId === 'pengaduan-admin') {
            rowHtml = `<td>${item.id || '-'}</td><td>${item.judul}</td><td>${item.kategori}</td><td>${getStatusBadge(item.status)}</td>`;
        } else if (pageId === 'proposal') {
            rowHtml = `<td>${item.id || '-'}</td><td>${item.judul}</td><td>${item.anggaran}</td><td>${getStatusBadge(item.status)}</td>`;
        } else if (pageId === 'artikel-admin') {
            rowHtml = `<td>${item.title}</td><td>${item.category}</td><td>${item.author}</td><td>${item.date}</td>`;
        } else if (pageId === 'pengguna') {
            rowHtml = `<td>${item.username}</td><td>${'*'.repeat(item.password.length)}</td>`;
        } else if (pageId === 'pengaturan') {
            rowHtml = `<td>${item.setting}</td><td>${item.value}</td>`;
        } else {
            const keys = Object.keys(item);
            rowHtml = keys.slice(0, config.headers.length - 1).map(k => `<td>${item[k]}</td>`).join('');
        }

        // Buttons
        rowHtml += `
            <td>
                <button class="btn-action btn-edit" onclick="editData(${idx})">Edit</button>
                <button class="btn-action btn-delete" onclick="deleteData(${idx})">Hapus</button>
            </td>
        `;
        tbody.innerHTML += `<tr>${rowHtml}</tr>`;
    });
}

// 2. Modal & Form Handling
function renderForm() {
    const container = document.getElementById('formInputs');
    container.innerHTML = config.fields.map(field => {
        if (field.type === 'select') {
            return `
                <div class="form-group">
                    <label>${field.label}</label>
                    <select id="inp_${field.name}" class="form-input" required>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>`;
        }
        if (field.type === 'textarea') {
            return `
                <div class="form-group">
                    <label>${field.label}</label>
                    <textarea id="inp_${field.name}" class="form-input" rows="3" required></textarea>
                </div>`;
        }
        return `
            <div class="form-group">
                <label>${field.label}</label>
                <input type="${field.type}" id="inp_${field.name}" class="form-input" placeholder="${field.placeholder||''}" required>
            </div>`;
    }).join('');
}

window.openModal = (isEdit = false) => {
    const modal = document.getElementById('crudModal');
    modal.style.display = 'flex';
    renderForm();
    
    if (!isEdit) {
        document.getElementById('modalTitle').textContent = 'Tambah Data Baru';
        document.getElementById('crudForm').reset();
        editIndex = -1;
    }
};

window.closeModal = () => {
    document.getElementById('crudModal').style.display = 'none';
};

// 3. CRUD Actions
window.editData = (idx) => {
    editIndex = idx;
    openModal(true);
    document.getElementById('modalTitle').textContent = 'Edit Data';
    const item = getData()[idx];
    
    config.fields.forEach(field => {
        const el = document.getElementById(`inp_${field.name}`);
        if(el && item[field.name]) el.value = item[field.name];
    });
};

window.deleteData = (idx) => {
    if(confirm('Yakin mau dihapus?')) {
        const data = getData();
        data.splice(idx, 1);
        localStorage.setItem(config.key, JSON.stringify(data));
        loadTable();
    }
};

// Cek kalo form-nya ada
if (document.getElementById('crudForm')) {
    document.getElementById('crudForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = getData();
        const newItem = {};
        
        config.fields.forEach(field => {
            newItem[field.name] = document.getElementById(`inp_${field.name}`).value;
        });

        if (editIndex > -1) {
            // Keep ID or other hidden fields from original data
            data[editIndex] = { ...data[editIndex], ...newItem };
        } else {
            // Add ID if needed
            if(pageId === 'pengaduan') newItem.id = `CTR-${Date.now()}`;
            data.push(newItem);
        }

        localStorage.setItem(config.key, JSON.stringify(data));
        closeModal();
        loadTable();
    });
}

// Init
document.addEventListener('DOMContentLoaded', loadTable);