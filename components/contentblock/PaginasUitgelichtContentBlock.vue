<template>
  <div class="UitgelichtContentBlock">
    <div
      v-show="isSmSize"
      class="mobile-view"
    >
      <div
        v-for="(pagina, idx) in paginasData"
        :key="idx"
      >
        <div class="grid">
          <div class="col-1-1 text">
            <span
              class="label"
              v-html="pagina?.content.titel"
            />
            <h3
              class="title"
              v-html="pagina?.content.subtitel"
            />

            <div class="divide" />


            <ContentblockButton
              class="btn btn-secondary"
              :name="`${baseGetTranslation('Bekijk')} ${pagina?.content.slug}`"
              :link="pagina?._url"
            />
          </div>
        </div>
        <div
          v-if="mobileBackgroundUrls[idx]"
          class="imageContainer image"
          :style="{ backgroundImage: `url(${mobileBackgroundUrls[idx]})` }"
        />
      </div>
    </div>

    <div
      v-if="!isSmSize"
      class="animation-wrapper"
    >
      <div class="grid flex align-center">
        <div class="text-col">
          <div class="content">
            <div class="labels text-container">
              <span
                v-for="(pagina, idx) in paginasData"
                :key="idx"
                class="container-item label"
                v-html="pagina?.content.titel"
              />
            </div>
            <div class="titles text-container">
              <h3
                v-for="(pagina, idx) in paginasData"
                :key="idx"
                class="container-item title"
                v-html="pagina?.content.subtitel"
              />
            </div>

            <div class="divide" />

            <div class="paragraphs text-container">
              <span
                v-for="(pagina, idx) in paginasData"
                :key="idx"
                class="container-item paragraph m-0"
                v-html="pagina?.content.inleiding"
              />
            </div>
            <div class="buttons">
              <NuxtLink
                :to="currentHref"
                target="_self"
                class="btn btn-secondary "
              >
                <i class="icon icon-arrow-right btn-icon mr-15" />
                <div class="text-container">
                  <p
                    v-for="(pagina, idx) in paginasData"
                    :key="idx"
                    class="btn-label mt-0 mb-0 mr-3"
                  >
                    {{ baseGetTranslation('Bekijk') }} {{ pagina?.content.slug }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="images">
        <div
          v-for="(pagina, idx) in paginasData"
          :key="idx"
          class="imageContainer image"
        >
          <ImageComponent
            :media-id="paginasData[idx]?.content.afbeelding"
            :sizes="{ sm: 1000, md: 1400, lg: 1400, xl: 1800 }"
            class="header-image"
            :alt="`Afbeelding ${idx + 1}`"
          />
          <!-- <NuxtImg
            loading="lazy"
            :sizes="{ sm: 1000, md: 1800, lg: 1600 }"
            :alt="`Afbeelding ${idx + 1}`"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import useGeneralStore from '@/store/general';

const props = defineProps({
  content: {
    type: Object as PropType<VerwanteArtikelenContentBlock>,
    required: true,
  },
});

const elocusStore = useElocusStore();
const generalStore = useGeneralStore();
const lowStimulusActive = computed(() => generalStore.lowStimulusActive);

const { isSmSize } = useIsMobile();
const mobileBackgroundUrls = ref<string[]>([]);

function getMobileBackgroundUrls() {
  paginasData.value.forEach((pagina, idx) => {
    mobileBackgroundUrls.value.push('');
    const imageId = pagina?.content.afbeelding;

    getImage(imageId, 620, 620).then((res) => {
      if (res.url) {
        mobileBackgroundUrls.value[idx] = res.url;
      }
    });
  });
}

gsap.registerPlugin(ScrollTrigger);

const currentIndex = ref(0);

function initAnimation() {
  const animationWrapper = document.querySelector('.animation-wrapper');

  let direction = 1;
  let tl;

  function initTimeline() {
    if (tl) {
      tl.kill();
    }

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: animationWrapper,
        pin: true,
        start: 'top top',
        scrub: 0.5,
        end: '+=3000',
        snap: {
          snapTo: 'labels',
          duration: { min: 0.2, max: 0.5 },
          delay: 0.2,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => (direction = self.direction),
      },
    });
  }

  const labels = document.querySelectorAll('.animation-wrapper .labels .label');
  const titles = document.querySelectorAll('.animation-wrapper .titles .title');
  const paragraphs = document.querySelectorAll('.animation-wrapper .paragraphs .paragraph');
  const buttons = document.querySelectorAll('.animation-wrapper .buttons .btn .btn-label');
  const images = document.querySelectorAll('.animation-wrapper .images .image');

  const paragraphsContainer = document.querySelector('.animation-wrapper .paragraphs');
  const titlesContainer = document.querySelector('.animation-wrapper .titles');

  let highestParagraph: Element | null = null;
  let maxParagraphHeight = 0;

  let highestTitle: Element | null = null;
  let maxTitleHeight = 0;

  function calcParagraphHeight() {
    paragraphs.forEach((paragraph) => {
      const clientHeight = paragraph.clientHeight;
      if (clientHeight > maxParagraphHeight) {
        maxParagraphHeight = clientHeight;
        highestParagraph = paragraph;
      }
    });
  }

  calcParagraphHeight();

  function calcTitleHeight() {
    titles.forEach((title) => {
      const clientHeight = title.clientHeight;
      if (clientHeight > maxTitleHeight) {
        maxTitleHeight = clientHeight;
        highestTitle = title;
      }
    });
  }

  calcTitleHeight();

  gsap.set(labels, { yPercent: 100 });
  gsap.set(labels[0], { yPercent: 0 });

  gsap.set(buttons, { yPercent: 100 });
  gsap.set(buttons[0], { yPercent: 0 });

  let firstTitleHeight = highestTitle?.clientHeight;
  let firstParagraphHeight = highestParagraph?.clientHeight;
  initTimeline();

  function updateHeights() {
    calcParagraphHeight();
    calcTitleHeight();

    firstTitleHeight = highestTitle?.clientHeight;
    firstParagraphHeight = highestParagraph?.clientHeight;

    gsap.set(titles, { y: () => highestTitle?.clientHeight });
    gsap.set(titles[0], { y: 0 });

    titlesContainer.style.height = highestTitle?.clientHeight + 'px';

    gsap.set(paragraphs, { y: () => highestParagraph?.clientHeight });
    gsap.set(paragraphs[0], { y: 0 });

    paragraphsContainer.style.height = highestParagraph?.clientHeight + 'px';

    rebuildTimeline();
  }

  updateHeights();

  function rebuildTimeline() {
    tl.clear();

    labels.forEach((label, index) => {
      if (index < labels.length - 1) {
        tl.from(images[index + 1], { yPercent: '100', duration: 2, ease: 'power2.easeIn' }).add(() => {
          const tlTemp = gsap.timeline();

          if (tl.scrollTrigger?.direction == -1) {
            tlTemp
              .to(buttons[index + 1], { yPercent: 100, ease: 'power2.easeIn', duration: 1 }, '<20%') // Slide out the next button
              .to(buttons[index], { yPercent: 0, ease: 'power2.easeIn', duration: 1 }, '<') // Slide in the current button
              .to(paragraphs[index + 1], { y: () => firstParagraphHeight, ease: 'power2.easeIn', stagger: 0.1, duration: 1 }, '<') // Slide out the next paragraph
              .to(
                paragraphs[index],
                {
                  y: 0,
                  ease: 'power2.easeIn',
                  stagger: 0.1,
                  duration: 1,
                },
                '<'
              ) // Slide in the current paragraph
              .to(titles[index + 1], { y: () => firstTitleHeight, ease: 'power2.easeIn', stagger: 0.1, duration: 0.8 }, '<') // Slide out next title lines
              .to(
                titles[index],
                {
                  y: 0,
                  ease: 'power2.easeIn',
                  stagger: 0.1,
                  duration: 0.8,
                },
                '<'
              )
              .to(labels[index + 1], { yPercent: 100, ease: 'power2.easeIn', duration: 1 }, '<') // Slide out the next label
              .to(labels[index], { yPercent: 0, ease: 'power2.easeIn', duration: 1 }, '<') // Slide in the current label
              .addLabel(`section-${index}`);
            currentIndex.value = index;
          } else {
            tlTemp
              .to(labels[index], { yPercent: -100, ease: 'power2.easeIn', duration: 1 }, '<20%') // Slide out the current text
              .to(labels[index + 1], { yPercent: 0, ease: 'power2.easeIn', duration: 1 }, '<') // Slide in the next text
              .to(titles[index], { y: () => -firstTitleHeight, ease: 'power2.easeIn', stagger: 0.1, duration: 0.8 }, '<') // Slide out current title lines
              .to(
                titles[index + 1],
                {
                  y: 0,
                  ease: 'power2.easeIn',
                  stagger: 0.1,
                  duration: 0.8,
                },
                '<'
              )
              .to(paragraphs[index], { y: () => -firstParagraphHeight, ease: 'power2.easeIn', stagger: 0.1, duration: 1 }, '<') // Slide out the current text
              .to(
                paragraphs[index + 1],
                {
                  y: 0,
                  ease: 'power2.easeIn',
                  duration: 0.8,
                },
                '<'
              ) // Slide in the next text
              .to(buttons[index], { yPercent: -100, ease: 'power2.easeIn', duration: 1 }, '<') // Slide out the current text
              .to(buttons[index + 1], { yPercent: 0, ease: 'power2.easeIn', duration: 1 }, '<') // Slide in the next text
              .addLabel(`section-${index}`);
            currentIndex.value = index + 1;
          }
        }, '<50%');
      }
    });
  }
}

