<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useReadingTime } from '~/composables/useReadingTime'

const props = defineProps<{
  content: any
  language: string
  showWordCount?: boolean
  readingTimeClass?: string
  wordCountClass?: string
}>()

const { content, language } = toRefs(props)

// Extract text from content
function extractText(content: any): string {
  if (!content)
    return ''

  // Handle minimark format
  if (content.type === 'minimark' && Array.isArray(content.value)) {
    return content.value
      .map((node: any) => {
        // The text is in the third position of the array for paragraphs and headings
        if (Array.isArray(node) && node.length >= 3) {
          return node[2] // The text content is at index 2
        }
        return ''
      })
      .filter(Boolean)
      .join(' ')
  }

  // Handle other formats (keeping existing logic as fallback)
  if (typeof content === 'string')
    return content
  if (Array.isArray(content))
    return content.map(extractText).filter(Boolean).join(' ')
  if (typeof content === 'object') {
    const text = content.text || content.content || content.body
    if (text)
      return extractText(text)
    return Object.values(content)
      .filter(v => v && typeof v === 'string')
      .join(' ')
  }
  return String(content)
}

const readingTime = computed(() => {
  try {
    const contentText = extractText(content.value)

    if (!contentText.trim()) {
      console.warn('No valid content found for reading time calculation')
      return { minutes: 0, wordCount: 0 }
    }

    return useReadingTime(contentText, language?.value || 'en', {
      wordsPerMinute: { en: 275, es: 250, tr: 240 },
      imageWeight: 15,
    })
  }
  catch (error) {
    console.error('Error calculating reading time:', error)
    return { minutes: 0, wordCount: 0 }
  }
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
      {{ readingTime.minutes }} {{ t("app.blog.reading-time.mins") }}
    </UBadge>
    <UBadge
      v-if="showWordCount"
      variant="soft"
      color="neutral"
      :class="wordCountClass"
      icon="i-tabler-file-text"
    >
      {{ readingTime.wordCount }} {{ t("app.blog.words") }}
    </UBadge>
  </div>
</template>
