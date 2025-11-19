// File: admin/dashboard/admin-crud.js

// === KONFIGURASI SCHEMA HALAMAN ===
const SCHEMAS = {
    galeri: {
        key: 'db_galeri',
        title: 'Manajemen Galeri Kegiatan',
        headers: ['Gambar', 'Caption', 'Tanggal', 'Aksi'],
        fields: [
            { name: 'image', label: 'Upload Foto Kegiatan', type: 'file' },
            { name: 'caption', label: 'Judul Kegiatan', type: 'text' },
            { name: 'date', label: 'Tanggal Pelaksanaan', type: 'date' }
        ]
    },
    artikel: {
        key: 'db_artikel',
        title: 'Manajemen Artikel & Berita',
        headers: ['Gambar', 'Judul', 'Link', 'Kategori', 'Aksi'],
        fields: [
            { name: 'title', label: 'Judul Artikel', type: 'text' },
            { name: 'image', label: 'Thumbnail Artikel', type: 'file' }, 
            { name: 'link', label: 'Link Pendaftaran / Akses (Opsional)', type: 'text', placeholder: 'https://...' },
            { name: 'category', label: 'Kategori', type: 'select', options: ['Berita', 'Kegiatan', 'Pengumuman', 'Turnamen', 'Kesehatan'] },
            { name: 'author', label: 'Penulis', type: 'text' },
            { name: 'content', label: 'Isi Artikel', type: 'textarea' },
            { name: 'date', label: 'Tanggal Publish', type: 'date' }
        ]
    },
    pengaduan: {
        key: 'db_pengaduan',
        title: 'Data Pengaduan Masuk',
        headers: ['ID Tiket', 'Tanggal', 'Pelapor', 'Judul', 'Status', 'Aksi'],
        allowAdd: false, 
        fields: [
            { name: 'tanggal', label: 'Tanggal Masuk', type: 'text', readOnly: true },
            { name: 'pelapor', label: 'Nama Pelapor', type: 'text', readOnly: true },
            { name: 'bukti', label: 'Bukti Lampiran (Foto)', type: 'file', readOnly: true },
            { name: 'judul', label: 'Judul Pengaduan', type: 'text', readOnly: true },
            { name: 'deskripsi', label: 'Isi Laporan', type: 'textarea', readOnly: true },
            { name: 'lokasi', label: 'Lokasi', type: 'text', readOnly: true },
            { name: 'status', label: 'Update Status', type: 'select', options: ['Pending', 'Diproses', 'Selesai', 'Ditolak'] },
            { name: 'response', label: 'Tanggapan Admin', type: 'textarea' }
        ]
    },
    proposal: {
        key: 'db_proposal',
        title: 'Data Pengajuan Proposal',
        headers: ['ID', 'Tanggal', 'Pengusul (PIC)', 'Judul', 'Status', 'Aksi'],
        allowAdd: false,
        fields: [
            { name: 'tanggal', label: 'Tanggal Pengajuan', type: 'text', readOnly: true },
            { name: 'pic', label: 'Penanggung Jawab', type: 'text', readOnly: true },
            { name: 'dokumen', label: 'File Proposal (PDF)', type: 'file', readOnly: true },
            { name: 'judul', label: 'Judul Proposal', type: 'text', readOnly: true },
            { name: 'deskripsi', label: 'Ringkasan', type: 'textarea', readOnly: true },
            { name: 'anggaran', label: 'Anggaran', type: 'text', readOnly: true },
            { name: 'status', label: 'Status Approval', type: 'select', options: ['Menunggu', 'Disetujui', 'Ditolak'] },
            { name: 'notes', label: 'Catatan Revisi', type: 'textarea' }
        ]
    },
    pengguna: {
        key: 'admins',
        title: 'Manajemen Admin',
        headers: ['Username', 'Role', 'Aksi'],
        fields: [
            { name: 'username', label: 'Username', type: 'text' },
            { name: 'password', label: 'Password', type: 'text' },
            { name: 'role', label: 'Role', type: 'select', options: ['Admin', 'Super Admin'] }
        ]
    },
    pengaturan: {
        key: 'db_pengaturan',
        title: 'Pengaturan Website',
        headers: ['Setting', 'Value', 'Aksi'],
        allowAdd: true,
        fields: [
            { name: 'setting', label: 'Nama Pengaturan', type: 'text' },
            { name: 'value', label: 'Value', type: 'text' }
        ]
    }
};

