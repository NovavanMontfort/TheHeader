<template>
  <div
    class="TitelContentBlock"
    :class="[content.customMarge]"
  >
    <div class="grid">
      <div class="col-10-12 xs-col-1-1">
        <div
          v-if="isQuote"
          class="quote-container"
          :class="quoteColor"
        >
          <i class="icon icon-quote" />
        </div>
        <ContentblockHeadingTypeComponent
          :class="[content.uitlijning]"
          :heading-type="content.titelOpmaak"
          :title="content.titel"
          :idx="idx"
          class="title"
        />
        <div
          v-if="tekst"
          class="raw tekst"
          v-html="tekst"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<TitelContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});
const tekst = props.content.tekst;
const isQuote = props.content.quote === 'true';
const quoteColor = props.content.quoteShapeWit == 'true' ? 'white' : 'black';
</script>

<style lang="scss" scoped>
.quote-container {
  padding-bottom: 32px;

  &.black .icon {
    color: $black;
  }

  &.white .icon {
    color: $white;
  }

  .icon-quote {
    font-size: 6rem;
  }
}

.title {
  margin-left: -0.3rem;
}

.tekst {
  margin-top: 4.8rem;
}

@include media(sm) {
  .tekst {
    margin-top: 3.2rem;
  }
}

@include media(xs) {
  .quote-container {
    padding-bottom: 16px;

    .icon-quote {
      font-size: 3rem;
    }
  }
}
</style>
