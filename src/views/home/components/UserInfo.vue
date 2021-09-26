<!--
 首页和关注页右侧用户信息展示
 首页分为登录状态和未登录状态
 关注页面仅为登录状态
 -->
<template>
  <div class="user_list">
    <div class="my_pohto">
      <img
        class="my_pohto_img"
        :src="
          logBoolean ? userPhotoAvatar : '/src/views/home/images/outLogin.jpg'
        "
        @click="
          logBoolean
            ? $router.push('/my/' + userInfo.id)
            : $router.push('/user/login')
        "
      />
    </div>
    <h4
      class="nickname"
      @click="
        logBoolean
          ? $router.push('/my/' + userInfo.id)
          : $router.push('/user/login')
      "
    >
      {{ logBoolean ? user.nickname : "未登录用户" }}
    </h4>
    <p class="autograph">{{ logBoolean ? user.autograph : "点击登录" }}</p>
  </div>
</template>

<script>
import userModular from '../src/user'
export default {
  name: 'UserInfo',
  props: {
    // 用户资料
    user: {
      type: Object
    },
    // 用户信息
    userInfo: {
      type: Object
    },
    // 是否登录
    logBoolean: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    // 头像地址
    const { userPhotoAvatar } = userModular(props)

    return {
      userPhotoAvatar
    }
  }
}
</script>

<style lang="less" scoped>
.user_list {
  border-radius: 8px;
  width: 370px;
  padding: 0 20px;
  box-sizing: border-box;
  height: 300px;
  background: #fff;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  margin-top: 60px;
  .my_pohto {
    width: 90px;
    margin: auto;
    margin-top: -60px;
    cursor: pointer;
    .my_pohto_img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
  }
  .nickname {
    line-height: 30px;
    color: #333;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
  }
  .autograph {
    font-size: 14px;
    color: #161616;
    text-align: center;
    margin-top: 6px;
    cursor: pointer;
  }
}
</style>
