<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { UNavigationMenu } from '#components'

const { t } = useI18n()
const localePath = useLocalePath()

// Use a computed property so items update when locale changes
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('app.menu.items.home.label'),
    to: localePath('/'),
  },
  {
    label: t('app.menu.items.pages.label'),
    children: [
      {
        label: t('app.menu.items.pages.items.works.label'),
        description: t('app.menu.items.pages.items.works.description'),
        icon: 'i-tabler-apps',
        to: localePath('works'),
      },
      {
        label: t('app.menu.items.pages.items.resources.label'),
        description: t('app.menu.items.pages.items.resources.description'),
        icon: 'i-tabler-books',
        to: localePath('resources'),
      },
      {
        label: t('app.menu.items.pages.items.hire.label'),
        description: t('app.menu.items.pages.items.hire.description'),
        icon: 'i-tabler-briefcase',
        to: localePath('hire'),
      },
      {
        label: t('app.menu.items.pages.items.repositories.label'),
        description: t('app.menu.items.pages.items.repositories.description'),
        icon: 'i-tabler-git-branch',
        to: localePath('repositories'),
      },
    ],
  },
  {
    label: t('app.menu.items.tutorials.label'),
    children: [
      {
        label: t('app.menu.items.tutorials.items.courses.label'),
        description: t('app.menu.items.tutorials.items.courses.description'),
        icon: 'i-tabler-video',
        to: localePath('courses'),
      },
      {
        label: t('app.menu.items.tutorials.items.blog.label'),
        description: t('app.menu.items.tutorials.items.blog.description'),
        icon: 'i-tabler-article',
        to: localePath('blog'),
      },
    ],
  },
  {
    label: t('app.menu.items.communities.label'),
    children: [
      {
        label: t('app.menu.items.communities.items.guestbook.label'),
        description: t('app.menu.items.communities.items.guestbook.description'),
        icon: 'i-tabler-signature',
        to: localePath('guestbook'),
      },
      {
        label: t('app.menu.items.communities.items.patreon.label'),
        description: t('app.menu.items.communities.items.patreon.description'),
        icon: 'i-tabler-brand-patreon',
        to: 'https://patreon.com/marprezd?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink',
        target: '_blank',
      },
    ],
  },
])
</script>

<template>
  <UNavigationMenu
    highlight
    highlight-color="primary"
    orientation="horizontal"
    :items="items"
    class="justify-center w-full data-[orientation=horizontal]:w-full"
  />
</template>

<style scoped></style>
