'use strict';

import { ref } from "vue";

// 内容复制
export const useClipboard = () => {
  const isSupported: boolean = !!navigator.clipboard;

  const copyContent = ref<string>(''),
    copied = ref<boolean>(false);

  async function copy(text: string): Promise<void> {
    copyContent.value = text;
    if (isSupported) {
      try {
        await navigator.clipboard.writeText(text);
        copied.value = true;
        console.log('Text copied to clipboard', copied.value);
      } catch (error: any) {
        console.error('Failed to copy: ', error);
      }
    }
  };

  return {
    isSupported,
    copyContent,
    copied,
    copy,
  }
}