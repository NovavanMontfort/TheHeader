export const debounce = (mainFunction: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      mainFunction();
    }, delay);
  };
};
