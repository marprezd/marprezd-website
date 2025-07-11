// https://nuxt.com/docs/api/configuration/nuxt-config
import { host } from './app/utils/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-security',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      // Can be overridden by NUXT_PUBLIC_HELLO_TEXT environment variable
      helloText: 'Hello from the Edge',
      i18n: {
        baseUrl: host,
      },
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-03-01',
  hub: {
    database: true,
    kv: true,
    cache: true,
    workers: true,
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
    // Page transitions are handled by motion-v in app/app.vue
    // If you wish to configure transitions, edit the motion.div in app.vue
    head: {
      // titleTemplate: '%s - Mario Pérez',
      meta: [
        { name: 'author', content: 'Mario Pérez' },
        // { name: 'charset', content: 'utf-8' },
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
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
        highlight: {
          langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'python', 'ts', 'javascript', 'r'],
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
          },
        },
        remarkPlugins: {
          'remark-emoji': {
            emoticon: true, // Enable emoticons
            padSpaceAfter: true, // Add a space after the emoji
          },
        },
        rehypePlugins: {},
      },
    },
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    customRoutes: 'config', // disable custom route with page components
    locales: [
      {
        code: 'en',
        language: 'en-GB',
        label: 'English',
        dir: 'ltr',
        file: 'en.json',
        icon: 'i-twemoji-flag-united-kingdom',
      },
      {
        code: 'es',
        language: 'es-ES',
        label: 'Español',
        dir: 'ltr',
        file: 'es.json',
        icon: 'i-twemoji-flag-spain',
      },
      {
        code: 'tr',
        language: 'tr-TR',
        label: 'Türkçe',
        dir: 'ltr',
        file: 'tr.json',
        icon: 'i-twemoji-flag-turkey',
      },
    ],
    pages: {
      'blog': {
        en: '/blog',
        es: '/blog',
        tr: '/blog',
      },
      'blog-slug': {
        en: '/blog/[slug]',
        es: '/blog/[slug]',
        tr: '/blog/[slug]',
      },
      'blog-tags-tag': {
        en: '/blog/tags/[tag]',
        es: '/blog/etiquetas/[tag]',
        tr: '/blog/etiketler/[tag]',
      },
      'blog-categories-category': {
        en: '/blog/categories/[category]',
        es: '/blog/categorias/[category]',
        tr: '/blog/kategoriler/[category]',
      },
      'works': {
        en: '/works',
        es: '/trabajos',
        tr: '/isler',
      },
      'resources': {
        en: '/resources',
        es: '/recursos',
        tr: '/kaynaklar',
      },
      'courses': {
        en: '/courses',
        es: '/cursos',
        tr: '/dersler',
      },
      'hire': {
        en: '/hire-me',
        es: '/contratame',
        tr: '/beni̇-i̇se-al',
      },
      'repositories': {
        en: '/github-repositories',
        es: '/repositorios-de-github',
        tr: '/github-depoları',
      },
      'guestbook': {
        en: '/guestbook',
        es: '/libro-de-visitas',
        tr: '/misafir-kitabı',
      },
    },
    lazy: true,
    langDir: 'locales',
    vueI18n: 'i18n.config.ts',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dieoeaoiy/image/upload',
    },
  },
  security: {
    strict: false,
    headers: {
      contentSecurityPolicy: {
        'default-src': ['\'self\'', 'https://*.cloudinary.com', 'https://*.vercel.app', 'https://api.iconify.design'],
        'img-src': ['\'self\'', 'https://*.cloudinary.com', 'data:'],
        'script-src': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\'', 'https://*.vercel.app', 'https://api.iconify.design'],
        'style-src': ['\'self\'', '\'unsafe-inline\''],
        'connect-src': ['\'self\''],
        'object-src': ['\'none\''],
        'upgrade-insecure-requests': true,
      },
    },
  },
})
