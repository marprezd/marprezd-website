<script setup lang="ts">
import { motion } from 'motion-v'

const { locale, t } = useI18n()

// Fetch all blog posts
const { data: pinnedPosts } = await useAsyncData(
  `pinned-posts-${locale.value}`,
  () => queryCollection('blog')
    .order('date', 'DESC')
    .select('title', 'date', 'path', 'pinned', 'description', 'language', 'cover', 'tags', 'body')
    .all(),
)

// Filter and map posts by locale and pinned property
const filteredPosts = computed(() =>
  (pinnedPosts.value || [])
    .filter(post => post.language === locale.value && post.pinned === true)
    .map(post => ({
      ...post,
      // Convert body to string if it's not already
      body: typeof post.body === 'string' ? post.body : JSON.stringify(post.body),
    })),
)
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
          {{ t('app.home.pinned-posts') }}
        </h2>
        <div v-if="filteredPosts">
          <div class="grid grid-cols-12 gap-4 bg-default rounded-2xl p-4">
            <!-- if posts.length > 0 iterate over posts and slice the first post -->
            <div v-if="filteredPosts.length > 0" class="col-span-full md:col-start-1 md:col-end-7">
              <HomeSinglePost :post="filteredPosts[0]" />
            </div>
            <!-- if posts.length > 1 iterate over posts and slice the rest of the posts -->
            <div v-if="filteredPosts.length > 1" class="col-span-full md:col-start-7 md:col-end-13">
              <HomePostList :posts="filteredPosts" />
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-center text-muted">
            {{ 'No pinned posts' }}
          </p>
        </div>
      </div>
    </motion.section>
  </div>
</template>

<style scoped></style>
