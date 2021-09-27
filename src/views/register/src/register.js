import { onRegister } from '../../../api/user'
import qs from 'qs'
import { useRouter } from 'vue-router'

/**
 * 注册模块
 * @param { object } state 数据
 * 
 * 1. 注册
 * 
 * @returns Fn
 */
export default function (state) {
  const router = useRouter()

  // 注册
  async function onSubmitRegister (registerFormDOM) {
    state.registerBtnLoading = true
    const { data } = await onRegister(qs.stringify({
      username: state.registerForm.username,
      password: state.registerForm.password,
      mail: state.registerForm.mail,
      captcha: state.registerForm.captcha,
      captchaCode: state.captchaCode
    }))
    if (data.code !== 201) {
      if (data.msg === '验证码错误') {
        state.captchaCode = randomNum(15, 1)
      }
      state.registerBtnLoading = false
      return
    }
    state.registerBtnLoading = false
    router.push('/user/login')
  }

  return {
    onSubmitRegister
  }
}