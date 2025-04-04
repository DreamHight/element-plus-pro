<template>
  <div>
    <QueryFilter
      v-if="formItemData.length"
      :inline="true"
      :show-toggle="true"
      :show-operate="false"
      :form-item-data="formItemData"
      :rounded="rounded"
    >
      <template #prop1Slot>
        <el-tooltip
          placement="top"
          content="The rule name is the unique key"
        >
          <el-icon class="cursor-pointer"><InfoFilled /></el-icon>
        </el-tooltip>
      </template>
    </QueryFilter>

    <div v-if="showFilterAndTableSpace" class="mb-14px" />

    <div
      ref="TableBoxRef"
      class="bg-white"
      :class="[
        'rounded-' + rounded,
      ]"
      style="padding: 16px 20px 14px;"
    >
      <TableToolbar
        :el="getEl"
        :columns="columnsSetting"
        class="mb-14px"
        @refresh="refreshHandler"
        @thickness-change="thicknessChangeHandler"
        @checked-change="checkedChangeHandler"
        @fixed-change="fixedChangeHandler"
        v-bind="toolbarProps"
      >
        <template
          v-for="(_slotContent, slotName) in slots"
          :key="slotName"
          #[slotName]="slotProps"
        >
          <slot :name="slotName" v-bind="slotProps"></slot>
        </template>
      </TableToolbar>

      <el-alert
        v-if="showAlert && multipleSelection.length"
        :title="'已选择' + multipleSelection.length + '项'"
        type="success"
        close-text="取消选择"
        class="mb-14px"
        @close="alertCloseHandler"
      />

      <ProPagination
        v-if="['top', 'both'].includes(paginationPosition)"
        v-bind="topPaginationPropsMix"
      />

      <ProBasicTable
        ref="ProTableRef"
        :columns="tableColumns"
        :data="tableData"
        :size="tableSize"
        @operate="operateClickHandler"
        v-bind="$attrs"
        :show-operation="toggleOperation"
        :operation-column-props="operationColumnProps"
        @selection-change="selectionChangeHandler"
      >
        <template
          v-for="(_slotContent, slotName) in slots"
          :key="slotName"
          #[slotName]="slotProps"
        >
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </ProBasicTable>

      <ProPagination
        v-if="['bottom', 'both'].includes(paginationPosition)"
        v-bind="bottomPaginationPropsMix"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, useAttrs, useSlots, watch, type CSSProperties, type PropType, type Slots } from 'vue';
import type { IPaginationProps } from '../typings/pagination';
import type { IFormItemFieldProps } from '../typings/queryFilter';
import type { FormItemProps, TableColumnCtx } from 'element-plus';
import type { IColumn } from '../typings/table';
import type { IFieldProps } from '../typings/field';
import ProPagination from '@/components/ProPagination/index.vue';
import TableToolbar from '@/components/TableToolbar/TableToolbar.vue';
import QueryFilter from '@/components/QueryFilter/QueryFilter.vue';
import ProBasicTable from '@/components/ProBasicTable/index.vue';
import type { ITableToolbarProps } from '../typings/tableToolbar';
import type { ITableOperation } from '../typings/tableOperation';
import type { IThickness } from '../typings/densityDropdown';

const attrs = useAttrs();
const slots: Slots = useSlots();

defineOptions({
  inheritAttrs: false,
});

