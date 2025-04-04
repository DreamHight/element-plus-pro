<template>
  <el-card shadow="never">
    <el-space wrap>
      <CheckCard v-model="checkCardValue" style="background-color: #fff;">
        <el-space>
          <el-image style="width: 50px; height: 50px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <el-text>Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是, Vue 被设计为可以自底向上逐层应用。</el-text>
        </el-space>
      </CheckCard>
      <CheckCard v-model="checkCardToggleValue" true-value="on" false-value="off">
        <el-space>
          <el-image style="width: 50px; height: 50px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <el-text>Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是, Vue 被设计为可以自底向上逐层应用。</el-text>
        </el-space>
      </CheckCard>
      <CheckCard v-model="checkedCardValue">
        <el-space>
          <el-image style="width: 50px; height: 50px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <el-text>Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是, Vue 被设计为可以自底向上逐层应用。</el-text>
        </el-space>

        <template #icon>
          <el-icon color="var(--el-color-primary)"><Finished /></el-icon>
        </template>
      </CheckCard>
      <CheckCard checked readonly>
        <el-space>
          <el-image style="width: 50px; height: 50px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <el-text>Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是, Vue 被设计为可以自底向上逐层应用。</el-text>
        </el-space>
      </CheckCard>
      <CheckCard readonly>
        <el-space>
          <el-image style="width: 50px; height: 50px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <el-text>Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是, Vue 被设计为可以自底向上逐层应用。</el-text>
        </el-space>
      </CheckCard>
      <CheckCard disabled>
        <el-space>
          <el-image style="width: 50px; height: 50px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <el-text>Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是, Vue 被设计为可以自底向上逐层应用。</el-text>
        </el-space>
      </CheckCard>
    </el-space>

    <div style="margin-block: 20px;">
      <CheckCardGroup v-model="checkedCardGroupMultipleValue">
        <CheckCard value="Value1">
          <el-image
            style="display: block;width: 98px;height: 28px;"
            src="https://gw.alipayobjects.com/mdn/member_frontWeb/afts/img/A*oRlnSYAsgYQAAAAAAAAAAABkARQnAQ"
          />
        </CheckCard>
        <CheckCard value="Value2">
          <el-image
            style="display: block;width: 98px;height: 28px;"
            src="https://e.gitee.com/assets/images/wechatpay.png"
          />
        </CheckCard>
        <CheckCard value="Value3">
          <el-image
            style="display: block;width: 98px;height: 28px;"
            src="https://cn.unionpay.com/upowhtml/cn/resources/images/header/homepage-logo.png"
          />
        </CheckCard>
      </CheckCardGroup>
      <div>{{ checkedCardGroupMultipleValue }}</div>
    </div>

    <div style="margin-block: 20px;">
      <CheckCardGroup v-model="checkedCardGroupValue" :multiple="false">
        <CheckCard value="Value1">
          <el-image
            style="display: block;width: 98px;height: 28px;"
            src="https://gw.alipayobjects.com/mdn/member_frontWeb/afts/img/A*oRlnSYAsgYQAAAAAAAAAAABkARQnAQ"
          />
        </CheckCard>
        <CheckCard value="Value2">
          <el-image
            style="display: block;width: 98px;height: 28px;"
            src="https://e.gitee.com/assets/images/wechatpay.png"
          />
        </CheckCard>
        <CheckCard value="Value3">
          <el-image
            style="display: block;width: 98px;height: 28px;"
            src="https://cn.unionpay.com/upowhtml/cn/resources/images/header/homepage-logo.png"
          />
        </CheckCard>
      </CheckCardGroup>
      <div>{{ checkedCardGroupValue }}</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Finished } from '@element-plus/icons-vue';
import CheckCardGroup from '@/components/CheckCard/CheckCardGroup.vue';
import CheckCard from '@/components/CheckCard/CheckCard.vue';
import { ref, watch } from 'vue';

const checkCardValue = ref<boolean>(false);
const checkCardToggleValue = ref<string>('off');
const checkedCardValue = ref<boolean>(true);
const checkedCardGroupMultipleValue = ref<string[]>(['Value1']);
const checkedCardGroupValue = ref<string[]>(['Value1']);

watch(
  () => checkCardValue.value,
  (n, o) => {
    console.log('checkCardValue1', n, o);
  },
);
watch(
  () => checkCardToggleValue.value,
  (n, o) => {
    console.log('checkCardToggleValue2', n, o);
  },
);
watch(
  () => checkedCardGroupMultipleValue.value,
  (n, o) => {
    console.log('checkedCardGroupMultipleValue3', n, o);
  },
);
watch(
  () => checkedCardGroupValue.value,
  (n, o) => {
    console.log('checkedCardGroupValue4', n, o);
  },
);
</script>