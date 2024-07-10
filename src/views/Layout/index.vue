<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutNav from './components/LayoutNav.vue'
import FixHeader from './components/FixHeader.vue'
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <FixHeader />
  <RouterView />
  <LayoutFooter />
</template>

<style lang="scss" scoped></style>
