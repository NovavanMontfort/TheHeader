<template>
  <div class="AfbeeldingFolderSliderContentBlock grid">
    <div class="flex mb-50 sm-mb-30">
      <ContentblockHeadingTypeComponent
        :heading-type="content.seoHeadingtype"
        :title="content.sliderTitel"
        :idx="idx"
        visual-size="h3"
        class="col-2-3 xs-col-1-1"
      />

      <div class="flex col-1-3 xs-col-1-1 justify-end xs-justify-start xs-mt-30">
        <button
          class="navigation-button button-prev mr-15"
          :class="`button-prev-${idx}`"
        >
          <i class="icon icon-arrow-left" />
        </button>
        <button
          class="navigation-button button-next"
          :class="`button-next-${idx}`"
        >
          <i class="icon icon-arrow-right" />
        </button>
      </div>
    </div>

    <Swiper
      data-aos="fade-up"
      class="swiper employee-slider flex"
      :modules="[SwiperA11y, SwiperNavigation, SwiperPagination]"
      :navigation="{
        nextEl: `.button-next-${idx}`,
        prevEl: `.button-prev-${idx}`,
      }"
      :slides-per-view="slidesPerView"
      :space-between="15"
      @slide-change="onSlideChange"
      @breakpoint="onBreakpoint"
      @swiper="onSwiper"
    >
      <SwiperSlide
        v-for="(imgId, idx) in imageList"
        :key="imgId"
        class="artikel swiper-slide"
        :class="{ 'is-large': isLarge }"
      >
        <BaseImage
          :media-id="imgId"
          :sizes="{ xs: 400, lg: 800 }"
          loading="lazy"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<VerwanteArtikelenContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    required: true,
  },
});

const { isMobile } = useIsMobile();
const isLarge = computed(() => props.content.grootFormaat === 'true');
const slidesPerView = computed(() => {
  if (isMobile.value) {
    return 1.4;
  }
  return 2.2;
});
// const imageList = computed(() => [props.content.afbeelding1650X570, props.content.afbeelding2650X570, props.content.afbeelding3650X570, props.content.afbeelding4650X570].filter(item => item));
const imageList = (await useBaseApi('/folder/' + props.content.folder)) as string;

const swiperInstance = ref(null);

function changeSlideOpacity(swiper) {
  const slidesFullyVisible = Math.floor(slidesPerView.value);

  swiper.slides.forEach((slide, index) => {
    if (index + 1 > slidesFullyVisible + swiper.realIndex || index < swiper.realIndex) {
      slide.classList.add('partially-visible');
    } else {
      slide.classList.remove('partially-visible');
    }
  });
}

function onSlideChange() {
  if (swiperInstance.value) {
    changeSlideOpacity(swiperInstance.value);
  }
}

function onBreakpoint() {
  if (swiperInstance.value) {
    changeSlideOpacity(swiperInstance.value);
  }
}

function onSwiper(swiper) {
  swiperInstance.value = swiper;
  changeSlideOpacity(swiper);
}

onMounted(() => {
  if (swiperInstance.value) {
    changeSlideOpacity(swiperInstance.value);
  }
});

watch(slidesPerView, () => {
  if (swiperInstance.value) {
    changeSlideOpacity(swiperInstance.value);
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/styles/swiper.scss';

.swiper {
  width: 100%;
}

.navigation-button {
  cursor: pointer;
  font-size: 24px;

  display: flex;
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  background: transparent;
  border-radius: 100px;
  border: 2px solid $black;

  &:disabled {
    cursor: initial;
    opacity: 0.3;
    color: $black;
  }
}

.artikel {
  aspect-ratio: 16 / 9;

  &.partially-visible {
    opacity: 0.4;
  }

  .title-container {
    :deep(.titel) {
      // for some reason api gives html in title
      p {
        font-size: inherit;
        margin: 0;
      }
    }

    i {
      font-size: 24px;
    }
  }

  :deep(.ImageComponent) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: $border-radius;

    // img {
    //   height: 200px;
    //   width: 100%;
    //   object-fit: cover;
    // }
  }
  &.is-large {
    :deep(.ImageComponent) {
      height: 500px;
      img {
        height: 500px;
      }
    }
  }
}

@include media(sm) {
  .navigation-button {
    width: 4.8rem;
    height: 4.8rem;
    font-size: 2rem;
  }

  .title-container {
    margin-top: 12px;
  }

  .artikel {
    img {
      height: 156px;
    }

    &.is-large img {
      height: 240px;
    }
  }
}
</style>
