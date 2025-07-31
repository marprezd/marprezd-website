import type { Ref } from 'vue'
import type { BlogPost } from '~/types/blog'

// useBlogPosts composables function to fetch blog posts
export default function useBlogPosts(locale: Ref<string>, categorySlug?: Ref<string>, tagSlug?: Ref<string>) {
  // Generate a unique key based on locale, categorySlug, and tagSlug
  const key = computed(() => `blog-list-${locale.value}-${categorySlug?.value} || blog-list-${locale.value}-${tagSlug?.value} || 'all'`)

  // Fetch blog posts
  const { data: posts, pending, error, refresh } = useAsyncData<BlogPost[]>(
    key,
    async () => {
      try {
        const items = await queryCollection('blog')
          .order('date', 'DESC')
          .select('path', 'id', 'title', 'language', 'description', 'tags', 'date', 'lastModified', 'cover', 'categories', 'body', 'published')
          .all()

        return items.map(item => ({
          ...item,
          description: item.description || '', // Use summary as description since it's required
          cover: typeof item.cover === 'string' ? { image: item.cover } : item.cover || { image: '' },
          categories: item.categories || [],
          date: item.date ? new Date(item.date).toISOString() : '',
          lastModified: item.lastModified ? new Date(item.lastModified).toISOString() : new Date().toISOString(),
          body: typeof item.body === 'string' ? item.body : JSON.stringify(item.body),
          tags: item.tags || [],
          language: item.language || locale.value,
          published: item.published ?? true,
        }))
      }
      catch (err) {
        console.error('Error fetching blog posts:', err)
        throw err
      }
    },
    {
      watch: categorySlug ? [locale, categorySlug] : [locale],
      server: true,
    },
  )

  return {
    posts,
    pending,
    error,
    refresh,
  }
}
