/**
 * 用户相关
 */

import require from '../utils/require'

/**
 * 注册账号
 * @param { object } data 用户注册信息
 * @returns 提示信息 状态码
 */
export const onRegister = data => {
  return require({
    method: 'POST',
    url: 'index/User/Register',
    data
  })
}

/**
 * 登录
 * @param { object } data 用户名和密码的对象
 * @returns 提示信息 状态码
 */
export const onUserLogin = data => {
  return require({
    method: 'POST',
    url: 'index/User/Login',
    data
  })
}

/**
 * 获取用户个人资料
 * @param { number } userID 用户的 id
 * @returns 用户个人资料
 */
export const getUserInfo = userID => {
  return require({
    method: 'GET',
    url: 'index/User/getUserInfo',
    params: {
      id: userID
    }
  })
}

/**
 * 更改用户资料
 * @param { object } data 用户资料
 * @param { string } userID 用户 id
 * @returns 提示信息 状态码
 */
export const changeUserInfo = (data, userID) => {
  return require({
    method: 'POST',
    url: 'index/User/changeUserInfo',
    data,
    params: {
      id: userID
    }
  })
}

/**
 * 更改用户密码
 * @param { object } data 用户密码
 * @param { string } userID 用户 id
 * @returns 提示信息 状态码
 */
export const changeUserPass = (data, userID) => {
  return require({
    method: 'POST',
    url: 'index/User/changeUserPass',
    data,
    params: {
      id: userID
    }
  })
}

/**
 * 上传用户头像
 * @param { formData } data 头像
 * @param { file } userID 用户 id
 * @returns
 */
export const uploadUserPhoto = (data, userID) => {
  return require({
    method: 'POST',
    url: 'index/User/uploadPhoto',
    data,
    params: {
      id: userID
    }
  })
}
