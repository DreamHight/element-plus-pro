import { type Component, type CSSProperties } from 'vue';
import type { DescriptionItem } from 'element-plus';

export interface IDescriptionItemSlot {
  component?: Component,
  componentType?: string,
  componentProps?: Object,
}
export interface IDescriptionItem {
  prop: string;
  labelStyles?: CSSProperties;
  labelSlot?: string;
  value: any;
  valueSlot?: string;
  icon?: string | Component;
  separator?: string | IDescriptionItemSlot | Component;
};

export type IDescriptionItemProps = IDescriptionItem & Partial<DescriptionItem>;