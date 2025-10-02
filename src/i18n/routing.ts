import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "es", "tr"],

  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/blog": {
      en: "/blog",
      es: "/blog",
      tr: "/blog",
    },
    "/blog/[slug]": {
      en: "/blog/[slug]",
      es: "/blog/[slug]",
      tr: "/blog/[slug]",
    },
    "/tags": {
      en: "/tags",
      es: "/etiquetas",
      tr: "/etiketler",
    },
    "/tags/[tag]": {
      en: "/tags/[tag]",
      es: "/etiquetas/[tag]",
      tr: "/etiketler/[tag]",
    },
    "/categories": {
      en: "/categories",
      es: "/categorias",
      tr: "/kategoriler",
    },
    "/categories/[category]": {
      en: "/categories/[category]",
      es: "/categorias/[category]",
      tr: "/kategoriler/[category]",
    },
    "/repositories": {
      en: "/repositories",
      es: "/repositorios",
      tr: "/depoları",
    },
    "/works": {
      en: "/works",
      es: "/trabajos",
      tr: "/isler",
    },
    "/courses": {
      en: "/courses",
      es: "/cursos",
      tr: "/dersler",
    },
    "/hire-me": {
      en: "/hire-me",
      es: "/contrata-me",
      tr: "/sana-bana",
    },
    "/guestbook": {
      en: "/guestbook",
      es: "/libro-de-visitas",
      tr: "/misafirlik-kitabi",
    },
    "/resources": {
      en: "/resources",
      es: "/recursos",
      tr: "/kaynaklar",
    },
    "[...rest]": "[...rest]",
  },
})
