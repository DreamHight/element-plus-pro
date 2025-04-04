export type IType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface IPulseDotProps {
  type: IType;
  dotColor?: string;
  showHalo?: boolean;
  haloColor?: string;
}