<template>
  <el-dropdown placement="bottom-end" trigger="click" :teleported="false">
    <el-icon class="cursor-pointer" :size="size" :color="color">
      <IconSetting />
    </el-icon>
    <template #dropdown>
      <div class="py-10px px-14px">
        <div class="check-all flex-between">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="checkAllChangeHandler"
          >
            <span class="font-bold">列展示</span>
          </el-checkbox>
          <el-button
            link
            type="primary"
            @click="resetColumns"
          >重置</el-button>
        </div>

        <!-- @dragstart.native="dragStartHandler($event, 'drag-box-left')"
        @dragover.native="dragOverHandler"
        @dragenter.native="dragEnterHandler($event, 'left')"
        @dragend.native="dragEndHandler" -->
        <el-checkbox-group
          v-model="checkList"
          @change="checkChangeHandler"
        >
          <div v-if="fixedLeftLabels.length" style="padding: 12px 24px 6px;">
            <el-text type="info">固定在左侧</el-text>
          </div>
          <div
            class="drag-box-left"
            @dragstart="dragStartHandler($event, 'drag-box-left')"
            @dragover="dragOverHandler"
            @dragenter="dragEnterHandler($event, 'left')"
            @dragend="dragEndHandler"
          >
            <el-button
              v-for="(item, index) in fixedLeftLabels"
              :key="item"
              link
              class="btn-box"
              :class="{
                'none-pointer-events': dragStart,
              }"
              :draggable="true"
            >
              <el-icon class="cursor-move">
                <IconMoveHolder />
              </el-icon>
              <el-button class="move-box" text>
                <el-checkbox :label="item" :value="item" :disabled="getDisabled(item)" class="w-full">
                  <el-text truncated class="max-width">{{ item }}</el-text>
                </el-checkbox>

                <el-space :size="5" class="move-icon">
                  <el-icon color="var(--el-color-primary)" @click="toCancelHandler(item, index, 'left')">
                    <IconMoveCancel />
                  </el-icon>
                  <el-icon color="var(--el-color-primary)" @click="toBottomHandler(item, index, 'left')">
                    <IconMoveBottom />
                  </el-icon>
                </el-space>
              </el-button>
            </el-button>
          </div>

          <div
            v-if="fixedLabels.length && (fixedLeftLabels.length || fixedRightLabels.length)"
            style="padding: 16px 24px 6px;"
          >
            <el-text type="info">不固定</el-text>
          </div>
          <div
            class="drag-box-center"
            @dragstart="dragStartHandler($event, 'drag-box-center')"
            @dragover="dragOverHandler"
            @dragenter="dragEnterHandler($event, 'center')"
            @dragend="dragEndHandler"
          >
            <el-button
              v-for="(item, index) in fixedLabels"
              :key="item"
              link
              class="btn-box"
              :class="{
                'none-pointer-events': dragStart,
              }"
              :draggable="true"
            >
              <el-icon class="cursor-move">
                <IconMoveHolder />
              </el-icon>
              <el-button class="move-box" text>
                <el-checkbox :label="item" :value="item" :disabled="getDisabled(item)" class="w-full">
                  <el-text truncated class="max-width">{{ item }}</el-text>
                </el-checkbox>

                <el-space :size="5" class="move-icon">
                  <el-icon color="var(--el-color-primary)" @click="toTopHandler(item, index, 'center')">
                    <IconMoveTop />
                  </el-icon>
                  <el-icon color="var(--el-color-primary)" @click="toBottomHandler(item, index, 'center')">
                    <IconMoveBottom />
                  </el-icon>
                </el-space>
              </el-button>
            </el-button>
          </div>

          <div v-if="fixedRightLabels.length" style="padding: 16px 24px 6px;">
            <el-text type="info">固定在右侧</el-text>
          </div>
          <div
            class="drag-box-right"
            @dragstart="dragStartHandler($event, 'drag-box-right')"
            @dragover="dragOverHandler"
            @dragenter="dragEnterHandler($event, 'right')"
            @dragend="dragEndHandler"
          >
            <el-button
              v-for="(item, index) in fixedRightLabels"
              :key="item"
              link
              class="btn-box"
              :class="{
                'none-pointer-events': dragStart,
              }"
              :draggable="true"
            >
              <el-icon class="cursor-move">
                <IconMoveHolder />
              </el-icon>
              <el-button class="move-box" text>
                <el-checkbox :label="item" :value="item" :disabled="getDisabled(item)" class="w-full">
                  <el-text truncated class="max-width">{{ item }}</el-text>
                </el-checkbox>

                <el-space :size="5" class="move-icon">
                  <el-icon color="var(--el-color-primary)" @click="toTopHandler(item, index, 'right')">
                    <IconMoveTop />
                  </el-icon>
                  <el-icon color="var(--el-color-primary)" @click="toCancelHandler(item, index, 'right')">
                    <IconMoveCancel />
                  </el-icon>
                </el-space>
              </el-button>
            </el-button>
          </div>
        </el-checkbox-group>
      </div>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IColumn } from '../typings/table';
