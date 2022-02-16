<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="role" ref="pageContentRef"
      @addClick="handleAddData" @editClick="handleEditData">
    </page-content>
    <page-modal ref="modalRef" pageName="role" :modalConfig="modalConfig" :defaultInfo="defaultInfo"
      :otherInfo="otherInfo">
      <template #default>
        <div class="menu-tree">
          <el-tree ref="treeRef" :data="menus" show-checkbox node-key="id"
            :props="{children: 'children', label: 'name'}" @check="handleCheckChange" />
        </div>
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'

import type { ElTree } from 'element-plus/lib/components'
import { menuMapLeafKeys } from '@/utils/map-menus'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
  name: 'role',
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    //处理pageModal的hook
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      console.log(item)
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(leafKeys)
        treeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const otherInfo = ref({})
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const handleCheckChange = (d1: any, d2: any) => {
      const checkedKeys = d2.checkedKeys
      const halfCheckedKeys = d2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    const [modalRef, defaultInfo, handleAddData, handleEditData] = usePageModal(
      undefined,
      editCallback
    )

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      modalConfig,
      modalRef,
      defaultInfo,
      otherInfo,
      treeRef,
      menus,
      handleAddData,
      handleEditData,
      handleResetClick,
      handleQueryClick,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
