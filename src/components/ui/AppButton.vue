<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button
    :class="['app-btn', `btn-${variant}`]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  border: none;
  border-radius: 12px;
  padding: var(--space-3) var(--space-6);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
}

.app-btn:active { transform: scale(0.98); }
.app-btn:disabled { cursor: not-allowed; opacity: 0.6; }

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-hover);
  box-shadow: 0 8px 20px rgba(102, 68, 255, 0.3);
}

.btn-secondary {
  background-color: var(--bg-light);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e9ecef;
  color: var(--text-main);
}
</style>