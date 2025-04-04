<template>
  <div>
    Home==========={{ foo }}
    <!-- <template>456</template> -->
    <!-- vue3-vant-mobile -->
    <!-- <a href="weixin://dl/business/?t=YOUR_URL_SCHEME">跳转到小程序</a > -->
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

const foo = shallowRef({
  a: {
    b: 2
  }
})
setTimeout(() => {
  foo.value = {
    a: {
      b: 3
    }
  }
}, 1000)
</script>