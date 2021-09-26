import { Message } from 'element3'
import qs from 'qs'
import { onUserLogin } from '../../../api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

/**
 * 登录页面点击登录按钮登录模块
 * @param { dom } form dom 节点
 * @param { object } state 数据
 * 
 * 1. 点击登录按钮
 * 
 * @returns Fn
 */
export default function (state, form) {
  const store = useStore()
  const router = useRouter()

  // 点击登录按钮
  function onLogin () {
    console.log(form)
    form.value.validate(async (valid) => {
      if (!valid) {
        Message.error({ message: '请输入正确账号和密码', duration: 1300 })
        return
      }
      state.loginDialog = true
      const { data } = await onUserLogin(qs.stringify({
        username: state.loginForm.username,
        password: state.loginForm.password
      }))

      if (data.code !== 201) {
        Message.error({ message: data.msg, duration: 1300 })
        state.loginDialog = false
        return
      }
      Message({ message: data.msg, type: 'success', duration: 1300 })
      state.loginDialog = false
      store.commit('changeUser', data.data)
      router.push('/')
    })
  }

  return onLogin
}
