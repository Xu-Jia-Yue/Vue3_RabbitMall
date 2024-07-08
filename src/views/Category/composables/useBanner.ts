import { getBannerApi } from '@/apis/Banner.API'
import { ref, onMounted } from 'vue'
// banner 相关逻辑
export const useBanner = () => {
  const bannerList = ref([]) as any
  const getBanner = async () => {
    const { result } = (await getBannerApi(2)) as any
    bannerList.value = result
  }
  onMounted(() => {
    getBanner()
  })
  return {
    bannerList
  }
}
