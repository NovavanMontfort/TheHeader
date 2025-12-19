import useGeneralStore from '~/store/general';
const SIZES_MAP: Record<string, number> = {
  xs: 600,
  sm: 1024,
  md: 1440,
  lg: 1920,
  xl: 4000,
};

export function useIsMobile() {
  const generalStore = useGeneralStore();
  const isMobile = ref(false);
  const isSmSize = ref(false);

  if (typeof window !== 'undefined') {
    onBeforeMount(() => {
      window.addEventListener('resize', onResize);
      onResize();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });
  }

  function onResize() {
    if (typeof window === 'undefined') return;

    const windowWidth = window.innerWidth;

    const size = Object.keys(SIZES_MAP).find((key) => windowWidth < SIZES_MAP[key] || key === 'xl') || 'xl';
    isMobile.value = window.innerWidth < 600;
    isSmSize.value = window.innerWidth < 768;
    generalStore.setRecordedSize(size);
  }

  return {
    isMobile,
    isSmSize,
  };
}
