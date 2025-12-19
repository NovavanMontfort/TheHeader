<template>
  <div
    class="ImageComponent"
    :class="{ 'default-style': !customStyle }"
  >
    <div class="image-wrapper">
      <img
        :srcSet="srcSet"
        :sizes="sizes"
        :class="[alignment]"
        :style="backgroundFocusPoint"
        :alt="imageAlt"
        v-bind="$attrs"
        @load="emit('load')"
      />

      <div
        v-if="imageCredits"
        class="image-credits"
        v-text="imageCredits"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useGeneralStore from '~/store/general';

const props = defineProps<{
  sizes: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  alt?: string;
  mediaId?: number;
  mediaObject?: { id: number; alignment?: string; focusPoint?: string };
  preload?: boolean;
  customStyle?: boolean;
}>();

const SIZES_MAP: Record<string, number> = {
  xs: 600,
  sm: 1024,
  md: 1440,
  lg: 1920,
  xl: 4000,
};

const emit = defineEmits(['load']);
const generalStore = useGeneralStore();
const finalMediaId = props.mediaObject?.id || props.mediaId;
const imageUrls = ref<Record<string, string>>({});
const recordedSize = generalStore.recordedSize;
const imageCredits = ref<string | null>('');
const imageName = ref<string | null>('');
const imageAlt = computed(() => props.alt || imageName.value || 'Image');

const fetchImageUrl = async (size: string, value: number) => {
  try {
    if (!finalMediaId) {
      console.log('No mediaId provided');
      return;
    }
    const res = (await getImage(finalMediaId, value, value)) as ElocusMediaResponse;
    if (!res?.url) {
      console.log('No url found');
      return;
    }
    imageUrls.value[size] = res.url;
    if (res.credits) {
      imageCredits.value = `© ${res.credits}`;
    }
    if (res.name) {
      imageName.value = res.name;
    }
  } catch (e) {
    console.error(e);
  }
};

if (recordedSize) {
  await fetchImageUrl(recordedSize, props.sizes[recordedSize] || SIZES_MAP[recordedSize]);
  onMounted(async () => {
    // Fetch other sizes on the client-side
    const entries = Object.entries(props.sizes || {});
    for (const [key, value] of entries) {
      if (key !== recordedSize) {
        await fetchImageUrl(key, value);
      }
    }
  });
} else if (props.sizes) {
  //  get all sizes when no recordedSize is available. Takes a little bit longer, but is used for indexing.
  const entries = Object.entries(props.sizes);
  for (const [id, size] of entries) {
    await fetchImageUrl(id, size);
  }
}

const srcSet = computed(() => {
  if (!props.sizes) return '';
  return Object.entries(props.sizes)
    .filter(item => imageUrls.value[item[0]])
    .map(([key, value]) => {
        return `${imageUrls.value[key]} ${value}w`;
    })
    .join(', ');
});

const sizes = computed(() => {
  if (!props.sizes) return '';
  return Object.entries(props.sizes)
    .map(([key, value]) => {
      return `(max-width: ${SIZES_MAP[key]}px) ${value}px`;
    })
    .join(', ');
});

const backgroundFocusPoint = computed(() => {
  if (props.mediaObject?.alignment) {
    const alignment = props.mediaObject.alignment;
    const focusValues = alignment.match(/focus-(\d+)%-(\d+)%/);
    if (focusValues) {
      const [, x, y] = focusValues;
      return `object-position: ${x}% ${y}%;`;
    }
  }
  return '';
});
const alignment = computed(() => {
  return props.mediaObject?.alignment ? `has-alignment ${props.mediaObject.alignment}` : '';
});

onMounted(() => {
  emit('load');
});
</script>

<style lang="scss" scoped>
.image-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;

  img {
    height: 100%;
    width: 100%;
  }

  .image-credits {
    background: black;
    color: white;
    padding: 1rem 1.2rem;
    position: absolute;
    bottom: 0;
    right: 0;
  }


}

.ImageComponent {

  &.default-style {
    
    img {
      border-radius: 8px;
      object-fit: cover;
    }
  }
}

.has-alignment {
  &.left-top {
    object-position: left top;
  }

  &.center-top {
    object-position: center top;
  }

  &.right-top {
    object-position: right top;
  }

  &.left-center {
    object-position: left center;
  }

  &.center-center {
    object-position: center bottom;
  }

  &.right-center {
    object-position: center bottom;
  }

  &.left-bottom {
    object-position: center bottom;
  }

  &.center-bottom {
    object-position: center bottom;
  }

  &.right-bottom {
    object-position: right bottom;
  }
}
</style>
