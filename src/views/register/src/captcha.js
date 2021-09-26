import { computed } from 'vue'
import { randomNum } from '../../../utils/randomNum'

/**
 * 验证码模块
 * @param { object } state 数据
 * 
 * 1. 验证码图片地址
 * 2. 生成图片的地址
 * 3. 点击切换新的验证码
 * 
 * @returns Fn
 */
export default function (state) {
  // 验证码图片地址
  function captchaImgURLFn () {
    state.captchaCode = randomNum(15, 1)
    // const path = `./images/captcha_${state.captchaCode}.png`
    // const modules = import.meta.globEager('./images/*')
    // return modules[path].default
    return `/src/views/register/images/captcha_${state.captchaCode}.png`
  }

  // 生成图片的地址
  const captchaImgURL = computed(() => {
    return captchaImgURLFn()
  })

  // 点击切换新的验证码
  function changeCaptchaImg () {
    captchaImgURLFn()
  }

  return {
    captchaImgURL,
    changeCaptchaImg
  }
}
