<template>
  <div class="flex" @click="wrapClickHandler">
    <el-space
      v-show="!isCollapse"
      ref="LeftRef"
      class="relative flex-shrink-0 bg-white"
      :style="{
        width: width,
        padding: '18px 20px',
      }"
      direction="vertical"
    >
      <el-input
        v-if="showSearch"
        v-model="filterText"
        placeholder="关键词搜索"
        :prefix-icon="IconSearch"
        v-bind="searchProps"
      />

      <el-space v-if="showOperation" wrap>
        <el-button
          v-for="(operation, index) in operationsMix"
          :key="index"
          size="small"
          v-bind="operation.buttonProps || {}"
          @click="operationClickHandler(operation)"
        >{{ operation.name }}</el-button>
      </el-space>

      <el-tree
        ref="TreeRef"
        :default-expand-all="true"
        :highlight-current="true"
        :expand-on-click-node="false"
        :data="treeData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-contextmenu="contextmenuHandler"
        v-bind="$attrs"
      />

      <el-card
        v-show="showContextmenu"
        class="absolute z-top"
        body-style="padding: 6px 0;"
        :style="contextmenuPosition"
      >
        <el-space direction="vertical" :size="0">
          <template
            v-for="item in contextmenuList"
            :key="item.key"
          >
            <div v-if="item.divided" class="divided"></div>
            <el-button
              text
              v-bind="item"
              @click="contextmenuClickHandler(item)"
            >{{ item.content }}</el-button>
          </template>
        </el-space>
      </el-card>
    </el-space>

    <div
      class="relative"
      :class="{
        'border-inline-start': !isCollapse
      }"
    >
      <el-button
        class="toggle-arrow"
        circle
        type="primary"
        size="small"
        :icon="isCollapse ? IconArrowRight : IconArrowLeft"
        @click="slideClickHandler"
      />
    </div>

    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef, watch, type CSSProperties, type PropType } from 'vue';
import { type ButtonProps, type ElTree, type InputProps } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { ITableOperation } from '../typings/tableOperation';
import IconArrowLeft from '../icons/IconArrowLeft.vue';
import IconArrowRight from '../icons/IconArrowRight.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconEdit from '../icons/IconEdit.vue';
import IconPlus from '../icons/IconPlus.vue';
import IconSearch from '../icons/IconSearch.vue';

// defineProps and defineEmits start
const props = defineProps({
  width: {
    type: String,
    default: '250px',
  },

  showSearch: {
    type: Boolean,
    default: true,
  },
  searchProps: {
    type: Object as PropType<Omit<InputProps, 'modelValue'>>,
    default: () => ({}),
  },

  showOperation: {
    type: Boolean,
    default: true,
  },
  operations: {
    type: Array as () => ITableOperation[],
    default: () => [],
  },
  mixType: {
    type: String,
    default: 'default',
    validator: (val: string) => {
      return ['default', 'cover'].includes(val);
    }
  },
  orderType: {
    type: String,
    default: 'asc',
    validator: (val: string) => {
      return ['asc', 'desc'].includes(val);
    }
  },
});
const emits = defineEmits([
  'operation-click',
  'contextmenu-command',
]);
// defineProps and defineEmits end

const filterText = ref<string>('');
watch(filterText, (val) => {
  TreeRef.value!.filter(val);
});
function filterNode(value: string, data: ITreeData): boolean {
  if (!value) return true;
  return data.label.includes(value);
}

