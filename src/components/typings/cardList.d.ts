import type { Component } from 'vue';

export interface IOperation {
  name: string;
  icon?: string | Component;
}

export interface ICardList {
  avatarSrc: string;
  title?: string;
  lineClamp?: string | number;
  description?: string;
  operations?: IOperation[];
}

export interface ICardListProps {
  shadow?: 'always' | 'never' | 'hover';
  isHover?: boolean;
  showAdd?: boolean;
  addText?: string;
  variant?: 'default' | 'card';
  data: ICardList;
}