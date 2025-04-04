<template>
  <div class="box flex-between border-block-start-rgba">
    <el-space class="flex-1">
      <el-dropdown
        v-if="collapse"
        class="cursor-pointer"
        @command="commandHandler"
      >
        <el-badge
          v-if="showDotBadge"
          type="primary"
          is-dot
          :badge-style="badgeStyle"
        >
          <el-avatar :src="avatarSrc" />
        </el-badge>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, index) in dropdownMenu"
              :key="index"
              :command="item"
              :disabled="item.disabled"
              :divided="item.divided"
              :icon="item.icon"
            >
              {{ item.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div v-else>
        <el-badge
          v-if="showDotBadge"
          type="primary"
          is-dot
          :offset="[0, 4]"
          :badge-style="badgeStyle"
        >
          <el-avatar :src="avatarSrc" class="translate-y-4px">
            <span v-if="avatarContent">{{ avatarContent }}</span>
            <el-icon v-else :size="24">
              <IconUser />
            </el-icon>
          </el-avatar>
        </el-badge>
      </div>

      <el-space v-if="!collapse" direction="vertical" alignment="start">
        <div class="nick-name">{{ nickName }}</div>
        <div v-if="description" class="description">{{ description }}</div>
      </el-space>
    </el-space>

    <el-dropdown
      v-if="!collapse"
      class="flex-shrink-0 cursor-pointer"
      @command="commandHandler"
    >
      <el-icon class="rotate-z-90">
        <IconMoreFilled />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in dropdownMenu"
            :key="index"
            :command="item"
            :disabled="item.disabled"
            :divided="item.divided"
            :icon="item.icon"
          >
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import IconMoreFilled from '../icons/IconMoreFilled.vue';
import IconUser from '../icons/IconUser.vue';
import type { IAsideBottom } from '../typings/asideBottom';

// defineProps and defineEmits start
const props = defineProps({
  avatarSrc: {
    type: String,
    default: '',
  },
  avatarContent: {
    type: String,
    default: '',
  },
  showDotBadge: {
    type: Boolean,
    default: true,
  },
  badgeStyle: {
    type: String,
    default: 'width: 10px; height: 10px;',
  },
  nickName: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  dropdownMenu: {
    type: Array as () => IAsideBottom[],
    default: () => [],
  },
  collapse: {
    type: Boolean,
  },
});
const emits = defineEmits(['command'])
// defineProps and defineEmits end

function commandHandler(item: IAsideBottom): void {
  emits('command', item);
}
</script>

<style lang="scss" scoped>
:deep(.is-dot) {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid var(--el-color-primary);
    border-radius: 50%;
    animation: processing 1.2s ease-in-out infinite both;
  }
}
@keyframes processing {
  0%{
    transform: scale(0.8);
    opacity: 0.5;
  }
  100%{
    transform: scale(2.4);
    opacity: 0;
  }
}

.box {
  padding: 10px;

  .nick-name {
    font-size: 14px;
    line-height: 1;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
  .description {
    font-size: 12px;
    line-height: 1;
    color: var(--el-text-color-regular);
  }
}
</style>