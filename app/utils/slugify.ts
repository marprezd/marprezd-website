import { slug } from 'github-slugger'

// slugify content to url-friendly string
export function slugify(content: string) {
  return slug(content)
}
