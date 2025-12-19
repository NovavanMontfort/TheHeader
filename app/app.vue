<template>
  <div class="wrapper">
    <ThreeHeart v-if="showHeart" />
    <BackgroundText v-if="showHeart" />
    <KineticText v-else @animationComplete="showHeart = true" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ThreeHeart from "~/components/ThreeHeart.vue";
import KineticText from "~/components/KineticText.vue";
import BackgroundText from "~/components/BackgroundText.vue";

const showHeart = ref(false);
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow-y: auto;
  font-family: "Inter Tight", sans-serif;
}

.wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: visible;
  background-color: black;
}
</style>
