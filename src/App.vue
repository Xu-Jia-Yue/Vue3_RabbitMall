<script setup lang="ts">
import { testApi } from './api/testApi'
import { onMounted } from 'vue'

const test = async () => {
  const res = await testApi()
  console.log(res)
}
onMounted(() => {
  test()
})
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss"></style>
