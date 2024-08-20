import instance from '@/utils/request'

// 获取搜索后的商品
export const getSearch = (params: any) => {
  return instance.post('/search/all', { params })
}
