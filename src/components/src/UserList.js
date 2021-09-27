import url from '../../utils/url'
import { useRouter } from 'vue-router'

export default function (props) {
  const router = useRouter()

  // 头像地址
  function userPhotoAvatar (userPhotoSrc) {
    return `${url}/userPhoto/${userPhotoSrc}`
  }

  // 点击跳转对于的用户首页
  function toUserBlog () {
    router.push(`/my/${props.isFans ? props.item.user_id : props.item.follower_id}`)
  }

  return {
    userPhotoAvatar,
    toUserBlog
  }
}
