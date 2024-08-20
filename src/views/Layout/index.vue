<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutNav from './components/LayoutNav.vue'
import FixHeader from './components/FixHeader.vue'
import Loading from '@/components/Loading/index.vue'
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <FixHeader />
  <!-- 加载时组件 -->
  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
  <LayoutFooter />
</template>

<style lang="scss" scoped></style>
