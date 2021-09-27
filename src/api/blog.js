/**
 * 博客相关
 */

import require from '../utils/require'

/**
 * 上传用户发布的文字内容
 * @param { object } data 文字内容
 * @param { object } params 用户 id 和文字内容
 * @returns 提示信息 状态码
 */
export const onReleaseBlog = (data, params) => {
  return require({
    method: 'POST',
    url: 'index/Blog/releaseBlog',
    data,
    params
  })
}

/**
 * 获取所有的博客内容
 * @returns 所有的博客内容
 */
export const getAllBlogList = () => {
  return require({
    method: 'GET',
    url: 'index/Blog/getAllBlogList'
  })
}

/**
 * 获取指定用户的博客内容
 * @param { string } userId 用户 id
 * @returns 指定用户发布的博客内容
 */
export const getUserBlogList = userId => {
  return require({
    method: 'GET',
    url: 'index/Blog/getUserBlogList',
    params: {
      userId: userId
    }
  })
}

/**
 * 删除用户的博客内容
 * @param { string } params 博客 id
 * @returns 提示信息 状态码
 */
export const deleteMyBlogList = blogId => {
  return require({
    method: 'GET',
    url: 'index/Blog/deleteMyBlog',
    params: {
      blogId: blogId
    }
  })
}

/**
 * 获取我关注人的博客内容
 * @param { string } userID 用户 id
 * @returns 我关注人的博客内容
 */
export const getFollowAllBlogList = userId => {
  return require({
    method: 'GET',
    url: 'index/Blog/getFollowAllBlogList',
    params: {
      userId: userId
    }
  })
}
