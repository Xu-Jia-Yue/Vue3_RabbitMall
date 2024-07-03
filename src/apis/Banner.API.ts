import instance from '@/utils/request'
export const getBannerApi = () => {
  return instance.get('/home/banner')
}
