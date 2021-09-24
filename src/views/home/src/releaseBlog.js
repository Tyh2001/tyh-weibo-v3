import { Message } from 'element3'
import { onReleaseBlog } from '../../../api/blog'

/**
 * 发布博客模块
 * @param { object } state 数据
 * 
 * 1. 当上传文件被改变时
 * 2. 点击移除照片
 * 3. 点击上传文件的方形框位置
 * 4. 点击发布的按钮
 * 
 * @returns Fn
 */
export default function (state) {
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
      // loadgetAllBlogList()
      return
    }
    state.changeBtnLoading = false
  }

  return {
    upImageFileInputChange,
    removeImage,
    clickFileAddImg,
    publishContent
  }
}
