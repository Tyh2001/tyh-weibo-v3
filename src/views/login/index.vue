<template>
  <div id="loginIndex">
    <div id="loginBox">
      <h1 class="title">用户登录</h1>

      <el-form
        ref="form"
        :model="loginForm"
        :rules="rulesLogin"
        class="demo-loginForm"
        @keyup.enter.native="onLogin(form)"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button
            :loading="loginDialog"
            type="success"
            @click="onLogin(form)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <p class="changeRegister">
        <router-link to="/user/register">立即注册</router-link>
      </p>

      <el-button plain class="goHomeBtn" @click="$router.push('/')">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import loginModular from './src/login'
export default {
  name: 'login',
  setup () {
    const state = reactive({
      loginDialog: ref(false), // 按钮加载状态
      // 数据
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证
      rulesLogin: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, message: '长度至少6个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度至少8个字符', trigger: 'blur' }
        ]
      }
    })

    // 点击登录按钮
    const form = ref(null)
    const { onLogin } = loginModular(state)

    return {
      ...toRefs(state),
      form, // dom 节点
      onLogin // 点击登录按钮
    }
  }
}
</script>

<style lang="less" scoped>
#loginIndex {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("./images/login.jpg") no-repeat center;
  background-size: cover;
  #loginBox {
    background: #fff;
    width: 520px;
    height: 400px;
    padding: 30px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    box-shadow: 0 12px 20px 0px rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    .el-button {
      width: 100%;
    }
    .title {
      font-weight: 500;
      color: #333333;
      margin-bottom: 20px;
    }
    .changeRegister {
      margin-top: 20px;
      text-align: center;
      a {
        text-decoration: none;
        color: #333;
      }
    }
    .goHomeBtn {
      margin-top: 45px;
    }
  }
}
</style>

