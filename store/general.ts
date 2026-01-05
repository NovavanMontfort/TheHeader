export default defineStore('generalStore', () => {
  const loading = ref(false);
  const headerColor = ref('black');
  const onVisualBackground = ref(false);
  const lowStimulusActive = ref(false);
  const videosLoaded = ref(true);
  const recordedSize = ref('');


  function setLoading(value: boolean) {
    loading.value = value;
  }

  function setHeaderColor(value: string) {
    headerColor.value = value;
  }

  function setVideosLoaded(value: boolean) {
    videosLoaded.value = value;
  }

  function setLowStimulusActive(value: boolean) {
    lowStimulusActive.value = value;
  }

  function setRecordedSize(value: string) {
    recordedSize.value = value;
  }


  setTimeout(() => {
    setLoading(false);
  }, 0);

  return {
    loading,
    setLoading,
    headerColor,
    setHeaderColor,
    onVisualBackground,
    lowStimulusActive,
    videosLoaded,
    setLowStimulusActive,
    setVideosLoaded,
    recordedSize,
    setRecordedSize,
  };
});