// === DATA DUMMY ===
function initDummyData(key, data) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

initDummyData('db_galeri', [
    { image: 'https://via.placeholder.com/150', caption: 'Kerja Bakti RT 05', date: '2025-01-12' }
]);
initDummyData('db_pengaduan', [
    { id: 'CTR-001', tanggal: '2025-11-10', pelapor: 'Budi Santoso', judul: 'Jalan Berlubang', deskripsi: 'Lubang besar di depan pos kamling.', lokasi: 'RT 02', status: 'Pending', bukti: 'https://via.placeholder.com/300x200?text=FOTO+BUKTI+JALAN' }
]);
initDummyData('db_proposal', [
    { id: 'PRO-001', tanggal: '2025-11-12', pic: 'Ahmad Dani', judul: 'Lomba 17an', deskripsi: 'Mohon dana lomba.', anggaran: 'Rp 5.000.000', status: 'Menunggu', dokumen: 'dummy-proposal.pdf' }
]);
initDummyData('db_artikel', [
    { title: 'Turnamen Futsal', category: 'Turnamen', author: 'Admin', date: '2025-11-10', image: 'https://via.placeholder.com/150', link: '#', content: '...' }
]);
initDummyData('db_pengaturan', [
    { setting: 'Nama Website', value: 'Portal Karang Taruna' }
]);

// === LOGIC UTAMA ===
const pageId = document.body.dataset.page;
const config = SCHEMAS[pageId];
let editIndex = -1;

function getData() {
    const data = localStorage.getItem(config.key);
    return JSON.parse(data) || [];
}

function getStatusBadge(status) {
    const colors = { 'Selesai': 'done', 'Disetujui': 'done', 'Diproses': 'process', 'Menunggu': 'pending', 'Pending': 'pending', 'Ditolak': 'rejected' };
    return `<span class="status-badge ${colors[status] || ''}">${status}</span>`;
}

function loadTable() {
    if (!config) return;

    document.getElementById('pageTitle').textContent = config.title;
    if (config.allowAdd === false) {
        const btnAdd = document.getElementById('btnAdd');
        if(btnAdd) btnAdd.style.display = 'none';
    }

    const thead = document.getElementById('tableHeaders');
    thead.innerHTML = config.headers.map(h => `<th>${h}</th>`).join('');

    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    const data = getData();

    if(data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${config.headers.length}" style="text-align:center; padding: 30px; color: #666;">Belum ada data bestie.</td></tr>`;
        return;
    }

    data.forEach((item, idx) => {
        let rowHtml = '';
        
        if (pageId === 'galeri') {
            rowHtml = `<td><img src="${item.image}" style="height:50px; width:50px; border-radius:6px; object-fit:cover;"></td><td>${item.caption}</td><td>${item.date}</td>`;
        } 
        else if (pageId === 'artikel') {
            const img = item.image ? `<img src="${item.image}" style="height:50px; width:50px; border-radius:6px; object-fit:cover;">` : '-';
            const link = item.link ? `<a href="${item.link}" target="_blank" onclick="event.stopPropagation()" style="color:#A50104; font-weight:600;">Link ↗</a>` : '-';
            rowHtml = `<td>${img}</td><td>${item.title}</td><td>${link}</td><td>${item.category}</td>`;
        }
        else if (pageId === 'pengaduan') {
             rowHtml = `<td>${item.id}</td><td>${item.tanggal}</td><td>${item.pelapor}</td><td>${item.judul}</td><td>${getStatusBadge(item.status)}</td>`;
        }
        else if (pageId === 'proposal') {
             rowHtml = `<td>${item.id}</td><td>${item.tanggal}</td><td>${item.pic}</td><td>${item.judul}</td><td>${getStatusBadge(item.status)}</td>`;
        }
        else if (pageId === 'pengguna') {
             rowHtml = `<td>${item.username}</td><td>${item.role || 'Admin'}</td>`;
        }
        else if (pageId === 'pengaturan') {
            rowHtml = `<td>${item.setting}</td><td>${item.value}</td>`;
        } else {
            const keys = Object.keys(item);
            rowHtml = keys.slice(0, config.headers.length - 1).map(k => `<td>${item[k]}</td>`).join('');
        }

        rowHtml += `
            <td>
                <button class="btn-action btn-edit" onclick="event.stopPropagation(); editData(${idx})">Edit</button>
                <button class="btn-action btn-delete" onclick="event.stopPropagation(); deleteData(${idx})">Hapus</button>
            </td>
        `;
        tbody.innerHTML += `<tr onclick="editData(${idx})" style="cursor:pointer;" title="Klik untuk lihat detail">${rowHtml}</tr>`;
    });
}

