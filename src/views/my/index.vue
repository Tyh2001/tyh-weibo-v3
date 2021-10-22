<template>
  <div id="header">
    <div class="user_photo_box">
      <img class="user_photo" :src="userPhotoAvatar" />
    </div>
    <h3 class="user_nickname">{{ userForm.nickname }}</h3>
    <p class="autograph">{{ userForm.autograph }}</p>
    <p class="followBtn">
      <el-button
        size="small"
        v-if="showFollowBtn"
        :loading="followBtnLoading"
        :type="onFollowChange ? 'danger' : 'primary'"
        @click="onFollowChange ? deleteFollowTa() : changeFollowTa()"
      >
        {{ onFollowChange ? "取消关注 TA" : "关注 TA" }}
      </el-button>
    </p>
  </div>
  <!-- 用户资料卡 -->
  <div id="header_info">
    <div id="followList">
      <!-- 粉丝 -->
      <p class="onfans" @click="goFansWebList">
        粉丝：
        <el-tag size="mini" type="danger">
          {{ userForm.fans_list }}
        </el-tag>
      </p>

      <!-- 关注 -->
      <p class="onFollow" @click="goFollowsWebList">
        关注：
        <el-tag size="mini" type="danger">
          {{ userForm.follow_list }}
        </el-tag>
      </p>
    </div>

    <!-- 生日 -->
    <p v-if="userForm.birthday">
      生日：<el-tag size="mini">{{ userForm.birthday }}</el-tag>
    </p>

    <!-- 感情状况 -->
    <p v-if="userForm.feeling">
      感情状况：
      <el-tag size="mini" type="success">
        {{ userForm.feeling }}
      </el-tag>
    </p>

    <!-- 工作 -->
    <p v-if="userForm.work">
      工作：<el-tag size="mini" type="info">{{ userForm.work }}</el-tag>
    </p>

    <!-- 邮箱 -->
    <p v-if="userForm.mail">
      邮箱：
      <el-tag size="mini" type="warning">
        {{ userForm.mail }}
      </el-tag>
    </p>

    <!-- 注册时间 -->
    <p>
      注册时间：
      <el-tag size="mini" type="danger">
        {{ registerTime() }}
      </el-tag>
    </p>
  </div>

  <!-- 博客列表内容 -->
  <div id="content">
    <!-- 用户发布的内容 -->
    <div v-if="userBlogList.length">
      <BlogList
        v-for="(blogItem, index) in userBlogList"
        :key="index"
        :blogItem="blogItem"
        @loadBlogList="loadgetAllBlogList"
      />
    </div>

    <div class="userBlogListNoLength" v-else>
      <p>你还没有发布过内容哦</p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import BlogList from '@/components/BlogList.vue'
import followModular from './src/follow'
import userModular from './src/user'
import { useRoute } from 'vue-router'
export default {
  name: 'my',
  components: {
    BlogList
  },
  setup () {
    const route = useRoute()
    const state = reactive({
      userForm: {},
      userInfo: useStore().state.userInfo, // 用户信息
      userBlogList: [], // 博客列表
      onFollowChange: false, // 是否关注
      followBtnLoading: false // 点击关注按钮禁用状态
    })

    // 用户相关模块
    const { registerTime, loadgetUserInfo, userPhotoAvatar, loadgetAllBlogList, showFollowBtn } = userModular(state)

    // 关注模块
    const { loadgetFollowUserList, changeFollowTa, deleteFollowTa, goFansWebList, goFollowsWebList } = followModular(state)

    // 监视路由的变化，如果发生变化就重新加载内容
    // 因为这里防止进入其他人的主页时候 再点击自己的博客不发生变化的问题
    watch(() => route, (count, prevCount) => {
      if (route.params.id) {
        loadgetUserInfo()
        loadgetAllBlogList()
      }
    })

    onMounted(() => {
      loadgetFollowUserList() // 获取我的关注列表
      loadgetAllBlogList()   // 获取指定用户博客内容
      loadgetUserInfo() // 获取用户信息
    })

    return {
      ...toRefs(state),
      registerTime, // 将时间戳转换为正常的时间对象格式
      userPhotoAvatar, // 头像地址
      showFollowBtn, // 关注展示状态
      changeFollowTa, // 关注
      deleteFollowTa, // 取消关注
      loadgetAllBlogList, // 获取指定用户博客内容
      goFansWebList, // 去粉丝页面
      goFollowsWebList // 去关注页面
    }
  }
}
</script>

<style lang='less' scoped>
#header {
  width: 585px;
  min-height: 220px;
  padding-bottom: 12px;
  background: url("./images/banner.png") no-repeat center;
  background-size: cover;
  border-radius: 5px;
  padding: 24px;
  box-sizing: border-box;
  .user_photo_box {
    width: 100px;
    margin: auto;
    .user_photo {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 5px solid rgba(255, 255, 255, 0.4);
    }
  }
  // 昵称
  .user_nickname {
    text-align: center;
    color: #333;
  }
  // 个性签名
  .autograph {
    text-align: center;
    color: #333;
    font-size: 15px;
    margin-top: 10px;
  }
  // 关注
  .followBtn {
    margin-top: 10px;
    text-align: center;
    .tyh-button {
      height: 30px;
    }
  }
}
#header_info {
  width: 585px;
  background: #fff;
  padding: 10px 40px;
  box-sizing: border-box;
  p {
    color: #515a6e;
    font-size: 14px;
    line-height: 30px;
  }
  // 关注和粉丝列表
  #followList {
    display: flex;
    .onfans,
    .onFollow {
      color: #333;
      font-size: 14px;
      cursor: pointer;
    }
    .onFollow {
      margin-left: 40px;
    }
  }
}
#content {
  width: 100%;
  // 没有发布动态
  .userBlogListNoLength {
    margin-top: 160px;
    user-select: none;
    p {
      font-size: 16px;
      color: #333;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>

