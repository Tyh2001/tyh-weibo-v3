<template>
  <div id="fans">
    <template v-if="myFansList.length">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="'/my/' + userInfo.id">
          个人主页
        </el-breadcrumb-item>
        <el-breadcrumb-item>我的粉丝</el-breadcrumb-item>
      </el-breadcrumb>

      <UserList
        v-for="(myfansUserItem, index) in myFansList"
        :key="index"
        :isFans="true"
        :item="myfansUserItem"
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
  name: 'fans',
  components: {
    UserList
  },
  setup () {
    const state = reactive({
      userInfo: useStore().state.userInfo, // 用户信息
      myFansList: [] // 我的关注列表
    })

    // 获取我的粉丝列表
    const { loadgetFansUserList } = userModular(state)
    onMounted(() => {
      loadgetFansUserList()
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang='less' scoped>
#fans {
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