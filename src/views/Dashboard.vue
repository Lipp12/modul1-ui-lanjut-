<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useEvents } from '@/composables/useEvents'

const { events, totalEvents, activeEvents, completedEvents } = useEvents()
const recentEvents = computed(() => events.value.slice(0, 6))

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
  <section class="dashboard-page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">OVERVIEW</p>
        <h1>Dashboard</h1>
        <p class="heading-description">A quick look at your event activity and performance.</p>
      </div>
      <RouterLink to="/dashboard/events" class="primary-link"
        >Manage events <span>→</span></RouterLink
      >
    </div>

    <div class="metric-grid">
      <article class="metric-card">
        <span class="metric-icon violet" aria-hidden="true">✦</span>
        <p>Total events</p>
        <strong>{{ totalEvents }}</strong>
        <span class="metric-note">Across your workspace</span>
      </article>
      <article class="metric-card">
        <span class="metric-icon green" aria-hidden="true">◉</span>
        <p>Active events</p>
        <strong>{{ activeEvents.length }}</strong>
        <span class="metric-note">Visible in the public catalog</span>
      </article>
      <article class="metric-card">
        <span class="metric-icon gray" aria-hidden="true">✓</span>
        <p>Completed events</p>
        <strong>{{ completedEvents.length }}</strong>
        <span class="metric-note">Saved in your event archive</span>
      </article>
    </div>

    <section class="table-panel">
      <div class="panel-heading">
        <div>
          <h2>Recent events</h2>
          <p>Status overview for your latest events.</p>
        </div>
        <RouterLink to="/dashboard/events">View management →</RouterLink>
      </div>

      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in recentEvents" :key="event.id">
              <td class="event-name">{{ event.title }}</td>
              <td>{{ event.category }}</td>
              <td>{{ formatEventDate(event.date) }}</td>
              <td>
                <span
                  class="status-badge"
                  :class="event.done ? 'status-completed' : 'status-active'"
                >
                  {{ event.done ? 'Completed' : 'Active' }}
                </span>
              </td>
            </tr>
            <tr v-if="events.length === 0">
              <td colspan="4" class="empty-cell">
                No events yet. Create your first event to see its status here.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<style scoped>
.dashboard-page {
  display: grid;
  gap: 2rem;
}

.page-heading,
.panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.eyebrow {
  color: #7868d6;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.page-heading h1 {
  margin-top: 0.35rem;
  color: #25223f;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 750;
}

.heading-description,
.panel-heading p {
  margin-top: 0.35rem;
  color: #858398;
}

.primary-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  background: #5146a8;
  color: white;
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
}

.primary-link:hover {
  background: #40358f;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.metric-card,
.table-panel {
  border: 1px solid #ebeaf2;
  border-radius: 16px;
  background: white;
  box-shadow: 0 6px 24px rgba(39, 35, 81, 0.035);
}

.metric-card {
  padding: 1.25rem;
}

.metric-icon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 11px;
  font-weight: 800;
}

.metric-icon.violet {
  background: #f0edff;
  color: #6757c5;
}

.metric-icon.green {
  background: #e8f7f0;
  color: #238a62;
}

.metric-icon.gray {
  background: #f0f1f5;
  color: #6b6a7d;
}

.metric-card p {
  margin-top: 1rem;
  color: #77758b;
  font-size: 0.85rem;
}

.metric-card strong {
  display: block;
  margin-top: 0.2rem;
  color: #292642;
  font-size: 2rem;
  font-weight: 750;
  line-height: 1.2;
}

.metric-note {
  display: inline-block;
  margin-top: 0.5rem;
  color: #9a99a8;
  font-size: 0.75rem;
}

.table-panel {
  overflow: hidden;
}

.panel-heading {
  padding: 1.35rem 1.5rem;
}

.panel-heading h2 {
  color: #292642;
  font-size: 1.05rem;
  font-weight: 750;
}

.panel-heading p {
  font-size: 0.8rem;
}

.panel-heading > a {
  color: #5146a8;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
}

.table-scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 0.95rem 1.5rem;
  border-top: 1px solid #f0eff5;
  white-space: nowrap;
}

th {
  background: #fbfbfd;
  color: #8a899b;
  font-size: 0.7rem;
  font-weight: 750;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

td {
  color: #747286;
  font-size: 0.83rem;
}

.event-name {
  color: #302d4a;
  font-weight: 700;
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 750;
}

.status-active {
  background: #e5f6ed;
  color: #21865c;
}

.status-completed {
  background: #eff0f4;
  color: #777688;
}

.empty-cell {
  padding: 2.5rem 1rem;
  color: #89879a;
  text-align: center;
  white-space: normal;
}

@media (max-width: 760px) {
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .page-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .panel-heading {
    align-items: flex-start;
  }
}
</style>
