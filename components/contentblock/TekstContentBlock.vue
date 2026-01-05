<template>
  <div
    class="TekstContentBlock"
    :class="[{ 'no-divide': content.showDivide == 'false' }, { 'is-first-block': content.isEersteBlokOpPagina == 'true' }]"
  >
    <div
      class="bg-color top"
      :class="'bg-' + content.backgroundColorTop"
    />
    <div
      class="bg-color bottom"
      :class="'bg-' + content.backgroundColorBottom"
    />
    <div
      class="grid grid-pad flex md-flex-column"
      :class="{ 'flex-row-reverse': content.weergave == 'right' }"
    >
      <div class="title">
        <ContentblockHeadingTypeComponent
          :title="content.titel"
          visual-size="h1"
          class="md-col-1-1 no-p"
          :class="content.showDivide == 'true' ? 'col-9-12' : 'col-5-12'"
          :idx="idx"
        />
      </div>

      <div class="col-1-1 flex no-p content-bottom">
        <div
          v-if="content.showDivide == 'true'"
          class="col-1-12 border"
          data-aos="fade-right"
        />

        <div class="text">
          <div
            class="md-col-1-1 md-push-0 push-6-12 col-5-12 no-p"
            data-aos="fade-up"
          >
            <div
              class="content intro"
              v-html="content.tekst"
            />
            <ContentblockButton
              v-if="content.knop.link && content.knop.name"
              class="btn-secondary"
              :name="content.knop.name"
              :link="content.knop.link"
              :target="content.knop.target"
              has-icon
              has-hover-animation
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: Object,
    required: true,
  },

  idx: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.TekstContentBlock {
  position: relative;
  padding-top: 12rem;
  padding-bottom: 12rem;

  &:has(> .bg-color.bg-white + .bg-color.bg-white) {
    padding-top: 0;
    padding-bottom: 0;
  }

  &.is-first-block {
    margin-top: -20rem;
    padding-top: 20rem;
  }

  &.no-divide {
    .title {
      &::after {
        height: 1rem;
      }

      h2 {
        font-size: 10rem;
      }
    }

    .text {
      margin-top: -6rem;
    }

    .content-bottom {
      padding-top: 0;
    }
  }

  .bg-color {
    position: absolute;
    width: 100%;

    &.top {
      top: 0;
      z-index: -1;
      height: auto;
      min-height: 30rem;
    }

    &.bottom {
      bottom: 0;
      z-index: -2;
      height: 100%;
    }
  }

  .title {
    margin-left: -0.5rem;
  }

  .title,
  .text {
    position: relative;
    width: 100%;

    &::after {
      content: '';
      position: absolute;
      top: 2rem;
      right: 0;
      width: 1rem;
      height: 3rem;
      background-color: $black;
    }

    .content {
      :deep(p) {
        margin-top: 0;

        a {
          text-decoration: underline;

          &:hover {
            text-decoration: none;
          }
        }
      }
    }
  }

  .title {
    &::after {
      right: -0.5rem;
    }
  }

  .text::after {
    height: 1rem;
  }

  .intro :deep(p) {
    font-size: 2.6rem;
  }

  .content-bottom {
    padding-top: 8rem;
  }
}

.btn {
  margin-top: 3rem;
}

.border {
  border-top: 0.2rem solid black;
}

@include media(md) {
  .TekstContentBlock {
    &.no-divide {
      .text {
        margin-top: 0;
      }
    }

    .bg-color {
      &.top {
        min-height: 31rem;
      }
    }

    .title,
    .text {
      &::after {
        display: none;
      }
    }

    .text .content {
      :deep(p) {
        margin-top: 3.2rem;
        margin-bottom: 3.2rem;
      }
    }
  }
}

@include media(sm) {
  .TekstContentBlock {
    padding-top: 6.4rem;
    padding-bottom: 6.4rem;

    &.no-divide {
      .title h2 {
        font-size: 4.8rem;
      }
    }

    .title h2 {
      font-size: 4.8rem;
    }

    .intro :deep(p) {
      font-size: 2.2rem;
    }

    .bg-color {
      &.top {
        min-height: 14rem;
      }
    }

    .content-bottom {
      padding-top: 3.2rem;
    }
  }
}
</style>
