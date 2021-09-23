<template>
  <div id="UserList" @click="toUserBlog">
    <img
      class="userPhoto"
      :src="userPhotoAvatar(isFans ? item.user_avatar : item.follower_avatar)"
    />
    <p class="nickName">
      {{ isFans ? item.user_nickname : item.follower_nickname }}
    </p>
  </div>
</template>

<script>
import url from '../utils/url'
export default {
  name: 'UserList',
  props: {
    // 每一项用户信息
    item: {
      required: true,
      type: Object
    },
    // 是否为粉丝列表
    isFans: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup () {
    // 头像地址
    function userPhotoAvatar (userPhotoSrc) {
      return `${url}/userPhoto/${userPhotoSrc}`
    }
    return {
      userPhotoAvatar,
    }
  }
}
</script>

<style lang='less' scoped>
#UserList {
  height: 65px;
  padding: 15px;
  display: flex;
  cursor: pointer;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;
  .userPhoto {
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
  .nickName {
    color: #333;
    margin-left: 10px;
  }
}
</style>
