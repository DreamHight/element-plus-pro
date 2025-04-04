<template>
  <el-dropdown
    class="dropdown"
    :class="[
      { 'hidden-xs-only': canHiddenXsOnly }
    ]"
  >
    <el-badge v-bind="badgePropsObj">
      <el-icon class="translate-y-1px">
        <IconBell />
      </el-icon>
    </el-badge>
    <template v-if="list.length" #dropdown>
      <div :style="{ width: boxWidth }">
        <el-tabs
          v-model="activeName"
          stretch
          @tab-click="tabClickHandler"
        >
          <el-tab-pane
            v-for="pane in list"
            :key="pane.name"
            :label="pane.label + pane.count"
            :name="pane.name"
            class="overflow-auto"
            :style="{ maxHeight: maxHeight }"
          >
            <div
              v-for="(item, index) in pane.list"
              :key="index"
              class="msg-item flex-between w-full cursor-pointer"
              :class="[
                index < pane.list.length - 1 ? 'border-block-end' : 'none'
              ]"
              @click="itemClickHandler(item)"
            >
              <el-avatar
                v-if="item.avatar"
                class="flex-shrink-0 mr-10px"
                :src="item.avatar"
              />

              <div
                class="flex-1 leading-15px"
                style="max-width: 100%; overflow: hidden; text-overflow: ellipsis;"
              >
                <el-text
                  truncated
                  class="title font-bold"
                >{{ item.title }}</el-text>
                <el-text
                  v-if="item.subTitle"
                  truncated
                  style="display: block;"
                >{{ item.subTitle }}</el-text>
              </div>

              <el-tag
                v-if="item.tag && item.tag.content"
                :type="item.tag.type"
                class="flex-shrink-0 ml-10px"
              >{{ item.tag.content }}</el-tag>
            </div>
            <el-empty
              v-if="pane.list?.length === 0"
              :image-size="100"
              :description="'无' + pane.label + '数据'"
            />
          </el-tab-pane>
        </el-tabs>

        <div class="flex-between border-block-start">
          <el-button
            class="flex-1 rounded-none"
            type='warning'
            size="large"
            text
            @click="clearUpHandler"
          >
            {{ clearUp[activeName] }}
          </el-button>
          <el-divider direction="vertical" style="margin: 0;" />
          <el-button
            class="flex-1 rounded-none"
            type='success'
            size="large"
            text
            @click="navigateToMoreHandler"
          >{{ viewMore }}</el-button>
        </div>
      </div>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { h, reactive, ref, type PropType } from 'vue';
import type { IBadgeProps, IPanelItem, ITabPanel } from '../typings/messageDropdown';
import IconBell from '../icons/IconBell.vue';



// defineProps and defineEmits start
const props = defineProps({
  canHiddenXsOnly: {
    type: Boolean,
  },

  badgeProps: {
    type: Object as PropType<IBadgeProps>,
    default: () => ({}),
  },

  boxWidth: {
    type: String,
    default: '300px',
  },
  maxHeight: {
    type: String,
    default: '300px',
  },

  list: {
    type: Array as () => ITabPanel[],
    default: () => [],
  },

  viewMore: {
    type: String,
    default: '查看更多',
  },
});
const emits = defineEmits([
  'command',
  'tab-click',
  'list-item-click',
  'clear-up',
  'navigate-to',
]);
// defineProps and defineEmits end

const activeName = ref<string>('notification');

function tabClickHandler(): void {
  emits('tab-click', activeName.value);
}

function itemClickHandler(item: IPanelItem): void {
  emits('list-item-click', item);
}

const clearUp: { [key: string]: string } = reactive({});
function clearUpHandler(): void {
  emits('clear-up', activeName.value);
}

function navigateToMoreHandler(): void {
  emits('navigate-to', activeName.value);
}

const badgePropsObj = reactive<IBadgeProps>({
  offset: [0, 15],
});
function initOption(): void {
  const { badgeProps, list } = props;
  if (Object.prototype.toString.call(badgeProps) === '[object Object]') {
    Object.assign(badgePropsObj, badgeProps);
  }

  initClearUp(list);
}
function initClearUp(dataList: ITabPanel[]): void {
  dataList.forEach(item => {
    clearUp[item.name] = item.delete;
  });
}
initOption();
</script>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin: 0;
}
:deep(.el-tabs__item) {
  padding: 0;
}
.msg-item {
  padding: 12px 14px;
  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
}
.dropdown {
  padding-left: 12px;
  padding-right: 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--el-border-color-extra-light);
  }

  .title {
    color: var(--el-text-color-primary);
  }
}
</style>