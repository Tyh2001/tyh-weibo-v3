<template>
  <div id="myfollow">
    <template v-if="myFollowUser.length">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="'/my/' + userInfo.id">
          个人主页
        </el-breadcrumb-item>
        <el-breadcrumb-item>我的关注</el-breadcrumb-item>
      </el-breadcrumb>

      <UserList
        v-for="(myFollowUserItem, index) in myFollowUser"
        :key="index"
        :item="myFollowUserItem"
      />
    </template>

    <div v-else class="noFans">你还没有关注的人哦～</div>
  </div>
</template>

<script>
import UserList from '../../components/UserList.vue'
import { reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import userModular from './src/user'
export default {
  name: 'myFollow',
  components: {
    UserList
  },
  setup () {
    const state = reactive({
      userInfo: useStore().state.userInfo, // 用户信息
      myFollowUser: [] // 我的关注列表
    })

    // 获取我的关注列表
    const { loadgetFollowUserList } = userModular(state)

    onMounted(() => {
      loadgetFollowUserList() // 获取我的关注列表
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang='less' scoped>
#myfollow {
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  .el-breadcrumb {
    padding-bottom: 20px;
  }
  .noFans {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    user-select: none;
  }
}
</style>
