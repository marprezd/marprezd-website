<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import { motion } from 'motion-v'

const yearsExperience = Math.floor((new Date().getTime() - new Date('2019-08-13').getTime()) / 3.15576e10)
const { t } = useI18n()

// Array of soft skill keys
const softSkills = [
  'communication',
  'teamwork',
  'problem-solving',
  'adaptability',
  'time-management',
  'critical-thinking',
  'self-motivation',
]

const items = [
  {
    label: 'Languages',
    icon: 'i-tabler-language',
    slot: 'languages' as const,
  },
  {
    label: 'Frameworks',
    icon: 'i-tabler-device-ipad-horizontal-code',
    slot: 'frameworks' as const,
  },
  {
    label: 'Databases',
    icon: 'i-tabler-database',
    slot: 'databases' as const,
  },
  {
    label: 'Tools',
    icon: 'i-tabler-tool',
    slot: 'tools' as const,
  },
] satisfies AccordionItem[]

const technologies = ref([
  {
    title: 'C++',
    icon: 'i-skill-icons-cpp',
    score: 10,
    type: 'language',
  },
  {
    title: 'Anaconda',
    icon: 'i-skill-icons-anaconda-dark',
    score: 76,
    type: 'tool',
  },
  {
    title: 'NextJS',
    icon: 'i-skill-icons-nextjs-dark',
    score: 60,
    type: 'framework',
  },
  {
    title: 'Postman',
    icon: 'i-skill-icons-postman',
    score: 90,
    type: 'tool',
  },
  {
    title: 'Python',
    icon: 'i-skill-icons-python-dark',
    score: 78,
    type: 'language',
  },
  {
    title: 'Postgres',
    icon: 'i-skill-icons-postgresql-dark',
    score: 70,
    type: 'database',
  },
  {
    title: 'Javascript',
    icon: 'i-skill-icons-javascript',
    score: 82,
    type: 'language',
  },
  {
    title: 'ReactJS',
    icon: 'i-skill-icons-react-dark',
    score: 75,
    type: 'framework',
  },
  {
    title: 'Django',
    icon: 'i-skill-icons-django',
    score: 70,
    type: 'framework',
  },
  {
    title: 'Java',
    icon: 'i-skill-icons-java-dark',
    score: 60,
    type: 'language',
  },
  {
    title: 'Docker',
    icon: 'i-skill-icons-docker',
    score: 63,
    type: 'tool',
  },
  {
    title: 'Markdown',
    icon: 'i-skill-icons-markdown-dark',
    score: 100,
    type: 'language',
  },
  {
    title: 'Graphql',
    icon: 'i-skill-icons-graphql-dark',
    score: 68,
    type: 'language',
  },
  {
    title: 'Mongodb',
    icon: 'i-skill-icons-mongodb',
    score: 80,
    type: 'database',
  },
  {
    title: 'Git',
    icon: 'i-skill-icons-git',
    score: 90,
    type: 'tool',
  },
  {
    title: 'Flask',
    icon: 'i-skill-icons-flask-dark',
    score: 70,
    type: 'framework',
  },
  {
    title: 'Supabase',
    icon: 'i-skill-icons-supabase-dark',
    score: 76,
    type: 'database',
  },
  {
    title: 'Tailwindcss',
    icon: 'i-skill-icons-tailwindcss-dark',
    score: 90,
    type: 'framework',
  },
  {
    title: 'FastAPI',
    icon: 'i-skill-icons-fastapi',
    score: 72,
    type: 'framework',
  },
  {
    title: 'Visual Studio Code',
    icon: 'i-skill-icons-vscode-dark',
    score: 90,
    type: 'tool',
  },
])

// filter callback to access the 'type' property of each technology object
const languages = computed(() => {
  return technologies.value.filter(tech => tech.type === 'language')
})
const frameworks = computed(() => {
  return technologies.value.filter(tech => tech.type === 'framework')
})
const databases = computed(() => {
  return technologies.value.filter(tech => tech.type === 'database')
})
const tools = computed(() => {
  return technologies.value.filter(tech => tech.type === 'tool')
})
</script>

<template>
  <div
    id="about"
    class="bg-elevated text-elevated py-20 lg:py-30"
  >
    <motion.section
      :initial="motionSectionTransition.initial"
      :while-in-view="motionSectionTransition.whileInView"
      :viewport="motionSectionTransition.viewport"
      :transition="motionSectionTransition.transition"
      class="grid grid-flow-row auto-rows-max place-content-center mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-6 lg:space-y-10"
    >
      <div class="w-full">
        <div
          class="flex md:flex-row flex-col justify-center space-y-4 md:space-y-0"
        >
          <div class="basis-full md:basis-4/12">
            <div class="flex justify-center md:justify-start w-full">
              <NuxtImg
                src="/v1662047991/profile_uezzbj.jpg"
                provider="cloudinary"
                class="shadow-lg rounded-full size-40 md:size-46 lg:size-64"
                width="256"
                height="256"
                alt="Mario P."
                quality="80"
                format="webp"
                placeholder
              />
            </div>
          </div>
          <div class="self-center basis-full md:basis-8/12">
            <div class="w-full">
              <div class="flex justify-center md:justify-start items-center space-x-3">
                <p class="font-semibold text-neutral-500 dark:text-neutral-200 text-xs uppercase">
                  Mario Pérez
                </p>
                <UBadge
                  color="neutral"
                  variant="outline"
                >
                  {{ t("app.home.profile.experience", { years: yearsExperience }) }}
                </UBadge>
              </div>
              <p class="mt-2 text-toned text-base md:text-lg lg:text-2xl md:text-left text-center text-pretty">
                {{ t("app.home.profile.description") }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full gap-4 grid grid-cols-12">
        <div class="col-span-full md:col-span-4 p-4 bg-default rounded-2xl text-elevated">
          <h2 class="font-bold text-3xl lg:text-4xl lg:text-left text-center">
            {{ t("app.home.skills.title") }}
          </h2>
          <p class="text-muted text-sm lg:text-left text-center">
            {{ t("app.home.skills.description") }}
          </p>
        </div>
        <div class="content-center col-span-full md:col-span-8">
          <!-- Responsive list: 1 col (mobile), 2 cols (tablet), 3 cols (desktop) -->
          <ul class="gap-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <li
              v-for="(item, index) in softSkills"
              :key="index"
              class="flex flex-col justify-between items-start"
            >
              <div class="flex flex-row items-center gap-1 p-1">
                <span class="flex justify-center items-center bg-cyan-50 dark:bg-cyan-800/30 rounded-full size-5 text-cyan-600 dark:text-cyan-500">
                  <svg
                    class="size-3.5 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <div class="grow">
                  <span class="text-toned text-sm">
                    {{ t(`app.home.soft-skills.${item}`) }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        <!-- End responsive list -->
        </div>
      </div>
      <div class="grid grid-cols-12">
        <HomeSkills
          :items="items"
          :languages="languages"
          :frameworks="frameworks"
          :databases="databases"
          :tools="tools"
        />
      </div>
    </motion.section>
  </div>
</template>

<style scoped></style>
