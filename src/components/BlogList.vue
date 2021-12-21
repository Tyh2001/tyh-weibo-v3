<!-- 
  博客列表组件
  内部包括用户昵称，用户头像，博客发布时间，发布内容，发布的文字等等
 -->
<template>
  <div id="BlogList">
    <div class="userPhoto">
      <img
        class="photo"
        :src="userPhotoAvatar"
        @click="$router.push('/my/' + blogItem.user_id)"
      />
    </div>
    <div class="blog">
      <div class="blog_info_change">
        <div class="info_box">
          <h4 class="nickname">{{ blogItem.nickname }}</h4>
          <p class="time">{{ releaseTime() }}</p>
        </div>

        <!-- 下拉菜单 -->
        <el-dropdown class="el-dropdown-link" v-if="userInfo">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-if="followShow"
              :disabled="upFollowDisabled"
              @click.native="onFollowTa"
            >
              关注
            </el-dropdown-item>
            <el-dropdown-item v-if="followShow" @click.native="deleteFollowTa">
              取消关注
            </el-dropdown-item>
            <el-dropdown-item v-if="changeDelete" @click.native="deleteBlog">
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <p class="blogText">{{ blogItem.text }}</p>

      <div class="blogImg">
        <el-image
          class="blogImg-item"
          v-for="(blogItemImg, index) in blogItem.image"
          :key="index"
          :src="blogItemImgURL(blogItemImg)"
        />
      </div>

      <!-- 点赞框 -->
      <div class="fabulous">
        <div class="say" @click="sayChange">
          <i class="el-icon-chat-line-round" />
          评论
        </div>
        <div class="good" @click="goodChange">
          <i class="el-icon-star-off" />
          点赞
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import BlogListModular from './src/BlogList'
const props = defineProps({
  // 博客内容
  blogItem: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['loadBlogList'])

const state = reactive({
  userInfo: useStore().state.userInfo, // 用户信息
  upFollowDisabled: false, // 关注按钮的禁用状态
  delFollowDisabled: false // 取消关注按钮的禁用状态
})

const { userInfo, upFollowDisabled } = toRefs(state)

const {
  userPhotoAvatar,
  releaseTime,
  followShow,
  changeDelete,
  onFollowTa,
  blogItemImgURL,
  sayChange,
  goodChange,
  deleteFollowTa,
  deleteBlog
} = BlogListModular(state, props, emit)
</script>

<style lang='less' scoped>
#BlogList {
  width: 585px;
  display: flex;
  margin-top: 15px;
  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
  padding: 40px 40px 10px 40px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  .userPhoto {
    width: 73px;
    .photo {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .blog {
    width: 100%;
    .blog_info_change {
      display: flex;
      justify-content: space-between;
      .nickname {
        line-height: 30px;
        color: #333;
        font-size: 18px;
      }
      .time {
        font-size: 12px;
        color: #5e5e5e;
      }
    }
    .blogText {
      color: #252525;
      font-size: 15px;
      line-height: 24px;
      word-break: break-all;
    }
    .blogImg {
      display: flex;
      flex-wrap: wrap;
      /deep/ .blogImg-item {
        width: 142px;
        height: 142px;
        margin-top: 10px;
        margin-left: 5px;
      }
    }
    .fabulous {
      margin-top: 20px;
      display: flex;
      height: 35px;
      .good,
      .say {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        user-select: none;
        .tyh-icon {
          margin-right: 5px;
        }
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
