import { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 30,
      };
    }
    return false;
  },
};
