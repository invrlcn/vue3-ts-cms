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
    <el-table :data="listData" border style="width: 100%" @selection-change="handleChangeSelect">
      <el-table-column v-if="showSelectColumn" type="selection" width="50" />
      <el-table-column v-if="showIndexColumn" type="index" width="80" label="序号" align="center"></el-table-column>
      <template v-for="list in propList" :key="list.prop">
        <el-table-column align="center" v-bind="list">
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
        <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
    }
  },
  emits: ['selectionChange'],
  setup(props, { emit }) {
    const handleChangeSelect = (value: any) => {
      emit('selectionChange', value)
    }

    return {
      handleChangeSelect
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
  padding-left: 935px;
}
</style>