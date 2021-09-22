<template>
  <div id="homeIndex">
    <div id="home">
      <div id="content">
        <!-- 博客内内容 -->
        <div class="blog_list">
          <div class="release">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="blogText"
              :autosize="{ minRows: 2, maxRows: 7 }"
            />

            <!-- 需要上传的图片展示框 -->
            <div class="upImageBox" v-if="imagesList.length">
              <!-- 展示图片的盒子 -->
              <div
                class="item_img_change_box"
                v-for="(url, index) in imagesList"
                :key="index"
              >
                <!-- 移除上传图片的按钮 -->
                <i class="el-icon-remove-outline" @click="removeImage(index)" />
                <el-image :src="url" fit="cover" />
              </div>
              <!-- 上传文件的方框 -->
              <div class="item_img_add" @click="clickFileAddImg">
                <i
                  :class="
                    imagesList.length < 9 ? 'el-icon-plus' : 'el-icon-check'
                  "
                />
              </div>
            </div>

            <!-- 操作栏 -->
            <div class="utils-box">
              <!-- 这里可以加入表情和图片插入按钮 -->
              <div>
                <i
                  class="el-icon-picture-outline"
                  @click="$refs.imgfile.click()"
                />
                <input
                  ref="imgfile"
                  hidden
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  name="image"
                  @change="upImageFileInputChange($event)"
                />
              </div>
              <el-button
                type="primary"
                size="small"
                :loading="changeBtnLoading"
                @click="publishContent"
              >
                发布
              </el-button>
            </div>
          </div>

          <BlogList
            v-for="(blogItem, index) in blogList"
            :key="index"
            :blogItem="blogItem"
          />

          <!-- 开始 loading 加载显示 -->
          <el-table
            v-if="fullscreenLoading"
            id="blogListLoading"
            v-loading="fullscreenLoading"
          />
        </div>

        <!-- 用户内容 -->
        <div v-if="userInfo" class="user_list">
          <div class="my_pohto">
            <img class="my_pohto_img" :src="userPhotoAvatar" />
          </div>
          <h4 class="nickname">{{ user.nickname }}</h4>
          <p class="autograph">{{ user.autograph }}</p>
        </div>

        <!-- 未登录 -->
        <div v-else class="user_list">
          <div class="my_pohto">
            <img
              class="my_pohto_img"
              src="./images/outLogin.jpg"
              @click="$router.push('/user/login')"
            />
          </div>
          <h4 class="nickname" @click="$router.push('/user/login')">
            未登录用户
          </h4>
          <p class="autograph" @click="$router.push('/user/login')">点击登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, computed } from 'vue'
