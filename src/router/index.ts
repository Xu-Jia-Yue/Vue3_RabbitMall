import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Category from '@/views/Category/index.vue'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import SubCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import PayPage from '@/views/PayPage/index.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/userInfo.vue'
import MyOrder from '@/views/Member/components/myOrder.vue'

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
          component: Home
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cartList',
          component: CartList
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path: 'paypage',
          component: PayPage
        },
        {
          path: 'member',
          component: Member,
          children: [
            {
              path: '',
              component: UserInfo
            },
            {
              path: 'order',
              component: MyOrder
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
router.afterEach(() => {
  // 每次跳转页面 都回到页面首页
  window.scrollTo(0, 0)
})

export default router
