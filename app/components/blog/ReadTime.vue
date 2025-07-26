<script setup lang="ts">
import { useReadingTime } from '~/composables/useReadingTime'

const props = defineProps<{
  content: string
  language: string
  showWordCount?: boolean
  readingTimeClass?: string
  wordCountClass?: string
}>()

const { minutes, wordCount } = useReadingTime(props.content, props.language, {
  wordsPerMinute: {
    en: 275,
    es: 250,
    tr: 240,
  },
  imageWeight: 15,
})

const { t } = useI18n()
</script>

<template>
  <div class="flex items-center gap-2">
    <UBadge
      variant="soft"
      color="neutral"
      :class="readingTimeClass"
      icon="i-tabler-clock"
    >
      {{ minutes }} {{ t("app.blog.reading-time.mins") }}
    </UBadge>
    <UBadge
      v-if="showWordCount"
      variant="soft"
      color="neutral"
      :class="wordCountClass"
      icon="i-tabler-file-text"
    >
      {{ wordCount }} {{ t("app.blog.words") }}
    </UBadge>
  </div>
</template>

<style scoped></style>
