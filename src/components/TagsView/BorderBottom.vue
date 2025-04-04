<template>
  <div
    class="tag-box"
    :class="[{'active': menuItem.index === currentRoute}]"
    @click="clickHandler(menuItem)"
  >
    <el-space :size="4" class="content-box">
      <el-space :size="4">
        <el-icon v-if="showIcon && menuItem.icon">
          <component :is="menuItem.icon" />
        </el-icon>
        <span>{{ menuItem.title }}</span>
      </el-space>

      <el-icon v-if="menuItem.fixed">
        <IconFixed />
      </el-icon>
      <el-icon v-else class="close-icon" @click.stop="closeHandler">
        <IconClose />
      </el-icon>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { IMenuItem } from '../typings/menu';
import IconClose from '../icons/IconClose.vue';
import IconFixed from '../icons/IconFixed.vue';

// defineProps and defineEmits start
const props = defineProps({
  menuItem: {
    type: Object as PropType<IMenuItem>,
    default: () => ({}),
  },
  showIcon: {
    type: Boolean,
  },

  currentRoute: {
    type: String,
    default: '',
  },
});
const emits = defineEmits([
  'click',
  'close',
]);
// defineProps and defineEmits end

function clickHandler(item: IMenuItem): void {
  emits('click', item);
}

function closeHandler(): void {
  emits('close');
}
</script>

<style lang="scss" scoped>
.tag-box {
  width: 100%;
  padding: 6px 20px;
  border-block-end: 2px solid transparent;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: var(--el-color-primary-light-9);
    border-block-end: 2px solid var(--el-color-primary-light-9);
  }

  &.active {
    position: relative;
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-8);
    border-block-end: 2px solid var(--el-color-primary);
  }

  .content-box {
    justify-content: space-between;
    width: 100%;
    .close-icon {
      border-radius: 50%;
      padding: 1px;
      margin-left: 4px;
      &:hover {
        color: var(--el-color-white);
        background-color: var(--el-color-primary);
      }
    }
  }
}
</style>