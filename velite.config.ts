import { exec } from "node:child_process"
import { promisify } from "node:util"
import rehypeShiki from "@shikijs/rehype"
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeMathjax from "rehype-mathjax"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import rehypeUnwrapImages from "rehype-unwrap-images"
import emoji from "remark-emoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { defineCollection, defineConfig, s } from "velite"

const execAsync = promisify(exec)

const count = s.object({ total: s.number(), articles: s.number() }).default({ total: 0, articles: 0 })

function timestamp() {
  return s
    .custom<string | undefined>(i => i === undefined || typeof i === "string")
    .transform<string>(async (value, { meta }) => {
      const { stdout } = await execAsync(`git log -1 --format=%cd ${meta.path}`)
      return new Date(stdout || Date.now()).toISOString()
    })
}

const meta = s.object({
  title: s.string().optional(),
  description: s.string().optional(),
  keywords: s.array(s.string()).default([]),
}).default({})

const locale = s.object({
  code: s.string(),
  name: s.string(),
  path: s.string(),
  slug: s.string(),
})

const image = s.object({
  image: s.string(),
  author: s.string().default(""),
  creditLink: s.string().default(""),
  hostName: s.string().default(""),
})

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    date: s.isodate(),
    lastModified: timestamp(),
    cover: image.optional(),
    video: s.string().optional(),
    tags: s.array(s.string()).default([]),
    categories: s.array(s.string()).default([]),
    language: s.string(),
    otherLanguages: s.array(locale).optional(),
    metadata: s.metadata(),
    seo: meta,
    excerpt: s.excerpt(),
    content: s.mdx(),
    toc: s.toc(),
    pinned: s.boolean().default(false),
    published: s.boolean().default(true),
  }).transform((data) => {
    const slugParts = data.slug.split("/")
    const cleanSlug = slugParts[slugParts.length - 1].replace(/\.mdx$/, "")
    return {
      ...data,
      slug: cleanSlug,
      slugAsParams: cleanSlug,
    }
  }),
})

const categories = defineCollection({
  name: "Category",
  pattern: "categories/**/*.yml",
  schema: s.object({
    title: s.string().max(30).default(""),
    slug: s.path(),
    description: s.string().optional(),
    seo: meta.optional(),
    locale: s.string(),
    count,
  }).transform((data) => {
    const slugParts = data.slug.split("/")
    const cleanSlug = slugParts[slugParts.length - 1].replace(/\.ya?ml$/, "")
    const localeMatch = data.slug.match(/\/(en|es|tr)\//)
    const locale = localeMatch ? localeMatch[1] : "en"
    return {
      ...data,
      slug: cleanSlug,
      permalink: `/${cleanSlug}`,
      locale,
    }
  }),
})

const tags = defineCollection({
  name: "Tag",
  pattern: "tags/**/*.yml",
  schema: s.object({
    title: s.string().max(30).default(""),
    slug: s.path(),
    description: s.string().optional(),
    seo: meta.optional(),
    locale: s.string(),
    count,
  }).transform((data) => {
    const slugParts = data.slug.split("/")
    const cleanSlug = slugParts[slugParts.length - 1].replace(/\.ya?ml$/, "")
    const localeMatch = data.slug.match(/\/(en|es|tr)\//)
    const locale = localeMatch ? localeMatch[1] : "en"
    return {
      ...data,
      slug: cleanSlug,
      permalink: `/${cleanSlug}`,
      locale,
    }
  }),
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    clean: true,
  },
  collections: {
    posts,
    categories,
    tags,
  },
  mdx: {
    rehypePlugins: [
      rehypeStringify,
      rehypeSlug,
      rehypeMathjax,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor-link"],
            ariaLabel: "Link to section",
          },
        },
      ],
      [rehypeShiki, {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        transformers: [
          transformerMetaHighlight(),
          transformerNotationDiff({ matchAlgorithm: "v3" }),
          transformerNotationFocus({ matchAlgorithm: "v3" }),
          transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
          transformerNotationHighlight({ matchAlgorithm: "v3" }),
          transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
        ],
      }],
      rehypeUnwrapImages,
    ],
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      [emoji, {
        accessible: true,
        emoticon: true,
      }],
    ],
  },
  prepare: ({ posts, categories, tags }) => {
    const postsByLocale = posts.reduce((acc, post) => {
      if (!post.published)
        return acc
      const locale = post.language || "en"
      acc[locale] ||= []
      acc[locale].push(post)
      return acc
    }, {} as Record<string, typeof posts>)

    categories.forEach((category) => {
      const localePosts = postsByLocale[category.locale] || []
      category.count.articles = localePosts.filter(post =>
        post.categories.includes(category.title),
      ).length
      category.count.total = category.count.articles
    })

    tags.forEach((tag) => {
      const localePosts = postsByLocale[tag.locale] || []
      tag.count.articles = localePosts.filter(post =>
        post.tags.includes(tag.title),
      ).length
      tag.count.total = tag.count.articles
    })
  },
})
