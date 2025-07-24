<script setup lang="ts">
import type { WakapiSummaries } from '~/types/wakapi'
import { BarChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { motion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

echarts.use([BarChart, TooltipComponent, GridComponent, TitleComponent, CanvasRenderer])

const { locale, t } = useI18n()
const colorMode = useColorMode()

const { data: wakapiSummariesData, pending, error } = await useFetch<WakapiSummaries>('/api/wakapi/summaries/last7Days', {
  cache: 'no-cache',
})

const dataPoints = computed(() => {
  if (!wakapiSummariesData.value)
    return []
  const summaries = Array.isArray(wakapiSummariesData.value)
    ? wakapiSummariesData.value
    : wakapiSummariesData.value?.data
  if (!Array.isArray(summaries))
    return []
  return summaries.slice(0, 7).map((summary: { grand_total: { hours: number }, range: { start: string } }) => ({
    x: new Intl.DateTimeFormat(locale.value, { weekday: 'short' }).format(new Date(summary.range.start)),
    y: summary.grand_total.hours,
  }))
})

const barColors = [
  '#dd6b66',
  '#759aa0',
  '#e69d87',
  '#8dc1a9',
  '#ea7e53',
  '#eedd78',
  '#73a373',
]

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

function getOption() {
  return {
    color: barColors,
    xAxis: {
      type: 'category',
      data: dataPoints.value.map(point => point.x),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: dataPoints.value.map((point, idx) => ({
          value: point.y,
          itemStyle: {
            color: barColors[idx % barColors.length],
            borderRadius: [5, 5, 0, 0],
          },
        })),
        type: 'bar',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        show: true,
        type: 'shadow',
      },
      formatter: (params: any) => {
        return `${params[0].marker} ${t('app.home.metrics.charts.best-days.label')}: ${t('app.home.metrics.charts.best-days.jobHours', { count: params[0].value })}`
      },
    },
    grid: {
      backgroundColor: colorMode.preference === 'dark' ? '#18181b' : '#fff',
      left: 24,
      right: 24,
      bottom: 24,
      top: 24,
    },
  }
}

function renderChart() {
  if (!chartRef.value)
    return
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value, colorMode.preference === 'dark' ? 'dark' : 'light')
  }
  chartInstance.setOption(getOption())

  // Handle resize
  const resizeObserver = new ResizeObserver(() => {
    chartInstance?.resize()
  })
  resizeObserver.observe(chartRef.value)
}

onMounted(() => {
  watch([dataPoints, () => colorMode.preference], () => {
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }
    if (dataPoints.value.length > 0 && !pending.value && !error.value) {
      renderChart()
    }
  }, { immediate: true })
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
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
          {{ t('app.home.metrics.charts.best-days.title') }}
        </h2>
        <p class="text-muted text-sm">
          {{ t('app.home.metrics.charts.best-days.description') }}
        </p>
      </template>
      <div
        v-if="!pending && !error && dataPoints.length > 0"
        ref="chartRef"
        class="w-full min-h-[320px]"
      />
      <div
        v-else-if="pending"
        class="mx-auto py-8 max-w-[22rem]"
      >
        <!-- skeleton loading UI -->
        <div class="relative px-4 h-52">
          <!-- vertical axis (Y) -->
          <div class="bottom-0 left-0 absolute bg-gray-400 w-px h-full" />
          <!-- horizontal axis (X) -->
          <div class="bottom-0 left-0 absolute bg-gray-400 w-full h-px" />
          <!-- bars -->
          <div class="flex justify-center items-end space-x-2 pr-2 pl-2 h-full">
            <USkeleton class="bg-gray-300 rounded w-8 h-24" />
            <USkeleton class="bg-gray-300 rounded w-8 h-32" />
            <USkeleton class="bg-gray-300 rounded w-8 h-20" />
            <USkeleton class="bg-gray-300 rounded w-8 h-36" />
            <USkeleton class="bg-gray-300 rounded w-8 h-28" />
            <USkeleton class="bg-gray-300 rounded w-8 h-40" />
            <USkeleton class="bg-gray-300 rounded w-8 h-30" />
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
