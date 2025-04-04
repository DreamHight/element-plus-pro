<template>
  <el-dropdown
    v-if="list.length"
    class="dropdown"
    :class="[
      { 'hidden-xs-only': canHiddenXsOnly }
    ]"
    @command="commandHandler"
  >
    <div class="flex-center">
      <el-avatar :src="avatar">
        <span v-if="avatarContent">{{ avatarContent }}</span>
        <el-icon v-else :size="24">
          <IconUser />
        </el-icon>
      </el-avatar>
      <el-text
        v-if="!collapse"
        class="ml-10px"
        :class="[
          { 'hidden-xs-only': canTextHiddenXsOnly }
        ]"
      >{{ nickName }}</el-text>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in list"
          :key="index"
          :command="item"
          :disabled="item.disabled"
          :divided="item.divided"
        >
          {{ item.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div v-else class="dropdown flex-center">
    <el-avatar :src="avatar">
      <span v-if="avatarContent">{{ avatarContent }}</span>
      <el-icon v-else :size="24">
        <IconUser />
      </el-icon>
    </el-avatar>
    <el-text
      v-if="!collapse"
      class="ml-10px"
      :class="[
        { 'hidden-xs-only': canTextHiddenXsOnly }
      ]"
    >{{ nickName }}</el-text>
  </div>
</template>

<script setup lang="ts">
import IconUser from '../icons/IconUser.vue';
import type { IAsideBottom } from '../typings/asideBottom';

// defineProps and defineEmits start
const props = defineProps({
  canHiddenXsOnly: {
    type: Boolean,
  },
  canTextHiddenXsOnly: {
    type: Boolean,
  },

  avatar: {
    type: String,
    default: '',
  },
  avatarContent: {
    type: String,
    default: '',
  },
  nickName: {
    type: String,
    default: '',
  },
  collapse: {
    type: Boolean,
  },

  list: {
    type: Array as () => IAsideBottom[],
    default: () => [],
  },
});
const emits = defineEmits(['command']);
// defineProps and defineEmits end

function commandHandler(item: IAsideBottom): void {
  emits('command', item);
}
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