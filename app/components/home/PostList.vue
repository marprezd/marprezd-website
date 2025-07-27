<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

defineProps<{
  posts: Pick<BlogPost, 'title' | 'date' | 'path' | 'cover' | 'language'>[]
}>()
</script>

<template>
  <div class="space-y-4 overflow-y-auto h-[18rem] md:h-[26.6rem] lg:h-[29.5rem] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
    <article
      v-for="(post, index) in posts"
      :key="post.path"
      class="group"
      :class="{ 'pt-4 border-t border-muted': index > 0 }"
    >
      <NuxtLinkLocale
        :to="post.path"
        class="grid grid-cols-3 gap-4 items-center"
      >
        <div class="col-span-1 aspect-video overflow-hidden rounded-lg">
          <NuxtImg
            :src="post.cover?.image || '/images/placeholder.jpg'"
            :alt="post.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            provider="cloudinary"
            width="250"
            height="150"
            loading="lazy"
          />
        </div>
        <div class="col-span-2">
          <h3 class="font-medium group-hover:text-primary transition-colors line-clamp-2">
            {{ post.title }}
          </h3>
          <time
            v-if="post.date"
            class="text-xs text-muted"
          >
            <i18n-d
              tag="span"
              :value="new Date(post.date)"
              scope="global"
              :format="{ year: 'numeric', month: 'short', day: 'numeric' }"
            />
          </time>
        </div>
      </NuxtLinkLocale>
    </article>
  </div>
</template>
