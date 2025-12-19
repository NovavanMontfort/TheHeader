<template>
  <div class="TekstTweeKolomsContentBlock grid">
    <div class="col-1-1">
      <ContentblockHeadingTypeComponent
        :heading-type="content.seoHeadingtype"
        :title="content.titel"
        :idx="idx"
        class="title"
        visual-size="h3"
      />
      <p
        v-if="content.subtitel"
        class="introduction raw"
        v-html="content.subtitel"
      />
    </div>

    <div>
      <div
        class="col-6-12 sm-col-1-1 sm-mtb-30"
        data-aos="fade-up"
      >
        <span
          class="text raw"
          v-html="content.tekstLinks"
        />
        <div class="q-mt-lg">
          <ContentblockButton
            v-if="content.link1"
            class="btn-secondary"
            :name="content.link1.name"
            :link="content.link1.link"
            :target="content.link1.target"
          />
        </div>
      </div>

      <div
        class="col-6-12 sm-col-1-1"
        data-aos="fade-up"
      >
        <span
          class="text raw"
          v-html="content.tekstRechts"
        />
        <div class="q-mt-lg">
          <ContentblockButton
            v-if="content.link2"
            class="btn-secondary"
            :name="content.link2.name"
            :link="content.link2.link"
            :target="content.link2.target"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  content: {
    type: Object as PropType<TekstTweeKolomsContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.TekstTweeKolomsContentBlock {
  .ContentblockHeadingTypeComponent {
    margin-bottom: 4.8rem;
  }

  .title {
    margin-left: -0.3rem;
  }

  .introduction {
    margin: 4.8rem 0 0;
    font-size: 2.6rem;
    line-height: 1.4;

    a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .text :deep(p) {
    margin: 4.8rem 0 0;

    a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .btn {
    margin: 4.8rem 0 0;
  }
}

@media (max-width: $screen-sm) {
  .TekstTweeKolomsContentBlock {
    .ContentblockHeadingTypeComponent {
      margin-bottom: 3.2rem;
    }

    .introduction {
      margin-bottom: 3.2rem;
      font-size: 2.2rem;
    }

    .text :deep(p) {
      margin: 0 0 3.2rem 0;
    }

    .btn {
      margin: 0 0 2.4rem;
    }
  }
}
</style>
