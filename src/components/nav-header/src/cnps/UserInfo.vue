<template>
  <div class="user-info">
    <el-dropdown @command="goLogin">
      <span class="el-dropdown-link">
        <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        <span class="user-name">{{ userInfo }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon>
              <circle-close />
            </el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { CircleClose } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    CircleClose
  },
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.login.userInfo.name)
    const router = useRouter()
    const goLogin = () => {
      router.push('/login')
    }

    return {
      userInfo,
      goLogin
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .user-name {
    margin-left: 5px;
  }
}
</style>