<script setup>
import AppButton from '@/components/ui/AppButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <section class="home-page">
    <div class="hero">
      <span class="hero-tag">🎟 Modular Event Platform</span>
      <h1>Find your next <span class="accent">community event</span></h1>
      <p>
        Gatherly brings workshops, seminars, meetups, and competitions into one
        simple, organized catalog — managed live by the people who host them.
      </p>
      <div class="hero-actions">
        <AppButton variant="primary" @click="router.push('/browse/events')">
          Browse Events &rarr;
        </AppButton>
        <AppButton variant="secondary" @click="router.push('/dashboard')">
          Organizer Dashboard
        </AppButton>
      </div>
    </div>

    <div class="feature-grid">
      <article class="feature">
        <span class="feature-icon">🔎</span>
        <h3>Search &amp; Filter</h3>
        <p>Find events by keyword or narrow them down by category instantly.</p>
      </article>
      <article class="feature">
        <span class="feature-icon">📡</span>
        <h3>Live Sync</h3>
        <p>One single source of truth keeps the catalog and dashboard in sync.</p>
      </article>
      <article class="feature">
        <span class="feature-icon">🗂️</span>
        <h3>Full Lifecycle</h3>
        <p>Publish, complete, and archive events with a single confirmation flow.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-12) 0;
  text-align: center;
}

.hero-tag {
  display: inline-block;
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
  padding: var(--space-1) var(--space-4);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: var(--space-6);
}

.hero h1 {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: var(--space-4);
  color: var(--text-main);
}

.accent { color: var(--primary); }

.hero p {
  color: var(--text-muted);
  font-size: 1.15rem;
  max-width: 620px;
  margin: 0 auto var(--space-8);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-12);
  text-align: left;
}

.feature {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--space-4);
  padding: var(--space-6);
}

.feature-icon { font-size: 1.8rem; }

.feature h3 {
  margin: var(--space-3) 0 var(--space-2);
  font-size: 1.1rem;
}

.feature p {
  color: var(--text-muted);
  font-size: 0.92rem;
}
</style>