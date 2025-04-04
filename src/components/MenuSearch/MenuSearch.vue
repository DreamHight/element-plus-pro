<template>
  <div
    :class="[
      { 'hidden-xs-only': canHiddenXsOnly }
    ]"
    :style="searchStyles"
  >
    <el-space
      v-if="showSearch"
      class="search-box cursor-pointer"
      @click="openSearchDialogHandler"
    >
      <el-icon color="var(--el-menu-text-color)">
        <IconSearch />
      </el-icon>
      <el-text size="small">{{ searchPlaceholder }}</el-text>
      <el-tag type="primary" effect="plain" round>
        <el-space :size="2">
          <kbd class="kbd-icon">⌘</kbd>
          <kbd>K</kbd>
        </el-space>
      </el-tag>
    </el-space>

    <el-dialog
      v-model="dialogSearchVisible"
      width="80%"
      append-to-body
      :show-close="false"
      @keyup.up="keyUpItemHandler"
      @keyup.down="keyDownItemHandler"
      @keyup.enter="toPageHandler(null)"
    >
      <el-autocomplete
        ref="autocompleteRef"
        v-model="searchValue"
        clearable
        size="large"
        placeholder="输入导航栏菜单名"
        style="
          border: 2px solid var(--el-color-primary);
          border-radius: 6px;
        "
        :fetch-suggestions="fetchSuggestion"
        @clear="searchHandler"
        @input="searchHandler"
      >
        <template #prefix>
          <el-icon size="24" color="var(--el-color-primary)">
            <IconSearch />
          </el-icon>
        </template>
      </el-autocomplete>

      <div
        ref="SpaceContainerRef"
        :style="{
          maxHeight: maxHeight,
          overflow: 'auto',
        }"
      >
        <el-space
          direction="vertical"
          alignment="stretch"
          style="width: 100%; margin-block: 12px 20px;"
        >
          <el-card
            v-for="(item, index) in searchList"
            :key="item.value"
            :class="[
              'card-item cursor-pointer',
              index === currentIndex ? 'active' : '',
            ]"
            body-style="padding: 10px;"
            @click="toPageHandler(item)"
            @mouseenter="mouseenterHandler(index)"
          >
            <div class="flex-between">
              <el-space>
                <el-icon v-if="item.children"><IconMenu /></el-icon>
                <el-icon v-else class="ml-10px"><IconCaretRight /></el-icon>
                <span>{{ item.value }}</span>
              </el-space>
              <el-space>
                <el-icon>
                  <IconEnter />
                </el-icon>
              </el-space>
            </div>
          </el-card>

          <template v-if="!searchValue">
            <div
              v-for="(item, index) in staticList"
              :key="index"
            >
              <div v-if="item.isTitle">
                <el-text
                  v-if="'搜索历史' === item.value && staticSum.historySum"
                  type="primary"
                >
                  {{ item.value }}
                </el-text>
                <el-text
                  v-else-if="'收藏' === item.value && staticSum.collectSum"
                  type="primary"
                  style="display: block; margin-top: 8px;"
                >
                  {{ item.value }}
                </el-text>
              </div>
              <el-card
                v-else
                :class="[
                  'card-item cursor-pointer',
                  index === currentIndex ? 'active' : '',
                ]"
                body-style="padding: 10px;"
                @click="toPageHandler(item)"
                @mouseenter="mouseenterHandler(index)"
              >
                <div class="flex-between">
                  <el-space>
                    <el-icon v-if="'history' === item.linkParent" size="20">
                      <IconClock />
                    </el-icon>
                    <el-icon v-else-if="'collect' === item.linkParent" size="20">
                      <IconStar />
                    </el-icon>
                    <span>{{ item.value }}</span>
                  </el-space>
                  <el-space>
                    <el-icon
                      v-if="'history' === item.linkParent"
                      title="保存到搜索历史"
                      size="20"
                      class="option-icon"
                      style="padding: 3px;"
                      @click.stop="collectItemHandler(index)"
                    >
                      <IconStar />
                    </el-icon>
                    <el-icon
                      title="从搜索历史中移除"
                      size="20"
                      class="option-icon"
                      style="padding: 3px;"
                      @click.stop="closeItemHandler(index)"
                    >
                      <IconClose />
                    </el-icon>
                  </el-space>
                </div>
              </el-card>
            </div>
          </template>
        </el-space>
      </div>
      <el-empty
        v-if="
          (searchValue && searchList.length === 0) ||
          (!searchValue && staticSum.historySum === 0 && staticSum.collectSum === 0)
        "
        :description="
          !searchValue && staticList.length <= 2
            ? '没有历史搜索'
            : '无法找到相关结果'
        "
      />

      <!-- 底部快捷键说明 -->
      <div class="key-box border-block-start">
        <el-space :size="20">
          <el-space :size="2">
            <kbd class="command-key">
              <IconEnter />
            </kbd>
            <el-text type="info">选择</el-text>
          </el-space>

          <el-space :size="2">
            <kbd class="command-key">
              <svg width="15" height="15" aria-label="向下键" role="img">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                  <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
                </g>
              </svg>
            </kbd>
            <kbd class="command-key">
              <svg width="15" height="15" aria-label="向上键" role="img">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                  <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
                </g>
              </svg>
            </kbd>
            <el-text type="info">切换</el-text>
          </el-space>

          <el-space :size="2">
            <kbd class="command-key">
              <svg width="15" height="15" aria-label="Esc 键" role="img">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                  <path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path>
                </g>
              </svg>
            </kbd>
            <el-text type="info">关闭</el-text>
          </el-space>
        </el-space>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, type CSSProperties, type PropType } from 'vue';
