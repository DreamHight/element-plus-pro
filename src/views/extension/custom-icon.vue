<template>
  <div>
    <h2>自定义图标（{{ data.length }}）</h2>

    <GridBox
      :data="data"
      :body-style="bodyStyle"
      :item-style="itemStyle"
      @col-click="colClickHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, type CSSProperties } from 'vue';
import { ElMessage } from 'element-plus';
import { useClipboard } from '@/components/hooks/use-clipboard';
import GridBox from '@/components/Grid/GridBox.vue';
import IconActionMenu from '@/components/icons/IconActionMenu.vue';
import IconArrowCloseLeft from '@/components/icons/IconArrowCloseLeft.vue';
import IconArrowCloseRight from '@/components/icons/IconArrowCloseRight.vue';
import IconCloseOther from '@/components/icons/IconCloseOther.vue';
import IconCopyright from '@/components/icons/IconCopyright.vue';
import IconCornerLeft from '@/components/icons/IconCornerLeft.vue';
import IconCornerRight from '@/components/icons/IconCornerRight.vue';
import IconDensity from '@/components/icons/IconDensity.vue';
import IconEnter from '@/components/icons/IconEnter.vue';
import IconFixed from '@/components/icons/IconFixed.vue';
import IconFolder from '@/components/icons/IconFolder.vue';
import IconFullScreen from '@/components/icons/IconFullScreen.vue';
import IconExitFullScreen from '@/components/icons/IconExitFullScreen.vue';
import IconCancelFixed from '@/components/icons/IconCancelFixed.vue';
import IconGithub from '@/components/icons/IconGithub.vue';
import IconLanguage from '@/components/icons/IconLanguage.vue';
import IconMaximize from '@/components/icons/IconMaximize.vue';
import IconCancelMaximize from '@/components/icons/IconCancelMaximize.vue';
import IconMoveBottom from '@/components/icons/IconMoveBottom.vue';
import IconMoveCancel from '@/components/icons/IconMoveCancel.vue';
import IconMoveHolder from '@/components/icons/IconMoveHolder.vue';
import IconMoveTop from '@/components/icons/IconMoveTop.vue';
import IconNewWindow from '@/components/icons/IconNewWindow.vue';
import IconSortAZ from '@/components/icons/IconSortAZ.vue';
import IconSortZA from '@/components/icons/IconSortZA.vue';
import type { IGridItem } from '@/components/typings/grid';

const bodyStyle: CSSProperties = {
  marginTop: '20px',
};
const itemStyle: CSSProperties = {
  padding: '24px',
  cursor: 'pointer',
};
const data: IGridItem[] = [
  {
    icon: shallowRef(IconActionMenu),
    name: 'IconActionMenu',
  },
  {
    icon: shallowRef(IconArrowCloseLeft),
    name: 'IconArrowCloseLeft',
  },
  {
    icon: shallowRef(IconArrowCloseRight),
    name: 'IconArrowCloseRight',
  },
  {
    icon: shallowRef(IconCloseOther),
    name: 'IconCloseOther',
  },
  {
    icon: shallowRef(IconCopyright),
    name: 'IconCopyright',
  },
  {
    icon: shallowRef(IconCornerLeft),
    name: 'IconCornerLeft',
  },
  {
    icon: shallowRef(IconCornerRight),
    name: 'IconCornerRight',
  },
  {
    icon: shallowRef(IconDensity),
    name: 'IconDensity',
  },
  {
    icon: shallowRef(IconEnter),
    name: 'IconEnter',
  },
  {
    icon: shallowRef(IconFixed),
    name: 'IconFixed',
  },
  {
    icon: shallowRef(IconFolder),
    name: 'IconFolder',
  },
  {
    icon: shallowRef(IconFullScreen),
    name: 'IconFullScreen',
  },
  {
    icon: shallowRef(IconExitFullScreen),
    name: 'IconExitFullScreen',
  },
  {
    icon: shallowRef(IconCancelFixed),
    name: 'IconCancelFixed',
  },
  {
    icon: shallowRef(IconGithub),
    name: 'IconGithub',
  },
  {
    icon: shallowRef(IconLanguage),
    name: 'IconLanguage',
  },
  {
    icon: shallowRef(IconMaximize),
    name: 'IconMaximize',
  },
  {
    icon: shallowRef(IconCancelMaximize),
    name: 'IconCancelMaximize',
  },
  {
    icon: shallowRef(IconMoveBottom),
    name: 'IconMoveBottom',
  },
  {
    icon: shallowRef(IconMoveCancel),
    name: 'IconMoveCancel',
  },
  {
    icon: shallowRef(IconMoveHolder),
    name: 'IconMoveHolder',
  },
  {
    icon: shallowRef(IconMoveTop),
    name: 'IconMoveTop',
  },
  {
    icon: shallowRef(IconNewWindow),
    name: 'IconNewWindow',
  },
  {
    icon: shallowRef(IconSortAZ),
    name: 'IconSortAZ',
  },
  {
    icon: shallowRef(IconSortZA),
    name: 'IconSortZA',
  },
];

function colClickHandler(item: IGridItem): void {
  const copyText: string = `<el-icon><Icon${item.name} /></el-icon>`;
  const { copy } = useClipboard();
  copy(copyText);
  ElMessage.success('已复制！');
}
</script>