<template>
  <div class="cn-table">
    <el-table :data="listData" border style="width: 100%">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>