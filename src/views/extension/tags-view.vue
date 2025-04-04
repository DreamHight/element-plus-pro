<template>
  <el-card shadow="never">
    <div>
      <p>TagsView默认：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" />
    </div>

    <div>
      <p>TagsView的variant="light-tag"：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" variant="light-tag" />
    </div>

    <div>
      <p>TagsView的variant="check-tag"：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" variant="check-tag" />
    </div>

    <div>
      <p>TagsView的variant="button-plain"：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" variant="button-plain" />
    </div>

    <div>
      <p>TagsView的variant="border-bottom"：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" :space="0" variant="border-bottom" />
    </div>

    <div>
      <p>TagsView的variant="chrome-tag"：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" variant="chrome-tag" />
    </div>

    <div>
      <p>TagsView的variant="safari-tag"：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" :space="0" variant="safari-tag" />
    </div>

    <div>
      <p>TagsView的variant="safari-tag"：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" :space="0" :shadow="true" variant="safari-tag" />
    </div>

    <div>
      <p>TagsView的variant="safari-tag"无icon：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" :space="0" :show-icon="false" variant="safari-tag" />
    </div>

    <div>
      <p>TagsView的variant="safari-tag"拉伸：</p>
      <ProTagsView :list="list" :activeRoute="activeRoute" :space="0" :stretch="true" variant="safari-tag" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import ProTagsView from '@/components/ProTagsView/index.vue';
import type { IMenuItem } from '@/components/typings/menu';
import globalSetting from '@/global';

const list: IMenuItem[] = [
  {
    id: '8',
    parentId: null,
    index: globalSetting.homePath,
    title: '首页',
    icon: 'House',
  },
  {
    id: '138',
    parentId: '13',
    index: '/extension/tags-view',
    title: 'TagsView',
  },
];
const activeRoute: string = '/extension/tags-view';
</script>