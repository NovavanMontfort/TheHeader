<template>
  <div v-if="!isLoading">
    <main>
      <div class="contentblocksPageContainer">
        <ContentBlockContainer
          :contentblocks="contentblocks"
          :config="config"
        />
      </div>
    </main>
    <component :is="FooterComponent" class="q-mt-xl" />
  </div>
</template>

<script setup lang="ts">
const { public: configRuntime } = useRuntimeConfig()
const project = configRuntime.project
const props = defineProps({
  defaultId: {
    type: Number,
    default: 0,
  },
});

interface Metadata {
  titel?: string;
  title?: string;
  indexeren: string;
  canonical: string;
  description: string;
  afbeelding: number;
}

const contentblocks = ref<any>({});
const config = ref<any>({});
const route = useRoute();

const isLoading = ref(true);

const FooterComponent = computed(() => {
  if (project === 'website') {
    return defineAsyncComponent(() => import('~/components/layout/website/Footer.vue'))
  }
  return defineAsyncComponent(() => import('~/components/layout/culture/Footer.vue'))
})

async function mapMeta(metadata: Metadata, content: any, url: string) {
  let imageUrl = '';
  let robots = 'all';

  const ogUrl = useRuntimeConfig().public.siteUrl + url;
  const imageId = content?.afbeelding?.id || content?.afbeelding || content?.afbeelding1200X900;

  if (imageId) {
    const response = (await useBaseApi('/media/file/' + imageId)) as string;
    imageUrl = response;
  }

  if (metadata.indexeren === 'false') {
    robots = 'noindex, nofollow';
  }

  const mappedMetadata = {
    title: '',
    description: '',
    ogType: 'website',
    ogTitle: '',
    ogImage: imageUrl,
    ogDescription: '',
    ogUrl,
    robots,
  };
  const metaDataTitle = metadata?.title || metadata?.titel;
  if (!metaDataTitle && content) {
    // Again API being inconsistent, some pages have no metadata so we just abuse the content for now...
    const title = content?.titel?.replace(/<\/?(p|strong)[^>]*>/g, '');
    const description = content?.inleiding?.replace(/<\/?(p|strong)[^>]*>/g, '');

    mappedMetadata.title = title;
    mappedMetadata.ogTitle = title;
    mappedMetadata.description = description;
    mappedMetadata.ogDescription = description;
  } else {
    const title = `${metaDataTitle} | TC8L` || 'TC8L';

    mappedMetadata.title = title;
    mappedMetadata.ogTitle = title;
    mappedMetadata.description = metadata?.description;
    mappedMetadata.ogDescription = metadata?.description;
  }

  return mappedMetadata;
}

const response = await getResponse();

async function getResponse() {
  if (props.defaultId) {
    const { data } = await useBaseAsyncData(`/page/${props.defaultId}`);
    return data.value as ContentPage;
  }

  const data = await baseGetContentForSlug(route.path);
  return data as ContentPage;
}

try {
  if (response) {
    contentblocks.value = response?.content.content.filter((contentblock) => {
      if (contentblock.publicatiedatumTot && new Date(contentblock.publicatiedatumTot) < new Date()) {
        return false;
      }
      if (contentblock.publicatiedatumVan && new Date(contentblock.publicatiedatumVan) < new Date()) {
        return false;
      }
      return true;
    }).map((block) => {
      return {
        ...block,
        contentblockData: {
          ...block.content,
          ...block.settings,
        },
      };
    });

    config.value = { ...response.content, ...response.content.settings };

    if (response?.metadata) {
      const meta = await mapMeta(response.metadata, response.content, route.fullPath);
      console.log(meta);
      useSeoMeta({ ...meta });
    }

    isLoading.value = false;
  }
} catch (e) {
  console.error(e);
}

//   if (res) {
//     contentblocks.value = res?.content?.content?.filter((block) => {
//       if (block.publicatiedatumTot && new Date(block.publicatiedatumTot) < new Date()) {
//         return false;
//       }
//       if (block.publicatiedatumVan && new Date(block.publicatiedatumVan) < new Date()) {
//         return false;
//       }
//       return true;
//     });
//     config.value = res.content;
//     const mapped = await mapMeta(res.metadata, res.content, route.fullPath);

//     useSeoMeta({ ...mapped });

//     isLoading.value = false;
//   }
// } else {
//   const router = useRouter();
//   router.push({ name: 'error' });
</script>

<style scoped lang="scss">
.contentblocksPageContainer {
  min-height: 100vh;
}
</style>
