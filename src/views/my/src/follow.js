import { onFollowUser, getFollowUserList, deleteFollowUser } from '../../../api/follow'
import { useRoute, useRouter } from 'vue-router'
import qs from 'qs'
import { Message } from 'element3'
import userModular from './src/user'

/**
 * 我的页面关注模块
 * @param { object } state 数据
 * 
 * 1. 获取我的关注列表
 * 2. 关注
 * 3. 取消关注
 * 4. 去粉丝页面
 * 5. 去关注页面
 * 
 * @returns Fn
 */
export default function (state) {
  const route = useRoute()
  const router = useRouter()
  const { loadgetUserInfo } = userModular(state)

  // 获取我的关注列表
  async function loadgetFollowUserList () {
    const { data } = await getFollowUserList(qs.stringify({ user_id: state.userInfo.id }))
    data.data.forEach(item => {
      if (item.follower_id.toString() === route.params.id.toString()) {
        state.onFollowChange = true
      }
    })
  }

  // 关注
  async function changeFollowTa () {
    state.followBtnLoading = true
    const { data } = await onFollowUser(qs.stringify({
      user_id: state.userInfo.id,
      follower_id: route.params.id
    }))
    if (data.code !== 201) {
      Message.error({ message: data.msg, duration: 1300 })
      state.followBtnLoading = false
      return
    }
    Message({ message: data.msg, type: 'success', duration: 1300 })
    state.followBtnLoading = false
    state.onFollowChange = true
    loadgetUserInfo()
    loadgetFollowUserList()
  }

  // 取消关注
  async function deleteFollowTa () {
    state.followBtnLoading = true
    const { data } = await deleteFollowUser(qs.stringify({
      user_id: state.userInfo.id,
      follower_id: route.params.id
    }))
    if (data.code !== 201) {
      Message.error({ message: data.msg, duration: 1300 })
      state.followBtnLoading = false
      return
    }
    Message({ message: data.msg, type: 'success', duration: 1300 })
    state.followBtnLoading = false
    state.onFollowChange = false
    loadgetUserInfo()
    loadgetFollowUserList()
  }

  // 去粉丝页面
  function goFansWebList () {
    if (state.userInfo.id.toString() === route.params.id.toString()) {
      router.push('/fans/' + state.userInfo.id)
      return
    }
    Message.error({ message: '不能查看他人粉丝列表', duration: 1300 })
  }

  // 去关注页面
  function goFollowsWebList () {
    if (state.userInfo.id.toString() === route.params.id.toString()) {
      router.push('/myfollow/' + state.userInfo.id)
      return
    }
    Message.error({ message: '不能查看他人关注列表', duration: 1300 })
  }

  return {
    loadgetFollowUserList,
    changeFollowTa,
    deleteFollowTa,
    goFansWebList,
    goFollowsWebList
  }
}
