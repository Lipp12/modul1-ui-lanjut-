# Gatherly — Modul 4: Manajemen State dan Interaksi Pengguna

Praktikum **Pengembangan UI Lanjut** — refactoring aplikasi Gatherly dari *Static UI*
menjadi *Dynamic UI* menggunakan **Vue.js 3 Composition API**.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build produksi ke /dist
```

## Rute

| Path                  | Halaman                | Peran                              |
| --------------------- | ---------------------- | ---------------------------------- |
| `/`                   | Home                   | Landing publik                     |
| `/browse/events`      | EventList              | Katalog acara publik (konsumen)    |
| `/browse/events/:id`  | EventDetail            | Rincian acara (konsumen)           |
| `/browse/category`    | Category               | Pengelompokan kategori             |
| `/about`, `/contact`  | About, Contact         | Halaman pendukung                  |
| `/dashboard`          | Dashboard              | **Read-only monitoring**           |
| `/dashboard/events`   | EventManagement        | **Pusat mutasi state (3 Tab)**     |

## Peta Implementasi (Bagian E)

| # | File                                 | Status  | Konsep                                  |
| - | ------------------------------------ | ------- | --------------------------------------- |
| 1 | `src/composables/useEvents.js`       | **Baru** | Single Source of Truth, `computed`, `watch` |
| 2 | `src/components/ui/AppModal.vue`    | **Baru** | Dialog konfirmasi + backdrop blur      |
| 3 | `src/views/EventManagement.vue`      | **Baru** | 3 Tab & mutasi Create/Complete/Delete   |
| 4 | `src/views/Dashboard.vue`            | Ubah    | Metrik turunan & tabel status           |
| 5 | `src/views/EventList.vue`            | Ubah    | Katalog reaktif + Friendly Empty State  |
| 6 | `src/views/EventDetail.vue`          | Ubah    | Detail berbasis ID + graceful 404      |
| 7 | `src/router/index.js`                | Ubah    | Nested routes (`/dashboard/events`)     |
| 8 | `src/layouts/DashboardLayout.vue`    | Ubah    | Rail navigasi & exact-active-class      |

## Konsep Kunci

- **Single Source of Truth** — `events` dideklarasikan di luar `useEvents()` sebagai
  *composable singleton*, sehingga Dasbor dan halaman publik membaca referensi yang sama.
- **Derived State** — `totalEvents`, `activeEvents`, `completedEvents` memakai
  `computed()` (otomatis + ter-cache), tanpa menyalin data.
- **Side Effects** — `watch(events, ..., { deep: true })` menyinkronkan state ke
  `localStorage` (key `gatherly_events`). Opsi `deep` wajib agar perubahan
  `item.done = true` ikut tersimpan.
- **Destructive Action Confirmation** — `AppModal` bersifat *stateless*; hanya
  memancarkan `confirm` / `close`. `@click.self` mencegah klik di dalam kartu
  ikut menutup dialog.
- **UI States** — Default, Empty State, Error State, Success State, dan
  Dynamic Styling (`:class="['status-badge', item.done ? ... : ...]"`).

## Catatan Penting (Error yang Sering Terjadi)

1. **`ref` di dalam `<script setup>`** harus diakses dengan `.value` di JS
   (`events.value`) — tetapi **tanpa** `.value` di template (`{{ totalEvents }}`).
2. **`computed` bukan fungsi** — jangan menulis `{{ totalEvents() }}` di template.
3. **ID dari URL selalu `string`** — `getEventById()` mengonversi dengan
   `Number(id)`, jika tidak acara selalu dianggap tidak ditemukan.
4. **Reset form pakai `Object.assign()`/assign properti**, bukan
   `form = {...}` yang merusak reaktivitas.
5. **Validasi wajib `.trim()`** agar spasi kosong tidak lolos.
6. **Daftar publik menyaring `activeEvents`**, bukan `events` — agar acara selesai
   tidak masih muncul di katalog.

## Catatan

Folder ini sebelumnya kosong, sehingga scaffold Vue 3 + Vite beserta file
pendukung (`main.css`, `AppButton`, `AppCard`, `EventCard`, `SearchBar`,
`CategoryFilter`, `Navbar`, `Breadcrumb`, `App.vue`, serta view
Home/About/Browse/Category/Contact) dibuat dari nol mengikuti struktur pada
Bagian D modul. Delapan file pada tabel di atas ditulis sesuai lampiran kode
modul. `DashboardLayout.vue` memakai `<script setup>` biasa (bukan `lang="ts"`)
agar tidak memerlukan dependensi TypeScript.

`useEvents.js` diekspor dengan nilai awal `[]` sehingga aplikasi mulai dari
**Empty State** — kosongkan `localStorage` (`gatherly_events`) untuk mengulang
kondisi awal.