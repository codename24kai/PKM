html lama

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portal Karang Taruna - Layanan Mediasi, Pengaduan, dan Pengajuan Proposal">
    <title>Portal Karang Taruna</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header Sticky -->
    <header class="header" id="header">
        <div class="container">
            <div class="header__content">
                <div class="header__logo">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#A50104"/>
                        <path d="M20 10L28 16V24L20 30L12 24V16L20 10Z" fill="#FCBA04"/>
                        <circle cx="20" cy="20" r="4" fill="white"/>
                    </svg>
                    <span class="header__title">Karang Taruna</span>
                </div>
                <nav class="nav" id="nav">
                    <button class="nav__close" id="navClose" aria-label="Tutup menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <ul class="nav__list">
                        <li><a href="#beranda" class="nav__link nav__link--active">Beranda</a></li>
                        <li><a href="#informasi" class="nav__link">Informasi</a></li>
                        <li><a href="#mediasi" class="nav__link">Mediasi</a></li>
                        <li><a href="#pengaduan" class="nav__link">Pengaduan</a></li>
                        <li><a href="#pengajuan" class="nav__link">Pengajuan</a></li>
                        <li><a href="#admin" class="nav__link">Admin</a></li>
                    </ul>
                </nav>
                <button class="nav__toggle" id="navToggle" aria-label="Buka menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    </header>

    <!-- Breadcrumb -->
    <div class="breadcrumb" id="breadcrumb">
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb__list" id="breadcrumbList">
                    <li class="breadcrumb__item"><a href="#beranda">Beranda</a></li>
                </ol>
            </nav>
        </div>
    </div>

    <main class="main">
        <!-- Section: Beranda -->
        <section class="section section--hero" id="beranda">
            <div class="container">
                <div class="hero">
                    <div class="hero__content">
                        <h1 class="hero__title">Selamat Datang di Portal Karang Taruna</h1>
                        <p class="hero__subtitle">Melayani masyarakat dengan integritas, transparansi, dan profesionalisme</p>
                        <div class="hero__actions">
                            <a href="#pengaduan" class="btn btn--primary">Laporkan Pengaduan</a>
                            <a href="#informasi" class="btn btn--secondary">Lihat Informasi</a>
                        </div>
                    </div>
                    <div class="hero__image">
                        <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="50" y="50" width="300" height="200" rx="12" fill="#FCBA04" opacity="0.2"/>
                            <rect x="70" y="70" width="260" height="160" rx="8" fill="#A50104" opacity="0.3"/>
                            <circle cx="200" cy="150" r="60" fill="#FCBA04"/>
                            <path d="M200 120L220 150L200 180L180 150L200 120Z" fill="white"/>
                        </svg>
                    </div>
                </div>

                <!-- Statistik -->
                <div class="stats">
                    <div class="stats__item">
                        <div class="stats__number">150+</div>
                        <div class="stats__label">Pengaduan Selesai</div>
                    </div>
                    <div class="stats__item">
                        <div class="stats__number">75+</div>
                        <div class="stats__label">Mediasi Berhasil</div>
                    </div>
                    <div class="stats__item">
                        <div class="stats__number">40+</div>
                        <div class="stats__label">Proposal Disetujui</div>
                    </div>
                    <div class="stats__item">
                        <div class="stats__number">95%</div>
                        <div class="stats__label">Kepuasan Layanan</div>
                    </div>
                </div>

                <!-- Layanan Ringkas -->
                <div class="services">
                    <h2 class="section__title">Layanan Kami</h2>
                    <div class="services__grid">
                        <div class="service-card">
                            <div class="service-card__icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect width="48" height="48" rx="12" fill="#A50104" opacity="0.1"/>
                                    <path d="M24 14L32 20V28L24 34L16 28V20L24 14Z" stroke="#A50104" stroke-width="2"/>
                                </svg>
                            </div>
                            <h3 class="service-card__title">Mediasi Konflik</h3>
                            <p class="service-card__description">Layanan mediasi profesional untuk menyelesaikan konflik warga dengan pendekatan kekeluargaan</p>
                            <a href="#mediasi" class="service-card__link">Ajukan Mediasi →</a>
                        </div>
                        <div class="service-card">
                            <div class="service-card__icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect width="48" height="48" rx="12" fill="#FCBA04" opacity="0.1"/>
                                    <path d="M20 18H28M20 24H28M20 30H24M16 14H32C33.1 14 34 14.9 34 16V32C34 33.1 33.1 34 32 34H16C14.9 34 14 33.1 14 32V16C14 14.9 14.9 14 16 14Z" stroke="#A50104" stroke-width="2"/>
                                </svg>
                            </div>
                            <h3 class="service-card__title">Pengaduan Masyarakat</h3>
                            <p class="service-card__description">Sampaikan keluhan dan aspirasi Anda dengan mudah dan terpantau secara real-time</p>
                            <a href="#pengaduan" class="service-card__link">Buat Pengaduan →</a>
                        </div>
                        <div class="service-card">
                            <div class="service-card__icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect width="48" height="48" rx="12" fill="#A50104" opacity="0.1"/>
                                    <path d="M24 14V34M14 24H34M18 18L30 30M30 18L18 30" stroke="#FCBA04" stroke-width="2"/>
                                </svg>
                            </div>
                            <h3 class="service-card__title">Pengajuan Proposal</h3>
                            <p class="service-card__description">Ajukan proposal kegiatan atau program dengan proses yang transparan dan terstruktur</p>
                            <a href="#pengajuan" class="service-card__link">Ajukan Proposal →</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section: Informasi -->
        <section class="section section--gray" id="informasi">
            <div class="container">
                <h2 class="section__title">Informasi & Berita</h2>
                
                <div class="info-controls">
                    <div class="search-box">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="9" r="6"></circle>
                            <path d="M14 14L18 18"></path>
                        </svg>
                        <input type="text" id="searchInput" class="search-box__input" placeholder="Cari artikel...">
                    </div>
                    <div class="filter-group">
                        <label for="categoryFilter" class="filter-group__label">Kategori:</label>
                        <select id="categoryFilter" class="filter-group__select">
                            <option value="">Semua</option>
                            <option value="pengumuman">Pengumuman</option>
                            <option value="kegiatan">Kegiatan</option>
                            <option value="berita">Berita</option>
                            <option value="artikel">Artikel</option>
                        </select>
                    </div>
                </div>

                <div class="articles-grid" id="articlesGrid">
                    <!-- Articles will be inserted here by JS -->
                </div>

                <div class="pagination" id="pagination">
                    <!-- Pagination will be inserted here by JS -->
                </div>
            </div>
        </section>

        <!-- Section: Mediasi -->
        <section class="section" id="mediasi">
            <div class="container">
                <h2 class="section__title">Layanan Mediasi</h2>
                
                <div class="mediasi-content">
                    <div class="mediasi-info">
                        <h3 class="mediasi-info__title">Apa itu Mediasi?</h3>
                        <p class="mediasi-info__text">Mediasi adalah proses penyelesaian sengketa yang melibatkan pihak ketiga netral (mediator) untuk membantu para pihak mencapai kesepakatan bersama. Karang Taruna menyediakan layanan mediasi profesional untuk konflik antarwarga, sengketa keluarga, atau permasalahan komunitas lainnya.</p>
                        
                        <h4 class="mediasi-info__subtitle">Keuntungan Mediasi:</h4>
                        <ul class="mediasi-info__list">
                            <li>Proses cepat dan efisien</li>
                            <li>Biaya terjangkau atau gratis</li>
                            <li>Kerahasiaan terjamin</li>
                            <li>Solusi win-win untuk semua pihak</li>
                            <li>Mempertahankan hubungan baik</li>
                        </ul>
                    </div>

                    <div class="mediasi-form-container">
                        <h3 class="form__title">Form Permintaan Mediasi</h3>
                        <form id="mediasiForm" class="form" novalidate>
                            <div class="form__group">
                                <label for="mediasiNama" class="form__label">Nama Lengkap <span class="required">*</span></label>
                                <input type="text" id="mediasiNama" class="form__input" required aria-required="true">
                                <span class="form__error" id="mediasiNamaError"></span>
                            </div>

                            <div class="form__group">
                                <label for="mediasiKontak" class="form__label">Kontak (HP/Email) <span class="required">*</span></label>
                                <input type="text" id="mediasiKontak" class="form__input" required aria-required="true">
                                <span class="form__error" id="mediasiKontakError"></span>
                            </div>

                            <div class="form__group">
                                <label for="mediasiPihak" class="form__label">Pihak yang Terlibat <span class="required">*</span></label>
                                <textarea id="mediasiPihak" class="form__textarea" rows="3" placeholder="Sebutkan semua pihak yang terlibat dalam konflik" required aria-required="true"></textarea>
                                <span class="form__error" id="mediasiPihakError"></span>
                            </div>

                            <div class="form__group">
                                <label for="mediasiKasus" class="form__label">Ringkasan Kasus <span class="required">*</span></label>
                                <textarea id="mediasiKasus" class="form__textarea" rows="5" placeholder="Jelaskan secara singkat kronologi dan inti permasalahan" required aria-required="true"></textarea>
                                <span class="form__error" id="mediasiKasusError"></span>
                            </div>

                            <div class="form__group">
                                <label for="mediasiTanggal" class="form__label">Tanggal Preferensi Mediasi <span class="required">*</span></label>
                                <input type="date" id="mediasiTanggal" class="form__input" required aria-required="true">
                                <span class="form__error" id="mediasiTanggalError"></span>
                            </div>

                            <div class="form__actions">
                                <button type="submit" class="btn btn--primary">Kirim Permintaan</button>
                                <button type="reset" class="btn btn--secondary">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section: Pengaduan -->
        <section class="section section--gray" id="pengaduan">
            <div class="container">
                <h2 class="section__title">Pengaduan Masyarakat</h2>
                
                <div class="pengaduan-header">
                    <p class="pengaduan-header__text">Sampaikan keluhan, aspirasi, atau laporan Anda. Setiap pengaduan akan mendapat nomor tracking untuk monitoring status.</p>
                    <button id="loadDraftBtn" class="btn btn--secondary btn--sm">Muat Draft Tersimpan</button>
                </div>

                <form id="pengaduanForm" class="form form--large" novalidate>
                    <div class="form__row">
                        <div class="form__group form__group--full">
                            <label for="pengaduanJudul" class="form__label">Judul Pengaduan <span class="required">*</span></label>
                            <input type="text" id="pengaduanJudul" class="form__input" required aria-required="true">
                            <span class="form__error" id="pengaduanJudulError"></span>
                        </div>
                    </div>

                    <div class="form__row">
                        <div class="form__group">
                            <label for="pengaduanKategori" class="form__label">Kategori <span class="required">*</span></label>
                            <select id="pengaduanKategori" class="form__select" required aria-required="true">
                                <option value="">Pilih kategori</option>
                                <option value="infrastruktur">Infrastruktur</option>
                                <option value="lingkungan">Lingkungan</option>
                                <option value="sosial">Sosial</option>
                                <option value="keamanan">Keamanan</option>
                                <option value="layanan">Layanan Publik</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                            <span class="form__error" id="pengaduanKategoriError"></span>
                        </div>

                        <div class="form__group">
                            <label for="pengaduanLokasi" class="form__label">Lokasi <span class="required">*</span></label>
                            <input type="text" id="pengaduanLokasi" class="form__input" placeholder="Contoh: Jl. Merdeka No. 10" required aria-required="true">
                            <span class="form__error" id="pengaduanLokasiError"></span>
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="pengaduanDeskripsi" class="form__label">Deskripsi Pengaduan <span class="required">*</span></label>
                        <textarea id="pengaduanDeskripsi" class="form__textarea" rows="6" placeholder="Jelaskan pengaduan Anda secara detail..." required aria-required="true"></textarea>
                        <span class="form__error" id="pengaduanDeskripsiError"></span>
                    </div>

                    <div class="form__group">
                        <label for="pengaduanFile" class="form__label">Upload Bukti (Foto/PDF, maks 5MB)</label>
                        <div class="file-upload">
                            <input type="file" id="pengaduanFile" class="file-upload__input" accept="image/*,.pdf" aria-describedby="fileHelp">
                            <label for="pengaduanFile" class="file-upload__label">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <span id="fileLabel">Pilih file atau drag & drop</span>
                            </label>
                        </div>
                        <small id="fileHelp" class="form__help">Format: JPG, PNG, PDF. Maksimal 5MB</small>
                        <span class="form__error" id="pengaduanFileError"></span>
                        
                        <div id="filePreview" class="file-preview" style="display: none;">
                            <div class="file-preview__header">
                                <span class="file-preview__title">Preview File:</span>
                                <button type="button" id="removeFileBtn" class="file-preview__remove" aria-label="Hapus file">×</button>
                            </div>
                            <div id="filePreviewContent" class="file-preview__content"></div>
                        </div>
                    </div>

                    <div class="form__actions">
                        <button type="submit" class="btn btn--primary">Kirim Pengaduan</button>
                        <button type="button" id="saveDraftBtn" class="btn btn--secondary">Simpan Draft</button>
                        <button type="reset" class="btn btn--tertiary">Reset</button>
                    </div>
                </form>

                <!-- Tracking Status -->
                <div class="tracking-section">
                    <h3 class="tracking-section__title">Lacak Status Pengaduan</h3>
                    <div class="tracking-form">
                        <input type="text" id="trackingInput" class="form__input" placeholder="Masukkan nomor pengaduan (CTR-YYYYMMDD-XXXX)">
                        <button id="trackingBtn" class="btn btn--primary">Lacak</button>
                    </div>
                    <div id="trackingResult" class="tracking-result" style="display: none;"></div>
                </div>
            </div>
        </section>

        <!-- Section: Pengajuan -->
        <section class="section" id="pengajuan">
            <div class="container">
                <h2 class="section__title">Pengajuan Proposal</h2>
                
                <div class="pengajuan-intro">
                    <p>Ajukan proposal kegiatan atau program Anda. Pastikan dokumen proposal sudah lengkap sebelum diunggah.</p>
                    <a href="#" id="downloadTemplateBtn" class="btn btn--secondary btn--sm">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 10v2.67A1.33 1.33 0 0112.67 14H3.33A1.33 1.33 0 012 12.67V10M11.33 5.33L8 2M8 2L4.67 5.33M8 2v8"></path>
                        </svg>
                        Download Template Proposal
                    </a>
                </div>

                <form id="pengajuanForm" class="form form--large" novalidate>
                    <div class="form__row">
                        <div class="form__group form__group--full">
                            <label for="pengajuanJudul" class="form__label">Judul Proposal <span class="required">*</span></label>
                            <input type="text" id="pengajuanJudul" class="form__input" required aria-required="true">
                            <span class="form__error" id="pengajuanJudulError"></span>
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="pengajuanRingkasan" class="form__label">Ringkasan Proposal <span class="required">*</span></label>
                        <textarea id="pengajuanRingkasan" class="form__textarea" rows="4" placeholder="Jelaskan tujuan dan manfaat proposal Anda..." required aria-required="true"></textarea>
                        <span class="form__error" id="pengajuanRingkasanError"></span>
                    </div>

                    <div class="form__row">
                        <div class="form__group">
                            <label for="pengajuanAnggaran" class="form__label">Anggaran (Rp) <span class="required">*</span></label>
                            <input type="text" id="pengajuanAnggaran" class="form__input" placeholder="Contoh: 5000000" required aria-required="true">
                            <span class="form__error" id="pengajuanAnggaranError"></span>
                        </div>

                        <div class="form__group">
                            <label for="pengajuanPIC" class="form__label">Penanggung Jawab (PIC) <span class="required">*</span></label>
                            <input type="text" id="pengajuanPIC" class="form__input" required aria-required="true">
                            <span class="form__error" id="pengajuanPICError"></span>
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="pengajuanDokumen" class="form__label">Upload Dokumen Proposal (PDF, maks 10MB) <span class="required">*</span></label>
                        <div class="file-upload">
                            <input type="file" id="pengajuanDokumen" class="file-upload__input" accept=".pdf" required aria-required="true">
                            <label for="pengajuanDokumen" class="file-upload__label">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                    <polyline points="13 2 13 9 20 9"></polyline>
                                </svg>
                                <span id="dokumenLabel">Pilih file PDF</span>
                            </label>
                        </div>
                        <small class="form__help">Format: PDF. Maksimal 10MB</small>
                        <span class="form__error" id="pengajuanDokumenError"></span>
                    </div>

                    <div class="form__actions">
                        <button type="submit" class="btn btn--primary">Ajukan Proposal</button>
                        <button type="reset" class="btn btn--secondary">Reset</button>
                    </div>
                </form>

                <!-- Status Pengajuan -->
                <div class="status-section">
                    <h3 class="status-section__title">Cek Status Pengajuan</h3>
                    <div class="status-form">
                        <input type="text" id="statusInput" class="form__input" placeholder="Masukkan nomor pengajuan">
                        <button id="statusBtn" class="btn btn--primary">Cek Status</button>
                    </div>
                    <div id="statusResult" class="status-result" style="display: none;"></div>
                </div>
            </div>
        </section>

        <!-- Section: Admin -->
        <section class="section section--gray" id="admin">
            <div class="container">
                <h2 class="section__title">Panel Admin</h2>
                
                <div id="adminLogin" class="admin-login">
                    <div class="admin-login__card">
                        <h3 class="admin-login__title">Login Admin</h3>
                        <form id="adminLoginForm" class="form">
                            <div class="form__group">
                                <label for="adminUsername" class="form__label">Username</label>
                                <input type="text" id="adminUsername" class="form__input" required>
                            </div>
                            <div class="form__group">
                                <label for="adminPassword" class="form__label">Password</label>
                                <input type="password" id="adminPassword" class="form__input" required>
                            </div>
                            <button type="submit" class="btn btn--primary btn--full">Login</button>
                            <p class="admin-login__hint">Hint: username: admin, password: admin123</p>
                        </form>
                    </div>
                </div>

                <div id="adminPanel" class="admin-panel" style="display: none;">
                    <div class="admin-panel__header">
                        <h3 class="admin-panel__title">Dashboard Admin</h3>
                        <button id="adminLogoutBtn" class="btn btn--secondary btn--sm">Logout</button>
                    </div>

                    <div class="admin-tabs">
                        <button class="admin-tab admin-tab--active" data-tab="pengaduan">Pengaduan</button>
                        <button class="admin-tab" data-tab="mediasi">Mediasi</button>
                        <button class="admin-tab" data-tab="pengajuan">Pengajuan</button>
                    </div>

                    <div id="adminContent" class="admin-content">
                        <!-- Content will be loaded by JS -->
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer__content">
                <div class="footer__section">
                    <h4 class="footer__title">Karang Taruna</h4>
                    <p class="footer__text">Organisasi kepemudaan yang bergerak dalam pemberdayaan masyarakat dan pelayanan publik.</p>
                </div>
                <div class="footer__section">
                    <h4 class="footer__title">Kontak</h4>
                    <p class="footer__text">Email: info@karangtaruna.id<br>Telp: (021) 1234-5678<br>Alamat: Jl. Pemuda No. 123</p>
                </div>
                <div class="footer__section">
                    <h4 class="footer__title">Jam Layanan</h4>
                    <p class="footer__text">Senin - Jumat: 08.00 - 16.00<br>Sabtu: 08.00 - 12.00<br>Minggu: Tutup</p>
                </div>
            </div>
            <div class="footer__bottom">
                <p>&copy; 2025 Karang Taruna. Hak Cipta Dilindungi.</p>
            </div>
        </div>
    </footer>

    <!-- Toast Notification -->
    <div id="toast" class="toast" role="alert" aria-live="polite" aria-atomic="true"></div>

    <!-- Modal -->
    <div id="modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal__overlay" id="modalOverlay"></div>
        <div class="modal__content">
            <div class="modal__header">
                <h3 id="modalTitle" class="modal__title"></h3>
                <button class="modal__close" id="modalClose" aria-label="Tutup modal">×</button>
            </div>
            <div id="modalBody" class="modal__body"></div>
            <div id="modalFooter" class="modal__footer"></div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>