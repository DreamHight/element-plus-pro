'use strict';

import { isRef, ref, toValue, type Ref } from "vue";

export interface UseToggleOptions<Truthy, Falsy> {
  truthyValue?: Truthy;
  falsyValue?: Falsy;
}

export const useToggle = (
  initialValue: boolean = false,
  options: UseToggleOptions<true, false> = {},
) => {
  const {
    truthyValue = true,
    falsyValue = false,
  } = options;

  const valueIsRef = isRef(initialValue);
  const _value = ref(initialValue) as Ref<boolean>;

  function toggle(value?: boolean) {
    // has arguments
    if (arguments.length) {
      _value.value = value!;
      return _value.value;
    } else {
      const truthy = toValue(truthyValue);
      _value.value = _value.value === truthy
        ? toValue(falsyValue)
        : truthy;
      return _value.value;
    }
  }

  if (valueIsRef)
    return toggle
  else
    return [_value, toggle] as const
}