onMounted(() => {
  if (isSmSize.value) {
    getMobileBackgroundUrls();
  } else if (process.client && props.content.landingspaginas.length > 1) {
    initAnimation();
  } else {
    return;
  }
});

const paginas = computed(() => {
  if (!props.content.maximaalWeerTeGevenArtikelen) return props.content.landingspaginas;
  return props.content.landingspaginas.splice(0, props.content.maximaalWeerTeGevenArtikelen);
});

const paginasData = computed(() => {
  return paginas.value;
});

const currentHref = computed(() => paginasData.value[currentIndex.value]._url || '#');

watch(lowStimulusActive, (val) => {
  // Don't even bother making this work.
  window.location.reload();
});
</script>

<style lang="scss" scoped>
.animation-wrapper {
  display: grid;
  grid-template-columns: calc((5 / 12) * 100%) 1fr;
  overflow: visible;
  gap: 6rem;
  height: 100vh;

  .text-col {
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: calc((100vw - 1680px) / 2);

    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5.6rem;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

    .text-container {
      position: relative;
      display: flex;
      overflow: hidden;
      width: 100%;

      .container-item,
      .btn-label {
        position: relative;
        padding-bottom: 0.1em;
        width: 100%;

        &:not(:first-of-type) {
          position: absolute;
        }
      }
    }
  }
}