import { Message } from 'element3'
import { onReleaseBlog, getAllBlogList } from '../api/blog'
import { useStore } from 'vuex'
import { getUserInfo } from '../api/user'
import BlogList from '../components/BlogList.vue'
import url from '../utils/url'
export default {
  name: 'home',
  components: {
    BlogList
  },
  setup () {
    const state = reactive({
      blogText: '', // 发布博客文本框内的文字
      changeBtnLoading: false, // 发布按钮禁用状态
      user: {}, // 用户信息
      upLoadImagesFileArray: [], // 需要上传文件的数组
      imagesList: [], // 需要展示的的图片
      userInfo: useStore().state.userInfo, // 用户信息
      blogList: [], // 全部博客
      imgfile: null, // input dome 节点
      fullscreenLoading: false // 按钮 loading 状态
    })

    // 当上传文件被改变时
    function upImageFileInputChange (e) {
      const filesArr = Array.from(e.target.files) // 将获取到的 files 对象转换为数组形式
      for (let i = 0; i < filesArr.length; i++) {
        if (state.upLoadImagesFileArray.length < 9) {
          state.upLoadImagesFileArray.push(filesArr[i]) // 将需要上传的文件添加到数组
          state.imagesList.push(URL.createObjectURL(state.imgfile.files[i])) // 将需要展示的文件添加到数组
        } else {
          Message.error('最多只能上传9张图片')
          break
        }
      }
      state.imgfile.value = ''
    }

    // 点击移除照片
    function removeImage (index) {
      state.imagesList.splice(index, 1) // 移除需要展示的数组中的图片
      state.upLoadImagesFileArray.splice(index, 1) // 移除需要上传数组中的图片
    }

    // 点击上传文件的方形框位置
    function clickFileAddImg () {
      // 跟随在后面的添加按钮
      // 如果选择图片的场地小于9，则点击可以继续上传
      // 否则点击没有效果
      return state.imagesList.length < 9
        ? state.imgfile.click()
        : Message.error('最多只能上传9张图片')
    }

    // 点击发布的按钮
    async function publishContent () {
      // 如果内容为空不能发布
      if (state.blogText === '') {
        return Message.error('内容为空不能发布')
      }
      state.changeBtnLoading = true
      // 新建一个 FormData
      const formData = new FormData()

      // 循环每一个选择的文件 将其添加 append
      state.upLoadImagesFileArray.forEach(item => {
        // 给每一项命名为 blogImages 后面的 [] 必须加
        formData.append('blogImages[]', item, '.jpg')
      })

      const { data } = await onReleaseBlog(formData, {
        userId: state.userInfo.id,
        blogText: state.blogText
      })

      if (data.code === 201) {
        Message({ message: data.msg, type: 'success' })
        state.imagesList = []
        state.upLoadImagesFileArray = []
        state.blogText = ''
        state.changeBtnLoading = false
        loadgetAllBlogList()
        return
      }
      state.changeBtnLoading = false
    }

    // 获取用户信息
    onMounted(async () => {
      if (state.userInfo) {
        const { data } = await getUserInfo(state.userInfo.id)
        state.user = data.data
      }
    })

    // 获取全部博客
    const loadgetAllBlogList = onMounted(async () => {
      state.fullscreenLoading = true
      const { data } = await getAllBlogList()
      state.blogList = data.data
      state.fullscreenLoading = false
    })

    // 头像地址
    const userPhotoAvatar = computed(() => {
      return `${url}/userPhoto/${state.user.avatar}` || ''
    })

    return {
      ...toRefs(state),
      removeImage, // 点击移除照片
      upImageFileInputChange, // 当上传文件被改变时
      clickFileAddImg, // 点击上传文件的方形框位置
      publishContent, // 点击发布的按钮
      userPhotoAvatar // 头像地址
    }
  }
}
</script>

<style lang="less" scoped>
#homeIndex {
  background: rgb(245, 245, 245);
  #home {
    width: 1000px;
    margin: auto;
    #content {
      width: 100%;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      // 发布框
      .blog_list {
        width: 585px;
        .release {
          width: 100%;
          min-height: 140px;
          background: #fff;
          box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
          padding: 22px 45px;
          box-sizing: border-box;
          border-radius: 5px;
          // 预览上传图片
          .upImageBox {
            margin-top: 5px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            // 展示长传的每个图片的盒子
            .item_img_change_box {
              width: 95px;
              height: 95px;
              display: inline-block;
              margin-right: 3px;
              margin-top: 3px;
              position: relative;
              z-index: 20;
              .el-image {
                width: 100%;
                height: 100%;
                border-radius: 3px;
              }
              // 选中上传图片上的移除按钮
              .el-icon-remove-outline {
                position: absolute;
                right: 5px;
                top: 5px;
                cursor: pointer;
                z-index: 30;
              }
            }
            // 跟随在后面的添加图标内容
            .item_img_add {
              width: 93px;
              height: 93px;
              border: 1px solid #333;
              border-radius: 3px;
              display: inline-block;
              user-select: none;
              cursor: pointer;
              font-size: 30px;
              margin-top: 3px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          // 操作栏
          .utils-box {
            width: 100%;
            display: flex;
            margin-top: 5px;
            justify-content: space-between;
            align-items: center;
            i {
              cursor: pointer;
            }
          }
          // 文本框
          /deep/ .el-textarea__inner {
            height: 50px;
            font-family: "微软雅黑";
            border-radius: 10px;
            resize: none;
            padding: 10px;
            box-sizing: border-box;
            font-size: 15px;
          }
        }
        #blogListLoading {
          width: 585px;
          height: 300px;
        }
      }
      .user_list {
        border-radius: 8px;
        width: 370px;
        padding: 0 20px;
        box-sizing: border-box;
        height: 300px;
        background: #fff;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
        margin-top: 60px;
        .my_pohto {
          width: 90px;
          margin: auto;
          margin-top: -60px;
          cursor: pointer;
          .my_pohto_img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
          }
        }
        .nickname {
          line-height: 30px;
          color: #333;
          font-size: 18px;
          text-align: center;
          cursor: pointer;
        }
        .autograph {
          font-size: 14px;
          color: #161616;
          text-align: center;
          margin-top: 6px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
