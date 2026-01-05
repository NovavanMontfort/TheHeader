<template>
  <div
    class="MedewerkersContentBlock"
    :class="content.achtergrondkleur ? 'bg-' + content.achtergrondkleur : ''"
  >
    <div class="grid">
      <div class="col-1-1">
        <ContentblockHeadingTypeComponent
          :title="content.titel"
          visual-size="h2"
          :idx="idx"
          class="title"
        />
      </div>
    </div>

    <Swiper
      class="swiper employee-slider"
      :modules="[SwiperA11y, SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :navigation="{
        nextEl: '.button-next',
        prevEl: '.button-prev',
      }"
      :slides-per-view="'auto'"
      :space-between="35"
      :free-mode="!lowStimulusActive"
      :loop="true"
      :speed="8000"
      :autoplay="autoPlay"
    >
      <SwiperSlide
        v-for="employee in employees"
        :key="employee._id"
        class="swiper-slide"
      >
        <div class="swiper-slide">
          <div class="employee flex flex-column">
            <div class="employee-info">
              <h5 class="name md-mb-15 xs-mb-1">
                {{ employee.content.titel }}
              </h5>
              <span
                class="function"
                v-text="employee.content.functie"
              />
            </div>
            <div class="employee-image">
              <ImageComponentWithLoader
                :media-id="employee.content.afbeelding"
                :sizes="{ xs: 200, sm: 500 }"
                loading="lazy"
                :alt="`Medewerker ${employee.content.titel}`"
                border-radius
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import useGeneralStore from '@/store/general';

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});

interface Employee {
  _id: number;
  content: {
    titel: string;
    slug: string;
    functie: string;
    sortering: number;
    afbeelding: number;
  };
}

const employees = ref<Employee[]>([]);

const generalStore = useGeneralStore();
const lowStimulusActive = computed(() => generalStore.lowStimulusActive);

const autoPlay = computed(() => {
  return lowStimulusActive.value
    ? false
    : {
        delay: 0,
        disableOnInteraction: true,
      };
});

  if (props.content.aanvullenMet) {
  const { data } = await useBaseFetch(`/pages/${props.content.aanvullenMet}`, { method: 'POST', body: { pagination: { pageSize: 99}}});
  employees.value  = data.value?.pages
      .sort((a, b) => b._id - a._id)
      .map((item) => ({
        ...item,
        subtitel: item.inleiding,
      }));
  }

</script>

<style lang="scss" scoped>
@import '~/assets/styles/swiper.scss';

.MedewerkersContentBlock {
  &[class*='bg-'] {
    padding-top: 14rem;
    padding-bottom: 12rem;
  }
}

.title {
  margin-left: -0.3rem;
}

.employee-slider {
  margin-top: 5rem;

  .swiper-wrapper {
    transition-timing-function: linear;
  }

  .swiper-slide {
    width: 500px;

    .employee-image {
      display: flex;
      order: -1;
      width: 100%;
      margin-bottom: $gutter;
      min-height: 200px;

      img {
        height: 500px;
        width: 500px;
        border-radius: $border-radius;
      }

      figure {
        width: 100%;
        aspect-ratio: 1/1;
      }
    }

    .employee-info {
      padding-top: 1rem;

      .function {
        font-size: 2rem;
      }
    }
  }
}

.btn {
  margin: 0;
  margin-left: $gutter;
  z-index: 2;

  &.swiper-button-disabled {
    opacity: 0.5;
  }
}

:deep(.swiper) {
  .swiper-wrapper {
    transition-timing-function: linear;
    padding-bottom: 40px;
    margin-bottom: 10px;
    height: 600px;
  }

  img {
    height: 100%;
  }
}

.swiper-slide {
  width: auto;
}

@media (max-width: $screen-xs) {
  .swiper {
    height: 320px;
    .swiper-slide {
      width: 200px;

      .function {
        font-size: 1.8rem !important;
      }

      .employee-image {
        img {
          height: 200px;
          width: 200px;
        }
      }
    }
  }
}
</style>
