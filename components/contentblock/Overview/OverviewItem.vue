<template>
  <div
    class="case flex SingleCase OverviewItem"
    :class="getClass(caseIdx)"
  >
    <NuxtLink
      v-if="url"
      class="case-link flex flex-column"
      :to="url"
      :data-aos="aosClass"
    >
      <div class="case-content flex flex-column align-start">
        <div class="case-customer">
          <h5
            class="heading-5"
            v-html="cleanTitle"
          />
          <i class="icon icon-arrow-right ml-15" />
        </div>
        <p class="case-title">
          {{ content.subtitel }}
        </p>
      </div>
      <div class="img-container">
        <ParallaxContainer class="case-inner flex">
          <video
            v-if="content.vimeoYoutubeLink"
            ref="videoElement"
            class="case-video"
            preload="auto"
            :autoplay="!lowStimulusActive"
            loop
            muted
            playsinline
            webkit-playsinline
            :poster="poster"
            :src="content.vimeoYoutubeLink"
          />

          <BaseImage
            v-else-if="content.afbeelding1200X900"
            :media-id="content.afbeelding1200X900"
            :sizes="imgSize"
            class="case-image"
            loading="lazy"
            :alt="content.titel"
          />

          <BaseImage
            v-else-if="content.afbeelding700X700"
            :media-id="content.afbeelding700X700"
            :sizes="imgSize"
            class="case-image"
            loading="lazy"
            :alt="content.titel"
          />

          <BaseImage
            v-else-if="content.afbeelding?.id"
            :media-id="content.afbeelding?.id"
            :sizes="imgSize"
            class="case-image"
            loading="lazy"
            :alt="content.titel"
          />

          <BaseImage
            v-else-if="content.afbeelding"
            :media-id="content.afbeelding"
            :sizes="imgSize"
            class="case-image"
            loading="lazy"
            :alt="content.titel"
          />
        </ParallaxContainer>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },

  caseIdx: {
    type: Number,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },
});

const { lowStimulusActive } = useBaseAccessibility();
const size = computed(() => getClass(props.caseIdx));

function getImgSize() {
  switch (size.value) {
    case 'small-size':
      return {
        lg: 800,
        sm: 800,
      };
    case 'big-size':
      return {
        lg: 1300,
        sm: 1000,
      };

    case 'xlarge-size':
      return {
        lg: 1800,
        sm: 1200,
      };

    default:
      return {
        lg: 1200,
        sm: 1000,
      };
  }
}

const imgSize = computed(() => getImgSize());
const aosClass = computed(() => (props.caseIdx < 2 ? '' : 'fade-up'));
const cleanTitle = props.content.titel.replace(/&nbsp;|<\/?p>|<\/?strong>/g, ' '); // unfortunately, the title is sometimes wrapped in <p> or <strong> tags, because of old styling of cre8ion
const poster =
  props.content.vimeoYoutubeLink && props.content.afbeelding1200X900 ? await getImageUrl(props.content.afbeelding1200X900) : undefined;

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
// Code to only pause video if out of view, doesn't completely work
// const videoElement = ref(null);
// let observer = null;
// const isPlaying = ref(false);

// onMounted(() => {
//   if (!lowStimulusActive) {
//     observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         const video = entry.target;

//         if (entry.isIntersecting) {
//           isPlaying.value = true;
//           // Wait for the video to be ready before attempting to play
//           if (video.readyState >= 2) {
//             // Video is ready to play
//             startPlaying(video);
//           } else {
//             // Wait for the video to load enough to start playing
//             video.addEventListener('canplay', () => startPlaying(video), { once: true });
//           }
//         } else {
//           if (!video.paused) {
//             isPlaying.value = false;
//             video.pause();
//           }
//         }
//       });
//     });

//     if (videoElement.value) {
//       observer.observe(videoElement.value); // Observe the video element
//     }
//   }
// });

// onBeforeUnmount(() => {
//   if (observer && videoElement.value) {
//     observer.unobserve(videoElement.value); // Clean up observer on unmount
//   }
// });

// function startPlaying(video) {
//   // Only load and play if the video is not already playing
//   if (video.paused) {
//     if (video.src !== props.content.vimeoYoutubeLink) {
//       video.src = props.content.vimeoYoutubeLink;
//       video.load(); // Load the video if needed
//     }
//     video.play().catch((error) => {
//       isPlaying.value = true;
//       console.error('Error playing the video:', error);
//     });
//   }
// }
</script>

<style lang="scss" scoped>
.OverviewItem {
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

.case-link {
  width: 100%;
  color: inherit;
}

.router-link:hover {
  color: initial;
}

.img-container {
  overflow: hidden;
  order: -1;
  border-radius: $border-radius;
  max-height: 65vh;

  :deep(.case-image) {
    .skeleton-loader {
      height: 200px;
    }
    img {
      width: 100%;
      object-fit: cover;
      border-radius: $border-radius;
      aspect-ratio: 16/9;
    }
  }
}

.case-video {
  width: 100%;
  object-fit: cover;
  border-radius: $border-radius;
  aspect-ratio: 16/9;
}

.case-content {
  padding-top: 40px;
}

.case:hover {
  .case-customer {
    .icon {
      transform: translateX(1rem);
    }
  }
}

.case-customer {
  text-wrap: balance;

  .heading-5 {
    display: inline;
    vertical-align: middle;
  }

  .icon {
    display: inline-block;
    margin-left: 1.2rem;
    font-size: 2.6rem;
    vertical-align: middle;
    transform: translateX(0);
    transition: 0.3s ease-in-out;
  }
}

@include media(lt) {
  .case-content {
    padding-top: 2.4rem;
    padding-bottom: 4rem;
  }

  .case:hover {
    .case-customer {
      .icon {
        transform: translateX(0.6rem);
      }
    }
  }

  .case-customer {
    i {
      font-size: 2rem;
    }
  }

  .case-title {
    margin: 0;
  }
}

@include media(sm) {
  .SingleCase {
    width: 100% !important;
  }
}
</style>
