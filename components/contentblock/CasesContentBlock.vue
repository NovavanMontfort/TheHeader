<template>
  <div class="CasesArtikelenContentBlock grid">
    <div class="filter-container flex justify-space-between align-end">
      <div
        v-if="content.titel || content.inleiding"
        class="col-5-12 sm-col-1-1"
      >
        <h1
          class="title"
          v-text="content.titel"
        />
        <div
          v-if="content.inleiding"
          class="introduction"
          v-html="content.inleiding"
        />
      </div>
      <div
        v-if="hasFilter"
        :class="{ hideSectorFilter: !showSectorFilter }"
        class="col-6-12 sm-col-1-1 work-overview-filter flex sm-flex-column justify-end"
      >
        <div
          class="input-wrapper wrapper-sector"
          :class="{ 'is-focused': inputIsFocused }"
        >
          <select
            v-show="showSectorFilter"
            v-model="selectedSector"
            name="branch"
            @focus="inputIsFocused = true"
            @blur="inputIsFocused = false"
          >
            <option value="">
              Sector
            </option>
            <option
              v-for="sector in sectors"
              :key="sector.value"
              :value="sector.value"
            >
              {{ sector.label }}
            </option>
          </select>
        </div>
        <div class="search-wrapper">
          <input
            v-model="searchValue"
            class="search-input"
            type="text"
            :placeholder="searchTranslation"
            :aria-label="searchTranslation"
          />
          <i class="input-icon icon icon-search" />
        </div>
      </div>
    </div>

    <div class="case-container flex justify-space-between">
      <ContentblockOverviewItem
        v-for="(article, idx) in articles"
        :key="article._id"
        :content="article.content"
        :case-idx="idx"
        :url="article._url"
      />

      <div v-if="articles.length == 0">
        <p class="intro-text">
          {{ baseGetTranslation('Jouw project hier?') }}
        </p>

        <ContentblockButton
          class="btn-secondary"
          :name="baseGetTranslation('Contacteer ons')"
          link="/contact"
          has-icon
        />
      </div>
    </div>

    <div
      v-if="articleCount > 10 && hasFilter"
      class="pagination"
    >
      <div class="col-1-1 pb-25">
        <nav class="flex justify-center">
          <div 
            class="btn pagination-btn"
            @click="goToPage(currentPage - 1)"
          >
            <i class="icon icon-arrow-left" />
          </div>
          <div
            v-for="(page, index) in Math.ceil(articleCount / 10)"
            :id="index"
            :key="index"
            class="btn pagination-btn"
            :class="currentPage == index + 1 ? 'btn-active' : ''"
            @click="goToPage(index + 1)"
          >
            {{ index + 1 }}
          </div>
          <div
            v-if="currentPage < Math.ceil(articleCount / 10)"
            class="btn pagination-btn"
            @click="goToPage(currentPage + 1)"
          >
            <i class="icon icon-arrow-right" />
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  content: {
    type: Object as PropType<CasesContentBlock>,
    required: true,
  },

  showFilter: {
    type: Boolean,
    default: false,
  },

  linkPrefix: {
    type: String,
    default: '/nl/ons-werk',
  },
});

const hasFilter = computed(() => props.content.filterWeergeven == 'true' || props.showFilter);
const inputIsFocused = ref(false);
const route = useRoute();
const searchValue = ref('');
const router = useRouter();
const showSectorFilter = ref(route.query.showSectorFilter ? true : false);

const searchTranslation = baseGetTranslation('Zoeken');

// Custom debounce function
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Create debounced GA tracking function
const debouncedGATracking = debounce((value: string) => {
  console.log('debouncedGATracking', value);
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'search_string_entered',
      url: route.path,
      search_string: value,
    });
  }
}, 500);

if (showSectorFilter.value) {

  onMounted(() => {
    alert('Functie uitgezet vanwege refactor naar nieuwe framework, vraag deze opnieuw aan indien nodig.')
  })
}
const sectors = [
  // Disabled these sectors for now
  // { label: 'Semi Overheid', value: 13 },
  // { label: 'Onderwijs & Training', value: 12 },
  { label: 'Non Profit', value: 11 },
  // { label: 'Mens & Werk', value: 10 },
  // { label: '	Marketing & Communicatie', value: 9 },
  { label: 'Dienstverlening', value: 7 },
  { label: 'Retail', value: 5 },
  { label: 'Financiële Sector', value: 4 },
  // { label: 'Bouw & Industrie	', value: 3 },
  // { label: 'Telecom & ICT', value: 2 },
  { label: 'Cultuur en Entertainment', value: 1 },
];

function getLabelById(id: number) {
  return sectors.find((s) => s.value === id)?.label;
}

function getIdbyLabel(label: string) {
  return sectors.find((s) => s.label === label)?.value;
}

const selectedSector = ref(route.query.sector ? getIdbyLabel(route.query.sector as string) : '');
// const config = computed(() => props.content.config);

