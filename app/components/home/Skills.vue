<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import { motion } from 'motion-v'

const props = defineProps<{
  items: AccordionItem[]
  languages: any[]
  frameworks: any[]
  databases: any[]
  tools: any[]
}>()
const active = ref('0')
const { t } = useI18n()
</script>

<template>
  <div class="col-span-full">
    <UAccordion
      v-model="active"
      :items="props.items"
    >
      <template #languages>
        <div
          class="gap-4 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <motion.div
            v-for="tech in props.languages"
            :key="tech.title"
            :initial="{ opacity: 0, scale: 0 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }"
            class="flex flex-col bg-default shadow mx-2 p-4 rounded-xl"
          >
            <div class="flex flex-col justify-center items-center">
              <UIcon
                :name="tech.icon"
                class="mb-2 size-10"
              />
              <div class="font-semibold text-neutral-700 dark:text-neutral-200">
                {{ tech.title }}
              </div>
            </div>
            <div class="flex justify-between items-center my-1.5 w-full font-mono">
              <p class="text-neutral-800 dark:text-white text-xs">
                {{ t("app.home.skills.average") }}
              </p>
              <span class="text-neutral-800 dark:text-white text-xs">
                {{ tech.score }}%
              </span>
            </div>
            <UProgress v-model="tech.score" />
          </motion.div>
        </div>
      </template>
      <template #frameworks>
        <div
          class="gap-4 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <motion.div
            v-for="tech in props.frameworks"
            :key="tech.title"
            :initial="{ opacity: 0, scale: 0 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }"
            class="flex flex-col bg-default shadow mx-2 p-4 rounded-xl"
          >
            <div class="flex flex-col justify-center items-center">
              <UIcon
                :name="tech.icon"
                class="mb-2 size-10"
              />
              <div class="font-semibold text-neutral-700 dark:text-neutral-200">
                {{ tech.title }}
              </div>
            </div>
            <div class="flex justify-between items-center my-1.5 w-full font-mono">
              <p class="text-neutral-800 dark:text-white text-xs">
                {{ t("app.home.skills.average") }}
              </p>
              <span class="text-neutral-800 dark:text-white text-xs">
                {{ tech.score }}%
              </span>
            </div>
            <UProgress v-model="tech.score" />
          </motion.div>
        </div>
      </template>
      <template #databases>
        <div
          class="gap-4 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <motion.div
            v-for="tech in props.databases"
            :key="tech.title"
            :initial="{ opacity: 0, scale: 0 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }"
            class="flex flex-col bg-default shadow mx-2 p-4 rounded-xl"
          >
            <div class="flex flex-col justify-center items-center">
              <UIcon
                :name="tech.icon"
                class="mb-2 size-10"
              />
              <div class="font-semibold text-neutral-700 dark:text-neutral-200">
                {{ tech.title }}
              </div>
            </div>
            <div class="flex justify-between items-center my-1.5 w-full font-mono">
              <p class="text-neutral-800 dark:text-white text-xs">
                {{ t("app.home.skills.average") }}
              </p>
              <span class="text-neutral-800 dark:text-white text-xs">
                {{ tech.score }}%
              </span>
            </div>
            <UProgress v-model="tech.score" />
          </motion.div>
        </div>
      </template>
      <template #tools>
        <div
          class="gap-4 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <motion.div
            v-for="tech in props.tools"
            :key="tech.title"
            :initial="{ opacity: 0, scale: 0 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }"
            class="flex flex-col bg-default shadow mx-2 p-4 rounded-xl"
          >
            <div class="flex flex-col justify-center items-center">
              <UIcon
                :name="tech.icon"
                class="mb-2 size-10"
              />
              <div class="font-semibold text-neutral-700 dark:text-neutral-200">
                {{ tech.title }}
              </div>
            </div>
            <div class="flex justify-between items-center my-1.5 w-full font-mono">
              <p class="text-neutral-800 dark:text-white text-xs">
                {{ t("app.home.skills.average") }}
              </p>
              <span class="text-neutral-800 dark:text-white text-xs">
                {{ tech.score }}%
              </span>
            </div>
            <UProgress v-model="tech.score" />
          </motion.div>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<style scoped></style>
