import { getFansUserList } from '@/api/follow'
import qs from 'qs'

/**
 * 我的粉丝列表模块
 * @param { object } state 数据
 * 
 * 1. 获取我的粉丝列表
 * 
 * @returns Fn
 */
export default function (state) {
  // 获取我的粉丝列表
  async function loadgetFansUserList () {
    const { data } = await getFansUserList(qs.stringify({ user_id: state.userInfo.id }))
    state.myFansList = data.data
  }

  return {
    loadgetFansUserList
  }
}
