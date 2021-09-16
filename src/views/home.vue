<template>
  <div id="home">
    <div id="content">
      <!-- 博客内内容 -->
      <div class="blog_list">
        <div class="release">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="state.blogText"
            :autosize="{ minRows: 2, maxRows: 7 }"
          />

          <!-- 需要上传的图片展示框 -->
          <div class="upImageBox">
            <!-- 展示图片的盒子 -->
            <div
              class="item_img_change_box"
              v-for="(url, index) in imagesList"
              :key="index"
            >
              <!-- 移除上传图片的按钮 -->
              <!-- <Tyh-icon icon="tyh-ui-close-01" @click="removeImage(index)" /> -->
              <el-image :src="url" fit="cover" />
            </div>
            <!-- 上传文件的方框 -->
            <div class="item_img_add" @click="clickFileAddImg">
              <!-- <Tyh-icon
                  size="26"
                  :icon="
                    imagesList.length < 9
                      ? 'tyh-ui-jihao-01'
                      : 'tyh-ui-success-01'
                  "
                /> -->
            </div>
          </div>

          <!-- 操作栏 -->
          <div class="utils-box">
            <!-- 这里可以加入表情和图片插入按钮 -->
            <div>
              <!-- <Tyh-icon
                  size="20"
                  icon="tyh-ui-zhaopian-01"
                  @click="$refs.imgfile.click()"
                /> -->
              <i
                class="el-icon-picture-outline"
                @click="$refs.imgfile.click()"
              />
              <input
                ref="imgfile"
                style="display: none"
                type="file"
                accept="image/*"
                multiple="multiple"
                name="image"
                @change="upImageFileInputChange($event)"
              />
            </div>
            <el-button type="primary">发布</el-button>
          </div>
        </div>

        <!-- <BlogList
            v-for="(blogItem, index) in blogList"
            :key="index"
            :blogItem="blogItem"
            @loadBlogList="loadgetAllBlogList"
          /> -->

        <!-- 开始 loading 加载显示 -->
        <el-table
          v-if="fullscreenLoading"
          id="blogListLoading"
          v-loading="fullscreenLoading"
        />
      </div>

      <!-- 用户内容 -->
      <div class="user_list">
        <div class="my_pohto">
          <img class="my_pohto_img" :src="userPhotoAvatar" />
        </div>
        <!-- <h4 class="nickname">{{ user.nickname }}</h4>
          <p class="autograph">{{ user.autograph }}</p> -->
      </div>

      <!-- 未登录 -->
      <!-- <div v-else class="user_list">
          <div class="my_pohto">
            <img
              class="my_pohto_img"
              src="./images/outLogin.jpg"
              @click="goLogonPage"
            />
          </div>
          <h4 class="nickname" @click="goLogonPage">未登录用户</h4>
          <p class="autograph" @click="goLogonPage">点击登录</p>
        </div> -->
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { reactive, ref } from 'vue'
export default {
  name: 'home',
  setup () {
    const state = reactive({
      blogText: '', // 发布博客文本框内的文字
    })

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
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
            .tyh-icon {
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
</style>
