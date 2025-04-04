import type { IAsideBottom } from './aside';

export interface IUserDropdownProps {
  canHiddenXsOnly?: boolean;
  canTextHiddenXsOnly?: boolean;

  avatar?: string;
  avatarContent?: string;
  nickName?: string;
  collapse?: boolean;

  list?: IAsideBottom[];
  onCommand?: Function;
}