import instance from '@/utils/request'
// 获取主页新鲜好物列表的商品
export const getNewApi = () => {
  return instance.get('/home/new')
}
