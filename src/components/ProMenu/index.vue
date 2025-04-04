<template>
  <div>
    <div v-if="showSearch" class="text-center">
      <el-button
        v-if="$attrs.collapse"
        icon="Search"
        circle
        @click="openSearchDialogHandler"
      />
      <el-autocomplete
        v-else
        v-model="searchValue"
        clearable
        placeholder="输入导航栏菜单名"
        :prefix-icon="IconSearch"
        :fetch-suggestions="fetchSuggestion"
        @clear="searchHandler"
        @input="searchHandler"
        @keyup.enter="searchHandler(searchValue)"
      >
        <template v-if="showCycleSort" #append>
          <el-button
            :icon="sortFilter"
            style="font-size: 18px;"
            @click="cycleSortHandler"
          />
        </template>
      </el-autocomplete>
    </div>

    <MenuSearch
      ref="MenuSearchRef"
      :show-search="false"
      :menu-tree="menuTree"
      @item-click="toPageHandler"
    />

    <el-menu
      class="border-none"
      :key="menuKey"
      background-color="transparent"
      :router="true"
      :show-timeout="0"
      v-bind="$attrs"
    >
      <MenuTree
        v-for="item in searchMenuTree"
        :key="item.index"
        :data="item"
        :menu-mode="menuMode"
        :collapse="!!$attrs.collapse"
        @menu-item-click="menuTreeItemClickHandler"
      />
    </el-menu>
    <el-empty
      v-if="searchMenuTree.length === 0"
      description="无法找到相关结果"
      :image-size="$attrs.collapse ? 36 : 160"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, useAttrs, type Component } from 'vue';
import MenuSearch from '../MenuSearch/MenuSearch.vue';
import MenuTree from '../MenuTree/index.vue';
import IconFilter from '../icons/IconFilter.vue';
import IconSearch from '../icons/IconSearch.vue';
import IconSortAZ from '../icons/IconSortAZ.vue';
import IconSortZA from '../icons/IconSortZA.vue';
import type { IMenuItem } from '../typings/menu';
import type { ISuggestionItem } from '../typings/menuSearch';
import {
  recursionToGetMenuItems,
  recursionToGetLastMenuItem,
  recursionToGetTopMenusWith,
} from '../MenuSearch';
import { useDebounce } from '../hooks/use-debounce';

// defineProps and defineEmits start
const props = defineProps({
  showSearch: {
    type: Boolean,
    default: true,
  },
  pinyinSearch: {
    type: Boolean,
  },
  showCycleSort: {
    type: Boolean,
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
    // validator: (dataTree: IMenuItem[]) => {
    //   return dataTree.length > 0;
    // },
  },
});
const emits = defineEmits([
  'menu-item-click',
  'menu-tree-item-click',
]);
// defineProps and defineEmits end

function menuTreeItemClickHandler(item: IMenuItem): void {
  emits('menu-tree-item-click', item);
}

const searchValue = ref<string>('');
const searchMenuTree = ref<IMenuItem[]>([ ...props.menuTree ]);

const sort = ref<number>(0);
function cycleSortHandler(): void {
  sort.value++;
  if (sort.value === 3) {
    sort.value = 0;
  }
  console.log('sort.value', sort.value);
}
const sortFilter = computed(() => {
  let iconComponent: Component = IconFilter;
  if (sort.value === 0) {
    iconComponent = IconFilter;
  } else if (sort.value === 1) {
    iconComponent = IconSortAZ;
  } else if (sort.value === 2) {
    iconComponent = IconSortZA;
  }
  return iconComponent;
});

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
  if (!menuItems.length){
    searchMenuTree.value = [ ...menuItems ];
    return;
  }

  const topMenus: IMenuItem[] = recursionToGetTopMenusWith(menuTree, menuItems);
  searchMenuTree.value = [ ...topMenus ];
}

const currentIndex = ref<number>(1);
function initSearchList(): void {
  currentIndex.value = 0;
  searchMenuTree.value = [ ...props.menuTree ];
}

// 弹窗搜索菜单 start
const MenuSearchRef = ref();
function openSearchDialogHandler(): void {
  if (MenuSearchRef.value) {
    MenuSearchRef.value.openSearchDialog();
  }
}
function toPageHandler(link: string, obj: ISuggestionItem | null): void {
  emits('menu-item-click', link, obj);
}
// 弹窗搜索菜单 end

const attrs = useAttrs();
const menuMode = ref<string>('vertical');
function initMenuMode(): void {
  if (!!attrs.mode) {
    menuMode.value = attrs.mode as string;
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

const menuKey = ref<number>(0);
function reloadMenu(): void {
  menuKey.value++;
  console.log('menuKey.value', menuKey.value);
}
let innerWidth: number = 0;
const { debounce } = useDebounce(reloadMenu, 200);
function resizeChange(): void {
  if (attrs.mode === 'horizontal' && innerWidth !== window.innerWidth) {
    innerWidth = window.innerWidth;
    if (menuKey.value > 99) {
      menuKey.value = 0;
    }
    debounce();
  }
}

function init(): void {
  getSuggestionList();
  initMenuMode();
}

onMounted(() => {
  init();

  if (attrs.mode === 'horizontal' && innerWidth !== window.innerWidth) {
    // 监听resize变化
    window.addEventListener('resize', resizeChange);
  }
});

onUnmounted(() => {
  if (attrs.mode === 'horizontal' && innerWidth !== window.innerWidth) {
    // 取消监听resize变化
    window.removeEventListener('resize', resizeChange);
  }
});
</script>

<style lang="scss" scoped>
:deep(.el-autocomplete) {
  width: 200px;
  margin-bottom: 8px;
}

.el-menu {
  &.el-menu--horizontal {
    border-bottom: 0;
  }
}

.commands-key {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 18px;
  color: #909399;
  background: rgba(125, 125, 125, .1);
  border-radius: 2px;
  box-shadow: inset 0 -2px 0 0 #cdcde6,inset 0 0 1px 1px #fff,0 1px 2px 1px rgba(30,35,90,.4);
  margin-right: .4em;
  padding: 0 0 1px;
  border: 0;
}
</style>