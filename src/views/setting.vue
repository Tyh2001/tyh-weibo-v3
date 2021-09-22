<template>
  <el-card class="box-card">
    <h3 class="title">
      {{ changeUserInfoBloon ? "修改资料" : "账号信息设置" }}
    </h3>
    <div class="user_photo_box">
      <img class="user_photo" :src="userPhotoAvatar" @click="upFilePhoto" />
      <input
        ref="file_input"
        class="up_user_photo"
        type="file"
        @change="onChangeFileInp"
      />
    </div>

    <el-form :model="user" ref="user" label-width="80px">
      <!-- 昵称 -->
      <el-form-item label="昵称">
        <el-input
          v-if="changeUserInfoBloon"
          v-model="user.nickname"
          clearable
          placeholder="编辑昵称"
        />
        <p v-else class="form_item_text">{{ user.nickname }}</p>
      </el-form-item>

      <!-- 个性签名 -->
      <el-form-item label="个性签名">
        <el-input
          v-if="changeUserInfoBloon"
          v-model="user.autograph"
          clearable
          placeholder="选择个性签名"
        />
        <p v-else class="form_item_text">{{ user.autograph }}</p>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别">
        <el-select
          v-if="changeUserInfoBloon"
          v-model="user.gender"
          placeholder="请选择性别"
        >
          <el-option value="男" />
          <el-option value="女" />
          <el-option value="保密" />
        </el-select>
        <p v-else class="form_item_text">{{ user.gender }}</p>
      </el-form-item>

      <!-- 感情状况 -->
      <el-form-item label="感情状况">
        <el-select
          v-if="changeUserInfoBloon"
          v-model="user.feeling"
          placeholder="感情状况"
        >
          <el-option
            v-for="(feelingItem, index) in feelingList"
            :key="index"
            :value="feelingItem"
          />
        </el-select>
        <p v-else class="form_item_text">{{ user.feeling }}</p>
      </el-form-item>

      <!-- 职业 -->
      <el-form-item label="职业">
        <el-select
          v-if="changeUserInfoBloon"
          v-model="user.work"
          placeholder="选择职业"
        >
          <el-option
            v-for="(workItem, index) in workList"
            :key="index"
            :value="workItem"
          />
        </el-select>
        <p v-else class="form_item_text">{{ user.work }}</p>
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="mail">
        <el-input
          v-if="changeUserInfoBloon"
          v-model="user.mail"
          clearable
          placeholder="选择邮箱"
        />
        <p v-else class="form_item_text">{{ user.mail }}</p>
      </el-form-item>
    </el-form>

    <el-button type="success">成功按钮</el-button>
  </el-card>

  <el-card class="box-card">
    <h3 class="title">其他设置</h3>
    <el-button type="danger">退出登录</el-button>
  </el-card>
</template>

<script>
// 获取用户信息 - 修改用户资料 - 修改密码 - 上传头像
import { getUserInfo, changeUserInfo, changeUserPass, uploadUserPhoto } from '../api/user'
import { reactive, toRefs, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import url from '../utils/url'
export default {
  name: 'setting',
  setup () {
    const state = reactive({
      userInfo: useStore().state.userInfo, // 用户信息
      changeUserInfoBloon: false, // 展示用户信息和编辑信息的切换状态
      feelingList: ['单身', '已婚', '订婚', '暧昧中', '求交往', '暗恋中', '分居', '离异', '保密'], // 感情状况
      workList: ['计算机/互联网/通信', '生产/工艺/制造', '金融/银行/投资/保险', '商业/服务业/个体经营', '文化/广告/传媒', '娱乐/艺术/表演', '律师/法务', '教育/培训', '公务员/行政/事业单位', '演员/歌手', '自由职业', '模特', '空姐', '学生', '其他'],
      user: {}, // 个人信息
    })

    // 获取用户资料
    onMounted(async () => {
      const { data } = await getUserInfo(state.userInfo.id)
      console.log(data)
    })

    // 头像地址
    const userPhotoAvatar = computed(() => {
      return state.user.avatar ? `${url}/userPhoto/${state.user.avatar}` : ''
    })

    return {
      ...toRefs(state),
      userPhotoAvatar, // 头像地址
    }
  }
}
</script>

<style lang='less' scoped>
.el-card {
  width: 650px;
  margin: auto;
  background: #fff;
  .title {
    font-weight: 500;
    margin-bottom: 30px;
  }
  .user_photo_box {
    width: 100px;
    margin: auto;
    .user_photo {
      display: block;
      max-width: 100%;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      cursor: pointer;
    }
    .up_user_photo {
      display: none;
    }
  }
  .el-form {
    margin-top: 25px;
    .form_item_text {
      color: #333;
      margin-left: 13px;
    }
  }
  .el-select,
  .el-date-editor--date {
    width: 100%;
  }
  .el-button {
    width: 530px;
    margin-left: 80px;
    margin-bottom: 16px;
  }
}
.tyh-card:nth-child(1) {
  margin-top: 50px;
}
.tyh-card:nth-child(2) {
  margin-top: 20px;
}
.tyh-card:nth-child(3) {
  margin-top: 20px;
}
.cropper_img {
  max-height: 450px;
}
</style>
