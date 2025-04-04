<template>
  <div>
    <h2 style="font-weight: bold;">高级表单</h2>

    <div style="margin-block: 10px;">
      <el-text>高级表单常见于一次性输入和提交大批量数据的场景。</el-text>
    </div>

    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>仓库管理</span>
        </div>
      </template>

      <QueryFilter
        label-position="top"
        separator=""
        :inline="true"
        :form-item-data="formItemData1"
        :show-operate="false"
      >
        <!-- <template #prop1Slot>
          <el-tooltip placement="top" content="Top Left prompts info">
            <el-icon><InfoFilled /></el-icon>
          </el-tooltip>
        </template> -->
        <template #prepend="slotProps">
          <div v-if="slotProps.column.prop === 'prop2'">http://</div>
        </template>
        <template #append="slotProps">
          <div v-if="slotProps.column.prop === 'prop2'">.com</div>
        </template>
        <template #range-separator="slotProps">
          <div v-if="slotProps.column.prop === 'prop5'">至</div>
        </template>
      </QueryFilter>
    </el-card>

    <div style="height: 20px;"></div>

    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>任务管理</span>
        </div>
      </template>

      <QueryFilter
        label-position="top"
        separator=""
        :inline="true"
        :form-item-data="formItemData2"
        :show-operate="false"
      />
    </el-card>

    <div style="height: 20px;"></div>

    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>成员管理</span>
        </div>
      </template>

      <ProBasicTable :columns="columns" :data="tableData" />

      <el-button style="width: 100%; margin-top: 10px;" @click="onAddItem">
        Add Item
      </el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { IFormItemFieldProps } from '@/components/typings/queryFilter';
import QueryFilter from '@/components/QueryFilter/QueryFilter.vue';
import ProBasicTable from '@/components/ProBasicTable/index.vue';
import type { IColumn } from '@/components/typings/table';

