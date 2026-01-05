<template>
  <!-- NuxtLink? -->

  <NuxtLink
    v-if="name"
    :href="link"
    :target="target"
    class="btn"
    :class="{ 'btn-hover-animation': hasHoverAnimation }"
  >
    <span
      v-if="hasHoverAnimation"
      class="flex align-center"
    >
      <i
        v-if="hasIcon"
        class="icon icon-arrow-right mr-15"
      />
      {{ name }}
    </span>
    <span class="flex align-center">
      <i
        v-if="hasIcon"
        class="icon icon-arrow-right mr-15"
      />
      {{ name }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  link: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'primary',
  },
  hasIcon: {
    type: Boolean,
    default: true,
  },
  hasHoverAnimation: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.btn-hover-animation {
  overflow: hidden;
  white-space: nowrap;
  position: relative;

  .icon {
    font-size: 2.2rem;
  }

  span {
    position: relative;
    transition: all 0.5s ease;
  }

  span:first-of-type {
    position: absolute;
    left: 0;
    transform: translateX(calc(-100%));
  }

  &:hover {
    color: initial;
    background-color: initial;

    span {
      animation: slideText 4s linear infinite;
    }

    span:first-of-type {
      animation: slideTextFirstChild 4s linear infinite;
    }
  }
}

@keyframes slideText {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(calc(100% + 3.2rem));
    visibility: hidden;
  }
  50.1% {
    visibility: hidden;
    transform: translateX(calc(-100% - 3.2rem));
  }
  100% {
    visibility: visible;
    transform: translateX(0);
  }
}

@keyframes slideTextFirstChild {
  0% {
    transform: translateX(calc(-100%));
  }
  50% {
    transform: translateX(3.2rem);
  }
  100% {
    transform: translateX(calc(100% + 6.4rem));
  }
}
</style>
