export function debounceFunc(func: Function, delay: number, context) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context);
    }, delay);
  }
}
