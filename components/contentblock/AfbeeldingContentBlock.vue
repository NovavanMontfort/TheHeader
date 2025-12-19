<template>
  <div
    :class="{ grid: !isFullScreen }"
    data-aos="fade-up"
  >
    <ContentblockHeadingTypeComponent
      v-if="content.titel"
      class="heading col-1-1"
      :heading-type="content.seoHeadingtype"
      :title="content.titel"
      :idx="idx"
    />

    <ImageComponent
      :media-object="content.afbeelding"
      :sizes="{ xs: 450, sm: 700, md: 1000, lg: 1800, xl: 2000 }"
      :alt="altText"
      class="col-1-1"
      :class="isFullScreen ? 'no-p' : 'small'"
      loading="lazy"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<AfbeeldingContentBlockType>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});

const isFullScreen = computed(() => props.content.fullScreen == true);

const { isMobile } = useIsMobile();
const imgSrc = computed(() =>
  isMobile.value && props.content.afbeeldingMobiel ? props.content.afbeeldingMobiel.toString() : props.content.afbeelding.toString()
); // evt. dit toevoegen aan ImageComponent.

function handleClick() {
  if (!props.content.link?.link) return;
  window.open(props.content.link?.link);
}
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
const altText = props.content.titel || `Afbeelding ${props.idx + 1}`;
</script>

<style lang="scss" scoped>
img {
  width: 100%;

  &.small {
    max-width: 50%;
  }
}

.ImageComponent {
  padding: 0;
}

@include media(sm) {
  img.small {
    max-width: 75%;
  }
}

@include media(xs) {
  img.small {
    max-width: 100%;
  }
}
</style>