.images {
  position: relative;
  overflow: visible;
  width: 100%;

  .imageContainer {
    position: absolute;
    height: 100%;
    height: 100%;
    border-radius: 0;

    .header-image {
      height: 100%;
      width: 100%;

      :deep(.image-wrapper) {
        height: 100%;
        width: 100%;

        img {
          object-fit: cover;
          height: 100%;
          width: 100%;
          border-radius: 0;
        }
      }
    }
  }
}

.label {
  font-family: $font-inter;
  font-feature-settings:
    'salt' on,
    'ss02' on;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2.88px;
  text-transform: uppercase;

  &:deep(p) {
    margin: 0;
  }
}

.divide {
  width: 16rem;
  height: 0.2rem;
  background-color: $black;
}

.paragraph {
  :deep(p) {
    margin: 0;

    a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}

@media (max-width: 1680px) {
  .animation-wrapper .text-col {
    padding-left: 0;
  }
}

@media (max-width: $screen-lt) {
  .animation-wrapper {
    gap: 6rem;

    .grid {
      padding-right: 0;
    }
  }
}

@media (max-width: $screen-md) {
  .animation-wrapper {
    grid-template-columns: 44rem 1fr;
    gap: 6rem;
  }
}

@media (max-width: $screen-sm) {
  .mobile-view {
    display: flex;
    flex-direction: column;

    .text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 3.2rem;
      padding-top: 10rem;
      padding-bottom: 10rem;

      .label {
        font-size: 1.6rem;
      }
    }

    .imageContainer {
      height: 40rem;

      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .divide {
      width: 10rem;
    }
  }

  .animation-wrapper {
    display: none;
  }
}
</style>
