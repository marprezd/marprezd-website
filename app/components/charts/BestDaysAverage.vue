<script setup lang="ts">
import type { WakapiStats, WakapiSummaries } from '~/types/wakapi'
import { motion } from 'motion-v'

const { t } = useI18n()

const { data: year, pending: pendingYear, error: errorYear } = await useFetch<WakapiStats>('/api/wakapi/stats/Last12Months', {
  cache: 'no-cache',
})
const { data: dailyAvg, pending: pendingDailyAvg, error: errorDailyAvg } = await useFetch<WakapiStats>('/api/wakapi/stats/Last12Months', {
  cache: 'no-cache',
})
const { data: yesterday, pending: pendingYesterday, error: errorYesterday } = await useFetch<WakapiSummaries>('/api/wakapi/summaries/yesterday', {
  cache: 'no-cache',
})
const { data: today, pending: pendingToday, error: errorToday } = await useFetch<WakapiSummaries>('/api/wakapi/summaries/today', {
  cache: 'no-cache',
})

const cumulativeTotal = ref(year.value?.data.total_seconds)
const hours = ref(Math.floor(cumulativeTotal.value! / 3600))
const minutes = ref(Math.floor((cumulativeTotal.value! - (hours.value * 3600)) / 60))

const dailyAverage = ref(dailyAvg.value?.data.daily_average)
const dailyAverageRounded = ref(Math.round(dailyAverage.value!))
const dailyHours = ref(Math.floor(dailyAverageRounded.value / 3600))
const dailyMinutes = ref(Math.floor((dailyAverage.value! - (dailyHours.value * 3600)) / 60))

const totalSecondsYesterday = ref(yesterday.value?.daily_average.seconds)
const totalSecondsToday = ref(today.value?.daily_average.seconds)
const totalMins = ref(Math.floor((totalSecondsToday.value! - totalSecondsYesterday.value!) / 60))
const percentageDifference = ref(100 * Math.abs((totalSecondsToday.value! - totalSecondsYesterday.value!) / ((totalSecondsToday.value! + totalSecondsYesterday.value!) / 2)))
</script>

