import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/views/Layout/index.vue'
import NotFound from '@/components/NotFound/index.vue'

// 路由相关逻辑
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: defineAsyncComponent(() => import('@/views/Home/index.vue'))
        },
        {
          path: 'category/:id',
          name: 'category',
          component: defineAsyncComponent(() => import('@/views/Category/index.vue'))
        },
        {
          path: 'category/sub/:id',
          component: defineAsyncComponent(() => import('@/views/subCategory/index.vue'))
        },
        {
          path: 'detail/:id',
          component: defineAsyncComponent(() => import('@/views/Detail/index.vue'))
        },
        {
          path: 'cartList',
          component: defineAsyncComponent(() => import('@/views/CartList/index.vue'))
        },
        {
          path: 'checkout',
          component: defineAsyncComponent(() => import('@/views/Checkout/index.vue'))
        },
        {
          path: 'paypage',
          component: defineAsyncComponent(() => import('@/views/PayPage/index.vue'))
        },
        {
          path: 'member',
          component: defineAsyncComponent(() => import('@/views/Member/index.vue')),
          children: [
            {
              path: '',
              component: defineAsyncComponent(
                () => import('@/views/Member/components/userInfo.vue')
              )
            },
            {
              path: 'order',
              component: defineAsyncComponent(() => import('@/views/Member/components/myOrder.vue'))
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: defineAsyncComponent(() => import('@/views/Login/index.vue'))
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  next()
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
  // 每次跳转页面 都回到页面首页
  window.scrollTo(0, 0)
})

export default router
