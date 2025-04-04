<template>
  <div
    class="pulse-dot"
    :class="['pulse-dot--' + type]"
    :style="{ backgroundColor: dotColor ? dotColor : '' }"
  >
    <div
      v-if="showHalo"
      class="halo"
      :class="['halo--' + type]"
      :style="{ border: haloColor ? '2px solid ' + haloColor : '' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
// defineProps and defineEmits start
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (val: string) => {
      return ['primary', 'success', 'warning', 'danger', 'info'].includes(val);
    }
  },
  dotColor: {
    type: String,
    default: '',
  },
  showHalo: {
    type: Boolean,
    default: true,
  },
  haloColor: {
    type: String,
    default: '',
  },
});
// defineProps and defineEmits end
</script>

<style lang="scss" scoped>
.pulse-dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  &.pulse-dot--primary {
    background-color: var(--el-color-primary);
  }
  &.pulse-dot--success {
    background-color: var(--el-color-success);
  }
  &.pulse-dot--warning {
    background-color: var(--el-color-warning);
  }
  &.pulse-dot--danger {
    background-color: var(--el-color-danger);
  }
  &.pulse-dot--info {
    background-color: var(--el-color-info);
  }
  .halo {
    position: absolute;
    top: -3px;
    left: -3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    &.halo--primary {
      border: 2px solid var(--el-color-primary);
    }
    &.halo--success {
      border: 2px solid var(--el-color-success);
    }
    &.halo--warning {
      border: 2px solid var(--el-color-warning);
    }
    &.halo--danger {
      border: 2px solid var(--el-color-danger);
    }
    &.halo--info {
      border: 2px solid var(--el-color-info);
    }
    animation: processing 1.2s ease-in-out infinite both;
  }
}
@keyframes processing {
  0%{
    transform: scale(0.8);
    opacity: 0.5;
  }
  100%{
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>