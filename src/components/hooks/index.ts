'use strict';

// hooks/index.ts 是全局组件系统的钩子函数
import { ref } from 'vue';

// 设置主题颜色
export const useTheme = () => {
  // document.documentElement 是全局变量时
  const el: HTMLElement = document.documentElement

  // 获取 css 变量
  const currentThemeColor: string = getComputedStyle(el).getPropertyValue(`--el-color-primary`)

  // 设置 css 变量
  function setThemeColor(color: string) {
    el.style.setProperty('--el-color-primary', color)
  }

  return {
    currentThemeColor,
    setThemeColor,
  }
}

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

// 切换暗亮色模式
export const useDarkTheme = (darkClassName: string = 'dark') => {
  const darkThemeState = ref<boolean>(isDarkTheme());

  function isDarkTheme(): boolean {
    let isDark: boolean = false;
    for (const className of document.documentElement.classList) {
      isDark = className === darkClassName;
    }
    return isDark;
  }
  function setDarkTheme(): void {
    document.documentElement.classList.add(darkClassName);
  }
  function removeDarkTheme(): void {
    document.documentElement.classList.remove(darkClassName);
  }
  function toggleDarkTheme(): void {
    if (isDarkTheme()) {
      removeDarkTheme();
    } else {
      setDarkTheme();
    }
    darkThemeState.value = isDarkTheme();
  }

  return {
    darkThemeState,
    setDarkTheme,
    removeDarkTheme,
    toggleDarkTheme,
  }
}

// 网页复制
export const useClipboard = () => {
  const text = '';
  const copy = () => {};
  const isSupported = false;
  return {
    text,
    copy,
    isSupported
  }
}