// defineProps and defineEmits start
const props = defineProps({
  showFilterAndTableSpace: {
    type: Boolean,
    default: true,
  },

  rounded: {
    type: String,
    default: 'base',
    validator: (val: string) => {
      return ['none', 'base', 'small', 'round', 'circle'].includes(val);
    }
  },

  toolbarProps: {
    type: Object  as PropType<ITableToolbarProps>,
    default: () => ({}),
  },

  showAlert: {
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
  data: {
    type: Array as () => any[],
    default: () => [],
    validator: (val: any[]) => {
      return Array.isArray(val);
    }
  },

  paginationPosition: {
    type: String,
    default: 'bottom',
    validator: (val: string) => {
      return ['bottom', 'top', 'both'].includes(val);
    },
  },
  paginationSticky: {
    type: Boolean,
    default: true,
  },
  paginationProps: {
    type: Object  as PropType<IPaginationProps>,
    default: () => ({}),
  },
});
const emits = defineEmits([
  'refresh',
  'thickness-change',
  'operate-click',
  'selection-change',
]);
// defineProps and defineEmits end

const operationColumn = reactive<IColumn>({
  prop: 'operation',
  label: '操作',
  columnProps: {
    width: 130,
    fixed: 'right',
  },
});
const operationColumnProps: any = ref(operationColumn.columnProps);

const formItemData = reactive<IFormItemFieldProps[]>([]);
function getFormItemData(data: IColumn[]): void {
  formItemData.length = 0;
  const formData = data.filter(item => item.showInSearch);
  if (formData && formData.length) {
    let _formItemProps: Partial<FormItemProps> | null = null,
      _searchFieldProps: IFieldProps | null = null;

    formData.forEach(item => {
      _formItemProps = {
        prop: item.prop,
        label: item.label,
        ...(item.formItemProps || {}),
      };
      _searchFieldProps = {
        ...(item.searchFieldProps || {}),
      };

      formItemData.push({
        prop: item.prop,
        label: item.label || '',
        labelSlot: item.labelSlot,
        icon: item.icon,
        subLabel: item.subLabel,
        subLabelSlot: item.subLabelSlot,
        description: item.description,
        descriptionSlot: item.descriptionSlot,
        separator: item.separator,
        formItemProps: _formItemProps,
        fieldProps: _searchFieldProps,
      });
    });
  }
}

function alertCloseHandler(): void {
  if (ProTableRef.value) {
    ProTableRef.value.getRef()!.clearSelection();
  }
}

const TableBoxRef = ref();
const getEl = computed(() => {
  return TableBoxRef.value;
});

const columnsSetting = reactive<IColumn[]>([]);

function refreshHandler(): void {
  emits('refresh');
}

function thicknessChangeHandler(item: IThickness): void {
  tableSize.value = item.value;
  emits('thickness-change', item);
}

const toggleOperation = ref<boolean>(typeof(attrs['show-operation']) === 'boolean' ? attrs['show-operation'] : false);
function checkedChangeHandler(checkList: string[]): void {
  let find: IColumn | undefined = undefined;
  tableColumns.length = 0;
  find = originColumns.find(obj => obj.columnProps && obj.columnProps.type);
  console.log('findfind', find);

  if (find) {
    tableColumns.push({ ...find });
  }
  checkList.forEach(label => {
    find = originColumns.find(obj => obj.label === label);
    if (find) {
      tableColumns.push({ ...find });
    }
  });

  if (attrs['show-operation']) {
    toggleOperation.value = checkList.includes(operationColumn.label ?? '');
  }
}
function fixedChangeHandler(fixedLeftLabels: string[], fixedLabels: string[], fixedRightLabels: string[]): void {
  let find: IColumn | undefined = undefined,
    operationColumn: IColumn | undefined = undefined;

  tableColumns.length = 0;

  fixedLeftLabels.forEach(label => {
    find = originColumns.find(obj => obj.label === label);
    if (find) {
      if (find.columnProps) {
        find.columnProps['fixed'] = 'left';
      } else {
        find['columnProps'] = {
          fixed: 'left',
        };
      }
      tableColumns.push({ ...find });

      if (find.prop === 'operation') {
        operationColumn = { ...find.columnProps };
      }
    }
  });

  fixedLabels.forEach(label => {
    find = originColumns.find(obj => obj.label === label);
    if (find) {
      find['columnProps'] = {
        fixed: false,
      };
      tableColumns.push({ ...find });

      if (find.prop === 'operation') {
        operationColumn = { ...find.columnProps };
      }
    }
  });

  fixedRightLabels.forEach(label => {
    find = originColumns.find(obj => obj.label === label);
    if (find) {
      if (find.columnProps) {
        find.columnProps['fixed'] = 'right';
      } else {
        find['columnProps'] = {
          fixed: 'right',
        };
      }
      tableColumns.push({ ...find });

      if (find.prop === 'operation') {
        operationColumn = { ...find.columnProps };
      }
    }
  });

  if (operationColumn) {
    operationColumnProps.value = operationColumn;
  }
}

const ProTableRef = ref();
const tableColumns = reactive<IColumn[]>([]);
const tableData = reactive<any[]>([]);
const tableSize = ref<string>('default');
const multipleSelection = ref<any[]>([]);
function selectionChangeHandler(newSelection: any[]): void {
  multipleSelection.value = newSelection;
  emits('selection-change', newSelection);
}

function operateClickHandler(item: ITableOperation, row: any, column: TableColumnCtx<any>, index: number): void {
  emits('operate-click', item, row, column, index);
}

const positionStickyTop: CSSProperties = {
  position: 'sticky',
  top: 'calc(0px - var(--el-main-padding))',
  zIndex: 4,
};
const topPaginationPropsMix = reactive<IPaginationProps>({
  paginationStyles: {
    padding: '14px 0',
    backgroundColor: 'var(--el-bg-color)',
    borderBlockEnd: '1px solid var(--el-border-color-extra-light)',
    marginBottom: '-1px',
  }
});
const positionStickyBottom: CSSProperties = {
  position: 'sticky',
  bottom: 'calc(0px - var(--el-main-padding))',
  zIndex: 4,
};
const bottomPaginationPropsMix = reactive<IPaginationProps>({
  paginationStyles: {
    padding: '17px 0',
    backgroundColor: 'var(--el-bg-color)',
    borderBlockStart: '1px solid var(--el-border-color-extra-light)',
    marginTop: '-1px',
  },
});
function initPagination(data: IPaginationProps): void {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    Object.assign(topPaginationPropsMix, data);
    Object.assign(bottomPaginationPropsMix, data);

    if (props.paginationSticky) {
      if (topPaginationPropsMix.paginationStyles) {
        Object.assign(topPaginationPropsMix.paginationStyles, positionStickyTop);
      }
      if (bottomPaginationPropsMix.paginationStyles) {
        Object.assign(bottomPaginationPropsMix.paginationStyles, positionStickyBottom);
      }
    }
  }
}

