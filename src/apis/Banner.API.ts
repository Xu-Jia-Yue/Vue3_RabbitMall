import instance from '@/utils/request'
export const getBannerApi = (distributionSite = 1) => {
  return instance.get('/home/banner', { params: { distributionSite } })
}
