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
            @loadBlogList="loadgetAllBlogList"
          />

          <!-- 开始 loading 加载显示 -->
          <el-table
            v-if="fullscreenLoading"
            id="blogListLoading"
            v-loading="fullscreenLoading"
          />
        </div>

        <!-- 用户内容 -->
        <UserInfo v-if="userInfo" :user="user" :userInfo="userInfo" />

        <!-- 未登录 -->
        <UserInfo v-else :logBoolean="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, toRefs } from 'vue'
import { useStore } from 'vuex'
import BlogList from '@/components/BlogList.vue'
import UserInfo from '@/components/UserInfo.vue'
import releaseBlog from './src/releaseBlog'
import userModular from './src/user'
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

const { blogText, imagesList, changeBtnLoading, blogList, fullscreenLoading, userInfo, user } = toRefs(state)

// 发布博客模块
const { upImageFileInputChange, removeImage, clickFileAddImg, publishContent } = releaseBlog(state)

// 用户模块
const { loadgetUserInfo, loadgetAllBlogList } = userModular(state)

onMounted(() => {
  loadgetUserInfo() // 获取用户信息
  loadgetAllBlogList() // 获取全部博客
})
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
    }
  }
}
</style>
