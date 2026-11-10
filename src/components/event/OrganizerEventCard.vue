<script setup>
import AppCard from '@/components/ui/AppCard.vue';
import AppButton from '@/components/ui/AppButton.vue';

defineProps({
  event: { type: Object, required: true }
});

defineEmits(['view-detail', 'complete', 'delete']);
</script>

<template>
  <AppCard class="organizer-event-card">
    <div class="card-header">
      <span class="category-badge">{{ event.cat }}</span>
      <span v-if="event.done" class="status-badge status-completed">Completed</span>
      <span v-else class="status-badge status-active">Active</span>
    </div>

    <h3 class="event-title" :class="{ 'text-strike': event.done }">{{ event.title }}</h3>
    <p class="event-meta">📅 {{ event.date }} &bull; {{ event.loc }}</p>
    <p class="event-desc">{{ event.desc }}</p>

    <div class="card-actions">
      <button class="btn-action btn-detail" @click="$emit('view-detail', event.id)">👁 View Details</button>
      <button v-if="!event.done" class="btn-action btn-complete" @click="$emit('complete', event)">✅ Complete Event</button>
      <button class="btn-action btn-delete" @click="$emit('delete', event)">🗑 Delete</button>
    </div>
  </AppCard>
</template>

<style scoped>
.organizer-event-card { padding: var(--space-6); display: flex; flex-direction: column; height: 100%; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3); }
.event-title { font-size: 1.3rem; margin-bottom: var(--space-2); color: var(--text-main); }
.text-strike { text-decoration: line-through; color: #8a8d93; }
.event-meta { font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--space-3); }
.event-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: var(--space-6); flex-grow: 1; }
.category-badge { background: rgba(102, 68, 255, 0.1); color: var(--primary); padding: 4px 10px; border-radius: 50px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; }
.status-badge { padding: 4px 10px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; }
.status-active { background: rgba(46, 204, 113, 0.15); color: #27ae60; }
.status-completed { background: rgba(108, 117, 125, 0.15); color: #6c757d; }
.card-actions { display: flex; gap: var(--space-2); flex-wrap: wrap; padding-top: var(--space-4); border-top: 1px solid var(--border-color); }
.btn-action { flex: 1; padding: var(--space-2) var(--space-3); border-radius: 6px; border: 1px solid var(--border-color); font-size: 0.85rem; font-weight: 600; cursor: pointer; background: white; transition: all 0.2s; white-space: nowrap; }
.btn-detail:hover { background: var(--bg-light); color: var(--primary); border-color: var(--primary); }
.btn-complete { color: #27ae60; border-color: rgba(39, 174, 96, 0.3); }
.btn-complete:hover { background: #27ae60; color: white; }
.btn-delete { color: #e63946; border-color: rgba(230, 57, 70, 0.3); flex: 0 0 auto; }
.btn-delete:hover { background: #e63946; color: white; }
</style>
