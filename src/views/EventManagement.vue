<script setup>
import { computed, reactive, ref } from 'vue'
import { useEvents } from '@/composables/useEvents'
import AppModal from '@/components/ui/AppModal.vue'

const { activeEvents, completedEvents, createEvent, completeEvent, deleteEvent } = useEvents()

const currentTab = ref('active')
const feedback = ref('')
const errorMessage = ref('')
const form = reactive({
  title: '',
  category: '',
  date: '',
  location: '',
  price: '0',
  desc: '',
})

const modalAction = ref(null)
const selectedEvent = ref(null)
const modalTitle = computed(() =>
  modalAction.value === 'complete' ? 'Complete this event?' : 'Delete this event?',
)
const modalMessage = computed(() =>
  modalAction.value === 'complete'
    ? 'This event will move to your completed archive and disappear from the public catalog.'
    : 'This event will be permanently removed from your workspace and the public catalog.',
)
const modalConfirmText = computed(() =>
  modalAction.value === 'complete' ? 'Complete event' : 'Delete event',
)

const resetForm = () => {
  Object.assign(form, {
    title: '',
    category: '',
    date: '',
    location: '',
    price: '0',
    desc: '',
  })
}

const selectTab = (tab) => {
  currentTab.value = tab
  errorMessage.value = ''
  feedback.value = ''
}

const handleCreateEvent = () => {
  errorMessage.value = ''
  feedback.value = ''

  const requiredValues = [form.title, form.category, form.date, form.location, form.desc]
  if (requiredValues.some((value) => !value.trim())) {
    errorMessage.value = 'Please complete all required fields before publishing.'
    return
  }

  const price = Number(form.price)
  if (!Number.isFinite(price) || price < 0) {
    errorMessage.value = 'Enter a valid price of zero or more.'
    return
  }

  createEvent({ ...form, price })
  resetForm()
  currentTab.value = 'active'
  feedback.value = 'Your event was published successfully.'
}

const openConfirmation = (action, event) => {
  modalAction.value = action
  selectedEvent.value = event
}

const closeModal = () => {
  modalAction.value = null
  selectedEvent.value = null
}

const confirmModalAction = () => {
  if (!selectedEvent.value) return

  if (modalAction.value === 'complete') {
    completeEvent(selectedEvent.value.id)
    feedback.value = 'Event moved to the completed archive.'
  } else if (modalAction.value === 'delete') {
    deleteEvent(selectedEvent.value.id)
    feedback.value = 'Event deleted successfully.'
  }

  closeModal()
}

