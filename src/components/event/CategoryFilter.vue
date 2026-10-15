<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => ['All']
  },
  modelValue: {
    type: String,
    default: 'All'
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="category-filter">
    <button
      v-for="cat in categories"
      :key="cat"
      :class="['filter-btn', { active: modelValue === cat }]"
      @click="$emit('update:modelValue', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.filter-btn {
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  background: white;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn.active {
  background-color: var(--primary);
  border-color: var(--primary);
  color: white;
}
</style>