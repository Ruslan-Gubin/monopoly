export function compose<T>(...funcs: Array<(arg: T) => T>): (arg: T) => T {
  return function(arg: T) {
    return funcs.reduceRight((acc, func) => func(acc), arg);
  };
}