import { ClassValue, clsx } from 'clsx'
import { slug } from 'github-slugger'
import { marked } from 'marked'
import { twMerge } from 'tailwind-merge'
import { Post } from '#site/content'

// slugify
export function slugify(content: string) {
  return slug(content)
}

// markdownify
export function markdownify(content: string, div?: boolean) {
  const markdownContent: any = div ? marked.parse(content) : marked.parseInline(content)

  return { __html: markdownContent }
}

// capitalize first letter
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// humanize
export function humanize(content: string) {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/[-\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => {
      return m.toUpperCase()
    })
}

// plainify
export async function plainify(content: string) {
  const parseMarkdown = await marked.parse(content)
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, '')
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, '')
  const stripHTML = htmlEntityDecoder(filterSpaces)

  return stripHTML
}

// strip entities for plainify
function htmlEntityDecoder(htmlWithEntities: string): string {
  const entityList: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': '\'',
  }
  const htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity]
    },
  )

  return htmlWithoutEntities
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1

    return 0
  })
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {}

  posts.forEach((post) => {
    if (post.published) {
      post.tags?.forEach((tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1
      })
    }
  })

  return tags
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false
    const slugifiedTags = post.tags.map(tag => slug(tag))

    return slugifiedTags.includes(tag)
  })
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return false
  }

  return true
}

export function isArrayNotEmpty<T>(arr: T[] | undefined): arr is T[] {
  if (Array.isArray(arr) && arr.length > 0)
    return true

  return false
}
