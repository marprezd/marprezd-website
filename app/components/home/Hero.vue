<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const githubUrl = 'https://www.github.com/marprezd'
const blogPath = localePath('/blog')
</script>

<template>
  <section class="flex flex-col justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl min-h-screen">
    <NuxtLink
      to="#about"
      class="inline-flex items-center gap-x-2 bg-white dark:bg-neutral-800 p-1 ps-3 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600 rounded-full dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600 text-muted text-xs transition cursor-pointer"
    >
      {{ t('app.home.hero.badge') }}
      <span className="inline-flex justify-center items-center gap-x-2 bg-neutral-300 dark:bg-neutral-700 px-2.5 py-1.5 rounded-full font-semibold text-muted text-sm">
        <svg
          class="size-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="{24}"
          height="{24}"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="{2}"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </span>
    </NuxtLink>
    <div class="space-y-4 mx-auto mt-5 max-w-4xl text-center">
      <!-- Title and description -->
      <i18n-t
        keypath="app.home.hero.title"
        tag="h1"
        for="name"
        class="block font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight"
        scope="global"
      >
        <span class="text-primary">{{ t("app.home.hero.name") }}</span>
      </i18n-t>

      <p class="text-toned">
        {{ t('app.home.hero.description') }}
      </p>
    </div>
    <div class="flex justify-center gap-3 mt-8">
      <!-- CTA Link: It all starts here! -->
      <UButton
        :to="blogPath"
        size="lg"
        trailing-icon="i-tabler-arrow-narrow-right"
      >
        {{ t("app.home.hero.started") }}
      </UButton>
      <!-- Link to my Github profile -->
      <UButton
        size="lg"
        :to="githubUrl"
        variant="outline"
        color="secondary"
        icon="i-tabler-brand-github"
        target="_blank"
      >
        Github
      </UButton>
    </div>
  </section>
</template>

<style scoped></style>
