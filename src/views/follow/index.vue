<template>
  <div id="followIndex">
    <div id="blog_box">
      <div id="content">
        <!-- 博客内内容 -->
        <div class="blog_list">
          <BlogList
            v-for="(blogItem, index) in blogList"
            :key="index"
            :blogItem="blogItem"
          />

          <!-- 开始 loading 加载显示 -->
          <el-table
            v-if="fullscreenLoading"
            id="blogListLoading"
            v-loading="fullscreenLoading"
          />
        </div>

        <!-- 用户内容 -->
        <UserInfo :user="user" :userInfo="userInfo" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, toRefs } from 'vue'
import { useStore } from 'vuex'
import BlogList from '@/components/BlogList.vue'
import userModular from './src/user'
import UserInfo from '@/components/UserInfo.vue'
const state = reactive({
  user: {}, // 用户信息
  fullscreenLoading: false, // 页面加载状态展示
  userInfo: useStore().state.userInfo, // 用户信息
  blogList: [] // 博客内容
})

const { blogList, fullscreenLoading, user, userInfo } = toRefs(state)

// 用户模块
const { loadgetUserInfo, userPhotoAvatar, loadgetFollowAllBlogList } = userModular(state)

onMounted(() => {
  loadgetUserInfo() // 获取用户信息
  loadgetFollowAllBlogList() // 获取指定用户博客内容
})
</script>

<style lang='less' scoped>
#followIndex {
  min-height: 100%;
  box-sizing: border-box;
  background: rgb(245, 245, 245);
  #blog_box {
    width: 1000px;
    margin: auto;
    #content {
      width: 100%;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      // 发布框
      .blog_list {
        width: 585px;
        #blogListLoading {
          width: 585px;
          height: 300px;
        }
      }
    }
  }
}
</style>
