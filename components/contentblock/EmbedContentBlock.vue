<template>
  <div class="EmbedContentBlock">
    <div class="col-1-1">
      <ContentblockHeadingTypeComponent
        :heading-type="content.seoHeadingtype"
        :title="content.titel"
      />

      <div>
        <div
          v-if="embed"
          class="q-mb-sm light raw"
          v-html="embed"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<EmbedContentBlock>,
    required: true,
  },
});

const embed = ref('');

onMounted(() => {
  embed.value = props.content.tekst;
});
</script>

<style lang="scss" scoped>
.embed {
  width: 100%;
}
</style>
