import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './Userstore'
import { insertCartApi, findNewCartApi, delCartApi } from '@/apis/CartAPI'
export const useCartStore = defineStore(
  'Cart',
  () => {
    const userStore = useUserStore()
    const isLogin = userStore.userInfo.token
    const cartList = ref([]) as any
    // 更新列表
    const updateCartList = async () => {
      const { result } = (await findNewCartApi()) as any
      cartList.value = result
    }
    // 添加商品
    const addCart = async (good: any) => {
      if (isLogin) {
        //登录后逻辑
        const { skuId, count } = good
        await insertCartApi({ skuId, count })
        const { result } = (await findNewCartApi()) as any
        cartList.value = result
      } else {
        //本地逻辑
        const findItem = cartList.value.find((item: any) => item.skuId == good.skuId)
        if (findItem) {
          findItem.count++
        } else {
          cartList.value.push(good)
        }
      }
    }
    //删除商品
    const delCart = async (skuId: any) => {
      if (isLogin) {
        // 登录后逻辑
        await delCartApi([skuId])
        updateCartList()
      } else {
        const idx = cartList.value.find((item: any) => {
          item.skuId === skuId
        })
        cartList.value.splice(idx, 1)
      }
    }
    // 总商品数
    const countTotal = computed(() =>
      cartList.value.reduce((s: number, i: any) => (s += i.count), 0)
    )
    // 总价
    const priceTotal = computed(() =>
      cartList.value.reduce((s: number, i: any) => (s += i.count * i.price), 0)
    )
    //已选择的商品件数
    const selectCountTotal = computed(() =>
      cartList.value
        .filter((item: any) => item.selected)
        .reduce((s: number, i: any) => {
          return (s += i.count)
        }, 0)
    )
    // 已选择的商品价格
    const selectPriceTotal = computed(() =>
      cartList.value
        .filter((item: any) => item.selected)
        .reduce((s: number, i: any) => {
          return (s += i.count * i.price)
        }, 0)
    )
    // 单选功能
    const singleCheck = (skuId: number | string, selected: boolean) => {
      const item = cartList.value.find((item: any) => item.skuId === skuId)
      item.selected = selected
    }
    // 全选功能action
    const allCheck = (selected: boolean) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item: any) => (item.selected = selected))
    }

    // 是否全选计算属性
    const isAll = computed(() => cartList.value.every((item: any) => item.selected))

    //清除购物车
    const clearCartList = () => {
      cartList.value = []
    }
    return {
      addCart,
      cartList,
      delCart,
      countTotal,
      priceTotal,
      selectCountTotal,
      selectPriceTotal,
      singleCheck,
      allCheck,
      isAll,
      clearCartList,
      updateCartList
    }
  },
  {
    persist: true
  }
)