watch(selectedSector, () => {
  router.push({ query: { page: 1, sector: getLabelById(selectedSector.value) } });
});

router.beforeEach((to, from) => {
  if (Object.keys(to.query).length > 0 && to.name !== from.name) {
    return { path: to.path };
  }
});

const presetArticles = props.content?.cases || [];
const { data: filterList } = await useBaseAsyncData('/pages/6/filters');

const sortings = {
  id: 209,
  desc: true
}

const size = props.content.maximaalWeerTeGevenArtikelen ? parseInt(props.content.maximaalWeerTeGevenArtikelen) || 10 : 10;
const articlesPerPage = size - presetArticles.length;
const {
  updateFilterValue,
  articles,
  updateSearchValue,
  articleCount,
  currentPage,
  goToPage,
  executeArticles,
} = filterPage(6, {
  filterData: filterList.value?.filters,
  sortings: [sortings],
  presetArticles,
  seo: {
    changeRoute: false,
    changeHead: true,
  },
  pagination: {
    enabled: false,
    show: false,
    articlesPerPage,
  }
});

updateFilterValue(1, 1);
await executeArticles();

watch(searchValue, (value) => {
  if (value) {
    updateFilterValue(1);
    updateSearchValue(value);
  } else {
    updateSearchValue('');
    updateFilterValue(1, 1);
  }

  debouncedGATracking(value);
  goToPage(1);
});



watch(currentPage, (value) => {
  window.scrollTo(0, 0);
  if (value > 1 && value) {
    router.push({ query: { page: value } });
  } else {
    router.push({ query: {} });
  }
});

</script>

<style lang="scss" scoped>
$gutter: 1rem;

.CasesArtikelenContentBlock {
  position: relative;
}

.filter-container {
  padding-bottom: 8rem;

  &:after {
    content: '';
    display: block;
    background: $black;
    height: 3.5rem;
    width: 1rem;
    position: absolute;
    right: -2.5rem;
    top: 4rem;
  }
}

.introduction :deep(p) {
  margin: 4.8rem 0 0;
  font-size: 2.6rem;
  line-height: 1.4;
}

.work-overview-filter {
  .search-wrapper {
    position: relative;
    width: 48%;
    min-width: 30rem;
    margin-left: 3rem;
    border-bottom: 0.2rem solid $black;
    height: fit-content;

    .search-input {
      width: 100%;
      font-size: 2rem;
      border: none;
      height: 6.4rem;
      background: transparent;
      font-family: $font-default;
      font-weight: 600;

      &::placeholder {
        color: $black;
      }
    }

    .input-icon {
      position: absolute;
      right: 1.7rem;
      top: 2.6rem;
      font-size: 1.8rem;
    }
  }
  &.hideSectorFilter {
    .wrapper-sector {
      display: none;
    }
  }

  .input-wrapper {
    position: relative;
    border-bottom: 0.2rem solid $black;
    height: fit-content;
    width: 48%;
    min-width: 30rem;

    select {
      border: none;
      font-size: 2rem;
      height: 6.4rem;
      width: 100%;
      background: transparent;
      color: $black;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      font-family: $font-default;
      font-weight: 600;
    }

    &:after {
      content: '\e909';
      font-family: icomoon;
      position: absolute;
      width: 2rem;
      height: 2rem;
      right: 1.5rem;
      top: 2.4rem;
      font-size: 1.1rem;

      pointer-events: none;
      transition: 0.1s ease-in-out;
    }

    &.is-focused {
      &:after {
        transform: rotate(180deg);
      }
    }
  }
}

.pagination {
  padding-bottom: 2.5rem;
}

.pagination-btn {
  padding: 0;
  border-radius: 0;
  aspect-ratio: 1 / 1;
  cursor: pointer;

  &.btn-active,
  &:hover {
    background-color: $black;
    color: $white;
  }

  &[disabled='true'] {
    pointer-events: none;
  }
}



@include media(lg) {
  .filter-container {
    &:after {
      right: 2.5rem;
    }
  }
}

@media (max-width: $screen-lg) {
  .work-overview-filter {
    .search-wrapper {
      width: 100%;
      margin-left: 0;
    }

    .input-wrapper {
      width: 100%;
    }
  }
}

@media (max-width: $screen-sm) {
  .introduction :deep(p) {
    padding-bottom: 4rem;
    margin: 0;
  }

  .filter-container {
    padding-bottom: 0;

    .title {
      padding-bottom: 3.2rem;
    }

    &:after {
      display: none;
    }
  }

  .case-container {
    width: 100% !important;
    padding-bottom: 1.2rem;
  }

  .work-overview-filter {
    padding-bottom: 8rem;

    .search-wrapper {
      width: 100%;
      margin-left: 0;
    }

    .input-wrapper {
      width: 100%;
    }
  }
}
</style>
