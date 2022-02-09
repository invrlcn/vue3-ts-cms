<template>
  <div class="nav-header">
    <div class="nav-icon">
      <el-icon size="28px" @click="handleFoldClick">
        <fold v-if="!isFold" />
        <expand v-if="isFold" />
      </el-icon>
    </div>
    <div class="content">
      <div>
        <cn-bread-crumb :breadcrumbs="breadcrumbs" />
      </div>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import userInfo from './cnps/UserInfo.vue'
import CnBreadCrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  emits: ['FoldChange'],
  components: {
    CnBreadCrumb,
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

    // 面包屑的数据: [{name: , path: }]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      breadcrumbs,
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