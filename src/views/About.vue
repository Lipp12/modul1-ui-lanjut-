<script setup>
import Breadcrumb from '@/components/app/Breadcrumb.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { ref } from 'vue';

const sent = ref(false);

const handleSubmit = () => {
  sent.value = true;
};
</script>

<template>
  <div class="about-page">
    <Breadcrumb />

    <h1 class="page-title">About Gatherly</h1>
    <p class="page-desc">
      Gatherly is a community-driven event discovery platform. Organizers publish
      events from a dedicated dashboard, and attendees explore them through a
      single, always-up-to-date public catalog.
    </p>

    <div class="about-grid">
      <section class="about-block">
        <h2>What We Do</h2>
        <p>
          We remove the friction between hosts and communities. One publishing
          flow, one searchable catalog, zero duplicate data entry.
        </p>
      </section>
      <section class="about-block">
        <h2>How It Works</h2>
        <p>
          Every event moves through a clear lifecycle: published, active, then
          completed and archived. Status changes propagate instantly everywhere.
        </p>
      </section>
      <section class="about-block">
        <h2>Built For Organizers</h2>
        <p>
          Analytics, quick actions, and destructive-action confirmation dialogs
          are built in, so managing a lineup never feels risky.
        </p>
      </section>
    </div>

    <div class="cta">
      <AppButton variant="primary" @click="handleSubmit">Start Publishing</AppButton>
      <p v-if="sent" class="cta-note">Thanks! The organizer workspace is ready for you.</p>
    </div>
  </div>
</template>

<style scoped>
.about-page { padding: var(--space-8) 0; }

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

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

.about-block {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--space-4);
  padding: var(--space-6);
}

.about-block h2 {
  font-size: 1.15rem;
  margin-bottom: var(--space-2);
}

.about-block p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.cta {
  text-align: center;
  padding-bottom: var(--space-8);
}

.cta-note {
  margin-top: var(--space-3);
  color: #27ae60;
  font-weight: 600;
}
</style>