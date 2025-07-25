interface ReadingTimeOptions {
  wordsPerMinute?: { [key: string]: number }
  imageWeight?: number
  excludeMarkdown?: boolean
}

export interface ReadingTimeResult {
  minutes: number
  wordCount: number
}

export function useReadingTime(
  content: string,
  language: string,
  options: ReadingTimeOptions = {},
): ReadingTimeResult {
  const wordsPerMinute = computed(() => {
    const defaultWPM = 265 // Default words per minute
    const languageWPM = options?.wordsPerMinute?.[language] || defaultWPM
    return languageWPM
  })

  const imageWeight = computed(() => options.imageWeight || 12) // Seconds per image
  const excludeMarkdown = computed(() => options.excludeMarkdown !== false) // Default true

  const result = computed<ReadingTimeResult>(() => {
    if (!content)
      return { minutes: 0, wordCount: 0 }

    let text = content

    if (excludeMarkdown.value) {
      // Remove Markdown syntax
      text = text.replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`[^`]*`/g, '') // Remove inline code
        .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
        .replace(/<.*?>/g, '') // Remove HTML tags
        .replace(/#+/g, '') // Remove headings
        .replace(/>/g, '') // Remove blockquotes
        .replace(/[*+-]\s/g, '') // Remove lists
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images (handling separately)
    }

    // Count words (split by spaces, tabs, newlines)
    const words = text.trim().split(/\s+/).filter(word => word !== '')
    const wordCount = words.length

    // Count images (simple regex, adjust as needed)
    const imageCount = (content.match(/!\[.*?\]\(.*?\)/g) || []).length

    // Calculate total reading time in minutes
    const totalMinutes = wordCount / wordsPerMinute.value + imageCount * imageWeight.value / 60

    return {
      minutes: Math.ceil(totalMinutes), // Round up to the nearest minute
      wordCount,
    }
  })

  return result.value
}
