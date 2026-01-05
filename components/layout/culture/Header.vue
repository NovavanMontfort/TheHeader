<template>
  <header
    id="nav-wrapper"
    class="header"
    :class="[headerColor, { compact, 'on-visual-background': onVisualBackground }]"
  >
    <div class="header-inner flex flex-nowrap align-center">
      <div class="grid flex flex-nowrap">
        <div class="col-1-1 flex flex-nowrap sm-align-center">
          <div class="flex flex-nowrap align-center">
            <NuxtLink
              id="logo"
              class="flex align-start"
              :to="homeLink"
            >
              <img 
                src="/assets/images/Logo_The_Culture_Lab_TC8L_RGB_Wit.svg"
                class="logo-img"
                alt="The Culture Lab Logo"
              />
            </NuxtLink>
          </div>
          <div
            id="mainMenu"
            class="mainMenu flex-nowrap flex flex-column grow-2 xs-flex-column-reverse xs-flex-nowrap xs-justify-end"
          >
            <nav class="menu menuTop flex justify-end grow-2 xs-grow-0">
              <ul>
                <li
                  v-for="item in navItems"
                  :key="item.id"
                >
                  <NuxtLink :to="item.url">
                    <span class="item">
                      {{ item.name }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
              <div
                v-if="availableLanguages?.length > 1"
                class="language-selector-wrapper"
              >
                <button
                  class="language-selector btn"
                  @click="changeLanguage"
                >
                  {{ getAlternativeLanguage }}
                </button>
              </div>
            </nav>
          </div>
          <div id="triggerMenu">
            <div class="label">
              Menu
            </div>
            <div class="lines">
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import useGeneralStore from '@/store/general';

defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
});

const elocusStore = useElocusStore();
const multiLanguageStore = useMultiLanguageStore();
const router = useRouter();
const homeLink = computed(() => {
  return multiLanguageStore.currentLanguage === 'nl' ? '/#home' : '/en';
});
const navigation = computed(() => elocusStore.navigation);
const generalStore = useGeneralStore();
const headerColor = computed(() => 'color-' + generalStore.headerColor);
const onVisualBackground = computed(() => generalStore.onVisualBackground);
const currentLang = computed(() => multiLanguageStore.currentLanguage);
const availableLanguages = computed(() => multiLanguageStore.languages);

const navItems = [
  { 
    id: 1, 
    name: currentLang.value === 'nl' ? 'Jouw partner in cultuurmarketing' : '', 
    url: currentLang.value === 'nl' ? '#partnerincultuurmarketing' : '' 
  },
  { 
    id: 2, 
    name: currentLang.value === 'nl' ? 'Cultuur platform CaaS' : '', 
    url: currentLang.value === 'nl' ? '#caas' : '' 
  },
  { 
    id: 3, 
    name: currentLang.value === 'nl' ? 'Over The Culture Lab' : '', 
    url: currentLang.value === 'nl' ? '#theculturelab' : '' 
  },
  { 
    id: 4, 
    name: currentLang.value === 'nl' ? 'Contact' : '', 
    url: currentLang.value === 'nl' ? '#contact' : '' 
  },
]

const isMenuActive = ref(false);
const effectiveHeaderColor = computed(() => {
  return isMenuActive.value ? 'color-black' : headerColor.value;
});

// let prevScrollpos: number;
let triggerMenu: HTMLElement | null;

// function handleScroll() {
//   const header = document.querySelector('.header') as HTMLElement | null;
//   const currentScrollPos = window.scrollY;

//   if (!header) return;

//   if (prevScrollpos > currentScrollPos) {
//     header.style.top = '0';
//   } else if (currentScrollPos > 500) {
//     header.style.top = '-200px';
//   }

//   prevScrollpos = currentScrollPos;
// }

function triggerMobileMenu() {
  const mainMenu = document?.getElementById('mainMenu');
  const rootElement = document.documentElement;

  if (!triggerMenu || !mainMenu || !rootElement) return;

  isMenuActive.value = !isMenuActive.value;
  triggerMenu?.classList.toggle('active');
  mainMenu?.classList.toggle('active');
  rootElement?.classList.toggle('menu-active');
}

function checkAppHeight() {
  if (!document) return;
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}

onMounted(() => {
  checkAppHeight();

  prevScrollpos = window.scrollY;
  triggerMenu = document?.getElementById('triggerMenu');

  window.addEventListener('scroll', handleScroll);
  triggerMenu?.addEventListener('click', triggerMobileMenu);
  window.addEventListener('resize', checkAppHeight);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  triggerMenu?.removeEventListener('click', triggerMobileMenu);
  window.removeEventListener('resize', checkAppHeight);
});

router.afterEach(() => {
  setTimeout(() => {
    if (!triggerMenu || !document) return;
    isMenuActive.value = false;
    triggerMenu?.classList.remove('active');
    document?.getElementById('mainMenu')?.classList.remove('active');
    document.documentElement?.classList.remove('menu-active');
  }, 300);
});

function changeLanguage() {
  const newLanguagge = currentLang.value === 'nl' ? 'en' : 'nl';
  multiLanguageStore.setCurrentLanguage(newLanguagge);
}

