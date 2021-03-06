import { createRouter, createWebHashHistory } from 'vue-router'
import { Message } from 'element3'
import { getStorage } from '@/utils/localStorage'

const routes = [
  // 登录
  {
    path: '/user/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { requiresAuth: false }
  },
  // 注册
  {
    path: '/user/register',
    name: 'register',
    component: () => import('@/views/register/index.vue'),
    meta: { requiresAuth: false }
  },
  // 首页加载模板
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    meta: { requiresAuth: false },
    children: [
      // 首页
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { requiresAuth: false }
      },
      // 设置
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting/index.vue'),
        meta: { requiresAuth: true }
      },
      // 我的关注
      {
        path: '/follow',
        name: 'follow',
        component: () => import('@/views/follow/index.vue'),
        meta: { requiresAuth: true }
      },
      // 我的页面加载模板
      {
        path: '/my/:id',
        redirect: '@/views/my',
        component: () => import('@/views/myLayout/index.vue'),
        meta: { requiresAuth: true },
        children: [
          // 我的页面
          {
            path: '',
            name: 'my',
            component: () => import('@/views/my/index.vue'),
            meta: { requiresAuth: true }
          },
          // 我的关注
          {
            path: '/myFollow/:id',
            name: 'myFollow',
            component: () => import('@/views/myFollow/index.vue'),
            meta: { requiresAuth: true }
          },
          // 我的粉丝
          {
            path: '/fans/:id',
            name: 'fans',
            component: () => import('@/views/fans/index.vue'),
            meta: { requiresAuth: true }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const LOCAL_NAME = 'tyh_user_local'
  const user = getStorage(LOCAL_NAME)

  // 如果需要登录的路由
  if (to.meta.requiresAuth) {
    // 判断用户信息是否存在
    if (user) {
      // 存在就直接通过
      return next()
    }
    // 否则消息提示 并跳转登录页面
    Message({ message: '请登录后再试', type: 'success', duration: 1300 })
    return next('/user/login')
  }
  // 不需要登录的直接通过
  return next()
})

export default router
