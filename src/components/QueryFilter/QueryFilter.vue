<template>
  <el-form
    ref="FormRef"
    class="bg-white"
    :class="[
      'rounded-' + rounded,
    ]"
    :style="formStyles"
    :model="formData"
    :label-position="labelPosition"
    :label-width="labelWidth"
    v-bind="$attrs"
  >
    <el-row
      :gutter="20"
      class="w-full"
    >
      <el-col
        v-for="(item, index) in formItemData"
        :key="index"
        :class="{ 'display-none': showToggle && displayFormItem[item.prop] }"
        :span="colSpan"
        :xs="showToggle ? xs : colSpan"
        :sm="showToggle ? sm : colSpan"
        :md="showToggle ? md : colSpan"
        :lg="showToggle ? lg : colSpan"
        :xl="showToggle ? xl : colSpan"
      >
        <el-form-item
          :prop="item.prop"
          :label="item.label"
          v-bind="item.formItemProps || {}"
        >
          <template v-if="item.label || item.labelSlot" #label>
            <el-space :size="2">
              <el-icon v-if="item.icon">
                <component :is="item.icon" />
              </el-icon>

              <slot :name="item.labelSlot" :column="item">
                <span>{{ item.label }}</span>
              </slot>
              <slot :name="item.subLabelSlot" :column="item">
                <el-text v-if="item.subLabel" type="info" size="small">{{ item.subLabel }}</el-text>
              </slot>

              <span v-if="emptySeparator"></span>
              <span v-else-if="typeof(item.separator) === 'object'">
                <el-icon
                  v-if="item.separator && item.separator.componentType === 'icon'"
                  v-bind="item.separator.componentProps || {}"
                >
                  <component :is="item.separator.component" />
                </el-icon>
                <component
                  v-else
                  :is="item.separator.component"
                  v-bind="item.separator.componentProps || {}"
                />
              </span>
              <span v-else class="separator">
                {{ item.separator || separator }}
              </span>
            </el-space>
          </template>

          <ProField
            v-if="mode === 'write' && item.fieldSlot"
            :ref="(el: any) => setFieldRef(el, item, index)"
            v-model="formData[item.prop]"
            :componentProps="getComponentProps(item)"
            v-bind="item.fieldProps || {}"
          >
            <template
              v-for="(_slotContent, slotName) in slots"
              :key="slotName"
              #[slotName]="slotProps"
            >
              <slot :name="slotName" :column="item" v-bind="slotProps" />
            </template>
          </ProField>
          <ProField
            v-else-if="mode === 'write' && !item.fieldSlot"
            :ref="(el: any) => setFieldRef(el, item, index)"
            v-model="formData[item.prop]"
            :componentProps="getComponentProps(item)"
            v-bind="item.fieldProps || {}"
          />

          <el-text v-if="mode === 'read'">{{ formData[item.prop] }}</el-text>

          <slot :name="item.descriptionSlot" :column="item">
            <el-text
              class="leading-15px"
              type="info"
              size="small"
            >{{ item.description }}</el-text>
          </slot>
        </el-form-item>
      </el-col>

      <el-col
        v-if="showToggle"
        :span="colSpan"
        :xs="xs"
        :sm="sm"
        :md="md"
        :lg="lg"
        :xl="xl"
        :offset="toggleColOffset"
      >
        <el-form-item class="toggle-operate">
          <el-space>
            <el-button @click="resetFormHandler(FormRef)">{{ resetText }}</el-button>
            <el-button type="primary" :loading="submitLoading" @click="submitFormHandler(FormRef)">{{ queryText }}</el-button>

            <el-text
              v-if="showToggleBox"
              type="primary"
              class="cursor-pointer"
              @click="toggleHandler"
            >
              <span>{{ toggleValue ? '收起' : '展开' }}</span>
              <el-icon>
                <component :is="toggleValue ? IconArrowUp : IconArrowDown" />
              </el-icon>
            </el-text>
          </el-space>
        </el-form-item>
      </el-col>
    </el-row>

    <slot name="operate">
      <div
        v-if="showOperate"
        class="mt-20px mb-10px"
        :class="['flex-' + operatePosition]"
      >
        <el-space>
          <el-button
            size="default"
            :disabled="submitLoading"
            @click="resetFormHandler(FormRef)"
          >{{ resetText }}</el-button>
          <el-button
            size="default"
            type="primary"
            :loading="submitLoading"
            @click="submitFormHandler(FormRef)"
          >{{ submitText }}</el-button>
        </el-space>
      </div>
    </slot>
  </el-form>
</template>

<script setup lang="ts">
import { computed, h, onMounted, onUnmounted, reactive, ref, useAttrs, useSlots, watch, type CSSProperties, type PropType, type RendererElement, type RendererNode, type Slots, type VNode } from 'vue';
import ProField from '../ProField/index.vue'
import IconArrowDown from '../icons/IconArrowDown.vue';
import IconArrowUp from '../icons/IconArrowUp.vue';
import { ElIcon, type FormInstance } from 'element-plus';
import type { IFormItemFieldProps } from '../typings/queryFilter';
import type { MixComponentProps } from '../typings/field';

