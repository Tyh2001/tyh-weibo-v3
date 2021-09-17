<template>
  <div id="BlogList">
    <div class="userPhoto">
      <img class="photo" :src="userPhotoAvatar" />
    </div>
    <div class="blog">
      <div class="blog_info_change">
        <div class="info_box">
          <h4 class="nickname">{{ blogItem.nickname }}</h4>
          <p class="time">{{ releaseTime() }}</p>
        </div>

        <!-- 下拉菜单 -->
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
          <!-- <Tyh-icon size="19" icon="tyh-ui-pinglun-01" /> -->
          评论
        </div>
        <div class="good" @click="goodChange">
          <!-- <Tyh-icon size="21" icon="tyh-ui-dianzan-01" /> -->
          点赞
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import url from '../utils/url'
import { toDates } from '../utils/changeTime.js'
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
    // 用户头像地址
    const userPhotoAvatar = computed(() => {
      return `${url}/userPhoto/${props.blogItem.avatar}`
    })

    // 博客发布的时间
    function releaseTime () {
      return toDates(props.blogItem.release_time)
    }

    function blogItemImgURL (urlsuffix) {
      return `${url}/blogImg/${urlsuffix}`
    }
    return {
      userPhotoAvatar,
      releaseTime,
      blogItemImgURL
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

