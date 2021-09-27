import { createStore } from 'vuex'
import { setStorage, getStorage, removeStorage } from '../utils/localStorage'
const LOCAL_NAME = 'tyh_user_local'

export default createStore({
  state: {
    userInfo: getStorage(LOCAL_NAME) || null
  },
  mutations: {
    // 保留用户登录信息
    changeUser (state, data) {
      setStorage(LOCAL_NAME, data)
      state.userInfo = data
    },
    // 退出账号
    outLogin (state) {
      removeStorage(LOCAL_NAME)
      state.userInfo = null
    }
  }
})
