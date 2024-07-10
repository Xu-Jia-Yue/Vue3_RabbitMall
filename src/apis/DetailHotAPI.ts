import instance from '@/utils/request'
import { type getHotGoodsType } from '@/utils/TSinterface'
// 获取详情页的热榜数据
export const getHotGoodsApi = (data: getHotGoodsType) => {
  return instance.get('/goods/hot', { params: data })
}
