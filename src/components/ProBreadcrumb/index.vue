<template>
  <el-space
    class="flex-shrink-0 py-10px px-20px"
    :class="[
      { 'border-block-end': showBottomBorder }
    ]"
    :style="[
      {
        backgroundColor: 'var(--el-bg-color)',
      },
      breadcrumbStyles,
    ]"
  >
    <el-dropdown
      v-if="showHistory"
      @command="commandHandler"
    >
      <el-button type="primary" icon="Clock" size="small" circle />
      <template #dropdown>
        <el-dropdown-menu>
          <div
            :style="{
              maxHeight: maxHeight,
              overflow: 'auto',
            }"
          >
            <el-dropdown-item
              v-for="item in historyListMix"
              :key="item.to"
              :command="item"
              :style="item.to === currentRoute ? activeStyles : {}"
            >
              <el-icon v-if="item.icon">
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </el-dropdown-item>
          </div>
          <el-dropdown-item
            v-if="historyListMix.length > 0"
            divided
            style="justify-content: center;"
          >清空</el-dropdown-item>
        </el-dropdown-menu>
        <el-empty
          v-if="historyListMix.length === 0"
          style="padding: 10px 20px;"
          description="没有历史记录"
          :image-size="60"
        />
      </template>
    </el-dropdown>

    <el-breadcrumb v-bind="breadcrumbProps" style="line-height: 1.2;">
      <el-breadcrumb-item
        v-for="item in list"
        :key="item.to"
        :to="item.to"
        :replace="!!item.replace"
      >
        <el-dropdown
          v-if="item.children && item.children.length"
          class="cursor-pointer"
          @command="commandHandler"
        >
          <el-space :size="2">
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span class="font-bold">{{ item.title }}</span>
          </el-space>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(child, idx) in item.children"
                :key="idx"
                :command="child"
                :disabled="child.disabled"
                :style="child.to === currentRoute ? activeStyles : {}"
              >
                <el-icon v-if="child.icon">
                  <component :is="child.icon" />
                </el-icon>
                <span>{{ child.title }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-space v-else :size="2">
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
        </el-space>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-space>
</template>

<script setup lang="ts">
import { reactive, ref, watch, type CSSProperties, type PropType } from 'vue';
import type { BreadcrumbProps } from 'element-plus';
import type { IBreadcrumbItem } from '../typings/breadcrumb';
import type { IMenuItem } from '../typings/menu';
import { recursionMenuTreeToMenuList } from '../MenuSearch';

// defineProps and defineEmits start
const props = defineProps({
  height: {
    type: String,
    default: '44px',
  },
  showBottomBorder: {
    type: Boolean,
  },
  breadcrumbStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },

  showHistory: {
    type: Boolean,
  },
  historyList: {
    type: Array as () => IBreadcrumbItem[],
    default: () => [],
  },
  maxHeight: {
    type: String,
    default: '256px',
  },
  menuTree: {
    type: Array as () => IMenuItem[],
    default: () => [],
  },

  activeRoute: {
    type: String,
    default: '',
  },
  list: {
    type: Array as () => IBreadcrumbItem[],
    default: () => [],
  },

  breadcrumbProps: {
    type: Object as PropType<BreadcrumbProps>,
    default: () => ({}),
  },
});
const emits = defineEmits(['command']);
// defineProps and defineEmits end

const activeStyles: CSSProperties = {
  color: 'var(--el-dropdown-menuItem-hover-color)',
  backgroundColor: 'var(--el-dropdown-menuItem-hover-fill)',
}

const currentRoute = ref<string>('');
function commandHandler(item: IBreadcrumbItem): void {
  if (!item.to) {
    historyListMix.length = 0;
    return;
  }

  currentRoute.value = item.to as string;

  emits('command', item);
}

const historyListMix = reactive<IBreadcrumbItem[]>([ ...props.historyList ]);
function setHistoryRoute(currentRoute: string): void {
  const idx: number = historyListMix.findIndex(obj => obj.to === currentRoute);
  if (idx === -1) {
    const menuToList: IMenuItem[] = recursionMenuTreeToMenuList(props.menuTree);
    const findMenuItem: IMenuItem | undefined = menuToList.find(item => item.index === currentRoute);
    if (findMenuItem) {
      historyListMix.unshift({
        title: findMenuItem.title,
        to: findMenuItem.index,
        icon: findMenuItem.icon,
      });
    }
  }
}

// watch start
watch(
  () => props.activeRoute,
  (newVal) => {
    currentRoute.value = newVal;
    setHistoryRoute(newVal);
  },
  {
    deep: true,
    immediate: true,
  }
);
// watch end
</script>