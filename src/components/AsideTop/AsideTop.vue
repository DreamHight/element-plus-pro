<template>
  <div
    v-if="collapse"
    class="mt-10px pb-10px text-center border-block-end-rgba"
  >
    <el-button
      type="primary"
      icon="Plus"
      plain
      circle
      @click="commandHandler"
    />
  </div>
  <div
    v-else
    class="border-block-end-rgba"
    style="
      padding: 14px 10px;
    "
  >
    <el-button
      class="w-full"
      type="primary"
      icon="Plus"
      link
      @click="commandHandler"
    >{{ buttonContent }}</el-button>
  </div>
</template>

<script setup lang="ts">
// defineProps and defineEmits start
const props = defineProps({
  buttonContent: {
    type: String,
    default: '新增菜单',
  },
  collapse: {
    type: Boolean,
  },
});
const emits = defineEmits(['command'])
// defineProps and defineEmits end

function commandHandler(): void {
  emits('command', props.collapse);
}
</script>