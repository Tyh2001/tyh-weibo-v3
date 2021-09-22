<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <div id="menu">
      <el-menu-item index="/">
        <i class="el-icon-s-home" />
      </el-menu-item>
      <el-menu-item index="/follow">
        <i class="el-icon-star-on" />
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-s-tools" />
      </el-menu-item>
      <el-menu-item :index="toMyBlogList">
        <i class="el-icon-user-solid" />
      </el-menu-item>
    </div>
  </el-menu>

  <div id="router_box">
    <router-view />
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'layout',
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      activeIndex: '1',
      userInfo: useStore().state.userInfo, // 用户信息
    })

    // 点击我的图标
    const toMyBlogList = computed(() => {
      return state.userInfo ? '/my/' + state.userInfo.id : '/user/login'
    })

    return {
      ...toRefs(state),
      toMyBlogList
    }
  }
}
</script>

<style lang='less' scoped>
.el-menu {
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  z-index: 300;
  #menu {
    width: 800px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
#router_box {
  margin-top: 56px;
}
</style>
