<template>
  <el-row
    class="grid-box"
    :class="{
      'col-box': dragStart,
    }"
    :style="bodyStyle"
    v-bind="$attrs"
  >
    <el-col
      v-for="(item, index) in gridList"
      :key="index"
      :xs="xs"
      :sm="sm"
      :md="md"
      :lg="lg"
      :xl="xl"
      :style="colStyle"
      v-bind="{ ...colProps, ...getAttrs(item) }"
      :draggable="draggable"
      @dragstart="dragStartHandler($event, item)"
      @dragover="dragOverHandler"
      @dragleave="dragLeaveHandler"
      @drop="dropHandler($event, item)"
      @click="colClickHandler(item, index)"
    >
      <GridItem :item-style="itemStyle" :style="item.style" :item="item">
        <slot v-bind:item="item" />
      </GridItem>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watch, type CSSProperties, type PropType } from 'vue';
import GridItem from './GridItem.vue';
import type { IGridItem } from '../typings/grid';
import type { ColProps } from 'element-plus';

// defineProps and defineEmits start
const props = defineProps({
  data: {
    type: Array as () => IGridItem[],
    default: () => [],
  },
  bodyStyle: {
    type: [String, Object as () => CSSProperties],
    default: () => ({}),
  },
  colStyle: {
    type: [String, Object as () => CSSProperties],
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
  draggable: {
    type: Boolean,
  },
  colProps: {
    type: Object as PropType<Partial<ColProps>>,
    default: () => ({}),
  },
});
const emits = defineEmits(['col-click']);
// defineProps and defineEmits end

const xs: number = 12,
  sm: number = 12,
  md: number = 8,
  lg: number = 6,
  xl: number = 6;

const gridList = ref<IGridItem[]>([]);

function getAttrs(item: IGridItem): Omit<IGridItem, 'icon' | 'name' | 'style'> {
  const { icon, name, ...rest } = item;
  let result: Omit<IGridItem, 'icon' | 'name' | 'style'> = { ...rest };
  return result;
}

let targetDom: HTMLElement;
let draggedItem: IGridItem = {};
const dragStart = ref<boolean>(false);
function dragStartHandler(event: DragEvent, item: IGridItem): void {
  dragStart.value = true;
  draggedItem = item;
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', JSON.stringify(item));
  }
};
function dragOverHandler(event: DragEvent): void {
  event.stopPropagation();
  event.preventDefault();
  if (event.target instanceof HTMLElement) {
    targetDom = event.target;
    event.target.style.boxShadow = 'inset 0px 1px 10px 2px #d0d0d0';
  }
}
function dragLeaveHandler(): void {
  if (targetDom) {
    targetDom.style.boxShadow = 'inherit';
  }
}
function dropHandler(event: DragEvent, targetItem: IGridItem): void {
  dragStart.value = false;

  event.stopPropagation();
  event.preventDefault();
  const itemIndex = gridList.value.indexOf(draggedItem);
  const targetIndex = gridList.value.indexOf(targetItem);

  if (event.target instanceof HTMLElement) {
    event.target.style.boxShadow = 'inherit';
  }

  // 交换元素位置
  [gridList.value[itemIndex], gridList.value[targetIndex]] = [gridList.value[targetIndex], gridList.value[itemIndex]];
};

function colClickHandler(item: IGridItem, index: number): void {
  emits('col-click', item, index);
}

watch(
  () => props.data,
  (newVal) => {
    gridList.value = [ ...newVal ];
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.grid-box {
  background-color: var(--el-bg-color);

  &.col-box {
    .el-col * {
      pointer-events: none;
    }
  }
}
</style>