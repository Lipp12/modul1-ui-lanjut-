<script setup>
import { RouterView } from 'vue-router';
import Navbar from '@/components/app/Navbar.vue';
</script>

<template>
  <div class="app-shell">
    <Navbar />

    <main class="app-main">
      <div class="container">
        <RouterView />
      </div>
    </main>

    <footer class="app-footer">
      <div class="container footer-inner">
        <p>&copy; 2026 Gatherly. Crafted for UI Lanjut — Modul 4.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main { flex: 1; }

.app-footer {
  background-color: #1c1948;
  color: #a0a8b0;
  margin-top: var(--space-12);
}

.footer-inner { padding: var(--space-6) var(--space-8); font-size: 0.85rem; }
</style>