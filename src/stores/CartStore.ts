import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './Userstore'
import { insertCartApi, findNewCartApi, delCartApi } from '@/apis/CartAPI'
import { type cartListDataType } from '@/utils/TSinterface'
// 购物车相关数据管理
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
    const addCart = async (good: cartListDataType) => {
      if (isLogin) {
        //登录后逻辑
        const { skuId, count } = good
        await insertCartApi({ skuId, count })
        const { result } = (await findNewCartApi()) as any
        cartList.value = result
      } else {
        //本地逻辑
        const findItem = cartList.value.find((item: cartListDataType) => item.skuId == good.skuId)
        if (findItem) {
          findItem.count++ as any
        } else {
          cartList.value.push(good)
        }
      }
    }

    //删除商品
    const delCart = async (skuId: string) => {
      if (isLogin) {
        await delCartApi([skuId])
        updateCartList()
      } else {
        const idx = cartList.value.find((item: cartListDataType) => {
          item.skuId === skuId
        })
        cartList.value.splice(idx, 1)
      }
    }

    // 总商品数
    const countTotal = computed(() =>
      cartList.value.reduce((s: number, i: cartListDataType) => (s += i.count), 0)
    )

    // 总价
    const priceTotal = computed(() =>
      cartList.value.reduce((s: number, i: cartListDataType) => (s += i.count * i.price), 0)
    )

    //已选择的商品件数
    const selectCountTotal = computed(() =>
      cartList.value
        .filter((item: cartListDataType) => item.selected)
        .reduce((s: number, i: cartListDataType) => {
          return (s += i.count)
        }, 0)
    )

    // 已选择的商品价格
    const selectPriceTotal = computed(() =>
      cartList.value
        .filter((item: cartListDataType) => item.selected)
        .reduce((s: number, i: cartListDataType) => {
          return (s += i.count * i.price)
        }, 0)
    )

    // 单选功能
    const singleCheck = (skuId: string, selected: boolean) => {
      const item = cartList.value.find((item: cartListDataType) => item.skuId === skuId)
      item.selected = selected
    }

    // 全选功能action
    const allCheck = (selected: boolean) => {
      cartList.value.forEach((item: cartListDataType) => (item.selected = selected))
    }

    // 是否全选计算属性
    const isAll = computed(() => cartList.value.every((item: cartListDataType) => item.selected))

    //清除购物车
    const clearCartList = () => {
      cartList.value = []
    }

    return {
      addCart,
      delCart,
      singleCheck,
      clearCartList,
      updateCartList,
      allCheck,
      cartList,
      countTotal,
      priceTotal,
      selectCountTotal,
      selectPriceTotal,
      isAll
    }
  },
  {
    //持久化
    persist: true
  }
)
