<script setup lang="ts">
import type { WakapiStats } from '~/types/wakapi'
import { TreemapChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { motion } from 'motion-v'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { motionItemTransition } from '~/utils/itemTransition'

// Register ECharts components
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  TreemapChart,
  CanvasRenderer,
  UniversalTransition,
])

const { t } = useI18n()
const colorMode = useColorMode()

// Chart container ref
const chartContainer = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const { data: wakapiStatsData, pending, error } = useFetch<WakapiStats>('/api/wakapi/stats/Last12Months')

const series = computed(() => {
  if (!wakapiStatsData.value || !Array.isArray(wakapiStatsData.value.data.categories))
    return []
  return wakapiStatsData.value.data.categories.map((item: { name: string, total_seconds: number }) => ({
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    value: item.total_seconds,
  }))
})

// Chart options
const chartOptions = computed(() => ({
  series: [
    {
      type: 'treemap',
      data: series.value,
    },
  ],
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const hours = Math.floor(params.value / 3600)
      const minutes = Math.floor((params.value - (hours * 3600)) / 60)
      return `${params.marker} ${params.name}: ${hours} ${t('app.home.metrics.charts.categories-tracking.hr')} ${minutes} ${t('app.home.metrics.charts.categories-tracking.min')}`
    },
  },
}))

// Initialize chart
function initChart() {
  if (!chartContainer.value)
    return

  chartInstance = echarts.init(chartContainer.value, colorMode.preference === 'dark' ? 'dark' : 'light')
  chartInstance.setOption(chartOptions.value)

  // Handle window resize
  window.addEventListener('resize', handleResize)
}

// Update chart when data or options change
function updateChart() {
  if (chartInstance) {
    chartInstance.setOption(chartOptions.value, true)
  }
}

// Handle window resize
function handleResize() {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// Create computed properties for reactive dependencies
const currentColorMode = computed(() => colorMode.preference)

// Watch for changes
watch([series, currentColorMode], () => {
  updateChart()
}, { deep: true })

watch(chartOptions, () => {
  if (chartInstance) {
    chartInstance.setOption(chartOptions.value, true)
  }
}, { deep: true })

onMounted(() => {
  if (import.meta.client && !pending.value && !error.value && series.value.length > 0) {
    nextTick(() => {
      initChart()
    })
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', handleResize)
})

// Watch for data loading completion
watch([pending, error, series], () => {
  if (import.meta.client && !pending.value && !error.value && series.value.length > 0) {
    nextTick(() => {
      if (!chartInstance) {
        initChart()
      }
      else {
        // Update existing chart with new data
        chartInstance.setOption(chartOptions.value, true)
      }
    })
  }
}, { immediate: true })
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
          {{ t('app.home.metrics.charts.categories-tracking.title') }}
        </h2>
        <p class="text-muted text-sm">
          {{ t('app.home.metrics.charts.categories-tracking.description') }}
        </p>
      </template>
      <div
        v-if="!pending && !error && series.length > 0"
        ref="chartContainer"
        class="w-full min-h-[320px]"
      />
      <div
        v-else-if="pending"
        class="mx-auto py-8 max-w-[22rem]"
      >
        <!-- skeleton loading UI -->
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
