import { getSubCategoryApi } from '@/apis/CategoryAPI'
import type { AxiosRequestConfig } from 'axios'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { onMounted, ref } from 'vue'
export const useSubCategory = () => {
  const route = useRoute()
  const categoryId = route.params.id as AxiosRequestConfig<string>
  const subCategory = ref({})
  const getSubCategory = async (id: AxiosRequestConfig<string> = categoryId) => {
    const { result } = (await getSubCategoryApi(id)) as any
    subCategory.value = result
  }
  // 目标:路由参数变化的时候 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    getSubCategory(to.params.id as AxiosRequestConfig<string>)
  })
  onMounted(() => {
    getSubCategory()
  })
  return {
    subCategory
  }
}
