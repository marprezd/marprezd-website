<script setup lang="ts">
import { LineChart } from 'echarts/charts'
import {
  BrushComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { motion } from 'motion-v'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { motionItemTransition } from '~/utils/itemTransition'

// Import locale files
import LangEN from '../../../i18n/echarts/en'
import LangES from '../../../i18n/echarts/es'
import LangTR from '../../../i18n/echarts/tr'

// Register ECharts components
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BrushComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
])

// Register locales
echarts.registerLocale('en', LangEN)
echarts.registerLocale('es', LangES)
echarts.registerLocale('tr', LangTR)

const { locale, t } = useI18n()
const colorMode = useColorMode()

// Chart container ref
const chartContainer = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const { data: contributions, pending, error } = await useFetch('/api/github/contributions')

// Prepare series data for the last 30 days in [timestamp, count] format
const dseries = computed(() => {
  if (!import.meta.client || !contributions.value)
    return []
  const now = Date.now()
  return contributions.value
    .filter((d: { date: string, count: number }) => {
      const ts = new Date(d.date).getTime()
      return ts <= now
    })
    .map((d: { date: string, count: number }) => [
      new Date(d.date).getTime(),
      d.count,
    ])
})

// Chart color palette
const primaryColor = computed(() => colorMode.preference === 'light' ? '#06b6d4' : '#67e8f9')
const areaColor = computed(() => colorMode.preference === 'light' ? '#a5f3fc' : '#0891b2')

// Chart options
const chartOptions = computed(() => ({
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: dseries.value,
      lineStyle: {
        color: primaryColor.value,
      },
      showSymbol: false,
      areaStyle: {
        color: areaColor.value,
        opacity: 0.2,
      },
    },
  ],
  toolbox: {
    right: 10,
    feature: {
      dataZoom: {
        yAxisIndex: false,
      },
      restore: {},
      brush: {
        type: ['lineX', 'clear'],
      },
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      label: {
        show: false,
      },
    },
    formatter: (params: any) => {
      const ts = Array.isArray(params[0].value) ? params[0].value[0] : params[0].value
      return `${dateFormatter(ts)}<br>${params[0].marker} ${t('app.home.metrics.charts.githubContributions.contributions', { count: params[0].value[1] })}`
    },
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 90,
      end: 100,
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 90,
      end: 100,
    },
  ],
}))

// Localized date formatter for tooltips
function dateFormatter(timestamp: number) {
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' }).format(new Date(timestamp))
}

// Initialize chart
function initChart() {
  if (!chartContainer.value)
    return

  // Dispose existing chart if any
  if (chartInstance) {
    chartInstance.dispose()
  }

  // Create new chart instance with locale
  chartInstance = echarts.init(chartContainer.value, colorMode.preference === 'dark' ? 'dark' : 'light', {
    locale: locale.value,
  })

  // Set chart options
  chartInstance.setOption(chartOptions.value)

  // Handle resize
  const resizeObserver = new ResizeObserver(() => {
    chartInstance?.resize()
  })
  resizeObserver.observe(chartContainer.value)
}

// Update chart when data or options change
function updateChart() {
  if (!chartInstance)
    return

  // Just update the chart options instead of disposing
  chartInstance.setOption(chartOptions.value, true)
}

// Create a computed property for locale to make it watchable
const currentLocale = computed(() => locale.value)
const currentColorMode = computed(() => colorMode.preference)

// Watch for changes
watch([dseries, currentLocale, currentColorMode], () => {
  updateChart()
}, { deep: true })

watch(chartOptions, () => {
  if (chartInstance) {
    chartInstance.setOption(chartOptions.value, true)
  }
}, { deep: true })

onMounted(() => {
  if (import.meta.client && !pending.value && !error.value && dseries.value.length > 0) {
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
})

// Watch for data loading completion
watch([pending, error, dseries], () => {
  if (import.meta.client && !pending.value && !error.value && dseries.value.length > 0) {
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
        <h3 class="font-semibold text-lg">
          {{ $t("app.home.metrics.charts.githubContributions.title") }}
        </h3>
        <p class="text-muted text-sm">
          {{ $t("app.home.metrics.charts.githubContributions.description") }}
        </p>
      </template>
      <div
        v-if="!pending && !error && dseries.length > 0"
        ref="chartContainer"
        class="w-full min-h-[320px]"
      />
      <div v-else-if="pending">
        <USkeleton class="w-full h-64" />
      </div>
      <div
        v-else-if="error"
        class="flex justify-center items-center py-6 text-error text-xs"
      >
        {{ $t("app.home.metrics.charts.error") }}
      </div>
    </UCard>
  </motion.div>
</template>

<style scoped></style>
