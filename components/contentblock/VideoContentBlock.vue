<template>
  <div class="VideoContentBlock grid">
    <div
      :class="cssClasses"
      class="xs-col-1-1 xs-push-0"
    >
      <ContentblockHeadingTypeComponent
        class="heading col-1-1 no-p block-titel"
        :heading-type="content.seoHeadingtype"
        :title="content.titel"
      />
    </div>
    <div
      :class="cssClasses"
      class="col-1-1"
      data-aos="fade-up"
    >
      <div class="video-wrapper">
        <div
          v-show="isLoading"
          class="skeleton-loader"
        />
        <iframe
          width="100%"
          height="580px"
          :src="videoUrl"
          title="YouTube video player"
          frameborder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          @load="onVideoLoad"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<VideoContentBlock>,
    required: true,
  },
});
const cssClasses = computed(() => (props.content.weergave === 'small' ? 'col-8-12 push-2-12 sm-col-10-12 sm-push-1-12' : 'col-1-1'));
const isVimeo = computed(() => props.content.linkUrl.includes('vimeo.com'));
const videoUrl = computed(() => (isVimeo.value ? getValidVimdeoLink(props.content.linkUrl) : props.content.youtubeVimeoLink));

const isLoading = ref(true);

function getValidVimdeoLink(link: string): string {
  return link.replace('https://vimeo.com/', 'https://player.vimeo.com/video/');
}

function onVideoLoad() {
  isLoading.value = false;
}

setTimeout(() => {
  isLoading.value = false;
}, 800);
</script>

<style lang="scss" scoped>
.heading {
  margin-bottom: 5.6rem;
}

.block-titel {
  margin-left: -0.3rem;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.skeleton-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>
