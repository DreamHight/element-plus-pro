'use strict';

export const useTimeout = () => {
  let timeoutHandle: number = -1;
  const registerTimeout = (fn: (...args: any[]) => any, delay: number) => {
    cancelTimeout();
    timeoutHandle = window.setTimeout(fn, delay);
  };
  const cancelTimeout = () => window.clearTimeout(timeoutHandle);
  // core.tryOnScopeDispose(() => cancelTimeout());
  return {
    registerTimeout,
    cancelTimeout
  };
}