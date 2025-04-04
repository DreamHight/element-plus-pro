<template>
  <div>
    <h2 style="font-weight: bold;">基础表单</h2>

    <div style="margin-block: 10px;">
      <el-text>表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</el-text>
    </div>

    <el-card
      shadow="never"
      body-style="min-width: 440px; width: 440px; margin: auto;"
    >
      <QueryFilter
        size="large"
        label-position="top"
        separator=""
        :form-item-data="formItemData"
      >
        <template #suffix="slotProps">
          <span
            v-if="slotProps.column.prop === 'prop7'"
            style="margin-right: 15px;"
          >%</span>
        </template>
      </QueryFilter>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { IFormItemFieldProps } from '@/components/typings/queryFilter';
import QueryFilter from '@/components/QueryFilter/QueryFilter.vue';

const colleagueObj: IFormItemFieldProps = {
  prop: 'colleague',
  label: '',
  fieldProps: {
    componentType: 'select',
    valueEnum: [
      {
        label: '同事甲',
        value: '1',
      },
      {
        label: '同事乙',
        value: '2',
      },
      {
        label: '同事丙',
        value: '3',
      },
    ],
    initialValue: '1',
  },
}
const formItemData = reactive<IFormItemFieldProps[]>([
  {
    prop: 'prop1',
    label: '标题',
    fieldProps: {
      componentProps: {
        placeholder: '给项目起个名字',
      },
    },
  },
  {
    prop: 'prop2',
    label: '起止日期',
    fieldProps: {
      componentType: 'date-picker',
      componentProps: {
        type: 'daterange',
      },
    },
  },
  {
    prop: 'prop3',
    label: '目标描述',
    fieldProps: {
      componentType: 'textarea',
      componentProps: {
        placeholder: '请输入你的阶段性工作目标',
      },
    },
  },
  {
    prop: 'prop4',
    label: '衡量标准',
    fieldProps: {
      componentType: 'textarea',
      componentProps: {
        placeholder: '请输入衡量标准',
      },
    },
  },
  {
    prop: 'prop5',
    label: '客户',
    subLabel: '（选填）',
    fieldProps: {
      componentProps: {
        placeholder: '请描述你服务的客户，内部客户直接 @姓名／工号',
      },
    },
  },
  {
    prop: 'prop6',
    label: '邀评人',
    subLabel: '（选填）',
    fieldProps: {
      componentType: 'mention',
      componentProps: {
        placeholder: '请直接 @姓名／工号，最多可邀请 5 人',
        options: [
          {
            label: 'Fuphoenixes',
            value: 'Fuphoenixes',
          },
          {
            label: 'kooriookami',
            value: 'kooriookami',
          },
          {
            label: 'Jeremy',
            value: 'Jeremy',
          },
          {
            label: 'btea',
            value: 'btea',
          },
        ],
      },
    },
  },
  {
    prop: 'prop7',
    label: '权重',
    subLabel: '（选填）',
    fieldSlot: true,
    fieldProps: {
      componentType: 'input-number',
      componentProps: {
        controlsPosition: 'right',
        min: 0,
      },
      initialValue: 2,
    },
  },
  {
    prop: 'prop8',
    label: '目标公开',
    description: '客户、邀评人默认被分享',
    fieldProps: {
      componentType: 'radio-group',
      componentProps: {
        onChange: showColleague,
      },
      initialValue: 'public',
      valueEnum: [
        {
          label: '公开',
          value: 'public',
        },
        {
          label: '部分公开',
          value: 'partially public',
        },
        {
          label: '不公开',
          value: 'private',
        },
      ],
    },
  },
]);
function showColleague(val: string): void {
  const index: number = formItemData.findIndex(item => item.prop === 'colleague');
  if (val === 'partially public') {
    if (index === -1) {
      formItemData.push({ ...colleagueObj });
    }
  } else {
    if (index > -1) {
      formItemData.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-input-number .el-input__inner) {
  text-align: left;
}
</style>