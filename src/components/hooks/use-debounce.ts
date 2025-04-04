'use strict';

import { ref } from "vue";

// 防抖函数
export const useDebounce = (callback: (...args: any[]) => any, delay: number = 100) => {
  let timerId = ref<NodeJS.Timeout | null>(null);

  function debounce(...args: any[]): void {
    cancel();
    timerId.value = setTimeout(() => {
      callback(...args);
    }, delay);
  }

  function cancel(): void {
    if (timerId.value !== null) {
      clearTimeout(timerId.value);
      timerId.value = null;
    }
  }

  return {
    debounce,
    cancel,
  }
}