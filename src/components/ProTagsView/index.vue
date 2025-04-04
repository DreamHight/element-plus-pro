<template>
  <div
    class="flex justify-between bg-white"
    :class="[
      ['chrome-tag'].includes(variant) ? 'items-end' : 'items-center',
      { 'border-block-end': showBottomBorder },
    ]"
    :style="[tagsViewStyles, { height: boxHeight + 'px' }]"
  >
    <!-- <div
      class="flex tags-view"
      :class="[
        {
          'shadow': shadow,
          'space__item__stretch': stretch,
          'padding-inline': variant !== 'border-bottom',
        }
      ]"
      :style="{
        gap: space + 'px',
      }"
    >
      <div
        v-for="(item, index) in listMix"
        :key="index"
        :draggable="true"
        @dragstart="dragStartHandler($event, item)"
        @dragover="dragOverHandler"
        @dragleave="dragLeaveHandler"
        @drop="dropHandler($event, item)"
      >
        <LightTag
          v-if="variant === 'light-tag'"
          :menu-item="item"
          :show-pulse-dot="showPulseDot"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <CheckTag
          v-if="variant === 'check-tag'"
          :menu-item="item"
          :show-pulse-dot="showPulseDot"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <BorderBottom
          v-else-if="variant === 'border-bottom'"
          :menu-item="item"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <ButtonPlain
          v-else-if="variant === 'button-plain'"
          :menu-item="item"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <ChromeTag
          v-else-if="variant === 'chrome-tag'"
          :menu-item="item"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <SafariTag
          v-else-if="variant === 'safari-tag'"
          :menu-item="item"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />
      </div>
    </div> -->

    <el-space
      :size="space"
      class="tags-view padding-inline"
      :class="[
        {
          'shadow': shadow,
          'space__item__stretch': stretch,
        }
      ]"
    >
      <div
        v-for="(item, index) in listMix"
        :key="index"
        :draggable="true"
        @dragstart="dragStartHandler($event, item)"
        @dragover="dragOverHandler"
        @dragleave="dragLeaveHandler"
        @drop="dropHandler($event, item)"
      >
        <LightTag
          v-if="variant === 'light-tag'"
          :menu-item="item"
          :show-pulse-dot="showPulseDot"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <CheckTag
          v-if="variant === 'check-tag'"
          :menu-item="item"
          :show-pulse-dot="showPulseDot"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <BorderBottom
          v-else-if="variant === 'border-bottom'"
          :menu-item="item"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <ButtonPlain
          v-else-if="variant === 'button-plain'"
          :menu-item="item"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <ChromeTag
          v-else-if="variant === 'chrome-tag'"
          :menu-item="item"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <SafariTag
          v-else-if="variant === 'safari-tag'"
          :menu-item="item"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />
      </div>
      <!-- <el-dropdown
        v-for="(item, index) in listMix"
        :key="index"
        :class="[
          { 'border-inline-end': strimSpacer && index < listMix.length - 1},
        ]"
        trigger="contextmenu"
        :draggable="true"
        @dragstart="dragStartHandler($event, item)"
        @dragover="dragOverHandler"
        @dragleave="dragLeaveHandler"
        @drop="dropHandler($event, item)"
        @command="commandHandler"
      >
        <LightTag
          v-if="variant === 'light-tag'"
          :menu-item="item"
          :show-pulse-dot="showPulseDot"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <BorderBottom
          v-else-if="variant === 'border-bottom'"
          :menu-item="item"
          :show-pulse-dot="showPulseDot"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <ButtonPlain
          v-else-if="variant === 'button-plain'"
          :menu-item="item"
          :show-pulse-dot="showPulseDot"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <ChromeTag
          v-else-if="variant === 'chrome-tag'"
          :menu-item="item"
          :show-pulse-dot="showPulseDot"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <SafariTag
          v-else-if="variant === 'safari-tag'"
          :menu-item="item"
          :show-pulse-dot="showPulseDot"
          :show-icon="showIcon"
          :current-route="currentRoute"
          @click="toPageHandler(item)"
          @close="closePageHandler(index)"
        />

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(tool, toolIndex) in labelTools"
              :key="toolIndex"
              :command="{item, tool}"
              :disabled="tool.disabled"
              :divided="tool.divided"
              :icon="tool.icon"
            >{{ tool.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </el-space>

    <el-space :size="0">
      <el-dropdown
        v-if="showOperateMenu"
        placement="bottom-end"
        @command="commandHandler"
      >
        <div
          class="operate flex-center cursor-pointer border-inline-start"
          :style="{
            width: boxHeight + 'px',
            height: boxHeight + 'px',
          }"
        >
          <!-- <span>标签页组</span> -->
          <el-icon><IconArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, index) in labelTools"
              :key="index"
              :command="item"
              :disabled="item.disabled"
              :divided="item.divided"
              :icon="item.icon"
            >{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div
        v-if="showMaximize"
        class="operate flex-center cursor-pointer border-inline-start"
        :style="{
          width: boxHeight + 'px',
          height: boxHeight + 'px',
        }"
      >
        <el-icon><IconMaximize /></el-icon>
      </div>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, type Component, type CSSProperties, type PropType } from 'vue';
