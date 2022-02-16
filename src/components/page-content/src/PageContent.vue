<template>
  <div class="page-content">
    <cn-table :listData="dataList" v-bind="contentTableConfig" :countData="dataCount"
      v-model:page="pageInfo">
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default" v-if="isCreate"
          @click="handleAddClick(title='新增用户')">
          {{BtnTitle}}</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #createAt="scope">
        <span>{{$filters.formatTime(scope.row.createAt)}}</span>
      </template>
      <template #updateAt="scope">
        <span>{{$filters.formatTime(scope.row.updateAt)}}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button size="small" type="text" v-if="isUpdate"
            @click="handleEditClick(scope.row, title='编辑用户')">编辑
          </el-button>
          <el-button size="small" type="text" v-if="isDelete" @click="handleDeleteClick(scope.row)">
            删除
          </el-button>
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template v-for="key in otherPropSlots" :key="key.prop" #[key.slotName]="scope">
        <template v-if="key.slotName">
          <slot :name="key.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </cn-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import CnTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'
import { ElMessageBox } from 'element-plus/lib/components'

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
  emits: ['addClick', 'editClick', 'deleteClick'],
  setup(props, { emit }) {
    const store = useStore()
    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    // 发送请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageCountData`](props.pageName)
    )
    // 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (i: any) => {
        if (i.slotName === 'createAt') return false
        if (i.slotName === 'updateAt') return false
        if (i.slotName === 'handler') return false
        return true
      }
    )
    // 新增、编辑、删除
    const handleAddClick = (title: string) => {
      emit('addClick', title)
    }
    const handleEditClick = (item: any, title: string) => {
      emit('editClick', item, title)
    }
    const handleDeleteClick = (item: any) => {
      ElMessageBox.confirm('确认删除该条数据？', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      }).then(() => {
        store.dispatch('system/deletePageDataAction', {
          pageName: props.pageName,
          id: item.id
        })
      })
    }
    // 新增按钮
    let BtnTitle = ''
    switch (props.pageName) {
      case 'users':
        BtnTitle = '新增用户'
        break
      case 'role':
        BtnTitle = '新增角色'
        break
      case 'goods':
        BtnTitle = '新增商品'
        break
      case 'menu':
        BtnTitle = '新增菜单'
        break
      default:
        break
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      BtnTitle,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      getPageData,
      handleAddClick,
      handleEditClick,
      handleDeleteClick
    }
  }
})
</script>

<style scoped lang='less'>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>