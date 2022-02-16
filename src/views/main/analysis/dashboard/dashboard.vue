<template>
  <div class="dashboard">
    <div ref="divDom" :style="{width: '600px', height: '500px'}"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'dashboard',
  setup() {
    const divDom = ref<HTMLElement>()
    onMounted(() => {
      const echartsIntance = echarts.init(divDom.value!, 'dark', {
        renderer: 'svg'
      })
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      echartsIntance.setOption(option)
    })
    return {
      divDom
    }
  }
})
</script>

<style scoped></style>
