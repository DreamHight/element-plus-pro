<template>
  <el-card shadow="never">
    <div>
      <p>PulseDot样式：</p>
      <div style="display: flex; gap: 10px;">
        <PulseDot type="primary" />
        <PulseDot type="success" />
        <PulseDot type="warning" />
        <PulseDot type="danger" />
        <PulseDot type="info" />
      </div>
    </div>

    <div>
      <p>PulseDot无晕样式：</p>
      <PulseDot :show-halo="false" />
    </div>

    <div>
      <p>PulseDot自定义样式：</p>
      <PulseDot dot-color="purple" halo-color="#ef32ef" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import PulseDot from '@/components/PulseDot/PulseDot.vue';
</script>