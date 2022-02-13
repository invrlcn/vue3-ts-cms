<template>
  <div class="page-content">
    <cn-table :listData="dataList" v-bind="contentTableConfig" @selectionChange="handleSelectChange">
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default">{{BtnTitle}}</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger' ">{{scope.row.enable ? '启用' : '禁用'}}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{$filters.formatTime(scope.row.createAt)}}</span>
      </template>
      <template #updateAt="scope">
        <span>{{$filters.formatTime(scope.row.createAt)}}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text">删除</el-button>
        </div>
      </template>
    </cn-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import CnTable from '@/base-ui/table'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    CnTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    // const userList = computed(() => store.state.system.userList)
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    let BtnTitle = ''
    switch (props.pageName) {
      case 'users':
        BtnTitle = '新增用户'
        break
      case 'role':
        BtnTitle = '新增角色'
        break
      default:
        break
    }

    return {
      // userList,
      dataList,
      BtnTitle
    }
  }
})
</script>

<style scoped lang='less'>
.page-content {
  padding: 20px;
  border-top: 20px solid #fff;
}
</style>