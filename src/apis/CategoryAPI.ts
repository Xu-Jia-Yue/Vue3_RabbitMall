import instance from '@/utils/request'
import type { AxiosRequestConfig } from 'axios'
// 获取导航分类
export const getCategoryApi = () => {
  return instance.get('/home/category/head')
}
// 获取一级分类中的面包屑导航的分类
export const getSubCategoryApi = (id: AxiosRequestConfig<string>) => {
  return instance.get('/category', { params: { id } })
}
