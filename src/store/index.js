import { createStore } from 'vuex'

export default createStore({
  state: {
    mum: 123
  },
  mutations: {
    // 保留用户登录信息
    changeUser (state, data) {
      setStorage('virgo_user', data)
      state.userInfo = data
    },
    // 退出账号
    outLogin (state, data) {
      // 删除本地存储
      removeStorage('virgo_user')
      state.userInfo = null
    }
  },
  actions: {},
  getters: {}
})