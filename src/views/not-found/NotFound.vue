<template>
  <div class="not-found">
    <h2 class="title">页面跑丢了~</h2>
    <div class="back">
      <router-link to="/main">
        <el-button>回首页</el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.not-found {
  margin: 300px auto;
  text-align: center;
  .back {
    margin-top: 20px;
  }
}
</style>