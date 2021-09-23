import { createRouter, createWebHashHistory } from 'vue-router'
import { Message } from 'element3'
// import { useStore } from 'vuex'
import { getStorage } from '../utils/localStorage'

const routes = [
  {
    path: '/user/login',
    component: () => import('../views/login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('../views/layout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        component: () => import('../views/home.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/setting',
        component: () => import('../views/setting.vue'),
        meta: { requiresAuth: true }
      },
      // 我的页面先加载模板
      {
        path: '/my/:id',
        redirect: '@/views/my',
        component: () => import('../views/myLayout.vue'),
        meta: { requiresAuth: true },
        children: [
          // 我的页面
          {
            path: '',
            component: () => import('../views/my.vue'),
            meta: { requiresAuth: true }
          },
          // 我的关注
          {
            path: '/myFollow/:id',
            component: () => import('../views/myFollow.vue')
          },
          // 我的粉丝
          {
            path: '/fans/:id',
            component: () => import('../views/fans.vue')
          }
        ]
      },
      // 我的关注
      {
        path: '/follow',
        component: () => import('../views/follow.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = getStorage('virgo_user')

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
