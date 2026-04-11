# 🚀 OrangeHRM Automation Testing - Project Akhir

Proyek ini adalah framework automasi pengujian untuk website **OrangeHRM** menggunakan **Cypress**. Framework ini dirancang dengan arsitektur yang bersih menggunakan **Page Object Model (POM)** untuk memudahkan pemeliharaan skrip dan **API Intercept** untuk validasi data pada level network.

## 🛠️ Teknologi yang Digunakan
* **Cypress v13+**: Framework utama untuk end-to-end testing.
* **JavaScript**: Bahasa pemrograman utama.
* **Page Object Model (POM)**: Memisahkan logika elemen UI dengan skenario pengujian (disimpan langsung di folder `support`).
* **Cypress Intercept**: Memantau, menunggu, dan memvalidasi respon API backend agar test lebih stabil.

---

## 📂 Struktur Proyek
- **cypress/e2e/**: File skenario pengujian (login.cy.js, forgotPassword.cy.js, directory.cy.js).
- **cypress/support/**: Folder Page Objects (LoginPage.js, ForgotPassPage.js, DirectoryPage.js) dan konfigurasi global.
- **cypress.config.js**: File konfigurasi utama Cypress.

---

## 📝 Ringkasan Skenario Pengujian 

### 1. Login & Authentication 
* Pengujian login sukses dengan akun Admin.
* Validasi pesan error untuk username/password yang salah atau tidak terdaftar.
* Penanganan input kosong (*Required field validation*).
* Verifikasi sensitivitas huruf (*case sensitive*) pada password.
* Pengujian fungsi **Logout** dan proteksi sesi halaman login.

### 2. Forgot Password 
* Alur sukses pengajuan reset password menggunakan username valid.
* Validasi tombol "Cancel" untuk kembali ke halaman utama login.
* Verifikasi elemen UI seperti logo branding dan judul halaman reset.
* Pengujian berbagai kondisi input (karakter khusus, empty field).
* **API Intercept**: Memastikan status code 200/302 saat melakukan request reset.

### 3. Directory & Dashboard
* Pencarian karyawan menggunakan fitur **Autocomplete**.
* Filter data karyawan berdasarkan **Job Title** dan **Location**.
* Verifikasi fungsi tombol **Reset** untuk membersihkan filter pencarian.
* Pengujian skenario pencarian data yang tidak terdaftar (*No Records Found*).
* **API Intercept**: Menunggu respon API `GET` sebelum memvalidasi hasil pada UI.

---

## ⚙️ Cara Instalasi & Menjalankan Test

### 1. Prasyarat
Pastikan Anda sudah menginstall **Node.js** (Versi 18 ke atas) dan **VS Code**.

### 2. Langkah Menjalankan
1. Masuk ke direktori proyek:
   `cd Project-Akhir_Sanbercode`
2. Install semua dependensi:
   `npm install`
3. Buka Cypress UI:
   `npx cypress open`
4. Jalankan via terminal (Headless):
   `npx cypress run`

---

## 💡 Informasi Tambahan
* **Stability**: Skrip telah dilengkapi dengan penanganan `uncaught:exception` di `e2e.js` untuk mengabaikan error internal dari aplikasi demo OrangeHRM.
* **Waiting Strategy**: Menggunakan *dynamic waiting* dan *intercept* untuk mengatasi masalah server demo yang lambat.

---
**Disusun Oleh:** Junita Amalia  
**Tujuan:** Proyek Akhir Software Testing Automation