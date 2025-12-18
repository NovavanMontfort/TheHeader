<template>
  <div ref="container" class="three-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader";

const container = ref(null);

let scene, camera, renderer, heartModel, animationFrameId;
let mouseX = 0,
  mouseY = 0;
let targetRotationX = 0,
  targetRotationY = 0;
let scrollRotation = 0;
const SCROLL_FACTOR = 0.0025;
let clock = new THREE.Clock();

function onMouseMove(event) {
  if (!container.value) return;
  const rect = container.value.getBoundingClientRect();
  mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  targetRotationY = mouseX * 0.6;
  targetRotationX = -mouseY * 0.6;
}

function onScroll(e) {
  const sy = e.target?.scrollTop ?? window.scrollY ?? document.documentElement.scrollTop ?? 0;
  scrollRotation = sy * SCROLL_FACTOR;
}

function onWindowResize() {
  if (!container.value || !camera || !renderer) return;
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  camera.aspect = width / height;

  // Pas camera afstand aan voor mobiel
  if (width <= 480) {
    camera.position.z = 8;  // verder weg voor kleinere schermen
  } else {
    camera.position.z = 6;  // standaard
  }

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  if (heartModel) {
    const combinedTargetY = scrollRotation + targetRotationY;
    heartModel.rotation.y += (combinedTargetY - heartModel.rotation.y) * 0.06;
    heartModel.rotation.x += (targetRotationX - heartModel.rotation.x) * 0.06;

    heartModel.position.x = Math.sin(elapsed * 0.5) * 0.05;
    heartModel.position.y = Math.cos(elapsed * 0.7) * 0.05;
    heartModel.position.z = Math.sin(elapsed * 0.3) * 0.05;

    const beat1 = Math.sin(elapsed * 6) * 0.03;
    const beat2 = Math.sin(elapsed * 2) * 0.015;
    const pulse = 1 + Math.max(0, beat1) + Math.max(0, beat2);
    heartModel.scale.set(pulse, pulse, pulse);
  }

  renderer.render(scene, camera);
}

onMounted(() => {
  scene = new THREE.Scene();

  const width = container.value?.clientWidth || window.innerWidth;
  const height = container.value?.clientHeight || window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 6);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  container.value.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
  directionalLight.position.set(5, 10, 7);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.left = -5;
  directionalLight.shadow.camera.right = 5;
  directionalLight.shadow.camera.top = 5;
  directionalLight.shadow.camera.bottom = -5;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 20;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  const hdrLoader = new HDRLoader();
  hdrLoader.load(
    "/lighting.hdr",
    (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.encoding = THREE.LinearEncoding;
      scene.environment = texture;
      if (heartModel) {
        heartModel.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.envMap = texture;
            child.material.envMapIntensity = 5;
            child.material.needsUpdate = true;
          }
        });
      }
    },
    undefined,
    (err) => {
      console.warn("HDR load error", err);
    }
  );

  const loader = new GLTFLoader();
  loader.load(
    "/the_heart.glb",
    (gltf) => {
      heartModel = gltf.scene;
      heartModel.scale.set(1.5, 1.5, 1.5);
      heartModel.castShadow = true;
      heartModel.receiveShadow = true;
      scene.add(heartModel);
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
    }
  );

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onWindowResize);

  onWindowResize();
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onWindowResize);

  if (renderer) {
    try {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode)
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      renderer.forceContextLoss && renderer.forceContextLoss();
      renderer.context = null;
      renderer.domElement = null;
    } catch (e) {}
  }
});
</script>

<style scoped>
.three-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
