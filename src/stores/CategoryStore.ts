import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { getCategoryApi } from '@/apis/CategoryAPI'
// 获取分类
export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([]) as any
  const getCategory = async () => {
    const { result } = (await getCategoryApi()) as any
    categoryList.value = result
  }
  onMounted(() => {
    getCategory()
  })
  return {
    categoryList,
    getCategory
  }
})
