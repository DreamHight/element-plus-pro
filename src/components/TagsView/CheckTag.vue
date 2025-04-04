<template>
  <el-check-tag
    class="tag-box"
    closable
    :checked="menuItem.index === currentRoute"
    @click="clickHandler(menuItem)"
    @close="closeHandler"
  >
    <el-space :size="4" class="content-box">
      <el-space :size="4">
        <PulseDot
          v-if="showPulseDot"
          class="pulse-dot"
          :type="menuItem.index === currentRoute ? 'primary' : 'info'"
          :show-halo="menuItem.index === currentRoute ? true : false"
        />
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
  </el-check-tag>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { IMenuItem } from '../typings/menu';
import PulseDot from '../PulseDot/PulseDot.vue';
import IconClose from '../icons/IconClose.vue';
import IconFixed from '../icons/IconFixed.vue';

// defineProps and defineEmits start
const props = defineProps({
  menuItem: {
    type: Object as PropType<IMenuItem>,
    default: () => ({}),
  },
  showPulseDot: {
    type: Boolean,
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
  justify-content: space-between;
  font-size: 12px;
  cursor: pointer;
  transform: translateY(-1px);

  .content-box {
    justify-content: space-between;
    width: 100%;

    .pulse-dot {
      margin-right: 4px;
    }

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