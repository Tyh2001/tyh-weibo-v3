<template>
  <div id="myIndex">
    <div id="myBlogList">
      <!-- 左侧 -->
      <div id="content_left">
        <div class="content_left_size">
          <h2 class="title">个人主页</h2>

          <ul class="list_content">
            <!-- 我的主页 -->
            <li
              :style="changeHeigthColorShow('my')"
              @click="$router.push(`/my/${userInfo.id}`)"
            >
              <i class="el-icon-collection-tag" />我的主页
            </li>

            <!-- 我的关注 -->
            <li
              :style="changeHeigthColorShow('myFollow')"
              @click="$router.push(`/myfollow/${userInfo.id}`)"
            >
              <i class="el-icon-user" />我的关注
            </li>

            <!-- 我的粉丝 -->
            <li
              :style="changeHeigthColorShow('fans')"
              @click="$router.push(`/fans/${userInfo.id}`)"
            >
              <i class="el-icon-orange" />我的粉丝
            </li>

            <!-- 设置 -->
            <li @click="$router.push('/setting')">
              <i class="el-icon-setting" />编辑资料
            </li>

            <!-- 首页 -->
            <li @click="$router.push('/')">
              <i class="el-icon-position" />返回首页
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧 -->
      <div id="content_right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const route = useRoute()
const state = reactive({
  userInfo: useStore().state.userInfo // 用户信息
})

const { userInfo } = toRefs(state)

// 高亮显示左侧菜单
function changeHeigthColorShow (url) {
  if (url === route.name) {
    return {
      color: '#409eff'
    }
  }
}
</script>

<style lang='less' scoped>
#myIndex {
  background: rgb(245, 245, 245);
  #myBlogList {
    width: 800px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .aaaa {
      color: red;
    }
    #content_left {
      width: 200px;
      .content_left_size {
        position: fixed;
        width: 200px;
        top: 57px;
        bottom: 0;
        background: #fff;
        padding-top: 30px;
        box-sizing: border-box;
        user-select: none;
        .title {
          color: #333;
          font-size: 26px;
          font-weight: 500;
          margin-left: 20px;
        }
        .list_content {
          margin-top: 30px;
          li {
            line-height: 40px;
            color: #333;
            text-decoration: none;
            list-style: none;
            font-size: 18px;
            user-select: none;
            padding-left: 20px;
            &:hover {
              background: rgb(243, 243, 243);
              cursor: pointer;
            }
          }
        }
      }
    }
    #content_right {
      width: 585px;
      margin-top: 20px;
    }
  }
}
</style>

