<script setup>
import AppCard from '@/components/ui/AppCard.vue';

defineProps({
  event: {
    type: Object,
    required: true
  }
});

defineEmits(['view-detail']);
</script>

<template>
  <AppCard class="event-card" @click="$emit('view-detail', event.id)">
    <div class="card-top">
      <span class="event-date">{{ event.date }}</span>
      <span class="event-category">{{ event.cat }}</span>
    </div>

    <h3 class="event-title">{{ event.title }}</h3>
    <p class="event-location">{{ event.loc }}</p>
    <p class="event-desc">{{ event.desc }}</p>

    <div class="card-footer">
      <span class="event-quota">👥 {{ event.quota }} Pax</span>
      <span class="event-price">{{ event.price }}</span>
    </div>
  </AppCard>
</template>

<style scoped>
.event-card {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.event-date {
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
}

.event-category {
  background: var(--bg-light);
  color: var(--text-muted);
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.event-title {
  font-size: 1.25rem;
  margin-bottom: var(--space-2);
  color: var(--text-main);
}

.event-location {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: var(--space-4);
}

.event-desc {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: var(--space-6);
  flex-grow: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-color);
  font-size: 0.9rem;
  font-weight: 600;
}

.event-quota { color: var(--text-muted); }
.event-price  { color: var(--primary); }
</style>