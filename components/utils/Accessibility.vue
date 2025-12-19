<template>
  <div class="AccessibilityMenu">
    <button
      class="btn btn-secondary"
      aria-label="accessibility options"
      aria-haspopup="true"
      :aria-expanded="menuOpen"
      tabindex="4"
      @click="toggleMenu"
    >
      {{ baseGetTranslation('Toegankelijkheid') }}
      <i class="icon icon-accessibility ml-1" />
    </button>
    <ul
      v-if="menuOpen"
      class="menu"
    >
      <li>
        <button
          class="menu-item"
          :class="{ active: lowStimulusActive }"
          @click="handleAccessibilityUpdate(accessibilityOptions.stimulus)"
        >
          {{ accessibilityTranslation.stimulus }}
        </button>
      </li>
      <li>
        <button
          class="menu-item"
          :class="{ active: highContrastActive }"
          @click="handleAccessibilityUpdate(accessibilityOptions.contrast)"
        >
          {{ accessibilityTranslation.contrast }}
        </button>
      </li>
      <li>
        <button
          class="menu-item"
          :class="{ active: largeTextActive }"
          @click="handleAccessibilityUpdate(accessibilityOptions.size)"
        >
          {{ accessibilityTranslation.size }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { lowStimulusActive, highContrastActive, largeTextActive, accessibilityOptions, handleAccessibilityUpdate } = useBaseAccessibility();
const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const multiLanguageStore = useMultiLanguageStore();
const currentLanguage = computed(() => multiLanguageStore.currentLanguage);

const accessibilityTranslation = computed(() => {
  if (currentLanguage.value === 'nl') { 
    return {
      accessibility: 'Toegankelijkheid',
      stimulus: 'Prikkelarm',
      contrast: 'Hoog contrast',
      size: 'Grotere tekst',
    };
  } else {
    return {
      accessibility: 'Accessibility',
      stimulus: 'Stimulus',
      contrast: 'High contrast',
      size: 'Larger text',
    };
  }
});

onMounted(() => {
  watch(lowStimulusActive, (value) => {
    const videos = document.querySelectorAll('video');

    if (value) {
      videos.forEach((video) => {
        video.pause();
      });
    } else {
      videos.forEach((video) => {
        video.play();
      });
    }
  });
});
</script>

<style lang="scss" scoped>
.AccessibilityMenu {
  position: relative;

  .icon {
    font-size: 28px;
  }
  
  .btn-secondary {
    cursor: pointer;
  }

  .menu {
    position: absolute;
    bottom: 100%;
    right: 0;
    background: white;
    border: 0.1rem solid #ccc;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    border-radius: 16px;

    button {
      width: 100%;
      background: none;
      border: none;
    }

    .menu-item {
      padding: 1.6rem;
      cursor: pointer;
      font-size: 2rem;

      &.active {
        font-weight: bold;
      }

      &:hover {
        border-radius: 16px;
        background: #f9f9f9;
      }
    }
  }
}
</style>
