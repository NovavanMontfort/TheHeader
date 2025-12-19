<template>
  <div class="row grid">
    <div class="col-1-1">
      <div class="title-wrapper flex align-end">
        <ContentblockHeadingTypeComponent
          :title="content.titel"
          visual-size="h2"
          class="col-5-12 md-col-1-1 md-mb-3 no-p"
          :idx="idx"
        />
        <div
          class="col-7-12 heading-6 text-bold md-col-1-1 no-p"
          v-text="content.subtitel"
        />
      </div>

      <div
        class="col-7-12 push-5-12 md-col-1-1 md-push-0 no-p"
        data-aos="fade-up"
      >
        <div
          v-for="(question, idx) in content.vragen"
          :key="idx"
          class="faq-item col-1-1 no-p"
          :class="{ active: openedQuestion.includes(idx) }"
          @click="handleFaqClick(idx)"
        >
          <div class="faq-header">
            <h3
              class="faq-title"
              v-text="question.content.vraag"
            />
            <i
              class="icon faq-icon"
              :class="[openedQuestion.includes(idx) ? 'icon-minus' : 'icon-plus']"
            />
          </div>
          <Transition
            name="expand"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
          >
            <div
              v-if="openedQuestion.includes(idx)"
              class="faq-content"
            >
              <span v-html="question.content.antwoord" />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<VeelgesteldeVragenContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});

const openedQuestion = ref<number[]>([]);

function handleFaqClick(idx: number) {
  if (openedQuestion.value.includes(idx)) {
    openedQuestion.value.splice(
      openedQuestion.value.findIndex((item) => item == idx),
      1
    );
  } else {
    openedQuestion.value.push(idx);
  }
}

function enter(element: HTMLElement) {
  const width = getComputedStyle(element).width;

  element.style.width = width;
  element.style.position = 'absolute';
  element.style.visibility = 'hidden';
  element.style.height = 'auto';

  const height = getComputedStyle(element).height;

  element.style.width = '';
  element.style.position = '';
  element.style.visibility = '';
  element.style.height = '0';

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element).height;

  // Trigger the animation.
  // We use `requestAnimationFrame` because we need
  // to make sure the browser has finished
  // painting after setting the `height`
  // to `0` in the line above.
  requestAnimationFrame(() => {
    element.style.height = height;
  });
}

function afterEnter(element: HTMLElement) {
  element.style.height = 'auto';
}

function leave(element: HTMLElement) {
  element.style.height = getComputedStyle(element).height;

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element).height;

  // Trigger the animation.
  requestAnimationFrame(() => {
    element.style.height = '0';
  });
}
</script>

<style lang="scss" scoped>
// Hardware accelartion for transition
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.title-wrapper {
  padding-bottom: 32px;
  border-bottom: 1px solid $black;
}

.faq-item {
  position: relative;
  cursor: pointer;

  .faq-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .faq-title {
    font-size: 2.6rem;
    font-weight: 400;
    position: relative;
    margin: 0;
    padding: 3rem 5rem 3rem 0;
    cursor: pointer;
    -webkit-transition: all 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    -o-transition: all 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    transition: all 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  .faq-icon {
    font-size: 2.6rem;
    transition: 0.25s;
  }

  .faq-content {
    padding: 0 0.1rem;
    height: auto;
  }

  &.active {
    .faq-title {
      font-weight: 600;
    }

    .faq-icon {
      transform: rotate(180deg);
    }
  }
}

@include media(md) {
  .title-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
