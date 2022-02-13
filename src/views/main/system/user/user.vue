<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content :contentTableConfig="contentTableConfig" pageName="users"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    // 选中框监听
    const handleSelectChange = (value: any) => {
      console.log(value)
    }

    return {
      searchFormConfig,
      contentTableConfig,
      handleSelectChange
    }
  }
})
</script>

<style scoped lang="less">
</style>
