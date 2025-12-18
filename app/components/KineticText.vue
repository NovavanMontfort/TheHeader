<template>
  <div ref="kineticType" id="kinetic-type">
    <div
      v-for="n in 20"
      :key="n"
      :class="n % 2 === 1 ? 'type-line odd' : 'type-line even'"
    >
      CULT JOIN THE CULT JOIN THE CULT JOIN THE CULT JOIN THE CULT JOIN THE CULT
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const emit = defineEmits(["animationComplete"]);
const kineticType = ref(null);

onMounted(() => {
  CustomEase.create("customEase", "0.86, 0, 0.07, 1");

  const kineticEl = kineticType.value;
  const oddLines = kineticEl.querySelectorAll(".odd");
  const evenLines = kineticEl.querySelectorAll(".even");
  const TYPE_LINE_OPACITY = 0.99;

  gsap.set(oddLines, { opacity: TYPE_LINE_OPACITY });
  gsap.set(evenLines, { opacity: TYPE_LINE_OPACITY });

  const timeline = gsap.timeline({
    repeat: 0,
    defaults: { ease: "customEase" },
    onComplete: () => emit("animationComplete"),
  });

  // animatie zonder scale, alleen rotatie en horizontale beweging
timeline
  .to(kineticEl, { duration: 1.4, rotation: -90 }) // geen scale meer
  .to(oddLines, { x: "20%", duration: 1, stagger: 0.08 }, "<")
  .to(evenLines, { x: "-20%", duration: 1, stagger: 0.08 }, "<")
  .to(oddLines, { x: "-200%", duration: 1, stagger: 0.08 }, ">")
  .to(evenLines, { x: "200%", duration: 1, stagger: 0.08 }, "<")
  .to(kineticEl, { opacity: 0, duration: 0.1 })
  .set(kineticEl, { rotation: 0, x: 0, opacity: 1 });

});
</script>

<style>
#kinetic-type {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateZ(0);
  width: 100vw;
  max-height: 80vh;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Inter Tight", sans-serif;
  font-weight: 800;
  color: white;
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;
  backface-visibility: hidden;

  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
  text-rendering: optimizeSpeed;
}

.type-line {
  display: block;
  width: max-content;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  line-height: 0.8;
  font-weight: 800;
  color: #fff;

  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
  text-rendering: optimizeSpeed;

  will-change: transform, opacity;
  opacity: 1 !important;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.type-line.odd {
  color: #fff;
}

.type-line.even {
  color: #f2f2f2;
}

#kinetic-type > .type-line {
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
}

/* #kinetic-type::before,
#kinetic-type::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 8vh;
  pointer-events: none;
  z-index: 20;
}
#kinetic-type::before {
  top: 0;
  background: linear-gradient(to bottom, #000 0%, transparent 100%);
}
#kinetic-type::after {
  bottom: 0;
  background: linear-gradient(to top, #000 0%, transparent 100%);
} */

@media (min-width: 1400px) {
  #kinetic-type {
    font-size: clamp(3rem, 8vw, 12rem);
  }
}
@media (max-width: 1399px) {
  #kinetic-type {
    font-size: clamp(2.5rem, 9vw, 10.5rem);
  }
}
@media (max-width: 768px) {
  #kinetic-type {
    font-size: clamp(1.6rem, 8.5vw, 6rem);
  }
  #kinetic-type > .type-line {
    line-height: 0.85;
  }
}

</style>

