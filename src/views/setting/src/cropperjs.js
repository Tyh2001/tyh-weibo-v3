import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadUserPhoto } from '../../../api/user'

/**
 * 设置页面头像裁切上传模块
 * @param { object } state 数据
 * 
 * 1. 文本框被改变时
 * 2. 当头像裁切器对话框完全展示时候的回调 获取对话框中的 img 标签 并初始化裁切器
 * 3. 当头像裁切器对话框完全关闭的时候 销毁裁切器
 * 4. 点击上传图片
 * 
 * @returns Fn
 */
export default function (state) {
  // 文本框被改变时
  function onChangeFileInp (fileInput) {
    state.UploadfileImgUrl = URL.createObjectURL(fileInput.files[0]) // 获取到上传图片的路径
    state.CropperImgDialog = true // 展示对话框
  }

  // 当头像裁切器对话框完全展示时候的回调 获取对话框中的 img 标签 并初始化裁切器
  function dialogOpened (cropperImg) {
    state.cropper = new Cropper(cropperImg, {
      aspectRatio: 1 / 1, // 裁切框的比例
      viewMode: 1, // 裁切框不能移出图片范围
      dragMode: 'none' // 背景画布禁止移动
    })
  }

  // 当头像裁切器对话框完全关闭的时候 销毁裁切器
  function dialogClosed (fileInput) {
    state.cropper.destroy()
    fileInput.value = ''
  }

  // 点击上传图片
  function ToUploadPhoto () {
    state.upImgLoginDialog = true
    state.cropper.getCroppedCanvas().toBlob((blob) => {
      const formData = new FormData()
      // 这里第三个参数为图片后缀名
      formData.append('photo', blob, '.jpg')
      uploadUserPhoto(formData, state.userInfo.id).then(res => {
        state.userForm.avatar = res.data.data.url
        state.CropperImgDialog = false
        state.upImgLoginDialog = false
      })
    })
  }

  return {
    onChangeFileInp,
    dialogOpened,
    dialogClosed,
    ToUploadPhoto
  }
}
