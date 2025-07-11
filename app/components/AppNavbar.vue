<script setup lang="ts">
import { motion } from 'motion-v'
import { ref } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()

const isMenuOpen = ref(false)
function toggleMenu(_event?: MouseEvent) {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenu = () => (isMenuOpen.value = false)

// Track which parent menus are open (by label)
const openGroups = ref<string[]>([])
function toggleGroup(label: string) {
  if (openGroups.value.includes(label)) {
    openGroups.value = openGroups.value.filter(l => l !== label)
  }
  else {
    openGroups.value.push(label)
  }
}
const isGroupOpen = (label: string) => openGroups.value.includes(label)

const items = computed(() => [
  {
    label: t('app.menu.items.home.label'),
    to: localePath('/'),
    target: undefined,
  },
  {
    label: t('app.menu.items.pages.label'),
    children: [
      {
        label: t('app.menu.items.pages.items.projects.label'),
        icon: 'i-tabler-apps',
        to: localePath('projects'),
        target: undefined,
      },
      {
        label: t('app.menu.items.pages.items.resources.label'),
        icon: 'i-tabler-books',
        to: localePath('resources'),
        target: undefined,
      },
      {
        label: t('app.menu.items.pages.items.hire.label'),
        icon: 'i-tabler-briefcase',
        to: localePath('hire'),
        target: undefined,
      },
      {
        label: t('app.menu.items.pages.items.repositories.label'),
        icon: 'i-tabler-git-branch',
        to: localePath('repositories'),
        target: undefined,
      },
    ],
  },
  {
    label: t('app.menu.items.tutorials.label'),
    children: [
      {
        label: t('app.menu.items.tutorials.items.courses.label'),
        icon: 'i-tabler-video',
        to: localePath('courses'),
        target: undefined,
      },
      {
        label: t('app.menu.items.tutorials.items.blog.label'),
        icon: 'i-tabler-article',
        to: localePath('blog'),
        target: undefined,
      },
    ],
  },
  {
    label: t('app.menu.items.communities.label'),
    children: [
      {
        label: t('app.menu.items.communities.items.guestbook.label'),
        icon: 'i-tabler-signature',
        to: localePath('guestbook'),
        target: undefined,
      },
      {
        label: t('app.menu.items.communities.items.patreon.label'),
        icon: 'i-tabler-brand-patreon',
        to: 'https://patreon.com/marprezd?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink',
        target: '_blank',
      },
    ],
  },
])
</script>

<template>
  <header>
    <nav class="top-0 z-20 fixed bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-600 border-b w-full start-0">
      <div class="flex flex-wrap justify-between items-center mx-auto p-4 max-w-screen-xl">
        <AppLogo />
        <div class="flex space-x-2 rtl:space-x-reverse lg:order-2">
          <CurriculumVitae />
          <LocaleSwitcher />
          <ColorModeButton />
          <UButton
            class="lg:hidden"
            :icon="isMenuOpen ? 'i-tabler-x' : 'i-tabler-menu-deep'"
            variant="soft"
            aria-label="Toggle mobile menu"
            @click="toggleMenu"
          />
        </div>
        <div class="hidden lg:flex justify-between items-center lg:order-1 w-full lg:w-auto">
          <DesktopTopMenu />
        </div>
        <!-- Mobile Navbar with motion-v -->
        <motion.div
          v-if="isMenuOpen"
          class="lg:hidden top-16 left-1/2 z-50 absolute flex flex-col items-center bg-neutral-50 dark:bg-neutral-900 shadow-xl p-4 border-neutral-200 dark:border-neutral-600 border-b w-full -translate-x-1/2 transform"
          :initial="{ opacity: 0, y: -24, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, y: -24, scale: 0.98 }"
          :transition="{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }"
        >
          <ul class="space-y-2 w-full">
            <li
              v-for="item in items"
              :key="item.label"
            >
              <template v-if="item.children">
                <button
                  class="flex justify-between items-center hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 px-2.5 py-2 rounded w-full text-neutral-700 dark:text-neutral-200 text-sm transition-colors"
                  type="button"
                  @click="toggleGroup(item.label)"
                >
                  <span>{{ item.label }}</span>
                  <span>
                    <UIcon
                      v-if="!isGroupOpen(item.label)"
                      name="i-tabler-plus"
                      class="size-5"
                    />
                    <UIcon
                      v-else
                      name="i-tabler-minus"
                      class="size-5"
                    />
                  </span>
                </button>
                <motion.ul
                  v-if="isGroupOpen(item.label)"
                  class="space-y-1 ml-4 border-neutral-200 dark:border-neutral-600 border-l"
                  :initial="{ opacity: 0, y: -12 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :exit="{ opacity: 0, y: -12 }"
                  :transition="{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }"
                >
                  <li
                    v-for="child in item.children"
                    :key="child.label"
                  >
                    <ULink
                      :to="child.to"
                      :target="child.target"
                      class="flex items-center gap-2 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 px-2.5 py-2 rounded text-sm transition-colors"
                      @click="closeMenu"
                    >
                      <UIcon
                        v-if="child.icon"
                        :name="child.icon"
                        class="size-5"
                      />
                      <span>{{ child.label }}</span>
                    </ULink>
                  </li>
                </motion.ul>
              </template>
              <template v-else>
                <ULink
                  :to="item.to"
                  :target="item.target"
                  class="block hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 px-2.5 py-2 rounded text-sm transition-colors"
                  @click="closeMenu"
                >
                  {{ item.label }}
                </ULink>
              </template>
            </li>
          </ul>
        </motion.div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
