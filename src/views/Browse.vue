<script setup>
import { RouterView } from 'vue-router';
import Breadcrumb from '@/components/app/Breadcrumb.vue';
</script>

<template>
  <div class="browse-page">
    <Breadcrumb />
    <RouterView />
  </div>
</template>

<style scoped>
.browse-page {
  padding: var(--space-8) 0;
}
</style>