<template>
  <div
    ref="contentBlockContainer"
    class="ContentBlockContainer"
    :style="{ backgroundColor: config.achtergrondKleur, color: config.tekstkleur }"
    :class="{ 'header-not-first': firstIsNotHeader }"
  >
    <div
      v-for="contentblock in contentBlocks"
      :key="contentblock.idx"
      class="ContentBlock"
      :class="contentblock.classes"
    >
      <NuxtErrorBoundary @error="handleError">
        <component
          :is="contentblock.component"
          :id="contentblock.settings?.anchor || contentblock._block._id"
          :key="contentblock.idx"
          class="contentblock-wrapper"
          :content="contentblock.contentblockData"
          :idx="contentblock.idx"
        />
        <template #error="{ error }">
          <div
            v-if="isDev"
            class="error-message"
          >
            Error loading content block: {{ contentblock._block._name }} -  {{ error }}
          </div>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGeneralStore from '~/store/general';

interface Props {
  contentblocks: BasisContentBlock[];
  config?: {
    achtergrondKleur: string;
    tekstkleur: string;
    anchor: string;
  };
}

const isDev = useRuntimeConfig().public.isDev;

const props = defineProps<Props>();
const generalStore = useGeneralStore();
const contentBlockContainer = ref<HTMLDivElement | null>(null);

const firstIsNotHeader = computed(() => {
  const firstId = props.contentblocks[0]?._block._id;
  return firstId !== 60 && firstId !== 82 && firstId !== 128;
});

const contentBlocks = computed(() =>
  props.contentblocks?.map((block, idx) => ({ ...block, component: getComponent(block._block._id), classes: getClasses(block), idx }))
);

// NOTE: Deze id's kunnen verschillen, bij smook italia waren sommige anders. Goed om even bij te houden.
function getComponent(id: number) {
  switch (id) {
    case 70:
      return defineAsyncComponent(() => import('./contentblock/TitelContentBlock.vue'));
    case 60:
      return defineAsyncComponent(() => import('./contentblock/HeaderContentBlock.vue'));
    case 55:
      return defineAsyncComponent(() => import('./contentblock/TekstEnAfbeeldingContentBlock.vue'));
    case 33:
      return defineAsyncComponent(() => import('./contentblock/TekstEenKolomsContentBlock.vue'));
    case 36:
      return defineAsyncComponent(() => import('./contentblock/AfbeeldingContentBlock.vue'));
    case 44:
      return defineAsyncComponent(() => import('./contentblock/TweeAfbeeldingenContentBlock.vue'));
    case 63:
      return defineAsyncComponent(() => import('./contentblock/TekstDrieKolomsContentBlock.vue'));
    case 1076:
      return defineAsyncComponent(() => import('./contentblock/EmbedContentBlock.vue'));
    case 35:
      return defineAsyncComponent(() => import('./contentblock/VideoContentBlock.vue'));
    case 72:
      return defineAsyncComponent(() => import('./contentblock/AutoplayVideoContentBlock.vue'));
    case 58:
      return defineAsyncComponent(() => import('./contentblock/TekstContentBlock.vue'));
    case 77:
      return defineAsyncComponent(() => import('./contentblock/TekstLinkItemsContentBlock.vue'));
    case 54:
      return defineAsyncComponent(() => import('./contentblock/TekstTweeKolomsContentBlock.vue'));
    case 71:
      return defineAsyncComponent(() => import('./contentblock/VacaturesContentBlock.vue'));
    case 57:
      return defineAsyncComponent(() => import('./contentblock/MedewerkersContentBlock.vue'));
    case 66:
      return defineAsyncComponent(() => import('./contentblock/OnzeCultuurContentBlock.vue'));
    case 51:
      return defineAsyncComponent(() => import('./contentblock/CasesContentBlock.vue'));
    case 52:
      return defineAsyncComponent(() => import('./contentblock/OnsWerkContentBlock.vue'));
    case 50:
      return defineAsyncComponent(() => import('./contentblock/NieuwsOverzichtContentBlock.vue'));
    case 34:
      return defineAsyncComponent(() => import('./contentblock/AfbeeldingSliderContentBlock.vue'));
    case 61:
      return defineAsyncComponent(() => import('./contentblock/ReferentieSliderContentBlock.vue'));
    case 78:
      return defineAsyncComponent(() => import('./contentblock/VerwanteArtikelenContentBlock.vue'));
    case 68:
      return defineAsyncComponent(() => import('./contentblock/VeelgesteldeVragenContentBlock.vue'));
    case 80:
      return defineAsyncComponent(() => import('./contentblock/StappenplanContentBlock.vue'));
    case 81:
      return defineAsyncComponent(() => import('./contentblock/QuicklinksContentBlock.vue'));
    case 79:
      return defineAsyncComponent(() => import('./contentblock/PaginasUitgelichtContentBlock.vue'));
    case 82:
      return defineAsyncComponent(() => import('./contentblock/HomepageHeaderContentBlock.vue'));
    case 122:
      return defineAsyncComponent(() => import('./contentblock/FormulierContentBlock.vue'));
    case 125:
      return defineAsyncComponent(() => import('./contentblock/AfbeeldingFolderSliderContentBlock.vue'));
    default:
      return null;
  }
}

