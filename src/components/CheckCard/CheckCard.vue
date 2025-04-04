<template>
  <div
    class="check-card"
    :class="{
      'is-bordered': border,
      'not-readonly': !readonlyMix && !disabledMix,
      'is-checked': isChecked,
      'is-disabled': disabledMix,
    }"
    :style="bodyStyle"
    role="check-card"
    aria-label="check-card"
    @click="changeHandler"
  >
    <slot />
    <div v-if="isChecked" class="arrow-box">
      <slot name="icon">
        <div class="arrow"></div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch, type CSSProperties } from 'vue';
import { CHECK_CARD_GROUP_KEY } from '../constants';
import type { ICheckCardGroupProps } from '../typings/checkCardGroup';

// defineProps and defineEmits start
const props = defineProps({
  bodyStyle: {
    type: [String, Object as () => CSSProperties],
    default: () => {
      return {
        padding: '10px',
      }
    },
  },
  modelValue: {
    type: [String, Number, Boolean],
  },
  value: {
    type: [String, Number, Boolean],
  },
  trueValue: {
    type: [String, Number],
  },
  falseValue: {
    type: [String, Number],
  },
  checked: {
    type: Boolean,
  },
  border: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
  },
  readonly: {
    type: Boolean,
  },
});
const emits = defineEmits([
  'update:modelValue',
  'change',
]);
// defineProps and defineEmits end

const getDefaultChecked = computed(() => {
  const { modelValue, trueValue, falseValue, checked } = props;
  return ((trueValue || falseValue) ? modelValue === trueValue : !!modelValue) || !!checked;
});
const isChecked = ref<boolean>(getDefaultChecked.value);
function changeHandler(): void {
  if (disabledMix.value || readonlyMix.value) {
    return;
  }

  if (isGroup.value) {
    const currentValue: (string | number | boolean)[] = [ ...(checkCardGroup.modelValue?.value ?? []) ];
    const { trueValue, value } = props;
    let val: string | number | boolean = trueValue ?? value ?? '';

    if (checkCardGroup.multiple) {
      isChecked.value = !isChecked.value;
    } else {
      isChecked.value = value === val;
    }

    // 如果在 Group 中，调用 Group 的 updateModelValue
    const index = currentValue.indexOf(val);
    if (val && index === -1 && isChecked.value) {
      currentValue.push(val);
    } else if (val && index > -1 && !isChecked.value) {
      currentValue.splice(index, 1);
    }
    checkCardGroup.updateModelValue(currentValue);
  } else {
    isChecked.value = !isChecked.value;
    const { trueValue, falseValue } = props;
    let val: string | number | boolean = falseValue ?? isChecked.value;
    if (isChecked.value) {
      val = trueValue ?? isChecked.value;
    }
    emits('change', val);
    emits('update:modelValue', val);
  }
}

const disabledMix = ref<boolean>(props.disabled);
const readonlyMix = ref<boolean>(props.readonly);

// 接收 checkCardGroup 注入的值
const checkCardGroup: ICheckCardGroupProps = inject<ICheckCardGroupProps>(CHECK_CARD_GROUP_KEY, {});
// 判断是否受 Group 控制
const isGroup = computed(() => !!Object.keys(checkCardGroup).length);
function injectGroupValue(): void {
  if (!isGroup.value) {
    return;
  }

  const { modelValue, disabled, readonly } = checkCardGroup;
  if (modelValue && Array.isArray(modelValue.value)) {
    isChecked.value = modelValue.value.includes(props.value ?? '');
  }
  if (!props.disabled && disabled) {
    disabledMix.value = disabled;
  }
  if (!props.readonly && readonly) {
    readonlyMix.value = readonly;
  }
}
injectGroupValue();
watch(
  () => checkCardGroup,
  () => {
    if (!checkCardGroup.multiple) {
      injectGroupValue();
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.check-card {
  position: relative;
  border-radius: var(--el-border-radius-base);
  box-sizing: border-box;
  cursor: pointer;

  &.is-bordered {
    border: var(--el-border-width) var(--el-border-style) var(--el-border-color);
  }

  &.not-readonly:hover {
    border-color: var(--el-color-primary);
  }

  &.is-checked {
    border-color: var(--el-color-primary);
  }

  &.is-disabled {
    border-color: var(--el-border-color-lighter);
    color: var(--el-text-color-placeholder);
    opacity: var(--el-popup-modal-opacity);
    cursor: not-allowed;
  }

  .arrow-box {
    position: absolute;
    top: 4px;
    right: 4px;
    .arrow {
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top-right-radius: var(--el-border-radius-small);
      border-top-color: var(--el-color-primary);
      border-right-color: var(--el-color-primary);
    }
  }
}
</style>