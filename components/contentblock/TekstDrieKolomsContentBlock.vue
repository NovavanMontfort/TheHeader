<template>
  <div class="TekstDrieKolomsContentBlock grid">
    <div class="col-1-1">
      <ContentblockHeadingTypeComponent
        :heading-type="content.seoHeadingtype"
        :title="content.titel"
        :idx="idx"
        class="title"
        visual-size="h3"
      />
    </div>

    <div class="col-1-1 no-p flex justify-space-between">
      <div
        v-for="(column, columnIdx) in columns"
        :key="columnIdx"
        class="col-4-12 md-col-1-3 sm-col-1-1"
      >
        <span v-html="column.text" />
        <ContentblockButton
          v-if="column.button?.link"
          class="btn-secondary"
          :name="column.button?.name"
          :link="column.button?.link"
          :target="column.button?.target"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<TekstTweeKolomsContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    required: true,
  },
});

const columns = computed(() => [
  { text: props.content?.tekst1, button: props.content?.knop1 },
  { text: props.content?.tekst2, button: props.content?.knop2 },
  { text: props.content?.tekst3, button: props.content?.knop3 },
]);
</script>

<style scoped lang="scss">
.text {
  padding: 0 2rem;

  &:first-child {
    padding-left: 0;
    padding-right: 2rem;
  }

  &:last-child {
    padding-left: 2rem;
    padding-right: 0;
  }
}

.btn {
  margin: 2.4rem 0 0;
}

@media (max-width: $screen-sm) {
  .btn {
    margin: 1.2rem 0 2.4rem;
  }
}
</style>
