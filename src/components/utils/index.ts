export function trim(val: string) {
  return val.replace(/(^\s*)|(\s*$)/g, "");
}