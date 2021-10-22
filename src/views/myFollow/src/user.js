import qs from 'qs'
import { getFollowUserList } from '@/api/follow'

/**
 * 我的关注列表模块
 * @param { object } state 数据
 * 
 * 1. 获取我的关注列表
 * 
 * @returns Fn
 */
export default function (state) {
  //  获取我的关注列表
  async function loadgetFollowUserList () {
    const { data } = await getFollowUserList(qs.stringify({ user_id: state.userInfo.id }))
    state.myFollowUser = data.data
  }

  return {
    loadgetFollowUserList
  }
}
