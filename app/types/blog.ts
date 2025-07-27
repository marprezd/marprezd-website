// types blog post
export interface BlogPost {
  id: string
  title: string
  date: string
  lastModified?: string
  path: string
  description: string
  body: string
  cover: {
    image: string
    author?: string
    creditLink?: string
    hostName?: string
  }
  categories?: string[]
  language: string
  // Optional fields that might be present but aren't required
  pinned?: boolean
  tags?: string[]
  otherLanguages?: string[]
}
