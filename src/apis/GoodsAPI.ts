import instance from '@/utils/request'
export const getHomeGoodsApi = () => {
  return instance.get('/home/goods')
}
