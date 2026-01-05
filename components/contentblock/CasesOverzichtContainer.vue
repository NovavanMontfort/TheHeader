<template>
  <div
    ref="container"
    class="CasesOverzichtContainer"
  >
    <div>
      <div
        :key="currentKey"
        class="flex col-1-1 align-start justify-space-between cases-overview"
        :class="{ 'show-cases': showCases }"
      >
        <ContentblockSingleCase
          v-for="(item, idx) in visibleCases"
          :key="idx"
          :case-idx="idx"
          class="no-p case-container"
          :class="getClass(idx)"
          :content="item.content"
          :size="getClass(idx)"
          :url="item._url"
        />
      </div>
    </div>
  </div>
  <div
    v-if="filteredCases.length > itemsPerPage && !hidePagination"
    class="pagination"
  >
    <div class="col-1-1">
      <nav class="flex justify-center">
        <router-link
          v-if="currentPage > 1"
          :to="{ query: { page: currentPage - 1 } }"
          class="btn pagination-btn"
        >
          <i class="icon icon-arrow-left" />
        </router-link>
        <router-link
          v-for="(page, index) in pages"
          :id="index"
          :key="index"
          class="btn pagination-btn"
          :class="currentPage == index + 1 ? 'btn-active' : ''"
          :to="{ query: { page: index + 1 } }"
        >
          {{ index + 1 }}
        </router-link>
        <router-link
          v-if="currentPage < pages"
          :to="{ query: { page: currentPage + 1 } }"
          class="btn pagination-btn"
        >
          <i class="icon icon-arrow-right" />
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  filteredCases: {
    type: Object as PropType<CaseItem[]>,
    required: true,
  },

  maxCases: {
    type: Number,
    default: 0,
  },

  linkPrefix: {
    type: String,
    default: '/ons-werk',
  },

  manipulateUrl: {
    type: Boolean,
    default: false,
  },

  hidePagination: {
    type: Boolean,
    default: false
  }
});

const route = useRoute();
const currentKey = ref(0);
const showCases = ref(true);
const itemsPerPage = computed(() => props.hidePagination ? 9999 : 10 );
const currentPage = ref(parseInt(route.query.page as string) || 1);

watch(
  () => route.query.page,
  () => {
    currentPage.value = parseInt(route.query.page as string);
  }
);

onUpdated(() => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 200);
});

const pageIndex = computed(() => {
  return parseInt(route.query.page as string) || 1;
});

const pages = computed(() => {
  return Math.ceil(props.filteredCases.length / itemsPerPage.value);
});

const visibleCases = computed(() => {
  const start = (pageIndex.value - 1) * itemsPerPage.value;
  const end = pageIndex.value * itemsPerPage.value;
  return props.filteredCases.slice(start, end);
});

watch(
  visibleCases,
  () => {
    showCases.value = false;
    currentKey.value++; // re-render cases
    setTimeout(() => {
      showCases.value = true;
    }, 500);
  },
  { deep: true }
);

function getClass(idx: number) {
  const lastDigit: string = idx.toString().split('').pop() || '';
  if (!lastDigit) return 'big-size';
  const SMALL = 'small-size';
  const BIG = 'big-size';
  const XLARGE = 'xlarge-size';

  const SIZES_MAP: Record<number, string> = {
    0: BIG,
    1: SMALL,
    2: SMALL,
    3: BIG,
    4: XLARGE,
    5: SMALL,
    6: BIG,
    7: BIG,
    8: SMALL,
    9: XLARGE,
  };

  return SIZES_MAP[parseInt(lastDigit)];
}

if (props.manipulateUrl) {
  const runtimeConfig = useRuntimeConfig();

  useHead(() => {
    const siteUrl = runtimeConfig.public.siteUrl;
    const maxPages = Math.ceil(props.filteredCases.length / itemsPerPage.value);

    const next =
      currentPage.value < maxPages
        ? {
            rel: 'next',
            href: siteUrl + route.path + '?page=' + (currentPage.value + 1),
          }
        : undefined;

    const prevPage = currentPage.value > 2 ? `?page=${currentPage.value - 1}` : '';

    const prev =
      currentPage.value > 1
        ? {
            rel: 'prev',
            href: siteUrl + route.path + prevPage,
          }
        : undefined;

    const canonicalValue = currentPage.value > 1 ? siteUrl + route.path + '?page=' + currentPage.value : siteUrl + route.path;

    const meta = route.fullPath.includes('&') ? { hid: 'robots', name: 'robots', content: 'noindex' } : undefined;

    return {
      link: [
        {
          rel: 'canonical',
          href: canonicalValue,
        },

        next ? next : '',
        prev ? prev : '',
      ],
      titleTemplate: (title) => (title ? `${title} - Pagina ${currentPage.value}` : 'Pagina ' + currentPage.value),
      meta,
    };
  });
}
</script>

<style lang="scss" scoped>
$gutter: 1rem;

.CasesArtikelenContentBlock {
  position: relative;
}

.pagination {
  margin: 0 auto;
}

.pagination-btn {
  padding: 0;
  border-radius: 0;
  aspect-ratio: 1 / 1;

  &.btn-active,
  &:hover {
    background-color: $black;
    color: $white;
  }

  &[disabled='true'] {
    pointer-events: none;
  }
}

.cases-overview {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  &.show-cases {
    opacity: 1;
  }
}

.case-container {
  padding-bottom: 32px;

  &.small-size {
    width: 40%;
  }

  &.big-size {
    width: 55%;
  }

  &.xlarge-size {
    width: 100%;
  }
}

@media (max-width: $screen-sm) {
  .pagination-btn {
    height: 5.2rem;
  }

  .case-container {
    width: 100% !important;
    padding-bottom: 12px;
  }

  .work-overview-filter {
    .search-wrapper {
      width: 100%;
    }

    select {
      margin: 2rem 0 0;
    }
  }
}
</style>
