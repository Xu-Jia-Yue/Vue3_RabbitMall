import instance from '@/utils/request'

//  获取热榜商品
// @param {Number} id - 商品id
// @param {Number} type - 1代表24小时热销榜 2代表周热销榜
// @param {Number} limit - 获取个数

interface obj {
  id: number
  type: number
  limit: number
}
export const getHotGoodsApi = (data: obj) => {
  return instance.get('/goods/hot', { params: data })
}
