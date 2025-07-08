// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxthub/core', '@nuxt/eslint', '@nuxt/image', '@nuxt/ui'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      // Can be overridden by NUXT_PUBLIC_HELLO_TEXT environment variable
      helloText: 'Hello from the Edge',
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-03-01',
  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
  },
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },
  app: {
    pageTransition: false,
    layoutTransition: false,
    head: {
      titleTemplate: '%s - Mario Pérez',
      meta: [
        { name: 'author', content: 'Mario Pérez' },
        { name: 'charset', content: 'utf-8' },
        { name: 'theme-color', content: '#14b8a6' },
      ],
    },
  },
  css: ['./app/assets/css/main.css'],
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  fonts: {
    provider: 'fontshare',
  },
})
