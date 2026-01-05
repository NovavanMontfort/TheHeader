<template>
  <div class="background-text-container">
    <div v-for="item in textItems" :key="item.id" class="text-item" :style="itemStyle(item)"
      :class="{ highlight: item.highlighted || autoHighlightActive }" @mouseenter="onHover(item.id)"
      @mouseleave="onLeave(item.id)" :data-text="item.text" :ref="el => setTextItemRef(el, item.id)">
      {{ item.text }}
    </div>
  </div>
</template>

<script setup>
// const textItems = reactive([
//   { id: 1, text: "BE", top: "9%", left: "8%", right: null, highlighted: false },
//   { id: 2, text: "PRESENT", top: "9%", left: "15%", right: null, highlighted: false },
//   { id: 3, text: "LISTEN", top: "9%", left: "28%", right: null, highlighted: false },
//   { id: 4, text: "DEEPLY", top: "9%", left: "42%", right: null, highlighted: false },
//   { id: 5, text: "OBSERVE", top: "9%", left: "55%", right: null, highlighted: false },
//   { id: 6, text: "&", top: "9%", left: "75%", right: null, highlighted: false },
//   { id: 7, text: "FEEL", top: "9%", left: "85%", right: null, highlighted: false },
//   { id: 8, text: "MAKE", top: "12%", left: "12%", right: null, highlighted: false },
//   { id: 9, text: "BETTER", top: "12%", left: "45%", right: null, highlighted: false },
//   { id: 10, text: "DECISIONS", top: "12%", left: null, right: "20%", highlighted: false },
//   { id: 11, text: "THE", top: "18%", left: "8%", right: null, highlighted: false },
//   { id: 12, text: "CREATIVE", top: "18%", left: "30%", right: null, highlighted: false },
//   { id: 13, text: "PROCESS", top: "18%", left: "55%", right: null, highlighted: false },
//   { id: 14, text: "IS", top: "18%", left: null, right: "20%", highlighted: false },
//   { id: 15, text: "MYSTERIOUS", top: "18%", left: null, right: "5%", highlighted: false },
//   { id: 16, text: "S", top: "25%", left: "5%", right: null, highlighted: false },
//   { id: 17, text: "I", top: "25%", left: "10%", right: null, highlighted: false },
//   { id: 18, text: "M", top: "25%", left: "15%", right: null, highlighted: false },
//   { id: 19, text: "P", top: "25%", left: "20%", right: null, highlighted: false },
//   { id: 20, text: "L", top: "25%", left: "25%", right: null, highlighted: false },
//   { id: 21, text: "I", top: "25%", left: "30%", right: null, highlighted: false },
//   { id: 22, text: "C", top: "25%", left: "35%", right: null, highlighted: false },
//   { id: 23, text: "I", top: "25%", left: "40%", right: null, highlighted: false },
//   { id: 24, text: "T", top: "25%", left: "45%", right: null, highlighted: false },
//   { id: 25, text: "Y", top: "25%", left: "50%", right: null, highlighted: false },
//   { id: 26, text: "IS THE KEY", top: "25%", left: null, right: "5%", highlighted: false },
//   { id: 27, text: "FIND YOUR VOICE", top: "35%", left: "25%", right: null, highlighted: false },
//   { id: 28, text: "TRUST INTUITION", top: "35%", left: "65%", right: null, highlighted: false },
//   { id: 29, text: "EMBRACE SILENCE", top: "50%", left: "5%", right: null, highlighted: false },
//   { id: 30, text: "QUESTION EVERYTHING", top: "50%", left: null, right: "5%", highlighted: false },
//   { id: 31, text: "TRUTH", top: "75%", left: "20%", right: null, highlighted: false },
//   { id: 32, text: "WISDOM", top: "75%", left: null, right: "20%", highlighted: false },
//   { id: 33, text: "FOCUS", top: "80%", left: "10%", right: null, highlighted: false },
//   { id: 34, text: "ATTENTION", top: "80%", left: "35%", right: null, highlighted: false },
//   { id: 35, text: "AWARENESS", top: "80%", left: "65%", right: null, highlighted: false },
//   { id: 36, text: "PRESENCE", top: "80%", left: null, right: "10%", highlighted: false },
//   { id: 37, text: "SIMPLIFY", top: "85%", left: "25%", right: null, highlighted: false },
//   { id: 38, text: "REFINE", top: "85%", left: null, right: "25%", highlighted: false },
// ]);

