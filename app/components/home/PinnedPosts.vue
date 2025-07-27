<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import { motion } from 'motion-v'

const { locale } = useI18n()

// Composable for fetching and processing posts
function usePinnedPosts() {
  const { data: posts, pending, error } = useAsyncData<BlogPost[]>(
    `pinned-posts-${locale.value}`,
    async () => {
      const items = await queryCollection('blog')
        .where('pinned', '=', true)
        .order('date', 'DESC')
        .select('id', 'title', 'date', 'lastModified', 'path', 'description', 'language', 'cover', 'categories', 'body')
        .all()

      return items.map(item => ({
        ...item,
        cover: typeof item.cover === 'string' ? { image: item.cover } : item.cover || { image: '' },
        categories: item.categories || [],
        date: item.date ? new Date(item.date).toISOString() : '',
        lastModified: item.lastModified ? new Date(item.lastModified).toISOString() : undefined,
        body: typeof item.body === 'string' ? item.body : JSON.stringify(item.body),
      }))
    },
  )

  return {
    filteredPosts: computed(() => posts.value || []),
    isLoading: pending,
    error,
  }
}

const { filteredPosts, isLoading, error } = usePinnedPosts()

// Animation configuration
const motionSectionTransition = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -100px 0px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}
</script>

<template>
  <div class="bg-elevated text-elevated py-20 lg:py-30">
    <motion.section
      :initial="motionSectionTransition.initial"
      :while-in-view="motionSectionTransition.whileInView"
      :viewport="motionSectionTransition.viewport"
      :transition="motionSectionTransition.transition"
      class="grid grid-flow-row auto-rows-max mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-6 lg:space-y-10"
    >
      <div class="w-full space-y-6 lg:space-y-10">
        <h2 class="font-bold text-3xl lg:text-4xl lg:text-left">
          {{ $t('app.home.pinned-posts') }}
        </h2>

        <template v-if="isLoading">
          <div class="animate-pulse bg-default/50 rounded-2xl p-6 h-64" />
        </template>

        <template v-else-if="error">
          <div class="text-center text-error p-4">
            {{ $t('app.global.error') }}
          </div>
        </template>

        <template v-else-if="filteredPosts.length === 0">
          <p class="text-center text-muted">
            {{ $t('app.home.no_pinned_posts') }}
          </p>
        </template>

        <template v-else>
          <div class="grid grid-cols-12 gap-4 bg-default rounded-2xl p-4 space-y-8 sm:space-y-0">
            <!-- Featured Post -->
            <div class="col-span-full md:col-start-1 md:col-end-7">
              <HomeSinglePost :post="filteredPosts[0]!" />
            </div>

            <!-- Additional Posts -->
            <div
              v-if="filteredPosts.length > 1"
              class="col-span-full md:col-start-7 md:col-end-13"
            >
              <HomePostList :posts="filteredPosts.slice(1)" />
            </div>
          </div>
        </template>
      </div>
    </motion.section>
  </div>
</template>

<style scoped></style>
