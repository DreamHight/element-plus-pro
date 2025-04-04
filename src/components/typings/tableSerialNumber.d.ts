export type IVariant = 'default' | 'background';
export type IShape = 'circle' | 'square';

export interface ITableSerialNumberProps {
  startIndex?: number;
  serialNumber?: number;
  activeSerialNumber?: number;
  variant?: IVariant;
  activeColor?: string[];
  inactiveColor?: string;
  size?: string | number;
  shape?: IShape;
}