import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Category from '@/views/Category/index.vue'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import SubCategory from '@/views/subCategory/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
