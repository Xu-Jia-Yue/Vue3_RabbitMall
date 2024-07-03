import instance from '@/utils/request'

export const getNewApi = () => {
  return instance.get('/home/new')
}
