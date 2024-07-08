import instance from '@/utils/request'
// 获取主页展示商品的数据
export const getHomeGoodsApi = () => {
  return instance.get('/home/goods')
}
