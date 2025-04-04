<template>
  <el-card shadow="never">
    <div>
      <p>CardList：</p>
      <CardList :data="data1" />
    </div>

    <div>
      <p>CardList的shadow="never"：</p>
      <CardList :data="data1" shadow="never" />
    </div>

    <div>
      <p>CardList的hover时不改变title的颜色：</p>
      <CardList :data="data1" shadow="never" :is-hover="false" />
    </div>

    <div>
      <p>CardList的default样式：</p>
      <CardList :data="data1" variant="default" />
    </div>

    <div>
      <p>CardList带操作栏：</p>
      <CardList :data="data2" @operate-click="operateClickHandler" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import CardList from '@/components/CardList/CardList.vue';
import type { ICardList, IOperation } from '@/components/typings/cardList';

const data1: ICardList = {
  avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
  title: 'Vue',
  description: '那是一种内在的东西， 他们到达不了，也无法触及的',
};
const data2: ICardList = {
  avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
  title: 'Vue',
  description: '那是一种内在的东西， 他们到达不了，也无法触及的',
  operations: [
    {
      name: '操作一',
      icon: 'UserFilled',
    },
    {
      name: '操作二',
      icon: 'Promotion',
    },
  ],
};
function operateClickHandler(item: IOperation, index: number): void {
  console.log('operate-click', item, index);
}
</script>