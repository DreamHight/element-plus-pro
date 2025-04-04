<template>
  <el-button
    ref="ButtonRef"
    plain
    size="small"
    class="tag-box"
    :type="menuItem.index === currentRoute ? 'primary' : ''"
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
  </el-button>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';
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

const ButtonRef = ref();

function clickHandler(item: IMenuItem): void {
  emits('click', item);
}

function closeHandler(): void {
  emits('close');
}

onMounted(() => {
  if (ButtonRef.value) {
    const children: any[] = ButtonRef.value.ref.children;
    if (children.length) {
      children[0].style.width = '100%';
    }
  }
});
</script>

<style lang="scss" scoped>
.tag-box {
  width: 100%;
  transform: translateY(-1px);
  .content-box {
    justify-content: space-between;
    width: 100%;
    .close-icon {
      border-radius: 50%;
      padding: 1px;
      margin-left: 4px;
      &:hover {
        color: var(--el-color-white);
        background-color: var(--el-color-primary-light-5);
      }
    }
  }
}
</style>