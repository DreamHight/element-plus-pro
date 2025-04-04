<template>
  <el-space :spacer="showSpacer ? spacer : ''">
    <el-button
      v-for="(operation, index) in displayOperation"
      :key="index"
      link
      type="primary"
      v-bind="operation.buttonProps || {}"
      @click="commandHandler(operation)"
    >
      {{ operation.name }}
    </el-button>

    <el-dropdown
      v-if="ellipsis > 0"
      :teleported="teleported"
      @command="commandHandler"
    >
      <el-button
        v-if="moreType === 'icon'"
        :icon="IconMoreFilled"
        v-bind="moreButtonProps || {}"
      />
      <el-button
        v-else-if="moreType === 'text'"
        v-bind="moreButtonProps || {}"
      >
        <span>{{ moreText }}</span>
        <el-icon><IconArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(operation, index) in hiddenOperation"
            :key="index"
            :command="operation"
          >{{ operation.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-space>
</template>

<script setup lang="ts">
import { h, computed, reactive, type PropType } from 'vue';
import { ElDivider, type ButtonProps } from 'element-plus';
import IconArrowDown from '../icons/IconArrowDown.vue';
import IconMoreFilled from '../icons/IconMoreFilled.vue';
import type { ITableOperation } from '../typings/tableOperation';

// defineProps and defineEmits start
const props = defineProps({
  operations: {
    type: Array as () => ITableOperation[],
    default: () => [],
  },
  showSpacer: {
    type: Boolean,
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
  moreType: {
    type: String,
    default: 'icon',
    validator: (val: string) => {
      return ['icon', 'text'].includes(val);
    }
  },
  moreText: {
    type: String,
    default: '更多',
  },
  moreButtonProps: {
    type: Object as PropType<ButtonProps>,
    default: () => {
      return {
        link: true,
        type: 'primary',
      }
    }
  },
  max: {
    type: Number,
    default: 2,
  },
  teleported: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(['command']);
// defineProps and defineEmits end

const spacer = h(ElDivider, { direction: 'vertical' });

const operationsDefault: ITableOperation[] = [
  {
    key: 'detail',
    name: '详情',
    order: 0,
  },
  {
    key: 'edit',
    name: '编辑',
    order: 0,
  },
  {
    key: 'delete',
    name: '删除',
    order: 0,
    buttonProps: {
      type: 'danger',
    },
  },
];
const operationsMix = reactive<ITableOperation[]>([]);

function commandHandler(item: ITableOperation): void {
  emits('command', item);
}

const ellipsis = computed(() => {
  const { max } = props;
  return operationsMix.length - max;
});
const displayOperation = computed(() => {
  const { max } = props;
  return operationsMix.length < max ? operationsMix : operationsMix.slice(0, max);
});
const hiddenOperation = computed(() => {
  const { max } = props;
  return ellipsis.value > 0 ? operationsMix.slice(max, operationsMix.length) : [];
});

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
</script>

<style lang="scss" scoped>
:deep(.el-divider--vertical) {
  margin: 0;
}
</style>