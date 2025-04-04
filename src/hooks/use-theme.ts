'use strict';

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