<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick" />
    <page-content :contentTableConfig="contentTableConfig" pageName="users" ref="pageContentRef"
      @addClick="handleAddData" @editClick="handleEditData">
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger' ">
          {{scope.row.enable ? '启用' : '禁用'}}</el-button>
      </template>
    </page-content>
    <page-modal :modalConfig="modalConfigRef" ref="modalRef" pageName="users"
      :defaultInfo="defaultInfo" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'users',
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // pageModal相关的hook逻辑
    //处理密码的逻辑
    const addCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.filed === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
        console.log(passwordItem)
      }
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.filed === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
        console.log(passwordItem)
      }
    }

    //动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.filed === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.filed === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    // 调用hook获取公共变量和函数
    const [
      modalRef,
      defaultInfo,
      handleAddData,
      handleEditData,
      handleDeleteData
    ] = usePageModal(addCallback, editCallback)
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalRef,
      modalConfigRef,
      defaultInfo,
      handleAddData,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less">
</style>
