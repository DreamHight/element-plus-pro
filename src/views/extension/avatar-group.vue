<template>
  <el-card shadow="never">
    <div style="background-color: var(--el-bg-color-page); padding: 10px;">
      <p>头像组组件：</p>
      <AvatarGroup :avatarGroup="avatarGroup" />
    </div>

    <div style="background-color: var(--el-bg-color-page); padding: 10px;">
      <p>头像组组件的尺寸large：</p>
      <AvatarGroup :avatarGroup="avatarGroup" size="large" />
    </div>

    <div style="background-color: var(--el-bg-color-page); padding: 10px;">
      <p>头像组组件的尺寸small：</p>
      <AvatarGroup :avatarGroup="avatarGroup" size="small" />
    </div>

    <div style="background-color: var(--el-bg-color-page); padding: 10px;">
      <p>头像组组件的形状：</p>
      <AvatarGroup :avatarGroup="avatarGroup" shape="square" />
    </div>

    <div style="background-color: var(--el-bg-color-page); padding: 10px;">
      <p>头像组组件自动展开：</p>
      <AvatarGroup :avatarGroup="avatarGroup" :auto-expand="true" />
    </div>

    <div style="background-color: var(--el-bg-color-page); padding: 10px;">
      <p>头像组组件最大显示数量：</p>
      <AvatarGroup :avatarGroup="avatarGroup" :max="3" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import AvatarGroup from '@/components/AvatarGroup/AvatarGroup.vue';
import type { IAvatarGroup } from '@/components/typings/avatarGroup';

const avatarGroup: IAvatarGroup[] = [
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
];
</script>