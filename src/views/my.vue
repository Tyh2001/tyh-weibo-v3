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
import { reactive, toRefs, onMounted, computed, getCurrentInstance, watch } from 'vue'
import { getUserInfo } from '../api/user'
import { useStore } from 'vuex'
import { toDates } from '../utils/changeTime'
import url from '../utils/url'
import { getUserBlogList } from '../api/blog'
import { onFollowUser, getFollowUserList, deleteFollowUser } from '../api/follow'
import BlogList from '../components/BlogList.vue'
import qs from 'qs'
import { Message } from 'element3'
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
      followBtnLoading: false // 点击关注按钮禁用状态
    })

    // 将时间戳转换为正常的时间对象格式
    function registerTime () {
      return toDates(state.userForm.regis_time)
    }

    // 获取用户信息
    const loadgetUserInfo = onMounted(async () => {
      const { data } = await getUserInfo(proxy.$root.$route.params.id)
      state.userForm = data.data
    })

    // 头像地址
    const userPhotoAvatar = computed(() => {
      return `${url}/userPhoto/${state.userForm.avatar}`
    })

    // 获取指定用户博客内容
    const loadgetAllBlogList = onMounted(async () => {
      const { data } = await getUserBlogList(proxy.$root.$route.params.id)
      state.userBlogList = data.data
    })

    // 关注展示状态
    const showFollowBtn = computed(() => {
      return state.userInfo.id.toString() !== proxy.$root.$route.params.id.toString()
    })

    // 获取关注列表展示不同的按钮状态
    onMounted(() => {
      loadgetFollowUserList()
    })

    // 获取我的关注列表
    async function loadgetFollowUserList () {
      const { data } = await getFollowUserList(qs.stringify({ user_id: state.userInfo.id }))
      data.data.forEach(item => {
        if (item.follower_id.toString() === proxy.$root.$route.params.id.toString()) {
          state.onFollowChange = true
        }
      })
    }

    // 关注
    async function changeFollowTa () {
      state.followBtnLoading = true
      const { data } = await onFollowUser(qs.stringify({
        user_id: state.userInfo.id,
        follower_id: proxy.$root.$route.params.id
      }))
      if (data.code !== 201) {
        Message.error({ message: data.msg, duration: 1300 })
        state.followBtnLoading = false
        return
      }
      Message({ message: data.msg, type: 'success', duration: 1300 })
      state.followBtnLoading = false
      state.onFollowChange = true
      loadgetUserInfo()
      loadgetFollowUserList()
    }

    // 取消关注
    async function deleteFollowTa () {
      state.followBtnLoading = true
      const { data } = await deleteFollowUser(qs.stringify({
        user_id: state.userInfo.id,
        follower_id: proxy.$root.$route.params.id
      }))
      if (data.code !== 201) {
        Message.error({ message: data.msg, duration: 1300 })
        state.followBtnLoading = false
        return
      }
      Message({ message: data.msg, type: 'success', duration: 1300 })
      state.followBtnLoading = false
      state.onFollowChange = false
      loadgetUserInfo()
      loadgetFollowUserList()
    }

    // 去粉丝页面
    function goFansWebList () {
      if (state.userInfo.id.toString() === proxy.$root.$route.params.id.toString()) {
        proxy.$root.$router.push('/fans/' + state.userInfo.id)
        return
      }
      Message.error({ message: '不能查看他人粉丝列表', duration: 1300 })
    }

    // 去关注页面
    function goFollowsWebList () {
      if (state.userInfo.id.toString() === proxy.$root.$route.params.id.toString()) {
        proxy.$root.$router.push('/myfollow/' + state.userInfo.id)
        return
      }
      Message.error({ message: '不能查看他人关注列表', duration: 1300 })
    }

    // 监视路由的变化，如果发生变化就重新加载内容
    // 因为这里防止进入其他人的主页时候 再点击自己的博客不发生变化的问题
    watch(() => proxy.$root.$route, (count, prevCount) => {
      if (proxy.$root.$route.params.id) {
        loadgetUserInfo()
        loadgetAllBlogList()
      }
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