import { useRouter, type Router } from 'vue-router';
import type { IMenuItem } from '../typings/menu';
import { recursionMenuTreeToMenuList, recursionToGetMenuItems } from '../MenuSearch';
import IconArrowDown from '../icons/IconArrowDown.vue';
import IconFixed from '../icons/IconFixed.vue';
import IconCancelFixed from '../icons/IconCancelFixed.vue';
import IconMaximize from '../icons/IconMaximize.vue';
import IconCancelMaximize from '../icons/IconCancelMaximize.vue';
import IconNewWindow from '../icons/IconNewWindow.vue';
import IconArrowCloseLeft from '../icons/IconArrowCloseLeft.vue';
import IconArrowCloseRight from '../icons/IconArrowCloseRight.vue';
import IconCloseOther from '../icons/IconCloseOther.vue';
import ChromeTag from '../TagsView/ChromeTag.vue';
import ButtonPlain from '../TagsView/ButtonPlain.vue';
import BorderBottom from '../TagsView/BorderBottom.vue';
import LightTag from '../TagsView/LightTag.vue';
import SafariTag from '../TagsView/SafariTag.vue';
import CheckTag from '../TagsView/CheckTag.vue';
import { useClipboard } from '../hooks/use-clipboard';

const router: Router = useRouter();

// defineProps and defineEmits start
const props = defineProps({
  variant: {
    type: String,
    default: 'light-tag',
    validator: (val: string) => {
      return ['light-tag', 'check-tag', 'button-plain', 'border-bottom', 'chrome-tag', 'safari-tag'].includes(val);
    },
  },

  showBottomBorder: {
    type: Boolean,
  },
  tagsViewStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  boxHeight: {
    type: Number,
    default: 36,
  },
  space: {
    type: Number,
    default: 8,
  },
  shadow: {
    type: Boolean,
  },
  stretch: {
    type: Boolean,
  },
  strimSpacer: {
    type: Boolean,
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
    type: Array as () => IMenuItem[],
    default: () => [],
  },
  // 仅 variant === 'check-tag' 时
  showPulseDot: {
    type: Boolean,
    default: true,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },

  showOperateMenu: {
    type: Boolean,
  },
  showMaximize: {
    type: Boolean,
  },
});
const emits = defineEmits([
  'item-click',
  'item-close',
  'command',
]);
// defineProps and defineEmits end

