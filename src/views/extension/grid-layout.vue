<template>
  <div>
    <div style="width: 400px;">
      <GridBox
        :data="data1"
        draggable
        @col-click="colClickHandler"
      />
    </div>

    <div style="max-width: 500px; margin-top: 20px;">
      <GridBox
        :data="data2"
        :gutter="10"
        :grid-item-props="{md: 12}"
        body-style="padding: 10px 5px 0;"
        col-style="padding-bottom: 10px;"
      />
    </div>

    <div style="width: 500px; margin-top: 20px;">
      <GridBox :data="data3">
        <template #default="scope">
          <el-button
            v-if="scope.item.name === 'name5'"
            type="primary"
            style="width: 100%;height: 100%;border-radius: 0;"
          >
            开始
          </el-button>
          <span v-else style="text-align: center;">
            自定义内容{{ scope.item.name }}
          </span>
        </template>
      </GridBox>
    </div>
  </div>
</template>

<script setup lang="ts">
import GridBox from '@/components/Grid/GridBox.vue';
import type { IGridItem } from '@/components/typings/grid';

const data1: IGridItem[] = [
  {
    icon: 'Setting',
    name: 'name1',
  },
  {
    icon: 'Setting',
    name: 'name2',
  },
  {
    icon: 'Setting',
    name: 'name3',
  },
  {
    icon: 'Grid',
    name: 'name4',
  },
  {
    icon: 'Grid',
    name: 'name5',
  },
  {
    icon: 'Grid',
    name: 'name6',
  },
];
const data2: IGridItem[] = [
  {
    icon: 'Setting',
    name: 'name1',
  },
  {
    icon: 'Setting',
    name: 'name2',
  },
  {
    icon: 'Setting',
    name: 'name3',
  },
  {
    icon: 'Setting',
    // name: 'name4',
  },
  {
    // icon: 'Setting',
    name: 'name5',
  },
  {
    icon: 'Grid',
    name: 'name6name6name6name6',
    color: 'red',
  },
];
const data3: IGridItem[] = [
  {
    icon: 'Setting',
    name: 'name1',
    // style: {
    //   backgroundColor: 'var(--el-border-color-extra-light)',
    // },
  },
  {
    icon: 'Setting',
    name: 'name2',
  },
  {
    icon: 'Setting',
    name: 'name3',
  },
  {
    icon: 'Setting',
    name: 'name4',
  },
  {
    icon: 'Setting',
    name: 'name5',
    // offset: 8,
    style: {
      padding: '0',
    },
  },
  {
    icon: 'Setting',
    name: 'name6',
  },
  {
    icon: 'Setting',
    name: 'name7',
  },
  {
    icon: 'Setting',
    name: 'name8',
  },
  {
    icon: 'Setting',
    name: 'name9',
  },
];

function colClickHandler(item: IGridItem, index: number): void {
  console.log('item, index', item, index);
}
</script>