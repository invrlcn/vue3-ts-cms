<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{width: width, height: height}"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, onMounted, watchEffect } from 'vue'

import useEchart from '../hooks/useEchart'

import type { EChartsOption } from 'echarts'

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)
const echartRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(echartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped>
</style>