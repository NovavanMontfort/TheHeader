import gsap from 'gsap';
import { useTransitionComposable } from '../composables/useTransition';

const { setTransitionState } = useTransitionComposable();

// Working page transition with overlay
const pageTransition = {
  name: 'page-transition',
  mode: 'out-in',

  // Entering page transition
  onEnter: (el, done) => {
    nextTick(() => {
      // Animate the black overlay out first
      const overlay = document.getElementById('transition-overlay');

      gsap
        .timeline({
          onComplete() {
            setTransitionState(2);
            done();
            // Remove the overlay after the transition completes
            if (overlay) {
              overlay.remove();
            }
          },
        })
        .to(overlay, { y: '100%', duration: 0.5 }) // Fade out the black overlay
        .play();
    });
  },

  // Leaving page transition
  onLeave: (el, done) => {
    setTransitionState(0);

    // Create the black overlay if it doesn't exist
    let overlay = document.getElementById('transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'transition-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100vw';
      overlay.style.height = '0';
      overlay.style.backgroundColor = 'black';
      overlay.style.opacity = 1;
      overlay.style.pointerEvents = 'none'; // Disable interaction
      overlay.style.zIndex = 99999999; // Make sure it's on top
      document.body.appendChild(overlay);
    }

    gsap
      .timeline({
        onComplete() {
          setTransitionState(1);
          done();
        },
      })
      .to(el, { scale: 1.1, duration: 0.3 }) // Fade out the leaving page
      .to(overlay, { height: '100vh', duration: 0.5 }) // Fade out the black overlay
      .to(overlay, { autoAlpha: 1, duration: 0.1 }) // Fade in the black overlay
      .play();
  },
};

const pageTransitionMobile = {
  name: 'page-transition',
  mode: 'out-in',

  // Entering page transition
  onEnter: (el, done) => {
    gsap.set(el, { xPercent: 100 });
    gsap
      .timeline({
        onComplete() {
          setTransitionState(2);
          done();
        },
      })
      .to(el, { xPercent: 0, duration: 0.3 })
      .play();
  },

  // Leaving page transition
  onLeave: (el, done) => {
    setTransitionState(0);

    gsap
      .timeline({
        onComplete() {
          setTransitionState(1);
          done();
        },
      })
      .play();
  },
};

export { pageTransition, pageTransitionMobile };
