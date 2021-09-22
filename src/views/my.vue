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
      />
    </div>

    <div class="userBlogListNoLength" v-else>
      <p>你还没有发布过内容哦</p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, getCurrentInstance } from 'vue'
import { getUserInfo } from '../api/user'
import { useStore } from 'vuex'
import { toDates } from '../utils/changeTime'
import url from '../utils/url'
import { getUserBlogList } from '../api/blog'
import BlogList from '../components/BlogList.vue'
export default {
  name: 'my',
  components: {
    BlogList
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      userForm: {},
      userInfo: useStore().state.userInfo, // 用户信息
      userBlogList: [], // 博客列表
      onFollowChange: false, // 是否关注
    })

    // 将时间戳转换为正常的时间对象格式
    function registerTime () {
      return toDates(this.userForm.regis_time)
    }

    // 获取用户信息
    onMounted(async () => {
      const { data } = await getUserInfo(proxy.$root.$route.params.id)
      state.userForm = data.data
    })

    // 头像地址
    const userPhotoAvatar = computed(() => {
      return `${url}/userPhoto/${state.userForm.avatar}`
    })

    // 获取指定用户博客内容
    onMounted(async () => {
      const { data } = await getUserBlogList(proxy.$root.$route.params.id)
      state.userBlogList = data.data
    })

    return {
      ...toRefs(state),
      registerTime,
      userPhotoAvatar,
    }
  }
}
</script>

<style lang='less' scoped>
#header {
  width: 585px;
  min-height: 220px;
  padding-bottom: 12px;
  background: url("./images/img.png") no-repeat center;
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

