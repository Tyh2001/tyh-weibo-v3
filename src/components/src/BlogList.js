import { computed } from 'vue'
import url from '../../utils/url'
import { toDates } from '../../utils/changeTime'
import { deleteMyBlogList } from '../../api/blog'
import { onFollowUser, deleteFollowUser } from '../../api/follow'
import qs from 'qs'
import { Message, Msgbox } from 'element3'

/**
 * 博客列表模块
 * @param { object } state 数据
 * @param { object } props 传递的数据
 * @param { object } emit 想父组件发送数据
 * 
 * 1. 用户头像地址
 * 2. 博客发布的时间
 * 3. 博客图片地址
 * 4. 是否展示关注和取消关注选项
 * 5. 是否显示删除选项
 * 6. 关注用户
 * 7. 取消关注用户
 * 8. 删除博客
 * 9. 评论点击
 * 10. 点击点赞
 * 
 * @returns Fn
 */
export default function (state, props, emit) {
  // 用户头像地址
  const userPhotoAvatar = computed(() => {
    return `${url}/userPhoto/${props.blogItem.avatar}`
  })

  // 博客发布的时间
  function releaseTime () {
    return toDates(props.blogItem.release_time)
  }

  // 博客图片地址
  function blogItemImgURL (urlsuffix) {
    return `${url}/blogImg/${urlsuffix}`
  }

  // 是否展示关注和取消关注选项
  const followShow = computed(() => {
    return props.blogItem.user_id !== state.userInfo.id
  })

  // 是否显示删除选项
  const changeDelete = computed(() => {
    return props.blogItem.user_id === state.userInfo.id
  })

  // 关注用户
  async function onFollowTa () {
    state.upFollowDisabled = true
    const { data } = await onFollowUser(qs.stringify({
      user_id: state.userInfo.id,
      follower_id: props.blogItem.user_id
    }))
    if (data.code !== 201) {
      state.upFollowDisabled = false
      return
    }
    Message({ message: data.msg, type: 'success', duration: 1300 })
    state.upFollowDisabled = false
  }

  // 取消关注用户
  async function deleteFollowTa () {
    state.delFollowDisabled = true
    const { data } = await deleteFollowUser(qs.stringify({
      user_id: state.userInfo.id,
      follower_id: props.blogItem.user_id
    }))
    if (data.code !== 201) {
      state.delFollowDisabled = false
      return
    }
    Message({ message: data.msg, type: 'success', duration: 1300 })
    state.delFollowDisabled = false
    emit('loadBlogList')
  }

  // 删除博客
  function deleteBlog () {
    Msgbox.confirm('确定删除该条博客吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const { data } = await deleteMyBlogList(props.blogItem.blogId)
      Message({ message: data.msg, type: 'success', duration: 1300 })
      emit('loadBlogList')
    }).catch(() => {
      Message({ type: 'info', message: '已取消删除', duration: 1300 })
    })
  }

  // 评论点击
  function sayChange () {
    Message({ type: 'info', message: '评论功能正在开发中...', duration: 1300 })
  }

  // 点击点赞
  function goodChange () {
    Message({ type: 'info', message: '点赞功能正在开发中...', duration: 1300 })
  }

  return {
    userPhotoAvatar,
    releaseTime,
    blogItemImgURL,
    followShow,
    changeDelete,
    onFollowTa,
    deleteFollowTa,
    deleteBlog,
    sayChange,
    goodChange
  }
}
