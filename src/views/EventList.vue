<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import EventCard from '@/components/event/EventCard.vue';
import SearchBar from '@/components/event/SearchBar.vue';
import CategoryFilter from '@/components/event/CategoryFilter.vue';
import AppButton from '@/components/ui/AppButton.vue';

const router = useRouter();

const { activeEvents, loading, error, fetchEvents } = useEvents();

const searchQuery = ref('');
const selectedCategory = ref('All');
const categories = ['All', 'Workshop', 'Meetup', 'Competition', 'Seminar', 'Conference'];

const filteredEvents = computed(() => {
  return activeEvents.value.filter(event => {
    const matchSearch = (event.title || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        (event.loc || '').toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchCat = selectedCategory.value === 'All' || event.cat === selectedCategory.value;
    return matchSearch && matchCat;
  });
});

const handleViewDetail = (id) => {
  router.push(`/browse/events/${id}`);
};

onMounted(() => {
  fetchEvents();
});
</script>

<template>
  <div class="event-list-page">
    <div class="header-section">
      <h2 class="section-title">Upcoming Events</h2>
      <p class="section-desc">Discover workshops, seminars, tech meetups, and competitions near you.</p>
    </div>

    <div class="filters-section">
      <SearchBar v-model="searchQuery" />
      <CategoryFilter :categories="categories" v-model="selectedCategory" />
    </div>

    <!-- 1. LOADING STATE -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p class="loading-text">Memuat data acara dari server...</p>
    </div>

    <!-- 2. ERROR STATE -->
    <div v-else-if="error" class="error-card">
      <div class="error-icon">⚠️</div>
      <h3>Gagal Memuat Data</h3>
      <p class="error-message">{{ error }}</p>
      <AppButton variant="primary" @click="fetchEvents">Muat Ulang</AppButton>
    </div>

    <!-- 3. EMPTY STATE -->
    <div v-else-if="filteredEvents.length === 0" class="empty-state">
      <div class="empty-icon">🗓</div>
      <h3>No Events Available Yet</h3>
      <p>
        There are currently no active events scheduled. Are you an organizer?<br />
        Publish and manage your first event today through the Dashboard!
      </p>
      <div class="empty-action">
        <AppButton variant="primary" @click="router.push('/dashboard')">
          Go to Organizer Dashboard &rarr;
        </AppButton>
      </div>
    </div>

    <!-- 4. DATA STATE -->
    <div v-else class="event-grid">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @view-detail="handleViewDetail"
      />
    </div>

    <!-- Toolbar muat ulang (opsional, di bilah atas saat data tampil) -->
    <div v-if="!loading && !error && filteredEvents.length > 0" class="reload-bar">
      <AppButton variant="secondary" @click="fetchEvents">Muat Ulang</AppButton>
    </div>
  </div>
</template>

<style scoped>
.header-section { margin-bottom: var(--space-8); }
.section-title { font-size: 2.2rem; margin-bottom: var(--space-2); }
.section-desc { color: var(--text-muted); font-size: 1.1rem; }

.filters-section {
  margin-bottom: var(--space-6);
}

/* LOADING */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-8);
  color: var(--text-muted);
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: var(--space-4);
}
.loading-text { font-size: 1rem; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ERROR */
.error-card {
  text-align: center;
  padding: var(--space-12) var(--space-8);
  color: var(--text-muted);
  background: white;
  border-radius: var(--space-4);
  border: 1px solid #ffa8a8;
  max-width: 600px;
  margin: var(--space-8) auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}
.error-icon { font-size: 3rem; margin-bottom: var(--space-3); }
.error-card h3 { font-size: 1.5rem; color: #c92a2a; margin-bottom: var(--space-2); }
.error-message { margin-bottom: var(--space-6); font-size: 0.95rem; }

/* EMPTY */
.empty-state {
  text-align: center;
  padding: var(--space-12) var(--space-8);
  color: var(--text-muted);
  background: white;
  border-radius: var(--space-4);
  border: 1px dashed var(--border-color);
  max-width: 600px;
  margin: var(--space-8) auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}
.empty-icon { font-size: 3.5rem; margin-bottom: var(--space-3); }
.empty-state h3 { font-size: 1.5rem; color: var(--text-main); margin-bottom: var(--space-2); }
.empty-state p { line-height: 1.6; margin-bottom: var(--space-6); font-size: 1rem; }
.empty-action { display: flex; justify-content: center; }

/* DATA GRID */
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.reload-bar {
  margin-top: var(--space-6);
  display: flex;
  justify-content: center;
}
</style>
