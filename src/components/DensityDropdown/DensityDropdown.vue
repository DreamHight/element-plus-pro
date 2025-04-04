<template>
  <el-dropdown
    trigger="click"
    :teleported="false"
    @command="thicknessChangeHandler"
  >
    <el-icon
      class="cursor-pointer"
      :size="size"
      :color="color"
    >
      <IconDensity />
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="thickness in thicknessOptions"
          :key="thickness.value"
          :command="thickness"
          :style="thickness.value === currentThickness ? activeStyles : {}"
        >{{ thickness.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, type CSSProperties } from 'vue';
import IconDensity from '../icons/IconDensity.vue';
import type { IThickness } from '../typings/densityDropdown';

// defineProps and defineEmits start
const props = defineProps({
  size: {
    type: [Number, String],
    default: 20,
  },
  color: {
    type: String,
    default: 'var(--el-menu-text-color)',
  },
});
const emits = defineEmits([
  'change',
]);
// defineProps and defineEmits end

const thicknessOptions: IThickness[] = [
  {
    label: '宽松',
    value: 'large',
  },
  {
    label: '默认',
    value: 'default',
  },
  {
    label: '紧凑',
    value: 'small',
  },
];
const activeStyles: CSSProperties = {
  color: 'var(--el-dropdown-menuItem-hover-color)',
  backgroundColor: 'var(--el-dropdown-menuItem-hover-fill)',
}
const currentThickness = ref<string>('default');
function thicknessChangeHandler(item: IThickness): void {
  currentThickness.value = item.value;
  emits('change', item);
}
</script>