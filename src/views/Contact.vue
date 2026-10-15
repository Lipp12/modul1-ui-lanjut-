<script setup>
import { ref } from 'vue';
import Breadcrumb from '@/components/app/Breadcrumb.vue';
import AppButton from '@/components/ui/AppButton.vue';

const form = ref({ name: '', email: '', message: '' });
const sent = ref(false);

const handleSubmit = () => {
  sent.value = true;
  form.value = { name: '', email: '', message: '' };
};
</script>

<template>
  <div class="contact-page">
    <Breadcrumb />

    <h1 class="page-title">Contact Us</h1>
    <p class="page-desc">
      Questions about hosting an event, or feedback about Gatherly? Send us a note
      and our team will get back to you.
    </p>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Full Name *</label>
          <input id="name" v-model="form.name" type="text" class="form-input" placeholder="Your name" />
        </div>
        <div class="form-group">
          <label for="email">Email *</label>
          <input id="email" v-model="form.email" type="email" class="form-input" placeholder="you@example.com" />
        </div>
      </div>

      <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" v-model="form.message" rows="5" class="form-input" placeholder="How can we help?"></textarea>
      </div>

      <div class="form-actions">
        <AppButton variant="primary" type="submit">Send Message</AppButton>
      </div>

      <p v-if="sent" class="success-note">Thanks for reaching out — we'll reply shortly.</p>
    </form>
  </div>
</template>

<style scoped>
.contact-page { padding: var(--space-8) 0; }

.page-title {
  font-size: 2.2rem;
  margin-bottom: var(--space-2);
}

.page-desc {
  color: var(--text-muted);
  font-size: 1.1rem;
  max-width: 720px;
  margin-bottom: var(--space-8);
}

.contact-form {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--space-4);
  padding: var(--space-8);
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 600;
}

.form-input {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  background: white;
}

.form-input:focus { border-color: var(--primary); }

.form-actions { display: flex; justify-content: flex-end; }

.success-note {
  color: #27ae60;
  font-weight: 600;
}

@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; }
}
</style>