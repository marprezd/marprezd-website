<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import ReadTime from '~/components/blog/ReadTime.vue'

defineProps<{
  post: Pick<BlogPost, 'title' | 'date' | 'lastModified' | 'path' | 'description' | 'cover' | 'categories' | 'language' | 'body'>
}>()
</script>

<template>
  <article class="h-full flex flex-col group">
    <NuxtLinkLocale
      :to="post.path"
      class="h-full flex flex-col"
    >
      <div class="relative aspect-video overflow-hidden rounded-xl mb-4">
        <NuxtImg
          :src="post.cover?.image || '/images/placeholder.jpg'"
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          provider="cloudinary"
          width="600"
          height="400"
          loading="lazy"
        />
      </div>

      <div class="flex-1 flex flex-col">
        <div class="flex items-center gap-2 mb-2">
          <UBadge
            v-if="post.date"
            variant="soft"
            color="neutral"
            class="text-muted"
            icon="i-tabler-calendar"
          >
            <time>
              <i18n-d
                tag="span"
                :value="new Date(post.date)"
                scope="global"
                :format="{ year: 'numeric', month: 'short', day: 'numeric' }"
              />
            </time>
          </UBadge>
          <UBadge
            v-if="post.lastModified"
            variant="soft"
            color="success"
            class="text-muted"
            icon="i-tabler-edit"
          >
            <time>
              <i18n-d
                tag="span"
                :value="new Date(post.lastModified)"
                scope="global"
                :format="{ year: 'numeric', month: 'short', day: 'numeric' }"
              />
            </time>
          </UBadge>
        </div>

        <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {{ post.title }}
        </h3>

        <p class="text-muted mb-4 line-clamp-2">
          {{ post.description }}
        </p>

        <div class="mt-auto flex items-center justify-between">
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="category in post.categories"
              :key="category"
              variant="subtle"
              class="text-xs"
            >
              {{ category }}
            </UBadge>
          </div>
          <ReadTime :content="post.body" :language="post.language" class="text-sm text-muted" />
        </div>
      </div>
    </NuxtLinkLocale>
  </article>
</template>
