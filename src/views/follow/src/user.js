import { getUserInfo } from '../../../api/user'
import { computed } from 'vue'
import url from '../../../utils/url'
import { getFollowAllBlogList } from '../../../api/blog'


export default function (state) {
  // 获取用户信息
  async function loadgetUserInfo () {
    const { data } = await getUserInfo(state.userInfo.id)
    state.user = data.data
  }

  // 头像地址
  const userPhotoAvatar = computed(() => {
    return `${url}/userPhoto/${state.user.avatar}`
  })

  // 获取指定用户博客内容
  async function loadgetFollowAllBlogList () {
    state.fullscreenLoading = true
    const { data } = await getFollowAllBlogList(state.userInfo.id)
    state.blogList = data.data
    state.fullscreenLoading = false
  }

  return {
    loadgetUserInfo,
    userPhotoAvatar,
    loadgetFollowAllBlogList
  }
}
