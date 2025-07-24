<script setup lang="ts">
import type { EChartsType } from 'echarts'
import { TreemapChart } from 'echarts/charts'
import { LegendComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { motion } from 'motion-v'

const props = defineProps<{
  translateStars: string
  translateCommitments: string
  translateTotalRepos: string
  translateFollowers: string
  translateContributions: string
  translatePrs: string
  translateIssues: string
}>()
const { t } = useI18n()
const colorMode = useColorMode()

const treemapColors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9900',
  '#FF6666',
]
// Register ECharts components
use([TreemapChart, TooltipComponent, LegendComponent, CanvasRenderer])

// Chart container ref and instance
const chartContainer = ref<HTMLDivElement>()
let chartInstance: EChartsType | null = null

const { data: githubStats, pending, error } = await useFetch('/api/github/stats')

const chartSeries = computed(() => {
  if (!githubStats.value)
    return []
  const stats = githubStats.value as Record<string, number>
  return [
    { name: props.translateStars, value: stats.stars },
    { name: props.translateCommitments, value: stats.totalCommits },
    { name: props.translateTotalRepos, value: stats.totalRepos },
    { name: props.translateFollowers, value: stats.followers },
    { name: props.translateContributions, value: stats.contributions },
    { name: props.translatePrs, value: stats.prs },
    { name: props.translateIssues, value: stats.issues },
  ].filter(item => typeof item.value === 'number' && !Number.isNaN(item.value))
})

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: (params: { marker: string, name: string, value: number, percent?: number }) => {
      const value = Number(params.value)
      const total = chartSeries.value.reduce((sum, item) => sum + (item.value || 0), 0)
      const percentage = total > 0 ? (value * 100 / total).toFixed(1) : 0
      return `${params.marker} ${params.name} <br><small>${t('app.global.total')} <b>${value}</b> - ${percentage}%</small>`
    },
  },
  series: [
    {
      type: 'treemap',
      data: chartSeries.value,
      levels: [
        {
          color: treemapColors,
        },
      ],
    },
  ],
}))

// Chart lifecycle management
async function initChart() {
  if (!chartContainer.value)
    return

  const { init } = await import('echarts')
  chartInstance = init(chartContainer.value, colorMode.preference === 'dark' ? 'dark' : 'light')
  updateChart()

  // Handle window resize
  window.addEventListener('resize', handleResize)
}

function updateChart() {
  if (!chartInstance || !option.value)
    return
  chartInstance.setOption(option.value, true)
}

function handleResize() {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// Watchers for reactive updates
watch(() => colorMode.preference, () => {
  if (chartInstance) {
    chartInstance.dispose()
    initChart()
  }
})

watch(() => option.value, () => {
  updateChart()
}, { deep: true })

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <motion.div
    class="w-full"
    :initial="motionItemTransition.initial"
    :while-in-view="motionItemTransition.whileInView"
    :viewport="motionItemTransition.viewport"
    :transition="motionItemTransition.transition"
  >
    <UCard>
      <template #header>
        <h2 class="font-bold text-lg">
          {{ t('app.home.metrics.charts.githubStats.title') }}
        </h2>
        <p class="text-muted text-sm">
          {{ t('app.home.metrics.charts.githubStats.description') }}
        </p>
      </template>
      <div
        v-if="!pending && !error && chartSeries.length > 0"
        ref="chartContainer"
        class="w-full min-h-[320px]"
      />
      <div
        v-else-if="pending"
        class="mx-auto py-8 max-w-[22rem]"
      >
        <div class="gap-1 grid grid-rows-3 grid-flow-col py-4 w-full">
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
        v-else-if="error"
        class="flex justify-center items-center py-6 text-error text-xs"
      >
        {{ t("app.home.metrics.charts.error") }}
      </div>
    </UCard>
  </motion.div>
</template>

<style scoped></style>
