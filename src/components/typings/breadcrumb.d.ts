import type { BreadcrumbProps } from 'element-plus';
import { type CSSProperties, type Component } from 'vue';
import type { IMenuItem } from './menu';

export interface IBreadcrumbItem {
  title: string;
  to?: string;
  replace?: boolean;
  icon?: string | Component;
  disabled?: boolean;
  children?: IBreadcrumbItem[];
}

export interface IBreadcrumbProps {
  height?: string;
  showBottomBorder?: boolean;
  breadcrumbStyles?: CSSProperties;

  showHistory?: boolean;
  historyList?: IBreadcrumbItem[];
  menuTree?: IMenuItem[];

  activeRoute: string;
  list: IBreadcrumbItem[];

  breadcrumbProps?: BreadcrumbProps;

  onCommand?: Function;
}
