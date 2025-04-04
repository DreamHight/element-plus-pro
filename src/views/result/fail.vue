<template>
  <el-card shadow="never">
    <ProResult type="error" @turn-back="turnBack" />
    <!-- <ProResult type="error" @turn-back="turnBack" :custom-result="{
      'error': {
        title: 'custom-result成功',
        subTitle: 'custom-result',
        backText: '返回',
      }
    }" /> -->
    <!-- <ProResult type="custom-result" @turn-back="turnBack" :custom-result="{
      'custom-result': {
        title: 'custom-result成功',
        subTitle: 'custom-result',
        backText: '返回',
      }
    }">
      <template #resultCustom>
        <el-image
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        />
      </template>
    </ProResult> -->
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