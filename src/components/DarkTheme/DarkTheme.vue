<template>
  <div
    class="dark-theme"
    :class="[
      { 'hidden-xs-only': canHiddenXsOnly }
    ]"
    @click="toggleDarkTheme"
  >
    <el-tooltip :content="isDarkTheme ? '切换亮色模式' : '切换暗色模式'">
      <div>
        <el-icon v-if="isDarkTheme">
          <IconMoon />
        </el-icon>
        <el-icon v-else>
          <IconSunny />
        </el-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDarkTheme } from '../hooks';
import IconMoon from '../icons/IconMoon.vue';
import IconSunny from '../icons/IconSunny.vue';

// defineProps and defineEmits start
const props = defineProps({
  canHiddenXsOnly: {
    type: Boolean,
  },
});
// defineProps and defineEmits end

const isDarkTheme = ref<boolean>(false);
function toggleDarkTheme(): void {
  const { darkThemeState, toggleDarkTheme } = useDarkTheme();
  toggleDarkTheme();
  isDarkTheme.value = darkThemeState.value;
}
</script>

<style lang="scss" scoped>
.dark-theme {
  color: var(--el-menu-text-color);
  padding-left: 12px;
  padding-right: 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--el-border-color-extra-light);
  }
}
</style>