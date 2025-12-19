<template>
  <div
    id="app"
    :class="{
      'theme-accessibility-prikkelarm': lowStimulusActive,
      'theme-accessibility-contrast': highContrastActive,
      'theme-accessibility-large-text': largeTextActive,
    }"
  >
    <transition
      v-if="!lowStimulusActive"
      name="overlay-slide-fade"
    >
      <LoadingOverlay v-if="showOverlay" />
    </transition>

    <NuxtLoadingIndicator
      v-if="!lowStimulusActive"
      color="black"
    />
    <UtilsSkipLinks />
    <component :is="HeaderComponent" :compact="isCompact"/>
    <div
      id="smooth-wrapper"
      :class="{ compact: isCompact }"
    >
      <div id="smooth-content">
        <NuxtPage :transition="transition" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import { pageTransition, pageTransitionMobile } from '~/helpers/transitionConfig';
import AOS from 'aos';

const router = useRouter();
const route = useRoute();
const { public: config } = useRuntimeConfig()
const project = config.project


const { isMobile, isSmSize } = useIsMobile();
const { lowStimulusActive, highContrastActive, largeTextActive } = useBaseAccessibility();

const transition = computed(() => (!lowStimulusActive.value ? activePageTransition.value : {}));
const activePageTransition = computed(() => (isMobile.value ? pageTransitionMobile : pageTransition));

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
let smoother = null;
const showOverlay = ref(true);
const isCompact = route.query?.compact;

const pathsWithLoader = ['/', '/en'];
const keywordsWithLoader = ['/nl/ons-werk', '/en/work'];

const isExcluded = pathsWithLoader.includes(route.fullPath) || keywordsWithLoader.some((keyword) => route.fullPath.startsWith(keyword));

if (!isExcluded) {
  showOverlay.value = false;
}

if (import.meta.env.DEV || isCompact) {
  showOverlay.value = false;
}

onMounted(() => {
  AOS.init({
    disable: isMobile.value,
    once: true,
    offset: 200,
    delay: 50,
  });

  createSmoother();

  setTimeout(() => {
    showOverlay.value = false;
  }, 1000);

  if (largeTextActive.value) {
    document.documentElement?.classList.add('large-text');
  }
});

router.afterEach(() => {
  if (lowStimulusActive.value) {
    window.scrollTo(0, 0);
  }

  // setTimeout(() => {
  //   AOS.refresh();
  // }, 500);
});

const { transitionState } = useTransitionComposable();

watch(
  transitionState,
  (value) => {
    if (value.transitionState == 1) {
      smoother ? smoother.refresh() : createSmoother();
      window.scrollTo(0, 0);
    }
  },
  { deep: true }
);

watch(highContrastActive, () => {
  location.reload();
});

watch(lowStimulusActive, (value) => {
  if (value && smoother) {
    smoother.kill();
  }
  location.reload();
});

watch(largeTextActive, (value) => {
  if (value) {
    document.documentElement?.classList.add('large-text');
  } else {
    document.documentElement?.classList.remove('large-text');
  }
  location.reload();
});

function createSmoother() {
  if (lowStimulusActive.value || isMobile.value) {
    return;
  }
  smoother = ScrollSmoother.create({
    smooth: 0.8, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });
}

const siteUrl = useRuntimeConfig().public.siteUrl;

const multiLanguageStore = useMultiLanguageStore();


const HeaderComponent = computed(() => {
  if (project === 'website') {
    return defineAsyncComponent(() => import('~/components/layout/website/Header.vue'))
  }
  return defineAsyncComponent(() => import('~/components/layout/culture/Header.vue'))
})


useHead(() => ({
  htmlAttrs: {
    lang: multiLanguageStore.currentLanguage,
    class: 'project-' + project
  },
  link: [
    {
      rel: 'canonical',
      href: siteUrl + route.path,
    },
  ],
}));

// const dataLayerLength = ref(0);
// const gtm = useGtm();

// onMounted(() => {
//   window.dataLayer = window.dataLayer || [];

//   const interval = setInterval(() => {
//     if (window.dataLayer.length !== dataLayerLength.value) {
//       console.log('DataLayer changed:', window.dataLayer);
//       dataLayerLength.value = window.dataLayer.length;

//       if (window.dataLayer?.find((item) => item.event === 'cookiecode.consent_update')) {
//         gtm?.enable(true);
//         clearInterval(interval);
//         console.log('GTM Loaded');
//       }
//     }
//   }, 1000); // Check every second

//   onUnmounted(() => clearInterval(interval));
// });
</script>

<style>
.overlay-slide-fade-enter-active,
.overlay-slide-fade-leave-active {
  transition:
    transform 0.7s ease-in-out,
    opacity 0.7s ease-in-out;
}

.overlay-slide-fade-enter,
.overlay-slide-fade-leave-to {
  transform: translateY(0);
  opacity: 0;
}

.overlay-slide-fade-leave-active {
  transform: translateY(100%);
  opacity: 1;
}

@media screen and (max-width: 768px) {
  [data-aos] {
    pointer-events: auto !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