const operationsDefault: ITableOperation[] = [
  {
    key: 'add',
    name: '新建',
    order: 0,
    buttonProps: {
      type: 'primary',
      icon: shallowRef(IconPlus),
    },
  },
  {
    key: 'edit',
    name: '修改',
    order: 0,
    buttonProps: {
      type: 'warning',
      icon: shallowRef(IconEdit),
    },
  },
  {
    key: 'delete',
    name: '删除',
    order: 0,
    buttonProps: {
      type: 'danger',
      icon: shallowRef(IconDelete),
    },
  },
];
const operationsMix = reactive<ITableOperation[]>([]);
function operationClickHandler(item: ITableOperation): void {
  emits('operation-click', item);
}
function initOperation(): void {
  const { operations, mixType, orderType } = props;

  const mix: ITableOperation[] = [];

  if ('cover' === mixType) {
    operations.forEach(item => {
      mix.push({ order: 0, ...item });
    });
  } else {
    operationsDefault.forEach(item => {
      mix.push({ ...item });
    });

    const keys = mix.map(item => item.key);
    let itemJson: ITableOperation | null = null,
      idx: number = 0;
    operations.forEach(item => {
      if (keys.includes(item.key)) {
        idx = mix.findIndex(obj => obj.key === item.key);
        if (idx > -1) {
          mix[idx] = Object.assign({ order: 0 }, mix[idx], item);
        }
      } else {
        itemJson = { order: 0, ...item };
      }
      if (itemJson) {
        mix.push(itemJson);
      }
    });
  }

  if ('asc' === orderType) {
    mix.sort((a, b) => {
      const aOrder: number = a.order || 0;
      const bOrder: number = b.order || 0;
      return aOrder - bOrder;
    });
  } else if ('desc' === orderType) {
    mix.sort((a, b) => {
      const aOrder: number = a.order || 0;
      const bOrder: number = b.order || 0;
      return bOrder - aOrder;
    });
  }

  operationsMix.length = 0;
  mix.forEach(item => {
    if (!item.hidden) {
      operationsMix.push(item);
    }
  });
}
initOperation();

interface ITreeData {
  label: string
  children?: ITreeData[]
}
const treeData: ITreeData[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
const defaultProps = {
  children: 'children',
  label: 'label',
}

const LeftRef = ref();
const showContextmenu = ref<Boolean>(false);
interface Contextmenu {
  key: string;
  content: string;
  divided?: boolean;
}
type IContextmenu = Contextmenu & Partial<ButtonProps>;
const contextmenuList: IContextmenu[] = [
  {
    key: 'add',
    content: '添加下级',
    type: 'primary',
    icon: IconPlus,
  },
  {
    key: 'edit',
    content: '修改',
    type: 'warning',
    icon: IconEdit,
  },
  {
    key: 'delete',
    content: '删除',
    divided: true,
    type: 'danger',
    icon: IconDelete,
  },
];
function contextmenuClickHandler(item: IContextmenu): void {
  showContextmenu.value = false;
  emits('contextmenu-command', item);
}
const contextmenuPosition = ref<CSSProperties>({top: '0px', left: '0px'});
function contextmenuHandler(event: PointerEvent, data: ITreeData, node: Node, self: any): void {
  console.log('sss', event, data, node, self);
  // event.preventDefault();
  let offsetTop: number = 0;
  if (LeftRef.value) {
    offsetTop = LeftRef.value.$el.offsetTop;
  }
  const { pageY, offsetX } = event;
  contextmenuPosition.value = {
    top: `${pageY - offsetTop}px`,
    left: `${offsetX}px`,
  };
  showContextmenu.value = true;
}
function wrapClickHandler(): void {
  showContextmenu.value = false;
}

const isCollapse = ref<boolean>(false);
function slideClickHandler(): void {
  isCollapse.value = !isCollapse.value;
  // emits('slide-click', isCollapse.value);
}

const TreeRef = ref<InstanceType<typeof ElTree>>();
function getRef() {
  return TreeRef.value;
}
// 暴露ref调用的方法 start
defineExpose({
  getRef: getRef,
});
// 暴露ref调用的方法 end
</script>

<style lang="scss" scoped>
:deep(.relative.el-space--vertical > .el-space__item) {
  width: 100%;
}
:deep(.el-card__body .el-space--vertical > .el-space__item) {
  width: 100%;
  .el-button {
    justify-content: start;
  }
}

.divided {
  border-top: 1px solid var(--el-border-color-lighter);
  margin-block: 6px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.toggle-arrow {
  position: absolute;
  top: 22px;
  left: -12px;
}
</style>