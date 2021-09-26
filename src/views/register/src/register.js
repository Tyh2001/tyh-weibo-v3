import { Message } from 'element3'
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
    // registerFormDOM.validate(async (valid) => {
    //   if (valid === false) {
    //     Message.error({ message: '注册格式不正确', duration: 1300 })
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
    router.push('/user/login')
    // })
  }

  return {
    onSubmitRegister
  }
}