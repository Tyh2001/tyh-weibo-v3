<template>
  <div id="registerIndex">
    <div id="registerBox">
      <h1 class="title">注册账号</h1>

      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerFormDOM"
        label-width="auto"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            clearable
            placeholder="请输入账号"
          />
        </el-form-item>

        <!-- 第一遍密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <!-- 第二遍密码 -->
        <el-form-item prop="password2">
          <el-input
            v-model="registerForm.password2"
            placeholder="请输入再次密码"
            show-password
          />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item prop="mail">
          <el-input
            v-model="registerForm.mail"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="captcha">
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
import { reactive, toRefs, computed, ref, getCurrentInstance } from 'vue'
import { Message } from 'element3'
import { onRegister } from '../../api/user'
import { randomNum } from '../../utils/randomNum'
import qs from 'qs'
export default {
  name: 'register',
  setup () {
    const { proxy } = getCurrentInstance()
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
      },
      // 注册表单验证
      registerRules: {
        // 用户名
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 12, message: '账号长度需在 6 到 12 个字符', trigger: 'blur' }
        ],
        // 第一遍密码
        password: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'))
              } else {
                if (this.registerForm.password !== '') {
                  this.$refs.registerForm.validateField('password2')
                }
                callback()
              }
            },
            trigger: 'blur'
          },
          { min: 8, max: 20, message: '密码长度需在 8 到 20 个字符', trigger: 'blur' }
        ],
        // 第二遍密码
        password2: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 邮箱
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        // 验证码
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 2, max: 2, message: '请输入正确验证码', trigger: 'blur' }
        ]
      }
    })

    // 验证码图片地址
    function captchaImgURLFn () {
      state.captchaCode = randomNum(15, 1)
      const path = `./images/captcha_${state.captchaCode}.png`
      const modules = import.meta.globEager('./images/*')
      return modules[path].default
    }

    // 生成图片的地址
    const captchaImgURL = computed(() => {
      return captchaImgURLFn()
    })

    // 点击切换新的验证码
    function changeCaptchaImg () {
      captchaImgURLFn()
    }

    // 注册
    const registerFormDOM = ref(null)
    async function onSubmitRegister () {
      // registerFormDOM.value.validate(async (valid) => {
      //   if (!valid) {
      //     return
      //   }
      state.registerBtnLoading = true
      const { data } = await onRegister(qs.stringify({
        username: state.registerForm.username,
        password: state.registerForm.password,
        mail: state.registerForm.mail,
        captcha: state.registerForm.captcha,
        captchaCode: state.captchaCode
      }))
      if (data.code !== 201) {
        Message.error({ message: data.msg, duration: 1300 })
        if (data.msg === '验证码错误') {
          state.captchaCode = randomNum(15, 1)
        }
        state.registerBtnLoading = false
        return
      }
      state.registerBtnLoading = false
      Message({ message: data.msg, type: 'success', duration: 1300 })
      proxy.$root.$router.push('/user/login')
      // })
    }

    return {
      ...toRefs(state),
      captchaImgURL, // 验证码随机地址
      changeCaptchaImg, // 点击切换新的验证码
      onSubmitRegister, // 注册
      registerFormDOM // 表单 dom 节点
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
