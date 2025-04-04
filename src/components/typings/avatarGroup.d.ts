import type { AvatarProps } from 'element-plus';

export interface AvatarGroup {
  tooltip?: string;
  slotContent?: string;
}

export type IAvatarGroup = AvatarGroup & Partial<AvatarProps>;

export type ISize = 'circle' | 'square';
export type IShape = 'large' | 'default' | 'small';

export interface IAvatarGroupProps {
  avatarGroup: IAvatarGroup[]
  max?: number;
  size?: ISize;
  shape?: IShape;
  teleported?: boolean;
  autoExpand?: boolean;
}
