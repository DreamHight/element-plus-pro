<template>
  <div
    class="serial-number"
    :class="[shape]"
    :style="getStyles"
  >{{ serialNumber }}</div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

const defaultTextColor: string = 'var(--vt-c-white)';
const defaultActiveColor: string = 'var(--vt-c-text-light-1)';
const defaultInactiveColor: string = 'var(--el-text-color-secondary)';

// defineProps and defineEmits start
const props = defineProps({
  startIndex: {
    type: Number,
    default: 1,
  },
  serialNumber: {
    type: Number,
    default: 1,
  },
  activeSerialNumber: {
    type: Number,
    default: 3,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (val: string) => {
      return ['default', 'background'].includes(val);
    }
  },
  activeColor: {
    type: Array as () => string[],
    default: () => {
      return [
        defaultActiveColor,
        defaultActiveColor,
        defaultActiveColor,
      ];
    },
  },
  inactiveColor: {
    type: String,
    default: defaultInactiveColor,
  },
  size: {
    type: [String, Number],
    default: 20,
  },
  shape: {
    type: String,
    default: 'circle',
    validator: (val: string) => {
      return ['circle', 'square'].includes(val);
    },
  },
});
// defineProps and defineEmits end

const getStyles = computed(() => {
  const { variant, size, serialNumber } = props;
  const styles: CSSProperties = {
    width: typeof(size) === 'number' ? `${size}px` : size,
    height: typeof(size) === 'number' ? `${size}px` : size,
    color: defaultTextColor,
    backgroundColor: getBackgroundColor(serialNumber),
  };
  return variant === 'default' ? {} : styles;
});

function getBackgroundColor(serialNumber: number): string {
  const { startIndex, activeSerialNumber, activeColor, inactiveColor } = props;
  let color: string = defaultActiveColor;
  if (serialNumber <= activeSerialNumber) {
    if (activeColor.length >= activeSerialNumber) {
      if (startIndex) {
        color = (activeColor[serialNumber - startIndex] ?? defaultActiveColor);
      } else {
        color = (activeColor[serialNumber] ?? defaultActiveColor);
      }
    }
  } else {
    color = inactiveColor;
  }
  return color;
}
</script>

<style lang="scss" scoped>
.serial-number {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.square {
  border-radius: var(--el-border-radius-base);
}
.circle {
  border-radius: var(--el-border-radius-circle);
}
</style>