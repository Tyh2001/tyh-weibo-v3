/**
 * 添加本地存储
 * @param { String } name 本地存储名称
 * @param { JSON } data 本地存储的数据
 */

export const setStorage = (name, data) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  window.localStorage.setItem(name, data)
}

/**
 * 获取本地存储
 * @param { String } name 本地存储名称
 */

export const getStorage = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除本地存储数据
 * @param { String } name 本地存储名称
 */

export const removeStorage = name => {
  return window.localStorage.removeItem(name)
}