import type { IMenuItem } from '../typings/menu';
import type { ISuggestionItem } from '../typings/menuSearch';
import IconCaretRight from '../icons/IconCaretRight.vue';
import IconClock from '../icons/IconClock.vue';
import IconClose from '../icons/IconClose.vue';
import IconEnter from '../icons/IconEnter.vue';
import IconMenu from '../icons/IconMenu.vue';
import IconSearch from '../icons/IconSearch.vue';
import IconStar from '../icons/IconStar.vue';
import {
  recursionToGetMenuItems,
  recursionToGetLastMenuItem,
} from './index';

// defineProps and defineEmits start
const props = defineProps({
  canHiddenXsOnly: {
    type: Boolean,
  },

  showSearch: {
    type: Boolean,
    default: true,
  },
  searchStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => {
      return {
        padding: '0 10px',
      }
    },
  },
  searchPlaceholder: {
    type: String,
    default: '搜索',
  },
  pinyinSearch: {
    type: Boolean,
    default: false,
  },

  maxHeight: {
    type: String,
    default: '295px',
  },

  historyList: {
    type: Array as () => ISuggestionItem[],
    default: () => [],
  },
  collectList: {
    type: Array as () => ISuggestionItem[],
    default: () => [],
  },

  menuTree: {
    required: true,
    type: Array as () => IMenuItem[],
    default: () => [],
    validator: (dataTree: IMenuItem[]) => {
      return dataTree.length > 0;
    },
  },
});
const emits = defineEmits([
  'item-click',
]);
// defineProps and defineEmits end

const searchValue = ref<string>('');
function clearSearchValueHandler(): void {
  searchValue.value = '';
}

const suggestionList = reactive<ISuggestionItem[]>([]);
function fetchSuggestion(queryString: string, cb: Function): void {
  const result = queryString
    ? suggestionList.filter((item: ISuggestionItem) => {
      return item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    })
    : suggestionList
  cb(result);
}

