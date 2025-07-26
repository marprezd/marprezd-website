<script setup lang="ts">
import type { Stats } from '~/types/github'

const { t } = useI18n()
// Provide a default or fetched value for stats
const stats = ref<Stats | null>(null)
</script>

<template>
  <div class="py-20 lg:py-30">
    <div class="space-y-10 grid grid-flow-row auto-rows-max mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div class="w-full text-center">
        <h2 class="font-bold text-3xl lg:text-4xl text-center">
          {{ t('app.home.metrics.title') }}
        </h2>
        <p class="text-muted text-sm text-center">
          {{ t('app.home.metrics.description') }}
        </p>
        <div>
          <span class="inline-block bg-accented rounded-full w-40 h-1" />
          <span class="inline-block bg-accented ml-1 rounded-full w-3 h-1" />
          <span class="inline-block bg-accented ml-1 rounded-full size-1" />
        </div>
      </div>
      <div class="w-full">
        <div class="gap-4 grid grid-cols-12">
          <div class="col-span-full">
            <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
              <ClientOnly>
                <ChartsLanguages />
              </ClientOnly>
              <ClientOnly>
                <ChartsBestDay />
              </ClientOnly>
            </div>
          </div>
          <div class="col-span-full">
            <ClientOnly>
              <ChartsBestDaysAverage />
            </ClientOnly>
          </div>
          <div class="col-span-full">
            <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
              <ClientOnly>
                <ChartsGithubContributionDays />
              </ClientOnly>
              <ClientOnly>
                <ChartsCategories />
              </ClientOnly>
            </div>
          </div>
          <div class="col-span-full">
            <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
              <ClientOnly>
                <ChartsCodeEditors />
              </ClientOnly>
              <ClientOnly>
                <ChartsGithubStats
                  :stats="stats"
                  :translate-stars="t('app.home.metrics.charts.githubStats.stars')"
                  :translate-commitments="t('app.home.metrics.charts.githubStats.commitments')"
                  :translate-total-repos="t('app.home.metrics.charts.githubStats.total-repos')"
                  :translate-followers="t('app.home.metrics.charts.githubStats.total-followers')"
                  :translate-contributions="t('app.home.metrics.charts.githubStats.contributions')"
                  :translate-prs="t('app.home.metrics.charts.githubStats.prs')"
                  :translate-issues="t('app.home.metrics.charts.githubStats.issues')"
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
