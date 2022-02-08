<template>
  <div class="nav-header">
    <div class="nav-icon">
      <el-icon size="28px" @click="handleFoldClick">
        <fold v-if="!isFold" />
        <expand v-if="isFold" />
      </el-icon>
    </div>
    <div class="content">
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import userInfo from './cnps/UserInfo.vue'

export default defineComponent({
  emits: ['FoldChange'],
  components: {
    userInfo,
    Fold,
    Expand
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('FoldChange', isFold.value)
    }

    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
.nav-icon {
  cursor: pointer;
}
</style>