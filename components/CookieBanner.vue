<template>
  <div
    v-if="showBanner"
    class="CookieNotification"
  >
    <div class="content">
      <div class="inline-elements">
        <div class="text-button-container flex">
          <div class="col-1-1">
            <p>
              Deze website maakt gebruik van cookies voor een goede werking van de site. Klik je op akkoord? Dan stem je toe dat wij cookies
              plaatsen. Voor meer informatie, lees onze
              <NuxtLink
                href="/privacyverklaring"
                class="textLink q-mt-sm"
              >
                privacyverklaring
              </NuxtLink>
            </p>
          </div>
          <div class="button-container">
            <button
              class="btn btn-primary"
              @click="acceptOnlyFunctionalCookies"
            >
              Weigeren
            </button>

            <button
              class="btn btn-reject"
              @click="acceptCookies"
            >
              Alle cookies toestaan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const gtm = useGtm();
const showBanner = ref(false);

function acceptTracking() {
  // gtm?.enable(true);

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'consent_update',
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });
  }
}

const acceptCookies = () => {
  acceptTracking();
  // 1 year in seconds
  const c = useCookie('cre8ion_cookiesClicked', { maxAge: 31556926 });
  c.value = 'true';
  const trackingCookie = useCookie('cre8ion_trackingEnabled', { maxAge: 31556926 });
  trackingCookie.value = 'true';
};

const acceptOnlyFunctionalCookies = () => {
  const c = useCookie('cre8ion_cookiesClicked', { maxAge: 86400 });
  c.value = 'true';
};

const cookiesClicked = useCookie('cre8ion_cookiesClicked');
const initialTrackingCookie = useCookie('cre8ion_trackingEnabled');

onMounted(() => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'default_consent',
      ad_storage: 'denied',
      analytics_storage: 'denied',
    });
  }

  acceptTracking();
});
</script>

<style lang="scss" scoped>
.CookieNotification {
  display: flex;
  width: 600px;
  background: black;
  color: white;
  bottom: 0;
  position: fixed;
  padding: 32px;
  margin: 20px;
  border-radius: 8px;

  z-index: 99;

  flex-direction: row;
  align-items: center;
  gap: 32px;

  .textLink {
    color: white;
  }

  .content {
    max-width: 1300px;
  }

  .btn-reject {
    border: 2px solid white;
    background: white;
    color: black;

    &:hover {
      background: black;
      color: white;
    }
  }

  .text-button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }

  .text-container {
    flex: 1;
  }

  .button-container {
    display: flex;
    gap: 16px;
  }
}

@media (max-width: 1200px) {
  .CookieNotification {
    padding: 32px;
  }
}

@media (max-width: $screen-xs) {
  .CookieNotification {
    bottom: 0;
    width: 100%;
    margin: 0;
    border-radius: 0;

    button {
      font-size: 14px;
      padding: 0 2.4rem;
      height: 5.8rem;
    }
  }
}
</style>
