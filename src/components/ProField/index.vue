<template>
  <el-rate
    v-if="componentType === 'rate'"
    :model-value="modelValue"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-segmented
    v-else-if="componentType === 'segmented'"
    :model-value="modelValue"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-select
    v-else-if="componentType === 'select'"
    :model-value="modelValue"
    placeholder="请选择"
    @change="emitHandler"
    v-bind="componentProps"
  >
    <el-option
      v-for="(option, index) in valueEnum"
      :key="index"
      v-bind="option"
    />
  </el-select>
  <el-select-v2
    v-else-if="componentType === 'select-v2'"
    :model-value="modelValue"
    placeholder="请选择"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-cascader
    v-else-if="componentType === 'cascader'"
    class="w-full"
    :model-value="modelValue"
    placeholder="请选择"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-cascader-panel
    v-else-if="componentType === 'cascader-panel'"
    :model-value="modelValue"
    placeholder="请选择"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-tree-select
    v-else-if="componentType === 'tree-select'"
    v-model="staticValue"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-switch
    v-else-if="componentType === 'switch'"
    :model-value="modelValue"
    @change="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-switch>
  <el-checkbox-group
    v-else-if="componentType === 'checkbox-group'"
    :model-value="modelValue"
    @change="emitHandler"
    v-bind="componentProps"
  >
    <el-checkbox
      v-for="(option, index) in valueEnum"
      :key="index"
      v-bind="option"
    />
  </el-checkbox-group>
  <el-checkbox
    v-else-if="componentType === 'checkbox'"
    v-model="staticValue"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-radio-group
    v-else-if="componentType === 'radio-group'"
    :model-value="modelValue"
    @change="emitHandler"
    v-bind="componentProps"
  >
    <el-radio
      v-for="(option, index) in valueEnum"
      :key="index"
      v-bind="option"
    >{{ option.label }}</el-radio>
  </el-radio-group>
  <el-radio
    v-else-if="componentType === 'radio'"
    v-model="staticValue"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-color-picker
    v-else-if="componentType === 'color-picker'"
    v-model="staticValue"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-slider
    v-else-if="componentType === 'slider'"
    v-model="staticValue"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-date-picker
    v-else-if="componentType === 'date-picker'"
    style="width: 100%;"
    v-model="staticValue"
    value-format="YYYY-MM-DD"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-date-picker>
  <el-date-picker
    v-else-if="componentType === 'datetime-picker'"
    style="width: 100%;"
    v-model="staticValue"
    type="datetime"
    value-format="YYYY-MM-DD HH:mm:ss"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-date-picker>
  <el-time-picker
    v-else-if="componentType === 'time-picker'"
    style="width: 100%;"
    v-model="staticValue"
    value-format="HH:mm:ss"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-time-select
    v-else-if="componentType === 'time-select'"
    v-model="staticValue"
    @change="emitHandler"
    v-bind="componentProps"
  />
  <el-input
    v-else-if="componentType === 'textarea'"
    :model-value="modelValue"
    :rows="4"
    type="textarea"
    placeholder="请输入"
    @input="emitHandler"
    v-bind="componentProps"
  />
  <el-input
    v-else-if="componentType === 'password'"
    :model-value="modelValue"
    show-password
    type="password"
    placeholder="请输入"
    @input="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-input>
  <el-input
    v-else-if="componentType === 'input'"
    :model-value="modelValue"
    type="text"
    placeholder="请输入"
    @input="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-input>
  <el-input-number
    v-else-if="componentType === 'input-number'"
    class="w-full"
    :model-value="modelValue"
    placeholder="请输入"
    @change="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-input-number>
  <el-input-tag
    v-else-if="componentType === 'input-tag'"
    :model-value="modelValue"
    placeholder="请输入"
    @change="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-input-tag>
  <!-- <div v-else-if="componentType === 'select-input'">
    <el-input
      :model-value="modelValue"
      type="text"
      placeholder="请输入"
      @input="emitHandler"
      v-bind="componentProps"
    >
      <template #prepend>
        <el-select
          :model-value="modelValue"
          placeholder="请选择"
          @change="emitHandler"
          v-bind="componentProps"
        >
          <el-option
            v-for="(option, index) in valueEnum"
            :key="index"
            v-bind="option"
          />
        </el-select>
      </template>
      <template
        v-for="(_slotContent, slotName) in slots"
        :key="slotName"
        #[slotName]="slotProps"
      >
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </el-input>
  </div> -->
  <el-autocomplete
    v-else-if="componentType === 'autocomplete'"
    :model-value="modelValue"
    placeholder="请输入"
    @select="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-autocomplete>
  <el-mention
    v-else-if="componentType === 'mention'"
    v-model="staticValue"
    placeholder="请输入"
    @select="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-mention>
  <el-input
    v-else
    :model-value="modelValue"
    type="text"
    placeholder="请输入"
    @input="emitHandler"
    v-bind="componentProps"
  >
    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ref, useSlots, type PropType, type Slots } from 'vue';
import type { MixComponentProps, MixFieldOption, valueType } from '../typings/field';

const slots: Slots = useSlots();

// defineProps and defineEmits start
const props = defineProps({
  componentType: {
    type: String,
    default: 'input',
  },
  componentProps: {
    type: Object as PropType<MixComponentProps>,
    default: () => ({}),
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object, null],
    default: null,
  },
  initialValue: {
    type: [String, Number, Boolean, Array, Object, null],
    default: null,
  },
  valueEnum: {
    type: Array as () => MixFieldOption[],
    default: () => [],
  },
});
const emits = defineEmits([
  'update:modelValue',
]);
// defineProps and defineEmits end

const staticValue = ref<valueType>(null);
function resetHandler(): void {
  staticValue.value = null;
}

function emitHandler(value: any): void {
  let val: valueType = value;
  if (value && Object.prototype.toString.call(value) === '[object Object]') {
    val = value.value;
  }
  console.log('valuevalue11', value, val, staticValue.value);

  emits('update:modelValue', val);
}

// 暴露ref调用的方法 start
defineExpose({
  resetField: resetHandler,
});
// 暴露ref调用的方法 end
</script>