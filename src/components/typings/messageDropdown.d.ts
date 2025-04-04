import { type BadgeProps, type TagProps } from 'element-plus';

export type IBadgeProps = Partial<BadgeProps>;
export interface ITag {
  content: string;
}
export type ITagProps = ITag & Partial<TagProps>;

export interface IPanelItem {
  title: string;
  subTitle: string;
  avatar?: string;
  tag?: ITagProps | null;
}
export interface ITabPanel {
  label: string;
  count: string;
  name: string;
  delete: string;
  list: IPanelItem[];
}

export interface IMessageDropdownProps {
  canHiddenXsOnly?: boolean;

  badgeProps?: IBadgeProps;

  boxWidth?: string;
  maxHeight?: string;

  list: ITabPanel[];

  viewMore?: string;
}