import {
  transformerNotationDiff,
  transformerNotationFocus,
  // ...
} from '@shikijs/transformers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import emoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkUnwrapImages from 'remark-unwrap-images'
import { visit } from 'unist-util-visit'
import { defineCollection, defineConfig, s } from 'velite'

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split('/').slice(1).join('/'),
})

const options: Partial<Options> = {
  theme: {
    dark: 'dark-plus',
    light: 'light-plus',
  },
  transformers: [
    transformerNotationDiff(),
    transformerNotationFocus(),
  ],
  keepBackground: false,
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) node.children = [{ type: 'text', value: ' ' }]
  },
  onVisitHighlightedLine(node: any) {
    const nodeClass = node.properties.className

    if (nodeClass && nodeClass.length > 0) node.properties.className.push('line--highlighted')
    else node.properties.className = ['line--highlighted']
  },

  onVisitHighlightedChars(node: any, id) {
    node.properties.className = ['word--highlighted']
    if (id) {
      // If the word spans across syntax boundaries (e.g. punctuation), remove
      // colors from the child nodes.
      if (node.properties['data-rehype-pretty-code-wrapper']) {
        node.children.forEach(
          (childNode: { properties: { style: string } }) => {
            childNode.properties.style = ''
          },
        )
      }

      node.properties.style = ''
      node.properties['data-word-id'] = id
    }
  },
}

const locale = s
  .object({
    code: s.string(),
    name: s.string(),
    path: s.string(),
    slug: s.string(),
  })

const cover = s
  .object({
    image: s.image(),
    author: s.string().default(''),
    creditLink: s.string().default(''),
    hostName: s.string().default(''),
  })

const series = s
  .object({
    title: s.string(),
    order: s.number(),
  }).optional()

const posts = defineCollection({
  name: 'Post',
  pattern: 'articles/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      language: s.string(),
      otherLanguages: s.array(locale),
      series,
      cover,
      excerpt: s.excerpt(),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      updated: s.isodate().optional(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).default([]),
      categories: s.array(s.string()).default([]),
      body: s.mdx(),
      toc: s.toc(),
      metadata: s.metadata(),
      section: s.string(),
    })
    .transform(computedFields),
})

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      rehypeStringify,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children

            if (codeEl.tagName !== 'code') return

            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event="([^"]*)"/
              const match = codeEl.data?.meta.match(regex)

              if (match) {
                node.__event__ = match ? match[1] : null
                codeEl.data.meta = codeEl.data.meta.replace(regex, '')
              }
            }

            node.__rawString__ = codeEl.children?.[0].value
            node.__src__ = node.properties?.__src__
            node.__style__ = node.properties?.__style__
          }
        })
      },
      [rehypePrettyCode, options],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) return

            const preElement = node.children.at(-1)

            if (preElement.tagName !== 'pre') return

            preElement.properties.__rawString__ = node.__rawString__
          }
        })
      },
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['anchor-link'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
    remarkPlugins: [
      remarkUnwrapImages,
      remarkMath,
      remarkGfm,
      [emoji, {
        accessible: true, // Defaults to false
        emoticon: true, // Defaults to false
      },
      ],
    ],
  },
})
