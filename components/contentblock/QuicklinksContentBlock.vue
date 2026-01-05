<template>
  <div class="grid QuicklinksContentBlock">
    <ContentblockHeadingTypeComponent
      class="sm-col-1-1 col-5-12"
      visual-size="h2"
      :title="content.titel"
      :idx="idx"
    />
    <div class="sm-col-1-1 sm-push-0 col-6-12 push-1-12">
      <div class="quicklinks">
        <NuxtLink
          v-for="(link, index) in quicklinks"
          :key="index"
          :to="link.link"
          class="quicklink"
        >
          {{ link.text }}
          <i class="icon icon-arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<QuicklinksContentBlock>,
    required: true,
  },
  idx: {
    type: Number,
    default: 0,
  },
});

const MAX_QUICKLINKS = 6;

const quicklinks = computed(() => {
  const items: { text: string; link: string }[] = [];

  for (let i = 1; i <= MAX_QUICKLINKS; i++) {
    const text = props.content[`knop${i}`].name;
    const link = props.content[`knop${i}`].link;

    if (text) {
      items.push({ text, link });
    }
  }

  return items;
});
</script>

<style lang="scss" scoped>
.quicklinks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 5.6rem;
}

.quicklink {
  display: flex;
  align-items: center;
  padding: 4rem 0;
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1.2;
  border-bottom: 1px solid rgba($black, 0.2);

  .icon {
    margin-left: 1.6rem;
    transform: translateX(0);
    transition: 0.3s ease-in-out;
  }

  &:hover {
    .icon {
      margin-left: 1.6rem;
      transform: translateX(1rem);
    }
  }
}

@include media(sm) {
  .quicklinks {
    gap: 3.2rem;
  }

  .quicklink {
    padding: 3.2rem 0;
    font-size: 2.4rem;
  }
}

@include media(xs) {
  .quicklinks {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
