import instance from '@/utils/request'
// 生成订单接口
export const createOrderApi = (data: any) => {
  return instance.post('/member/order', data)
}
