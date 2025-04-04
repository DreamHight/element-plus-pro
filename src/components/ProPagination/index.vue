<template>
  <div
    class="pagination-box"
    :class="['alignment-' + alignment]"
    :style="paginationStyles"
  >
    <el-pagination
      background
      :page-sizes="[10, 20, 50, 100, 300, 500]"
      layout="total, sizes, prev, pager, next, jumper"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties, PropType } from 'vue';

// defineProps and defineEmits start
const props = defineProps({
  paginationStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },

  alignment: {
    type: String,
    default: 'right',
    validator: (val: string) => {
      return ['left', 'center', 'right'].includes(val);
    }
  },
});
// defineProps and defineEmits end
</script>

<style lang="scss" scoped>
.pagination-box {
  display: flex;
  align-items: center;
}

.alignment-left {
  justify-content: flex-start;
}
.alignment-center {
  justify-content: center;
}
.alignment-right {
  justify-content: flex-end;
}
</style>