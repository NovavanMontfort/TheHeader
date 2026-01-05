<template>
  <footer
    id="footer"
    class="footer"
  >
    <div class="footer-top">
      <div class="grid">
        <div class="col-1-1 flex justify-space-between align-center">
          <NuxtLink
            id="logo"
            class="flex"
            to="/"
          >
            <img
              v-if="!isMobile"
              src="~/assets/images/tc8l-logo.svg"
              alt="The Cre8ion Lab logo"
            />

            <img
              v-else
              class="col-xs-1-1 no-p"
              src="~/assets/images/tc8l-logo-black.svg"
              alt="The Cre8ion Lab logo"
            />
          </NuxtLink>

          <div class="footer-top-cta">
            <h4>{{ baseGetTranslation('Klaar voor actie?') }}</h4>
            <NuxtLink
              class="btn btn-primary"
              :to="contactItem?.url"
            >
              {{ baseGetTranslation('Neem contact op') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="grid">
        <div class="col-1-1 footer-item-container flex">
          <div class="footer-item">
            <div class="footer-text">
              <div class="footer-label">
                {{ baseGetTranslation('Navigeer naar') }}
              </div>
              <h6
                v-for="nav in navigation"
                :key="nav.id"
                class="list-item"
              >
                <NuxtLink :to="nav.url">
                  {{ nav.name }}
                </NuxtLink>
              </h6>
            </div>
          </div>

          <div class="footer-item">
            <div class="footer-text">
              <div class="footer-label">
                {{ baseGetTranslation('Connect met ons') }}
              </div>
              <h6
                v-for="(item, idx) in connectItems"
                :key="idx"
              >
                <NuxtLink
                  :to="item.link"
                  :target="item.target"
                >
                  {{ item.name }}
                </NuxtLink>
              </h6>
            </div>
          </div>

          <div class="footer-item footer-item-final">
            <div class="flex">
              <div>
                <div class="footer-label">
                  {{ baseGetTranslation('Bezoek ons') }}
                </div>
                <h6
                  v-for="item in visitUsItems"
                  :key="item"
                >
                  {{ item }}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-text footer-privacy col-1-1 flex justify-space-between align-center">
          <div class="flex align-center sm-flex-column">
            <div class="copyright">
              © The Cre8ion Lab {{ new Date().getFullYear() }}
            </div>
            <NuxtLink :to="privacyStatementLink">
              {{ baseGetTranslation('Privacyverklaring') }}
            </NuxtLink>
          </div>
          <UtilsAccessibility />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { HOMEPAGE_ID, CONTACT_PAGE_ID } from '@/config/elocusConfig';
const { isMobile } = useIsMobile();
const store = useElocusStore();

const multiLanguageStore = useMultiLanguageStore();
const privacyStatementLink = computed(() => {
  return multiLanguageStore.currentLanguage === 'nl' ? '/nl/privacyverklaring' : '/en/privacystatement';
});

const navigation = computed(() => store.navigation.filter((nav) => nav.id !== HOMEPAGE_ID));
const contactItem = store.navigation.find((nav) => nav.id === CONTACT_PAGE_ID);
const connectItems = [
  { name: '+31 (0)73 543 2789', link: 'tel:073 543 2789', target: '' },
  { name: 'info@cre8ion.com', link: 'mailto:info@cre8ion.com', target: '' },
  { name: 'LinkedIn', link: 'https://nl.linkedin.com/company/the-cre8ion.lab', target: '_blank' },
  { name: 'Instagram', link: 'https://www.instagram.com/thecre8ionlab/', target: '_blank' },
];
const visitUsItems = ['The Cre8ion Lab', 'De Gruyter Fabriek', 'Gebouw F - Ruimte 4301', 'Veemarktkade 8', "5222 AE, 's-Hertogenbosch"];
</script>

<style lang="scss" scoped>
.compact .footer .footer-bottom {
  display: none;
}

.footer {
  background-color: $pink;
}

.footer-top {
  padding-top: 8rem;
  padding-bottom: 12rem;

  img {
    height: 21rem;
  }

  .footer-top-cta {
    min-width: 36rem;
    text-align: start;

    h4 {
      line-height: 130%;
      font-size: 4.4rem;
    }

    .btn {
      margin-top: 2rem;
      height: 5.4rem;
      font-size: 1.6rem;
      color: $pink;

      &:hover {
        color: $black;
        background-color: $pink;
      }
    }
  }
}

.footer-text {
  gap: 3.2rem;

  .copyright {
    min-width: 25rem;
  }
}

.footer-item-container {
  gap: 3.2rem;
  margin-bottom: 12rem;

  .footer-item {
    min-width: 25rem;
    padding-right: 2.55rem;

    .footer-label {
      padding-bottom: 3.2rem;
    }

    h6 {
      min-height: 3rem;
      margin-bottom: 1.22rem;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .footer-item-final {
    margin-left: auto;
  }
}

.footer-privacy {
  padding-bottom: 4rem;
}

@media (max-width: $screen-md) {
  .footer-item-container {
    .footer-item-final {
      margin-left: 0;
    }
  }
}

@media (max-width: $screen-sm) {
  .footer-top {
    text-align: center;
    padding-bottom: 5.6rem;

    img {
      margin-bottom: 3.2rem;
      width: 100%;
      max-width: 35rem;
      height: auto;
    }
  }

  .footer-label {
    padding-bottom: 2.4rem;
  }

  .footer-item-container {
    margin-bottom: 4.8rem;
  }

  hr {
    margin: 5.6rem 0;
  }

  .footer-text {
    margin-top: 0.8rem;
    flex-direction: column;
    gap: 4rem;
    justify-items: center;
    align-items: center;

    .copyright {
      min-width: unset;
    }
  }
}
</style>
