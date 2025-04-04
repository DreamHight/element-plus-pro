<template>
  <el-footer class="text-center">
    <div>
      <el-button type="info" link>{{ currentProductName }}</el-button>
      <el-button type="info" link>
        <IconGithub />
      </el-button>
      <el-button type="info" link>{{ originProductName }}</el-button>
    </div>
    <div>
      <span
        role="img"
        aria-label="copyright"
        style="vertical-align: -0.128em;margin-right:5px;"
      >
        <IconCopyright />
      </span>
      <span>{{ copyright }}</span>
    </div>
  </el-footer>
</template>

<script setup lang="ts">
import IconGithub from '../icons/IconGithub.vue';
import IconCopyright from '../icons/IconCopyright.vue';

// defineProps and defineEmits start
const props = defineProps({
  currentProductName: {
    type: String,
    default: 'Element Plus Pro',
  },
  originProductName: {
    type: String,
    default: 'Element Plus',
  },
  copyright: {
    type: String,
    default: 'Powered by Element Plus Pro',
  },
});
// defineProps and defineEmits end
</script>