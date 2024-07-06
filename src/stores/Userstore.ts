import { defineStore } from 'pinia'
import { useCartStore } from './CartStore'
import { ref } from 'vue'
import { isLoginApi } from '@/apis/LoginAPI'
import { memberCartApi } from '@/apis/CartAPI'
interface obj {
  account: string
  password: string
}
export const useUserStore = defineStore(
  'user',
  () => {
    const cartStore = useCartStore()
    const userInfo = ref({}) as any
    // 获取用户信息及合并购物车
    const getUserInfo = async (data: obj) => {
      const { result } = (await isLoginApi(data)) as any
      userInfo.value = result
      const memberData = cartStore.cartList.map((item: any) => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count
        }
      })
      console.log(memberData)
      await memberCartApi(memberData)
      cartStore.updateCartList()
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