import IconMoveHolder from '../icons/IconMoveHolder.vue';
import IconSetting from '../icons/IconSetting.vue';
import IconMoveBottom from '../icons/IconMoveBottom.vue';
import IconMoveTop from '../icons/IconMoveTop.vue';
import IconMoveCancel from '../icons/IconMoveCancel.vue';

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

  columns: {
    type: Array as () => IColumn[],
    default: () => [],
    validator: (val: IColumn[]) => {
      return Array.isArray(val);
    }
  },
});
const emits = defineEmits([
  'checked-change',
  'fixed-change',
]);
// defineProps and defineEmits end

function getDisabled(label: string): boolean {
  let result: boolean = false;
  const find: IColumn | undefined = props.columns.find(obj => obj.label === label);
  if (find) {
    result = !!find.disabled;
  }
  return result;
}

const checkAll = ref<boolean>(true);
const isIndeterminate = ref<boolean>(false);

const fixedLeftColumns = props.columns.filter(item => {
  return (typeof(item.columnProps?.fixed) === 'boolean' && item.columnProps?.fixed) ||
    item.columnProps?.fixed === 'left'
});
const fixedColumns = props.columns.filter(item => !item.columnProps?.fixed);
const fixedRightColumns = props.columns.filter(item => item.columnProps?.fixed === 'right');

const columnsLabels = props.columns.map(item => item.label ?? '');
const checkList = ref<string[]>([ ...columnsLabels ]);

const fixedLeftLabels = ref<string[]>(fixedLeftColumns.map(item => item.label ?? ''));
const fixedLabels = ref<string[]>(fixedColumns.map(item => item.label ?? ''));
const fixedRightLabels = ref<string[]>(fixedRightColumns.map(item => item.label ?? ''));

const dragStart = ref<boolean>(false);
let list: Element | null = null,
  source: Element | null = null,
  changePosition: boolean = false;
function dragStartHandler(event: DragEvent, fixedLabel: string): void {
  list = document.querySelector(`.${fixedLabel}`);
  dragStart.value = true;

  source = event.target as Element;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
  }

  setTimeout(() => {
    if (source) {
      source.classList.add('moving');
    }
  }, 0);
}
function dragOverHandler(event: DragEvent): void {
  event.preventDefault();
}
function dragEnterHandler(event: DragEvent, fixedLabel: string): void {
  if (!source) {
    return;
  }

  const target: Element = event.target as Element;
  if (target === list || target === source) {
    return;
  }

  if (!list) {
    return;
  }

  const sourceIndex: number = Array.from(list.children).indexOf(source);
  const targetIndex: number = Array.from(list.children).indexOf(target);
  if (sourceIndex === -1 || targetIndex === -1) {
    return;
  }

  if (sourceIndex < targetIndex) {
    list.insertBefore(target, source);
  } else {
    list.insertBefore(source, target);
  }

  movingHandler(fixedLabel, sourceIndex, targetIndex);
  changePosition = true;
}
function dragEndHandler(event: DragEvent): void {
  source = event.target as Element;
  if (source) {
    source.classList.remove('moving');
  }
  if (changePosition) {
    changePosition = false;
    emits('fixed-change', fixedLeftLabels.value, fixedLabels.value, fixedRightLabels.value);
  }
  dragStart.value = false;
}

function movingHandler(fixedLabel: string, sourceIndex: number, targetIndex: number): void {
  // 交换元素位置
  if (fixedLabel === 'left') {
    [fixedLeftLabels.value[sourceIndex], fixedLeftLabels.value[targetIndex]] = [fixedLeftLabels.value[targetIndex], fixedLeftLabels.value[sourceIndex]];
  } else if (fixedLabel === 'center') {
    [fixedLabels.value[sourceIndex], fixedLabels.value[targetIndex]] = [fixedLabels.value[targetIndex], fixedLabels.value[sourceIndex]];
  } else if (fixedLabel === 'right') {
    [fixedRightLabels.value[sourceIndex], fixedRightLabels.value[targetIndex]] = [fixedRightLabels.value[targetIndex], fixedRightLabels.value[sourceIndex]];
  }
}

