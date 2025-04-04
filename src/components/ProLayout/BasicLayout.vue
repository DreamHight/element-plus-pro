<template>
  <!-- 混合菜单布局 -->
  <el-container
    v-if="'mix' === variant"
    class="common-layout"
    direction="vertical"
  >
    <ProHeader
      :active-route="activeRoute"
      v-bind="headerProps"
      @action-click="openDrawerAsideMenuHandler"
    />
    <el-container>
      <ProAside
        can-hidden-xs-only
        :max-height="asideMaxHeight"
        :active-route="activeRoute"
        v-bind="asideProps"
        @slide-click="slideClickHandler"
      />
      <el-container direction="vertical">
        <ProTagsView v-bind="tagsViewProps" />
        <ProMain
          :max-height="mainMaxHeight"
          v-bind="mainProps"
        >
          <template v-slot:footer>
            <ProFooter />
          </template>
        </ProMain>
      </el-container>
      <!-- <el-container
        direction="vertical"
      >
        <ProBreadcrumb :menu-tree="asideProps.menuProps.menuTree" />
        <ProMain
          :max-height="asideMaxHeight"
          :menu-tree="asideProps.menuProps.menuTree"
        >
          <template v-slot:footer>
            <ProFooter />
          </template>
        </ProMain>
      </el-container> -->
    </el-container>
  </el-container>

  <!-- 侧边菜单布局 -->
  <el-container
    v-else-if="'side' === variant"
    class="common-layout"
  >
    <ProAside
      can-hidden-xs-only
      :active-route="activeRoute"
      v-bind="asideProps"
      @slide-click="slideClickHandler"
    >
      <template v-slot:top-header>
        <ProLogo
          :collapse="isHeaderCollapse"
          v-bind="logoProps"
        />
      </template>
    </ProAside>
    <el-container direction="vertical">
      <ProHeader
        :active-route="activeRoute"
        v-bind="headerProps"
        @action-click="openDrawerAsideMenuHandler"
      />
      <ProTagsView v-bind="tagsViewProps" />
      <ProMain
        :max-height="mainMaxHeight"
        v-bind="mainProps"
      >
        <template v-slot:footer>
          <ProFooter />
        </template>
      </ProMain>
    </el-container>
  </el-container>

  <!-- 顶部菜单布局 -->
  <el-container
    v-else-if="'top' === variant"
    direction="vertical"
  >
    <ProHeader
      :active-route="activeRoute"
      v-bind="headerProps"
      @action-click="openDrawerAsideMenuHandler"
    />
    <ProBreadcrumb
      v-if="breadcrumbProps.list && breadcrumbProps.list.length"
      @command="breadcrumbCommandHandler"
      v-bind="breadcrumbProps"
    />
    <ProTagsView v-bind="tagsViewProps" />
    <ProMain
      :max-height="mainMaxHeight"
      v-bind="mainProps"
    >
      <template v-slot:footer>
        <ProFooter />
      </template>
    </ProMain>
  </el-container>

  <el-drawer
    v-model="drawerAsideMenuVisible"
    direction="ltr"
    append-to-body
    :with-header="false"
    :size="asideProps.showExtraAside ? 310 : 260"
    style="--el-drawer-padding-primary: 0;"
  >
    <el-container class="h-full">
      <ProAside
        v-if="['mix', 'top'].includes(variant)"
        :active-route="activeRoute"
        v-bind="asideProps"
        @slide-click="slideClickHandler"
      />
      <ProAside
        v-else-if="'side' === variant"
        :active-route="activeRoute"
        v-bind="asideProps"
        @slide-click="slideClickHandler"
      >
        <template v-slot:top-header>
          <ProLogo
            :collapse="isHeaderCollapse"
            v-bind="logoProps"
          />
        </template>
      </ProAside>
    </el-container>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import ProAside from '../ProAside/index.vue';
