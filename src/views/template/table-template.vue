<template>
  <div>
    <!-- :show-serial-number="true"
    :table-serial-number-props="{
      variant: 'background',
      activeColor: ['#f00', '#0f0', '#00f'],
    }" -->
    <ProTable
      :show-serial-number="true"
      :show-operation="true"
      :operation-column-props="{
        fixed: 'left',
      }"
      :columns="columns"
      :data="data"
      :border="true"
      :toolbar-props="toolbarProps"
      pagination-position="both"
      :pagination-props="paginationProps"
    >
      <!-- @row-click="rowClickHandler" size="small" table-layout="auto" -->
      <template #prop1HeaderSlot="slotProps">
        <el-space :size="2">
          <span>{{slotProps.label}}</span>
          <el-tooltip
            placement="top"
            content="The rule name is the unique key"
          >
            <el-icon style="cursor: pointer;"><InfoFilled /></el-icon>
          </el-tooltip>
        </el-space>
      </template>

      <template #prop1ColumnSlot="slotProps">
        <el-space :size="4">
          <el-tooltip placement="top" :content="slotProps.row[slotProps.column.property]">
            <el-text truncated type="primary" style="max-width: 155px; cursor: pointer;" @click="cc(slotProps.row[slotProps.column.property])">
              {{ slotProps.row[slotProps.column.property] }}
            </el-text>
          </el-tooltip>
          <ClipBoard :text="slotProps.row[slotProps.column.property]" />
        </el-space>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
// import { useFullScreen } from '@/components/hooks';
import ProTable from '@/components/ProTable/index.vue';
import ClipBoard from '@/components/ClipBoard/ClipBoard.vue';
import { h, onMounted, reactive, type RendererElement, type RendererNode, type VNode } from 'vue';
import type { IColumn } from '@/components/typings/table';
// import { CopyDocument, InfoFilled } from '@element-plus/icons-vue';
import { ElButton, ElTag, type TableColumnCtx } from 'element-plus';
import type { IPaginationProps } from '@/components/typings/pagination';
import type { IAvatarGroup } from '@/components/typings/avatarGroup';
import type { ITableToolbarProps } from '@/components/typings/tableToolbar';
// import type { TableColumnCtx } from 'element-plus';
// import type { TableColumn } from 'element-plus/lib/components/table/src/table-column/defaults.js';

