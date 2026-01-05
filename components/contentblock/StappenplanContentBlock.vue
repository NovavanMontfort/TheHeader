<template>
  <div class="TekstEenKolomsContentBlock col-1-1">
    <div class="grid">
      <ContentblockHeadingTypeComponent
        v-if="content.titel"
        :title="content.titel"
        :idx="idx"
        visual-size="h2"
        class="xs-mb-3"
      />

      <div
        class="col-7-12 push-5-12 lt-col-10-12 lt-push-2-12 md-col-1-1 md-push-0 no-p"
        data-aos="fade-up"
      >
        <div
          v-for="item in filteredItems"
          :key="item.title"
          class="flex single-step"
        >
          <strong class="col-2-12 lt-col-3-12 sm-col-1-1 no-p pt-05 sm-mb-15">{{ item.title }}</strong>
          <div
            class="item-text col-10-12 lt-col-9-12 sm-col-1-1 no-p"
            v-html="item.text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<StappenplanContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});

const filteredItems = computed(() => {
  const items: { title: string; text: string }[] = [];

  for (let i = 1; i <= 4; i++) {
    const title = props.content[`stap${i}Titel`];
    const text = props.content[`stap${i}Tekst`];

    if (title || text) {
      items.push({ title, text });
    }
  }

  return items;
});
</script>

<style lang="scss" scoped>
.single-step {
  strong {
    padding-right: 1.6rem;
    font-size: 2rem;
  }
}

:deep(.item-text) {
  p {
    margin: 0;
    font-size: 2.6rem;

    a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}

.single-step {
  margin-bottom: 5.6rem;
}

@include media(sm) {
  :deep(.ContentblockHeadingTypeComponent) {
    margin-bottom: 3.2rem;
  }

  :deep(.item-text) {
    p {
      font-size: 2.2rem;
    }
  }

  .single-step {
    margin-bottom: 3rem;
  }
}
</style>
