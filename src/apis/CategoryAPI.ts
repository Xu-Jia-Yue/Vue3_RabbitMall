import instance from '@/utils/request'
import { type filterGoodsDataType } from '@/utils/TSinterface'
// 获取导航分类
export const getCategoryApi = () => {
  return instance.get('/home/category/head')
}
// 获取一级分类中的面包屑导航的分类
export const getSubCategoryApi = (id: string) => {
  return instance.get('/category', { params: { id } })
}
// 获取一级分类中筛选后的二级分类
export const getCategoryFilterApi = (id: string) => {
  return instance.get('/category/sub/filter', { params: { id } })
}
// 发送请求以获取分类后的商品列表

export const getFilterGoodsApi = (data: filterGoodsDataType) => {
  return instance.post('/category/goods/temporary', data)
}
