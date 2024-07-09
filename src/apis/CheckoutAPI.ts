import instance from '@/utils/request'
// 获取结算页面的信息
export const getCheckoutInfoApi = () => {
  return instance.get('/member/order/pre')
}
// 删除地址
export const delAddressApi = (id: string) => {
  return instance.delete(`/member/address/${id}`)
}
// 添加地址
export const addAddressApi = (data: any) => {
  return instance.post('/member/address', data)
}
// 修改地址
export const editAddressApi = (id: string, data: any) => {
  return instance.put(`/member/address/${id}`, data)
}
