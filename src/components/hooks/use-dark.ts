'use strict';

import { ref } from "vue";

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