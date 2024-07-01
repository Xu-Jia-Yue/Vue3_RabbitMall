import instance from '@/utils/request'
export const getCategoryApi = () => {
  return instance.get('/home/category/head')
}
