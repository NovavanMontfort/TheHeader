<template>
  <div class="loader">
    <div class="loader-inner">
      <div class="wrapper">
        <svg
          id="Layer_2"
          class="eight first"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188.88 343.59"
        >
          <g
            id="Layer_3"
            data-name="Layer 3"
          >
            <path
              class="cls-1"
              d="M174.88,144.72c9.33-12.08,14-27.14,14-45.19v-14.33c0-28.67-7.8-50.04-23.4-64.1C149.88,7.03,126.2,0,94.44,0S39,7.03,23.4,21.1C7.79,35.16,0,56.53,0,85.2v14.33c0,18.31,4.6,33.44,13.79,45.38,9.19,11.95,22,18.97,38.45,21.1v11.55c-16.44,2.13-29.25,9.16-38.45,21.1-9.19,11.94-13.79,27.07-13.79,45.38v14.33c0,28.67,7.79,50.04,23.4,64.1,15.6,14.07,39.28,21.1,71.04,21.1s55.44-7.03,71.04-21.1c15.6-14.06,23.4-35.43,23.4-64.1v-14.33c0-18.05-4.67-33.11-14-45.19-9.34-12.08-22.22-19.17-38.65-21.3v-11.55c16.43-2.13,29.32-9.23,38.65-21.3ZM124.95,255.2c0,15.92-2.3,27.07-6.89,33.44-4.6,6.37-12.47,9.55-23.61,9.55s-19.01-3.18-23.61-9.55c-4.6-6.37-6.9-17.52-6.9-33.44v-17.12c0-15.92,2.3-27.14,6.9-33.64,4.6-6.5,12.46-9.76,23.61-9.76s19.01,3.25,23.61,9.76c4.6,6.51,6.89,17.72,6.89,33.64v17.12ZM63.94,88.38c0-15.92,2.3-27.07,6.9-33.44,4.6-6.37,12.46-9.55,23.61-9.55s19.01,3.18,23.61,9.55c4.6,6.37,6.89,17.52,6.89,33.44v17.12c0,15.92-2.3,27.14-6.89,33.64-4.6,6.5-12.47,9.76-23.61,9.76s-19.01-3.25-23.61-9.76c-4.6-6.51-6.9-17.72-6.9-33.64v-17.12Z"
            />
          </g>
        </svg>
        <svg
          id="Layer_2"
          class="eight second"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188.88 343.59"
        >
          <g
            id="Layer_3"
            data-name="Layer 3"
          >
            <path
              class="cls-1"
              d="M174.88,144.72c9.33-12.08,14-27.14,14-45.19v-14.33c0-28.67-7.8-50.04-23.4-64.1C149.88,7.03,126.2,0,94.44,0S39,7.03,23.4,21.1C7.79,35.16,0,56.53,0,85.2v14.33c0,18.31,4.6,33.44,13.79,45.38,9.19,11.95,22,18.97,38.45,21.1v11.55c-16.44,2.13-29.25,9.16-38.45,21.1-9.19,11.94-13.79,27.07-13.79,45.38v14.33c0,28.67,7.79,50.04,23.4,64.1,15.6,14.07,39.28,21.1,71.04,21.1s55.44-7.03,71.04-21.1c15.6-14.06,23.4-35.43,23.4-64.1v-14.33c0-18.05-4.67-33.11-14-45.19-9.34-12.08-22.22-19.17-38.65-21.3v-11.55c16.43-2.13,29.32-9.23,38.65-21.3ZM124.95,255.2c0,15.92-2.3,27.07-6.89,33.44-4.6,6.37-12.47,9.55-23.61,9.55s-19.01-3.18-23.61-9.55c-4.6-6.37-6.9-17.52-6.9-33.44v-17.12c0-15.92,2.3-27.14,6.9-33.64,4.6-6.5,12.46-9.76,23.61-9.76s19.01,3.25,23.61,9.76c4.6,6.51,6.89,17.72,6.89,33.64v17.12ZM63.94,88.38c0-15.92,2.3-27.07,6.9-33.44,4.6-6.37,12.46-9.55,23.61-9.55s19.01,3.18,23.61,9.55c4.6,6.37,6.89,17.52,6.89,33.44v17.12c0,15.92-2.3,27.14-6.89,33.64-4.6,6.5-12.47,9.76-23.61,9.76s-19.01-3.25-23.61-9.76c-4.6-6.51-6.9-17.72-6.9-33.64v-17.12Z"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$animation-duration: 2.7s;

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;

  &.loaded {
    animation: loaderPage 0.5s ease forwards;

    .loader-inner {
      animation: loaderPageInner 0.5s ease forwards;
    }
  }

  .loader-inner {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .eight {
      position: relative;
      height: 25rem;
      width: 12.5rem;
      transition: all 0.5s ease;
      fill: $white;

      &.first {
        transform: translateY(0);
        animation: transformFirstEight $animation-duration cubic-bezier(0.53, 0.09, 0.32, 1.37) infinite;
      }

      &.second {
        position: absolute;
        top: 25rem;
        animation: transformSecondEight $animation-duration cubic-bezier(0.53, 0.09, 0.32, 1.37) infinite;
        animation-delay: calc($animation-duration / 4);
      }
    }
  }
}

@keyframes transformFirstEight {
  0% {
    visibility: visible;
    transform: translateY(0);
  }
  25% {
    visibility: visible;
    transform: translateY(0);
  }
  50% {
    transform: translateY(calc(-100%));
  }
  55% {
    visibility: hidden;
    transform: translateY(calc(100%));
  }
  75% {
    visibility: hidden;
    transform: translateY(calc(100%));
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes transformSecondEight {
  0% {
    top: 0;
    transform: translateY(calc(100%));
  }
  25% {
    top: 0;
    transform: translateY(0);
  }
  50% {
    top: 0;
    transform: translateY(0);
  }
  75% {
    top: 0;
    transform: translateY(calc(-100%));
  }
  100% {
    top: 0;
    transform: translateY(calc(-100%));
  }
}
</style>
