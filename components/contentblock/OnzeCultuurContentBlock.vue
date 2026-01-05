<template>
  <div
    class="OnzeCultuurContentBlock"
    :class="backgroundColor != null ? backgroundColor : null"
  >
    <div class="grid mb-80">
      <ContentblockHeadingTypeComponent
        v-if="content.titel"
        :title="content.titel"
        class="heading-1"
        :idx="idx"
      />
    </div>

    <div class="container">
      <div class="horizontal-scrolling-items">
        <ImageComponentWithLoader
          v-for="photo in photos"
          :key="photo"
          :media-id="photo"
          loading="lazy"
          :sizes="photoSize"
          :alt="`Onze cultuur foto ${photo}`"
          border-radius
        />

        <ImageComponentWithLoader
          v-for="photo in photos"
          :key="photo"
          :media-id="photo"
          :sizes="photoSize"
          loading="lazy"
          :alt="`Onze cultuur foto ${photo}`"
          border-radius
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const backgroundColor = props.content.achtergrondkleur != null ? 'bg-' + props.content.achtergrondkleur : null;

const folder = props.content.folder?._id;
const photos = ref<number[]>([]);
const photoSize = { xs: 300, lg: 500 };

if (folder) {
  const res = (await useBaseApi(`/media/folder/${folder}`)) as number[];
  photos.value = res;
}
</script>

<style lang="scss" scoped>
.OnzeCultuurContentBlock {
  &[class*='bg-'] {
    padding-top: 14rem;
    padding-bottom: 12rem;
  }
}

.container {
  width: 100%;
  overflow-x: hidden;
  display: flex;
}

.horizontal-scrolling-items {
  display: flex;
  align-items: flex-start;
  gap: 5.6rem;
  animation-name: infiniteScroll;
  animation-duration: 60s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  :deep(img) {
    object-fit: contain;
    width: 35rem;
    border-radius: 8px;
  }
}

@keyframes infiniteScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% / 2));
  }
}

@include media(sm) {
  .OnzeCultuurContentBlock {
    &[class*='bg-'] {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }

  .horizontal-scrolling-items {
    gap: 1.6rem;

    img {
      width: 21rem;
    }
  }
}
</style>
