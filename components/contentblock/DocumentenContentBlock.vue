<template>
  <div class="grid">
    <ContentblockHeadingTypeComponent
      class="col-1-1"
      :heading-type="content.seoHeadingtype"
      :title="content.titel"
    />

    <div class="row col-1-1">
      <div
        v-for="(document, idx) in documents"
        :key="idx"
        class="document flex justify-space-between"
      >
        <div class="flex align-center">
          <span class="btn btn-primary"> pdf </span>
          <div class="documentTitle">
            {{ document.name }}
          </div>
        </div>

        <span @click="downloadFile(document)">
          <FontAwesomeIcon
            :icon="faDownload"
            class="btn btn-primary file-icon"
          />

          <!-- <q-icon name="icon-download" /> -->
          <!-- Download -->
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<DocumentenContentBlock>,
    required: true,
  },
});

interface Document {
  id: number;
  name: string;
}

const MAX_DOCUMENTS = 5;
const documents = ref<Document[]>([]);
for (let i = 1; i < MAX_DOCUMENTS + 1; i++) {
  if (props.content['document' + i]) {
    documents.value.push({
      id: props.content['document' + i],
      name: props.content['document' + i + 'Naam'],
    });
  }
}

async function downloadFile(doc: Document) {
  const res = await useBaseApi('/media/' + doc.id);

  const blob = new Blob([res], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', doc.name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style lang="scss" scoped>
.document {
  padding: 1.2rem 0;

  margin: 2rem 0;
  border-bottom: 1px solid black;

  .btn {
    margin: 0 1rem;
    padding: 0.8rem 1.4rem;
  }
  .file-icon {
    padding: 1.2rem;
    border-radius: 100%;
  }
}
</style>
