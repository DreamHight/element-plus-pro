<template>
  <div>
    <el-space
      class="w-full cursor-pointer"
      :class="[
        { 'hidden-xs-only': canHiddenXsOnly },
        { 'border-block-end-rgba': showBottomBorder },
        'justify-' + alignment,
      ]"
      :style="[
        { height: logoHeight },
        logoStyles,
      ]"
      @click="clickHandler"
    >
      <slot name="logo">
        <el-image
          :src="logoSrc"
          :style="{ width: width, height: height }"
        >
          <template #error>
            <IconPicture />
          </template>
        </el-image>
      </slot>

      <h1
        v-if="!collapse"
        class="title font-bold"
        :class="[
          { 'hidden-xs-only': canTextHiddenXsOnly }
        ]"
      >{{ title }}</h1>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, type PropType } from 'vue';
import IconPicture from '../icons/IconPicture.vue';

// defineProps and defineEmits start
const props = defineProps({
  canHiddenXsOnly: {
    type: Boolean,
  },
  canTextHiddenXsOnly: {
    type: Boolean,
  },

  logoHeight: {
    type: String,
    default: '60px',
  },
  showBottomBorder: {
    type: Boolean,
  },
  alignment: {
    type: String,
    default: 'center',
    validator: (val: string) => {
      return ['start', 'center', 'end'].includes(val);
    },
  },
  logoStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },

  logoSrc: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '32px',
  },
  height: {
    type: String,
    default: '32px',
  },

  title: {
    type: String,
    default: '',
  },

  collapse: {
    type: Boolean,
  },
});
const emits = defineEmits(['click']);
// defineProps and defineEmits end

function clickHandler(): void {
  emits('click');
}
</script>

<style lang="scss" scoped>
.title {
  color: var(--el-text-color-primary);
}
</style>