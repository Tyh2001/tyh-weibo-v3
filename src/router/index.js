import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/user/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/home.vue')
      },
      {
        path: '/setting',
        component: () => import('../views/setting.vue')
      },
      // 我的页面先加载模板
      {
        path: '/my/:id',
        redirect: '@/views/my',
        component: () => import('../views/myLayout.vue'),
        // meta: { requiresAuth: true },
        children: [
          // 我的页面
          {
            path: '',
            component: () => import('../views/my.vue')
          },
          // // 我的关注
          // {
          //   path: '/myFollow/:id',
          //   name: 'myFollow',
          //   component: () => import('@/views/myFollow')
          // },
          // // 我的粉丝
          // {
          //   path: '/fans/:id',
          //   name: 'fans',
          //   component: () => import('@/views/fans')
          // }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
