import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/Main.vue')
    // children: [] -> 根据userMenus来决定 -> children
  },
  {
    path: '/:pathMath(.*)*',
    name: 'notfound',
    component: () => import('@/views/not-found/NotFound.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  if (to.path.indexOf('/main') !== -1) {
    if (to.name === 'notFound') {
      to.name = 'user'
    }
  }
})

export default router
