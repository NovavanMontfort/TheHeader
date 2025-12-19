<template>
  <div class="VerwanteArtikelenContentBlock grid">
    <div class="flex mb-50 sm-mb-30">
      <ContentblockHeadingTypeComponent
        :heading-type="content.seoHeadingtype"
        :title="content.titel"
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

    <ClientOnly>
      <BaseArticleOverview
        :page-id="6"
        :config="articleConfig"
        :sortings="[sortings]"
      >
        <template #articles="{ articles }">
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
              v-for="(artikel, idx) in articles"
              :key="idx"
              class="col-1-3 artikel swiper-slide"
              :class="{ 'is-large': isLarge }"
            >
              <!-- Use components here, this is bolognese -->
              <NuxtLink
                v-if="artikel.content.afbeelding"
                :to="artikel._url"
              >
                <ImageComponent
                  v-if="artikel.content.afbeelding"
                  :media-id="artikel.content.afbeelding"
                  loading="lazy"
                  :sizes="imageSizes"
                  :alt="artikel.content.titel"
                />

                <div class="flex align-center title-container">
                  <div
                    class="titel text-bold"
                    :class="[isLarge ? 'heading-5' : 'heading-6']"
                    v-html="artikel.content.titel"
                  />
                  <i class="icon icon-arrow-right ml-15" />
                </div>
                <div v-html="artikel.content.inleiding" />
              </NuxtLink>

              <NuxtLink
                v-else-if="artikel.content.afbeelding1200X900"
                :to="artikel._url"
              >
                <ImageComponentWithLoader
                  v-if="artikel.content.afbeelding1200X900"
                  :media-id="artikel.content.afbeelding1200X900"
                  loading="lazy"
                  :sizes="imageSizes"
                  :alt="artikel.content.titel"
                />
                <div class="flex align-center title-container">
                  <div
                    class="titel text-bold"
                    :class="[isLarge ? 'heading-5' : 'heading-6']"
                    v-html="artikel.content.titel"
                  />
                  <i class="icon icon-arrow-right ml-15" />
                </div>
                <p v-html="artikel.content.subtitel" />
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
        </template>
      </BaseArticleOverview>
    </ClientOnly>
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
const imageSizes = computed(() => (isLarge.value ? { xs: 400, lg: 800 } : { xs: 300, lg: 450 }));
const slidesPerView = computed(() => {
  if (isMobile.value) {
    if (isLarge.value) return 1;
    return 1.4;
  }
  return isLarge.value ? 2.2 : 4.2;
});

const sortings = {
  id: 209,
  desc: true,
};

const presetArticles = computed(() => {
  return [...(props.content.landingspaginas || []), ...(props.content.cases || [])];
});

const articleConfig = computed(() => {
  const presetLenght = presetArticles.value.length || 0;
  const maxArticles = props.content.maximaalWeerTeGevenArtikelen ? parseInt(props.content.maximaalWeerTeGevenArtikelen) || 3 : 3;
  const articlesPerPage = maxArticles - presetLenght;
  return {
    presetArticles: presetArticles.value,
    filters: {
      show: false,
      enabled: true,
      presetSelectedFilterIds: [],
    },
    seo: {
      changeRoute: false,
      chaangeHead: false,
    },

    pagination: {
      enabled: true,
      articlesPerPage: articlesPerPage,
    },
  };
});

const swiperInstance = ref(null);

function changeSlideOpacity(swiper) {
  const slidesFullyVisible = Math.floor(slidesPerView.value);

  swiper.slides.forEach((slide, index) => {
    if (index + 1 > slidesFullyVisible + swiper.realIndex || index < swiper.realIndex) {
      slide?.classList.add('partially-visible');
    } else {
      slide?.classList.remove('partially-visible');
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
    height: 200px;

    img {
      height: 200px;
      width: 100%;
      object-fit: cover;
      border-radius: $border-radius;
    }
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