function getClasses(block: BasisContentBlock) {
  const fullWidthIds = [60, 70, 57, 36, 50, 58, 61, 66, 77, 44, 82, 79, 72];
  const classes = [];
  if (fullWidthIds.includes(block._block._id)) {
    classes.push('FullWidthContentBlock');
  }
  if (block.contentblockData.marginBottom) {
    // because CSV...
    classes.push(block.contentblockData.marginBottom?.split(', '));
  }

  return classes;
}

// Images, videos etc should have a white header
const visualIds = [35, 36, 44, 60, 61, 77, 82];

onMounted(() => {
  try {
    const pageBackgroundColor = contentBlockContainer.value ? window.getComputedStyle(contentBlockContainer.value)?.backgroundColor : null;

    const checkAndSetHeaderColor = (entry: { target: Element; isIntersecting?: boolean }) => {
      try {
        const targetElement = entry.target;
        const backgroundColor = window.getComputedStyle(targetElement).backgroundColor;

        if (visualIds.includes(parseInt(targetElement.id)) || backgroundColor === 'rgb(0, 0, 0)' || pageBackgroundColor === 'rgb(0, 0, 0)') {
          generalStore.setHeaderColor('white');
        } else {
          generalStore.setHeaderColor('black');
        }
      } catch (error) {
        console.error('Error in checkAndSetHeaderColor:', error);
        // Set a default header color if there's an error
        generalStore.setHeaderColor('black');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            checkAndSetHeaderColor(entry);
          }
        });
      },
      {
        rootMargin: '0px 0px -100% 0px',
        threshold: 0,
      }
    );

    const elementsToObserve = [
      ...document.querySelectorAll('.contentblock-wrapper'),
      ...document.querySelectorAll('footer')
    ];

    elementsToObserve.forEach((div) => {
      try {
        observer.observe(div);
      } catch (error) {
        console.error('Error observing element:', error);
      }
    });

    elementsToObserve.forEach((div) => {
      const entry = {
        target: div,
        isIntersecting: true,
      };
      checkAndSetHeaderColor(entry);
    });

  } catch (error) {
    console.error('Error in header color observer setup:', error);
    // Set a default header color if the whole setup fails
    generalStore.setHeaderColor('black');
  }
});

function handleError(error: unknown) {
  console.error('Error in content block:', error);
}
</script>

<style lang="scss" scoped>
.ContentBlockContainer {
  display: flex;
  align-items: center;
  flex-direction: column;

  &.header-not-first {
    padding-top: 20rem;
  }
}
.ContentBlock {
  width: 100%;
  width: 100%;
  max-width: $gridsize;
  position: relative;

  &.FullWidthContentBlock
  // &.TitelContentBlock, 
  // &.Carrousel,
  // &.AfbeeldingBannerContentBlock
  {
    max-width: 100%;
    border-bottom: none;
    padding: 0 !important;
  }

  &.margin-default {
    margin-bottom: 14rem;
  }

  &.margin-small {
    margin-bottom: 5rem;
  }

  &.margin-none {
    margin-bottom: 0;
  }

  &.no-overflow-x {
    overflow: inherit;
  }

  &.double-margin-top {
    margin-top: 8rem;
  }

  &.double-margin-bottom {
    margin-bottom: 8rem;
  }

  &.half-margin-bottom {
    margin-bottom: 2rem;
  }

  &.half-margin-top {
    margin-top: 2rem;
  }

  &.no-margin-bottom {
    margin-bottom: 0;
  }

  &.no-margin-top {
    margin-top: 0;
  }
}

@media (max-width: $screen-sm) {
  .ContentBlockContainer {
    &.header-not-first {
      padding-top: 14rem;
    }
  }

  .ContentBlock {
    &.margin-default {
      margin-bottom: 5rem;
    }

    &.margin-small {
      margin-bottom: 3rem;
    }
  }
}

.error-message {
  padding: 1rem;
  color: red;
  border: 1px solid red;
  margin: 1rem;
}
</style>
