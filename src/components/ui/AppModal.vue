<script setup>
defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
  danger: { type: Boolean, default: true },
})

defineEmits(['confirm', 'close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div class="modal-overlay" @click.self="$emit('close')">
        <section class="modal-card" role="dialog" aria-modal="true" :aria-label="title">
          <div class="modal-icon" aria-hidden="true">!</div>
          <h2>{{ title }}</h2>
          <p>{{ message }}</p>
          <div class="modal-actions">
            <button type="button" class="cancel-button" @click="$emit('close')">
              {{ cancelText }}
            </button>
            <button
              type="button"
              class="confirm-button"
              :class="{ 'confirm-danger': danger }"
              @click="$emit('confirm')"
            >
              {{ confirmText }}
            </button>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  z-index: 9999;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(21, 19, 50, 0.44);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.modal-card {
  width: min(100%, 440px);
  padding: 2rem;
  border: 1px solid #eeedf5;
  border-radius: 20px;
  background: white;
  box-shadow: 0 24px 80px rgba(20, 18, 54, 0.24);
  text-align: center;
}

.modal-icon {
  display: grid;
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  place-items: center;
  border-radius: 50%;
  background: #fff3e8;
  color: #d27a2d;
  font-size: 1.5rem;
  font-weight: 800;
}

.modal-card h2 {
  color: #24213e;
  font-size: 1.3rem;
}

.modal-card p {
  margin-top: 0.6rem;
  color: #77758b;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.7rem;
}

.modal-actions button {
  min-width: 116px;
  padding: 0.7rem 1rem;
  border: 0;
  border-radius: 9px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.cancel-button {
  background: #f0eff5;
  color: #514f66;
}

.confirm-button {
  background: #5146a8;
  color: white;
}

.confirm-danger {
  background: #c33d50;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-active .modal-card,
.modal-fade-leave-active .modal-card {
  transition: transform 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-card,
.modal-fade-leave-to .modal-card {
  transform: translateY(10px) scale(0.98);
}
</style>
