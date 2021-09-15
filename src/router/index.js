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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
