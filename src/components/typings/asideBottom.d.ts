import type { Component } from 'vue';

export interface IAsideBottom {
  index: string;
  title: string;
  disabled?: boolean;
  divided?: boolean;
  icon?: string | Component;
}

export interface IAsideBottomProps {
  avatarSrc: string;
  avatarContent?: string;
  showDotBadge?: boolean;
  badgeStyle?: string;
  nickName: string;
  description?: string;
  dropdownMenu?: IAsideBottom[];
  collapse?: boolean;
  onCommand?: Function;
}