import axios from 'axios'
import { Message } from 'element3'

const require = axios.create({
  baseURL: 'https://tianyuhao.icu/backstage/virgo_tyh_php/public/index.php/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求拦截器
require.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 处理请求错误
  return Promise.reject(error)
})

// 响应拦截器
require.interceptors.response.use(function (response) {
  // 同意处理错误信息
  if (response.data.code !== 201) {
    Message.error({ message: response.data.msg, duration: 1300 })
  }
  // if (response.data.code === 201) {

  // }

  return response
}, function (error) {
  return Promise.reject(error)
})

export default require