function resetColumns(): void {
  fixedLeftLabels.value = fixedLeftColumns.map(item => item.label ?? '');
  fixedLabels.value = fixedColumns.map(item => item.label ?? '');
  fixedRightLabels.value = fixedRightColumns.map(item => item.label ?? '');

  checkList.value = [ ...columnsLabels ];
  checkAll.value = true;
  isIndeterminate.value = false;

  emits('fixed-change', fixedLeftLabels.value, fixedLabels.value, fixedRightLabels.value);
}

function checkAllChangeHandler(val: boolean): void {
  checkList.value = val ? [ ...columnsLabels ] : [];
  isIndeterminate.value = false;

  emits('checked-change', checkList.value);
}
function checkChangeHandler(value: string[]): void {
  const checkedCount: number = value.length;
  const columnItems: string[] = [ ...columnsLabels ];
  checkAll.value = checkedCount === columnItems.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < columnItems.length;

  emits('checked-change', checkList.value);
}

function toTopHandler(item: string, index: number, direction: string): void {
  let spliceItem: string[] = [];
  if ('center' === direction) {
    spliceItem = fixedLabels.value.splice(index, 1);
  } else if ('right' === direction) {
    spliceItem = fixedRightLabels.value.splice(index, 1);
  }
  if (fixedLeftLabels.value.length) {
    const newLabels: string[] = columnsLabels.filter(label => [item, ...fixedLeftLabels.value].includes(label));
    fixedLeftLabels.value = newLabels || [];
  } else {
    fixedLeftLabels.value.unshift(...spliceItem);
  }

  emits('fixed-change', fixedLeftLabels.value, fixedLabels.value, fixedRightLabels.value);
}
function toCancelHandler(item: string, index: number, direction: string): void {
  let spliceItem: string[] = [];
  if ('left' === direction) {
    spliceItem = fixedLeftLabels.value.splice(index, 1);
  } else if ('right' === direction) {
    spliceItem = fixedRightLabels.value.splice(index, 1);
  }
  if (spliceItem.length) {
    const newLabels: string[] = columnsLabels.filter(label => [item, ...fixedLabels.value].includes(label));
    fixedLabels.value = newLabels || [];
  }

  emits('fixed-change', fixedLeftLabels.value, fixedLabels.value, fixedRightLabels.value);
}
function toBottomHandler(item: string, index: number, direction: string): void {
  let spliceItem: string[] = [];
  if ('left' === direction) {
    spliceItem = fixedLeftLabels.value.splice(index, 1);
  } else if ('center' === direction) {
    spliceItem = fixedLabels.value.splice(index, 1);
  }
  if (fixedRightLabels.value.length) {
    const newLabels: string[] = columnsLabels.filter(label => [item, ...fixedRightLabels.value].includes(label));
    fixedRightLabels.value = newLabels || [];
  } else {
    fixedRightLabels.value.push(...spliceItem);
  }

  emits('fixed-change', fixedLeftLabels.value, fixedLabels.value, fixedRightLabels.value);
}

onMounted(() => {
  // list = document.querySelector('.drag-box-center');
  // list = document.querySelector('.el-checkbox-group');
  // list = document.querySelector('.drag-box');
  // dragBoxLeftList = document.querySelector('.drag-box-left');
  // dragBoxCenterList = document.querySelector('.drag-box-center');
  // dragBoxRightList = document.querySelector('.drag-box-right');
})
</script>

<style lang="scss" scoped>
.check-all {
  margin-bottom: 5px;
}

.moving {
  opacity: 0.5;
}

.el-checkbox-group {
  max-height: 240px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }

  .btn-box {
    margin-left: 0;
    padding: 0 2px;
    &.none-pointer-events * {
      pointer-events: none;
    }
  }

  .move-box {
    position: relative;
    justify-content: flex-start;
    width: 185px;
    padding: 8px;

    .max-width {
      max-width: 110px;
    }
    .move-icon {
      display: none;
      position: absolute;
      right: 6px;
    }
    &:hover {
      .move-icon {
        display: inline-flex;
      }
    }
  }
}
</style>