import type { Pathnames } from 'next-intl/routing'

// Server URL
const dev = process.env.NODE_ENV !== 'production'

export const server = dev
  ? 'http://localhost:3000'
  : process.env.SITE_URL || 'https://marprezd.vercel.app'

// Locales from Next Intl
export const locales = ['en', 'es', 'tr'] as const
export type LocaleTypes = (typeof locales)[number]

export const pathnames = {
  '/': '/',

  // If locales use different paths, you can
  // specify each external path per locale.
  '/page': {
    en: '/page',
    es: '/pagina',
    tr: '/sayfa',
  },
  '/page/articles': {
    en: '/page/articles',
    es: '/pagina/articulos',
    tr: '/sayfa/makaleler',
  },
  '/page/articles/[slug]': {
    en: '/page/articls/[slug]',
    es: '/pagina/articulos/[slug]',
    tr: '/sayfa/makaleler/[slug]',
  },
  '/page/projects': {
    en: '/page/projects',
    es: '/pagina/proyectos',
    tr: '/sayfa/projeler',
  },
  '/page/courses': {
    en: '/page/courses',
    es: '/pagina/cursos',
    tr: '/sayfa/dersler',
  },
  '/page/snippets': {
    en: '/page/code-snippets',
    es: '/pagina/fragmentos-de-codigo',
    tr: '/sayfa/kod-parcaciklari',
  },
  '/page/hire-me': {
    en: '/page/hire-me',
    es: '/pagina/contratame',
    tr: '/sayfa/beni-ise-al',
  },
  '/page/tags': {
    en: '/page/tags',
    es: '/pagina/etiquetas',
    tr: '/sayfa/etiketler',
  },
  '/page/guest-book': {
    en: '/page/guest-book',
    es: '/pagina/libro-de-visitas',
    tr: '/sayfa/ziyaretci-defteri',
  },
  '[...rest]': '[...rest]',
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = 'always'

export type AppPathnames = keyof typeof pathnames
