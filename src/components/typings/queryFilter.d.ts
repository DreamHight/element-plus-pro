import { type CSSProperties, type Component } from 'vue';
import type { FormItemProps } from 'element-plus';
import { IFieldProps } from './field';

export interface ISeparator {
  component?: Component,
  componentType?: string,
  componentProps?: Object,
}

export interface IFormItemFieldProps {
  prop: string;
  label: string;
  labelSlot?: string;
  icon?: string | Component;
  subLabel?: string;
  subLabelSlot?: string;
  description?: string;
  descriptionSlot?: string;
  separator?: string | ISeparator | Component;
  colSpan?: number;
  fieldSlot?: boolean;
  formItemProps?: Partial<FormItemProps>;
  fieldProps?: IFieldProps;
  hidden?: boolean;
}

export type roundedType = 'none' | 'base' | 'small' | 'round' | 'circle';
export type operatePositionType = 'start' | 'center' | 'end';
export type modeType = 'write' | 'read';

export interface IQueryFilterProps {
  rounded?: roundedType;
  formStyles?: CSSProperties;
  mode?: modeType;

  formItemData: IFormItemFieldProps[];
  separator?: string;

  showToggle?: boolean;
  showOperate?: boolean;
  operatePosition?: operatePositionType;
  resetText?: string;
  submitText?: string;
  queryText?: string;
}