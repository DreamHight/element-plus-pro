import type { Ref } from 'vue';

export type UpdateModelValueFn<T> = (values: T[]) => void;
export type IDirection = 'horizontal' | 'vertical';

export interface ICheckCardGroupProps {
  readonly direction?: IDirection;
  readonly modelValue?: Ref<(string | number | boolean)[], (string | number | boolean)[]>;
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly multiple?: boolean;
  readonly updateModelValue?: UpdateModelValueFn;
}