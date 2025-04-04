<template>
  <!-- 侧边菜单布局 -->
  <el-container class="common-layout">
    <div>
      <ProHeader />
      <ProAside />
    </div>
    <ProMain>
      <template v-slot:footer>
        <ProFooter />
      </template>
    </ProMain>
  </el-container>
</template>

<script setup lang="ts">
import ProAside from '../ProAside/index.vue';
import ProHeader from '../ProHeader/index.vue';
import ProMain from '../ProMain/index.vue';
import ProFooter from '../ProFooter/index.vue';
</script>

<style scoped>
.common-layout {
  height: 100vh;
  overflow: hidden;
}
</style>