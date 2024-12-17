/* eslint-disable @typescript-eslint/no-explicit-any */

export function debounce<Params extends (...args: any) => any>(callback: Params, delay = 300) {
  let timeout: number | undefined;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };

  // not working...
  // return function <U>(this: U, ...args: Parameters<typeof callback>) {
  //   clearTimeout(timeout);

  //   timeout = setTimeout(() => callback.apply(this, args), delay);
  // };
}
export function debounceLeading<Params extends (...args: any) => any>(
  callback: Params,
  delay = 300
) {
  let timeout: number | undefined;

  return (...args: any) => {
    if (!timeout) {
      callback(...args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => (timeout = undefined), delay);
  };
}
