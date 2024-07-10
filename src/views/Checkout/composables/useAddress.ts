import {
  getCheckoutInfoApi,
  delAddressApi,
  addAddressApi,
  editAddressApi
} from '@/apis/CheckoutAPI'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
export const useAddressData = () => {
  const checkInfo = ref([]) as any // 订单对象
  const curAddress = ref({}) as any // 地址对象
  const toggleFlag = ref(false)
  const addFlag = ref(false)
  const editFlag = ref(false)
  // 定义添加地址的数据
  const addAddressForm = ref({
    receiver: '', //收获人
    contact: '', //联系方式
    provinceCode: '123', //省份编码
    cityCode: '123', //城市编码
    countyCode: '123', //地区编码
    address: '', //详细地址
    postalCode: '123', //邮政编码
    addressTags: '', //地址标签
    isDefault: '1', //收获地址是否默认
    fullLocation: '' //完整地址
  })
  // 获取订单数据
  const getCheckoutInfo = async () => {
    const { result } = (await getCheckoutInfoApi()) as any
    checkInfo.value = result
    curAddress.value = result.userAddresses.find((item: any) => item.isDefault === 0)
  }
  // 删除地址
  const delAddress = async (id: string) => {
    await delAddressApi(id)
    getCheckoutInfo()
    ElMessage({ type: 'success', message: '删除成功' })
  }
  // 添加地址
  const addAddress = async () => {
    await addAddressApi(addAddressForm.value)
    getCheckoutInfo()
    addFlag.value = false
    ElMessage({ type: 'success', message: '添加成功' })
  }
  // 修改地址
  const editAddress = async () => {
    await editAddressApi(curAddress.value.id, curAddress.value)
    getCheckoutInfo()
    editFlag.value = false
    ElMessage({ type: 'success', message: '修改成功' })
  }
  onMounted(() => {
    getCheckoutInfo()
  })
  return {
    checkInfo,
    curAddress,
    toggleFlag,
    addFlag,
    addAddressForm,
    editFlag,
    getCheckoutInfo,
    delAddress,
    addAddress,
    editAddress
  }
}
