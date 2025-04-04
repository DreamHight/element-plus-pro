<template>
  <div
    class="check-card-group"
    :class="['direction--' + direction]"
    :style="[gapStyle]"
    role="group"
    aria-label="check-card-group"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';
import { CHECK_CARD_GROUP_KEY } from '../constants';
import type { ICheckCardGroupProps } from '../typings/checkCardGroup';

// defineProps and defineEmits start
const props = defineProps({
  direction: {
    type: String,
    default: 'horizontal',
    validator: (val: string) => {
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  size: {
    type: [Number, Array],
    default: 8,
  },

  modelValue: {
    type: Array as () => (string | number | boolean)[],
    default: () => [],
  },
  disabled: {
    type: Boolean,
  },
  readonly: {
    type: Boolean,
  },
  multiple: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits([
  'update:modelValue',
  'change',
]);
// defineProps and defineEmits end

const gapStyle = computed(() => {
  const { size, direction } = props;
  if (Array.isArray(size) && size.length === 2) {
    return {
      gap: `${size[0]}px ${size[1]}px`,
    }
  } else {
    if (direction === 'horizontal') {
      return {
        gap: `0 ${size}px`,
      }
    } else {
      return {
        gap: `${size}px 0`,
      }
    }
  }
});

const groupModelValue = ref<(string | number | boolean)[]>([ ...props.modelValue ]);
function updateModelValue(values: (string | number | boolean)[]): void {
  if (props.disabled) {
    return;
  }

  groupModelValue.value = [ ...values ];
  let val: (string | number | boolean)[] = [ ...values ];
  if (!props.multiple) {
    val = values.slice(-1);
    groupModelValue.value = val;
  }
  emits('update:modelValue', val);
  emits('change', val);
}

// 监听外部值变化
watch(
  () => props.modelValue,
  (newVal) => {
    groupModelValue.value = newVal;
  }
);

provide<ICheckCardGroupProps>(CHECK_CARD_GROUP_KEY, {
  modelValue: groupModelValue,
  disabled: props.disabled,
  readonly: props.readonly,
  multiple: props.multiple,
  updateModelValue,
});
</script>

<style lang="scss" scoped>
.check-card-group {
  display: inline-flex;
  align-items: center;

  &.direction--horizontal {
    flex-direction: row;
  }

  &.direction--vertical {
    flex-direction: column;
  }
}
</style>