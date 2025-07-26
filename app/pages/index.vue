<script setup lang="ts">
const { t } = useI18n()
const title = t('app.metadata.homepage.title')
const description = t('app.metadata.homepage.description')
const generator = t('app.metadata.homepage.generator')

useSeoMeta({
  title,
  description,
  generator,
  author: 'Mario Pérez',
  ogDescription: description,
  creator: 'Mario Pérez',
  ogImage: '/images/og-image.png',
  ogLocale: 'en-US',
  ogUrl: 'https://marprezd.dev/',
  ogSiteName: 'Marprezd Website',
})
</script>

<template>
  <div class="grid auto-rows-max grid-flow-row">
    <HomeHero />
    <HomeProfile />
    <HomeMetrics />
    <HomePinnedPosts />
  </div>
</template>

<style scoped></style>
