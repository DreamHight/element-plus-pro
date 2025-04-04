import { type CSSProperties } from 'vue';

export interface ILogoProps {
  canHiddenXsOnly?: boolean;
  canTextHiddenXsOnly?: boolean;
  logoHeight?: string;
  showBottomBorder?: boolean;
  logoStyles?: CSSProperties;
  logoSrc: string;
  title?: string;
  width?: string;
  height?: string;
  collapse?: boolean;
}