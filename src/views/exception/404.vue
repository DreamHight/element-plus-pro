<template>
  <ProException type="404" @turn-back="turnBack" />
</template>

<script setup lang="ts">
import { useRouter, type Router } from 'vue-router';
import ProException from '@/components/ProException/index.vue';
import globalSetting from '@/global';

const router: Router = useRouter();
function turnBack(): void {
  router.replace(globalSetting.homePath);
}
</script>