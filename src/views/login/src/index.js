import { Message } from 'element3'
import qs from 'qs'
import { onUserLogin } from '../../../api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default function (form, state) {
  const store = useStore()
  const router = useRouter()

  function onLogin () {
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