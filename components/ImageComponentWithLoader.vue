<template>
  <div class="ImageComponent ImageComponentWithLoader image-wrapper">
    <div
      v-if="loading"
      class="skeleton-loader"
    />

    <!-- Hacky way to force re-rendering with key, when loaded. So I don't have to re-write everything for now -->
    <BaseImage
      v-show="!loading"
      v-bind="$props"
      :key="loading"
      :media-id="mediaId"
      :media-object="mediaObject"
      :class="{ 'border-radius': borderRadius }"
      @load="onImageLoad"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sizes?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  mediaId: string | number;
  mediaObject?: { id: number; alignment?: string; focusPoint?: string };
  preload?: boolean;
  borderRadius?: boolean;
}>();

const loading = ref(true);

const onImageLoad = () => {
  loading.value = false;
};

setTimeout(() => {
  loading.value = false;
}, 500);
</script>

<style scoped>
.image-wrapper {
  position: relative;
}

.skeleton-loader {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite;
}

:deep(img) {
  width: 100%;

  &.border-radius {
    border-radius: 8px;
  }
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
