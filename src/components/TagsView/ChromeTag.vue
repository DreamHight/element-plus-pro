<template>
  <div
    class="tag-box"
    :class="[{'active': menuItem.index === currentRoute}]"
    @click="clickHandler(menuItem)"
  >
    <el-icon class="corner corner-left">
      <IconCornerLeft />
    </el-icon>

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

    <el-icon class="corner corner-right">
      <IconCornerRight />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { IMenuItem } from '../typings/menu';
import IconClose from '../icons/IconClose.vue';
import IconCornerLeft from '../icons/IconCornerLeft.vue';
import IconCornerRight from '../icons/IconCornerRight.vue';
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
  position: relative;
  width: 100%;
  border-radius: 10px 10px 0 0;
  font-size: 14px;
  cursor: pointer;

  .content-box {
    justify-content: space-between;
    width: 100%;
    padding: 3px 20px 2px;
    margin-bottom: 4px;
    border-radius: 14px;

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
  .corner {
    position: absolute;
    bottom: 0;
    color: transparent;
    &.corner-left {
      left: -14px;
    }
    &.corner-right {
      right: -14px;
    }
  }

  &:hover {
    .content-box {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
    }
  }

  &.active {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
    .corner {
      color: var(--el-color-primary-light-9);
    }
  }
}
</style>