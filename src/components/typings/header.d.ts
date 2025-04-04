import { type CSSProperties, type Component } from 'vue';
import type { IAsideBottom } from './aside';
import type { IBreadcrumbProps } from './breadcrumb';
import type { IHeaderAction } from './headerAction';
import type { ILogoProps } from './logo';
import type { IMenuProps } from './menu';
import type { IMessageDropdownProps, ITabPanel } from './messageDropdown';
import type { IDarkThemeProps } from './darkTheme';
import type { IFullScreenProps } from './fullScreen';
import type { ILanguageDropdownProps } from './languageDropdown';
import type { IMenuSearchProps } from './menuSearch';
import type { IUserDropdownProps } from './userDropdown';

export interface IHeaderProps {
  height?: string;
  headerStyles?: CSSProperties;
  sticky?: boolean;
  collapse?: boolean;

  logoProps?: ILogoProps;

  showHeaderMenu?: boolean;
  menuProps?: IMenuProps;
  breadcrumbProps?: IBreadcrumbProps;

  showMenuSearch?: boolean;
  menuSearchProps?: IMenuSearchProps;
  onMenuItemClick?: Function;

  headerActions?: IHeaderAction[];

  showDarkTheme?: boolean;
  darkThemeProps?: IDarkThemeProps;

  showFullScreen?: boolean;
  fullScreenProps?: IFullScreenProps;

  showMessage?: boolean;
  messageDropdownProps?: IMessageDropdownProps;
  messageDropdownList?: ITabPanel[];

  showLanguage?: boolean;
  languageDropdownProps?: ILanguageDropdownProps;
  languageDropdownMenu?: IAsideBottom[];

  showUserDropdown?: boolean;
  userDropdownProps?: IUserDropdownProps;
  userDropdownMenu?: IAsideBottom[];
}