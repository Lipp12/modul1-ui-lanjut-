# Panduan Seksi F: Menyimpan URL Endpoint (Modul 6)

Referensi: Modul 6 - Integrasi UI dengan Layanan Sistem, halaman 13.

## Apa yang harus dilakukan di sini?

Setelah data awal acara berhasil disimpan di MockAPI (langkah F.e), kamu perlu:

1. Mengambil alamat URL API dari halaman dasbor MockAPI milikmu.
2. Menyimpan alamat tersebut sementara (catatan).
3. Mendaftarkan alamat endpoint ke file konfigurasi proyek Vue (`.env`)
   sebagai `VITE_API_URL`, sehingga antarmuka Gatherly dapat mengambil
   data dari server melalui `import.meta.env.VITE_API_URL`.

## Langkah-langkah praktik

### 1. Ambil URL endpoint dari MockAPI
- Buka https://mockapi.io/, login dengan GitHub atau Google.
- Masuk ke project `gatherly-api` (API Prefix: `/api/v1`).
- Klik resource `events`, lalu buka tab **Data**.
- Salin alamat URL lengkap endpoint resource `events` yang tercantum di dasbor.
  Contoh: `https://mockapi.io/api/v1/<kode-unik-mu>/events`
- **Catatan:** Setiap orang memiliki endpoint yang berbeda (UNIK). Jangan
  salin URL dari contoh modul atau dari teman.

### 2. Buat / isi file `.env` di root project
File `.env` sudah disediakan di folder ini. Buka file `.env` lalu ganti
baris berikut:

```
VITE_API_URL=GANTI_DENGAN_URL_ENDPOINT_MOCKAPI_MUATI_DISINI
```

dengan URL asli milikmu, contoh:

```
VITE_API_URL=https://mockapi.io/api/v1/abc123def456/events
```

Simpan file.

### 3. Gunakan di dalam composable `useEvents.js`
Di dalam `src/composables/useEvents.js`, baca base URL lewat:

```js
const BASE_URL = import.meta.env.VITE_API_URL
```

Kemudian gunakan `BASE_URL` sebagai awalan saat memanggil endpoint, misal:

```js
fetch(`${BASE_URL}/events`)          // GET semua acara
fetch(`${BASE_URL}/events/${id}`)   // GET detail acara
fetch(`${BASE_URL}/events`, { method: 'POST', ... }) // POST acara baru
fetch(`${BASE_URL}/events/${id}`, { method: 'DELETE' }) // DELETE acara
```

### 4. Restart server development
Setelah mengubah `.env`, matikan `npm run dev` (Ctrl+C) lalu jalankan ulang:

```bash
npm run dev
```

## File yang terkait (dari Struktur Project, halaman 6)

```
belajar-vue/
├── .env              <-- file ini (New File, konfigurasi endpoint MockAPI)
└── src/
    ├── composables/
    │   └── useEvents.js   (Modified - pakai VITE_API_URL)
    └── views/
        └── EventList.vue  (Modified - 4 kondisi: loading, error, empty, data)
```

## Checklist selesai Seksion F
- [ ] URL endpoint MockAPI disalin dari dasbor pribadi
- [ ] File `.env` diisi dengan `VITE_API_URL=<url-mu>`
- [ ] File `.env` disimpan
- [ ] Server development di-restart
- [ ] (Selanjutnya) Verifikasi di konsol browser bahwa `import.meta.env.VITE_API_URL` tersedia

---

> Peringatan: Jangan commit file `.env` yang berisi URL asli ke repositori publik
> jika terdapat informasi sensitif. Untuk tugas praktikum, ikuti petunjuk asisten
> tentang branch dan pengumpulan (branch `Modul 6`, lalu Pull Request ke `main`).
