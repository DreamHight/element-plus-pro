<template>
  <div class="flex-center">
    <el-card style="width: 500px;">
      <h1 class="font-bold" style="font-size: 24px;">
        即将离开{{ projectName }}
      </h1>
      <p>您即将离开{{ projectName }}，请注意您的帐号和财产安全。</p>
      <p>目标网址：{{ targetLink }}</p>

      <el-divider />

      <div class="text-right">
        <el-button
          type="primary"
          @click="continueAccessHandler(targetLink)"
        >继续访问</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import globalSetting from '@/global';
import { ref, watch } from 'vue';
import { useRoute, type RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const route: RouteLocationNormalizedLoadedGeneric = useRoute();

const projectName: string = globalSetting.projectName;

const targetLink = ref<string>('');
watch(
  () => route,
  (newRoute) => {
    targetLink.value = newRoute.query.target as string;
  },
  {
    deep: true,
    immediate: true,
  }
);

function continueAccessHandler(link: string): void {
  window.open(link, '_blank');
}
</script>