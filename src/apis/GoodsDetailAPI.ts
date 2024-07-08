import instance from '@/utils/request'
// 获取商品详情的单一商品的具体信息
export const getGoodsDetailApi = (id: string) => {
  return instance.get('/goods', { params: { id } })
}
