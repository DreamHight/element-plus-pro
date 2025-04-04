<template>
  <el-tooltip v-if="tooltip" placement="top" :content="isCopied ? '已复制' : '复制'">
    <span
      v-if="isCopied"
      class="cursor-pointer"
      :style="[
        { color: copiedColor },
        clipboardStyles,
        copiedStyles,
      ]"
    >
      <slot name="copied">
        <el-icon>
          <IconCheck />
        </el-icon>
      </slot>
    </span>
    <span
      v-else
      class="cursor-pointer"
      :style="[
        { color: copyColor },
        clipboardStyles,
        copyStyles,
      ]"
      @click="copyHandler"
    >
      <slot name="copy">
        <el-icon>
          <IconCopyDocument />
        </el-icon>
      </slot>
    </span>
  </el-tooltip>
  <span v-else>
    <span
      v-if="isCopied"
      class="cursor-pointer"
      :style="[
        { color: copiedColor },
        clipboardStyles,
        copiedStyles,
      ]"
    >
      <slot name="copied">
        <el-icon>
          <IconCheck />
        </el-icon>
      </slot>
    </span>
    <span
      v-else
      class="cursor-pointer"
      :style="[
        { color: copyColor },
        clipboardStyles,
        copyStyles,
      ]"
      @click="copyHandler"
    >
      <slot name="copy">
        <el-icon>
          <IconCopyDocument />
        </el-icon>
      </slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, type CSSProperties, type PropType } from 'vue';
import { useClipboard } from '../hooks/use-clipboard';
import IconCopyDocument from '../icons/IconCopyDocument.vue';
import IconCheck from '../icons/IconCheck.vue';

// defineProps and defineEmits start
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  tooltip: {
    type: Boolean,
    default: true,
  },
  resetTime: {
    type: Number,
    default: 2000,
  },
  clipboardStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  copiedColor: {
    type: String,
    default: 'var(--el-color-success)',
  },
  copiedStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  copyColor: {
    type: String,
    default: 'var(--el-color-primary)',
  },
  copyStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
});
// defineProps and defineEmits end

const isCopied = ref<boolean>(false);
async function copyHandler(): Promise<void> {
  const { text, resetTime } = props;

  const { copy, copied } = useClipboard();
  await copy(text);

  isCopied.value = copied.value;
  setTimeout(() => {
    isCopied.value = false;
  }, resetTime);
}
</script>