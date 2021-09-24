import { getUserInfo } from '../../../api/user'
import { getAllBlogList } from '../../../api/blog'
import url from '../../../utils/url'
import { computed } from 'vue'

/**
 * 首页用户相关模块
 * @param { object } state 数据
 * 
 * 1. 获取全部博客
 * 2. 用户头像地址
 * 
 * @returns Fn
 */
export default function (state) {
  // 获取用户信息
  async function loadgetUserInfo () {
    if (state.userInfo) {
      const { data } = await getUserInfo(state.userInfo.id)
      state.user = data.data
    }
  }

  // 获取全部博客
  async function loadgetAllBlogList () {
    state.fullscreenLoading = true
    const { data } = await getAllBlogList()
    state.blogList = data.data
    state.fullscreenLoading = false
  }

  // 用户头像地址
  const userPhotoAvatar = computed(() => {
    return `${url}/userPhoto/${state.user.avatar}` || ''
  })

  return {
    loadgetUserInfo,
    loadgetAllBlogList,
    userPhotoAvatar
  }
}
