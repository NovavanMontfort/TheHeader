<template>
  <div
    class="grid TekstEnAfbeeldingContentBlock"
    :class="{ reverse: isReverse, 'intro-only': content.titel == '' && content.tekst == '' }"
  >
    <div
      class="sm-col-1-1 col-5-12 sm-push-0 tekst col-text"
      :class="{ 'push-1-12': isReverse }"
    >
      <ContentblockHeadingTypeComponent
        v-if="content.titel"
        :visual-size="titleVisualSize"
        :heading-type="content.seoHeadingtype"
        :title="content.titel"
        :idx="idx"
        class="title"
      />

      <div
        v-if="content.inleiding"
        class="q-mt-lg light raw paragraphs introduction"
        v-html="content.inleiding"
      />

      <div
        class="q-mt-lg light raw paragraphs"
        :class="{ 'larger-paragraph': content.titelWeergevenAlsH1 == 'true' }"
        v-html="content.tekst"
      />

      <ContentblockButton
        v-if="content.link && content.link.name"
        class="btn-secondary"
        :name="content.link.name"
        :link="content.link.link"
        :target="content.link.target"
        has-hover-animation
      />
    </div>
    <div
      class="sm-col-1-1 col-6-12 sm-push-0 imageContainer"
      :class="{ 'push-1-12': !isReverse, 'fill-out': content.uitvullenAfbeelding == 'true' }"
      data-aos="fade-up"
    >
      <ImageComponentWithLoader
        v-if="!isVideo"
        alt="Afbeelding"
        :media-object="content.afbeelding"
        :sizes="{ xs: 300, sm: 400, md: 600, lg: 800, xl: 1000 }"
        loading="lazy"
        border-radius
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<TekstEnAfbeeldingContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});

const isReverse = props.content.weergaveTekst === 'right' ? true : false;
const isVideo = computed(() => !!props.content.youtubeLink);

const titleVisualSize = props.content.titelWeergevenAlsH1 == 'true' ? 'h2' : 'h3';
</script>

<style lang="scss" scoped>
.TekstEnAfbeeldingContentBlock {
  display: flex;
  flex-direction: row;

  .introduction :deep(p) {
    margin-bottom: 4.8rem;
    font-size: 2.6rem;
    line-height: 1.4;

    a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}

.TekstEnAfbeeldingContentBlock.reverse {
  flex-direction: row-reverse;
}

.TekstEnAfbeeldingContentBlock.intro-only {
  .col-text {
    padding-top: 0;
    padding-bottom: 0;
  }

  .imageContainer img {
    height: 100%;
    object-fit: cover;
  }
}

.title {
  margin-bottom: 4.8rem;
  margin-left: -0.3rem;
}

.paragraphs {
  :deep(p) {
    margin: 0 0 3.2rem;

    a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}

.larger-paragraph :deep(p) {
  font-size: 2.3rem;
}

.imageContainer {
  background-repeat: no-repeat;

  img {
    width: 100%;
  }
}

.col-text {
  padding-top: 0;

  .text {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
}

.col-img {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;

  figure {
    display: flex;
    width: 100%;

    &.mobile {
      display: none;
    }
  }
}

.imageContainer.fill-out {
  :deep(.ImageComponent) {
    height: 100%;
  }
}

@media (max-width: $screen-sm) {
  .TekstEnAfbeeldingContentBlock,
  .TekstEnAfbeeldingContentBlock.reverse {
    flex-direction: column-reverse;
    min-height: unset;

    .col-text {
      padding-top: 3.2rem;
    }

    .introduction :deep(p) {
      margin-top: 3.2rem;
      font-size: 2.2rem;
    }
  }

  .TekstEnAfbeeldingContentBlock.intro-only {
    .col-text {
      padding-bottom: 3.2rem;
    }
  }

  .title {
    margin-bottom: 3.2rem;
  }

  .col-text {
    padding-top: 0;
    padding-bottom: 3.2rem;
  }
}
</style>
