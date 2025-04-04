import type { ButtonProps } from 'element-plus';

export interface ITableOperation {
  key: string;
  name: string;
  order?: number;
  hidden?: boolean;
  buttonProps?: Partial<ButtonProps>;
}

export type IMixType = 'default' | 'cover';
export type IOrderType = 'asc' | 'desc';
export type IMoreType = 'icon' | 'text';

export interface ITableOperationProps {
  operations?: ITableOperation[];
  showSpacer?: boolean;
  mixType?: IMixType;
  orderType?: IOrderType;
  moreType?: IMoreType;
  moreText?: string;
  moreButtonProps?: ButtonProps;
  max?: number;
  teleported?: boolean;
}