<template>
  <el-card shadow="never">
    <ProResult type="success" @turn-back="turnBack" />
  </el-card>
</template>

<script setup lang="ts">
import { useRouter, type Router } from 'vue-router';
import ProResult from '@/components/ProResult/index.vue';

const router: Router = useRouter();
function turnBack(): void {
  router.back();
}
</script>