// === RENDER FORM ===
function renderForm() {
    const container = document.getElementById('formInputs');
    container.innerHTML = config.fields.map(field => {
        const isDisabled = field.readOnly ? 'disabled style="background:#f3f4f6; cursor: not-allowed;"' : 'required';
        const label = field.readOnly ? `${field.label} <small>(Read Only)</small>` : field.label;
        const isRequired = field.name === 'link' ? '' : 'required';

        if (field.type === 'file') {
            let inputHtml = '';
            
            if (field.readOnly) {
                inputHtml = `
                    <div id="view_file_${field.name}" style="padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <p id="no_file_${field.name}" style="color:#64748b; font-size:13px; margin:0;">Tidak ada file terlampir.</p>
                        <div id="has_file_${field.name}" style="display:none;">
                            <img id="img_view_${field.name}" src="" style="max-width:100%; max-height:200px; border-radius:8px; display:none; margin-bottom:10px;">
                            <a id="link_view_${field.name}" href="#" target="_blank" class="btn-primary" style="display:inline-block; text-decoration:none; font-size:13px; padding:8px 12px;">
                                📄 Lihat / Download File
                            </a>
                        </div>
                    </div>
                `;
            } else {
                inputHtml = `
                    <div class="file-upload-container">
                        <input type="file" id="inp_${field.name}" class="file-upload-input" accept="image/*" onchange="handleFileSelect(this, '${field.name}')">
                        <label for="inp_${field.name}" class="file-upload-label">
                            <svg class="upload-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <span class="upload-text">Klik untuk upload gambar</span>
                        </label>
                        <div id="preview_${field.name}" class="file-preview-box">
                            <img src="" id="img_${field.name}" class="preview-img">
                            <div class="preview-info">
                                <div id="name_${field.name}" style="font-weight:600;">Nama File</div>
                                <div style="font-size:11px; color:#888;">Siap diupload</div>
                            </div>
                            <button type="button" class="btn-remove-file" onclick="removeFile('${field.name}')">×</button>
                        </div>
                        <input type="hidden" id="base64_${field.name}">
                    </div>
                `;
            }
            return `<div class="form-group"><label>${label}</label>${inputHtml}</div>`;
        }

        if (field.type === 'select') {
            return `
                <div class="form-group">
                    <label>${label}</label>
                    <select id="inp_${field.name}" class="form-input" ${isDisabled}>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>`;
        }
        if (field.type === 'textarea') {
            return `
                <div class="form-group">
                    <label>${label}</label>
                    <textarea id="inp_${field.name}" class="form-input" rows="3" ${isDisabled} ${isRequired}></textarea>
                </div>`;
        }
        return `
            <div class="form-group">
                <label>${label}</label>
                <input type="${field.type}" id="inp_${field.name}" class="form-input" placeholder="${field.placeholder||''}" ${isDisabled} ${isRequired}>
            </div>`;
    }).join('');
}