function searchHandler(val: string): void {
  initSearchList();

  if (!val) {
    return;
  }

  const { menuTree, pinyinSearch } = props;
  const menuItems: IMenuItem[] = recursionToGetMenuItems(menuTree, val, pinyinSearch);
  if (menuItems.length > 0){
    menuItems.forEach(item => {
      searchList.push({
        value: item.title,
        link: item.index,
        children: item.children,
      });
    });
  }
}

const autocompleteRef = ref<HTMLElement | null>(null);
const SpaceContainerRef = ref<HTMLElement | null>(null);
const dialogSearchVisible = ref<boolean>(false);
function openSearchDialogHandler(): void {
  dialogSearchVisible.value = true;
  setTimeout(() => {
    if (autocompleteRef.value) {
      autocompleteRef.value.focus();
    }
  }, 60);
}
function closeSearchDialogHandler(): void {
  dialogSearchVisible.value = false;
}
const currentIndex = ref<number>(1);
function initSearchList(): void {
  currentIndex.value = 0;
  searchList.length = 0;
}
const searchList = reactive<ISuggestionItem[]>([]);
const staticList = reactive<ISuggestionItem[]>([]);
const staticSum = computed(() => {
  const historyFilter = staticList.filter(item => 'history' === item.linkParent);
  const collectFilter = staticList.filter(item => 'collect' === item.linkParent);
  const historySum = historyFilter ? historyFilter.length : 0;
  const collectSum = collectFilter ? collectFilter.length : 0;
  return {
    historySum,
    collectSum,
  }
});
function mouseenterHandler(index: number): void {
  currentIndex.value = index;
}
function keyUpItemHandler(): void {
  const UP_OFFSET: number = 250;
  const OFFSET_INDEX: number = 3;
  const currentActiveElement: HTMLElement | null = document.querySelector('.card-item.active');
  const offsetTop: number = currentActiveElement?.offsetTop || 0;
  const staticNotEmpty: boolean = !searchValue.value && staticList.length > 0;
  if (staticNotEmpty) {
    if (currentIndex.value <= 1) {
      currentIndex.value = staticList.length - 1;
      if (SpaceContainerRef.value) {
        SpaceContainerRef.value.scrollTop = SpaceContainerRef.value?.scrollHeight;
      }
      return;
    }
  } else {
    if (currentIndex.value <= 0) {
      currentIndex.value = searchList.length - 1;
      if (SpaceContainerRef.value) {
        SpaceContainerRef.value.scrollTop = SpaceContainerRef.value?.scrollHeight;
      }
      return;
    }
  }
  currentIndex.value--;
  if (staticNotEmpty) {
    if (staticList[currentIndex.value].isTitle) {
      currentIndex.value--;
    }
  }
  if (SpaceContainerRef.value) {
    if (offsetTop > UP_OFFSET) {
      SpaceContainerRef.value.scrollTop = offsetTop - UP_OFFSET;
    } else {
      SpaceContainerRef.value.scrollTop = currentIndex.value > OFFSET_INDEX ? offsetTop : 0;
    }
  }
}
function keyDownItemHandler(): void {
  const DOWN_OFFSET: number = 150;
  const OFFSET_INDEX: number = 3;
  const currentActiveElement: HTMLElement | null = document.querySelector('.card-item.active');
  const offsetTop: number = currentActiveElement?.offsetTop || 0;
  const staticNotEmpty: boolean = !searchValue.value && staticList.length > 0;
  if (staticNotEmpty) {
    if (currentIndex.value >= staticList.length - 1) {
      currentIndex.value = 1;
      if (SpaceContainerRef.value) {
        SpaceContainerRef.value.scrollTop = 0;
      }
      return;
    }
  } else {
    if (currentIndex.value >= searchList.length - 1) {
      currentIndex.value = 0;
      if (SpaceContainerRef.value) {
        SpaceContainerRef.value.scrollTop = 0;
      }
      return;
    }
  }
  currentIndex.value++;
  if (staticNotEmpty) {
    if (staticList[currentIndex.value].isTitle) {
      currentIndex.value++;
    }
  }
  if (SpaceContainerRef.value) {
    if (offsetTop > DOWN_OFFSET) {
      SpaceContainerRef.value.scrollTop = offsetTop - DOWN_OFFSET;
    } else {
      SpaceContainerRef.value.scrollTop = currentIndex.value > OFFSET_INDEX ? offsetTop : 0;
    }
  }
}
function toPageHandler(item: ISuggestionItem | null): void {
  closeSearchDialogHandler();

  let obj: ISuggestionItem | null = null,
    link: string = '';
  if (item) {
    link = item.link;
    obj = { ...item };
  } else {
    if (searchList.length) {
      link = searchList[currentIndex.value].link;
      obj = { ...searchList[currentIndex.value] };
    }
  }

  emits('item-click', link, obj);
}
function collectItemHandler(index: number): void {
  const collectItem: ISuggestionItem = JSON.parse(JSON.stringify(staticList[index]));
  const idx: number = staticList.findIndex(item => item.link === collectItem.link);
  if (idx === -1) {
    collectItem.linkParent = 'collect';
    staticList.push(collectItem);
  }
  closeItemHandler(index);
}
function closeItemHandler(index: number): void {
  staticList.splice(index, 1);
}

