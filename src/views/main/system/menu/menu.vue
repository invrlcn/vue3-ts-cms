<template>
  <div class="menu">
    <page-search :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick" />
    <page-content :contentTableConfig="contentTableConfig" pageName="menu" ref="pageContentRef">
      <template #type="scope">
        <el-button plain size="small" type="success">
          {{scope.row.type === 1 ? '一级菜单' : scope.row.type === 2 ? '二级菜单': '三级菜单'}}</el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'menus',
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
