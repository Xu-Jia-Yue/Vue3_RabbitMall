import instance from '@/utils/request'
export const getGoodsApi = () => {
  return instance.get('/home/goods')
}
