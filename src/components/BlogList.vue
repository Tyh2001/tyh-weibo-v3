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

<script>
import { computed, reactive, toRefs } from 'vue'
import url from '../utils/url'
import { toDates } from '../utils/changeTime'
import { useStore } from 'vuex'
import { deleteMyBlogList } from '../api/blog'
// 关注用户 - 取消关注用户
import { onFollowUser, deleteFollowUser } from '../api/follow'
import qs from 'qs'
import { Message, Msgbox } from 'element3'
export default {
  name: 'BlogList',
  props: {
    // 博客内容
    blogItem: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      userInfo: useStore().state.userInfo, // 用户信息
      upFollowDisabled: false, // 关注按钮的禁用状态
      delFollowDisabled: false // 取消关注按钮的禁用状态
    })

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
        Message.error({ message: data.msg, duration: 1300 })
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
        Message.error({ message: data.msg, duration: 1300 })
        state.delFollowDisabled = false
        return
      }
      Message({ message: data.msg, type: 'success', duration: 1300 })
      state.delFollowDisabled = false
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
      ...toRefs(state),
      userPhotoAvatar, // 用户头像地址
      releaseTime, // 博客发布的时间
      blogItemImgURL, // 博客图片地址
      followShow, // 是否展示关注和取消关注选项
      changeDelete, // 是否显示删除选项
      onFollowTa, // 关注
      deleteFollowTa, // 取消关注
      deleteBlog, // 删除博客
      sayChange, // 评论点击
      goodChange // 点击点赞
    }
  }
}
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
