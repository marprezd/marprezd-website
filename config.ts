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
  '/articles': {
    en: '/articles',
    es: '/articulos',
    tr: '/makaleler',
  },
  '/articles/[slug]': {
    en: '/articles/[slug]',
    es: '/articulos/[slug]',
    tr: '/makaleler/[slug]',
  },
  '/projects': {
    en: '/projects',
    es: '/proyectos',
    tr: '/projeler',
  },
  '/courses': {
    en: '/courses',
    es: '/cursos',
    tr: '/dersler',
  },
  '/snippets': {
    en: '/code-snippets',
    es: '/fragmentos-de-codigo',
    tr: '/kod-parcaciklari',
  },
  '/hire-me': {
    en: '/hire-me',
    es: '/contratame',
    tr: '/beni-ise-al',
  },
  '/tags': {
    en: '/tags',
    es: '/etiquetas',
    tr: '/etiketler',
  },
  '/guest-book': {
    en: '/guest-book',
    es: '/libro-de-visitas',
    tr: '/ziyaretci-defteri',
  },
  '[...rest]': '[...rest]',
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = 'always'

export type AppPathnames = keyof typeof pathnames
