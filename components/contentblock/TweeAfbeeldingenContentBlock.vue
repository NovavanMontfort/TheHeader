<template>
  <div
    :class="[content.fullScreen ? '' : 'grid']"
    class="TweeAfbeeldingenContentBlock"
  >
    <ContentblockHeadingTypeComponent
      class="heading col-1-1"
      :heading-type="content.seoHeadingtype"
      :title="content.titel"
      :idx="idx"
    />

    <div class="flex image-container">
      <div
        class="col-1-2 sm-col-1-1 no-p"
        data-aos="fade-up"
      >
        <BaseImage
          :media-object="imgSrcLeft"
          :sizes="{ lg: 800, xl: 1000 }"
          class="col-1-1 no-p image1"
          loading="lazy"
          :alt="imgSrcLeft"
        />
      </div>
      <div
        class="col-1-2 sm-col-1-1 no-p"
        data-aos="fade-up"
      >
        <BaseImage
          :media-object="imgSrcRight"
          :sizes="{ lg: 800, xl: 1000 }"
          class="col-1-1 no-p image2"
          loading="lazy"
          :alt="imgSrcRight"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<TweeAfbeeldingenContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});

// Temporary disabled mobile images because it messes with caching. Maybe we can enable when we have a better API.
// const { isMobile } = useIsMobile();
const isMounted = ref(false);
const imgSrcLeft = computed(() => props.content.afbeeldingLinks);

const imgSrcRight = computed(() => props.content.afbeeldingRechts);

// onMounted(() => {
//   isMounted.value = true;
// });
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.ImageComponent {
  height: 100%;
}

.image1 {
  padding-right: 2.4rem;
}

.image2 {
  padding-left: 2.4rem;
}

@include media(sm) {
  .image1 {
    padding-right: 0;
  }
  .image2 {
    padding-left: 0;
    padding-top: 2.4rem;
  }
}
</style>
