import useGeneralStore from '@/store/general';

export const useVideosLoaded = () => {
  const generalStore = useGeneralStore();

  let checkTimeout: number | ReturnType<typeof setTimeout>;

  function onVideoLoaded() {
    setTimeout(() => {
      generalStore.setVideosLoaded(true);
      clearTimeout(checkTimeout);
    }, 1000);
  }

  function checkIfLoaded() {
    const video = document.querySelectorAll('.video-load')[0] as HTMLVideoElement;
    if (video && video.readyState >= 3) {
      onVideoLoaded();
    } else if (video) {
      checkTimeout = setTimeout(checkIfLoaded, 200);
    }
  }

  onMounted(() => {
    checkIfLoaded();
  });

  onUnmounted(() => {
    clearTimeout(checkTimeout);
  });

  return {
    onVideoLoaded,
  };
};
