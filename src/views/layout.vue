<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <div id="menu">
      <el-menu-item index="1">
        <i class="el-icon-s-home" />
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-star-on" />
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-s-tools" />
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-user-solid" />
      </el-menu-item>
    </div>
  </el-menu>

  <div id="router_box">
    <router-view />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'layout',
  setup () {
    let activeIndex = ref('1')

    return {
      activeIndex
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
  #menu {
    width: 800px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
#router_box {
  margin-top: 60px;
}
</style>
