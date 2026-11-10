import { ref, computed } from 'vue';

// BASE URL diambil dari variabel lingkungan Vite (.env -> VITE_API_URL)
const BASE_URL = import.meta.env.VITE_API_URL;

// SINGLE SOURCE OF TRUTH (state reaktif bersama/singleton)
const events = ref([]);
const loading = ref(false);
const error = ref(null);
const isSubmitting = ref(false);

// DERIVED STATE
const totalEvents = computed(() => events.value.length);
const activeEvents = computed(() => events.value.filter(e => !e.done));
const completedEvents = computed(() => events.value.filter(e => e.done));

// Helper: baca body JSON dengan aman
const parseJson = async (res) => {
  try { return await res.json(); } catch { return null; }
};

// GET: ambil semua acara dari server
const isConfigured = () => {
  return !!BASE_URL && !BASE_URL.includes('GANTI_DENGAN');
};

const fetchEvents = async () => {
  if (!isConfigured()) {
    loading.value = false;
    error.value = 'VITE_API_URL belum diisi. Isi file .env dengan URL endpoint MockAPI milikmu, lalu restart npm run dev.';
    events.value = [];
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Gagal memuat data acara (HTTP ${res.status})`);
    const data = await parseJson(res);
    events.value = Array.isArray(data) ? data : [];
  } catch (e) {
    error.value = e?.message || 'Gagal memuat data dari server.';
    events.value = [];
  } finally {
    loading.value = false;
  }
};

// GET: ambil detail acara berdasarkan id
const fetchEventById = async (id) => {
  if (!isConfigured()) {
    error.value = 'VITE_API_URL belum diisi. Isi file .env dengan URL endpoint MockAPI milikmu, lalu restart npm run dev.';
    return null;
  }
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      if (res.status === 404) throw new Error('NOT_FOUND');
      throw new Error(`Gagal memuat detail acara (HTTP ${res.status})`);
    }
    const data = await parseJson(res);
    const idx = events.value.findIndex(e => String(e.id) === String(id));
    if (idx === -1) events.value.push(data);
    else events.value[idx] = data;
    return data;
  } catch (e) {
    error.value = e?.message || 'Gagal memuat detail acara.';
    return null;
  } finally {
    loading.value = false;
  }
};

// POST: buat acara baru
const createEvent = async (eventData) => {
  if (!isConfigured()) {
    const msg = 'VITE_API_URL belum diisi. Isi file .env dengan URL endpoint MockAPI milikmu, lalu restart npm run dev.';
    error.value = msg;
    throw new Error(msg);
  }
  isSubmitting.value = true;
  error.value = null;
  try {
    const payload = {
      title: eventData.title,
      cat: eventData.cat,
      date: eventData.date,
      loc: eventData.loc,
      quota: Number(eventData.quota) || 100,
      desc: eventData.desc,
      done: false
    };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Gagal membuat acara (HTTP ${res.status})`);
    const created = await parseJson(res);
    events.value.unshift(created);
    return created;
  } catch (e) {
    error.value = e?.message || 'Gagal membuat acara.';
    throw e;
  } finally {
    isSubmitting.value = false;
  }
};

// PUT: tandai acara selesai
const completeEvent = async (id) => {
  const target = events.value.find(e => String(e.id) === String(id));
  if (!target) return;
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...target, done: true })
    });
    if (!res.ok) throw new Error(`Gagal memperbarui status acara (HTTP ${res.status})`);
    const updated = await parseJson(res);
    const idx = events.value.findIndex(e => String(e.id) === String(id));
    if (idx !== -1) events.value[idx] = updated || { ...target, done: true };
  } catch (e) {
    error.value = e?.message || 'Gagal memperbarui status acara.';
  } finally {
    loading.value = false;
  }
};

// DELETE: hapus acara
const deleteEvent = async (id) => {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Gagal menghapus acara (HTTP ${res.status})`);
    events.value = events.value.filter(e => String(e.id) !== String(id));
  } catch (e) {
    error.value = e?.message || 'Gagal menghapus acara.';
    throw e;
  } finally {
    loading.value = false;
  }
};

// PENCARIAN DATA BERDASARKAN ID (dari cache lokal)
const getEventById = (id) => {
  return events.value.find(e => String(e.id) === String(id));
};

// RESET (opsional)
const clearAllEvents = () => {
  events.value = [];
  error.value = null;
};

export function useEvents() {
  return {
    events,
    loading,
    error,
    isSubmitting,
    totalEvents,
    activeEvents,
    completedEvents,
    fetchEvents,
    fetchEventById,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById,
    clearAllEvents
  };
}
