<template>
  <ProException type="500" @turn-back="turnBack" />
  <!-- <ProException type="502" @turn-back="turnBack" :custom-exception="{
    '502': {
      title: '502',
      subTitle: 'Sorry, 502.',
    }
  }">
    <template #exceptionCustom>
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      />
    </template>
  </ProException> -->
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