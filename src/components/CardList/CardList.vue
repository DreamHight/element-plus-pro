<template>
  <el-card
    v-if="showAdd"
    class="add-card"
    body-style="height: 100%;"
    :shadow="shadow"
    @click="addHandler"
  >
    <el-space class="title">
      <el-icon><IconPlus /></el-icon>
      <span>{{ addText }}</span>
    </el-space>
  </el-card>

  <el-space
    v-else-if="variant === 'default'"
    class="space-box"
    :class="{ 'hover-box': isHover }"
    alignment="start"
    :size="14"
  >
    <el-avatar :src="data.avatarSrc"></el-avatar>
    <div>
      <p class="title">{{ data.title }}</p>
      <el-text :line-clamp="data.lineClamp || 3">
        {{ data.description }}
      </el-text>
    </div>
  </el-space>

  <el-card v-else :shadow="shadow">
    <el-space
      class="space-box"
      :class="{ 'hover-box': isHover }"
      alignment="start"
      :size="14"
    >
      <el-avatar :src="data.avatarSrc"></el-avatar>
      <div>
        <p class="title">{{ data.title }}</p>
        <el-text :line-clamp="data.lineClamp || 3">
          {{ data.description }}
        </el-text>
      </div>
    </el-space>

    <template v-if="data.operations && data.operations.length" #footer>
      <el-space :spacer="spacer" class="space-footer">
        <el-button
          v-for="(item, index) in data.operations"
          :key="index"
          link
          :icon="item.icon"
          @click="operateClickHandler(item, index)"
        >{{ item.name }}</el-button>
      </el-space>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { h, type PropType } from 'vue';
import { ElDivider } from 'element-plus';
import type { ICardList, IOperation } from '@/components/typings/cardList';
import IconPlus from '../icons/IconPlus.vue';

// defineProps and defineEmits start
const props = defineProps({
  shadow: {
    type: String,
    default: 'hover',
  },
  isHover: {
    type: Boolean,
    default: true,
  },
  showAdd: {
    type: Boolean,
  },
  addText: {
    type: String,
    default: '新增产品',
  },
  variant: {
    type: String,
    default: 'card',
    validator: (val: string) => {
      return ['default', 'card'].includes(val);
    }
  },
  data: {
    type: Object as PropType<ICardList>,
    default: () => ({}),
  },
});
const emits = defineEmits([
  'add',
  'operate-click',
]);
// defineProps and defineEmits end

const spacer = h(ElDivider, { direction: 'vertical' });
function addHandler(): void {
  emits('add');
}
function operateClickHandler(item: IOperation, index: number): void {
  emits('operate-click', item, index);
}
</script>

<style lang="scss" scoped>
.add-card {
  border: 1px dashed var(--el-border-color-light);
  .title {
    width: 100%;
    height: 100%;
    justify-content: center;
    color: var(--el-text-color-regular);
    font-size: var(--el-font-size-base);
  }
  &:hover {
    border: 1px dashed var(--el-color-primary);
    .title {
      color: var(--el-color-primary);
    }
  }
}

.space-box {
  :deep(.el-space__item:first-child) {
    width: auto;
  }
  &.hover-box {
    &:hover {
      .title {
        color: var(--el-color-primary);
      }
    }
  }
}

.el-card {
  height: 100%;
  cursor: pointer;

  .title {
    font-weight: bold;
  }

  :deep(.el-card__footer) {
    padding: 12px;
    .space-footer {
      width: 100%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
        color: transparent;
      }
      .el-space__item {
        width: 100%;
      }
    }

    .el-button.is-link {
      &:hover {
        color: var(--el-button-hover-text-color);
      }
    }
  }
}
</style>