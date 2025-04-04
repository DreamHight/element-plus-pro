<template>
  <el-card shadow="never">
    <ProDescriptions :descriptionsProps="descriptionsProps1" :list="list1">
      <template #extra>
        <el-button type="primary">主操作</el-button>
      </template>
    </ProDescriptions>

    <el-divider />

    <ProDescriptions :descriptionsProps="descriptionsProps2" :list="list2">
      <template #title>
        <span class="font-bold">用户信息</span>
      </template>

      <template #userName="slotProps">
        <el-space :size="2">
          <el-icon><User /></el-icon>
          <span>{{ slotProps.column.label }}</span>
        </el-space>
      </template>
      <template #mobilePhone>
        <el-space :size="2">
          <el-icon><Bell /></el-icon>
          <span>联系方式</span>
        </el-space>
      </template>
    </ProDescriptions>

    <el-divider />

    <ProDescriptions separator="" :descriptionsProps="descriptionsProps3" :list="list3" />

    <el-divider />

    <h3 style="font-weight: bold; margin-bottom: 15px;">退货商品</h3>
    <ProBasicTable :columns="columns1" :data="tableData1" show-summary :summary-method="getSummaries1" />

    <div style="height: 25px;"></div>

    <h3 style="font-weight: bold; margin-bottom: 15px;">退货进度</h3>
    <ProBasicTable :columns="columns2" :data="tableData2" />
  </el-card>
</template>

<script setup lang="ts">
import { h, reactive, shallowRef, type RendererElement, type RendererNode, type VNode } from 'vue';
import type { IDescriptionItemProps } from '@/components/typings/descriptions';
import ProDescriptions from '@/components/ProDescriptions/index.vue';
import ProBasicTable from '@/components/ProBasicTable/index.vue';
import ProLogo from '@/components/ProLogo/index.vue'
import DarkTheme from '@/components/DarkTheme/DarkTheme.vue';
import { Bell, QuestionFilled, User } from '@element-plus/icons-vue';
import { ElImage, ElTag, type TableColumnCtx } from 'element-plus';
import type { IColumn } from '@/components/typings/table';

const list1 = reactive<IDescriptionItemProps>([
  {
    label: '取货单号',
    prop: 'orderNo',
    value: '1000000000',
  },
  {
    label: '状态',
    prop: 'status',
    value: '已取货',
  },
  {
    label: '销售单号',
    prop: 'saleNo',
    value: '1234123421',
  },
  {
    label: '子订单',
    prop: 'subOrderNo',
    value: '3214321432',
  },
  {
    icon: 'User',
    label: '备注',
    separator: {
      // component: shallowRef(ProLogo),
      // componentProps: {
      //   logoSrc: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      //   title: 'ElementPlusPro',
      // },
      // component: shallowRef(DarkTheme),
      component: shallowRef(QuestionFilled),
      componentType: 'icon',
      componentProps: {
        size: '15px',
        style: 'cursor: help;',
      },
    },
    prop: 'remark',
    // value: '无',
    value: {
      // component: 'ElImage',
      // componentProps: {
      //   src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      // },
      // component: shallowRef(ElImage),
      // componentProps: {
      //   src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      // },
      component: 'ElTag',
      componentProps: {
        type: 'danger',
        content: 'content',
      },
      // component: shallowRef(ElTag),
      // componentProps: {
      //   type: 'danger',
      //   content: 'content',
      // },
    },
  },
]);
const descriptionsProps1 = {
  title: '退款详情',
};

const list2 = reactive<IDescriptionItemProps>([
  {
    labelSlot: 'userName',
    label: '用户姓名',
    prop: 'userName',
    value: '付小小',
  },
  {
    labelSlot: 'mobilePhone',
    label: '联系电话',
    prop: 'mobilePhone',
    value: '18100000000',
  },
  {
    label: '常用快递',
    prop: 'remark1',
    value: '菜鸟仓储',
  },
  {
    label: '取货地址',
    prop: 'address',
    value: '浙江省杭州市西湖区万塘路18号',
  },
  {
    label: '备注',
    prop: 'remark',
    value: '无',
    className: 'my-content',
  },
]);
const descriptionsProps2 = {
  border: true,
};

