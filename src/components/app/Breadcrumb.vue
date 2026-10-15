<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const label = computed(() => route.meta.breadcrumb ?? 'Home');
</script>

<template>
  <nav class="breadcrumb">
    <RouterLink to="/" class="crumb">Home</RouterLink>
    <span class="sep">/</span>
    <span class="crumb current">{{ label }}</span>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.crumb:hover { color: var(--primary); }

.current {
  color: var(--text-main);
  font-weight: 600;
}

.sep { opacity: 0.5; }
</style>