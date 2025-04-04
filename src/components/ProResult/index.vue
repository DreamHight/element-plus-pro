<template>
  <el-result
    :title="result[type].title"
    :sub-title="result[type].subTitle"
  >
    <template #icon>
      <slot name="resultCustom">
        <template v-if="'success' === type">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="icon-success"
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
            ></path>
          </svg>
        </template>
        <template v-else-if="'error' === type">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="icon-error">
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
            ></path>
          </svg>
        </template>
        <template v-else-if="'warning' === type">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="icon-warning"
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"
            ></path>
          </svg>
        </template>
        <template v-else-if="'info' === type">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="icon-info"
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
            ></path>
          </svg>
        </template>
      </slot>
    </template>
    <template #extra>
      <el-button
        v-if="result[type].backText"
        type="primary"
        @click="turnBack"
      >
        {{ result[type].backText }}
      </el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { reactive, type PropType } from 'vue';
import type { IResult } from '../typings/result';

// defineProps and defineEmits start
const props = defineProps({
  type: {
    type: String,
    default: 'success',
  },
  customResult: {
    type: Object as PropType<IResult>,
    default: () => ({}),
  },
});
const emits = defineEmits(['turn-back']);
// defineProps and defineEmits end

const result = reactive<IResult>({
  'success': {
    icon: 'success',
    title: '提交成功',
    subTitle: '提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。',
    backText: '返回列表',
  },
  'error': {
    icon: 'error',
    title: '提交失败',
    subTitle: '请核对并修改以下信息后，再重新提交。',
    backText: '返回修改',
  },
  'warning': {
    icon: 'warning',
    title: '提交警告',
    subTitle: '请核对并以下信息是否有误。',
    backText: '返回',
  },
  'info': {
    icon: 'info',
    title: '提交信息',
    subTitle: '请核对以下信息是否需要修改。',
    backText: '返回修改',
  },
});

function turnBack(): void {
  emits('turn-back');
}

function assignOption(): void {
  const { customResult } = props;
  if (Object.prototype.toString.call(customResult) === '[object Object]') {
    Object.assign(result, customResult);
  }
}
assignOption();
</script>