<!-- 
  我的粉丝和关注列表组件
  用于展示我的关注和我的粉丝列表
 -->
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

<script setup>
import UserListModular from './src/UserList'
const props = defineProps({
  // 每一项用户信息
  item: {
    required: true,
    type: Object
  },
  // 是否为粉丝列表
  isFans: {
    type: Boolean,
    default: false
  }
})

const { userPhotoAvatar, toUserBlog } = UserListModular(props)
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
