<template>
  <section class="contentblock-News NieuwsOverzichtContentBlock">
    <div class="grid">
      <div class="col-1-1 no-p news-items flex">
        <ContentblockCasesOverzichtContainer
          class="col-1-1 no-p grid"
          :filtered-cases="cases"
          :max-pages="content.maximaalWeerTeGevenArtikelen"
          :manipulate-url="true"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<VerwanteArtikelenContentBlock>,
    required: true,
  },
});


const cases = ref([]);

if (props.content.aanvullenMet) {
  const slug = props.content.aanvullenMet
  const pageSize = 99
  let page = 1
  const all = []
  const HARD_CAP = 3

  try {
    // loop tot leeg of < pageSize
    while (page <= HARD_CAP) {
      const resp = await useBaseApi(`/pages/${slug}`, {
        method: 'POST',
        body: { pagination: { page, pageSize } },
      })

      const batch = resp?.pages ?? []
      if (!batch.length) break

      all.push(...batch)

      if (batch.length < pageSize) break // laatste pagina
      page++
    }

    // dedupe + sort + map
    const dedup = Array.from(new Map(all.map(it => [String(it._id), it])).values())

    cases.value = dedup
      .sort((a, b) => Number(b._id) - Number(a._id))
      .map(item => ({ ...item, subtitel: item.inleiding }))
  } catch (e) {
    console.error('Fout bij ophalen pages:', e)
    cases.value = []
  }
}
</script>

<style lang="scss" scoped>
.contentblock-News {
  padding: 80px 0;
  overflow: hidden;
  margin-bottom: 0;
}
</style>
