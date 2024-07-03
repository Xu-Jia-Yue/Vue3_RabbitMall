import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { getCategoryApi } from '@/apis/CategoryAPI'
export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])
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
