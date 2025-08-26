<template>
  <ProTable
    :show-operation="true"
    :operation-column-props="operationColumnProps"
    :table-operation-props="tableOperationProps"
    :columns="columns"
    :data="data"
    row-key="prop1"
    :toolbar-props="toolbarProps"
    :pagination-props="paginationProps"
    @operate-click="operateClickHandler"
  />
</template>

<script setup lang="ts">
import { h, reactive, type RendererElement, type RendererNode, type VNode } from 'vue';
import ProTable from '@/components/ProTable/index.vue';
import { ElButton, type TableColumnCtx } from 'element-plus';
import type { IColumn } from '@/components/typings/table';
import type { IPaginationProps } from '@/components/typings/pagination';
import type { ITableOperation, ITableOperationProps } from '@/components/typings/tableOperation';
import type { ITableToolbarProps } from '@/components/typings/tableToolbar';

const columns: IColumn[] = [
  {
    prop: 'selection',
    columnProps: {
      type: 'selection',
      width: 40,
      fixed: true,
    }
  },
  {
    prop: 'prop1',
    label: '规则名称',
    render: (row: ITableData, column: TableColumnCtx<ITableData>): VNode<RendererNode, RendererElement, {[key: string]: any;}> => {
      return h(
        ElButton, { type: 'primary', link: true },
        () => row[column.property],
      );
    },
    showInSearch: true,
  },
  {
    prop: 'prop2',
    label: '描述',
    showInSearch: true,
  },
  {
    prop: 'prop3',
    label: '服务调用次数',
    columnProps: {
      sortable: true,
    },
    showInSearch: true,
  },
  {
    prop: 'prop4',
    label: '状态',
    // badgeSlotProps: {},
    dotSlotProps: {},
    renderDotHalo: (row: ITableData, column: TableColumnCtx<ITableData>) => {
      if ('运行中' === row[column.property]) {
        return true;
      } else {
        return false;
      }
    },
    renderDotStatus: (row: ITableData, column: TableColumnCtx<ITableData>) => {
      if ('已上线' === row[column.property]) {
        return 'success';
      } else if ('运行中' === row[column.property]) {
        return 'primary';
      } else if ('关闭' === row[column.property]) {
        return 'info';
      } {
        return 'danger';
      }
    },
    // render: (row: ITableData, column: TableColumnCtx<ITableData>): VNode<RendererNode, RendererElement, {[key: string]: any;}> => {
    //   return h(
    //     'span', {},
    //     [ row[column.property] ]
    //   );
    // },
    showInSearch: true,
  },
  {
    prop: 'prop5',
    label: '上次调度时间',
    columnProps: {
      sortable: true,
    },
    showInSearch: true,
  },
];
interface ITableData {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
  prop5: string;
  prop6?: any[];
  prop7?: number;
  prop8?: number;
  [key: string]: any;
}
const data = reactive<ITableData[]>([
  {
    prop1: 'TradeCode 99',
    prop2: '这是一段描述',
    prop3: '819万',
    prop4: '已上线',
    prop5: '2025-01-15 12:49:54',
  },
  {
    prop1: 'TradeCode 98',
    prop2: '这是一段描述',
    prop3: '818万',
    prop4: '运行中',
    prop5: '2025-01-16 12:49:54',
  },
  {
    prop1: 'TradeCode 97',
    prop2: '这是一段描述',
    prop3: '817万',
    prop4: '异常',
    prop5: '2025-01-18 12:49:54',
  },
  {
    prop1: 'TradeCode 96',
    prop2: '这是一段描述',
    prop3: '816万',
    prop4: '关闭',
    prop5: '2025-01-19 12:49:54',
  },
  {
    prop1: 'TradeCode 95',
    prop2: '这是一段描述',
    prop3: '815万',
    prop4: '关闭',
    prop5: '2025-01-14 12:49:54',
  },
  {
    prop1: 'TradeCode 94',
    prop2: '这是一段描述',
    prop3: '815万',
    prop4: '关闭',
    prop5: '2025-01-14 12:49:54',
  },
  {
    prop1: 'TradeCode 93',
    prop2: '这是一段描述',
    prop3: '819万',
    prop4: '已上线',
    prop5: '2025-01-15 12:49:54',
  },
  {
    prop1: 'TradeCode 92',
    prop2: '这是一段描述',
    prop3: '818万',
    prop4: '运行中',
    prop5: '2025-01-16 12:49:54',
  },
  {
    prop1: 'TradeCode 91',
    prop2: '这是一段描述',
    prop3: '819万',
    prop4: '已上线',
    prop5: '2025-01-15 12:49:54',
  },
  {
    prop1: 'TradeCode 90',
    prop2: '这是一段描述',
    prop3: '819万',
    prop4: '已上线',
    prop5: '2025-01-15 12:49:54',
  },
]);

const toolbarProps: ITableToolbarProps = {
  showTools: true,
};
const operationColumnProps: any = {
  fixed: false,
};
const tableOperationProps: ITableOperationProps = {
  operations: [
    {
      key: 'configuration',
      name: '配置',
    },
    {
      key: 'subscribeToAlerts',
      name: '订阅警报',
    },
  ],
  mixType: 'cover',
};
function operateClickHandler(item: ITableOperation, row: ITableData, column: TableColumnCtx<ITableData>, index: number): void {
  console.log('operateClickHandler', item, row, column, index);
}
const paginationProps: IPaginationProps = {
  total: data.length,
};
</script>