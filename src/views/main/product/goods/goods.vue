<template>
  <div class="goods">
    <page-search :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="goods" ref="pageContentRef">
      <!-- 插槽 -->
      <template #imgUrl="scope">
        <el-image style="width: 80px; height: 80px" :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]" :initial-index="4" fit="cover">
        </el-image>
      </template>
      <template #oldPrice="scope">
        <span>{{'￥' + scope.row.oldPrice}}</span>
      </template>
      <template #newPrice="scope">
        <span>{{'￥' + scope.row.newPrice}}</span>
      </template>
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.status ? 'success' : 'danger' ">
          {{scope.row.status ? '上架' : '下架'}}</el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'goods',
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped></style>
