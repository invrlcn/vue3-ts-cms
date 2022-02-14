<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick" />
    <page-content :contentTableConfig="contentTableConfig" pageName="users" ref="pageContentRef">
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger' ">
          {{scope.row.enable ? '启用' : '禁用'}}</el-button>
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
  name: 'users',
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

<style scoped lang="less">
</style>
