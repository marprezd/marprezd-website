import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const locale = z.object({
  code: z.string(),
  name: z.string(),
  path: z.string(),
  slug: z.string(),
})

const cover = z.object({
  image: z.string(),
  author: z.string().default(''),
  creditLink: z.string().default(''),
  hostName: z.string().default(''),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      // Define custom schema for blog collection
      schema: z.object({
        pinned: z.boolean().default(false),
        date: z.date().optional(),
        lastModified: z.date(),
        excerpt: z.object({
          type: z.string(),
          children: z.any(),
        }),
        summary: z.string(),
        tags: z.array(z.string()),
        categories: z.array(z.string()),
        language: z.string(),
        otherLanguages: z.array(locale),
        cover,
        published: z.boolean().default(true),
      }),
    }),
  },
})
