<template>
  <div class="FormulierContentBlock">
    <div class="grid">
      <div
        class="sm-col-1-1 md-col-10-12 mb-60"
        :class="content.formulierRechts == 'true' ? 'col-1-2' : 'col-10-12'"
      >
        <ContentblockHeadingTypeComponent
          :title="content.titel"
          :idx="idx"
        />
        <span
          v-if="text"
          class="raw"
          data-aos="fade-up"
          v-html="text"
        />
        <ContentblockButton
          v-if="content.link"
          data-aos="fade-up"
          class="btn-secondary"
          :name="content.link.name"
          :link="content.link.link"
          :target="content.link.target"
        />
      </div>
      <div
        class="sm-col-1-1 md-col-10-12"
        :class="content.formulierRechts == 'true' ? 'col-1-2' : 'col-10-12'"
      >
        <ContentblockHeadingTypeComponent
          v-if="content.titelFormulier"
          :title="content.titelFormulier"
          :idx="idx"
        />
        <span
          v-if="textForm"
          class="raw"
          data-aos="fade-up"
          v-html="textForm"
        />
        <div v-if="surveyIsAnswered">Form submitted!</div>

        <ClientOnly>
          <SurveyWrapper
            v-if="surveyIsLoaded"
            class="surveyElement"
            :questions="survey"
            lang="en"
            @saved="handlePost"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import 'survey-core/defaultV2.min.css';

const props = defineProps({
  content: {
    type: Object as PropType<FormsContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});

const surveyIsLoaded = ref(false);
const surveyIsAnswered = ref(false);
const survey = ref();
const text = ref(props.content.tekst);
const textForm = ref(props.content.tekstFormulier);

function handlePost(results: any) {
  useBaseApi(`/survey/save?surveyId=${props.content.formulier}`, {
    method: 'POST',
    body: results,
  }).then((res) => {
    if (res.data?.redirect_url) {
      window.location.href = res.data.redirect_url;
    } else {
      surveyIsAnswered.value = true;
    }
  });
}

async function initSurvey() {
  useBaseApi(`/survey/questions/${props.content.formulier}`).then((res) => {
    if (res?.data) {
      survey.value = res?.data;
      surveyIsLoaded.value = true;
    }
  });
}

initSurvey();
</script>

<style lang="scss" scoped>
:deep(.ContentblockHeadingTypeComponent) {
  hyphens: auto;
  word-break: break-word;
}

span :deep(p) {
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

.btn {
  margin: 4.8rem 0 0;
}

:deep(.surveyElement) {
  width: 100%;
  background: transparent;

  .sd-page {
    // Hoe deze te stylen?
    padding: 2px !important;
  }

  .sd-title,
  .sd-description {
    display: none;
  }

  .sd-text__content {
    display: flex;
  }

  /* Algemeen */

  .sv-action.sv-action--hidden {
    display: none;
  }

  .sv-action.sv-dots.sv-action--hidden {
    display: none;
  }

  .sd-question__title--answer {
    .sv-action.sv-action--hidden {
      display: block;
    }

    .sv-action.sv-dots.sv-action--hidden {
      display: none;
    }
  }

  .sd-body.sd-body--static {
    max-width: 100%;
  }

  .sd-body {
    padding: 0;
  }

  .sd-page,
  .sd-root-modern,
  .sd-element--with-frame:not(.sd-element--collapsed),
  .svc-logic-question-value,
  .sd-body.sd-body--static .sd-body__navigation,
  .sd-body.sd-body--static .sd-body__page,
  .sd-body.sd-body--static .sd-body__timer {
    padding: 0;
    background-color: transparent;
    box-shadow: none;
  }

  .sd-element--with-frame:not(.sd-element--collapsed),
  .svc-logic-question-value {
    display: flex;
    flex-direction: column;
  }

  .sd-element--with-frame > .sd-element__erbox {
    margin-left: 0;
  }

  .sd-element--with-frame:not(.sd-element--collapsed) > .sd-question__erbox--outside-question,
  .svc-logic-question-value > .sd-question__erbox--outside-question {
    width: 100%;
    margin: 0;
    margin-top: 1rem;
    order: 2;
  }
  /* Titel / label */
  .sd-question__header--location-top {
    padding-bottom: 0.5rem;
  }

  .sd-question[data-name='PlaceholderField'] {
    display: none;
  }

  .sd-element__title span {
    text-transform: initial;
    font-size: 1.4rem;
    font-weight: 400;
  }

  .sd-description {
    font-size: 1.4rem;
  }
  /* Input */
  .sd-input {
    padding: 2.4rem;
    box-shadow: none;
    background-color: #fff;
    border-radius: 0;
    color: $black;
    border: 1px solid $black;
    font-size: 2rem;

    &::placeholder {
      color: $black;
    }
  }

  .sd-element__erbox {
    width: 100%;
  }

  /* Checkbox / Radio */
  .sd-item {
    float: unset;
  }
  /* Button */
  .sd-body__navigation {
    padding-top: 2rem !important;
  }

  .sd-btn {
    font-size: 1.8rem;
    display: inline-flex;
    height: 64px;
    padding: 0px 32px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 100px;
    transition: 0.25s ease-in;
    border: 0.2rem solid $black !important;
    color: $black !important;
    font-weight: 600;
    background: $white !important;

    &:hover {
      background-color: $black !important;
      color: $white !important;
      box-shadow: none;
    }

    &.sd-navigation__complete-btn {
      position: relative;
      background: #555;
      border: 1px solid #555;
      color: #fff;
      padding: 0 3.2rem 0 7.2rem;

      &:hover {
        background: #000;
        border-color: #000;
        box-shadow: none;
      }
    }
  }

  .sv-action__content {
    position: relative;
    justify-self: flex-start;

    &:hover::after {
      color: $white;
    }

    &::after {
      position: absolute;
      content: '\e906';
      left: 3.2rem;
      top: 0;
      height: 100%;
      width: 2.4rem;
      display: flex;
      align-items: center;
      font-family: 'icomoon';
      font-size: 2.4rem;
      transition: all 0.25s ease-in;
    }
  }
}
</style>
