'use strict';

import { ref } from "vue";

// 设置全屏模式
export const useFullScreen = () => {
  const fullScreenState = ref<boolean>(isFullScreen());

  function isFullScreen(): boolean {
    return !!getFullscreenElement() || window.innerHeight === window.screen.height;
  }
  function getFullscreenElement(): Element | null {
    const dom: Document = document;
    return dom.fullscreenElement ||
      (dom as any).webkitFullscreenElement ||
      (dom as any).mozFullScreenElement ||
      (dom as any).msFullscreenElement ||
      null;
  }
  async function enterFullScreen(
    el: HTMLElement = document.documentElement,
    options?: FullscreenOptions
  ): Promise<void> {
    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen(options);
      } else if ((el as any).webkitRequestFullScreen) {
        await (el as any).webkitRequestFullScreen();
      } else if ((el as any).mozRequestFullScreen) {
        await (el as any).mozRequestFullScreen();
      } else if ((el as any).msRequestFullscreen) {
        await (el as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('enterFullScreen', error);
    }
  }
  async function exitFullScreen(): Promise<void> {
    try {
      const dom: Document = document;
      if (dom.exitFullscreen) {
        await dom.exitFullscreen();
      } else if ((dom as any).webkitExitFullscreen) {
        await (dom as any).webkitExitFullscreen();
      } else if ((dom as any).mozCancelFullScreen) {
        await (dom as any).mozCancelFullScreen();
      } else if ((dom as any).msExitFullscreen) {
        await (dom as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('exitFullScreen', error);
    }
  }
  async function toggleFullScreen(
    el: HTMLElement = document.documentElement,
    options?: FullscreenOptions
  ): Promise<void> {
    if (isFullScreen()) {
      await exitFullScreen();
    } else {
      await enterFullScreen(el, options);
    }
    fullScreenState.value = isFullScreen();
  }

  return {
    fullScreenState,
    toggleFullScreen,
  }
}