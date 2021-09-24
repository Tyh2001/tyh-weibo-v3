import { getUserInfo, changeUserInfo, changeUserPass } from '../../../api/user'
import { computed } from 'vue'
import url from '../../../utils/url'
import qs from 'qs'
import { Message, Msgbox } from 'element3'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

/**
 * 设置用户相关模块
 * @param { object } state 数据
 * 
 * 1. 获取用户资料
 * 2. 头像地址
 * 3. 修改用户资料
 * 4. 修改密码
 * 5. 退出登录
 * 
 * @returns Fn
 */
export default function (state) {
  const router = useRouter()
  const store = useStore()

  // 获取用户资料
  async function loadgetUserInfo () {
    const { data } = await getUserInfo(state.userInfo.id)
    state.userForm = data.data
  }

  // 头像地址
  const userPhotoAvatar = computed(() => {
    return `${url}/userPhoto/${state.userForm.avatar}`
  })

  // 修改用户资料
  async function SaveData () {
    state.changeUserInfoBtnLoading = true
    const { data } = await changeUserInfo(qs.stringify(state.userForm), state.userInfo.id)
    if (data.code !== 201) {
      Message.error({ message: data.msg, duration: 1300 })
      state.changeUserInfoBtnLoading = false
      return
    }
    Message({ message: data.msg, type: 'success', duration: 1300 })
    state.changeUserInfoBloon = false
    state.changeUserInfoBtnLoading = false
  }

  // 修改密码
  async function SaveDataNewPass () {
    state.changeUserPassBtnLoading = true
    const { data } = await changeUserPass(qs.stringify({
      oldPass: state.changePass.oldPass,
      newPass: state.changePass.newPass2
    }), state.userInfo.id)
    if (data.code !== 201) {
      Message.error({ message: data.msg, duration: 1300 })
      state.changeUserPassBtnLoading = false
      return
    }
    Message({ message: data.msg + '，请退出重新登录', type: 'success', duration: 1300 })
    state.changeUserPassBtnLoading = false
    proxy.$root.$router.push('/user/login')
    store.commit('outLogin')
  }

  // 退出登录
  function outLogin () {
    Msgbox.confirm('确定要退出账号吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      Message({ type: 'success', message: '已成功退出账号', duration: 1300 })
      store.commit('outLogin')
      router.push('/')
    }).catch(() => { })
  }

  return {
    loadgetUserInfo,
    userPhotoAvatar,
    SaveData,
    SaveDataNewPass,
    outLogin
  }
}
