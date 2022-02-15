<template>
  <div class="cn-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{title}}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" border style="width: 100%" @selection-change="handleChangeSelect"
      v-bind="childrenProps">
      <el-table-column v-if="showSelectColumn" type="selection" width="50" />
      <el-table-column v-if="showIndexColumn" type="index" width="80" label="序号" align="center">
      </el-table-column>
      <template v-for="list in propList" :key="list.prop">
        <el-table-column align="center" v-bind="list" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="list.slotName" :row="scope.row">
              {{scope.row[list.prop]}}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination :currentPage="page.currentPage" :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]" layout="total, sizes, prev, pager, next, jumper"
          :total="countData" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          v-if="showFooter">
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    listData: {
      type: Array,
      required: true
    },
    countData: {
      type: Number,
      required: true
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleChangeSelect = (value: any) => {
      emit('selectionChange', value)
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleChangeSelect,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  padding-left: 950px;
}
</style>