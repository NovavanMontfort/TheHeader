<template>
  <ul class="skip-links">
    <li>
      <NuxtLink
        to="#main"
        class="screen-reader-shortcut"
        tabindex="1"
      >
        Door naar de hoofd inhoud
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        class="screen-reader-shortcut"
        to="#footer"
        tabindex="2"
      >
        Spring naar de voettekst
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="#nav-wrapper"
        class="screen-reader-shortcut"
        tabindex="3"
        @click="handleNav"
      >
        Naar navigatie
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
function handleNav() {
  // ensure the nav is visible
  window.scrollTo(0, 0);
}
</script>
