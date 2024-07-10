<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getCategoryFilterApi, getFilterGoodsApi } from '@/apis/CategoryAPI'
import { ref, onMounted } from 'vue'
import GoodsItem from '@/components/GoodsItem.vue'
import { type filterGoodsDataType } from '@/utils/TSinterface'

// 获取面包屑导航数据
const route = useRoute()
const categoryFilter = ref({}) as any
const getCategoryFilter = async (id: string) => {
  const { result } = (await getCategoryFilterApi(id)) as any
  categoryFilter.value = result
}
// 获取筛选后的商品列表
const reqData = ref({
  categoryId: route.params.id as string,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
}) as any
const goodsList = ref([]) as any
const getFilterGoods = async (data: filterGoodsDataType) => {
  const { result } = (await getFilterGoodsApi(data)) as any
  goodsList.value = result.items
}
// 筛选改了
const tabChange = () => {
  reqData.value.page = 1
  getFilterGoods(reqData.value)
}
// 无限加载更多
const disabled = ref(false)
const load = async () => {
  // 获取下一页的数据
  reqData.value.page++
  const res = (await getFilterGoodsApi(reqData.value)) as any
  goodsList.value = [...goodsList.value, ...res.result.items]
  // 加载完毕 停止监听
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}

onMounted(() => {
  getFilterGoods(reqData)
  getCategoryFilter(route.params.id as string)
})
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="`/category/${categoryFilter.parentId}`">{{
          categoryFilter.parentName
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilter.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load">
        <!-- 商品列表-->
        <GoodsItem v-for="g in goodsList" :goods="g" :key="g.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