<template>
  <div class="gap-4 grid grid-cols-12">
    <motion.div
      :initial="motionItemTransition.initial"
      :while-in-view="motionItemTransition.whileInView"
      :viewport="motionItemTransition.viewport"
      :transition="motionItemTransition.transition"
      class="col-span-full md:col-span-4"
    >
      <UCard>
        <div v-if="!pendingYear && !errorYear">
          <div class="flex items-center gap-x-2">
            <p class="text-toned text-xs uppercase tracking-wide">
              {{ t('app.home.metrics.charts.best-days-avgs.cumulative-total.title') }}
            </p>
            <UPopover arrow>
              <UIcon
                name="i-tabler-info-square-rounded"
                class="size-4.5 text-toned"
              />
              <template #content>
                <div class="px-2.5 py-2.5 w-[13rem] md:w-2xs">
                  <div class="font-semibold text-sm">
                    {{ t("app.home.metrics.charts.best-days-avgs.cumulative-total.title") }}
                  </div>
                  <div class="text-xs">
                    {{ t("app.home.metrics.charts.best-days-avgs.cumulative-total.description") }}
                  </div>
                </div>
              </template>
            </UPopover>
          </div>
          <div class="flex items-center gap-x-2 mt-1">
            <h3 class="font-medium text-lg">
              {{ `${hours} ${t("app.home.metrics.charts.global-code-average.hr")} ${minutes} ${t("app.home.metrics.charts.global-code-average.min")}` }}
            </h3>
          </div>
        </div>
        <div v-else-if="pendingYear">
          <div class="items-center gap-1 grid grid-rows-3 grid-flow-col mx-auto py-4 max-w-md">
            <div class="row-span-3">
              <USkeleton class="rounded-md h-40" />
            </div>
            <div class="col-span-2">
              <div class="gap-1 grid grid-cols-3">
                <USkeleton class="rounded-md h-12" />
                <USkeleton class="rounded-md h-12" />
                <USkeleton class="rounded-md h-12" />
              </div>
            </div>
            <div class="col-span-2 row-span-2">
              <div class="gap-1 grid grid-cols-3">
                <div class="col-span-2">
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
                <div>
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
                <div>
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
                <div class="col-span-2">
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="errorYear">
          <div class="flex justify-center items-center py-6 text-error text-xs">
            {{ t("app.home.metrics.charts.error") }}
          </div>
        </div>
      </UCard>
    </motion.div>
    <motion.div
      :initial="motionItemTransition.initial"
      :while-in-view="motionItemTransition.whileInView"
      :viewport="motionItemTransition.viewport"
      :transition="motionItemTransition.transition"
      class="col-span-full md:col-span-4"
    >
      <UCard>
        <div v-if="!pendingToday && !errorToday && !pendingYesterday && !errorYesterday">
          <div class="flex items-center gap-x-2">
            <p class="text-toned text-xs uppercase tracking-wide">
              {{ t("app.home.metrics.charts.best-days-avgs.difference-48hrs.title") }}
            </p>
            <UPopover arrow>
              <UIcon
                name="i-tabler-info-square-rounded"
                class="size-4.5 text-toned"
              />
              <template #content>
                <div class="px-2.5 py-2.5 w-[13rem] md:w-2xs">
                  <div class="font-semibold text-sm">
                    {{ t("app.home.metrics.charts.best-days-avgs.difference-48hrs.title") }}
                  </div>
                  <div class="text-xs">
                    {{ t("app.home.metrics.charts.best-days-avgs.difference-48hrs.description") }}
                  </div>
                </div>
              </template>
            </UPopover>
          </div>
          <div class="flex items-center gap-x-2 mt-1">
            <h3 class="font-medium text-lg">
              {{ totalMins.toFixed(0) }}
              {{ " " }}
              {{ t("app.home.metrics.charts.best-days-avgs.difference-48hrs.min") }}
            </h3>
            <span
              v-if="totalSecondsToday! < totalSecondsYesterday!"
              class="flex items-center gap-x-1 text-red-600 dark:text-red-400"
            >
              <svg
                class="inline-block self-center size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="{1.5}"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span class="inline-block text-sm">
                {{ percentageDifference.toFixed(2) }} %
              </span>
            </span>
            <span
              v-else
              class="flex items-center gap-x-1 text-green-600 dark:text-green-400"
            >
              <svg
                class="inline-block self-center size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="{1.5}"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span class="inline-block text-sm">
                {{ percentageDifference.toFixed(2) }} %
              </span>
            </span>
          </div>
        </div>
        <div v-else-if="pendingToday && pendingYesterday">
          <div class="items-center gap-1 grid grid-rows-3 grid-flow-col mx-auto py-4 max-w-md">
            <div class="row-span-3">
              <USkeleton class="rounded-md h-40" />
            </div>
            <div class="col-span-2">
              <div class="gap-1 grid grid-cols-3">
                <USkeleton class="rounded-md h-12" />
                <USkeleton class="rounded-md h-12" />
                <USkeleton class="rounded-md h-12" />
              </div>
            </div>
            <div class="col-span-2 row-span-2">
              <div class="gap-1 grid grid-cols-3">
                <div class="col-span-2">
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
                <div>
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
                <div>
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
                <div class="col-span-2">
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="errorToday"
          class="flex justify-center items-center py-6 text-error text-xs"
        >
          {{ t("app.home.metrics.charts.error") }}
        </div>
      </UCard>
    </motion.div>
    <motion.div
      :initial="motionItemTransition.initial"
      :while-in-view="motionItemTransition.whileInView"
      :viewport="motionItemTransition.viewport"
      :transition="motionItemTransition.transition"
      class="col-span-full md:col-span-4"
    >
      <UCard>
        <div v-if="!pendingDailyAvg && !errorDailyAvg">
          <div class="flex items-center gap-x-2">
            <p class="text-toned text-xs uppercase tracking-wide">
              {{ t("app.home.metrics.charts.best-days-avgs.daily-average.title") }}
            </p>
            <UPopover arrow>
              <UIcon
                name="i-tabler-info-square-rounded"
                class="size-4.5 text-toned"
              />
              <template #content>
                <div class="px-2.5 py-2.5 w-[13rem] md:w-2xs">
                  <div class="font-semibold text-sm">
                    {{ t("app.home.metrics.charts.best-days-avgs.daily-average.title") }}
                  </div>
                  <div class="text-xs">
                    {{ t("app.home.metrics.charts.best-days-avgs.daily-average.description") }}
                  </div>
                </div>
              </template>
            </UPopover>
          </div>
          <div class="flex items-center gap-x-2 mt-1">
            <h3 class="font-medium text-lg">
              {{ `${dailyHours} ${t("app.home.metrics.charts.global-code-average.hr")} ${dailyMinutes} ${t("app.home.metrics.charts.global-code-average.min")}` }}
            </h3>
          </div>
        </div>
        <div v-else-if="pendingDailyAvg">
          <div class="items-center gap-1 grid grid-rows-3 grid-flow-col mx-auto py-4 max-w-md">
            <div class="row-span-3">
              <USkeleton class="rounded-md h-40" />
            </div>
            <div class="col-span-2">
              <div class="gap-1 grid grid-cols-3">
                <USkeleton class="rounded-md h-12" />
                <USkeleton class="rounded-md h-12" />
                <USkeleton class="rounded-md h-12" />
              </div>
            </div>
            <div class="col-span-2 row-span-2">
              <div class="gap-1 grid grid-cols-3">
                <div class="col-span-2">
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
                <div>
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
                <div>
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
                <div class="col-span-2">
                  <USkeleton class="rounded-md w-full h-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="errorDailyAvg"
          class="flex justify-center items-center py-6 text-error text-xs"
        >
          {{ t("app.home.metrics.charts.error") }}
        </div>
      </UCard>
    </motion.div>
  </div>
</template>

<style scoped></style>
