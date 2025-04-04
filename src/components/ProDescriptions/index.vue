<template>
  <el-descriptions v-bind="descriptionsProps">
    <el-descriptions-item
      v-for="(item, index) in list"
      :key="index"
      v-bind="item"
    >
      <template #label>
        <el-space :size="2">
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>

          <slot :name="item.labelSlot" :column="item">
            <span :style="[item.labelStyles || {}]">{{ item.label }}</span>
          </slot>

          <span v-if="typeof(item.separator) === 'object'" style="line-height: 2px;">
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
          <!-- <el-icon
            v-if="item.separator && item.separator.componentType === 'icon'"
            v-bind="item.separator.componentProps || {}"
          >
            <component :is="item.separator.component" />
          </el-icon>
          <component
            v-else-if="item.separator && typeof(item.separator) === 'object'"
            :is="item.separator.component"
            v-bind="item.separator.componentProps || {}"
          />
          <span v-else class="separator">
            {{ item.separator || separator }}
          </span> -->
        </el-space>
      </template>

      <component
        v-if="item.value && item.value.component"
        :is="item.value.component"
        v-bind="item.value.componentProps || {}"
      >{{ item.value.componentProps.content }}</component>
      <span v-else>
        <slot :name="item.valueSlot" :column="item">
          {{ item.value }}
        </slot>
      </span>
    </el-descriptions-item>

    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-descriptions>
</template>

<script setup lang="ts">
import { useSlots, type PropType, type Slots } from 'vue';
import type { DescriptionProps } from 'element-plus';
import type { IDescriptionItemProps } from '../typings/descriptions';

const slots: Slots = useSlots();

// defineProps and defineEmits start
const props = defineProps({
  descriptionsProps: {
    type: Object as PropType<Partial<DescriptionProps>>,
    default: () => [],
  },

  list: {
    type: Array as () => IDescriptionItemProps[],
    default: () => [],
  },

  separator: {
    type: String,
    default: ':',
  },
});
// defineProps and defineEmits end
</script>

<style lang="scss" scoped>
:deep(.el-descriptions__body) {
  background-color: transparent;
}
.separator {
  position: relative;
  top: -1px;
}
</style>