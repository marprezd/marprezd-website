<script setup lang="ts">
import ReadTime from '~/components/blog/ReadTime.vue'

const { posts } = defineProps<{ posts: any }>()

// if posts.length > 1 iterate over posts and slice from first post to max 5 posts
const postsList = computed(() => posts.slice(1, 10).map((post: any) => ({
  ...post,
})))

const readTimeClass = computed(() => {
  return 'bg-transparent'
})
</script>

<template>
  <div
    class="w-full overflow-y-auto h-[18rem] md:h-[26.6rem] lg:h-[29.5rem] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
  >
    <ul class="p-4">
      <li v-for="post in postsList" :key="post.id" class="flex py-1.5 first:pt-0 last:pb-0">
        <NuxtLinkLocale :to="post.path" class="w-full group">
          <div class="flex items-center gap-x-2 p-2 border-2 border-dashed border-muted space-y-1 group-hover:border-solid transition-colors duration-300 ease-out">
            <!-- image processing for multiple device -->
            <NuxtImg
              :src="post.cover"
              class="rounded-lg max-h-10"
              provider="cloudinary"
              width="40"
              height="40"
              :alt="post.title"
              quality="80"
              format="webp"
              placeholder
              loading="lazy"
            />
            <div class="ml-3 overflow-hidden">
              <h3 class="pb-0 mb-0 text-sm font-semibold group-hover:text-primary transition-colors duration-300 ease-out">
                {{ post.title }}
              </h3>
              <div class="items-center inline-flex">
                <div class="flex items-center gap-x-1 text-[0.69rem] font-medium">
                  <UIcon name="i-tabler-calendar" />
                  <i18n-d
                    tag="span"
                    :value="new Date(post.date)"
                    scope="global"
                    :format="{ year: 'numeric', month: 'short', day: 'numeric' }"
                  />
                </div>
                <ReadTime
                  :content="post.body"
                  :language="post.language"
                  :show-word-count="false"
                  :reading-time-class="readTimeClass"
                />
              </div>
            </div>
          </div>
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
