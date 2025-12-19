<template>
  <div class="HomepageHeaderContentBlock contentblock-HomepageHeader">
    <div class="grid">
      <div class="header-content col-1-1">
        <ContentblockHeadingTypeComponent
          v-if="content.titel"
          :heading-type="content.seoHeadingtype"
          :title="content.titel"
          class="title"
        />

        <NuxtLink
          v-if="content.knop1.name"
          :to="content.knop1.link"
          :target="content.knop1.target"
          class="btn btn-secondary header-button"
        >
          {{ content.knop1.name }}
        </NuxtLink>
      </div>
    </div>
    <div class="header-visual">
      <video
        v-if="content.videoUrl"
        :src="content.videoUrl"
        muted="true"
        loop
        :autoplay="!lowStimulusActive"
        playsinline
        class="video-load"
        @canplaythrough="onVideoLoaded"
      />

      <ImageComponent
        v-else-if="content.afbeelding"
        class="header-image"
        :media-id="content.afbeelding"
        :sizes="{ xs: 450, sm: 700, md: 1000, lg: 1200 }"
        alt="Header image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import useGeneralStore from '@/store/general';
const generalStore = useGeneralStore();

const props = defineProps({
  content: {
    type: Object as PropType<HomepageHeaderContentBlock>,
    required: true,
  },
});

if (props.content.videoUrl) {
  generalStore.setVideosLoaded(false);
}

const lowStimulusActive = computed(() => generalStore.lowStimulusActive);

const { onVideoLoaded } = useVideosLoaded();
</script>

<style lang="scss" scoped>
.HomepageHeaderContentBlock {
  width: 100%;
  position: relative;
  padding: 0 !important;
  display: block;
  overflow: hidden;
  background-color: $black;
  color: $white;
}

.header-content {
  position: relative;
  z-index: 2;
  padding-top: 18rem;
  float: none;
}

.title :deep(h1) {
  margin-left: -0.8rem;
  font-size: 21rem;
  font-weight: 900;
  white-space: pre-wrap;
  line-height: 0.9;

  & > span {
    margin: -30px 0;
  }

  span {
    line-height: 110%;
  }
}

.header-button {
  margin-top: 5rem;
  border: none;
  background-color: $white;
  font-size: 2.2rem;

  &:hover {
    background-color: $black;
    color: $white;
  }
}

.header-visual {
  width: 100%;
  margin-top: -19rem;
  margin-bottom: -1rem;

  .header-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  video {
    width: 100%;
    height: 100%;
  }
}

@include media(lt) {
  .title :deep(h1) {
    font-size: 16rem;
  }
}

@include media(md) {
  .title :deep(h1) {
    font-size: 12rem;
  }

  .header-visual {
    margin-top: -12rem;
  }

  .header-button {
    margin-top: 2rem;
    font-size: 2rem;
    height: 5.4rem;
    padding: 0 2rem;
  }
}

@include media(sm) {
  .title :deep(h1) {
    font-size: 9rem;

    span {
      line-height: 115%;
    }
  }

  .header-content {
    padding-top: 10rem;
  }

  .header-button {
    margin-top: 4rem;
    font-size: 1.6rem;
    height: 4.4rem;
    padding: 0 2rem;
  }

  .header-visual {
    margin-top: -12rem;
    height: 60vh;
    max-height: 50rem;
  }

  video {
    width: initial;
    object-fit: cover;
  }
}

@include media(xs) {
  .header-visual {
    margin-top: -10rem;
    height: 60vh;
  }

  .title :deep(h1) {
    font-size: 6.4rem;
  }
}
</style>
