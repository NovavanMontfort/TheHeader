<template>
  <div class="HeaderContentBlock contentblock-Header">
    <video
      v-if="content.videoUrl"
      :src="content.videoUrl"
      muted="true"
      loop
      :autoplay="!lowStimulusActive"
      playsinline
      :poster="poster"
      class="video-load"
      @canplaythrough="onVideoLoaded"
    />

    <div
      v-if="content.videoUrl || content.youtubeLink"
      class="content nonImage"
    >
      <div class="grid">
        <div class="lt-col-1-1 col-8-12">
          <ContentblockHeadingTypeComponent
            v-if="content.titel && !isLoading"
            :heading-type="content.seoHeadingtype"
            visual-size="h2"
            :title="content.titel"
            class="title"
          />

          <h1
            v-if="content.tekst"
            class="subtitle raw"
            v-html="content.tekst"
          />

          <div
            v-if="content?.knop1.link || content?.knop2.link"
            class="button-container"
          >
            <ContentblockButton
              v-if="content.knop1.link"
              data-aos="fade-up"
              class="btn-primary"
              :name="content.knop1.name"
              :link="content.knop1.link"
              :target="content.knop1.target"
            />

            <ContentblockButton
              v-if="content.knop2.link"
              data-aos="fade-up"
              class="btn-primary"
              :name="content.knop2.name"
              :link="content.knop2.link"
              :target="content.knop2.target"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="props.content.afbeelding"
      class="header-container"
    >
      <ImageComponentWithLoader
        v-if="props.content.afbeelding"
        :media-id="props.content.afbeelding"
        :sizes="{ xs: 450, sm: 700, md: 1000, lg: 1920, xl: 2500 }"
        class="header-image"
        alt="Header image"
        preload
      />

      <div class="grid">
        <div class="header-content lt-col-1-1 col-8-12">
          <ContentblockHeadingTypeComponent
            v-if="!isLoading"
            :heading-type="content.seoHeadingtype"
            :title="content.titel"
          />

          <div
            v-if="content.tekst"
            class="subtitle raw"
            v-html="content.tekst"
          />

          <div
            v-if="content?.knop1.link || content?.knop2.link"
            class="button-container"
          >
            <ContentblockButton
              v-if="content.knop1.link"
              data-aos="fade-up"
              class="btn-primary"
              :name="content.knop1.name"
              :link="content.knop1.link"
              :target="content.knop1.target"
            />

            <ContentblockButton
              v-if="content.knop2.link"
              data-aos="fade-up"
              class="btn-primary"
              :name="content.knop2.name"
              :link="content.knop2.link"
              :target="content.knop2.target"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import useGeneralStore from '@/store/general';

const generalStore = useGeneralStore();

const props = defineProps({
  content: {
    type: Object as PropType<HeaderContentBlock>,
    required: true,
  },
});

const isLoading = computed(() => generalStore.loading);

const lowStimulusActive = computed(() => generalStore.lowStimulusActive);

const text = ref(props.content.tekst);

if (props.content.videoUrl) {
  generalStore.setVideosLoaded(false);
}

const poster = await getImageUrl(props.content.afbeelding);

const { onVideoLoaded } = useVideosLoaded();
</script>

<style lang="scss" scoped>
.HeaderContentBlock {
  width: 100%;
  position: relative;
  padding: 0 !important;
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
}

.contentblock-Header {
  .header-container {
    position: relative;
    width: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    background-color: $black;
    color: $white;
  }
}

.title {
  font-size: 8rem;
  line-height: 100%;
  hyphens: auto;
}

.subtitle {
  margin-top: 4rem;
  font-weight: 400;

  :deep(p) {
    margin: 0;
    font-size: 2.6rem;
  }
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 2.4rem;

  :deep(.btn-primary) {
    border: 0.1rem solid $white;
    transition: 0.3s all ease-in-out;
  }
}

video {
  width: 100%;
}

.content {
  position: relative;
  background: $black;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-items: flex-start;
  height: 100%;
  width: 100%;
  padding: 20rem 0 4.8rem;
}

:deep(.header-image) {
  width: 100%;
  height: 100%;
  max-height: 75vh;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: 1;

  .skeleton-loader {
    width: 100vw;
    height: 60vh;
  }

  .ImageComponent {
    width: 100%;
    height: 100%;
    max-height: 75vh;
    background-position: center center;
    background-size: cover;
    object-fit: cover;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 1;
  }
}

.header-content {
  z-index: 2;
  padding: 20rem 0 4.8rem;
}

@include media(sm) {
  .contentblock-Header {
    display: flex;
    flex-direction: column-reverse;
  }

  .content {
    position: relative;
    padding: 14rem 0 6rem;
  }

  .ContentblockHeadingTypeComponent {
    font-size: 4.2rem;
  }

  .subtitle {
    margin-top: 1.6rem;
    :deep(p) {
      font-size: 2.2rem;
    }
  }

  video,
  :deep(.header-image) .ImageComponent {
    width: initial;
    height: 60vh;
    object-fit: cover;
  }
}
</style>
