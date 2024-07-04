import instance from '@/utils/request'
import type { AxiosRequestConfig } from 'axios'
// 获取商品详情的单一商品的具体信息
export const getGoodsDetailApi = (id: AxiosRequestConfig<string>) => {
  return instance.get('/goods', { params: { id } })
}
