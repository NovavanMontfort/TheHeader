<template>
  <div class="CasesArtikelenContentBlock grid">
    <div>
      <CasesContentBlock
        :content="content"
        show-filter
        :link-prefix="prefix"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import CasesContentBlock from './CasesContentBlock.vue';

defineProps({
  content: {
    type: Object as PropType<VerwanteArtikelenContentBlock>,
    required: true,
  },
});

const multiLanguageStore = useMultiLanguageStore();
const prefix = computed(() => (multiLanguageStore.currentLanguage === 'nl' ? '/ons-werk' : '/work'));
</script>
