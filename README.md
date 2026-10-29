# Gatherly — Manajemen State dan Interaksi Pengguna

Aplikasi Gatherly untuk mengelola acara menggunakan Vue 3 Composition API. Data acara disimpan pada satu composable reaktif dan disinkronkan ke `localStorage`, sehingga perubahan dari dashboard penyelenggara langsung terlihat di katalog publik.

## Fitur

- Dashboard pemantauan dengan ringkasan total, acara aktif, acara selesai, dan status acara terbaru.
- Event Management dengan tab Active Events, Create Event, dan Completed Events.
- Validasi formulir, konfirmasi modal untuk aksi selesai/hapus, dan arsip acara.
- Katalog publik hanya menampilkan acara aktif; halaman detail membaca data berdasarkan ID dan menangani acara yang tidak ditemukan.
- State acara bertahan setelah halaman dimuat ulang melalui `localStorage`.

## Menjalankan aplikasi

```sh
npm install
npm run dev
```

Untuk memeriksa build produksi:

```sh
npm run build
```

Buka `/dashboard` untuk pemantauan, `/dashboard/events` untuk pengelolaan acara, dan `/browse/events` untuk katalog publik. Daftar acara dimulai kosong; buat acara pertama dari halaman pengelolaan.
