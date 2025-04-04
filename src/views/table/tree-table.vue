<template>
  <el-card shadow="never" body-style="padding: 0">
    <TreeBox>
      <ProTable
        :columns="columns"
        :data="data"
        :border="true"
        :show-filter-and-table-space="false"
        :pagination-props="paginationProps"
        @operate-click="operateClickHandler"
      />
    </TreeBox>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import TreeBox from '@/components/TreeBox/TreeBox.vue';
import ProTable from '@/components/ProTable/index.vue';
import type { TableColumnCtx } from 'element-plus';
import type { IColumn } from '@/components/typings/table';
import type { IPaginationProps } from '@/components/typings/pagination';
import type { ITableOperation, ITableOperationProps } from '@/components/typings/tableOperation';
import type { ITableToolbarProps } from '@/components/typings/tableToolbar';

interface Tree {
  label: string
  children?: Tree[]
}
const treeData: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
const defaultProps = {
  children: 'children',
  label: 'label',
}
const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const isCollapse = ref<boolean>(false);
function slideClickHandler(): void {
  isCollapse.value = !isCollapse.value;
  // emits('slide-click', isCollapse.value);
}

// const key = ref<number>(0);
// setTimeout(() => {
//   key.value++
// }, 5000);
const columns: IColumn[] = [
  // {
  //   prop: 'selection',
  //   columnProps: {
  //     type: 'selection',
  //     width: 40,
  //     fixed: true,
  //   }
  // },
  {
    prop: 'prop1',
    label: '规则名称',
    // render: (row: ITableData, column: TableColumnCtx<ITableData>): VNode<RendererNode, RendererElement, {[key: string]: any;}> => {
    //   return h(
    //     ElButton, { type: 'primary', link: true },
    //     () => row[column.property],
    //   );
    // },
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
    // columnProps: {
    //   sortable: true,
    // },
    showInSearch: true,
  },
  {
    prop: 'prop4',
    label: '状态',
    // badgeSlotProps: {},
    // dotSlotProps: {},
    // renderDotHalo: (row: ITableData, column: TableColumnCtx<ITableData>) => {
    //   if ('运行中' === row[column.property]) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    // renderDotStatus: (row: ITableData, column: TableColumnCtx<ITableData>) => {
    //   if ('已上线' === row[column.property]) {
    //     return 'success';
    //   } else if ('运行中' === row[column.property]) {
    //     return 'primary';
    //   } else if ('关闭' === row[column.property]) {
    //     return 'info';
    //   } {
    //     return 'danger';
    //   }
    // },
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
    // columnProps: {
    //   sortable: true,
    // },
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
]);

const toolbarProps: ITableToolbarProps = {
  showTools: true,
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