let originColumns: IColumn[] = [];
watch(
  () => props.columns,
  (newVal) => {
    if (Array.isArray(newVal)) {
      const _columns = newVal.filter(item => !item.hideInTable);
      if (Array.isArray(_columns)) {
        tableColumns.length = 0;
        columnsSetting.length = 0;

        _columns.forEach(item => {
          tableColumns.push(item);

          if (!(item.columnProps && item.columnProps.type)) {
            columnsSetting.push(item);
          }
        });
        if (attrs['show-operation']) {
          if (attrs['operation-column-props']) {
            const _columnProps = Object.assign(
              {},
              operationColumn.columnProps ?? {},
              attrs['operation-column-props'] ?? {}
            );
            operationColumn.columnProps = _columnProps ?? {};
            operationColumnProps.value = { ...(_columnProps ?? {}) };
          }
          tableColumns.push(operationColumn);
          columnsSetting.push(operationColumn);
        }

        // originColumns = JSON.parse(JSON.stringify(tableColumns));
        originColumns = [ ...tableColumns ];

        getFormItemData(tableColumns);
      }
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
watch(
  () => props.data,
  (newVal) => {
    if (Array.isArray(newVal)) {
      tableData.length = 0;
      newVal.forEach(item => {
        tableData.push(item);
      });
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
watch(
  () => props.paginationProps,
  (newVal) => {
    initPagination(newVal);
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>