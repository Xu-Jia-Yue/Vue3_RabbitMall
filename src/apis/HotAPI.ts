import instance from '@/utils/request'
// 获取主页人气推荐列表的商品
export const getHotApi = () => {
  return instance.get('/home/hot')
}
