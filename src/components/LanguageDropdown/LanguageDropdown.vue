<template>
  <el-dropdown
    class="dropdown"
    :class="[
      { 'hidden-xs-only': canHiddenXsOnly }
    ]"
    @command="commandHandler"
  >
    <div>
      <el-icon><IconLanguage /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in languageList"
          :key="index"
          :command="item"
          :disabled="item.disabled"
          :divided="item.divided"
          :style="item.index === currentItem ? activeStyles : {}"
        >
          <el-space>
            <span>{{ item.icon }}</span>
            <span>{{ item.title }}</span>
          </el-space>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { reactive, ref, type CSSProperties } from 'vue';
import IconLanguage from '../icons/IconLanguage.vue';
import type { IAsideBottom } from '../typings/asideBottom';

// defineProps and defineEmits start
const props = defineProps({
  canHiddenXsOnly: {
    type: Boolean,
  },

  list: {
    type: Array as () => IAsideBottom[],
    default: () => [],
  },
});
const emits = defineEmits(['command']);
// defineProps and defineEmits end

const languageList = reactive<IAsideBottom[]>([
  {
    index: 'english',
    title: 'English',
    icon: '🇺🇸',
  },
  {
    index: 'simplifiedChinese',
    title: '简体中文',
    icon: '🇨🇳',
  },
  {
    index: 'traditionalChinese',
    title: '繁体中文',
    icon: '🇭🇰',
  },
]);

const activeStyles: CSSProperties = {
  color: 'var(--el-dropdown-menuItem-hover-color)',
  backgroundColor: 'var(--el-dropdown-menuItem-hover-fill)',
}

const currentItem = ref<string>('simplifiedChinese');
function commandHandler(item: IAsideBottom): void {
  currentItem.value = item.index;
  emits('command', item);
}

function initOption(): void {
  const { list } = props;
  if (Array.isArray(list) && list.length > 0) {
    languageList.length = 0;
    languageList.push(...list);
  }
}
initOption();
</script>

<style lang="scss" scoped>
.dropdown {
  padding-left: 12px;
  padding-right: 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--el-border-color-extra-light);
  }
}
</style>