import instance from '@/utils/request'
import { type isLoginDataType } from '@/utils/TSinterface'
// 登录接口
export const isLoginApi = (data: isLoginDataType) => {
  return instance.post('/login', data)
}