const formatEventDate = (date) => {
  if (!date) return 'Date not set'
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return 'Date not set'

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
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
  <section class="management-page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">EVENT WORKSPACE</p>
        <h1>Event Management</h1>
        <p>Publish events, track what is happening, and review your archive.</p>
      </div>
      <span class="event-count">{{ activeEvents.length }} active</span>
    </div>

    <p v-if="feedback" class="feedback success-message" role="status">{{ feedback }}</p>
    <div class="tabs" role="tablist" aria-label="Event management sections">
      <button
        type="button"
        role="tab"
        :aria-selected="currentTab === 'active'"
        :class="{ selected: currentTab === 'active' }"
        @click="selectTab('active')"
      >
        Active Events <span>{{ activeEvents.length }}</span>
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="currentTab === 'create'"
        :class="{ selected: currentTab === 'create' }"
        @click="selectTab('create')"
      >
        Create Event
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="currentTab === 'completed'"
        :class="{ selected: currentTab === 'completed' }"
        @click="selectTab('completed')"
      >
        Completed Events <span>{{ completedEvents.length }}</span>
      </button>
    </div>

    <div v-if="currentTab === 'active'" class="event-list">
      <article v-for="event in activeEvents" :key="event.id" class="event-card">
        <div class="event-card-main">
          <div class="event-card-heading">
            <span class="category-label">{{ event.category }}</span>
            <span class="active-label">Active</span>
          </div>
          <h2>{{ event.title }}</h2>
          <p class="event-description">{{ event.desc }}</p>
          <div class="event-details">
            <span>◷ {{ formatEventDate(event.date) }}</span>
            <span>⌖ {{ event.location }}</span>
            <span>◇ {{ formatPrice(event.price) }}</span>
          </div>
        </div>
        <div class="event-actions">
          <button
            type="button"
            class="complete-button"
            @click="openConfirmation('complete', event)"
          >
            Complete event
          </button>
          <button type="button" class="delete-button" @click="openConfirmation('delete', event)">
            Delete
          </button>
        </div>
      </article>

      <div v-if="activeEvents.length === 0" class="empty-state">
        <span class="empty-icon" aria-hidden="true">✦</span>
        <h2>No active events</h2>
        <p>Create an event to publish it to the public catalog.</p>
        <button type="button" class="primary-button" @click="currentTab = 'create'">
          Create your first event
        </button>
      </div>
    </div>

    <form
      v-else-if="currentTab === 'create'"
      class="form-panel"
      @submit.prevent="handleCreateEvent"
    >
      <div class="form-heading">
        <h2>Publish a new event</h2>
        <p>Share the details with your community. Fields marked with * are required.</p>
      </div>
      <p v-if="errorMessage" class="feedback error-message" role="alert">{{ errorMessage }}</p>

      <div class="form-grid">
        <label class="form-field">
          <span>Event name *</span>
          <input
            v-model="form.title"
            type="text"
            maxlength="100"
            placeholder="e.g. Creative Meetup"
            required
          />
        </label>
        <label class="form-field">
          <span>Category *</span>
          <input
            v-model="form.category"
            type="text"
            maxlength="50"
            placeholder="e.g. Technology"
            required
          />
        </label>
        <label class="form-field">
          <span>Date and time *</span>
          <input v-model="form.date" type="datetime-local" required />
        </label>
        <label class="form-field">
          <span>Location *</span>
          <input
            v-model="form.location"
            type="text"
            maxlength="120"
            placeholder="Venue or online"
            required
          />
        </label>
        <label class="form-field">
          <span>Ticket price (IDR)</span>
          <input v-model="form.price" type="number" min="0" step="1000" placeholder="0 for free" />
        </label>
        <label class="form-field full-width">
          <span>Description *</span>
          <textarea
            v-model="form.desc"
            rows="5"
            maxlength="1000"
            placeholder="Tell attendees what to expect..."
            required
          ></textarea>
        </label>
      </div>

      <div class="form-footer">
        <p>New events will appear in your dashboard and public event catalog.</p>
        <button type="submit" class="primary-button">Publish event</button>
      </div>
    </form>

    <div v-else class="event-list">
      <article v-for="event in completedEvents" :key="event.id" class="event-card completed-card">
        <div class="event-card-main">
          <div class="event-card-heading">
            <span class="category-label">{{ event.category }}</span>
            <span class="completed-label">Completed</span>
          </div>
          <h2>{{ event.title }}</h2>
          <p class="event-description">{{ event.desc }}</p>
          <div class="event-details">
            <span>◷ {{ formatEventDate(event.date) }}</span>
            <span>⌖ {{ event.location }}</span>
            <span>◇ {{ formatPrice(event.price) }}</span>
          </div>
        </div>
        <div class="event-actions">
          <button type="button" class="delete-button" @click="openConfirmation('delete', event)">
            Delete archive
          </button>
        </div>
      </article>

      <div v-if="completedEvents.length === 0" class="empty-state">
        <span class="empty-icon" aria-hidden="true">✓</span>
        <h2>No completed events</h2>
        <p>Events you complete will be saved here for reference.</p>
      </div>
    </div>

    <AppModal
      v-if="modalAction"
      :title="modalTitle"
      :message="modalMessage"
      :confirm-text="modalConfirmText"
      :danger="modalAction === 'delete'"
      @confirm="confirmModalAction"
      @close="closeModal"
    />
  </section>
</template>

<style scoped>
.management-page {
  display: grid;
  gap: 1.5rem;
}

.page-heading {
  display: flex;
  align-items: flex-end;
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

.page-heading p:last-child {
  margin-top: 0.35rem;
  color: #858398;
}

.event-count,
.active-label,
.completed-label,
.category-label {
  display: inline-block;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 750;
}

.event-count,
.active-label {
  background: #e5f6ed;
  color: #21865c;
}

.completed-label {
  background: #eff0f4;
  color: #777688;
}

.category-label {
  background: #f0edff;
  color: #6757c5;
}

.tabs {
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  border-bottom: 1px solid #e7e6ef;
}

.tabs button {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.55rem;
  padding: 0.8rem 1rem;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #858398;
  font: inherit;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
}

.tabs button.selected {
  border-bottom-color: #6757c5;
  color: #5146a8;
}

.tabs button span {
  min-width: 21px;
  padding: 0.08rem 0.35rem;
  border-radius: 999px;
  background: #f0eff5;
  font-size: 0.68rem;
  text-align: center;
}

.feedback {
  padding: 0.8rem 1rem;
  border-radius: 9px;
  font-size: 0.85rem;
}

.success-message {
  background: #eaf7ef;
  color: #21754e;
}

.error-message {
  background: #fff0f0;
  color: #b73545;
}

.event-list {
  display: grid;
  gap: 1rem;
}

.event-card,
.form-panel,
.empty-state {
  border: 1px solid #ebeaf2;
  border-radius: 15px;
  background: white;
  box-shadow: 0 6px 24px rgba(39, 35, 81, 0.035);
}

.event-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.4rem;
}

.completed-card {
  background: #fcfcfd;
}

.event-card-main {
  min-width: 0;
}

.event-card-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.event-card h2 {
  margin-top: 0.7rem;
  color: #302d4a;
  font-size: 1.1rem;
  font-weight: 750;
}

.event-description {
  margin-top: 0.35rem;
  color: #818094;
  font-size: 0.83rem;
  line-height: 1.6;
}

.event-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-top: 0.8rem;
  color: #77758b;
  font-size: 0.76rem;
}

