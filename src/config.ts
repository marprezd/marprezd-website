import { Pathnames, LocalePrefix } from 'next-intl/routing'

// Locales from Next Intl
export const defaultLocale = 'en' as const
export const locales = ['en', 'es', 'tr'] as const

export const pathnames: Pathnames<typeof locales> = {
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
    en: '/page/articles/[slug]',
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
}

// Use the default: `always`
export const localePrefix: LocalePrefix<typeof locales> = 'always'