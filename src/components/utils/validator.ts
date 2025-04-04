"use strict";

export function isFunction(val: any) {
  return 'function' === typeof val;
}

export function isNumber(val: any) {
  return /^\d+(\.\d+)?$/.test(val);
}

export function isString(val: unknown) {
  return 'string' === typeof val;
}

export function isBoolean(val: any) {
  return 'boolean' === typeof val;
}

export function isDef(val: any) {
  return val !== undefined && null !== val;
}
export function isNullOrEmpty(val: any) {
  return !!((null === val || '' === val || val === undefined));
}

export function isObj(val: any) {
  const type = typeof val;
  return null !== val && ('object' === type || 'function' === type);
}
export function isPlainObject(val: any) {
  return null !== val && 'object' === typeof val && !Array.isArray(val);
}