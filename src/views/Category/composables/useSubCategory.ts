import { getSubCategoryApi } from '@/apis/CategoryAPI'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { onMounted, ref } from 'vue'
// 二级分类的相关逻辑
export const useSubCategory = () => {
  const route = useRoute()
  const categoryId = route.params.id as string
  const subCategory = ref({}) as any
  const getSubCategory = async (id: string = categoryId) => {
    const { result } = (await getSubCategoryApi(id)) as any
    subCategory.value = result
  }
  // 目标:路由参数变化的时候 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    getSubCategory(to.params.id as string)
  })
  onMounted(() => {
    getSubCategory()
  })
  return {
    subCategory
  }
}