const formItemData1 = reactive<IFormItemFieldProps[]>([
  {
    prop: 'prop1',
    label: '仓库名',
    // subLabelSlot: 'prop1Slot',
    // fieldSlot: true,
    // formItemProps: {
    //   required: true,
    // },
    // fieldProps: {
    //   componentProps: {
    //     placeholder: '给项目起个名字',
    //   },
    // },
  },
  {
    prop: 'prop2',
    label: '仓库域名',
    fieldSlot: true,
  },
  {
    prop: 'prop3',
    label: '仓库管理员',
    fieldProps: {
      componentType: 'select',
      valueEnum: [
        {
          label: '付晓晓',
          value: '付晓晓',
        },
        {
          label: '周毛毛',
          value: '周毛毛',
        },
      ],
    },
  },
  {
    prop: 'prop4',
    label: '审批人',
    fieldProps: {
      componentType: 'select',
      valueEnum: [
        {
          label: '付晓晓',
          value: '付晓晓',
        },
        {
          label: '周毛毛',
          value: '周毛毛',
        },
      ],
    },
  },
  {
    prop: 'prop5',
    label: '生效日期',
    fieldSlot: true,
    fieldProps: {
      componentType: 'date-picker',
      componentProps: {
        type: 'datetimerange',
      },
    },
  },
  {
    prop: 'prop6',
    label: '仓库类型',
    fieldProps: {
      componentType: 'select',
      valueEnum: [
        {
          label: '私密',
          value: '私密',
        },
        {
          label: '公开',
          value: '公开',
        },
      ],
    },
  },
  /*{
    prop: 'prop8',
    label: '目标公开',
    description: '客户、邀评人默认被分享',
    fieldProps: {
      // componentType: 'color-picker',
      // componentProps: {
      //   showAlpha: true,
      // },

      // componentType: 'password',

      // componentType: 'date-picker',
      // componentProps: {
      //   type: 'datetimerange',
      // },
      // componentProps: {
      //   type: 'datetime',
      //   valueFormat: 'YYYY/MM/DD HH:mm:ss',
      // },

      // componentType: 'time-picker',
      // componentProps: {
      //   valueFormat: 'HH:mm:ss',
      // },

      // componentType: 'time-select',
      // componentProps: {
      //   start: '08:30',
      //   step: '00:15',
      //   end: '18:30',
      // },

      // componentType: 'switch',
      // componentProps: {
      //   activeText: 'Open',
      //   inactiveText: 'Close',
      // },

      // componentType: 'slider',
      // componentProps: {
      //   step: 10,
      //   showStops: true,
      // },
      // initialValue: 3,

      // componentType: 'rate',
      // componentProps: {
      //   showScore: true,
      //   textColor: '#ff9900',
      //   scoreTemplate: '{value} points',
      // },
      // initialValue: 3.7,

      // componentType: 'input-tag',

      // componentType: 'autocomplete',
      // componentProps: {
      //   fetchSuggestions: [
      //     { value: 'vue', link: 'https://github.com/vuejs/vue' },
      //     { value: 'element', link: 'https://github.com/ElemeFE/element' },
      //     { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
      //     { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
      //     { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
      //     { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
      //     { value: 'babel', link: 'https://github.com/babel/babel' },
      //   ],
      // },

      // componentType: 'mention',
      // componentProps: {
      //   options: [
      //     {
      //       label: 'Fuphoenixes',
      //       value: 'Fuphoenixes',
      //     },
      //     {
      //       label: 'kooriookami',
      //       value: 'kooriookami',
      //     },
      //     {
      //       label: 'Jeremy',
      //       value: 'Jeremy',
      //     },
      //     {
      //       label: 'btea',
      //       value: 'btea',
      //     },
      //   ],
      // },
      // initialValue: '@',

      // componentType: 'checkbox',
      // componentProps: {
      //   label: 'Option 1',
      // },

      // componentType: 'checkbox-group',
      // componentProps: {
      //   size: 'large',
      // },
      // initialValue: [],
      // valueEnum: [
      //   {
      //     label: '上海',
      //     value: 'Shanghai',
      //     border: true,
      //   },
      //   {
      //     label: '北京',
      //     value: 'Beijing',
      //     border: true,
      //   },
      //   {
      //     label: '深圳',
      //     value: 'Shenzhen',
      //     border: true,
      //   },
      // ],

      // componentType: 'radio',
      // componentProps: {
      //   label: 'Option B',
      //   value: '1',
      //   onChange: (v: any) => {
      //     console.log('000vvv', v);
      //   },
      // },
      // initialValue: '2',

      // componentType: 'cascader',
      // componentProps: {
      //   options: [
      //     {
      //       value: 'guide',
      //       label: 'Guide',
      //       children: [
      //         {
      //           value: 'disciplines',
      //           label: 'Disciplines',
      //           children: [
      //             {
      //               value: 'consistency',
      //               label: 'Consistency',
      //             },
      //             {
      //               value: 'feedback',
      //               label: 'Feedback',
      //             },
      //             {
      //               value: 'efficiency',
      //               label: 'Efficiency',
      //             },
      //             {
      //               value: 'controllability',
      //               label: 'Controllability',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'navigation',
      //           label: 'Navigation',
      //           children: [
      //             {
      //               value: 'side nav',
      //               label: 'Side Navigation',
      //             },
      //             {
      //               value: 'top nav',
      //               label: 'Top Navigation',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       value: 'component',
      //       label: 'Component',
      //       children: [
      //         {
      //           value: 'basic',
      //           label: 'Basic',
      //           children: [
      //             {
      //               value: 'layout',
      //               label: 'Layout',
      //             },
      //             {
      //               value: 'color',
      //               label: 'Color',
      //             },
      //             {
      //               value: 'typography',
      //               label: 'Typography',
      //             },
      //             {
      //               value: 'icon',
      //               label: 'Icon',
      //             },
      //             {
      //               value: 'button',
      //               label: 'Button',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'form',
      //           label: 'Form',
      //           children: [
      //             {
      //               value: 'radio',
      //               label: 'Radio',
      //             },
      //             {
      //               value: 'checkbox',
      //               label: 'Checkbox',
      //             },
      //             {
      //               value: 'input',
      //               label: 'Input',
      //             },
      //             {
      //               value: 'input-number',
      //               label: 'InputNumber',
      //             },
      //             {
      //               value: 'select',
      //               label: 'Select',
      //             },
      //             {
      //               value: 'cascader',
      //               label: 'Cascader',
      //             },
      //             {
      //               value: 'switch',
      //               label: 'Switch',
      //             },
      //             {
      //               value: 'slider',
      //               label: 'Slider',
      //             },
      //             {
      //               value: 'time-picker',
      //               label: 'TimePicker',
      //             },
      //             {
      //               value: 'date-picker',
      //               label: 'DatePicker',
      //             },
      //             {
      //               value: 'datetime-picker',
      //               label: 'DateTimePicker',
      //             },
      //             {
      //               value: 'upload',
      //               label: 'Upload',
      //             },
      //             {
      //               value: 'rate',
      //               label: 'Rate',
      //             },
      //             {
      //               value: 'form',
      //               label: 'Form',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'data',
      //           label: 'Data',
      //           children: [
      //             {
      //               value: 'table',
      //               label: 'Table',
      //             },
      //             {
      //               value: 'tag',
      //               label: 'Tag',
      //             },
      //             {
      //               value: 'progress',
      //               label: 'Progress',
      //             },
      //             {
      //               value: 'tree',
      //               label: 'Tree',
      //             },
      //             {
      //               value: 'pagination',
      //               label: 'Pagination',
      //             },
      //             {
      //               value: 'badge',
      //               label: 'Badge',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'notice',
      //           label: 'Notice',
      //           children: [
      //             {
      //               value: 'alert',
      //               label: 'Alert',
      //             },
      //             {
      //               value: 'loading',
      //               label: 'Loading',
      //             },
      //             {
      //               value: 'message',
      //               label: 'Message',
      //             },
      //             {
      //               value: 'message-box',
      //               label: 'MessageBox',
      //             },
      //             {
      //               value: 'notification',
      //               label: 'Notification',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'navigation',
      //           label: 'Navigation',
      //           children: [
      //             {
      //               value: 'menu',
      //               label: 'Menu',
      //             },
      //             {
      //               value: 'tabs',
      //               label: 'Tabs',
      //             },
      //             {
      //               value: 'breadcrumb',
      //               label: 'Breadcrumb',
      //             },
      //             {
      //               value: 'dropdown',
      //               label: 'Dropdown',
      //             },
      //             {
      //               value: 'steps',
      //               label: 'Steps',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'others',
      //           label: 'Others',
      //           children: [
      //             {
      //               value: 'dialog',
      //               label: 'Dialog',
      //             },
      //             {
      //               value: 'tooltip',
      //               label: 'Tooltip',
      //             },
      //             {
      //               value: 'popover',
      //               label: 'Popover',
      //             },
      //             {
      //               value: 'card',
      //               label: 'Card',
      //             },
      //             {
      //               value: 'carousel',
      //               label: 'Carousel',
      //             },
      //             {
      //               value: 'collapse',
      //               label: 'Collapse',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       value: 'resource',
      //       label: 'Resource',
      //       children: [
      //         {
      //           value: 'axure',
      //           label: 'Axure Components',
      //         },
      //         {
      //           value: 'sketch',
      //           label: 'Sketch Templates',
      //         },
      //         {
      //           value: 'docs',
      //           label: 'Design Documentation',
      //         },
      //       ],
      //     },
      //   ],
      // },

      // componentType: 'cascader-panel',
      // componentProps: {
      //   options: [
      //     {
      //       value: 'guide',
      //       label: 'Guide',
      //       children: [
      //         {
      //           value: 'disciplines',
      //           label: 'Disciplines',
      //           children: [
      //             {
      //               value: 'consistency',
      //               label: 'Consistency',
      //             },
      //             {
      //               value: 'feedback',
      //               label: 'Feedback',
      //             },
      //             {
      //               value: 'efficiency',
      //               label: 'Efficiency',
      //             },
      //             {
      //               value: 'controllability',
      //               label: 'Controllability',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'navigation',
      //           label: 'Navigation',
      //           children: [
      //             {
      //               value: 'side nav',
      //               label: 'Side Navigation',
      //             },
      //             {
      //               value: 'top nav',
      //               label: 'Top Navigation',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       value: 'component',
      //       label: 'Component',
      //       children: [
      //         {
      //           value: 'basic',
      //           label: 'Basic',
      //           children: [
      //             {
      //               value: 'layout',
      //               label: 'Layout',
      //             },
      //             {
      //               value: 'color',
      //               label: 'Color',
      //             },
      //             {
      //               value: 'typography',
      //               label: 'Typography',
      //             },
      //             {
      //               value: 'icon',
      //               label: 'Icon',
      //             },
      //             {
      //               value: 'button',
      //               label: 'Button',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'form',
      //           label: 'Form',
      //           children: [
      //             {
      //               value: 'radio',
      //               label: 'Radio',
      //             },
      //             {
      //               value: 'checkbox',
      //               label: 'Checkbox',
      //             },
      //             {
      //               value: 'input',
      //               label: 'Input',
      //             },
      //             {
      //               value: 'input-number',
      //               label: 'InputNumber',
      //             },
      //             {
      //               value: 'select',
      //               label: 'Select',
      //             },
      //             {
      //               value: 'cascader',
      //               label: 'Cascader',
      //             },
      //             {
      //               value: 'switch',
      //               label: 'Switch',
      //             },
      //             {
      //               value: 'slider',
      //               label: 'Slider',
      //             },
      //             {
      //               value: 'time-picker',
      //               label: 'TimePicker',
      //             },
      //             {
      //               value: 'date-picker',
      //               label: 'DatePicker',
      //             },
      //             {
      //               value: 'datetime-picker',
      //               label: 'DateTimePicker',
      //             },
      //             {
      //               value: 'upload',
      //               label: 'Upload',
      //             },
      //             {
      //               value: 'rate',
      //               label: 'Rate',
      //             },
      //             {
      //               value: 'form',
      //               label: 'Form',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'data',
      //           label: 'Data',
      //           children: [
      //             {
      //               value: 'table',
      //               label: 'Table',
      //             },
      //             {
      //               value: 'tag',
      //               label: 'Tag',
      //             },
      //             {
      //               value: 'progress',
      //               label: 'Progress',
      //             },
      //             {
      //               value: 'tree',
      //               label: 'Tree',
      //             },
      //             {
      //               value: 'pagination',
      //               label: 'Pagination',
      //             },
      //             {
      //               value: 'badge',
      //               label: 'Badge',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'notice',
      //           label: 'Notice',
      //           children: [
      //             {
      //               value: 'alert',
      //               label: 'Alert',
      //             },
      //             {
      //               value: 'loading',
      //               label: 'Loading',
      //             },
      //             {
      //               value: 'message',
      //               label: 'Message',
      //             },
      //             {
      //               value: 'message-box',
      //               label: 'MessageBox',
      //             },
      //             {
      //               value: 'notification',
      //               label: 'Notification',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'navigation',
      //           label: 'Navigation',
      //           children: [
      //             {
      //               value: 'menu',
      //               label: 'Menu',
      //             },
      //             {
      //               value: 'tabs',
      //               label: 'Tabs',
      //             },
      //             {
      //               value: 'breadcrumb',
      //               label: 'Breadcrumb',
      //             },
      //             {
      //               value: 'dropdown',
      //               label: 'Dropdown',
      //             },
      //             {
      //               value: 'steps',
      //               label: 'Steps',
      //             },
      //           ],
      //         },
      //         {
      //           value: 'others',
      //           label: 'Others',
      //           children: [
      //             {
      //               value: 'dialog',
      //               label: 'Dialog',
      //             },
      //             {
      //               value: 'tooltip',
      //               label: 'Tooltip',
      //             },
      //             {
      //               value: 'popover',
      //               label: 'Popover',
      //             },
      //             {
      //               value: 'card',
      //               label: 'Card',
      //             },
      //             {
      //               value: 'carousel',
      //               label: 'Carousel',
      //             },
      //             {
      //               value: 'collapse',
      //               label: 'Collapse',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       value: 'resource',
      //       label: 'Resource',
      //       children: [
      //         {
      //           value: 'axure',
      //           label: 'Axure Components',
      //         },
      //         {
      //           value: 'sketch',
      //           label: 'Sketch Templates',
      //         },
      //         {
      //           value: 'docs',
      //           label: 'Design Documentation',
      //         },
      //       ],
      //     },
      //   ],
      // },

      // componentType: 'select-v2',
      // componentProps: {
      //   multiple: true,
      //   options: [
      //     {
      //       value: '#E63415',
      //       label: 'red',
      //     },
      //     {
      //       value: '#FF6600',
      //       label: 'orange',
      //     },
      //     {
      //       value: '#FFDE0A',
      //       label: 'yellow',
      //     },
      //     {
      //       value: '#1EC79D',
      //       label: 'green',
      //     },
      //   ],
      // },

      // componentType: 'tree-select',
      // componentProps: {
      //   showCheckbox: true,
      //   data: [
      //     {
      //       value: '1',
      //       label: 'Level one 1',
      //       children: [
      //         {
      //           value: '1-1',
      //           label: 'Level two 1-1',
      //           children: [
      //             {
      //               value: '1-1-1',
      //               label: 'Level three 1-1-1',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       value: '2',
      //       label: 'Level one 2',
      //       children: [
      //         {
      //           value: '2-1',
      //           label: 'Level two 2-1',
      //           children: [
      //             {
      //               value: '2-1-1',
      //               label: 'Level three 2-1-1',
      //             },
      //           ],
      //         },
      //         {
      //           value: '2-2',
      //           label: 'Level two 2-2',
      //           children: [
      //             {
      //               value: '2-2-1',
      //               label: 'Level three 2-2-1',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       value: '3',
      //       label: 'Level one 3',
      //       children: [
      //         {
      //           value: '3-1',
      //           label: 'Level two 3-1',
      //           children: [
      //             {
      //               value: '3-1-1',
      //               label: 'Level three 3-1-1',
      //             },
      //           ],
      //         },
      //         {
      //           value: '3-2',
      //           label: 'Level two 3-2',
      //           children: [
      //             {
      //               value: '3-2-1',
      //               label: 'Level three 3-2-1',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },

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
  },*/
]);

