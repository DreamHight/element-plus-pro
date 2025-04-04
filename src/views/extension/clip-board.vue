<template>
  <el-card shadow="never">
    <div>
      <p>复制组件默认使用：</p>
      <ClipBoard text="复制组件默认使用" />
    </div>

    <div>
      <p>复制组件Icon的重置间隔时间：</p>
      <ClipBoard text="复制组件Icon的重置间隔时间" :reset-time="1000" />
    </div>

    <div>
      <p>复制组件不要tooltip：</p>
      <ClipBoard text="复制组件不要tooltip" :tooltip="false" />
    </div>

    <div>
      <p>复制组件改变Icon颜色：</p>
      <ClipBoard text="复制组件改变Icon颜色" :tooltip="false" copy-color="purple" copied-color="red" />
    </div>

    <div>
      <p>复制组件的插槽使用：</p>
      <ClipBoard text="复制组件的插槽使用">
        <template #copied>
          <el-icon><UserFilled /></el-icon>
        </template>
        <template #copy>
          <el-icon><User /></el-icon>
        </template>
      </ClipBoard>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import ClipBoard from '@/components/ClipBoard/ClipBoard.vue';
import { User, UserFilled } from '@element-plus/icons-vue';
</script>