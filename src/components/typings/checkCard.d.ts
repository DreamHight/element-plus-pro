import type { CSSProperties } from 'vue';

export type UpdateCheckStateFn = (values?: boolean) => void;

export interface ICheckCardProps {
  readonly bodyStyle?: string | CSSProperties;
  readonly modelValue?: string | number | boolean;
  readonly value?: string | number | boolean;
  readonly trueValue?: string | number;
  readonly falseValue?: string | number;
  readonly checked?: boolean;
  readonly border?: boolean;
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly resetCheckState?: UpdateCheckStateFn;
}