let targetDom: HTMLElement;
let draggedItem: IMenuItem = {
  index: '',
  title: '',
  id: '',
  parentId: null
};
const dragStart = ref<boolean>(false);
function dragStartHandler(event: DragEvent, item: IMenuItem): void {
  dragStart.value = true;
  draggedItem = item;
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', JSON.stringify(item));
  }
};
function dragOverHandler(event: DragEvent): void {
  event.stopPropagation();
  event.preventDefault();
  if (event.target instanceof HTMLElement) {
    targetDom = event.target;
    event.target.style.boxShadow = 'inset 0px 1px 10px 2px #d0d0d0';
  }
}
function dragLeaveHandler(): void {
  if (targetDom) {
    targetDom.style.boxShadow = 'inherit';
  }
}
function dropHandler(event: DragEvent, targetItem: IMenuItem): void {
  dragStart.value = false;

  event.stopPropagation();
  event.preventDefault();
  const itemIndex = listMix.indexOf(draggedItem);
  const targetIndex = listMix.indexOf(targetItem);

  if (event.target instanceof HTMLElement) {
    event.target.style.boxShadow = 'inherit';
  }

  // 交换元素位置
  [listMix[itemIndex], listMix[targetIndex]] = [listMix[targetIndex], listMix[itemIndex]];
};

interface ILabelTool {
  key: string;
  name: string;
  disabled?: boolean;
  divided?: boolean;
  icon?: string | Component;
}
const labelTools: ILabelTool[] = [
  {
    key: 'FIXED',
    icon: IconFixed,
    name: '固定',
  },
  {
    key: 'CANCEL_FIXED',
    icon: IconCancelFixed,
    name: '取消固定',
  },
  {
    key: 'COPY_DOCUMENT',
    icon: 'CopyDocument',
    name: '复制',
  },
  {
    key: 'REFRESH',
    icon: 'RefreshRight',
    name: '刷新',
  },
  {
    key: 'NEW_WINDOW',
    icon: IconNewWindow,
    name: '在新窗口打开',
  },

  {
    key: 'MAXIMIZE',
    icon: IconMaximize,
    name: '最大化',
    divided: true,
  },
  {
    key: 'CANCEL_MAXIMIZE',
    icon: IconCancelMaximize,
    name: '取消最大化',
  },

  {
    key: 'CLOSE',
    icon: 'Close',
    name: '关闭标签页',
    divided: true,
  },
  {
    key: 'CLOSE_OTHER',
    icon: IconCloseOther,
    name: '关闭其它标签页',
  },
  {
    key: 'CLOSE_LEFT',
    icon: IconArrowCloseLeft,
    name: '关闭左侧标签页',
  },
  {
    key: 'CLOSE_RIGHT',
    icon: IconArrowCloseRight,
    name: '关闭右侧标签页',
  },
];
function commandHandler(commandArgs: { item: IMenuItem; tool: ILabelTool; }): void {
  const { item, tool } = commandArgs;
  const strategy: Record<string, Function> = {
    'CLOSE': (menuItem: IMenuItem) => {
      const idx: number = listMix.findIndex(obj => obj.index === menuItem.index);
      closePageHandler(idx);
    },
    'COPY_DOCUMENT': (menuItem: IMenuItem) => {
      const href: string = window.location.host + menuItem.index;
      const { copy } = useClipboard();
      copy(href);
    },
    'FIXED': (menuItem: IMenuItem) => {
      listMix.forEach(obj => {
        if (obj.index === menuItem.index) {
          obj.fixed = true;
        }
      });
    },
    'CANCEL_FIXED': (menuItem: IMenuItem) => {
      listMix.forEach(obj => {
        if (obj.index === menuItem.index) {
          obj.fixed = false;
        }
      });
    },
    'REFRESH': (menuItem: IMenuItem, currentActive: string) => {
      const findMenuItem = listMix.find(v => v.index === menuItem.index);
      if (menuItem.index === currentActive) {
        // window.location.reload();
        // router.go(0);
        // router.replace(menuItem.index);
      } else {
        if (findMenuItem) {
          toPageHandler(findMenuItem);
        }
      }
    },
    'NEW_WINDOW': (menuItem: IMenuItem) => {
      window.open(menuItem.index, '_blank');
    },
    'MAXIMIZE': () => {
      console.log('MAXIMIZE');
    },
    'CANCEL_MAXIMIZE': () => {
      console.log('CANCEL_MAXIMIZE');
    },
    'CLOSE_LEFT': (menuItem: IMenuItem) => {
      const index: number = listMix.findIndex(obj => obj.index === menuItem.index);
      const filterReserve: IMenuItem[] | undefined = listMix.filter((obj, idx) => idx >= index || obj.fixed);
      if (Array.isArray(filterReserve) && filterReserve.length) {
        listMix.length = 0;
        filterReserve.forEach(v => {
          listMix.push({ ...v });
        });
      }
    },
    'CLOSE_RIGHT': (menuItem: IMenuItem) => {
      const index: number = listMix.findIndex(obj => obj.index === menuItem.index);
      const filterReserve: IMenuItem[] | undefined = listMix.filter((obj, idx) => idx <= index || obj.fixed);
      if (Array.isArray(filterReserve) && filterReserve.length) {
        listMix.length = 0;
        filterReserve.forEach(v => {
          listMix.push({ ...v });
        });
      }
    },
    'CLOSE_OTHER': (menuItem: IMenuItem) => {
      const findMenuItem = listMix.find(v => v.index === menuItem.index);
      if (findMenuItem) {
        toPageHandler(findMenuItem);
      }

      const filterReserve: IMenuItem[] | undefined = listMix.filter(obj => obj.index === menuItem.index || obj.fixed);
      if (Array.isArray(filterReserve) && filterReserve.length) {
        listMix.length = 0;
        filterReserve.forEach(v => {
          listMix.push({ ...v });
        });
      }
    },
  }

  if (typeof(strategy[tool.key]) === 'function') {
    strategy[tool.key](item, props.activeRoute);
  }

  emits('command', item);
}

