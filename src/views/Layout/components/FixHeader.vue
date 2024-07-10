<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore'
const categoryStore = useCategoryStore()
import { ref, onMounted } from 'vue'
import { useHomeStore } from '@/stores/HomeNav'
const homeStore = useHomeStore()
// 定义当滑轮距离顶部70px时显示 实现黏贴顶部
let top = ref()
onMounted(() => {
  window.onscroll = () => {
    top.value = document.documentElement.scrollTop
  }
})
</script>

<template>
  <div class="app-header-sticky" :class="{ show: top > 70 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink
            to="/"
            @click="homeStore.changeFlag(1)"
            :class="{ active: homeStore.activeFlag }"
            >首页</RouterLink
          >
        </li>
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink
            active-class="active"
            :to="`/category/${item.id}`"
            @click="homeStore.changeFlag(0)"
            >{{ item.name }}</RouterLink
          >
        </li>
      </ul>
      <div class="right">
        <RouterLink to="/member/order">我的订单</RouterLink>
        <RouterLink to="/member">会员中心</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;

  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url('@/assets/images/logo.png') no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>
