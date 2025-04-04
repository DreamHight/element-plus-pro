<template>
  <div>
    <h2 style="font-weight: bold;">标准列表</h2>

    <div style="margin-block: 10px;">
      <el-text>段落示意：Element Plus Pro，用最小的工作量， 提供跨越设计与开发的体验解决方案。</el-text>
    </div>

    <el-card shadow="never" style="margin-top: 20px;">
      <el-space :spacer="spacer" style="width: 100%;">
        <div style="text-align: center;">
          <el-text>我的待办</el-text>
          <h2>8个任务</h2>
        </div>
        <div style="text-align: center;">
          <el-text>本周任务平均处理时间</el-text>
          <h2>32分钟</h2>
        </div>
        <div style="text-align: center;">
          <el-text>本周完成任务数</el-text>
          <h2>24个任务</h2>
        </div>
      </el-space>
    </el-card>

    <el-card shadow="never" style="margin-top: 20px;">
      <ProTable
        :show-header="false"
        :show-operation="true"
        :columns="columns"
        :data="data"
        :toolbar-props="toolbarProps"
        :pagination-props="paginationProps"
      >
        <template #prop1ColumnSlot="slotProps">
          <CardList
            variant="default"
            shadow="never"
            :data="slotProps.row[slotProps.column.property]"
          />
        </template>
        <template #tool>
          <div style="display: inline-flex; align-items: center; justify-content: flex-end;">
            <el-button-group style="margin-left: 15px;">
              <el-button type="primary">全部</el-button>
              <el-button>进行中</el-button>
              <el-button>等待中</el-button>
            </el-button-group>

            <el-input
              v-model="searchValue"
              placeholder="请输入"
              clearable
              style="width: 240px; margin-left: 15px;"
            >
              <template #append>
                <el-button :icon="Search" />
              </template>
            </el-input>
          </div>
        </template>
      </ProTable>
    </el-card>

    <!-- <div style="
      position: fixed;
      inset-inline-end: 0;
      bottom: 0;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: calc(100% - 290px);
      padding-inline: 24px;
      padding-block: 17px;
      box-sizing: border-box;
      line-height: 64px;
      background-color: rgba(255, 255, 255, 0.6);
      border-block-start: 1px solid rgba(5, 5, 5, 0.06);
      backdrop-filter: blur(8px);
      color: rgba(0, 0, 0, 0.88);
      transition: all 0.2s ease 0s;
    ">
      <el-button icon="plus">添加</el-button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { h, reactive, ref, type RendererElement, type RendererNode, type VNode } from 'vue';
import { ElDivider, type TableColumnCtx } from 'element-plus';
import ProTable from '@/components/ProTable/index.vue';
import CardList from '@/components/CardList/CardList.vue';
import type { IColumn } from '@/components/typings/table';
import type { IPaginationProps } from '@/components/typings/pagination';
import type { ICardList } from '@/components/typings/cardList';
import { Search } from '@element-plus/icons-vue';

const spacer = h(ElDivider, { direction: 'vertical' });

const columns: IColumn[] = [
  {
    prop: 'prop1',
    label: '规则名称',
    columnSlotName: 'prop1ColumnSlot',
    columnProps: {
      width: 320,
    },
  },
  {
    prop: 'prop2',
    label: '付款用户',
    columnProps: {
      width: 100,
      align: 'center',
    },
    render: (row: ITableData, column: TableColumnCtx<ITableData>): VNode<RendererNode, RendererElement, {[key: string]: any;}> => {
      return h(
        'div',
        [
          h('div', 'Owner'),
          h('div', row[column.property]),
        ]
      );
    },
  },
  {
    prop: 'prop3',
    label: '开始时间',
    render: (row: ITableData, column: TableColumnCtx<ITableData>): VNode<RendererNode, RendererElement, {[key: string]: any;}> => {
      return h(
        'div',
        [
          h('div', '开始时间'),
          h('div', row[column.property]),
        ]
      );
    },
  },
  {
    prop: 'prop4',
    label: '进度',
    progressSlotProps: {
      format: (percentage: number): string => {
        return percentage + '%';
      },
    },
    renderProgressStatus: (row: ITableData, column: TableColumnCtx<ITableData>, index: number) => {
      if (index % 2 !== 0) {
        return 'exception';
      }
      return '';
    },
  },
];

interface ITableData {
  prop1: ICardList;
  prop2: string;
  prop3: string;
  prop4: string | number;
  [key: string]: any;
}
const data = reactive<ITableData[]>([
  {
    prop1: {
      avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      title: 'Alipay',
      description: '那是一种内在的东西， 他们到达不了，也无法触及的',
    },
    prop2: '付小小',
    prop3: '2025-01-16 12:49:54',
    prop4: 92,
  },
  {
    prop1:  {
      avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      title: 'Angular',
      description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    },
    prop2: '曲丽丽',
    prop3: '2025-01-16 12:49:54',
    prop4: 90,
  },
  {
    prop1: {
      avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      title: 'Ant Design',
      description: '生命就像一盒巧克力，结果往往出人意料',
    },
    prop2: '林东东',
    prop3: '2025-01-16 12:49:54',
    prop4: 84,
  },
  {
    prop1: {
      avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      title: 'Ant Design Pro',
      description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    },
    prop2: '周星星',
    prop3: '2025-01-16 12:49:54',
    prop4: 72,
  },
  {
    prop1: {
      avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      title: 'Bootstrap',
      description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    },
    prop2: '吴加好',
    prop3: '2025-01-16 12:49:54',
    prop4: 82,
  },
]);

const toolbarProps: any = {
  title: '基本列表',
};
const paginationProps: IPaginationProps = {
  total: 5,
};

const searchValue = ref<string>('');
</script>

<style lang="scss" scoped>
.el-card {
  :deep(.el-space__item) {
    width: 100%;
  }
  :deep(.el-divider--vertical) {
    height: 3em;
  }
}
</style>