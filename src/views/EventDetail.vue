<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'

const route = useRoute()
const router = useRouter()
const { getEventById } = useEvents()
const event = computed(() => getEventById(route.params.id))
const isRegistered = ref(false)

const formatEventDate = (date) => {
  if (!date) return 'Date not set'
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return 'Date not set'

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(parsedDate)
}

const formatPrice = (price) => {
  if (!Number(price)) return 'Free'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}
</script>

<template>
  <div class="event-detail-page">
    <button type="button" @click="router.push('/browse/events')" class="btn-back">
      &larr; Back to Events
    </button>

    <template v-if="event">
      <div class="detail-header">
        <div class="header-content">
          <span class="event-tag">{{ event.category }}</span>
          <h1>{{ event.title }}</h1>
          <div class="meta-info">
            <div class="meta-item">
              <span class="icon" aria-hidden="true">📅</span>
              <span>{{ formatEventDate(event.date) }}</span>
            </div>
            <div class="meta-item">
              <span class="icon" aria-hidden="true">📍</span>
              <span>{{ event.location }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-content">
        <div class="main-desc">
          <h2>About This Event</h2>
          <p>{{ event.desc }}</p>
        </div>

        <aside class="sidebar">
          <div class="ticket-card">
            <h3>Registration</h3>
            <p class="price">{{ formatPrice(event.price) }}</p>
            <p class="ticket-desc">
              {{
                event.done ? 'This event has been completed.' : 'Reserve your place at this event.'
              }}
            </p>
            <button
              type="button"
              class="btn-register"
              :class="{ 'event-completed': event.done }"
              :disabled="event.done || isRegistered"
              @click="isRegistered = true"
            >
              {{
                event.done
                  ? 'Registration closed'
                  : isRegistered
                    ? "You're registered"
                    : 'Register Now'
              }}
            </button>
            <p v-if="isRegistered && !event.done" class="registration-feedback" role="status">
              Your interest has been recorded for this session.
            </p>
          </div>
        </aside>
      </div>
    </template>

    <div v-else class="not-found">
      <span aria-hidden="true">⌕</span>
      <h1>Event not found</h1>
      <p>This event may have been removed or the link may be out of date.</p>
      <button type="button" class="btn-register" @click="router.push('/browse/events')">
        Return to event catalog
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn-back {
  background: none;
  border: none;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: color 0.2s;
  padding: 0;
}

.btn-back:hover {
  color: #6644ff;
}

.detail-header {
  background: #fdfdfd;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  padding: 4rem 3rem;
  margin-bottom: 3rem;
}

.header-content {
  max-width: 800px;
}

.event-tag {
  display: inline-block;
  background: rgba(102, 68, 255, 0.1);
  color: #6644ff;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.header-content h1 {
  color: #1c1948;
  font-size: 2.8rem;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #555;
  font-weight: 500;
  font-size: 1.05rem;
}

.detail-content {
  display: flex;
  gap: 4rem;
}

.main-desc {
  flex: 2;
}

.main-desc h2 {
  color: #1c1948;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.main-desc h2::before {
  content: '';
  display: block;
  width: 20px;
  height: 4px;
  background: #6644ff;
  border-radius: 2px;
}

.main-desc p {
  color: #444;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.agenda-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.agenda-list li {
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  color: #444;
  font-size: 1.05rem;
}

.sidebar {
  flex: 1;
}

.ticket-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  text-align: center;
  position: sticky;
  top: 100px;
}

.ticket-card h3 {
  color: #1c1948;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 2.8rem;
  font-weight: 800;
  color: #6644ff;
  margin-bottom: 0.5rem;
}

.ticket-desc {
  color: #666;
  margin-bottom: 2rem;
}

.btn-register {
  width: 100%;
  padding: 1.2rem;
  background: #1c1948;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-register:hover {
  background: #6644ff;
}

.btn-register:disabled {
  background: #a8a7b3;
  cursor: not-allowed;
}

.event-completed {
  background: #a8a7b3;
}

.registration-feedback {
  margin-top: 1rem;
  color: #238a62;
  font-size: 0.85rem;
}

.not-found {
  max-width: 560px;
  margin: 3rem auto;
  padding: 3rem 2rem;
  border: 1px solid #eeeaf6;
  border-radius: 20px;
  background: white;
  text-align: center;
}

.not-found > span {
  color: #7868d6;
  font-size: 2rem;
}

.not-found h1 {
  margin-top: 0.5rem;
  color: #1c1948;
  font-size: 1.7rem;
}

.not-found p {
  margin: 0.5rem 0 1.5rem;
  color: #666;
}

.spots {
  margin-top: 1.5rem;
  color: #e63946;
  font-weight: 600;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .detail-content {
    flex-direction: column;
  }
  .detail-header {
    padding: 3rem 2rem;
  }
  .header-content h1 {
    font-size: 2.2rem;
  }
}
</style>
