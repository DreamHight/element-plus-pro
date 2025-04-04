import type { Component } from 'vue';
import type { AvatarProps, IconProps } from 'element-plus';
import type { IAsideBottomProps } from './asideBottom';
import type { IAsideTopProps } from './asideTop';
import type { IMenuProps } from './menu';

// 跨站点导航列表
export interface IAvatarProps {
  href?: string;
  name?: string;
  tooltip?: string;
  // fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  icon?: string | Component;
};
export type IAppList = IAvatarProps & Partial<AvatarProps> & IconProps;
// export type IAppList = IAvatarProps & Omit<AvatarProps, 'shape' | 'size' | 'fit'>;

// 站内点导航列表
export interface ISystemList {
  route: string;
  tooltip?: string;
  icon?: string | Component;
}

export interface IAsideProps {
  canHiddenXsOnly?: boolean;

  maxHeight?: string;

  showExtraAside?: boolean;
  // 跨站点导航列表
  appList?: IAppList[];
  // 站内点导航列表
  systemList?: ISystemList[];
  onAppListClick?: Function;
  onSystemListClick?: Function;

  showAsideTop?: boolean;
  asideTopProps?: IAsideTopProps;

  defaultWidth?: string;

  menuProps: IMenuProps;

  showAsideBottom?: boolean;
  asideBottomProps?: IAsideBottomProps;
}