const list3 = reactive<IDescriptionItemProps>([
  {
    rowspan: '2',
    width: '140',
    align: 'center',
    label: 'Photo',
    prop: 'Photo',
    value: {
      component: 'ElImage',
      componentProps: {
        style: 'width: 100px; height: 100px',
        src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      },
    },
  },
  {
    label: 'Username',
    prop: 'Username',
    value: 'kooriookami',
  },
  {
    label: 'Telephone',
    prop: 'Telephone',
    value: '18100000000',
  },
  {
    label: 'Place',
    prop: 'Place',
    value: 'Suzhou',
  },
  {
    label: 'Remarks',
    prop: 'Remarks',
    value: {
      component: 'ElTag',
      componentProps: {
        size: 'small',
        content: 'School',
      },
    },
  },
  {
    label: 'Address',
    prop: 'Address',
    value: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province',
  },
]);
const descriptionsProps3 = {
  // direction: 'vertical',
  title: '单元格跨行',
  border: true,
};

interface Product {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
  prop5: string;
  prop6: string;
  [key: string]: string;
}
const columns1 = reactive<IColumn[]>([
  {
    prop: 'prop1',
    label: '商品编号',
  },
  {
    prop: 'prop2',
    label: '商品名称',
  },
  {
    prop: 'prop3',
    label: '商品条码',
    columnProps: {
      width: 180,
    },
  },
  {
    prop: 'prop4',
    label: '单价',
  },
  {
    prop: 'prop5',
    label: '数量（件）',
    columnProps: {
      align: 'right',
    },
  },
  {
    prop: 'prop6',
    label: '金额',
    columnProps: {
      align: 'right',
    },
  },
]);
const tableData1 = reactive<Product[]>([
  {
    prop1: '1234561',
    prop2: '矿泉水 550ml',
    prop3: '12421432143214321',
    prop4: '2.00',
    prop5: '1',
    prop6: '2.00',
  },
  {
    prop1: '1234562',
    prop2: '凉茶 300ml',
    prop3: '12421432143214322',
    prop4: '3.00',
    prop5: '2',
    prop6: '6.00',
  },
  {
    prop1: '1234562',
    prop2: '好吃的薯片',
    prop3: '12421432143214323',
    prop4: '7.00',
    prop5: '4',
    prop6: '28.00',
  },
  {
    prop1: '1234562',
    prop2: '特别好吃的蛋卷',
    prop3: '12421432143214324',
    prop4: '8.50',
    prop5: '3',
    prop6: '25.50',
  },
]);
interface SummaryMethodProps<T = Product> {
  columns: TableColumnCtx<T>[];
  data: T[];
}
function getSummaries1(param: SummaryMethodProps): (string | VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>)[] {
  const { columns, data } = param
  const sums: (string | VNode)[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总计';
      // sums[index] = h('div', { style: { textDecoration: 'underline' } }, [
      //   'Total Cost',
      // ])
      return
    }

    if (['prop5', 'prop6'].includes(column.property)) {
      const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => Number.isNaN(value))) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!Number.isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)}`
      } else {
        sums[index] = ''
      }
    }
  })

  return sums;
}

const columns2 = reactive<IColumn[]>([
  {
    prop: 'prop1',
    label: '时间',
  },
  {
    prop: 'prop2',
    label: '当前进度',
  },
  {
    prop: 'prop3',
    label: '状态',
  },
  {
    prop: 'prop4',
    label: '操作员ID',
  },
  {
    prop: 'prop5',
    label: '耗时',
  },
]);
const tableData2 = reactive([
  {
    prop1: '2017-10-01 14:10',
    prop2: '联系客户',
    prop3: '进行中',
    prop4: '取货员 ID1234',
    prop5: '5mins',
  },
  {
    prop1: '2017-10-01 14:05',
    prop2: '取货员出发',
    prop3: '成功',
    prop4: '取货员 ID1234',
    prop5: '1h',
  },
  {
    prop1: '2017-10-01 13:05',
    prop2: '取货员接单',
    prop3: '成功',
    prop4: '取货员 ID1234',
    prop5: '5mins',
  },
  {
    prop1: '2017-10-01 13:00',
    prop2: '申请审批通过',
    prop3: '成功',
    prop4: '系统',
    prop5: '1h',
  },
  {
    prop1: '2017-10-01 12:00',
    prop2: '发起退货申请',
    prop3: '成功',
    prop4: '用户',
    prop5: '5mins',
  },
]);
</script>

<style lang="scss" scoped>
.el-card {
  border: 0;
}

:deep(.my-content) {
  background: var(--el-color-danger-light-9);
}
</style>