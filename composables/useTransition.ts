const transitionState = reactive({
  transitionState: 0,
});

export const useTransitionComposable = () => {
  const setTransitionState = (value: number) => {
    transitionState.transitionState = value;
  };

  return {
    transitionState,
    setTransitionState,
  };
};
