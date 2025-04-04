import type { CSSProperties } from 'vue';

export interface IClipboardProps {
  text: string;
  tooltip?: boolean;
  resetTime?: number;
  clipboardStyles?: CSSProperties;
  copiedColor?: string;
  copiedStyles?: CSSProperties;
  copyColor?: string;
  copyStyles?: CSSProperties;
}