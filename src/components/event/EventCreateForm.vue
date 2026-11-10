<script setup>
import { reactive, ref } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';

const props = defineProps({
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['submit']);

const form = reactive({
  title: '',
  cat: 'Workshop',
  date: '',
  loc: '',
  quota: 100,
  desc: ''
});

const errorMessage = ref('');

const formatEventDate = (dt) => {
  if (!dt) return '';
  const dateObj = new Date(dt);
  if (isNaN(dateObj.getTime())) return dt;
  const datePart = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const timePart = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${datePart} • ${timePart}`;
};

const handleSubmit = () => {
  if (!form.title.trim() || !form.date || !form.loc.trim() || !form.desc.trim()) {
    errorMessage.value = 'Please fill in all required fields before publishing the event!';
    return;
  }
  errorMessage.value = '';
  emit('submit', {
    title: form.title,
    cat: form.cat,
    date: formatEventDate(form.date),
    loc: form.loc,
    quota: form.quota,
    desc: form.desc
  });

  // reset
  form.title = '';
  form.date = '';
  form.loc = '';
  form.quota = 100;
  form.desc = '';
};
</script>

<template>
  <AppCard class="form-card">
    <h3>Create New Event Form</h3>
    <p class="form-subtitle">Information entered here will be instantly published to the Gatherly public catalog.</p>

    <div v-if="errorMessage" class="alert-box alert-error">⚠️ {{ errorMessage }}</div>

    <form @submit.prevent="handleSubmit" class="event-form">
      <div class="form-row">
        <label>Event Title *</label>
        <input v-model="form.title" type="text" placeholder="e.g. Modern UI/UX Masterclass" class="form-input" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Event Category *</label>
          <select v-model="form.cat" class="form-input">
            <option value="Workshop">Workshop</option>
            <option value="Meetup">Meetup</option>
            <option value="Competition">Competition</option>
            <option value="Seminar">Seminar</option>
            <option value="Conference">Conference</option>
          </select>
        </div>
        <div class="form-group">
          <label>Date &amp; Time *</label>
          <input v-model="form.date" type="datetime-local" class="form-input" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Event Location *</label>
          <input v-model="form.loc" type="text" placeholder="e.g. Innovation Center, Jakarta" class="form-input" />
        </div>
        <div class="form-group">
          <label>Attendee Quota</label>
          <input v-model.number="form.quota" type="number" min="10" placeholder="100" class="form-input" />
        </div>
      </div>

      <div class="form-group">
        <label>Event Description *</label>
        <textarea v-model="form.desc" rows="4" placeholder="Describe the agenda, speakers, and key takeaways..." class="form-input"></textarea>
      </div>

      <div class="form-actions">
        <AppButton variant="primary" type="submit" :loading="loading">
          🚀 Publish Event Now
        </AppButton>
      </div>
    </form>
  </AppCard>
</template>

<style scoped>
.form-card { padding: var(--space-8); max-width: 800px; margin: 0 auto var(--space-12) auto; }
.form-card h3 { font-size: 1.5rem; margin-bottom: var(--space-1); }
.form-subtitle { color: var(--text-muted); margin-bottom: var(--space-6); }
.alert-box { padding: var(--space-3) var(--space-4); border-radius: 8px; font-size: 0.95rem; font-weight: 500; margin-bottom: var(--space-6); }
.alert-error { background: #ffe3e3; color: #c92a2a; border: 1px solid #ffa8a8; }
.event-form { display: flex; flex-direction: column; gap: var(--space-5); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
.form-group { display: flex; flex-direction: column; gap: var(--space-2); }
.form-group label { font-size: 0.95rem; font-weight: 600; color: var(--text-main); }
.form-input { padding: var(--space-3) var(--space-4); border: 1px solid var(--border-color); border-radius: 8px; font-size: 1rem; outline: none; transition: border-color 0.2s; background: white; }
.form-input:focus { border-color: var(--primary); }
.form-actions { display: flex; justify-content: flex-end; gap: var(--space-4); margin-top: var(--space-4); }
@media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
</style>
