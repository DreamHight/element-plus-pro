import type {
  AutocompleteEmits,
  AutocompleteProps,
  CascaderEmits,
  CheckboxEmits,
  CheckboxProps,
  CheckboxGroupEmits,
  CheckboxGroupProps,
  ColorPickerEmits,
  ColorPickerProps,
  InputEmits,
  InputProps,
  InputNumberEmits,
  InputNumberProps,
  MentionEmits,
  MentionProps,
  RadioEmits,
  RadioProps,
  RadioGroupEmits,
  RadioGroupProps,
  RateProps,
  RateProps,
  SelectEmitFn,
  ISelectV2Props,
  SliderEmits,
  SliderProps,
  SwitchEmits,
  SwitchProps,
  TimeSelectProps
} from 'element-plus';

export type valueType = string | number | boolean | Array<any> | Object | null | undefined;
export type sizeType = 'large' | 'default' | 'small';
export interface IFieldOption {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
}
export type MixFieldOption = IFieldOption | Partial<CheckboxProps> | Partial<RadioProps>;

export type MixComponentProps =
  AutocompleteEmits | AutocompleteProps |
  CascaderEmits | CascaderProps |
  CheckboxEmits | CheckboxProps |
  CheckboxGroupEmits | CheckboxGroupProps |
  ColorPickerEmits | ColorPickerProps |
  InputEmits | InputProps |
  InputNumberEmits | InputNumberProps |
  MentionEmits | MentionProps |
  RadioEmits | RadioProps |
  RadioGroupEmits | RadioGroupProps |
  RateEmits | RateProps |
  SelectEmitFn | ISelectV2Props |
  SliderEmits | SliderProps |
  SwitchEmits | SwitchProps |
  TimeSelectProps;
export interface IFieldProps {
  componentType?: string;
  componentProps?: Partial<MixComponentProps>;
  initialValue?: string | number | boolean | Array | Object | null;
  valueEnum?: MixFieldOption[];
}