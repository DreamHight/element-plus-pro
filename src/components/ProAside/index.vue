<template>
  <el-aside
    v-if="showExtraAside"
    width="50px"
    class="flex-col flex-between text-align bg-white border-inline-end"
    :class="[
      { 'hidden-xs-only': canHiddenXsOnly }
    ]"
    :style="{
      maxHeight: maxHeight,
      paddingBlock: '8px',
    }"
  >
    <div class="app-list">
      <slot name="app-list">
        <el-space direction="vertical">
          <a
            v-for="(item, index) in appList"
            :key="index"
            :href="item.href"
            target="_blank"
            @click="appListClickHandler(item)"
          >
            <el-tooltip
              v-if="item.tooltip"
              placement="right"
              :content="item.tooltip"
            >
              <el-space direction="vertical" :size="2">
                <el-icon v-if="item.icon" size="20" v-bind="item">
                  <component :is="item.icon" />
                </el-icon>
                <el-avatar v-else shape="square" :size="32" v-bind="item" />
                <el-text type="info">{{ item.name }}</el-text>
              </el-space>
            </el-tooltip>
            <el-avatar v-else shape="square" :size="32" v-bind="item" />
          </a>
        </el-space>
      </slot>
    </div>

    <div class="system-list">
      <slot name="system-list">
        <el-space direction="vertical">
          <template
            v-for="(item, index) in systemList"
            :key="index"
          >
            <el-tooltip
              v-if="item.tooltip"
              placement="right"
              :content="item.tooltip"
            >
              <el-icon
                v-if="item.icon"
                class="system-icon cursor-pointer"
                @click="systemListClickHandler(item)"
              >
                <component :is="item.icon" />
              </el-icon>
            </el-tooltip>
            <el-icon
              v-else-if="item.icon"
              class="system-icon cursor-pointer"
              @click="systemListClickHandler(item)"
            >
              <component :is="item.icon" />
            </el-icon>
          </template>
        </el-space>
      </slot>
    </div>
  </el-aside>

  <div
    ref="asideRef"
    :class="[
      { 'aside-box': isCollapse, 'hidden-xs-only': canHiddenXsOnly },
      'flex-shrink-0 flex flex-col relative bg-white border-inline-end-rgba',
    ]"
    :style="{
      maxHeight: maxHeight,
    }"
  >
    <slot name="top-header"></slot>
    <slot name="top">
      <AsideTop
        v-if="showAsideTop"
        :collapse="isCollapse"
        @command="asideTopCommandHandler"
        v-bind="asideTopProps"
      />
    </slot>

    <el-aside
      :width="asideWidth"
      class="flex-1 pt-10px"
    >
      <slot name="header"></slot>
      <ProMenu
        :collapse="isCollapse"
        v-bind="menuProps"
        :default-active="activeRoute"
      />
      <slot name="footer"></slot>
    </el-aside>

    <slot name="bottom">
      <AsideBottom
        v-if="showAsideBottom"
        :collapse="isCollapse"
        @command="asideBottomCommandHandler"
        v-bind="asideBottomProps"
      />
    </slot>

    <el-button
      class="slide"
      circle
      size="small"
      :icon="isCollapse ? 'ArrowRight' : 'ArrowLeft'"
      @click="slideClickHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import ProMenu from '../ProMenu/index.vue';
import AsideTop from '../AsideTop/AsideTop.vue';
import AsideBottom from '../AsideBottom/AsideBottom.vue';
import type { IAppList, ISystemList } from '../typings/aside';
import type { IMenuProps } from '../typings/menu';
import type { IAsideBottom, IAsideBottomProps } from '../typings/asideBottom';
import type { IAsideTopProps } from '../typings/asideTop';

// defineProps and defineEmits start
const props = defineProps({
  canHiddenXsOnly: {
    type: Boolean,
  },

  maxHeight: {
    type: String,
    default: '100vh',
  },

  showExtraAside: {
    type: Boolean,
  },
  // 跨站点导航列表
  appList: {
    type: Array as () => IAppList[],
    default: () => [],
  },
  // 站内点导航列表
  systemList: {
    type: Array as () => ISystemList[],
    default: () => [],
  },

  showAsideTop: {
    type: Boolean,
  },
  asideTopProps: {
    type: Object as PropType<IAsideTopProps>,
    default: () => ({}),
  },

  defaultWidth: {
    type: String,
    default: '240px',
  },

  activeRoute: {
    type: String,
    default: '',
  },
  menuProps: {
    type: Object as PropType<IMenuProps>,
    default: () => ({}),
  },

  showAsideBottom: {
    type: Boolean,
  },
  asideBottomProps: {
    type: Object as PropType<IAsideBottomProps>,
    default: () => ({}),
  },
});
const emits = defineEmits([
  'slide-click',
  'app-list-click',
  'system-list-click',
  'aside-top-command',
  'aside-bottom-command',
]);
// defineProps and defineEmits end

function appListClickHandler(item: IAppList): void {
  emits('app-list-click', item);
}
function systemListClickHandler(item: ISystemList): void {
  emits('system-list-click', item);
}

const asideWidth = ref<string>(props.defaultWidth);
function setAsideWidth(collapse: boolean): void {
  asideWidth.value = collapse ? '64px' : '240px';
}

const isCollapse = ref<boolean>(false);
function slideClickHandler(): void {
  isCollapse.value = !isCollapse.value;
  emits('slide-click', isCollapse.value);

  setAsideWidth(isCollapse.value);
}

function asideTopCommandHandler(collapse: boolean): void {
  emits('aside-top-command', collapse);
}
function asideBottomCommandHandler(item: IAsideBottom): void {
  emits('aside-bottom-command', item);
}
</script>

<style lang="scss" scoped>
.app-list {
  max-height: 54vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }
}
.system-list {
  max-height: 36vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }

  .system-icon {
    color: var(--el-text-color-primary);
  }
}

.aside-box {
  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }
}

.slide {
  position: absolute;
  top: 15px;
  right: -12px;
  z-index: 8;
}
</style>