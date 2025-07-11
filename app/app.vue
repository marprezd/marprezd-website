<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import { motion } from 'motion-v'
import { onMounted, ref } from 'vue'
import { motionPageTransition } from '@/utils/pageTransition'

const { locale } = useI18n()
const isReady = ref(false)
const head = useLocaleHead()
const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

// filter and map all alternate link for use in the useHead() composable
const alternateLinks = computed(() =>
  head.value.link
    .filter(l => l.rel === 'alternate' && l.hreflang)
    .map(l => ({
      hid: l.hid,
      rel: l.rel,
      href: l.href,
      hreflang: l.hreflang,
    })),
)

useHead({
  titleTemplate: '%s - Mario Pérez',
  htmlAttrs: {
    lang,
    dir,
  },
  link: alternateLinks,
})

onMounted(() => {
  // Wait for next tick to ensure DOM is painted
  requestAnimationFrame(() => {
    isReady.value = true
  })
})
</script>

<template>
  <UApp
    :locale="locales[locale]"
  >
    <NuxtLoadingIndicator
      :throttle="0"
      color="#06b6d4"
    />
    <AppNavbar />
    <!-- Render NuxtPage, and control the transition/animation of its content -->
    <motion.div
      :key="$route.fullPath"
      class="grid grid-flow-row auto-rows-max w-full min-h-screen"
      :initial="motionPageTransition.initial"
      :animate="motionPageTransition.animate(isReady)"
      :transition="motionPageTransition.transition"
    >
      <NuxtPage />
    </motion.div>
  </UApp>
</template>

<style lang="css">
  body {
  overflow-y: auto;
  padding: 0;
  /* padding-top: 0; */
}

body::-webkit-scrollbar-thumb {
  background-color: #67e8f9; /* cyan-300 */
}

body.dark::-webkit-scrollbar-thumb {
  background-color: #14b8a6; /* teal-500 */
}

body::-webkit-scrollbar-track {
  background-color: #cffafe; /* cyan-100 */
}

body.dark::-webkit-scrollbar-track {
  background-color: #115e59; /* teal-700 */
}

body::-webkit-scrollbar {
  width: 0.2rem;
}
</style>