const getAlternativeLanguage = computed(() => {
  return currentLang.value === 'nl' ? 'English' : 'Nederlands';
});
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  min-height: 100px;
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  transition: top 0.2s linear;

  &.compact {
    .menuTop {
      display: none !important;
    }

    #triggerMenu {
      opacity: 0;
    }
  }

  &.color-white {
    color: $white;

    .lines span {
      background-color: $white;
    }

    a .item::after {
      background-color: $white !important;
    }

    .language-selector {
      border-color: $white;
      color: $white;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  &.color-black {
    color: $black;

    .lines span {
      background-color: $black;
    }

    .language-selector {
      border-color: $black;
      color: $black;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }

  .language-selector {
    background-color: transparent;
    font-size: 1.35rem;
    height: 4.8rem;
    padding: 0 2.4rem;
    border: 0.15rem solid currentColor;
    border-radius: 100px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;
    color: inherit;
    font-family: Inter Tight;
    margin-left: 2rem;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .language-selector-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  .header-inner {
    width: 100%;
    position: relative;
    padding-top: 3rem;

    #logo {
      height: auto;

      .logo-img {
        width: 14rem;
        aspect-ratio: 2 / 1;
        height: auto;
        overflow: hidden;
        display: flex;
      }

      span {
        text-indent: -99999px;
      }
    }
  }
}

/************************
NAVIGATION
 ************************/

.mainMenu {
  position: relative;
  z-index: 999;

  .menu {
    width: 100%;
  }

  ul {
    @extend .no-bullets;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;

    li {
      position: relative;
      display: flex;

      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: inherit;
        font-size: 1.8rem;
        font-weight: 600;
        padding: 0 2rem;
        transition: color ease 0.25s;

        .count {
          display: none;
        }

        .item {
          position: relative;
          padding-bottom: 0.4rem;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.2rem;
            background-color: $black;
            transition: transform 0.735s cubic-bezier(0.62, 0.05, 0.01, 0.99);
            transform: scale(0, 1);
            transform-origin: right;
          }
        }

        &:hover {
          .item::after {
            transform: scale(1, 1);
            transform-origin: left;
          }
        }

        &.router-link-active {
          .item::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.2rem;
            background-color: $black;
            transform: scale(1, 1);
          }
        }
      }
    }
  }
}

/* Navigation trigger */
#triggerMenu {
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: flex-end;
  padding: 3rem 0;
  flex-grow: 2;

  .label {
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: 0.2rem;
    margin-right: 2rem;
    transition: color ease 0.25s;
  }

  .lines {
    width: 3rem;
    height: 1.2rem;
    position: relative;
    transition: height ease 0.3s;

    > span {
      width: 100%;
      height: 0.3rem;
      display: block;
      position: absolute;
      right: 0;
      transition:
        background-color ease 0.25s,
        transform ease 0.3s;
      transform: rotate(0);

      &:first-of-type {
        transform-origin: right top;
        top: 0;
      }

      &:last-of-type {
        transform-origin: right bottom;
        bottom: 0;
        width: 65%;
      }
    }
  }

  &.active {
    .lines {
      height: 2.1rem;

      > span {
        width: 90%;

        &:first-of-type {
          transform: rotate(-45deg);
        }

        &:last-of-type {
          transform: rotate(45deg);
        }
      }
    }
  }
}

@include media(md) {
  .header.color-white {
    #triggerMenu.active {
      color: $black;

      .lines span {
        background-color: $black;
      }
    }

    .language-selector {
      border-color: $black;
      color: $black;
      margin-right: 2rem;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }

    .menuTop {
      overflow-y: scroll;

      ul li a {
        color: $black;
      }
    }
  }

  #logo,
  #triggerMenu {
    position: relative;
    z-index: 2;
  }

  .header .header-inner {
    padding-top: 0;
  }

  .header .header-inner #logo {
    .logo-img {
      width: 12rem;
    }
  }

  .mainMenu {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    transition: transform ease-in-out 0.2s;
    padding: 2rem 0;
    transform: translateX(-100%);
    padding-top: 15rem;
    padding-bottom: 3rem;
    z-index: 1;
    border: none;

    &::before,
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      background: $white;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
    }

    &.active {
      transform: translateX(0);
      pointer-events: all;

      ul {
        flex-wrap: nowrap;
        gap: 24px;
      }

      .menuTop ul li a {
        font-size: 2.6rem;
        animation: mobileMenuItems 0.5s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) alternate forwards;
      }

      .item {
        padding-bottom: 24px;
        border-bottom: 1px solid $black;
        width: 50%;
        font-weight: bold;
        text-align: start;

        &::after {
          display: none;
        }
      }

      .menuTop ul li:last-child {
        .item {
          border-bottom: none;
        }
      }
    }

    .menuTop {
      position: relative;
      z-index: 3;
    }

    .menuTop ul li {
      @for $i from 4 through 10 {
        &:nth-of-type(#{$i - 3}) a {
          animation-delay: #{$i * 0.1}s;
        }
      }

      a {
        opacity: 0;
        transform: translateX(-5rem);
      }
    }

    ul {
      flex-direction: column;
      width: 100%;

      li {
        position: relative;
        flex-direction: column;

        a {
          width: 100%;
          padding: 0.5rem 3rem !important;
          font-size: 5rem;
          justify-content: flex-start;
          align-items: flex-start;

          .count {
            display: inline-block;
            font-family: $font-inconsolata;
            font-size: 1.8rem;
            font-weight: 700;
            order: 2;
            margin: 1rem;
          }
        }
      }
    }
  }
  /* Navigation trigger */
  #triggerMenu {
    display: flex;
  }
}

</style>