// === LOGIC FILE UPLOAD (BASE64) ===
window.handleFileSelect = (input, fieldName) => {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(`preview_${fieldName}`).style.display = 'flex';
            document.getElementById(`img_${fieldName}`).src = e.target.result;
            document.getElementById(`name_${fieldName}`).textContent = file.name;
            document.getElementById(`base64_${fieldName}`).value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

window.removeFile = (fieldName) => {
    document.getElementById(`inp_${fieldName}`).value = '';
    document.getElementById(`base64_${fieldName}`).value = '';
    document.getElementById(`preview_${fieldName}`).style.display = 'none';
};

// === MODAL LOGIC ===
window.openModal = (isEdit = false) => {
    const modal = document.getElementById('crudModal');
    if(modal) modal.style.display = 'flex';
    renderForm();
    
    // Reset Scroll
    const formContainer = document.querySelector('#crudForm'); 
    if(formContainer) formContainer.scrollTop = 0;

    if (!isEdit) {
        document.getElementById('modalTitle').textContent = 'Tambah Data Baru';
        document.getElementById('crudForm').reset();
        document.querySelectorAll('.file-preview-box').forEach(el => el.style.display = 'none');
        editIndex = -1;
    }
};

window.closeModal = () => {
    const modal = document.getElementById('crudModal');
    if(modal) modal.style.display = 'none';
};

window.editData = (idx) => {
    editIndex = idx;
    openModal(true);
    document.getElementById('modalTitle').textContent = (pageId === 'pengaduan' || pageId === 'proposal') ? 'Detail Data' : 'Edit Data';
    
    const item = getData()[idx];
    
    config.fields.forEach(field => {
        if (field.type === 'file') {
            const fileVal = item[field.name];
            if (field.readOnly) {
                const noFileEl = document.getElementById(`no_file_${field.name}`);
                const hasFileEl = document.getElementById(`has_file_${field.name}`);
                const imgViewEl = document.getElementById(`img_view_${field.name}`);
                const linkViewEl = document.getElementById(`link_view_${field.name}`);

                if (fileVal) {
                    noFileEl.style.display = 'none';
                    hasFileEl.style.display = 'block';
                    const isImage = fileVal.startsWith('data:image') || fileVal.match(/\.(jpeg|jpg|gif|png)$/) != null || fileVal.includes('placeholder.com');

                    if (isImage) {
                        imgViewEl.src = fileVal;
                        imgViewEl.style.display = 'block';
                        linkViewEl.href = fileVal;
                        linkViewEl.textContent = '🔍 Lihat Gambar Full';
                    } else {
                        imgViewEl.style.display = 'none';
                        linkViewEl.href = fileVal;
                        linkViewEl.textContent = '📄 Download Dokumen';
                    }
                } else {
                    noFileEl.style.display = 'block';
                    hasFileEl.style.display = 'none';
                }
            } else {
                if (fileVal) {
                    document.getElementById(`preview_${field.name}`).style.display = 'flex';
                    document.getElementById(`img_${field.name}`).src = fileVal;
                    document.getElementById(`name_${field.name}`).textContent = "File Tersimpan";
                    document.getElementById(`base64_${field.name}`).value = fileVal;
                }
            }
        } else {
            const el = document.getElementById(`inp_${field.name}`);
            if(el && item[field.name]) el.value = item[field.name];
        }
    });
};

// === LOGIC DELETE DENGAN MODAL KEREN (SUDAH DIPERBAIKI) ===
let indexToDelete = -1;

window.deleteData = (idx) => {
    indexToDelete = idx;
    const modal = document.getElementById('deleteModal');
    if(modal) modal.style.display = 'flex';
};

window.closeDeleteModal = () => {
    const modal = document.getElementById('deleteModal');
    if(modal) modal.style.display = 'none';
    indexToDelete = -1;
};

window.confirmDeleteData = () => {
    if (indexToDelete > -1) {
        const data = getData();
        data.splice(indexToDelete, 1);
        localStorage.setItem(config.key, JSON.stringify(data));
        loadTable();
        closeDeleteModal();
    }
};

// === FORM SUBMIT ===
const crudForm = document.getElementById('crudForm');
if (crudForm) {
    crudForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = getData();
        const newItem = {};
        
        config.fields.forEach(field => {
            if(!field.readOnly) {
                if (field.type === 'file') {
                    const base64Val = document.getElementById(`base64_${field.name}`).value;
                    if (base64Val) newItem[field.name] = base64Val;
                } else {
                    newItem[field.name] = document.getElementById(`inp_${field.name}`).value;
                }
            }
        });

        if (editIndex > -1) {
            data[editIndex] = { ...data[editIndex], ...newItem };
        } else {
            if(pageId === 'pengaduan') {
                newItem.id = `CTR-${Date.now()}`;
                newItem.tanggal = new Date().toISOString().split('T')[0];
            }
            data.push(newItem);
        }

        localStorage.setItem(config.key, JSON.stringify(data));
        closeModal();
        loadTable();
    });
}

// GLOBAL CLICK HANDLERS (Modal)
window.addEventListener('click', (e) => {
    const crudModal = document.getElementById('crudModal');
    const deleteModal = document.getElementById('deleteModal');
    if (e.target === crudModal) closeModal();
    if (e.target === deleteModal) closeDeleteModal();
});

document.addEventListener('DOMContentLoaded', loadTable);