const attrs = useAttrs();
const slots: Slots = useSlots();

// defineProps and defineEmits start
const props = defineProps({
  rounded: {
    type: String,
    default: 'base',
    validator: (val: string) => {
      return ['none', 'base', 'small', 'round', 'circle'].includes(val);
    }
  },
  formStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => {
      return {
        padding: '18px 18px 0',
      }
    }
  },
  mode: {
    type: String,
    default: 'write',
    validator: (val: string) => {
      return ['write', 'read'].includes(val);
    },
  },

  formItemData: {
    type: Array as () => IFormItemFieldProps[],
    default: () => [],
  },
  separator: {
    type: String,
    default: ':',
  },
  span: {
    type: Number,
    default: 0,
  },

  showToggle: {
    type: Boolean,
  },
  showOperate: {
    type: Boolean,
    default: true,
  },
  operatePosition: {
    type: String,
    default: 'start',
    validator: (val: string) => {
      return ['start', 'center', 'end'].includes(val);
    }
  },
  resetText: {
    type: String,
    default: '重 置',
  },
  submitText: {
    type: String,
    default: '提 交',
  },
  queryText: {
    type: String,
    default: '查 询',
  },
});
const emits = defineEmits([
  'reset',
  'submit'
]);
// defineProps and defineEmits end

const fieldRefMap = reactive<Record<string, any>>({});
function setFieldRef(el: any, item: IFormItemFieldProps, index: number): void {
  fieldRefMap[`FieldRef${index}`] = { item, el };
}

const labelWidth = ref<number | string>(104);
function setLabelWidth(data: IFormItemFieldProps[]): void {
  const labelLenArr = data.map(item => (item.label ?? '').length);
  const max = Math.max(...labelLenArr);
  labelWidth.value = max * 18;
}
const labelPosition = ref<string>('right');
function setLabelPosition(): void {
  const lp: string | undefined = attrs.labelPosition as (string | undefined) || 'right';
  labelPosition.value = lp;
}
const emptySeparator = ref<boolean>(false);

const TOTAL_GRID: number = 24;
const xs: number = TOTAL_GRID,
  sm: number = 12,
  md: number = 12,
  lg: number = 8,
  xl: number = 6;
const colSpan = ref<number>(TOTAL_GRID);
const toggleColOffset = ref<number>(0);
function initColSpan(): void {
  if (attrs.inline) {
    colSpan.value = 8;
  }

  const { span } = props;
  if (span) {
    colSpan.value = span;
  }

  if (props.showToggle) {
    resizeChange();
  }
}

const toggleValue = ref<boolean>(false);
function toggleHandler(): void {
  toggleValue.value = !toggleValue.value;

  if (props.showToggle) {
    initFormItem(props.formItemData, toggleValue.value);
    resizeChange();
  }
}

const showToggleBox = computed(() => {
  const spanCount: number = TOTAL_GRID / colSpan.value;
  return props.formItemData.length > (spanCount - 1);
})

function initFormItem(data: IFormItemFieldProps[], toggle: boolean = false): void {
  const discuss: number = TOTAL_GRID / colSpan.value;
  const hideIndex: number = (discuss - 2) < 0 ? 0 : (discuss - 2);
  data.forEach((item, index) => {
    displayFormItem[item.prop] = toggle ? !toggle : index > hideIndex;
  });
}

const FormRef = ref<FormInstance>();
const formData = reactive<Record<string, any>>({});
const displayFormItem = reactive<Record<string, boolean>>({});
function clearFormData(): void {
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      delete formData[key];
    }
  }
}
function resetFormData(data: IFormItemFieldProps[]): void {
  if (!(Array.isArray(data) && data.length)) {
    clearFormData();
    return;
  }
  if (Object.keys(formData).length === 0) {
    return;
  }

  const keys: string[] = Object.keys(formData);
  const props: string[] = data.map(item => item.prop);

  // 设置新增的字段的值
  data.forEach(item => {
    if (!keys.includes(item.prop)) {
      formData[item.prop] = item.fieldProps ? (item.fieldProps.initialValue ?? null) : null;;
    }
  });
  // 删除已经过期没用的字段
  Object.keys(formData).forEach(key => {
    if (!props.includes(key)) {
      delete formData[key];
    }
  });
}
function initFormData(data: IFormItemFieldProps[]): void {
  if (!(Array.isArray(data) && data.length)) {
    clearFormData();
    return;
  }

  data.forEach(item => {
    formData[item.prop] = item.fieldProps
      ? (item.fieldProps.initialValue ?? null)
      : null;
  });
}

