# website-pkm

# 🌿 Git Branch Workflow Cheatsheet

Panduan cepat buat kerja bareng di repo ini tanpa bikin `main` rusak 😎  

---
```bash
## 🧩 1. Setup Awal
git clone https://github.com/codename24kai/PKM.git
cd REPO
git config --global user.name "username"
git config --global user.email "emailkamu@example.com"

# Ngerjain dan Commit Perubahan
git add . (nambahin semua file yang ada di repo lokal/ folder)
git add nama.file (nambahin 1 file)

git commit -m "catatan"

#pushS 
git push -u origin main

#pull
git pull origin main

