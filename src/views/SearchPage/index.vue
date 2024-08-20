<script setup lang="ts">
// import GoodsItem from '@/components/GoodsItem.vue'
import { getSearch } from '@/apis/SearchAPI'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// const goods = ref({})
const route = useRoute()
const searchInp = ref()
const params = ref({
  page: 1,
  pageSize: 10,
  keyword: '衣',
  sortField: 'publishTime',
  sortMethod: 'asc'
})
const getGoods = async () => {
  const { result } = (await getSearch(params.value)) as any
  console.log(result)
}
onMounted(() => {
  getGoods()
  searchInp.value = route.params.inp
})
</script>

<template>
  <div class="searchpage">
    <h1>以下是搜索 "{{ searchInp }}" 后的商品</h1>
    <div class="goodList">
      <div class="goods">
        <!-- <GoodsItem v-for="i in goods" :key="i" :goods="i" /> -->
      </div>
      <el-pagination class="pagina" background layout="prev, pager, next" center :total="10" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.searchpage {
  h1 {
    text-align: center;
    font-weight: bold;
  }
  .goodList {
    .goods {
      width: 1320px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 20px auto;
    }
    .pagina {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
