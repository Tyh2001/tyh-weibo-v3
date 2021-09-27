<template>
  <div id="registerIndex">
    <div id="registerBox">
      <h1 class="title">注册账号</h1>

      <el-form :model="registerForm" ref="registerFormDOM" label-width="auto">
        <!-- 用户名 -->
        <el-form-item>
          <el-input
            v-model="registerForm.username"
            clearable
            placeholder="请输入账号"
          />
        </el-form-item>

        <!-- 第一遍密码 -->
        <el-form-item>
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <!-- 第二遍密码 -->
        <el-form-item>
          <el-input
            v-model="registerForm.password2"
            placeholder="请输入再次密码"
            show-password
          />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item>
          <el-input
            v-model="registerForm.mail"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item>
          <div id="captcha_form_item">
            <el-input
              class="captcha_input"
              v-model="registerForm.captcha"
              clearable
              placeholder="请输入验证码"
            />
            <img
              class="captcha_img"
              :src="captchaImgURL"
              @click="changeCaptchaImg"
            />
          </div>
        </el-form-item>
      </el-form>

      <el-button
        type="warning"
        :loading="registerBtnLoading"
        @click="onSubmitRegister"
      >
        立即注册
      </el-button>

      <p class="changeLogin">
        <router-link to="/user/login">
          返回登录
          <i class="el-icon-arrow-right" />
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import captchaModular from './src/captcha'
import registerModular from './src/register'
export default {
  name: 'register',
  setup () {
    const state = reactive({
      captchaCode: '', // 验证码随机数
      registerBtnLoading: false, // 注册按钮禁用状态
      // 注册表单
      registerForm: {
        username: '',
        password: '',
        password2: '',
        mail: '',
        captcha: ''
      }
    })

    // 生成图片的地址
    const { captchaImgURL } = captchaModular(state)

    // 点击切换新的验证码
    const { changeCaptchaImg } = captchaModular(state)

    // 注册
    const { onSubmitRegister } = registerModular(state)

    return {
      ...toRefs(state),
      captchaImgURL, // 验证码随机地址
      changeCaptchaImg, // 点击切换新的验证码
      onSubmitRegister // 注册
    }
  }
}
</script>

<style lang='less' scoped>
#registerIndex {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../login/images/login.jpg") no-repeat center;
  background-size: cover;
  #registerBox {
    background: #fff;
    width: 520px;
    height: 540px;
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
      margin-top: 10px;
    }
    .title {
      font-weight: 500;
      color: #333333;
      margin-bottom: 20px;
    }
    // 验证码文本框
    #captcha_form_item {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: space-between;
      .captcha_input {
        width: 240px;
      }
      .captcha_img {
        width: 200px;
        cursor: pointer;
      }
    }
    .changeLogin {
      margin-top: 20px;
      text-align: center;
      a {
        text-decoration: none;
        color: #333;
      }
    }
  }
}
</style>
