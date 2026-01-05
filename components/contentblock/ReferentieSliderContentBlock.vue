<template>
  <div
    v-if="folderMap"
    class="ReferentieSliderContentBlock"
    :class="[content.customMarge]"
  >
    <div class="grid">
      <div class="col-10-12 xs-col-1-1">
        <ContentblockHeadingTypeComponent
          visual-size="h2"
          class="mb-40"
          :title="content.titel"
          :idx="idx"
        />
      </div>
    </div>
    <div class="container">
      <Swiper
        class="swiper referentie-slider swiper-no-swiping"
        :modules="[SwiperA11y, SwiperAutoplay]"
        :slides-per-view="'auto'"
        :space-between="35"
        :loop="true"
        :speed="photosSliderTop.length * 200"
        :autoplay="autoPlay"
        @swiper="onSwiper1"
      >
        <SwiperSlide
          v-for="(photo, index) in photosSliderTop"
          :key="index"
          class="swiper-slide"
        >
          <div class="swiper-slide">
            <BaseImage
              :media-id="photo"
              :sizes="photoSize"
              loading="lazy"
              @load="imageLoaded()"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <Swiper
        class="swiper referentie-slider swiper-no-swiping"
        :modules="[SwiperA11y, SwiperAutoplay]"
        :slides-per-view="'auto'"
        :space-between="35"
        :loop="true"
        :speed="photosSliderBottom.length * 200"
        :autoplay="autoPlayReverse"
        @swiper="onSwiper2"
      >
        <SwiperSlide
          v-for="(photo, index) in photosSliderBottom"
          :key="index"
          class="swiper-slide"
        >
          <div class="swiper-slide">
            <ImageComponent
              :media-id="photo"
              :sizes="photoSize"
              loading="lazy"
              @load="imageLoaded()"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGeneralStore from '@/store/general';
import type { PropType } from 'vue';

const generalStore = useGeneralStore();
const lowStimulusActive = computed(() => generalStore.lowStimulusActive);

const props = defineProps({
  content: {
    type: Object as PropType<ReferentieContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});

const folderMap = props.content.mapMetLogoS?._id;

const photosSliderTop = ref<number[]>([]);
const photosSliderBottom = ref<number[]>([]);

const photoSize = { xs: 200, sm: 500 };

const autoPlay = ref({});
const autoPlayReverse = ref({});

const swiper1 = ref(null);
const swiper2 = ref(null);
let imagesLoaded = 0;
const totalImages = ref(0);

if (folderMap) {
  const res = (await useBaseApi(`/media/folder/${folderMap}`)) as number[];
  photosSliderTop.value = shuffleArray([...res]);
  photosSliderBottom.value = shuffleArray([...res]);

  totalImages.value = photosSliderTop.value.length;
}

function onSwiper1(swiperInstance) {
  swiper1.value = swiperInstance;
}

function onSwiper2(swiperInstance) {
  swiper2.value = swiperInstance;
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages.value) {
    if (swiper1.value) swiper1.value.update();
    if (swiper2.value) swiper2.value.update();
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const createAutoPlayConfig = (reverseDirection = false) => {
  return lowStimulusActive.value
    ? false
    : {
        delay: 0,
        disableOnInteraction: true,
        reverseDirection,
      };
};

onMounted(() => {
  autoPlay.value = createAutoPlayConfig(true);
  autoPlayReverse.value = createAutoPlayConfig(false);
});
</script>

<style lang="scss" scoped>
.ReferentieSliderContentBlock {
  background: $black;
  color: $white;
  padding: 14rem 0;
}

.ContentblockHeadingTypeComponent {
  padding-bottom: 14rem;
  margin-left: -0.3rem;
}

.referentie-slider {
  &:first-of-type {
    margin-bottom: 5rem;
  }

  .swiper-wrapper {
    transition-timing-function: linear;
  }

  .swiper-slide {
    width: auto;
    max-width: 20rem;
  }
}

:deep(.swiper) {
  .swiper-wrapper {
    transition-timing-function: linear;
    height: 20rem;
  }

  .ImageComponent {
    position: relative;
    height: 100%;
  }

  img {
    position: relative;
    height: 100%;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
}

@include media(sm) {
  .ReferentieSliderContentBlock {
    padding: 8rem 0;
  }

  .referentie-slider {
    &:first-of-type {
      margin-bottom: 2rem;
    }
  }

  :deep(.swiper) {
    .swiper-wrapper {
      height: 15rem;
    }
  }
}
</style>
