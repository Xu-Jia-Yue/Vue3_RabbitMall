import instance from '@/utils/request'
// 生成订单接口
export const createOrderApi = (data: any) => {
  return instance.post('/member/order', data)
}
// 获取订单详情
export const getOrderDataApi = (id: string) => {
  return instance.get(`/member/order/${id}`)
}
// 获取我的订单列表
export const getUserOrderApi = (params: any) => {
  return instance.get('/member/order', { params })
}
