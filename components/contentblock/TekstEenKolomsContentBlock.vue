<template>
  <div class="TekstEenKolomsContentBlock col-1-1">
    <div class="grid">
      <div class="col-7-12 sm-col-1-1 no-p">
        <ContentblockHeadingTypeComponent
          :heading-type="content.seoHeadingtype"
          :title="content.titel"
          :idx="idx"
        />
        <span
          v-if="introduction"
          class="introduction raw"
          data-aos="fade-up"
          v-html="introduction"
        />
        <span
          v-if="text"
          class="raw"
          data-aos="fade-up"
          v-html="text"
        />

        <div>
          <ContentblockButton
            v-if="content.link"
            data-aos="fade-up"
            class="btn-secondary"
            :name="content.link.name"
            :link="content.link.link"
            :target="content.link.target"
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
    type: Object as PropType<TekstEenKolomsContentBlock>,
    required: true,
  },

  idx: {
    type: Number,
    default: 0,
  },
});

const introduction = ref(props.content.inleiding);
const text = ref(props.content.tekst);
// nextTick(() => {
//   text.value = props.content.tekst;
//   console.log(props.content.tekst);
// });
</script>

<style scoped lang="scss">
.introduction :deep(p) {
  margin: 4.8rem 0 0;
  font-size: 2.6rem;
  line-height: 1.4;
}

span :deep(p) {
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

@media (max-width: $screen-sm) {
  .ContentblockHeadingTypeComponent {
    margin-bottom: 3.2rem;
  }

  .introduction :deep(p) {
    font-size: 2.2rem;
  }

  span :deep(p) {
    margin-top: 0;
    margin-bottom: 3.2rem;
  }
}
</style>
