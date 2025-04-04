<template>
  <div class="avatar-group" :class="[{ 'avatar-group-box': autoExpand }]">
    <div
      v-for="(item, index) in displayAvatarGroup"
      :key="index"
      class="avatar-box"
      :class="[
        { 'margin-left': index > 0 },
      ]"
      @click="commandHandler(item)"
    >
      <el-tooltip
        v-if="item.tooltip"
        placement="top"
        :content="item.tooltip"
      >
        <el-avatar :size="size" :shape="shape" v-bind="item">
          <template #default>{{ item.slotContent }}</template>
        </el-avatar>
      </el-tooltip>
      <el-avatar v-else :size="size" :shape="shape" v-bind="item">
        <template #default>{{ item.slotContent }}</template>
      </el-avatar>
    </div>

    <el-dropdown
      v-if="ellipsis > 0"
      placement="top"
      :teleported="teleported"
      class="ellipsis-target margin-left"
    >
      <el-avatar :size="size" :shape="shape">
        <template #default>+{{ ellipsis }}</template>
      </el-avatar>

      <template #dropdown>
        <div
          class="dropdown-content avatar-group padding"
          :class="[{ 'avatar-group-box': autoExpand }]"
        >
          <div
            v-for="(item, index) in hiddenAvatarGroup"
            :key="index"
            class="avatar-box"
            :class="[
              { 'margin-left': index > 0 },
            ]"
            @click="commandHandler(item)"
          >
            <el-tooltip
              v-if="item.tooltip"
              placement="top"
              :content="item.tooltip"
            >
              <el-avatar :size="size" :shape="shape" v-bind="item">
                <template #default>{{ item.slotContent }}</template>
              </el-avatar>
            </el-tooltip>
            <el-avatar v-else :size="size" :shape="shape" v-bind="item">
              <template #default>{{ item.slotContent }}</template>
            </el-avatar>
          </div>
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IAvatarGroup } from '../typings/avatarGroup';

// defineProps and defineEmits start
const props = defineProps({
  avatarGroup: {
    type: Array as () => IAvatarGroup[],
    default: () => [],
  },
  max: {
    type: Number,
    default: 2,
  },
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => {
      return ['large', 'default', 'small'].includes(val);
    },
  },
  shape: {
    type: String,
    default: 'circle',
    validator: (val: string) => {
      return ['circle', 'square'].includes(val);
    },
  },
  teleported: {
    type: Boolean,
    default: true,
  },
  autoExpand: {
    type: Boolean,
  },
});
const emits = defineEmits(['command']);
// defineProps and defineEmits end

function commandHandler(item: IAvatarGroup): void {
  emits('command', item);
}

const ellipsis = computed(() => {
  const { avatarGroup, max } = props;
  return avatarGroup.length - max;
});
const displayAvatarGroup = computed(() => {
  const { avatarGroup, max } = props;
  return avatarGroup.length < max ? avatarGroup : avatarGroup.slice(0, max);
});
const hiddenAvatarGroup = computed(() => {
  const { avatarGroup, max } = props;
  return ellipsis.value > 0 ? avatarGroup.slice(max, avatarGroup.length) : [];
});
</script>

<style lang="scss" scoped>
.avatar-group-box {
  &:hover {
    .margin-left {
      margin-left: 0;
    }
  }
}

.dropdown-content {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.avatar-group {
  min-width: max-content;
  vertical-align: top;
  line-height: 1;
  font-size: 0;
  .avatar-box {
    position: relative;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    line-height: 1;
    font-size: 0;

    &:hover {
      z-index: var(--el-index-popper);
    }

    .el-avatar {
      border: 2px solid var(--el-bg-color);
    }
  }
}

.ellipsis-target {
  position: relative;
  z-index: var(--el-index-top);
  display: inline-block;
  vertical-align: text-top;
  cursor: pointer;
  font-size: 0;
  font-weight: bold;

  &.el-avatar {
    border: 2px solid var(--el-bg-color);
  }
}

.margin-left {
  margin-left: -10px;
  transition: all .3s ease;
}
.padding {
  padding: 10px;
}
</style>