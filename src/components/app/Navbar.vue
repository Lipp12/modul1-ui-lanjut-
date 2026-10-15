<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const isBrowseOpen = ref(false);
</script>

<template>
  <header class="navbar">
    <div class="nav-container">
      <RouterLink to="/" class="brand">
        <span class="brand-mark">G</span>
        Gatherly
      </RouterLink>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>

        <div
          class="nav-dropdown"
          @mouseenter="isBrowseOpen = true"
          @mouseleave="isBrowseOpen = false"
        >
          <RouterLink
            to="/browse"
            class="nav-link dropdown-trigger"
            :class="{ 'dropdown-active': route.path.startsWith('/browse') }"
          >
            Browse <span class="caret">▾</span>
          </RouterLink>
          <div v-if="isBrowseOpen" class="dropdown-menu">
            <RouterLink to="/browse/events" class="dropdown-item">All Events</RouterLink>
            <RouterLink to="/browse/category" class="dropdown-item">Categories</RouterLink>
          </div>
        </div>

        <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
        <RouterLink to="/dashboard" class="nav-link">Organizer Dashboard</RouterLink>
      </nav>

      <div class="nav-right">
        <span class="locale">🌐 EN ▾</span>
        <button class="hamburger" aria-label="Menu">☰</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: #1c1948;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 800;
  font-size: 1.1rem;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: var(--primary);
  font-size: 0.9rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.nav-link {
  color: #c7cbd8;
  font-size: 0.95rem;
  font-weight: 500;
  padding: var(--space-2) var(--space-4);
  border-radius: 8px;
  transition: color 0.2s, background-color 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.08);
}

.dropdown-active {
  background-color: var(--primary);
  color: white;
}

.nav-dropdown { position: relative; }

.caret { font-size: 0.7rem; opacity: 0.7; }

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  background: white;
  color: var(--text-main);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
  padding: var(--space-2) 0;
  margin-top: var(--space-2);
}

.dropdown-item {
  display: block;
  padding: var(--space-2) var(--space-4);
  font-size: 0.9rem;
  color: var(--text-main);
}

.dropdown-item:hover {
  background-color: var(--bg-light);
  color: var(--primary);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.locale {
  font-size: 0.85rem;
  color: #c7cbd8;
  white-space: nowrap;
}

.hamburger {
  display: none;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: white;
  border-radius: 8px;
  padding: var(--space-2) var(--space-3);
  font-size: 1rem;
  cursor: pointer;
}

@media (max-width: 900px) {
  .nav-links { display: none; }
  .hamburger { display: block; }
  .nav-container { padding: var(--space-4) var(--space-4); }
}
</style>