import instance from '@/utils/request'
interface obj {
  account: string
  password: string
}
export const isLoginApi = (data: obj) => {
  return instance.post('/login', data)
}
