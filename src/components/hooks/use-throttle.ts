'use strict';

import { ref } from "vue";

// 节流函数
export const useThrottle = (callback: (...args: any[]) => any, delay: number = 100) => {
  let timerId = ref<NodeJS.Timeout | null>(null);

  function throttle(...args: any[]): void {
    if (!timerId.value) {
      timerId.value = setTimeout(() => {
        callback(...args);
        timerId.value = null;
      }, delay);
    }
  }

  function cancel(): void {
    if (timerId.value !== null) {
      clearTimeout(timerId.value);
      timerId.value = null;
    }
  }

  return {
    throttle,
    cancel,
  }
}