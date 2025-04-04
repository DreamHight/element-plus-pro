<template>
  <el-icon
    class="hidden-sm-and-up cursor-pointer"
    :size="size"
    @click="actionClickHandler"
  >
    <IconActionMenu />
  </el-icon>
</template>

<script setup lang="ts">
import IconActionMenu from '../icons/IconActionMenu.vue';

// defineProps and defineEmits start
const props = defineProps({
  size: {
    type: String,
    default: '32',
  },
});
const emits = defineEmits(['action-click']);
// defineProps and defineEmits end

function actionClickHandler(): void {
  emits('action-click');
}
</script>