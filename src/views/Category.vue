<script setup>
import { computed } from 'vue';
import { useEvents } from '@/composables/useEvents';
import EventCard from '@/components/event/EventCard.vue';
import Breadcrumb from '@/components/app/Breadcrumb.vue';
import AppCard from '@/components/ui/AppCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { activeEvents } = useEvents();

const categories = ['Workshop', 'Meetup', 'Competition', 'Seminar', 'Conference'];

const grouped = computed(() =>
  categories
    .map((cat) => ({
      cat,
      items: activeEvents.value.filter((e) => e.cat === cat)
    }))
    .filter((group) => group.items.length > 0)
);
</script>

<template>
  <div class="category-page">
    <Breadcrumb />

    <h1 class="page-title">Browse by Category</h1>
    <p class="page-desc">Every active event on Gatherly, grouped by its type.</p>

    <section v-for="group in grouped" :key="group.cat" class="category-section">
      <h2 class="category-heading"><span class="category-badge">{{ group.cat }}</span></h2>
      <div class="category-grid">
        <EventCard
          v-for="item in group.items"
          :key="item.id"
          :event="item"
          @view-detail="(id) => router.push(`/browse/events/${id}`)"
        />
      </div>
    </section>

    <AppCard v-if="grouped.length === 0" class="empty-card">
      <h3>Nothing published yet</h3>
      <p>Head over to the Organizer Dashboard to publish your first event.</p>
    </AppCard>
  </div>
</template>

<style scoped>
.category-page { padding: var(--space-8) 0; }

.page-title {
  font-size: 2.2rem;
  margin-bottom: var(--space-2);
}

.page-desc {
  color: var(--text-muted);
  margin-bottom: var(--space-8);
}

.category-section { margin-bottom: var(--space-12); }

.category-heading { margin-bottom: var(--space-6); }

.category-badge {
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.empty-card {
  padding: var(--space-12);
  text-align: center;
}

.empty-card p { color: var(--text-muted); margin-top: var(--space-2); }
</style>