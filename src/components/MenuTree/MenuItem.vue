<template>
  <el-badge
    v-if="menuItem.componentType === 'el-badge'"
    :offset="MODE_TO_BADGE[menuMode]"
    v-bind="menuItem.componentProps"
  >{{ collapse ? '' : menuItem.title }}</el-badge>
  <div
    v-else-if="menuItem.componentType === 'el-icon'"
    class="flex-between w-full"
  >
    <span>{{ collapse ? '' : menuItem.title }}</span>
    <el-icon v-bind="menuItem.componentProps">
      <component :is="menuItem.componentProps.defaultSlot" />
    </el-icon>
  </div>
  <div v-else class="flex-between w-full">
    <span>{{ collapse ? '' : menuItem.title }}</span>
    <component
      v-if="['el-button', 'el-tag'].includes(menuItem.componentType)"
      :is="menuItem.componentType"
      v-bind="menuItem.componentProps"
    >
      {{ menuItem.componentProps.defaultSlot }}
    </component>
    <component
      v-else
      :is="menuItem.componentType"
      v-bind="menuItem.componentProps"
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import type { IMenuItem } from '../typings/menu';

// defineProps and defineEmits start
const props = defineProps({
  menuItem: {
    required: true,
    type: Object as PropType<IMenuItem>,
  },

  menuMode: {
    type: String,
    default: 'vertical',
    validator: (val: string) => {
      return ['horizontal', 'vertical'].includes(val);
    }
  },
  collapse: {
    type: Boolean,
  },
});
// defineProps and defineEmits end

const MODE_TO_BADGE: { [key: string]: number[] } = {
  'vertical': [70, 28],
  'horizontal': [0, 15],
};
</script>