<template>
  <iframe
    :src="src"
    allowfullscreen
    width="100%"
    height="100%"
    frameborder="0"
    importance="high"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, type RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const route: RouteLocationNormalizedLoadedGeneric = useRoute();

const src = ref<string>('');

watch(
  () => route,
  (newRoute) => {
    src.value = newRoute.meta.link as string;
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>