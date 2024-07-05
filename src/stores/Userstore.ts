import { defineStore } from 'pinia'
import { ref } from 'vue'
import { isLoginApi } from '@/apis/LoginAPI'
interface obj {
  account: string
  password: string
}
export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({}) as any
    const getUserInfo = async (data: obj) => {
      const { result } = (await isLoginApi(data)) as any
      userInfo.value = result
    }
    const clearUserInfo = () => {
      userInfo.value = {}
    }
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true
  }
)
