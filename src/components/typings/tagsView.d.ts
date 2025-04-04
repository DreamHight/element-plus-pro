import { type CSSProperties } from 'vue';
import type { TagProps } from 'element-plus';
import type { IMenuItem } from './menu';

export type VariantType = 'tag-light' | 'check-tag' | 'button-plain' | 'border-bottom' | 'chrome-tag' | 'safari-tag';

export interface ITagsViewProps {
  variant?: VariantType;

  showBottomBorder?: boolean;
  tagsViewStyles?: CSSProperties;
  boxHeight?: number;
  space?: number;
  shadow?: boolean;
  stretch?: boolean;
  strimSpacer?: boolean;

  menuTree?: IMenuItem[];

  activeRoute: string;
  list: IMenuItem[];
  showPulseDot?: boolean;
  showIcon?: boolean;

  showOperateMenu?: boolean;
  showMaximize?: boolean;

  // onCommand?: Function;
}