import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useHomeStore = defineStore('homeStore', () => {
  const activeFlag = ref(true)
  const changeFlag = (flag: number) => {
    activeFlag.value = flag ? true : false
    console.log(activeFlag.value)
  }
  return {
    activeFlag,
    changeFlag
  }
})
