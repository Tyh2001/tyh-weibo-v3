<template>
  <el-card>
    <h3 class="title">
      {{ changeUserInfoBloon ? "修改资料" : "账号信息设置" }}
    </h3>
    <div class="user_photo_box">
      <img
        class="user_photo"
        :src="userPhotoAvatar"
        @click="$refs.fileInput.click()"
      />
      <input
        ref="fileInput"
        type="file"
        hidden
        @change="onChangeFileInp(fileInput)"
      />
    </div>

    <el-form :model="userForm" ref="user" label-width="80px">
      <!-- 昵称 -->
      <el-form-item label="昵称">
        <el-input
          v-if="changeUserInfoBloon"
          v-model="userForm.nickname"
          clearable
          placeholder="编辑昵称"
        />
        <p v-else class="form_item_text">{{ userForm.nickname }}</p>
      </el-form-item>

      <!-- 个性签名 -->
      <el-form-item label="个性签名">
        <el-input
          v-if="changeUserInfoBloon"
          v-model="userForm.autograph"
          clearable
          placeholder="选择个性签名"
        />
        <p v-else class="form_item_text">{{ userForm.autograph }}</p>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别">
        <el-select
          v-if="changeUserInfoBloon"
          v-model="userForm.gender"
          placeholder="请选择性别"
        >
          <el-option value="男" />
          <el-option value="女" />
          <el-option value="保密" />
        </el-select>
        <p v-else class="form_item_text">{{ userForm.gender }}</p>
      </el-form-item>

      <!-- 感情状况 -->
      <el-form-item label="感情状况">
        <el-select
          v-if="changeUserInfoBloon"
          v-model="userForm.feeling"
          placeholder="感情状况"
        >
          <el-option
            v-for="(feelingItem, index) in feelingList"
            :key="index"
            :value="feelingItem"
          />
        </el-select>
        <p v-else class="form_item_text">{{ userForm.feeling }}</p>
      </el-form-item>

      <!-- 职业 -->
      <el-form-item label="职业">
        <el-select
          v-if="changeUserInfoBloon"
          v-model="userForm.work"
          placeholder="选择职业"
        >
          <el-option
            v-for="(workItem, index) in workList"
            :key="index"
            :value="workItem"
          />
        </el-select>
        <p v-else class="form_item_text">{{ userForm.work }}</p>
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="mail">
        <el-input
          v-if="changeUserInfoBloon"
          v-model="userForm.mail"
          clearable
          placeholder="选择邮箱"
        />
        <p v-else class="form_item_text">{{ userForm.mail }}</p>
      </el-form-item>
    </el-form>

    <el-button
      :type="changeUserInfoBloon ? 'success' : 'primary'"
      :loading="changeUserInfoBtnLoading"
      @click="changeUserInfoBloon ? SaveData() : (changeUserInfoBloon = true)"
    >
      {{ changeUserInfoBloon ? "保存资料" : "修改资料" }}
    </el-button>
  </el-card>

  <el-card>
    <h3 class="title">修改密码</h3>
    <el-form :model="changePass" label-width="80px">
      <!-- 原始密码 -->
      <el-form-item label="原始密码">
        <el-input
          v-model="changePass.oldPass"
          placeholder="请输入原始密码"
          show-password
        />
      </el-form-item>

      <!-- 新密码 -->
      <el-form-item label="新密码">
        <el-input
          v-model="changePass.newPass2"
          placeholder="输入新密码"
          show-password
        />
      </el-form-item>
    </el-form>

    <el-button
      type="success"
      :loading="changeUserPassBtnLoading"
      @click="SaveDataNewPass"
    >
      修改密码
    </el-button>
  </el-card>

  <el-card>
    <h3 class="title">其他设置</h3>
    <el-button type="danger" @click="outLogin">退出登录</el-button>
  </el-card>

  <!-- 执行头像裁切的对话框 -->
  <el-dialog
    title="提示"
    :visible.sync="CropperImgDialog"
    width="600px"
    :show-close="false"
    @opened="dialogOpened(cropperImg)"
    @closed="dialogClosed(fileInput)"
  >
    <div>
      <img class="cropper_img" ref="cropperImg" :src="UploadfileImgUrl" />
    </div>
    <br />
    <span slot="footer" class="dialog-footer">
      <el-button @click="CropperImgDialog = false">取消</el-button>
      <el-button
        type="primary"
        :loading="upImgLoginDialog"
        @click="ToUploadPhoto"
      >
        确定
      </el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { reactive, toRefs, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import userModular from './src/user'
import cropperjsModular from './src/cropperjs'
const store = useStore()
const state = reactive({
  userInfo: store.state.userInfo, // 用户信息
  changeUserInfoBloon: false, // 展示用户信息和编辑信息的切换状态
  feelingList: ['单身', '已婚', '订婚', '暧昧中', '求交往', '暗恋中', '分居', '离异', '保密'], // 感情状况
  workList: ['计算机/互联网/通信', '生产/工艺/制造', '金融/银行/投资/保险', '商业/服务业/个体经营', '文化/广告/传媒', '娱乐/艺术/表演', '律师/法务', '教育/培训', '公务员/行政/事业单位', '演员/歌手', '自由职业', '模特', '空姐', '学生', '其他'],
  userForm: {}, // 个人信息
  // 修改密码
  changePass: {
    oldPass: '',
    newPass2: ''
  },
  changeUserInfoBtnLoading: false, // 点击修改资料的按钮禁用状态
  changeUserPassBtnLoading: false, // 点击修改密码的按钮禁用状态
  cropper: null, // 头像裁切器实例
  UploadfileImgUrl: '', // 头像裁切器中图片地址
  CropperImgDialog: false, // 执行头像裁切的对话框
  upImgLoginDialog: false // 点击上传头像的按钮禁用状态
})

const {
  userInfo,
  CropperImgDialog,
  changeUserInfoBloon,
  userForm,
  changeUserInfoBtnLoading,
  changePass,
  changeUserPassBtnLoading,
  UploadfileImgUrl,
  upImgLoginDialog
} = toRefs(state)

// 用户相关
const { loadgetUserInfo, userPhotoAvatar, SaveData, SaveDataNewPass, outLogin } = userModular(state)

// 头像裁切
const fileInput = ref(null)
const cropperImg = ref(null)
const { onChangeFileInp, dialogOpened, dialogClosed, ToUploadPhoto } = cropperjsModular(state)

onMounted(() => {
  loadgetUserInfo() // 获取用户资料
})
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
.el-card:nth-child(1) {
  margin-top: 70px;
}
.el-card:nth-child(2) {
  margin-top: 20px;
}
.el-card:nth-child(3) {
  margin-top: 20px;
}
.cropper_img {
  max-height: 450px;
}
</style>