const textItems = reactive([
  { id: 1, text: "THEATERS", top: "12%", left: "12%", right: null, highlighted: false },
  { id: 2, text: "SCHOUWBURGEN", top: "12%", left: "45%", right: null, highlighted: false },
  { id: 3, text: "BIOSCOPEN", top: "12%", left: null, right: "20%", highlighted: false },
  { id: 4, text: "FILMHUIZEN", top: "18%", left: "8%", right: null, highlighted: false },
  { id: 5, text: "KUNST", top: "18%", left: "30%", right: null, highlighted: false },
  { id: 6, text: "CULTUURCENTRA", top: "18%", left: "55%", right: null, highlighted: false },
  { id: 7, text: "CURSUSCENTRA", top: "18%", left: null, right: "5%", highlighted: false },
  { id: 8, text: "CULTUUREDUCATIE", top: "25%", left: null, right: "5%", highlighted: false },
  { id: 9, text: "MUSEA", top: "35%", left: "25%", right: null, highlighted: false },
  { id: 10, text: "EXPOSITIES", top: "35%", left: "65%", right: null, highlighted: false },
  { id: 11, text: "POPPODIA", top: "50%", left: "5%", right: null, highlighted: false },
  { id: 12, text: "CONCERTGEBOUWEN", top: "50%", left: null, right: "5%", highlighted: false },
  { id: 13, text: "FESTIVALS", top: "75%", left: "20%", right: null, highlighted: false },
  { id: 14, text: "PODIUMKUNSTEN", top: "75%", left: null, right: "20%", highlighted: false },
  { id: 15, text: "GEZELSCHAPPEN", top: "80%", left: "10%", right: null, highlighted: false },
  { id: 16, text: "PRODUCTIEHUIZEN", top: "80%", left: "35%", right: null, highlighted: false },
  { id: 17, text: "MAKERS", top: "80%", left: "65%", right: null, highlighted: false },
  { id: 18, text: "NETWERKEN", top: "80%", left: null, right: "10%", highlighted: false },
  { id: 19, text: "BIBLIOTHEKEN", top: "85%", left: "25%", right: null, highlighted: false },
]);

const textItemRefs = reactive({});
const autoHighlightActive = ref(false);
const userHoveringId = ref(null);

function setTextItemRef(el, id) {
  if (!el) return;
  textItemRefs[id] = el;
}

function itemStyle(item) {
  return {
    position: "absolute",
    top: item.top,
    left: item.left,
    right: item.right,
  };
}

function onHover(id) {
  userHoveringId.value = id;
  clearAutoHighlight();

  const item = textItems.find((i) => i.id === id);
  const el = textItemRefs[id];
  if (!item || !el) return;

  item.highlighted = true;
}

function onLeave(id) {
  userHoveringId.value = null;
  const item = textItems.find((i) => i.id === id);
  if (!item) return;

  item.highlighted = false;
  startAutoHighlight();
}

let autoHighlightInterval = null;

function startAutoHighlight() {
  if (autoHighlightInterval) clearInterval(autoHighlightInterval);

  autoHighlightActive.value = true;

  autoHighlightInterval = setInterval(() => {
    autoHighlightActive.value = !autoHighlightActive.value;
  }, 3000);
}

function clearAutoHighlight() {
  autoHighlightActive.value = false;
  if (autoHighlightInterval) {
    clearInterval(autoHighlightInterval);
    autoHighlightInterval = null;
  }
}


onBeforeUnmount(() => {
  clearAutoHighlight();
});

startAutoHighlight();
</script>

<style>
.background-text-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  user-select: none;
}

.text-item {
  color: #c2c2c2;
  font-size: clamp(0.6rem, 1.2vw, 1rem);
  text-transform: uppercase;
  opacity: 1;
  white-space: nowrap;
  font-family: "Inter Tight", sans-serif;
  z-index: 1;
  cursor: pointer;
  user-select: none;
  position: relative;
  transition: color 0.3s ease;
  pointer-events: auto;
}

.text-item::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -4px;
  width: 0;
  height: calc(100% + 4px);
  background-color: #fff;
  z-index: -1;
  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: width;
  pointer-events: none;
}

.text-item.highlight {
  color: #000000 !important;
}

.text-item.highlight::after {
  width: calc(100% + 8px) !important;
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}

/* Small screens text-item adjustments */
@media (max-width: 480px) {
  .text-item {
    font-size: clamp(0.5rem, 2vw, 0.9rem);
  }
}
</style>