import ProBreadcrumb from '../ProBreadcrumb/index.vue';
import ProFooter from '../ProFooter/index.vue';
import ProHeader from '../ProHeader/index.vue';
import ProLogo from '../ProLogo/index.vue';
import ProMain from '../ProMain/index.vue';
import ProTagsView from '../ProTagsView/index.vue';
import type { IAsideProps } from '../typings/aside';
import type { IBreadcrumbProps } from '../typings/breadcrumb';
import type { IHeaderProps } from '../typings/header';
import type { ILogoProps } from '../typings/logo';
import type { IMainProps } from '../typings/main';
import type { ITagsViewProps } from '../typings/tagsView';

// defineProps and defineEmits start
const props = defineProps({
  variant: {
    type: String,
    default: 'mix',
    validator: (val: string) => {
      return ['mix', 'side', 'top'].includes(val);
    }
  },

  logoProps: {
    type: Object as PropType<ILogoProps>,
    default: () => ({}),
  },
  headerProps: {
    type: Object as PropType<IHeaderProps>,
    default: () => ({}),
  },
  asideProps: {
    type: Object as PropType<Omit<IAsideProps, 'activeRoute'>>,
    default: () => ({}),
  },
  breadcrumbProps: {
    type: Object as PropType<IBreadcrumbProps>,
    default: () => ({}),
  },
  tagsViewProps: {
    type: Object as PropType<ITagsViewProps>,
    default: () => ({}),
  },
  mainProps: {
    type: Object as PropType<IMainProps>,
    default: () => ({}),
  },

  activeRoute: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['breadcrumb-command']);
// defineProps and defineEmits end

function breadcrumbCommandHandler(collapse: boolean): void {
  emits('breadcrumb-command', collapse);
}

// 侧边菜单布局模式时 ProHeader 组件里的 ProLogo
const isHeaderCollapse = ref<boolean>(false);
function slideClickHandler(collapse: boolean): void {
  isHeaderCollapse.value = collapse;
}
const headerHeight: string = '60px';
const breadcrumbHeight: string = '44px';
const tagsviewbHeight: string = '36px';
const asideMaxHeight = computed(() => {
  const { variant, headerProps, breadcrumbProps, tagsViewProps } = props;
  let headerdMaxHeight: string = '0px',
    breadcrumbMaxHeight: string = '0px',
    tagsviewbMaxHeight: string = '0px';
  if (headerProps.logoProps) {
    headerdMaxHeight = 'side' !== variant ? (headerProps.height || headerHeight) : '0px';
  }
  if (breadcrumbProps.list && breadcrumbProps.list.length) {
    breadcrumbMaxHeight = 'side' !== variant ? (breadcrumbProps.height || breadcrumbHeight) : '0px';
  }
  console.log('dddd', headerdMaxHeight, breadcrumbMaxHeight);

  return `calc(100vh - ${headerdMaxHeight} - ${breadcrumbMaxHeight})`;
});
const mainMaxHeight = computed(() => {
  const { variant, headerProps, breadcrumbProps, tagsViewProps } = props;
  let headerdMaxHeight: string = '0px',
    breadcrumbMaxHeight: string = '0px',
    tagsviewbMaxHeight: string = '0px';
  if (headerProps.logoProps) {
    headerdMaxHeight = 'side' !== variant ? (headerProps.height || headerHeight) : '0px';
  }
  if (breadcrumbProps.list && breadcrumbProps.list.length) {
    breadcrumbMaxHeight = 'side' !== variant ? (breadcrumbProps.height || breadcrumbHeight) : '0px';
  }
  if (Object.keys(tagsViewProps).length) {
    tagsviewbMaxHeight = 'side' !== variant ? tagsviewbHeight : '0px';
  }
  console.log('ddffdd', headerdMaxHeight, breadcrumbMaxHeight, tagsviewbHeight);

  return `calc(100vh - ${headerdMaxHeight} - ${breadcrumbMaxHeight} - ${tagsviewbHeight})`;
});

const drawerAsideMenuVisible = ref<boolean>(false);
function openDrawerAsideMenuHandler() {
  drawerAsideMenuVisible.value = true;
}
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  overflow: hidden;
}
</style>