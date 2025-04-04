<template>
  <div
    class="grid-item"
    :class="[
      showHover ? (hoverShadow ? 'hover-shadow' : 'hover-background') : '',
    ]"
    :style="itemStyle"
  >
    <slot v-bind:item="item">
      <el-icon
        v-if="item.icon"
        :size="item.size || '32px'"
        :color="item.color || 'var(--el-text-color-regular)'"
      >
        <component :is="item.icon" />
      </el-icon>
      <el-text v-if="item.name" class="item__name">{{ item.name }}</el-text>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties, PropType } from 'vue';
import type { IGridItem } from '../typings/grid';

// defineProps and defineEmits start
const props = defineProps({
  item: {
    type: Object as PropType<IGridItem>,
    default: () => ({}),
  },
  itemStyle: {
    type: [String, Object as () => CSSProperties],
    default: () => {
      return {
        padding: '24px',
      }
    },
  },
  showHover: {
    type: Boolean,
    default: true,
  },
  hoverShadow: {
    type: Boolean,
  },
});
// defineProps and defineEmits end
</script>

<style lang="scss" scoped>
.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 100%;
  box-shadow: 1px 0 0 0 var(--el-border-color-lighter),
    0 1px 0 0 var(--el-border-color-lighter),
    1px 1px 0 0 var(--el-border-color-lighter),
    1px 0 0 0 var(--el-border-color-lighter) inset,
    0 1px 0 0 var(--el-border-color-lighter) inset;
  // transition: var(--el-transition-all);

  &.hover-background {
    &:hover {
      background-color: var(--el-border-color-extra-light);
    }
  }

  &.hover-shadow {
    &:hover {
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
        0 3px 6px 0 rgba(0, 0, 0, 0.12),
        0 5px 12px 4px rgba(0, 0, 0, 0.09);
    }
  }

  .item__name {
    width: 100%;
    text-align: center;
  }
}
</style>