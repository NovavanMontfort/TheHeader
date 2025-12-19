// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  router: {
    options: {
      strict: true,
    },
  },

  // routeRules: {
  //   '/*': {
  //     swr: 3600 * 12,
  //     cache: {
  //       maxAge: 480,
  //     },
  //   },
  // },

  app: {
    head: {
      meta: [{ name: 'google-site-verification', content: '_wT8eqfDBgflRBnNIxm7V3DixNpx1xXZCpr4jZ_WqUM' }],
    },

    // pageTransition: { name: 'page', mode: 'out-in' },
  },

  site: {
    url: 'https://cre8ion-nuxt.tc8l.dev/',
    name: 'Cre8ion Nuxt',
  },

  experimental: {
    inlineSSRStyles: false, // not sure why this errors, it' valid...
    // extractCss: true,
  },

  // features: {
  //   inlineStyles: true,
  // },

  runtimeConfig: {
    recaptchaSecretKey: '6LcTqIIqAAAAAK2di4gVQ7b8w4L7nogWrIPeq9CJ',
    public: {
      siteUrl: import.meta.env.NUXT_PUBLIC_SITE_URL,
      isDev: import.meta.env.NUXT_PUBLIC_IS_DEV || false,
      indexSite: import.meta.env.NUXT_PUBLIC_INDEX_SITE,
      // gtmTag: import.meta.env.NUXT_PUBLIC_GTM_TAG,
      apiBase: import.meta.env.NUXT_PUBLIC_API_BASE,
      useCsp: import.meta.env.NUXT_PUBLIC_USE_CSP || true,
      project: import.meta.env.NUXT_PUBLIC_PROJECT || '',
    },
  },

  // trailing slashes
  // router:{
  //   options: {
  //     strict: true,
  //   },
  // },

  modules: ['nuxt-swiper', 'nuxt-aos', '@nuxtjs/google-fonts', '@tc8l/nuxt-forms', '@nuxt/scripts', '@tc8l/nuxt-base'],

  swiper: {
    modules: ['navigation', 'pagination', 'scrollbar', 'free-mode', 'a11y', 'autoplay'],
  },

  googleFonts: {
    families: {
      'Inter+Tight': {
        wght: [400, 600, 700, 800, 900],
      },
    },
    preconnect: true,
    preload: true,
    display: 'swap',
  },

  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
    routeRules: {
      '/sitemap.xml': { redirect: { to: `${import.meta.env.NUXT_PUBLIC_SITE_URL}/api/sitemap.xml`, statusCode: 308 }, prerender: false },
      '/robots.txt': { redirect: { to: '/api/robots.txt', statusCode: 308 } },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: '@use "~/assets/styles/variables.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: ['survey-core', 'vue-recaptcha-v3'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'survey-core': ['survey-core'],
            'survey-vue3-ui': ['survey-vue3-ui'],
          },
        },
      },
    },
  },

  css: ['~/assets/styles/main.scss'],

  build: {
    transpile: ['gsap', 'three'],
  },

  compatibilityDate: '2024-09-05',

  scripts: {
    registry: {
      clarity: {
        id: 'qfrhb3ykij',
      },
      googleTagManager: {
        id: 'GTM-TLBC9NB4',
      },
    },
  },
});
