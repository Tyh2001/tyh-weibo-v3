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
        <div class="user_list">
          <div class="my_pohto">
            <img
              class="my_pohto_img"
              :src="userPhotoAvatar"
              @click="$router.push('/my/' + userInfo.id)"
            />
          </div>
          <h4 class="nickname">{{ user.nickname }}</h4>
          <p class="autograph">{{ user.autograph }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import { getUserInfo } from '../api/user'
import { useStore } from 'vuex'
import url from '../utils/url'
import { getFollowAllBlogList } from '../api/blog'
import BlogList from '../components/BlogList.vue'
export default {
  name: 'follow',
  components: {
    BlogList
  },
  setup () {
    const state = reactive({
      user: {}, // 用户信息
      fullscreenLoading: false, // 页面加载状态展示
      userInfo: useStore().state.userInfo, // 用户信息
      blogList: [], // 博客内容
    })

    // 获取用户信息
    onMounted(async () => {
      const { data } = await getUserInfo(state.userInfo.id)
      state.user = data.data
    })

    // 头像地址
    const userPhotoAvatar = computed(() => {
      return `${url}/userPhoto/${state.user.avatar}`
    })

    // 获取指定用户博客内容
    onMounted(async () => {
      state.fullscreenLoading = true
      const { data } = await getFollowAllBlogList(state.userInfo.id)
      state.blogList = data.data
      state.fullscreenLoading = false
    })

    return {
      ...toRefs(state),
      userPhotoAvatar,
    }
  }
}
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
    }
  }
}
</style>
