<template>
  <div
    ref="container"
    class="parallax-container"
    :class="[`height:${containerHeight}`]"
  >
    <div
      ref="slotRef"
      class="parallax-content"
      :style="parallaxStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import useGeneralStore from '@/store/general';

const container = ref<HTMLInputElement>();
const slotRef = ref<HTMLInputElement>();
const scrollY = ref(0);
const containerHeight = ref(0);
const amountRetries = ref(0);

const generalStore = useGeneralStore();
const lowStimulusActive = computed(() => generalStore.lowStimulusActive);

const parallaxStyle = computed(() => {
  if (lowStimulusActive.value) {
    return {};
  }
  return {
    transform: `translate3d(0px, ${scrollY.value * 0.06}px, 0px) scale(1.3)`,
    height: `100%`,
  };
});

const handleScroll = () => {
  const top = container.value?.getBoundingClientRect().top;
  if (top) {
    scrollY.value = top - containerHeight.value;
  }
};

const updateContainerHeight = () => {
  if (container.value) {
    if (slotRef.value?.children?.length && slotRef.value.children[0].clientHeight) {
      containerHeight.value = slotRef.value.children[0].clientHeight;
    } else if (amountRetries.value < 5) {
      setTimeout(() => {
        amountRetries.value++;
        updateContainerHeight();
      }, 250);
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  setTimeout(() => {
    handleScroll();
    updateContainerHeight();
  }, 500);
  updateContainerHeight();

  const resizeObserver = new ResizeObserver(() => {
    updateContainerHeight();
  });

  if (container.value) {
    resizeObserver.observe(container.value);
  }

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (container.value) {
      resizeObserver.unobserve(container.value);
    }
  });
});
</script>
<style scoped lang="scss">
.parallax-container {
  position: relative;
}

.parallax-content {
  width: 100%;
  will-change: transform;
  transition: 0.8s;
}

@include media(sm) {
  .parallax-content {
    transition: 0.2s;
  }
}
</style>
