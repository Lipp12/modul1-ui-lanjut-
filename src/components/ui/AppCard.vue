<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default'
  }
});
</script>

<template>
  <div class="app-card">
    <slot />
  </div>
</template>

<style scoped>
.app-card {
  background: white;
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: box-shadow 0.25s, transform 0.25s;
}

.app-card:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.07);
  transform: translateY(-2px);
}
</style>