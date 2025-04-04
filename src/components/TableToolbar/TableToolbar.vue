<template>
  <div class="flex-between">
    <slot name="title">
      <h3 class="font-bold">{{ title }}</h3>
    </slot>

    <slot name="tool"></slot>

    <el-space v-if="showTools">
      <!-- 新建 -->
      <el-button v-if="showAdd" :icon="IconPlus" type="primary">新建</el-button>
      <!-- 批量删除 -->
      <el-button v-if="showDel" :icon="IconDelete" type="danger">批量删除</el-button>
      <!-- 导入 -->
      <el-button v-if="showImport" :icon="IconImport" type="warning">导入</el-button>
      <!-- 导出 -->
      <el-button v-if="showExport" :icon="IconExport" type="success">导出</el-button>

      <!-- 最小化/最大化 -->
      <el-tooltip
        v-if="showFullScreen"
        placement="top"
        :content="isFullScreen ? '最小化' : '最大化'"
        :teleported="false"
      >
        <FullScreen
          :has-tooltip="false"
          :el="el"
          @change="fullscreenChangeHandler"
        />
      </el-tooltip>
      <!-- 刷新 -->
      <el-tooltip
        v-if="showRefresh"
        placement="top"
        content="刷新"
        :teleported="false"
      >
        <el-icon
          class="cursor-pointer"
          size="20"
          color="var(--el-menu-text-color)"
          @click="refreshHandler"
        >
          <IconRefreshRight />
        </el-icon>
      </el-tooltip>
      <!-- 导出 -->
      <el-tooltip
        v-if="showExport"
        placement="top"
        content="导出"
        :teleported="false"
      >
        <el-icon
          class="cursor-pointer"
          size="20"
          color="var(--el-menu-text-color)"
          @click="exportHandler"
        >
          <IconExport />
        </el-icon>
      </el-tooltip>
      <!-- 密度 -->
      <el-tooltip
        v-if="showDensity"
        placement="top"
        content="密度"
        :teleported="false"
      >
        <DensityDropdown @change="thicknessChangeHandler" />
      </el-tooltip>
      <!-- 列设置 -->
      <el-tooltip
        v-if="showColumnSetting"
        placement="top"
        content="列设置"
        :teleported="false"
      >
        <ColumnSetting
          :columns="columns"
          @checked-change="checkedChangeHandler"
          @fixed-change="fixedChangeHandler"
        />
      </el-tooltip>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import IconDelete from '../icons/IconDelete.vue';
import IconPlus from '../icons/IconPlus.vue';
import IconRefreshRight from '../icons/IconRefreshRight.vue';
import ColumnSetting from '../ColumnSetting/ColumnSetting.vue';
import DensityDropdown from '../DensityDropdown/DensityDropdown.vue';
import FullScreen from '../FullScreen/FullScreen.vue';
import type { IThickness } from '../typings/densityDropdown';
import type { IColumn } from '../typings/table';
import IconImport from '../icons/IconImport.vue';
import IconExport from '../icons/IconExport.vue';

// defineProps and defineEmits start
const props = defineProps({
  title: {
    type: String,
    default: '查询表格',
  },
  showTools: {
    type: Boolean,
  },
  showAdd: {
    type: Boolean,
    default: true,
  },
  showDel: {
    type: Boolean,
  },
  showImport: {
    type: Boolean,
  },
  showExport: {
    type: Boolean,
  },
  showFullScreen: {
    type: Boolean,
    default: true,
  },
  el: {
    type: Object as PropType<HTMLElement>,
    default: () => {
      return document.documentElement;
    }
  },
  showRefresh: {
    type: Boolean,
    default: true,
  },
  showDensity: {
    type: Boolean,
    default: true,
  },
  showColumnSetting: {
    type: Boolean,
    default: true,
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
  'refresh',
  'export',
  'thickness-change',
  'checked-change',
  'fixed-change',
]);
// defineProps and defineEmits end

const isFullScreen = ref<boolean>(false);
function fullscreenChangeHandler(fullScreenState: boolean): void {
  isFullScreen.value = fullScreenState;
}

function refreshHandler(): void {
  emits('refresh');
}

function exportHandler(): void {
  emits('export');
}

function thicknessChangeHandler(item: IThickness): void {
  emits('thickness-change', item);
}

function checkedChangeHandler(checkList: string[]): void {
  emits('checked-change', checkList);
}
function fixedChangeHandler(fixedLeftLabels: string[], fixedLabels: string[], fixedRightLabels: string[]): void {
  emits('fixed-change', fixedLeftLabels, fixedLabels, fixedRightLabels);
}
</script>