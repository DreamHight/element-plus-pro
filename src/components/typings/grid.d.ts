import type { Component, CSSProperties } from 'vue';
import type { ColProps, IconProps } from 'element-plus';

export interface GridItem {
  icon?: string | Component;
  name?: string;
  style?: String | CSSProperties;
}
export type IGridItem = GridItem & Partial<ColProps> & IconProps;

export interface IGridItemProps {
  item?: IGridItem;
  itemStyle?: String | CSSProperties;
  hoverShadow?: boolean;
}

export interface IGridProps {
  data: IGridItem[];
  bodyStyle?: String | CSSProperties;
  colStyle?: String | CSSProperties;
  itemStyle?: String | CSSProperties;
  draggable?: boolean;
  colProps?: ColProps;
}