.event-actions {
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.event-actions button,
.primary-button {
  padding: 0.65rem 0.85rem;
  border: 0;
  border-radius: 8px;
  font: inherit;
  font-size: 0.77rem;
  font-weight: 750;
  cursor: pointer;
}

.complete-button {
  background: #5146a8;
  color: white;
}

.delete-button {
  background: #fff0f0;
  color: #b73545;
}

.primary-button {
  background: #5146a8;
  color: white;
}

.complete-button:hover,
.primary-button:hover {
  background: #40358f;
}

.delete-button:hover {
  background: #ffe2e3;
}

.empty-state {
  padding: 3rem 1.5rem;
  text-align: center;
}

.empty-icon {
  display: grid;
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  place-items: center;
  border-radius: 15px;
  background: #f0edff;
  color: #6757c5;
  font-size: 1.4rem;
}

.empty-state h2 {
  color: #302d4a;
  font-size: 1.1rem;
  font-weight: 750;
}

.empty-state p {
  margin: 0.4rem 0 1rem;
  color: #858398;
  font-size: 0.85rem;
}

.form-panel {
  padding: 1.5rem;
}

.form-heading h2 {
  color: #302d4a;
  font-size: 1.1rem;
  font-weight: 750;
}

.form-heading p,
.form-footer p {
  margin-top: 0.35rem;
  color: #858398;
  font-size: 0.8rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem;
  margin-top: 1.5rem;
}

.form-field {
  display: grid;
  gap: 0.45rem;
  color: #4e4b65;
  font-size: 0.8rem;
  font-weight: 700;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 0.75rem 0.85rem;
  border: 1px solid #e3e2eb;
  border-radius: 8px;
  background: #fff;
  color: #302d4a;
  font: inherit;
  font-size: 0.85rem;
}

.form-field input:focus,
.form-field textarea:focus {
  border-color: #8071d6;
  outline: 3px solid rgba(128, 113, 214, 0.13);
}

.form-field textarea {
  resize: vertical;
}

.full-width {
  grid-column: 1 / -1;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.2rem;
  border-top: 1px solid #f0eff5;
}

@media (max-width: 760px) {
  .page-heading {
    align-items: flex-start;
  }

  .event-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  .form-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
