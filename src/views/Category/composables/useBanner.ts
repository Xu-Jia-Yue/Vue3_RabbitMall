import { getBannerApi } from '@/apis/Banner.API'
import { ref, onMounted } from 'vue'
export const useBanner = () => {
  const bannerList = ref([])
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
