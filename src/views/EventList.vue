<script setup>
import { useEvents } from '@/composables/useEvents'

const { activeEvents } = useEvents()

const formatEventDate = (date) => {
  if (!date) return 'Date not set'
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return 'Date not set'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate)
}
</script>

<template>
  <div class="event-list-page">
    <div class="header-section">
      <h2 class="section-title">Upcoming Events</h2>
      <p class="section-desc">Discover the latest gatherings and activities happening near you.</p>
    </div>

    <div v-if="activeEvents.length > 0" class="event-grid">
      <article v-for="event in activeEvents" :key="event.id" class="event-card">
        <div class="event-body">
          <div class="event-meta">
            <span class="event-date">{{ formatEventDate(event.date) }}</span>
            <span class="event-category">{{ event.category }}</span>
          </div>
          <h3>{{ event.title }}</h3>
          <p class="event-loc">📍 {{ event.location }}</p>
          <p class="event-desc">{{ event.desc }}</p>
        </div>
        <div class="card-footer">
          <router-link :to="`/browse/events/${event.id}`" class="btn-link">
            View Details &rarr;
          </router-link>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <span class="empty-icon" aria-hidden="true">✦</span>
      <h3>No events just yet</h3>
      <p>
        Our calendar is ready for something new. Be the first to share an event with the community.
      </p>
      <router-link to="/dashboard/events" class="empty-action">Create an event</router-link>
    </div>
  </div>
</template>

<style scoped>
.header-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.2rem;
  color: #1c1948;
  margin-bottom: 0.5rem;
}

.section-desc {
  color: #666;
  font-size: 1.1rem;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.event-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-5px);
  border-color: #ddd;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.event-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.event-date {
  background: rgba(102, 68, 255, 0.1);
  color: #6644ff;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.event-category {
  color: #888;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.event-body h3 {
  color: #1c1948;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
}

.event-loc {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.event-desc {
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.card-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 1.5rem;
}

.btn-link {
  display: inline-block;
  color: #1c1948;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.btn-link:hover {
  color: #6644ff;
}

.event-card {
  overflow: hidden;
}

.card-footer {
  margin: 0 2rem;
}

.empty-state {
  padding: 4rem 1.5rem;
  border: 1px dashed #d9d6ea;
  border-radius: 18px;
  background: #fbfaff;
  text-align: center;
}

.empty-icon {
  display: grid;
  width: 54px;
  height: 54px;
  margin: 0 auto 1rem;
  place-items: center;
  border-radius: 16px;
  background: #f0edff;
  color: #6757c5;
  font-size: 1.5rem;
}

.empty-state h3 {
  color: #292642;
  font-size: 1.2rem;
  font-weight: 700;
}

.empty-state p {
  max-width: 440px;
  margin: 0.5rem auto 1.2rem;
  color: #77758b;
}

.empty-action {
  display: inline-block;
  padding: 0.7rem 1rem;
  border-radius: 9px;
  background: #5146a8;
  color: white;
  font-weight: 700;
  text-decoration: none;
}
</style>
