<template>
  <div
    v-if="hasTooltip"
    class="full-screen"
    :class="[
      { 'hidden-xs-only': canHiddenXsOnly },
    ]"
    @click="toggleScreen"
  >
    <el-tooltip :content="isFullScreen ? '还原' : '全屏'">
      <div>
        <el-icon v-if="isFullScreen">
          <IconExitFullScreen />
        </el-icon>
        <el-icon v-else>
          <IconFullScreen />
        </el-icon>
      </div>
    </el-tooltip>
  </div>
  <el-icon
    v-else
    class="cursor-pointer"
    :size="size"
    :color="color"
    @click="toggleScreen"
  >
    <component :is="isFullScreen ? IconCancelMaximize : IconMaximize" />
  </el-icon>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type PropType } from 'vue';
import { useFullScreen } from '../hooks';
import IconFullScreen from '../icons/IconFullScreen.vue';
import IconExitFullScreen from '../icons/IconExitFullScreen.vue';
import IconMaximize from '@/components/icons/IconMaximize.vue';
import IconCancelMaximize from '@/components/icons/IconCancelMaximize.vue';

// defineProps and defineEmits start
const props = defineProps({
  canHiddenXsOnly: {
    type: Boolean,
  },

  el: {
    type: Object as PropType<HTMLElement>,
    default: () => {
      return document.documentElement;
    }
  },

  hasTooltip: {
    type: Boolean,
    default: true,
  },

  size: {
    type: [Number, String],
    default: 20,
  },
  color: {
    type: String,
    default: 'var(--el-menu-text-color)',
  },
});
const emits = defineEmits(['change']);
// defineProps and defineEmits end

const isFullScreen = ref<boolean>(false);
function toggleScreen(): void {
  const { toggleFullScreen } = useFullScreen();
  toggleFullScreen(props.el);
}

function fullScreenChange(): void {
  const { fullScreenState } = useFullScreen();
  isFullScreen.value = fullScreenState.value;
  emits('change', isFullScreen.value);
}

// 全屏状态一致性问题， 解决 F11 按键和调用 API 的不一致问题
// window.addEventListener('keydown', async (e): Promise<void> => {
//   if (e.code === 'F11') {
//     e.preventDefault();
//     await toggleFullScreen();
//   }
// });

onMounted(() => {
  // 监听全屏状态变化
  window.addEventListener('fullscreenchange', fullScreenChange);
  window.addEventListener("mozfullscreenchange", fullScreenChange);
  window.addEventListener("webkitfullscreenchange", fullScreenChange);
  window.addEventListener("msfullscreenchange", fullScreenChange);
});

onUnmounted(() => {
  // 取消监听全屏状态变化
  window.removeEventListener('fullscreenchange', fullScreenChange);
  window.removeEventListener("mozfullscreenchange", fullScreenChange);
  window.removeEventListener("webkitfullscreenchange", fullScreenChange);
  window.removeEventListener("msfullscreenchange", fullScreenChange);
});
</script>

<style lang="scss" scoped>
.full-screen {
  color: var(--el-menu-text-color);
  padding-left: 12px;
  padding-right: 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--el-border-color-extra-light);
  }
}
</style>