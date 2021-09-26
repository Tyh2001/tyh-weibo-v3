import { getUserInfo } from '../../../api/user'
import { toDates } from '../../../utils/changeTime'
import url from '../../../utils/url'
import { getUserBlogList } from '../../../api/blog'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * 我的页面用户相关模块
 * @param { object } state 数据
 * 
 * 1. 将时间戳转换为正常的时间对象格式
 * 2. 获取用户信息
 * 3. 头像地址
 * 4. 获取指定用户博客内容
 * 5. 关注展示状态
 * 
 * @returns Fn
 */
export default function (state) {
  const route = useRoute()

  // 将时间戳转换为正常的时间对象格式
  function registerTime () {
    return toDates(state.userForm.regis_time)
  }

  // 获取用户信息
  async function loadgetUserInfo () {
    const { data } = await getUserInfo(route.params.id)
    state.userForm = data.data
  }

  // 头像地址
  const userPhotoAvatar = computed(() => {
    return `${url}/userPhoto/${state.userForm.avatar}`
  })

  // 获取指定用户博客内容
  async function loadgetAllBlogList () {
    const { data } = await getUserBlogList(route.params.id)
    state.userBlogList = data.data
  }

  // 关注展示状态
  const showFollowBtn = computed(() => {
    return state.userInfo.id.toString() !== route.params.id.toString()
  })

  return {
    registerTime,
    loadgetUserInfo,
    userPhotoAvatar,
    loadgetAllBlogList,
    showFollowBtn
  }
}
