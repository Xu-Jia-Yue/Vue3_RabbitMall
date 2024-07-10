<script setup lang="ts">
import HomeBanner from './components/HomeBanner.vue'
import HomeCategory from './components/HomeCategory.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'
</script>

<template>
  <div class="container">
    <HomeBanner />
    <HomeCategory />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
</template>

<style lang="scss" scoped></style>
