<script setup lang="ts">
import type { WakapiStats } from '~/types/wakapi'
import { PieChart } from 'echarts/charts'
import { LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { motion } from 'motion-v'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

// Register ECharts components
echarts.use([PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const { t } = useI18n()
const colorMode = useColorMode()

// Chart container ref
const chartContainer = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const borderColorStyle = computed(() => {
  return colorMode.preference === 'dark' ? 'rgb(51,51,51)' : 'rgb(253,253,253)'
})

const { data: wakapiStatsData, pending, error } = await useFetch<WakapiStats>('/api/wakapi/stats/Last12Months')

const pieColors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
]

const series = computed(() => {
  if (!wakapiStatsData.value || !wakapiStatsData.value.data || !Array.isArray(wakapiStatsData.value.data.editors))
    return []
  return wakapiStatsData.value.data.editors.map((item: { name: string, total_seconds: number }) => ({
    name: item.name,
    value: item.total_seconds,
  }))
})

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const hours = Math.floor(params.value / 3600)
      const minutes = Math.floor((params.value - (hours * 3600)) / 60)
      return `${params.marker} ${params.name}: ${hours} ${t('app.home.metrics.charts.programming-languages.hr')} ${minutes} ${t('app.home.metrics.charts.programming-languages.min')}`
    },
    position: 'bottom',
  },
  legend: {
    show: true,
    top: 'auto',
    left: 'center',
    textStyle: {
      color: '#777',
    },
  },
  series: [
    {
      type: 'pie',
      data: series.value,
      radius: ['40%', '70%'],
      itemStyle: {
        borderRadius: 7,
        borderColor: borderColorStyle.value,
        borderWidth: 2,
      },
      color: pieColors,
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: false,
        },
      },
      labelLine: {
        show: false,
      },
    },
  ],
}))

// Chart lifecycle management
function initChart() {
  if (chartContainer.value && !chartInstance) {
    chartInstance = echarts.init(chartContainer.value, colorMode.preference === 'dark' ? 'dark' : 'light')
    updateChart()

    // Handle window resize
    window.addEventListener('resize', handleResize)
  }
}

function updateChart() {
  if (chartInstance && !pending.value && !error.value && series.value.length > 0) {
    chartInstance.setOption(option.value, true)
  }
}

function handleResize() {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// Lifecycle hooks
onMounted(async () => {
  await nextTick()
  initChart()
})

onUnmounted(() => {
  if (chartInstance) {
    window.removeEventListener('resize', handleResize)
    chartInstance.dispose()
    chartInstance = null
  }
})

// Watchers for reactive updates
watch([() => series.value, () => colorMode.preference], async () => {
  if (chartInstance) {
    // Dispose and recreate chart when color mode changes
    chartInstance.dispose()
    chartInstance = null
    await nextTick()
    initChart()
  }
}, { deep: true })

watch(wakapiStatsData, () => {
  updateChart()
}, { deep: true })
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
          {{ t('app.home.metrics.charts.code-editors.title') }}
        </h2>
        <p class="text-muted text-sm">
          {{ t('app.home.metrics.charts.code-editors.description') }}
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
        <USkeleton class="w-full h-64" />
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