const listMix = reactive<IMenuItem[]>([ ...props.list ]);
const currentRoute = ref<string>('');
function toPageHandler(item: IMenuItem): void {
  currentRoute.value = item.index;
  router.push(item.index);

  emits('item-click', item);
}
function closePageHandler(index: number): void {
  if (index === listMix.length - 1) {
    currentRoute.value = listMix[index - 1].index;
  } else {
    currentRoute.value = listMix[index + 1].index;
  }
  listMix.splice(index, 1);
  router.push(currentRoute.value);

  const menuItems: IMenuItem[] = recursionToGetMenuItems(props.menuTree, currentRoute.value, false, 'index');
  const menuItem: IMenuItem | null = menuItems.length ? menuItems[0] : null;

  emits('item-close', menuItem);
}

function setHistoryRoute(currentRoute: string): void {
  const idx: number = listMix.findIndex(obj => obj.index === currentRoute);
  if (idx === -1) {
    const menuToList: IMenuItem[] = recursionMenuTreeToMenuList(props.menuTree);
    const findMenuItem: IMenuItem | undefined = menuToList.find(item => item.index === currentRoute);
    if (findMenuItem) {
      listMix.push({ ...findMenuItem });
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

<style lang="scss" scoped>
.tags-view {
  width: 100%;
  padding-inline: 14px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }

  :deep(.el-space__item) {
    flex-shrink: 0;
  }

  &.shadow {
    box-shadow: inset 0 2px 8px 0 var(--el-border-color-light);
  }

  &.space__item__stretch > :deep(.el-space__item){
    flex: 1;
  }

  // :deep(.el-dropdown) {
    // .tag-box * {
      // pointer-events: none;
    // }
  // }
}

// .padding-inline {
//   padding-inline: 14px;
// }

.operate {
  color: var(--el-menu-text-color);
}
</style>