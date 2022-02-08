<template>
  <div class="login_panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon>
              <user-filled />
            </el-icon>
            账号登录
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon>
              <iphone />
            </el-icon>
          </span>
          手机登录
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
    UserFilled,
    Iphone
  },
  setup() {
    // 属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    // 方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        console.log(accountRef.value)
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phoneRef调用loginAction')
      }
    }

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang='less'>
.login_panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
/deep/ --el-link-default-active-color {
  border-bottom: none;
}
</style>