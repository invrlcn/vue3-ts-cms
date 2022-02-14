<template>
  <div class="page-search">
    <cn-form v-bind="searchFormConfig" v-model="formData">
      <template v-slot:header>
        <h2 class="header">高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">
            <el-icon>
              <refresh />
            </el-icon>
            重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon>
              <search />
            </el-icon>
            搜索
          </el-button>
        </div>
      </template>
    </cn-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CnForm from '@/base-ui/form'
import { Refresh, Search } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    CnForm,
    Refresh,
    Search
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的filed来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.filed] = ''
    }
    const formData = ref(formOriginData)
    // 2.优化二: 当用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    //3.优化三: 当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>