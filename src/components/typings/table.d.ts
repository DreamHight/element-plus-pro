import type { Component, RendererElement, RendererNode, VNode } from 'vue';
import type {
  BadgeProps,
  FormItemProps,
  ProgressFn,
  ProgressProps,
  RateProps,
  TableColumnCtx,
  TagProps,
  ImageProps,
} from "element-plus";
import { IFormItemFieldProps, ISeparator } from './queryFilter';
import { IAvatarGroupProps } from './avatarGroupProps';
import { IFieldProps } from './field';
import { IPulseDotProps } from './pulseDot';
import type { ITableToolbarProps } from '../typings/tableToolbar';
import type { IPaginationProps } from '../typings/pagination';

export type RenderContentFn<T> = (row: T, column: TableColumnCtx<T>) => string;
export type RenderNodeFn<T> = (row: T, column: TableColumnCtx<T>) => VNode<RendererNode, RendererElement, {[key: string]: any;}>;
export type RenderStatusFn<T> = (row: T, column: TableColumnCtx<T>, index: number) => string;
export type RenderDotHalo<T> = (row: T, column: TableColumnCtx<T>, index: number) => boolean;

export interface IColumn {
  prop: string;
  label?: string;
  labelSlot?: string;
  icon?: string | Component;
  subLabel?: string;
  subLabelSlot?: string;
  description?: string;
  descriptionSlot?: string;
  separator?: string | ISeparator | Component;
  disabled?: boolean;

  hideInTable?: boolean;
  headerSlotName?: string;
  columnSlotName?: string;
  columnProps?: any; //TableColumnCtx<any>;

  copyable?: boolean;

  progressSlotProps?: Partial<ProgressProps>;
  renderProgressStatus?: RenderStatusFn;

  rateSlotProps?: Partial<RateProps>;

  tagSlotProps?: Partial<TagProps>;
  renderTagStatus?: RenderStatusFn;

  badgeSlotProps?: Partial<BadgeProps>;
  renderBadgeStatus?: RenderStatusFn;

  dotSlotProps?: Partial<IPulseDotProps>;
  renderDotStatus?: RenderStatusFn;
  renderDotHalo?: RenderDotHalo;

  avatarGroupSlotProps?: Partial<IAvatarGroupProps>;

  imageSlotProps?: Partial<ImageProps>;

  renderContent?: RenderContentFn;
  render?: RenderNodeFn;

  formItemProps?: Partial<FormItemProps>;
  showInSearch?: boolean;
  searchFieldProps?: IFieldProps;
}

export type roundedType = 'none' | 'base' | 'small' | 'round' | 'circle';
export type paginationPositionType = 'bottom' | 'top' | 'both';

export interface IProTableProps {
  rounded?: roundedType;

  toolbarProps?: ITableToolbarProps;

  showAlert?: boolean;

  columns: IColumn[];
  data: any[];

  paginationPosition?: paginationPositionType;
  paginationSticky?: boolean;
  paginationProps?: IPaginationProps;
}