function getStaticList(): void {
  const { historyList, collectList } = props;
  staticList.length = 0;
  let itemJson = null;
  if (historyList.length > 0) {
    itemJson = {
      value: '搜索历史',
      link: 'history',
      isTitle: true,
    };
    staticList.push(itemJson);
    historyList.forEach(item => {
      itemJson = {
        ...item,
        linkParent: 'history',
      }
      staticList.push(itemJson);
    });
  }
  if (collectList.length > 0) {
    itemJson = {
      value: '收藏',
      link: 'collect',
      isTitle: true,
    };
    staticList.push(itemJson);
    collectList.forEach(item => {
      itemJson = {
        ...item,
        linkParent: 'collect',
      }
      staticList.push(itemJson);
    });
  }
}
function getSuggestionList(): void {
  const menuItems: IMenuItem[] = recursionToGetLastMenuItem(props.menuTree);
  const suggestion: ISuggestionItem[] = [];

  menuItems.forEach(item => {
    suggestion.push({
      link: item.index,
      value: item.title,
    })
  });

  suggestionList.length = 0;
  suggestionList.push(...suggestion);
}
function init(): void {
  getStaticList();
  getSuggestionList();
}
onMounted(() => {
  init();
});

// 暴露ref调用的方法 start
defineExpose({
  openSearchDialog: openSearchDialogHandler,
  closeSearchDialog: closeSearchDialogHandler,
  clearSearchValue: clearSearchValueHandler,
});
// 暴露ref调用的方法 end
</script>

<style lang="scss" scoped>
.search-box {
  background-color: var(--el-bg-color-page);
  padding: 4px 8px;
  border-radius: var(--el-border-radius-round);
  .kbd-icon {
    font-size: var(--el-font-size-large);
  }
}

.card-item {
  &.active {
    background-color: var(--el-color-primary);
    color: var(--el-color-white);
  }

  .option-icon {
    border-radius: var(--el-border-radius-circle);
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: var(--el-overlay-color-lighter);
    }
  }
}

.key-box {
  padding-top: 14px;
  padding-left: 14px;
  padding-right: 14px;
  margin-left: -16px;
  margin-right: -16px;
  box-shadow: 0 -1px 0 0 rgba(84, 115, 176, 0.10), 0 -3px 6px 0 rgba(69, 98, 155, .12);

  .command-key {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 18px;
    font-size: 12px;
    color: #909399;
    background: rgba(125, 125, 125, .1);
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 0 #cdcde6,inset 0 0 1px 1px #fff,0 1px 2px 1px rgba(30,35,90,.4);
    margin-right: .4em;
    padding: 0 0 1px;
    border: 0;
  }
}
</style>