const formItemData2 = reactive<IFormItemFieldProps[]>([
  {
    prop: 'prop1',
    label: '任务名',
  },
  {
    prop: 'prop2',
    label: '任务描述',
  },
  {
    prop: 'prop3',
    label: '执行人',
    fieldProps: {
      componentType: 'select',
      valueEnum: [
        {
          label: '付晓晓',
          value: '付晓晓',
        },
        {
          label: '周毛毛',
          value: '周毛毛',
        },
      ],
    },
  },
  {
    prop: 'prop4',
    label: '责任人',
    fieldProps: {
      componentType: 'select',
      valueEnum: [
        {
          label: '付晓晓',
          value: '付晓晓',
        },
        {
          label: '周毛毛',
          value: '周毛毛',
        },
      ],
    },
  },
  {
    prop: 'prop5',
    label: '生效日期',
    fieldProps: {
      componentType: 'time-picker',
    },
  },
  {
    prop: 'prop6',
    label: '任务类型',
    fieldProps: {
      componentType: 'select',
      valueEnum: [
        {
          label: '私密',
          value: '私密',
        },
        {
          label: '公开',
          value: '公开',
        },
      ],
    },
  },
]);

const columns = reactive<IColumn[]>([
  {
    prop: 'prop1',
    label: '成员姓名',
  },
  {
    prop: 'prop2',
    label: '工号',
  },
  {
    prop: 'prop3',
    label: '所属部门',
  },
]);
const tableData = ref([
  {
    prop1: 'Tom',
    prop2: 'California',
    prop3: 'Los Angeles',
  },
  {
    prop1: 'Tom',
    prop2: 'California',
    prop3: 'Los Angeles',
  },
  {
    prop1: 'Tom',
    prop2: 'California',
    prop3: 'Los Angeles',
  },
]);
function onAddItem(): void {
  tableData.value.push({
    prop1: 'Tom',
    prop2: 'California',
    prop3: 'Los Angeles',
  });
}
</script>