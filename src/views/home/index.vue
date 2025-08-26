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
    b: 2,
    c: {
      d: 3,
    }
  }
})
setTimeout(() => {
  foo.value = {
    a: {
      b: 2,
      c: {
        d: 4,
      }
    }
  }
}, 1000);
{
  let aa = 1;
  console.log('aa', aa);
}
// console.log('aa2', aa);
</script>