function getPlaceholder(item: IFormItemFieldProps): string {
  let placeholder: string = '';
  if (item.fieldProps) {
    const propsComponentType: string = item.fieldProps.componentType || '';
    const propsPlaceholder: string = item.fieldProps?.componentProps?.placeholder || '';
    placeholder = propsPlaceholder;
    if (['select', 'tree-select'].includes(propsComponentType)) {
      placeholder = propsPlaceholder || `请选择${item.label}`;
    } else {
      placeholder = propsPlaceholder || `请输入${item.label}`;
    }
  }
  return placeholder;
}
function getComponentProps(item: IFormItemFieldProps): MixComponentProps {
  let componentProps: Partial<MixComponentProps> = {};
  if (item.fieldProps) {
    const propsComponentType: string = item.fieldProps.componentType || '';
    componentProps = item.fieldProps.componentProps || {};
    if (!['radio', 'radio-group', 'rate', 'slider'].includes(propsComponentType)) {
      componentProps.placeholder = getPlaceholder(item);
    }
    if (!['input-number', 'radio', 'radio-group', 'rate', 'slider'].includes(propsComponentType)) {
      componentProps.clearable = true;
    }
  }
  return componentProps;
}

const submitLoading = ref<boolean>(false);
const componentTypes: string[] = [
  'tree-select',
  'checkbox',
  'radio',
  'color-picker',
  'slider',
  'date-picker',
  'datetime-picker',
  'time-picker',
  'time-select',
  'mention',
];
function resetFormHandler(formEl: FormInstance | undefined): void {
  if (!formEl) return;
  formEl.resetFields();

  let propsComponentType: string = '';
  Object.keys(fieldRefMap).forEach(key => {
    propsComponentType = fieldRefMap[key].item.fieldProps.componentType || '';
    if (componentTypes.includes(propsComponentType)) {
      fieldRefMap[key].el.resetField();
    }
  });

  emits('reset', formEl);
}
function submitFormHandler(formEl: FormInstance | undefined): void {
  console.log('submitHandler!', formEl, formData);
  console.log('fieldRefMap!', fieldRefMap);

  if (!formEl) return;
  submitLoading.value = true;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
      setTimeout(() => {
        submitLoading.value = false;
      }, 3000);
    } else {
      console.log('error submit!');
    }
    emits('submit', formEl, valid, formData);
  });
}

function getToggleColOffset(responsiveSpan: number): number {
  let result: number = 0;

  const totalGrid: number = TOTAL_GRID;
  const colCount: number = totalGrid / responsiveSpan;
  if (toggleValue.value) {
    const remainder: number = props.formItemData.length % colCount;
    if (remainder === 0) {
      result = totalGrid - responsiveSpan;
    } else {
      result = totalGrid - responsiveSpan * (remainder + 1);
    }
  } else {
    if (!showToggleBox.value) {
      result = responsiveSpan * (colCount - props.formItemData.length - 1);
    }
  }

  colSpan.value = responsiveSpan;

  initFormItem(props.formItemData, toggleValue.value);

  return result;
}
function resizeChange(): void {
  setLabelPosition();
  emptySeparator.value = false;
  if (window.innerWidth >= 1920) {
    toggleColOffset.value = getToggleColOffset(xl);
  } else if (window.innerWidth >= 1200) {
    toggleColOffset.value = getToggleColOffset(lg);
  } else if (window.innerWidth >= 992) {
    toggleColOffset.value = getToggleColOffset(md);
  } else if (window.innerWidth >= 768) {
    toggleColOffset.value = getToggleColOffset(sm);
  } else {
    labelPosition.value = 'top';
    emptySeparator.value = true;
    toggleColOffset.value = getToggleColOffset(xs);
  }
}

setLabelPosition();
setLabelWidth(props.formItemData);
initFormData(props.formItemData);
initColSpan();

watch(
  () => props.formItemData,
  (newVal) => {
    initFormItem(newVal);

    resetFormData(newVal);
  },
  {
    deep: true,
    immediate: true,
  },
);

onMounted(() => {
  if (props.showToggle) {
    // 监听resize变化
    window.addEventListener('resize', resizeChange);
  }
});

onUnmounted(() => {
  if (props.showToggle) {
    // 取消监听resize变化
    window.removeEventListener('resize', resizeChange);
  }
});

function getFormEl(): FormInstance | undefined {
  return FormRef.value;
}
function getFields(): Record<string, any> {
  return formData;
}
// 暴露ref调用的方法 start
defineExpose({
  getFormEl: getFormEl,
  getFields: getFields,
  onReset: resetFormHandler,
  onSubmit: submitFormHandler,
});
// 暴露ref调用的方法 end
</script>

<style lang="scss" scoped>
.display-none {
  display: none;
}
.el-row {
  overflow: hidden;
  transition: height var(--el-transition-duration) ease-in-out;

  :deep(.el-space__item:last-child) {
    flex-shrink: 0;
  }
}

.el-form-item {
  width: 100%;
  &.toggle-operate {
    :deep(.el-form-item__content) {
      justify-content: end;
    }
  }
}

.separator {
  position: relative;
  top: -1px;
}
</style>