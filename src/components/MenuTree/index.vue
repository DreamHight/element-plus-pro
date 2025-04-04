<template>
  <el-sub-menu
    v-if="hasChildren(data.children)"
    :index="data.index"
  >
    <template #title>
      <el-icon v-if="data.icon">
        <component :is="data.icon" />
      </el-icon>
      <MenuItem
        :menu-item="data"
        :menu-mode="menuMode"
        :collapse="collapse"
      />
    </template>
    <MenuTree
      v-for="item in data.children"
      :key="item.index"
      :data="item"
      @menu-item-click="menuItemClickHandler(item)"
    />
  </el-sub-menu>
  <template v-else>
    <el-menu-item-group v-if="hasGroup(data.group)">
      <template #title>{{ data.title }}</template>
      <el-menu-item
        v-for="item in data.group"
        :key="item.index"
        :index="item.index"
        :route="data.route"
        :disabled="data.disabled"
        :class="[
          {'border-right': 'border-right' === variant},
          {'border-left': 'border-left' === variant},
        ]"
        @click="menuItemClickHandler(item)"
      >
        <el-icon v-if="item.icon">
          <component :is="item.icon" />
        </el-icon>
        <template #title>
          <span>{{ collapse ? data.title : '' }}</span>
          <MenuItem
            :menu-item="item"
            :menu-mode="menuMode"
            :collapse="collapse"
          />
        </template>
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item
      v-else
      :index="data.index"
      :route="data.route"
      :disabled="data.disabled"
      :class="[
        {'border-right': 'border-right' === variant},
        {'border-left': 'border-left' === variant},
      ]"
      @click="menuItemClickHandler(data)"
    >
      <el-icon v-if="data.icon">
        <component :is="data.icon" />
      </el-icon>
      <template #title>
        <span>{{ collapse ? data.title : '' }}</span>
        <MenuItem
          :menu-item="data"
          :menu-mode="menuMode"
          :collapse="collapse"
        />
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import MenuTree from '@/components/MenuTree/index.vue';
import MenuItem from './MenuItem.vue';
import { computed, type PropType } from 'vue';
import type { IMenuItem } from '../typings/menu';

// defineProps and defineEmits start
const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<IMenuItem>,
  },
  variant: {
    type: String,
    default: 'border-right',
    validator: (val: string) => {
      return ['border-right', 'border-left'].includes(val);
    },
  },

  menuMode: {
    type: String,
    default: 'vertical',
    validator: (val: string) => {
      return ['horizontal', 'vertical'].includes(val);
    }
  },
  collapse: {
    type: Boolean,
  },
});
const emits = defineEmits([
  'menu-item-click',
]);
// defineProps and defineEmits end

// 判断当前菜单项是否有子菜单
const hasChildren = computed(() => {
  return (children?: IMenuItem[]) => {
    return children && children.length > 0;
  }
});
// 判断当前子菜单项是否有分组菜单
const hasGroup = computed(() => {
  return (group?: IMenuItem[]) => {
    return group && group.length > 0;
  }
});

function menuItemClickHandler(item: IMenuItem): void {
  emits('menu-item-click', item);
}
</script>

<style lang="scss" scoped>
:deep(.el-sub-menu__title) {
  height: 46px;
  margin-bottom: 4px;
}
.el-menu-item,
.el-sub-menu .el-menu-item {
  height: 40px;
  margin-bottom: 4px;
}
:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title),
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu-item {
  &.is-active {
    background-color: var(--el-color-primary-light-9);
    &.border-right {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: var(--el-color-primary);
      }
    }
    &.border-left {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: var(--el-color-primary);
      }
    }
  }
  &:hover {
    background-color: var(--el-color-primary-light-9) !important;
    color: var(--el-color-primary);
  }
}
:deep(.el-sub-menu__title),
.el-menu--vertical .el-menu-item {
  &.is-active {
    background-color: var(--el-color-primary-light-9);
    &.border-right {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: var(--el-color-primary);
      }
    }
    &.border-left {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: var(--el-color-primary);
      }
    }
  }
  &:hover {
    background-color: var(--el-color-primary-light-9) !important;
    color: var(--el-color-primary);
  }
}
</style>