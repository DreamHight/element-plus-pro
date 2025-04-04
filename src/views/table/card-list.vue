<template>
  <div>
    <h2 style="font-weight: bold;">卡片列表</h2>

    <div style="margin-block: 10px;">
      <el-text>段落示意：Element Plus Pro，用最小的工作量，提供跨越设计与开发的体验解决方案。</el-text>
    </div>

    <el-space :size="30" style="margin-top: 10px;">
      <el-text type="primary" style="cursor: pointer;">
        <el-icon size="20" style="margin-right: 4px;"><Promotion /></el-icon>
        <span style="vertical-align: top;">快速开始</span>
      </el-text>
      <el-text type="primary" style="cursor: pointer;">
        <el-icon size="20" style="margin-right: 4px;"><InfoFilled /></el-icon>
        <span style="vertical-align: top;">产品简介</span>
      </el-text>
      <el-text type="primary" style="cursor: pointer;">
        <el-icon size="20" style="margin-right: 4px;"><Document /></el-icon>
        <span style="vertical-align: top;">产品文档</span>
      </el-text>
    </el-space>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <CardList showAdd @add="addNew" />
      </el-col>
      <el-col
        v-for="(item, index) in data"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="6"
      >
        <CardList :data="item" @operate-click="operateClickHandler" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CardList from '@/components/CardList/CardList.vue';
import type { ICardList, IOperation } from '@/components/typings/cardList';

const data: ICardList[] = [
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    title: 'Alipay',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
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
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    title: 'Angular',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    operations: [
      {
        name: '分享',
      },
      {
        name: '点赞',
      },
      {
        name: '收藏',
      },
      {
        name: '收藏2',
      },
      {
        name: '收藏3',
      },
    ],
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    title: 'Ant Design',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    operations: [
      {
        name: '操作一',
      },
      {
        name: '操作二',
      },
    ],
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    title: 'Ant Design Pro',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    operations: [
      {
        name: '操作一',
      },
      {
        name: '操作二',
      },
    ],
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    title: 'Bootstrap',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    operations: [
      {
        name: '操作一',
      },
      {
        name: '操作二',
      },
    ],
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
    title: 'React',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    operations: [
      {
        name: '操作一',
      },
      {
        name: '操作二',
      },
    ],
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
    title: 'Vue',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    operations: [
      {
        name: '操作一',
      },
      {
        name: '操作二',
      },
    ],
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
    title: 'Webpack',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    operations: [
      {
        name: '操作一',
      },
      {
        name: '操作二',
      },
    ],
  },
];
function addNew() {
  console.log('addNew');
}
function operateClickHandler(item: IOperation, index: number): void {
  console.log('operate-click', item, index);
}
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
.el-col:last-child {
  margin-bottom: 0;
}
</style>