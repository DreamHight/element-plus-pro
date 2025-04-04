import type { IAsideBottom } from './aside';

export interface ILanguageDropdownProps {
  canHiddenXsOnly?: boolean;

  list?: IAsideBottom[];
  onCommand?: Function;
}