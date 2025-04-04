import { type CSSProperties } from 'vue';
import type { IMenuItem } from './menu';

export interface ISuggestionItem {
  value: string;
  link: string;
  children?: IMenuItem[];
  isTitle?: boolean;
  linkParent?: string;
}

export interface IMenuSearchProps {
  canHiddenXsOnly?: boolean;

  showSearch?: boolean;
  searchStyles?: CSSProperties;
  searchPlaceholder?: string;
  pinyinSearch?: boolean;

  maxHeight?: string;

  historyList?: ISuggestionItem[];
  collectList?: ISuggestionItem[];

  menuTree: IMenuItem[];

  onItemClick?: Function;
}