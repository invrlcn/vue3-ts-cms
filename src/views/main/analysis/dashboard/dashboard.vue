<template>
  <div class="dashboard">
    <el-row :gutter='10'>
      <el-col :span="7">
        <cn-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount" />
        </cn-card>
      </el-col>
      <el-col :span="10">
        <cn-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale" />
        </cn-card>
      </el-col>
      <el-col :span="7">
        <cn-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount" />
        </cn-card>
      </el-col>
    </el-row>
    <el-row :gutter='10' class="content-row">
      <el-col :span="12">
        <cn-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale" />
        </cn-card>
      </el-col>
      <el-col :span="12">
        <cn-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor" />
        </cn-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import CnCard from '@/base-ui/card/index'
import {
  PieEchart,
  RoseEchart,
  BarEchart,
  LineEchart,
  MapEchart
} from '@/components/page-echarts/index'

export default defineComponent({
  name: 'dashboard',
  components: {
    CnCard,
    PieEchart,
    RoseEchart,
    BarEchart,
    LineEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')
    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { value: item.goodsCount, name: item.name }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
