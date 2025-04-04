'use strict';

import { ref } from "vue";

// 设置网站灰色模式
export const useGrayMode = () => {
  const grayModeClassName: string = 'grayscale-mode';
  const grayModeState = ref<boolean>(isGrayMode());

  function isGrayMode(): boolean {
    let isGray: boolean = false;
    for (const className of document.documentElement.classList) {
      isGray = className === grayModeClassName;
    }
    return isGray;
  }
  function setGrayMode(): void {
    document.documentElement.classList.add(grayModeClassName);
  }
  function removeGrayMode(): void {
    document.documentElement.classList.remove(grayModeClassName);
  }
  function toggleGrayMode(): void {
    if (isGrayMode()) {
      removeGrayMode();
    } else {
      setGrayMode();
    }
    grayModeState.value = isGrayMode();
  }

  return {
    grayModeState,
    setGrayMode,
    removeGrayMode,
    toggleGrayMode,
  }
}