const columns = reactive<IColumn[]>([
  {
    prop: 'prop1',
    label: '规则名称',
    subLabelSlot: 'prop1Slot',
    headerSlotName: 'prop1HeaderSlot',
    columnSlotName: 'prop1ColumnSlot',
    columnProps: {
      sortable: true,
      width: 200,
    },
    showInSearch: true,
  },
  {
    prop: 'prop2',
    label: '描述',
    copyable: true,
    columnProps: {
      showOverflowTooltip: true,
      // formatter: (row: ITableData, column: TableColumnCtx<ITableData>) => {
      //   return '描述：' + row[column.property];
      // },
    },
    // renderContent: (row: ITableData, column: TableColumnCtx<ITableData>) => {
    //   return '描述：' + row[column.property];
    // },
    // render: (row: ITableData, column: TableColumnCtx<ITableData>): VNode<RendererNode, RendererElement, {[key: string]: any;}> => {
    //   return h(
    //     ElTag, {},
    //     [ '描述：' + row[column.property] ]
    //   );
    // },
    showInSearch: true,
  },
  {
    prop: 'prop3',
    label: '服务调用次数',
    // tagSlotProps: {
    //   type: 'primary',
    // },
    columnProps: {
      width: 120,
    },
    tagSlotProps: {},
    renderTagStatus: (row: ITableData, column: TableColumnCtx<ITableData>) => {
      if ('815万' === row[column.property]) {
        return 'danger';
      } else if ('819万' === row[column.property]) {
        return 'warning';
      } else {
        return 'primary';
      }
    },
    // render: (row: ITableData, column: TableColumnCtx<ITableData>): VNode<RendererNode, RendererElement, {[key: string]: any;}> => {
    //   return h(
    //     'span', { style: { textDecoration: 'underline' } },
    //     [ row[column.property] ]
    //   );
    // },
    // renderContent: (row: ITableData, column: TableColumnCtx<ITableData>) => {
    //   return row[column.property];
    // },
    showInSearch: true,
  },
  {
    prop: 'prop4',
    label: '状态',
    badgeSlotProps: {},
    renderBadgeStatus: (row: ITableData, column: TableColumnCtx<ITableData>) => {
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
    // render: (row: ITableData, column: TableColumnCtx<ITableData>): VNode<RendererNode, RendererElement, {[key: string]: any;}> => {
    //   return h(
    //     'span', { style: { textDecoration: 'underline' } },
    //     [ row[column.property] ]
    //   );
    // },
    // renderContent: (row: ITableData, column: TableColumnCtx<ITableData>) => {
    //   return row[column.property];
    // },
    showInSearch: true,
  },
  {
    prop: 'prop5',
    label: '上次调度时间',
    columnProps: {
      width: 120,
    },
    // columnProps: {
    //   showOverflowTooltip: true,
      // formatter: (row: ITableData, column: TableColumnCtx<ITableData>) => {
      //   return '调度时间：' + row[column.property];
      // },
    // },
    showInSearch: true,
  },
  {
    prop: 'prop6',
    label: '头像',
    columnProps: {
      width: 120,
    },
    avatarGroupSlotProps: {},
  },
  {
    prop: 'prop7',
    label: '进度',
    columnProps: {
      align: 'center',
    },
    progressSlotProps: {
      type: 'dashboard',
      width: 50,
      // format: (percentage: number): string => {
      //   return '百分比：' + percentage;
      // },
      // indeterminate: true,
      // strokeWidth: 16,
      // textInside: true,
      // striped: true,
      // stripedFlow: true,
      // color: [
      //   { color: '#f56c6c', percentage: 20 },
      //   { color: '#e6a23c', percentage: 40 },
      //   { color: '#5cb87a', percentage: 60 },
      //   { color: '#1989fa', percentage: 80 },
      //   { color: '#6f7ad3', percentage: 100 },
      // ],
    },
    renderProgressStatus: (row: ITableData, column: TableColumnCtx<ITableData>, index: number) => {
      if (100 === row[column.property]) {
        return 'success';
      } else if (99.9 === row[column.property]) {
        return 'warning';
      } else if (row[column.property] < 90) {
        return 'exception';
      } else {
        return 'exception';
      }
    },
    // render: (row: ITableData, column: TableColumnCtx<ITableData>): VNode<RendererNode, RendererElement, {[key: string]: any;}> => {
    //   return h(
    //     'span',
    //     {
    //       style: { fontSize: '1.2em' },
    //       onclick: () => {alert(123)}
    //     },
    //     [
    //       row[column.property] === 100 ? 'Full' : `${row[column.property]}%`,
    //     ]
    //   );
    // },
    // renderContent: (row: ITableData, column: TableColumnCtx<ITableData>): string => {
      // return row[column.property] === 100 ? 'Full' : `${row[column.property]}%`;
    // },
  },
  {
    prop: 'prop8',
    label: '重要性',
    columnProps: {
      minWidth: 120,
      align: 'center',
    },
    rateSlotProps: {
      disabled: true,
      allowHalf: true,
      // showScore: true,
      // textColor: '#ff9900',
      // scoreTemplate: '{value} points',
    },
  },
  {
    prop: 'prop9',
    label: '图片',
    imageSlotProps: {
      previewSrcList: ['https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'],
    },
  },
  // {
  //   prop: 'operations',
  //   label: '操作',
  //   columnProps: {
  //     fixed: 'right',
  //   },
  // },
]);

interface ITableData {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
  prop5: string;
  prop6?: IAvatarGroup[];
  prop7?: number;
  prop8?: number;
  prop9?: string;
  [key: string]: any;
}
const data = reactive<ITableData[]>([
  {
    prop1: '🐛 [BUG]yarn install命令 antd2.4.5会报错 99',
    prop2: '这是一段描述',
    prop3: '819万',
    prop4: '已上线',
    prop5: '2025-01-16 12:49:54',
    prop6: [
      {
        tooltip: '全村人的希望',
        src: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
      },
      {
        tooltip: 'SunSmile',
        src: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg',
      },
      {
        tooltip: 'KD',
        slotContent: 'KD',
      },
      {
        tooltip: '你的名字很好听',
        src: '	https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg',
      },
    ],
    prop7: 99.9,
    prop8: 5,
    prop9: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
  },
  {
    prop1: 'TradeCode 98',
    prop2: '这是一段描述这是一段描述',
    prop3: '818万',
    prop4: '运行中',
    prop5: '2025-01-16 12:49:54',
    prop6: [
      {
        tooltip: '全村人的希望',
        src: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
      },
      {
        tooltip: 'SunSmile',
        src: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg',
      },
      {
        tooltip: 'KD',
        slotContent: 'KD',
      },
    ],
    prop7: 100,
    prop8: 3.7,
    prop9: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
  },
  {
    prop1: 'TradeCode 97',
    prop2: '这是一段描述3',
    prop3: '817万',
    prop4: '异常',
    prop5: '2025-01-16 12:49:54',
    prop6: [
      {
        tooltip: '全村人的希望',
        src: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
      },
      {
        tooltip: 'SunSmile',
        src: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg',
      },
    ],
    prop7: 30,
    prop8: 2.5,
    prop9: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
  },
  {
    prop1: 'TradeCode 96',
    prop2: '这是一段描述4',
    prop3: '816万',
    prop4: '关闭',
    prop5: '2025-01-16 12:49:54',
    prop6: [
      {
        // tooltip: '全村人的希望',
        src: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
      },
    ],
    prop7: 0,
    prop8: 2,
    prop9: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
  },
  {
    prop1: 'TradeCode 95',
    prop2: '这是一段描述5',
    prop3: '815万',
    prop4: '关闭',
    prop5: '2025-01-16 12:49:54',
    prop6: [
      {
        // tooltip: 'UserFilled',
        icon: 'UserFilled',
      },
    ],
    prop7: 10,
    prop8: 1,
    prop9: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
  },
]);
function rowClickHandler(row: any, column: any, event: Event) {
  console.log('row, column, event', row, column, event);
}

const toolbarProps: ITableToolbarProps = {
  showTools: true,
};

function cc(text: string): void {
  alert(text);
}

const paginationProps: IPaginationProps = {
  total: data.length + 10,
  alignment: 'center',
};

onMounted(() => {
  console.log('ssdfdfsfsdf');
})
</script>