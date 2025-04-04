import type { Component } from 'vue';
import type { MenuProps } from 'element-plus';
import type { ISuggestionItem } from './menuSearch';

export interface IMenuItem {
  index: string;
  title: string;
  id: string;
  parentId: string | null;
  route?: string;
  disabled?: boolean;
  fixed?: boolean;
  hideInMenu?: boolean;
  pinyin?: string;
  icon?: string | Component;
  children?: Array<IMenuItem>;
  group?: Array<IMenuItem>;
  componentType?: any;
  componentProps?: any;
  [key: string]: any;
}

export interface IMenu {
  showSearch?: boolean;
  pinyinSearch?: boolean;
  showCycleSort?: boolean;

  historyList?: ISuggestionItem[];
  collectList?: ISuggestionItem[];

  menuTree: IMenuItem[];
  onMenuItemClick?: Function;
  onMenuTreeItemClick?: Function;
}

export type IMenuProps = IMenu & Partial<MenuProps>;
