import instance from '@/utils/request'
// 获取banner图
export const getBannerApi = (distributionSite = 1) => {
  return instance.get('/home/banner', { params: { distributionSite } })
}
