<script setup lang="ts">
import { NuxtLinkLocale, UBadge } from '#components'
import ReadTime from '~/components/blog/ReadTime.vue'

const { post } = defineProps<{ post: any }>()

const readTimeClass = computed(() => {
  return 'rounded-xl'
})
</script>

<template>
  <div>
    <NuxtLinkLocale
      :to="post.path"
      class="group block"
    >
      <div class="bg-white dark:bg-neutral-950 relative group-hover:shadow-lg group-hover:shadow-neutral-300 dark:group-hover:shadow-neutral-700 transition-shadow duration-300 ease-out transform rounded-lg p-4 border border-muted shadow-sm space-y-2">
        <!-- image processing for multiple device -->
        <NuxtImg
          :src="post.cover"
          class="rounded-lg w-full object-cover"
          provider="cloudinary"
          width="331"
          height="221"
          :alt="post.title"
          quality="80"
          format="webp"
          placeholder
          loading="lazy"
        />
        <!-- label categories -->
        <div class="top-6 left-6 absolute z-0">
          <div class="flex items-center gap-2">
            <UBadge
              v-for="tag in post.tags"
              :key="tag"
              variant="soft"
              color="secondary"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>
        <div>
          <!-- Title post -->
          <h3 class="text-2xl font-bold tracking-tight line-clamp-2">
            {{ post.title }}
          </h3>
          <!-- Post meta -->
          <div class="flex items-center my-2 gap-2">
            <div class="flex items-center gap-2">
              <UBadge
                variant="soft"
                color="neutral"
                class="rounded-xl"
                icon="i-tabler-user"
              >
                Mario Pérez
              </UBadge>
              <UBadge
                variant="soft"
                color="neutral"
                class="rounded-xl"
                icon="i-tabler-calendar"
              >
                <i18n-d
                  tag="span"
                  :value="new Date(post.date)"
                  scope="global"
                  :format="{ year: 'numeric', month: 'short', day: 'numeric' }"
                />
              </UBadge>
            </div>
            <ReadTime
              :content="post.body"
              :language="post.language"
              :show-word-count="false"
              :reading-time-class="readTimeClass"
            />
          </div>
          <!-- Post content -->
          <p class="line-clamp-3">
            {{ post.description }}
          </p>
        </div>
      </div>
    </NuxtLinkLocale>
  </div>
</template>

<style scoped></style>
