<template>
  <div
    class="AutoplayVideoContentBlock"
    :class="cssClasses"
  >
    <div class="grid">
      <ContentblockHeadingTypeComponent
        class="heading col-1-1"
        :heading-type="content.seoHeadingtype"
        :title="content.titel"
      />
    </div>
    <div class="col-1-1">
      <div
        class="video-wrapper autoplay"
        :data-src="videoUrl"
      >
        <video
          :src="videoUrl"
          preload="auto"
          :autoplay="!lowStimulusActive"
          loop
          muted
          playsinline
          webkit-playsinline
        />
        <div
          v-if="!videoLoaded"
          class="skeleton-loader"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import useGeneralStore from '~/store/general';

const props = defineProps({
  content: {
    type: Object as PropType<AutoplayVideoContentBlock>,
    required: true,
  },
});

const generalStore = useGeneralStore();
const lowStimulusActive = computed(() => generalStore.lowStimulusActive);

const cssClasses = computed(() => (props.content.fullscreen ? '' : 'grid'));
const isVimeo = computed(() => props.content.mp4Url.includes('vimeo.com'));
const videoUrl = computed(() => (isVimeo.value ? getValidVimdeoLink(props.content.mp4Url) : ''));

const videoLoaded = ref(false);

function getValidVimdeoLink(link: string): string {
  return link.replace('https://vimeo.com/', 'https://player.vimeo.com/video/');
}

onMounted(() => {
  const videoElement = document.querySelector('video');
  if (videoElement) {
    if (videoElement.readyState >= 3) {
      videoLoaded.value = true;
    }
    videoElement.onloadeddata = () => {
      videoLoaded.value = true;
    };
  }
});

setTimeout(() => {
  videoLoaded.value = true;
}, 800);
</script>

<style lang="scss" scoped>
.heading {
  margin-bottom: 5.6rem;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  height: 0;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .skeleton-loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ccc;
    animation: pulse 1.5s infinite;
  }
}

@keyframes pulse {
  0% {
    background-color: #ccc;
  }
  50% {
    background-color: #ddd;
  }
  100% {
    background-color: #ccc;
  }
}
</style>
