import axios from 'axios'
import { Message } from 'element3'

const require = axios.create({
  baseURL: 'http://tianyuhao.icu/backstage/virgo_tyh_php/public/index.php/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 响应拦截器
require.interceptors.response.use(function (response) {
  // 统一处理错误信息提示
  if (response.data.code !== 201) {
    Message.error({ message: response.data.msg, duration: 1300 })
  }

  // 统一处理正确信息提示
  const reg = /[\u4e00-\u9fa5]+/g
  if (reg.test(response.data.msg) && response.data.code === 201) {
    Message({ message: response.data.msg, type: 'success', duration: 1300 })
  }

  return response
}, function (error) {
  return Promise.reject(error)
})

export default require
