import instance from '@/utils/request'

export const getHotApi = () => {
  return instance.get('/home/hot')
}
